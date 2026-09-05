-- ============================================================================
-- SCRIPT-INSERT-MATERIAS.sql
-- Extrai matérias da coluna JSON da tabela curso e insere na tabela materia
-- Data: 05-09-2026
-- ============================================================================

-- ============================================================================
-- 1. INSERIR MATÉRIAS DA TABELA CURSO
-- ============================================================================

-- Curso ID 2: OPERADOR DE PRODUÇÃO INDUSTRIAL
INSERT INTO materia (descricao, ativo) VALUES
  ('História da Computação e Iniciando no Chromebook', 1),
  ('Aula de Digitação - AgileFingers', 1),
  ('Elementos da Comunicação', 1),
  ('Comunicação em Equipes de Trabalho', 1),
  ('Internet, Segurança, Hardware e SO - Trabalho em Equipes', 1),
  ('Google Docs — Editor de Textos e Google Slides — Editor de Apresentações', 1),
  ('Google Sheets — Planilhas Eletrônicas, Textos Técnicos e Revisão Geral', 1),
  ('Ferramentas Microsoft (bônus)', 1),
  ('Avaliação Prática — Google Workspace', 1),
  ('Avaliação Objetiva — Múltipla Escolha', 1);

-- Curso ID 3: TECNICO EM DESENVOLVIMENTO DE SISTEMAS
INSERT INTO materia (descricao, ativo) VALUES
  ('LÓGICA DE PROGRAMAÇÃO', 1);

-- Curso ID 16: RIO DO SUL MAIS TECH
INSERT INTO materia (descricao, ativo) VALUES
  ('AULA 01 - Saga dos Computadores', 1),
  ('Ferramentas Digitais para Comunicação', 1),
  ('Resumo de Carreiras na Industria e Tecnologia', 1);

-- ============================================================================
-- 2. VINCULAR MATÉRIAS AOS CURSOS NA TABELA cursomateria
-- ============================================================================

-- Curso 2 (OPERADOR DE PRODUÇÃO INDUSTRIAL) - Vincula os IDs 1-10
INSERT INTO cursomateria (cursoid, materiaid) VALUES
  (2, (SELECT id FROM materia WHERE descricao = 'História da Computação e Iniciando no Chromebook' LIMIT 1)),
  (2, (SELECT id FROM materia WHERE descricao = 'Aula de Digitação - AgileFingers' LIMIT 1)),
  (2, (SELECT id FROM materia WHERE descricao = 'Elementos da Comunicação' LIMIT 1)),
  (2, (SELECT id FROM materia WHERE descricao = 'Comunicação em Equipes de Trabalho' LIMIT 1)),
  (2, (SELECT id FROM materia WHERE descricao = 'Internet, Segurança, Hardware e SO - Trabalho em Equipes' LIMIT 1)),
  (2, (SELECT id FROM materia WHERE descricao = 'Google Docs — Editor de Textos e Google Slides — Editor de Apresentações' LIMIT 1)),
  (2, (SELECT id FROM materia WHERE descricao = 'Google Sheets — Planilhas Eletrônicas, Textos Técnicos e Revisão Geral' LIMIT 1)),
  (2, (SELECT id FROM materia WHERE descricao = 'Ferramentas Microsoft (bônus)' LIMIT 1)),
  (2, (SELECT id FROM materia WHERE descricao = 'Avaliação Prática — Google Workspace' LIMIT 1)),
  (2, (SELECT id FROM materia WHERE descricao = 'Avaliação Objetiva — Múltipla Escolha' LIMIT 1));

-- Curso 3 (TECNICO EM DESENVOLVIMENTO DE SISTEMAS)
INSERT INTO cursomateria (cursoid, materiaid)
SELECT 3, id FROM materia WHERE descricao = 'LÓGICA DE PROGRAMAÇÃO';

-- Curso 16 (RIO DO SUL MAIS TECH)
INSERT INTO cursomateria (cursoid, materiaid)
SELECT 16, id FROM materia WHERE descricao IN (
  'AULA 01 - Saga dos Computadores',
  'Ferramentas Digitais para Comunicação',
  'Resumo de Carreiras na Industria e Tecnologia'
);

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
