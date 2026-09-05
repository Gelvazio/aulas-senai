-- ============================================================================
-- SCRIPT: Popular tabela AULAS com dados de exemplo
-- ============================================================================
-- Objetivo: Inserir aulas para cada matéria de cada curso
-- Data: 2026-09-05
-- ============================================================================

-- EXEMPLO 1: Aulas para "Introdução à Tecnologia..." (Matéria ID 1)
-- Curso: RIO DO SUL MAIS TECH (Curso ID 2 ou 16/17)

INSERT INTO public.aulas (numero, titulo, descricao, materia_id, curso_id, duracao_minutos, data_planejada, sequencia, ativo, visivel_alunos)
SELECT
  1,
  'AULA 01 - Introdução à Tecnologia da Informação',
  'Conceitos básicos de TIC, história e evolução da tecnologia',
  1,
  c.id,
  120,
  '2026-01-15',
  1,
  true,
  true
FROM public.curso c WHERE c.nome_completo LIKE '%RIO DO SUL MAIS TECH%'
ON CONFLICT (materia_id, numero) DO NOTHING;

INSERT INTO public.aulas (numero, titulo, descricao, materia_id, curso_id, duracao_minutos, data_planejada, sequencia, ativo, visivel_alunos)
SELECT
  2,
  'AULA 02 - Componentes de um Computador',
  'Hardware, periféricos e componentes internos',
  1,
  c.id,
  120,
  '2026-01-22',
  2,
  true,
  true
FROM public.curso c WHERE c.nome_completo LIKE '%RIO DO SUL MAIS TECH%'
ON CONFLICT (materia_id, numero) DO NOTHING;

INSERT INTO public.aulas (numero, titulo, descricao, materia_id, curso_id, duracao_minutos, data_planejada, sequencia, ativo, visivel_alunos)
SELECT
  3,
  'AULA 03 - Sistemas Operacionais',
  'O que é um SO, principais sistemas operacionais, Windows, Linux, macOS',
  1,
  c.id,
  120,
  '2026-01-29',
  3,
  true,
  true
FROM public.curso c WHERE c.nome_completo LIKE '%RIO DO SUL MAIS TECH%'
ON CONFLICT (materia_id, numero) DO NOTHING;

INSERT INTO public.aulas (numero, titulo, descricao, materia_id, curso_id, duracao_minutos, data_planejada, sequencia, ativo, visivel_alunos)
SELECT
  4,
  'AULA 04 - Internet e Redes',
  'Conceitos de internet, protocolos, conectividade',
  1,
  c.id,
  120,
  '2026-02-05',
  4,
  true,
  true
FROM public.curso c WHERE c.nome_completo LIKE '%RIO DO SUL MAIS TECH%'
ON CONFLICT (materia_id, numero) DO NOTHING;

-- EXEMPLO 2: Aulas para "Lógica de Programação" (Matéria ID 3)

INSERT INTO public.aulas (numero, titulo, descricao, materia_id, curso_id, duracao_minutos, data_planejada, sequencia, ativo, visivel_alunos)
SELECT
  1,
  'AULA 01 - Introdução à Lógica de Programação',
  'Conceitos básicos, algoritmos, pseudocódigo',
  3,
  c.id,
  120,
  '2026-03-01',
  1,
  true,
  true
FROM public.curso c WHERE c.id = 3
ON CONFLICT (materia_id, numero) DO NOTHING;

INSERT INTO public.aulas (numero, titulo, descricao, materia_id, curso_id, duracao_minutos, data_planejada, sequencia, ativo, visivel_alunos)
SELECT
  2,
  'AULA 02 - Variáveis, Tipos de Dados e Operadores',
  'Declaração de variáveis, tipos primitivos, operadores aritméticos e lógicos',
  3,
  c.id,
  120,
  '2026-03-08',
  2,
  true,
  true
FROM public.curso c WHERE c.id = 3
ON CONFLICT (materia_id, numero) DO NOTHING;

INSERT INTO public.aulas (numero, titulo, descricao, materia_id, curso_id, duracao_minutos, data_planejada, sequencia, ativo, visivel_alunos)
SELECT
  3,
  'AULA 03 - Estruturas de Controle (If/Else)',
  'Condicionais, tomada de decisão, estruturas if, if-else, switch',
  3,
  c.id,
  120,
  '2026-03-15',
  3,
  true,
  true
FROM public.curso c WHERE c.id = 3
ON CONFLICT (materia_id, numero) DO NOTHING;

INSERT INTO public.aulas (numero, titulo, descricao, materia_id, curso_id, duracao_minutos, data_planejada, sequencia, ativo, visivel_alunos)
SELECT
  4,
  'AULA 04 - Laços de Repetição (For, While)',
  'Estruturas de repetição, loops, iteração',
  3,
  c.id,
  120,
  '2026-03-22',
  4,
  true,
  true
FROM public.curso c WHERE c.id = 3
ON CONFLICT (materia_id, numero) DO NOTHING;

INSERT INTO public.aulas (numero, titulo, descricao, materia_id, curso_id, duracao_minutos, data_planejada, sequencia, ativo, visivel_alunos)
SELECT
  5,
  'AULA 05 - Funções e Procedimentos',
  'Modularização, definição de funções, parâmetros e retorno',
  3,
  c.id,
  120,
  '2026-03-29',
  5,
  true,
  true
FROM public.curso c WHERE c.id = 3
ON CONFLICT (materia_id, numero) DO NOTHING;

-- ============================================================================
-- VERIFICAÇÃO FINAL
-- ============================================================================

-- Contar aulas inseridas
SELECT
  m.descricao as materia,
  COUNT(a.id) as total_aulas
FROM public.materia m
LEFT JOIN public.aulas a ON a.materia_id = m.id
GROUP BY m.id, m.descricao
HAVING COUNT(a.id) > 0
ORDER BY m.id;

-- ============================================================================
-- NOTAS ADICIONAIS
-- ============================================================================
--
-- Para adicionar mais aulas, siga o padrão acima:
-- 1. Identifique a materia_id da matéria
-- 2. Identifique o curso_id do curso
-- 3. Use INSERT com ON CONFLICT para evitar duplicatas
--
-- Campos importantes:
-- - numero: número sequencial da aula (1, 2, 3, ...)
-- - titulo: nome descritivo da aula
-- - descricao: detalhes do conteúdo
-- - duracao_minutos: tempo estimado em minutos
-- - data_planejada: data prevista para a aula
-- - sequencia: ordem da aula
-- - ativo: true para ativar, false para desativar
-- - visivel_alunos: true para mostrar aos alunos
--
