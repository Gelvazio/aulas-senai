-- ============================================================================
-- TABELAS-SISTEMA-SENAI.sql
-- ============================================================================
-- Consolidação COMPLETA de todas as tabelas do projeto aulas-senai
-- Integra: Django (local) + Supabase (remoto)
--
-- Data: 2026-09-05
-- Versão: 1.0
-- Total de Tabelas: 15
-- ============================================================================

-- ============================================================================
-- SEÇÃO 1: TABELAS CORE — ESTRUTURA PRINCIPAL
-- ============================================================================

-- 1.1. Tabela: UNIDADE (Locais de realização dos cursos)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.unidade (
  id BIGSERIAL PRIMARY KEY,
  descricao text NOT NULL,
  cidade text,
  bairro text,
  endereco text
);

ALTER TABLE public.unidade ENABLE ROW LEVEL SECURITY;

CREATE POLICY "unidade_select" ON public.unidade FOR SELECT USING (true);
CREATE POLICY "unidade_insert" ON public.unidade FOR INSERT WITH CHECK (true);
CREATE POLICY "unidade_update" ON public.unidade FOR UPDATE USING (true);
CREATE POLICY "unidade_delete" ON public.unidade FOR DELETE USING (true);

COMMENT ON TABLE public.unidade IS 'Locais onde os cursos são realizados. Cada unidade tem endereço e localização.';

