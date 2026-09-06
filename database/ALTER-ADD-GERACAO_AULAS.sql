-- Adicionar coluna geracao_aulas à tabela ementas
-- Esta coluna armazena um histórico de gerações de aulas com data/hora

ALTER TABLE public.ementas
ADD COLUMN geracao_aulas JSONB DEFAULT '[]'::jsonb;

-- Adicionar comentário à coluna
COMMENT ON COLUMN public.ementas.geracao_aulas IS 'Histórico de gerações de aulas: [{timestamp: ISO8601, aulas_geradas: []}]';

-- Exemplo de estrutura do JSON:
-- [
--   {
--     "timestamp": "2026-09-05T23:30:00Z",
--     "aulas_geradas": [
--       {"numero": 1, "titulo": "AULA 01 - Introdução ao tema", "descricao": "Introdução ao tema"},
--       {"numero": 2, "titulo": "AULA 02 - Conceitos básicos", "descricao": "Conceitos básicos"}
--     ],
--     "total_aulas": 2,
--     "status": "concluido"
--   }
-- ]

-- Criar índice para facilitar queries
CREATE INDEX IF NOT EXISTS idx_ementas_geracao_aulas ON public.ementas USING GIN (geracao_aulas);

-- Validação: Verificar se a coluna foi criada com sucesso
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'ementas' AND column_name = 'geracao_aulas';
