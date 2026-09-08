-- =====================================================
-- MIGRAÇÃO: Adicionar coluna aulas_caminho à tabela materia
-- =====================================================
-- Data: 2026-09-08
-- Descrição: Adicionar campo para armazenar caminho das aulas
-- Status: ✅ Executado
-- =====================================================

ALTER TABLE materia ADD COLUMN aulas_caminho VARCHAR(400);

-- =====================================================
-- EXEMPLOS DE PREENCHIMENTO:
-- =====================================================
-- UPDATE materia SET aulas_caminho = 'QUALIFICACAO-PROFISSIONAL/INTRODUCAO-LEAN-MANUFACTURING/AULAS/' WHERE id = '...';
-- UPDATE materia SET aulas_caminho = 'FICHA-PRODUTO-MAIS-TECH/FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO/AULAS/' WHERE descricao LIKE 'Fundamentos%';

-- =====================================================
-- VERIFICAR SE COLUNA FOI CRIADA:
-- =====================================================
-- SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'materia' AND column_name = 'aulas_caminho';
