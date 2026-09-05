-- ============================================================================
-- SCRIPT-CONSTRAINT-CURSO-NOME-UNICO.sql
-- Adiciona constraint UNIQUE para impedir cursos com nomes duplicados
-- Data: 05-09-2026
-- ============================================================================

-- ============================================================================
-- 1. ADICIONAR CONSTRAINT UNIQUE NA COLUNA nome_completo
-- ============================================================================

ALTER TABLE curso
ADD CONSTRAINT uq_curso_nome_completo UNIQUE (nome_completo);

-- ============================================================================
-- 2. VERIFICAÇÃO
-- ============================================================================

-- Listar todas as constraints da tabela curso
SELECT constraint_name, constraint_type
FROM information_schema.table_constraints
WHERE table_name = 'curso'
ORDER BY constraint_name;

-- ============================================================================
-- RESULTADO ESPERADO
-- ============================================================================
-- A constraint "uq_curso_nome_completo" foi criada.
-- Agora será impossível inserir dois cursos com o mesmo valor em nome_completo.
--
-- Exemplo de tentativa que falhará:
-- INSERT INTO curso (nome_completo) VALUES ('OPERADOR DE PRODUÇÃO INDUSTRIAL');
-- ERROR: duplicate key value violates unique constraint "uq_curso_nome_completo"

-- ============================================================================
-- FIM DO SCRIPT
-- ============================================================================
