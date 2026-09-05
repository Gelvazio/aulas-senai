-- Migration: Adicionar coluna conteudo_aulas na tabela materia
-- Data: 2026-09-05
-- Descrição: Adiciona coluna JSON para armazenar status e metadados de aulas geradas

ALTER TABLE materia
ADD COLUMN conteudo_aulas JSONB DEFAULT '{
  "status": "nao_gerado",
  "data_geracao": null,
  "total_aulas": 0,
  "aulas_geradas": [],
  "timestamp_ultima_atualizacao": null,
  "versao_claude": "1.0",
  "prompt_usado": null,
  "avisos": []
}'::jsonb;

-- Índice para facilitar buscas
CREATE INDEX idx_materia_conteudo_aulas_status ON materia USING GIN (conteudo_aulas);

-- Comentário descritivo
COMMENT ON COLUMN materia.conteudo_aulas IS 'JSON com status e dados de aulas geradas via Claude API. Status pode ser: nao_gerado, gerando, gerado, erro';
