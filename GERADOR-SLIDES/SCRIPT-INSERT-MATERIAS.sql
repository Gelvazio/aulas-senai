-- ============================================================================
-- SCRIPT-INSERT-MATERIAS.sql
-- Extrai matérias da coluna JSON da tabela curso e insere na tabela materia
-- Data: 05-09-2026
-- ============================================================================

-- Desabilitar constraints temporariamente se necessário
-- ALTER TABLE cursomateria DISABLE TRIGGER ALL;

-- ============================================================================
-- 1. INSERIR MATÉRIAS DA TABELA CURSO
-- ============================================================================

-- Curso ID 2: OPERADOR DE PRODUÇÃO INDUSTRIAL
INSERT INTO materia (id, descricao, nome, criado_em) VALUES
  (gen_random_uuid(), 'História da Computação e Iniciando no Chromebook', 'HISTÓRIA-COMPUTAÇÃO-CHROMEBOOK', NOW()),
  (gen_random_uuid(), 'Aula de Digitação - AgileFingers', 'DIGITAÇÃO-AGILEFINGERS', NOW()),
  (gen_random_uuid(), 'Elementos da Comunicação', 'ELEMENTOS-COMUNICAÇÃO', NOW()),
  (gen_random_uuid(), 'Comunicação em Equipes de Trabalho', 'COMUNICAÇÃO-EQUIPES', NOW()),
  (gen_random_uuid(), 'Internet, Segurança, Hardware e SO - Trabalho em Equipes', 'INTERNET-SEGURANÇA-HARDWARE', NOW()),
  (gen_random_uuid(), 'Google Docs — Editor de Textos e Google Slides — Editor de Apresentações', 'GOOGLE-DOCS-SLIDES', NOW()),
  (gen_random_uuid(), 'Google Sheets — Planilhas Eletrônicas, Textos Técnicos e Revisão Geral', 'GOOGLE-SHEETS', NOW()),
  (gen_random_uuid(), 'Ferramentas Microsoft (bônus)', 'FERRAMENTAS-MICROSOFT', NOW()),
  (gen_random_uuid(), 'Avaliação Prática — Google Workspace', 'AVALIAÇÃO-PRÁTICA', NOW()),
  (gen_random_uuid(), 'Avaliação Objetiva — Múltipla Escolha', 'AVALIAÇÃO-OBJETIVA', NOW())
ON CONFLICT DO NOTHING;

-- Curso ID 3: TECNICO EM DESENVOLVIMENTO DE SISTEMAS
INSERT INTO materia (id, descricao, nome, criado_em) VALUES
  (gen_random_uuid(), 'LÓGICA DE PROGRAMAÇÃO', 'LÓGICA-PROGRAMAÇÃO', NOW())
ON CONFLICT DO NOTHING;

-- Curso ID 16: RIO DO SUL MAIS TECH
INSERT INTO materia (id, descricao, nome, criado_em) VALUES
  (gen_random_uuid(), 'AULA 01 - Saga dos Computadores', 'SAGA-COMPUTADORES', NOW()),
  (gen_random_uuid(), 'Ferramentas Digitais para Comunicação', 'FERRAMENTAS-DIGITAIS', NOW()),
  (gen_random_uuid(), 'Resumo de Carreiras na Industria e Tecnologia', 'CARREIRAS-INDUSTRIA', NOW())
ON CONFLICT DO NOTHING;

-- ============================================================================
-- 2. VINCULAR MATÉRIAS AOS CURSOS NA TABELA cursomateria
-- ============================================================================

-- Curso 2 (OPERADOR DE PRODUÇÃO INDUSTRIAL)
INSERT INTO cursomateria (cursoid, materiaid)
SELECT 2, id FROM materia
WHERE nome IN (
  'HISTÓRIA-COMPUTAÇÃO-CHROMEBOOK',
  'DIGITAÇÃO-AGILEFINGERS',
  'ELEMENTOS-COMUNICAÇÃO',
  'COMUNICAÇÃO-EQUIPES',
  'INTERNET-SEGURANÇA-HARDWARE',
  'GOOGLE-DOCS-SLIDES',
  'GOOGLE-SHEETS',
  'FERRAMENTAS-MICROSOFT',
  'AVALIAÇÃO-PRÁTICA',
  'AVALIAÇÃO-OBJETIVA'
)
ON CONFLICT DO NOTHING;

-- Curso 3 (TECNICO EM DESENVOLVIMENTO DE SISTEMAS)
INSERT INTO cursomateria (cursoid, materiaid)
SELECT 3, id FROM materia
WHERE nome = 'LÓGICA-PROGRAMAÇÃO'
ON CONFLICT DO NOTHING;

-- Curso 16 (RIO DO SUL MAIS TECH)
INSERT INTO cursomateria (cursoid, materiaid)
SELECT 16, id FROM materia
WHERE nome IN (
  'SAGA-COMPUTADORES',
  'FERRAMENTAS-DIGITAIS',
  'CARREIRAS-INDUSTRIA'
)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- 3. VERIFICAÇÃO
-- ============================================================================

-- Verificar matérias inseridas
SELECT COUNT(*) as total_materias FROM materia;

-- Verificar vínculos
SELECT c.nome_completo, COUNT(m.id) as total_materias_vinculadas
FROM cursomateria cm
JOIN curso c ON c.id = cm.cursoid
JOIN materia m ON m.id = cm.materiaid
GROUP BY c.id, c.nome_completo
ORDER BY c.nome_completo;

-- ============================================================================
-- FIM DO SCRIPT
-- ============================================================================