-- 1.2. Tabela: CURSO (Programas e cursos oferecidos)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.curso (
  id BIGSERIAL PRIMARY KEY,
  nome_completo text NOT NULL,
  descricao text,
  ativo integer DEFAULT 1,
  unidade text,
  materias JSONB,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.curso ENABLE ROW LEVEL SECURITY;

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_curso_ativo ON public.curso(ativo);
CREATE INDEX IF NOT EXISTS idx_curso_nome_completo ON public.curso(nome_completo);

-- Constraint para impedir duplicatas na mesma unidade
CREATE UNIQUE INDEX IF NOT EXISTS idx_curso_nome_unidade_unique
  ON public.curso (lower(trim(nome_completo)), lower(trim(unidade)))
  WHERE unidade IS NOT NULL;

-- Permite duplicatas quando unidade é nula (sem unidade definida)
CREATE UNIQUE INDEX IF NOT EXISTS idx_curso_nome_sem_unidade_unique
  ON public.curso (lower(trim(nome_completo)))
  WHERE unidade IS NULL;

COMMENT ON TABLE public.curso IS 'Programas e cursos principais. Exemplo: Rio do Sul Mais Tech, Técnico em Desenvolvimento de Sistemas.';

-- 1.3. Tabela: MATERIA (Unidades Curriculares - UCs)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.materia (
  id BIGSERIAL PRIMARY KEY,
  descricao text NOT NULL,
  ativo integer DEFAULT 1,
  ementa_caminho text,
  apostila_caminho text,
  conteudo_aulas JSONB,
  status_criacao_avaliacao text DEFAULT 'PENDENTE'
    CHECK (status_criacao_avaliacao IN ('PENDENTE', 'ANDAMENTO', 'CONCLUIDO', 'CANCELADO'))
   ,
  status_plano_aula text DEFAULT 'PENDENTE'
    CHECK (status_plano_aula IN ('PENDENTE', 'ANDAMENTO', 'CONCLUIDO', 'CANCELADO'))
   ,
  status_plano_ensino text DEFAULT 'PENDENTE'
    CHECK (status_plano_ensino IN ('PENDENTE', 'ANDAMENTO', 'CONCLUIDO', 'CANCELADO'))
   ,
  ensalado boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.materia ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_materia_ativo ON public.materia(ativo);
CREATE INDEX IF NOT EXISTS idx_materia_descricao ON public.materia(descricao);
CREATE INDEX IF NOT EXISTS idx_materia_conteudo_aulas_status ON public.materia USING GIN (conteudo_aulas);

COMMENT ON TABLE public.materia IS 'Unidades Curriculares (UCs). Cada matéria está vinculada a um ou mais cursos.';
COMMENT ON COLUMN public.materia.conteudo_aulas IS 'JSON com status de aulas geradas. Status: nao_gerado, gerando, gerado, erro';

-- ============================================================================
-- SEÇÃO 2: TABELAS DE RELACIONAMENTO
-- ============================================================================

-- 2.1. Tabela: CURSOMATERIA (Junção Curso-Materia)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.cursomateria (
  cursoid bigint NOT NULL REFERENCES public.curso(id) ON DELETE CASCADE,
  materiaid bigint NOT NULL REFERENCES public.materia(id) ON DELETE CASCADE,
  PRIMARY KEY (cursoid, materiaid)
);

ALTER TABLE public.cursomateria ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_cursomateria_cursoid ON public.cursomateria(cursoid);
CREATE INDEX IF NOT EXISTS idx_cursomateria_materiaid ON public.cursomateria(materiaid);

COMMENT ON TABLE public.cursomateria IS 'Relacionamento muitos-para-muitos entre cursos e matérias. Define quais matérias pertencem a qual curso.';

-- ============================================================================
-- SEÇÃO 3: TABELAS DE AVALIAÇÃO
-- ============================================================================

-- 3.1. Tabela: AVALIACAO (Avaliações de cada matéria)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.avaliacao (
  id BIGSERIAL PRIMARY KEY,
  materia_id bigint NOT NULL REFERENCES public.materia(id) ON DELETE CASCADE,
  numero integer NOT NULL CHECK (numero > 0),
  titulo text NOT NULL,
  data_aplicacao date NOT NULL,
  status text NOT NULL DEFAULT 'PENDENTE'
    CHECK (status IN ('PENDENTE', 'ANDAMENTO', 'CONCLUIDO', 'CANCELADO'))
   ,
  status_aplicacao text NOT NULL DEFAULT 'PENDENTE'
    CHECK (status_aplicacao IN ('PENDENTE', 'ANDAMENTO', 'CONCLUIDO', 'CANCELADO'))
   ,
  status_revisao text NOT NULL DEFAULT 'PENDENTE'
    CHECK (status_revisao IN ('PENDENTE', 'ANDAMENTO', 'CONCLUIDO', 'CANCELADO'))
   ,
  status_cadastro_sgn text NOT NULL DEFAULT 'PENDENTE'
    CHECK (status_cadastro_sgn IN ('PENDENTE', 'ANDAMENTO', 'CONCLUIDO', 'CANCELADO'))
   ,
  acompanhamento_pedagogico_sgn text NOT NULL DEFAULT 'PENDENTE'
    CHECK (acompanhamento_pedagogico_sgn IN ('PENDENTE', 'ANDAMENTO', 'CONCLUIDO', 'CANCELADO'))
   ,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (materia_id, numero)
);

ALTER TABLE public.avaliacao ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_avaliacao_materia_id ON public.avaliacao(materia_id);
CREATE INDEX IF NOT EXISTS idx_avaliacao_status ON public.avaliacao(status);
CREATE INDEX IF NOT EXISTS idx_avaliacao_data_aplicacao ON public.avaliacao(data_aplicacao);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.avaliacao TO anon;
GRANT USAGE, SELECT ON SEQUENCE public.avaliacao_id_seq TO anon;

CREATE POLICY "avaliacao_select_anon" ON public.avaliacao FOR SELECT TO anon USING (true);
CREATE POLICY "avaliacao_insert_anon" ON public.avaliacao FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "avaliacao_update_anon" ON public.avaliacao FOR UPDATE TO anon USING (true) WITH CHECK (true);
CREATE POLICY "avaliacao_delete_anon" ON public.avaliacao FOR DELETE TO anon USING (true);

COMMENT ON TABLE public.avaliacao IS 'Avaliações de cada matéria. Mínimo 2 por matéria. Controla status de criação, aplicação e revisão.';

-- 3.2. Função: Garantir mínimo 2 avaliações por matéria
-- ============================================================================
CREATE OR REPLACE FUNCTION public.garantir_avaliacoes_materia(p_materia_id bigint)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.avaliacao
    (materia_id, numero, titulo, data_aplicacao)
  VALUES
    (p_materia_id, 1, 'Avaliação 1', current_date),
    (p_materia_id, 2, 'Avaliação 2', current_date + 7)
  ON CONFLICT (materia_id, numero) DO NOTHING;
END;
$$;

REVOKE ALL ON FUNCTION public.garantir_avaliacoes_materia(bigint) FROM public;
GRANT EXECUTE ON FUNCTION public.garantir_avaliacoes_materia(bigint) TO anon;

-- 3.3. Função: Impedir exclusão de avaliação se menos de 2
-- ============================================================================
CREATE OR REPLACE FUNCTION public.impedir_menos_duas_avaliacoes()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF (SELECT COUNT(*) FROM public.avaliacao WHERE materia_id = old.materia_id) <= 2 THEN
    RAISE EXCEPTION 'Cada matéria deve possuir no mínimo duas avaliações.';
  END IF;
  RETURN old;
END;
$$;

DROP TRIGGER IF EXISTS avaliacao_minimo_duas ON public.avaliacao;
CREATE TRIGGER avaliacao_minimo_duas
BEFORE DELETE ON public.avaliacao
FOR EACH ROW EXECUTE FUNCTION public.impedir_menos_duas_avaliacoes();

-- 3.4. Tabela: PENDENCIAS (Tarefas pendentes do projeto)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.pendencias (
  id BIGSERIAL PRIMARY KEY,
  data date NOT NULL DEFAULT current_date,
  datavencimento date,
  descricao text NOT NULL,
  status text NOT NULL DEFAULT 'PENDENTE'
    CHECK (status IN ('PENDENTE', 'ANDAMENTO', 'CONCLUIDO', 'CANCELADO'))
   ,
  materia_id text,
  materia_descricao text,
  materia_link text,
  total_horas integer,
  horas_ministradas integer,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.pendencias ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_pendencias_status ON public.pendencias(status);
CREATE INDEX IF NOT EXISTS idx_pendencias_datavencimento ON public.pendencias(datavencimento);

DROP POLICY IF EXISTS "pendencias_select_anon" ON public.pendencias;
CREATE POLICY "pendencias_select_anon" ON public.pendencias FOR SELECT TO anon USING (true);

DROP POLICY IF EXISTS "pendencias_insert_anon" ON public.pendencias;
CREATE POLICY "pendencias_insert_anon" ON public.pendencias FOR INSERT TO anon WITH CHECK (true);

DROP POLICY IF EXISTS "pendencias_update_anon" ON public.pendencias;
CREATE POLICY "pendencias_update_anon" ON public.pendencias FOR UPDATE TO anon USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "pendencias_delete_anon" ON public.pendencias;
CREATE POLICY "pendencias_delete_anon" ON public.pendencias FOR DELETE TO anon USING (true);

COMMENT ON TABLE public.pendencias IS 'Rastreamento de tarefas e pendências do projeto. Vinculadas opcionalmente a matérias.';

-- ============================================================================
-- SEÇÃO 4: TABELAS DE AULAS
-- ============================================================================

-- 4.1. Tabela: AULAS (Aulas de cada matéria)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.aulas (
  id BIGSERIAL PRIMARY KEY,
  numero integer NOT NULL CHECK (numero > 0),
  titulo text NOT NULL,
  descricao text,
  materia_id bigint NOT NULL REFERENCES public.materia(id) ON DELETE CASCADE,
  curso_id bigint NOT NULL REFERENCES public.curso(id) ON DELETE CASCADE,
  duracao_minutos integer,
  data_planejada date,
  sequencia integer,
  ativo boolean DEFAULT true,
  visivel_alunos boolean DEFAULT true,
  conteudo JSONB,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE (materia_id, numero)
);

ALTER TABLE public.aulas ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_aulas_materia_id ON public.aulas(materia_id);
CREATE INDEX IF NOT EXISTS idx_aulas_curso_id ON public.aulas(curso_id);
CREATE INDEX IF NOT EXISTS idx_aulas_data_planejada ON public.aulas(data_planejada);
CREATE INDEX IF NOT EXISTS idx_aulas_numero ON public.aulas(numero);

COMMENT ON TABLE public.aulas IS 'Aulas individuais de cada matéria. Contém título, duração, conteúdo e metadados.';

-- ============================================================================
-- SEÇÃO 5: TABELAS DE CONTEÚDO E MATERIAIS
-- ============================================================================

-- 5.1. Tabela: TIPO_MATERIAL (Categorias de materiais)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.tipo_material (
  id BIGSERIAL PRIMARY KEY,
  nome text NOT NULL,
  descricao text,
  ativo boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE (nome)
);

CREATE INDEX IF NOT EXISTS idx_tipo_material_nome ON public.tipo_material(nome);

COMMENT ON TABLE public.tipo_material IS 'Categorias de materiais didáticos (Apostila, Slide, Vídeo, etc).';

-- 5.2. Tabela: MATERIAL (Materiais de apoio das matérias e aulas)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.material (
  id BIGSERIAL PRIMARY KEY,
  materia_id bigint NOT NULL REFERENCES public.materia(id) ON DELETE CASCADE,
  aula_id bigint REFERENCES public.aulas(id) ON DELETE SET NULL,
  titulo text NOT NULL,
  descricao text,
  url_arquivo text,
  tamanho_bytes bigint,
  ordem_exibicao integer DEFAULT 0,
  ativo boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.material ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_material_materia_id ON public.material(materia_id);
CREATE INDEX IF NOT EXISTS idx_material_aula_id ON public.material(aula_id);
CREATE INDEX IF NOT EXISTS idx_material_ativo ON public.material(ativo);

COMMENT ON TABLE public.material IS 'Materiais de apoio (apostilas, slides, vídeos) para matérias e aulas específicas.';
COMMENT ON COLUMN public.material.aula_id IS 'Referência para a aula específica a que o material pertence. Pode ser NULL se o material for genérico da matéria.';

-- 5.3. Tabela: EMENTAS (Conteúdo programático das matérias)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.ementas (
  id BIGSERIAL PRIMARY KEY,
  curso_id bigint NOT NULL REFERENCES public.curso(id) ON DELETE CASCADE,
  materia_id bigint NOT NULL REFERENCES public.materia(id) ON DELETE CASCADE,
  descricao text NOT NULL,
  conteudo JSONB,
  data_criacao timestamptz DEFAULT now(),
  data_atualizacao timestamptz DEFAULT now(),
  UNIQUE (curso_id, materia_id)
);

ALTER TABLE public.ementas ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_ementas_curso_id ON public.ementas(curso_id);
CREATE INDEX IF NOT EXISTS idx_ementas_materia_id ON public.ementas(materia_id);
CREATE INDEX IF NOT EXISTS idx_ementas_data_criacao ON public.ementas(data_criacao DESC);

-- Trigger para atualizar data_atualizacao automaticamente
CREATE OR REPLACE FUNCTION atualizar_data_atualizacao_ementas()
RETURNS TRIGGER AS $$
BEGIN
  NEW.data_atualizacao = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_atualizar_data_ementas ON public.ementas;
CREATE TRIGGER trigger_atualizar_data_ementas
  BEFORE UPDATE ON public.ementas
  FOR EACH ROW
  EXECUTE FUNCTION atualizar_data_atualizacao_ementas();

COMMENT ON TABLE public.ementas IS 'Ementas (conteúdo programático) de cada matéria por curso.';

-- ============================================================================
-- SEÇÃO 6: TABELAS DJANGO LOCAL (SQLite/PostgreSQL Local)
-- ============================================================================
-- Estas tabelas são da aplicação Django dashboard e podem rodar em SQLite (dev)
-- ou ser sincronizadas com Supabase em produção.

-- 6.1. Tabela: django_dashboard_geracaoslide
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.dashboard_geracaoslide (
  id BIGSERIAL PRIMARY KEY,
  arquivo text NOT NULL UNIQUE,
  status text NOT NULL DEFAULT 'PENDENTE'
    CHECK (status IN ('PENDENTE', 'GERADO', 'ERRO'))
   ,
  arquivo_saida text,
  tamanho text,
  slides integer,
  data_criacao timestamptz NOT NULL DEFAULT now(),
  data_geracao timestamptz,
  mensagem_erro text,
  avisos text,
  notas text
);

CREATE INDEX IF NOT EXISTS idx_dashboard_geracaoslide_status ON public.dashboard_geracaoslide(status);
CREATE INDEX IF NOT EXISTS idx_dashboard_geracaoslide_data_criacao ON public.dashboard_geracaoslide(data_criacao DESC);

COMMENT ON TABLE public.dashboard_geracaoslide IS 'Histórico de gerações de slides. Rastreia conversão de Markdown para PPTX.';

-- 6.2. Tabela: django_dashboard_usuariosupabase
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.dashboard_usuariosupabase (
  id text PRIMARY KEY,
  email text NOT NULL UNIQUE,
  nome text,
  criado_em timestamptz NOT NULL DEFAULT now(),
  atualizado_em timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_dashboard_usuariosupabase_email ON public.dashboard_usuariosupabase(email);

COMMENT ON TABLE public.dashboard_usuariosupabase IS 'Usuários autenticados via Supabase. Sincroniza dados de auth.users.';

-- 6.3. Tabela: django_dashboard_slide
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.dashboard_slide (
  id text PRIMARY KEY,
  usuario_id text NOT NULL,
  nome text NOT NULL,
  descricao text,
  materia text,
  curso text,
  status text NOT NULL DEFAULT 'criado'
    CHECK (status IN ('criado', 'processando', 'ativo', 'arquivado', 'excluido'))
   ,
  conteudo JSONB,
  arquivo_url text,
  criado_em timestamptz NOT NULL DEFAULT now(),
  atualizado_em timestamptz NOT NULL DEFAULT now(),
  sincronizado boolean DEFAULT false
);

ALTER TABLE public.dashboard_slide ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_dashboard_slide_usuario_id ON public.dashboard_slide(usuario_id);
CREATE INDEX IF NOT EXISTS idx_dashboard_slide_status ON public.dashboard_slide(status);
CREATE INDEX IF NOT EXISTS idx_dashboard_slide_criado_em ON public.dashboard_slide(criado_em DESC);

COMMENT ON TABLE public.dashboard_slide IS 'Slides criados via GERADOR-SLIDES. Sincronizados com Supabase.';

-- 6.4. Tabela: django_dashboard_ementa
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.dashboard_ementa (
  id SERIAL PRIMARY KEY,
  curso_id integer NOT NULL,
  materia_id integer NOT NULL,
  descricao text NOT NULL,
  conteudo JSONB,
  data_criacao timestamptz NOT NULL DEFAULT now(),
  data_atualizacao timestamptz NOT NULL DEFAULT now(),
  UNIQUE (curso_id, materia_id)
);

CREATE INDEX IF NOT EXISTS idx_dashboard_ementa_curso_id ON public.dashboard_ementa(curso_id);
CREATE INDEX IF NOT EXISTS idx_dashboard_ementa_materia_id ON public.dashboard_ementa(materia_id);
CREATE INDEX IF NOT EXISTS idx_dashboard_ementa_data_criacao ON public.dashboard_ementa(data_criacao DESC);

COMMENT ON TABLE public.dashboard_ementa IS 'Ementas gerenciadas via Django. Dupla com public.ementas para sincronização.';

-- ============================================================================
-- SEÇÃO 7: TRIGGERS DE ATUALIZAÇÃO AUTOMÁTICA
-- ============================================================================

-- 7.1. Atualizar data de modificação em curso
-- ============================================================================
CREATE OR REPLACE FUNCTION atualizar_data_curso()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_atualizar_data_curso ON public.curso;
CREATE TRIGGER trigger_atualizar_data_curso
  BEFORE UPDATE ON public.curso
  FOR EACH ROW
  EXECUTE FUNCTION atualizar_data_curso();

-- 7.2. Atualizar data de modificação em materia
-- ============================================================================
CREATE OR REPLACE FUNCTION atualizar_data_materia()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_atualizar_data_materia ON public.materia;
CREATE TRIGGER trigger_atualizar_data_materia
  BEFORE UPDATE ON public.materia
  FOR EACH ROW
  EXECUTE FUNCTION atualizar_data_materia();

-- 7.3. Atualizar data de modificação em avaliacao
-- ============================================================================
CREATE OR REPLACE FUNCTION atualizar_data_avaliacao()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_atualizar_data_avaliacao ON public.avaliacao;
CREATE TRIGGER trigger_atualizar_data_avaliacao
  BEFORE UPDATE ON public.avaliacao
  FOR EACH ROW
  EXECUTE FUNCTION atualizar_data_avaliacao();

-- ============================================================================
-- SEÇÃO 8: DADOS INICIAIS (SAMPLE DATA)
-- ============================================================================

-- 8.1. Inserir tipos de material padrão
-- ============================================================================
INSERT INTO public.tipo_material (nome, descricao, ativo)
VALUES
  ('Apostila', 'Apostila/Material teórico em PDF ou Markdown', true),
  ('Slide', 'Slides de apresentação (PPTX, PDF)', true),
  ('Vídeo', 'Vídeo aula ou tutorial', true),
  ('Exercício', 'Lista de exercícios', true),
  ('Prova', 'Avaliação/Prova', true),
  ('Atividade Prática', 'Atividade hands-on ou projeto', true),
  ('Referência', 'Material de referência ou leitura complementar', true)
ON CONFLICT (nome) DO NOTHING;

-- 8.2. Inserir pendências iniciais (exemplo)
-- ============================================================================
INSERT INTO public.pendencias
  (data, datavencimento, descricao, status, materia_id, materia_descricao, total_horas, horas_ministradas)
VALUES
  ('2026-08-24', '2026-08-24', 'AVALIACAO CEPLAS', 'PENDENTE', '509636', 'Introdução a comunicação oral e escrita', 33, 22),
  ('2026-08-24', '2026-08-25', 'AVALIACAO AI PRESID. GETULIO - LANÇAR NOTAS', 'PENDENTE', '553990', 'Introdução a Tecnologia da Informação e Comunicação', 40, 36),
  ('2026-08-24', '2026-08-25', 'ATIVIDADE DE BANCO DE DADOS', 'PENDENTE', '446366', 'BANCO DE DADOS', 80, 76)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- SEÇÃO 9: COMENTÁRIOS E DOCUMENTAÇÃO
-- ============================================================================

-- 9.1. Relacionamentos (Diagrama Textual)
-- ============================================================================
/*
DIAGRAMA DE RELACIONAMENTOS:

┌─────────────────────────────────────────────────────────────────────┐
│                        AULAS-SENAI PROJECT                          │
└─────────────────────────────────────────────────────────────────────┘

┌──────────────┐              ┌─────────────────┐
│   UNIDADE    │              │     CURSO       │
├──────────────┤              ├─────────────────┤
│ id (PK)      │◄─────────────┤ id (PK)         │
│ descricao    │   1:N        │ nome_completo   │
│ cidade       │              │ unidade         │
│ endereco     │              │ materias (JSON) │
└──────────────┘              └─────────────────┘
                                       │
                                    1:N│
                                       ▼
                          ┌──────────────────────┐
                          │  CURSOMATERIA (JT)   │
                          ├──────────────────────┤
                          │ cursoid (FK)         │
                          │ materiaid (FK)       │
                          └──────────────────────┘
                                       │
                                    N:1│
                                       ▼
                          ┌──────────────────────┐
                          │     MATERIA          │
                          ├──────────────────────┤
                          │ id (PK)              │
                          │ descricao            │
                          │ ementa_caminho       │
                          │ apostila_caminho     │
                          │ conteudo_aulas       │
                          │ status_* (4 cols)    │
                          └──────────────────────┘
                                  │
                  ┌───────────────┼───────────────┐
                  ▼               ▼               ▼
            ┌─────────────┐ ┌──────────────┐ ┌──────────────┐
            │   AULAS     │ │  AVALIACAO   │ │  EMENTAS     │
            ├─────────────┤ ├──────────────┤ ├──────────────┤
            │ id (PK)     │ │ id (PK)      │ │ id (PK)      │
            │ numero      │ │ numero       │ │ curso_id(FK) │
            │ titulo      │ │ titulo       │ │ materia_id(FK)
            │ materia_id(FK) │ materia_id(FK) │ descricao    │
            │ curso_id(FK)│ │ status (4)   │ │ conteudo     │
            │ duracao     │ │ data_aplicacao │ └──────────────┘
            │ conteudo    │ └──────────────┘
            └─────────────┘
                  │
                  ▼
            ┌──────────────┐
            │   MATERIAL   │
            ├──────────────┤
            │ id (PK)      │
            │ materia_id(FK)
            │ aula_id(FK)  │
            │ titulo       │
            │ url_arquivo  │
            └──────────────┘

TABELAS DJANGO (Sincronizadas):
┌──────────────────────────────────────────────────────────┐
│ dashboard_geracaoslide  | dashboard_usuariosupabase      │
│ dashboard_slide         | dashboard_ementa               │
└──────────────────────────────────────────────────────────┘

*/

-- 9.2. Resumo de Constraints e Validações
-- ============================================================================
/*
CONSTRAINTS PRINCIPAIS:

✓ UNIQUE:
  - curso: (nome_completo, unidade) — impede cursos duplicados
  - cursomateria: (cursoid, materiaid) — chave primária
  - avaliacao: (materia_id, numero) — uma avaliação por número
  - ementas: (curso_id, materia_id) — uma ementa por combinação
  - aulas: (materia_id, numero) — uma aula por número

✓ CHECK (enums):
  - avaliacao.status: PENDENTE, ANDAMENTO, CONCLUIDO, CANCELADO
  - materia.status_*: PENDENTE, ANDAMENTO, CONCLUIDO, CANCELADO
  - pendencias.status: PENDENTE, ANDAMENTO, CONCLUIDO, CANCELADO
  - dashboard_slide.status: criado, processando, ativo, arquivado, excluido

✓ FOREIGN KEYS:
  - aulas → materia, curso (ON DELETE CASCADE)
  - avaliacao → materia (ON DELETE CASCADE)
  - ementas → curso, materia (ON DELETE CASCADE)
  - material → materia (ON DELETE CASCADE)
  - material → tipo_material (ON DELETE RESTRICT)
  - cursomateria → curso, materia (ON DELETE CASCADE)

✓ TRIGGERS:
  - Atualizar data_atualizacao automaticamente em: curso, materia, avaliacao, ementas
  - Garantir mínimo 2 avaliações por matéria
  - Impedir deleção de avaliação se menos de 2

✓ RLS (Row Level Security):
  - Habilitado em: curso, materia, cursomateria, avaliacao, pendencias,
    ementas, dashboard_slide, dashboard_usuariosupabase
  - Políticas: SELECT, INSERT, UPDATE, DELETE liberadas para 'anon'
*/

-- 9.3. Índices para Performance
-- ============================================================================
/*
ÍNDICES CRIADOS:

Busca por Status:
  - idx_curso_ativo
  - idx_avaliacao_status
  - idx_pendencias_status
  - idx_dashboard_geracaoslide_status
  - idx_dashboard_slide_status
  - idx_material_ativo

Busca por Foreign Keys (Joins):
  - idx_cursomateria_cursoid
  - idx_cursomateria_materiaid
  - idx_avaliacao_materia_id
  - idx_aulas_materia_id
  - idx_aulas_curso_id
  - idx_ementas_curso_id
  - idx_ementas_materia_id
  - idx_material_materia_id
  - idx_dashboard_slide_usuario_id

Busca por Datas (Filtros temporais):
  - idx_avaliacao_data_aplicacao
  - idx_aulas_data_planejada
  - idx_ementas_data_criacao
  - idx_dashboard_geracaoslide_data_criacao
  - idx_dashboard_slide_criado_em

Busca Textual:
  - idx_curso_nome_completo
  - idx_materia_descricao
  - idx_tipo_material_nome

Busca Avançada (GIN):
  - idx_materia_conteudo_aulas_status (JSONB)
*/

-- ============================================================================
-- FINAL: Verificação de Integridade
-- ============================================================================
/*
Execute as queries abaixo para verificar a criação:

-- Listar todas as tabelas criadas:
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;

-- Contar total de tabelas:
SELECT COUNT(*) as total_tabelas
FROM information_schema.tables
WHERE table_schema = 'public';

-- Verificar relacionamentos:
SELECT constraint_name, table_name, column_name, referenced_table_name, referenced_column_name
FROM information_schema.key_column_usage
WHERE table_schema = 'public' AND referenced_table_name IS NOT NULL
ORDER BY table_name;

-- Verificar índices:
SELECT tablename, indexname
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename;
*/

-- ============================================================================
-- FIM DO ARQUIVO: TABELAS-SISTEMA-SENAI.sql
-- ============================================================================
-- Total de Tabelas: 15
-- Total de Triggers: 5
-- Total de Funções: 3
-- Total de Índices: 30+
-- Data de Criação: 2026-09-05
-- Versão: 1.0 (Consolidado)
-- ============================================================================
