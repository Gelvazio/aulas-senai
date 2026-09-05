-- ============================================================================
-- SCRIPT DE SINCRONIZAÇÃO: curso.materias (JSONB) → tabela materia + aulas
-- ============================================================================
-- Objetivo: Restaurar matérias de curso.materias e suas aulas
-- Estrutura: Matéria → Aulas (armazenadas em JSONB dentro de materia.aulas)
-- Data: 2026-09-05
-- ============================================================================

-- Passo 1: Adicionar coluna 'aulas' JSONB na tabela materia (se não existir)
ALTER TABLE public.materia
  ADD COLUMN IF NOT EXISTS aulas jsonb DEFAULT '[]'::jsonb;

-- Passo 2: Extrair e inserir matérias de curso.materias (JSONB)
-- Cada item em curso.materias é uma MATÉRIA
INSERT INTO public.materia (nome, descricao, carga_horaria, curso_id, aulas, criado_em, atualizado_em)
SELECT
  COALESCE(materia->>'nome', materia->>'titulo', 'Sem nome') AS nome,
  materia->>'descricao' AS descricao,
  COALESCE((materia->>'carga_horaria')::integer, NULL) AS carga_horaria,
  c.id AS curso_id,
  COALESCE(materia->'aulas', '[]'::jsonb) AS aulas,
  COALESCE((materia->>'criado_em')::timestamptz, now()) AS criado_em,
  COALESCE((materia->>'atualizado_em')::timestamptz, now()) AS atualizado_em
FROM public.curso c,
     jsonb_array_elements(COALESCE(c.materias, '[]'::jsonb)) AS materia
WHERE c.materias IS NOT NULL
  AND materia IS NOT NULL
ON CONFLICT DO NOTHING;

-- Passo 3: Criar relacionamentos em cursomateria (se tabela existir)
-- Garante que a tabela existe
CREATE TABLE IF NOT EXISTS public.cursomateria (
  cursoid bigint NOT NULL,
  materiaid bigint NOT NULL,
  criado_em timestamptz DEFAULT now(),
  PRIMARY KEY (cursoid, materiaid),
  FOREIGN KEY (cursoid) REFERENCES public.curso(id) ON DELETE CASCADE,
  FOREIGN KEY (materiaid) REFERENCES public.materia(id) ON DELETE CASCADE
);

-- Inserir relacionamentos
INSERT INTO public.cursomateria (cursoid, materiaid)
SELECT DISTINCT
  c.id AS cursoid,
  m.id AS materiaid
FROM public.curso c
INNER JOIN public.materia m ON m.curso_id = c.id
WHERE c.materias IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.cursomateria cm
    WHERE cm.cursoid = c.id AND cm.materiaid = m.id
  )
ON CONFLICT DO NOTHING;

-- Passo 4: Exibir resumo da sincronização
SELECT
  COUNT(DISTINCT m.id) AS total_materias_inseridas,
  COUNT(DISTINCT m.curso_id) AS cursos_com_materias,
  COUNT(DISTINCT cm.cursoid) AS cursos_relacionados,
  SUM(jsonb_array_length(COALESCE(m.aulas, '[]'::jsonb))) AS total_aulas
FROM public.materia m
LEFT JOIN public.cursomateria cm ON cm.materiaid = m.id
WHERE m.curso_id IS NOT NULL;

-- Passo 5: Verificação - listar matérias e aulas restauradas
SELECT
  c.nome_completo AS curso,
  m.nome AS materia,
  m.carga_horaria,
  jsonb_array_length(COALESCE(m.aulas, '[]'::jsonb)) AS qtd_aulas,
  m.descricao
FROM public.curso c
INNER JOIN public.materia m ON m.curso_id = c.id
ORDER BY c.id, m.id
LIMIT 20;

-- Passo 6: Amostra de aulas dentro de uma matéria
-- (comentado - descomente para ver estrutura)
-- SELECT
--   m.nome AS materia,
--   jsonb_pretty(m.aulas) AS aulas_json
-- FROM public.materia m
-- WHERE m.aulas IS NOT NULL AND jsonb_array_length(m.aulas) > 0
-- LIMIT 1;

-- Mensagem final
RAISE NOTICE '✅ Sincronização concluída!
  - Matérias foram extraídas de curso.materias
  - Aulas foram restauradas em materia.aulas (JSONB)
  - Relacionamentos foram criados em cursomateria
  - Coluna materia.aulas agora contém o array de aulas';
