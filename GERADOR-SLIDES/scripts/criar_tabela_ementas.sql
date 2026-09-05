-- ============================================================================
-- Script para criar tabela EMENTAS no Supabase
-- ============================================================================
-- Objetivo: Armazenar ementas (conteúdo markdown) associadas a cada matéria
-- Status: Pronto para executar no Supabase SQL Editor
-- Data: 05-09-2026
-- ============================================================================

-- 1. Criar tabela ementas
-- ============================================================================
CREATE TABLE IF NOT EXISTS ementas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  curso_id UUID NOT NULL REFERENCES curso(id) ON DELETE CASCADE,
  materia_id UUID NOT NULL REFERENCES materia(id) ON DELETE CASCADE,
  descricao VARCHAR(255) NOT NULL COMMENT 'Nome/Descrição da ementa',
  conteudo JSONB DEFAULT NULL COMMENT 'Conteúdo markdown armazenado como JSON',
  data_criacao TIMESTAMP DEFAULT NOW() COMMENT 'Data de criação do registro',
  data_atualizacao TIMESTAMP DEFAULT NOW() COMMENT 'Data da última atualização',
  CONSTRAINT uq_ementas_curso_materia UNIQUE(curso_id, materia_id) COMMENT 'Uma ementa por combinação curso+materia'
);

-- 2. Criar índices para performance
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_ementas_curso_id ON ementas(curso_id);
CREATE INDEX IF NOT EXISTS idx_ementas_materia_id ON ementas(materia_id);
CREATE INDEX IF NOT EXISTS idx_ementas_data_criacao ON ementas(data_criacao DESC);

-- 3. Habilitar RLS (Row Level Security) se necessário
-- ============================================================================
-- Descomente as linhas abaixo se quiser controlar acesso por usuário
-- ALTER TABLE ementas ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "usuários podem ver ementas do seu curso" ON ementas
--   FOR SELECT USING (auth.uid() = curso.criado_por);

-- 4. Criar trigger para atualizar data_atualizacao automaticamente
-- ============================================================================
CREATE OR REPLACE FUNCTION atualizar_data_atualizacao_ementas()
RETURNS TRIGGER AS $$
BEGIN
  NEW.data_atualizacao = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_atualizar_data_ementas
  BEFORE UPDATE ON ementas
  FOR EACH ROW
  EXECUTE FUNCTION atualizar_data_atualizacao_ementas();

-- ============================================================================
-- Verificação: Execute a query abaixo para confirmar que a tabela foi criada
-- ============================================================================
-- SELECT
--   table_name,
--   column_name,
--   data_type,
--   is_nullable
-- FROM information_schema.columns
-- WHERE table_name = 'ementas'
-- ORDER BY ordinal_position;
-- ============================================================================
