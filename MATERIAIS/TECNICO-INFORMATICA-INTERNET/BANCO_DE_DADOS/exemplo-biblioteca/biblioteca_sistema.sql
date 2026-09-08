-- =====================================================================
-- SISTEMA DE BIBLIOTECA
-- Entidades: USUARIO, LIVRO, EMPRESTIMO
-- =====================================================================

-- Criar banco de dados
CREATE DATABASE IF NOT EXISTS biblioteca;
USE biblioteca;

-- =====================================================================
-- TABELA 1: USUARIO
-- Descrição: Cadastro de usuários que podem emprestar livros
-- =====================================================================
CREATE TABLE USUARIO (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    telefone VARCHAR(11),
    cpf VARCHAR(11) NOT NULL UNIQUE,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('ativo', 'inativo', 'bloqueado') DEFAULT 'ativo',
    limite_emprestimos INT DEFAULT 5,

    INDEX idx_email (email),
    INDEX idx_cpf (cpf),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =====================================================================
-- TABELA 2: LIVRO
-- Descrição: Catálogo de livros disponíveis na biblioteca
-- =====================================================================
CREATE TABLE LIVRO (
    id_livro INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    autor VARCHAR(100) NOT NULL,
    isbn VARCHAR(13) NOT NULL UNIQUE,
    editora VARCHAR(100),
    ano_publicacao INT,
    categoria VARCHAR(50),
    quantidade_total INT NOT NULL DEFAULT 1,
    quantidade_disponivel INT NOT NULL DEFAULT 1,
    preco_aquisicao DECIMAL(10, 2),
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('disponivel', 'indisponivel', 'descartado') DEFAULT 'disponivel',

    INDEX idx_titulo (titulo),
    INDEX idx_autor (autor),
    INDEX idx_categoria (categoria),
    INDEX idx_isbn (isbn)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =====================================================================
-- TABELA 3: EMPRESTIMO
-- Descrição: Registro de empréstimos de livros aos usuários
-- =====================================================================
CREATE TABLE EMPRESTIMO (
    id_emprestimo INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_livro INT NOT NULL,
    data_emprestimo DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_devolucao_prevista DATE NOT NULL,
    data_devolucao_real DATE,
    multa_atraso DECIMAL(8, 2) DEFAULT 0,
    status ENUM('emprestado', 'devolvido', 'atrasado', 'perdido') DEFAULT 'emprestado',
    observacoes TEXT,

    CONSTRAINT fk_emprestimo_usuario FOREIGN KEY (id_usuario)
        REFERENCES USUARIO(id_usuario) ON DELETE RESTRICT,
    CONSTRAINT fk_emprestimo_livro FOREIGN KEY (id_livro)
        REFERENCES LIVRO(id_livro) ON DELETE RESTRICT,

    INDEX idx_usuario (id_usuario),
    INDEX idx_livro (id_livro),
    INDEX idx_status (status),
    INDEX idx_data_emprestimo (data_emprestimo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =====================================================================
-- INSERÇÃO DE DADOS DE TESTE
-- =====================================================================

-- Limpar dados existentes
DELETE FROM EMPRESTIMO;
DELETE FROM LIVRO;
DELETE FROM USUARIO;

-- =====================================================================
-- Inserir usuários (5 registros)
-- =====================================================================
INSERT INTO USUARIO (nome, email, telefone, cpf, status, limite_emprestimos) VALUES
('João Silva', 'joao@email.com', '11987654321', '12345678901', 'ativo', 5),
('Maria Santos', 'maria@email.com', '11987654322', '12345678902', 'ativo', 5),
('Pedro Oliveira', 'pedro@email.com', '11987654323', '12345678903', 'ativo', 3),
('Ana Costa', 'ana@email.com', '11987654324', '12345678904', 'bloqueado', 0),
('Carlos Mendes', 'carlos@email.com', '11987654325', '12345678905', 'ativo', 5);

-- =====================================================================
-- Inserir livros (8 registros)
-- =====================================================================
INSERT INTO LIVRO (titulo, autor, isbn, editora, ano_publicacao, categoria, quantidade_total, quantidade_disponivel, preco_aquisicao, status) VALUES
('O Senhor dos Anéis', 'J.R.R. Tolkien', '9788595086676', 'Aleph', 1954, 'Ficção Fantasia', 3, 1, 89.90, 'disponivel'),
('Harry Potter e a Pedra Filosofal', 'J.K. Rowling', '9788532530786', 'Rocco', 1997, 'Ficção Fantasia', 5, 2, 49.90, 'disponivel'),
('1984', 'George Orwell', '9788522009307', 'Companhia das Letras', 1949, 'Ficção Distopia', 2, 0, 45.00, 'indisponivel'),
('O Hobbit', 'J.R.R. Tolkien', '9788595086683', 'Aleph', 1937, 'Ficção Fantasia', 2, 1, 59.90, 'disponivel'),
('Cem Anos de Solidão', 'Gabriel García Márquez', '9788532511010', 'Record', 1967, 'Ficção Realismo Mágico', 1, 1, 55.00, 'disponivel'),
('O Príncipe', 'Nicolau Maquiavel', '9788535919851', 'L&PM Editores', 1513, 'Política', 1, 1, 35.00, 'disponivel'),
('Sapiens', 'Yuval Noah Harari', '9788532629760', 'L&PM Editores', 2011, 'História', 2, 1, 59.90, 'disponivel'),
('A Revolução dos Bichos', 'George Orwell', '9788535911718', 'Companhia das Letras', 1945, 'Ficção Alegoria', 3, 3, 38.90, 'disponivel');

-- =====================================================================
-- Inserir empréstimos (6 registros)
-- =====================================================================
INSERT INTO EMPRESTIMO (id_usuario, id_livro, data_emprestimo, data_devolucao_prevista, data_devolucao_real, status, observacoes) VALUES
(1, 1, '2024-01-10 10:30:00', '2024-01-24', NULL, 'emprestado', 'Em bom estado'),
(2, 2, '2024-01-15 14:00:00', '2024-01-29', '2024-01-28', 'devolvido', 'Devolução antecipada'),
(1, 4, '2024-01-18 11:15:00', '2024-02-01', NULL, 'emprestado', 'Leitura em andamento'),
(3, 7, '2024-01-12 09:45:00', '2024-02-09', NULL, 'atrasado', 'Prazo vencido há 3 dias'),
(5, 6, '2024-01-20 16:30:00', '2024-02-03', NULL, 'emprestado', 'Primeira leitura'),
(2, 8, '2024-01-22 13:20:00', '2024-02-05', NULL, 'emprestado', 'Reservado previamente');

-- =====================================================================
-- CONSULTAS ÚTEIS
-- =====================================================================

-- 1. Listar todos os livros disponíveis
SELECT
    id_livro,
    titulo,
    autor,
    categoria,
    quantidade_disponivel
FROM LIVRO
WHERE status = 'disponivel'
ORDER BY titulo;

-- 2. Listar usuários com empréstimos ativos
SELECT
    u.id_usuario,
    u.nome,
    u.email,
    COUNT(e.id_emprestimo) as total_emprestimos_ativos,
    u.limite_emprestimos
FROM USUARIO u
LEFT JOIN EMPRESTIMO e ON u.id_usuario = e.id_usuario
    AND e.status IN ('emprestado', 'atrasado')
GROUP BY u.id_usuario
HAVING COUNT(e.id_emprestimo) > 0
ORDER BY u.nome;

-- 3. Livros emprestados e quando devem ser devolvidos
SELECT
    e.id_emprestimo,
    u.nome as usuario,
    l.titulo as livro,
    e.data_emprestimo,
    e.data_devolucao_prevista,
    DATEDIFF(e.data_devolucao_prevista, CURDATE()) as dias_restantes,
    e.status
FROM EMPRESTIMO e
INNER JOIN USUARIO u ON e.id_usuario = u.id_usuario
INNER JOIN LIVRO l ON e.id_livro = l.id_livro
WHERE e.status IN ('emprestado', 'atrasado')
ORDER BY e.data_devolucao_prevista ASC;

-- 4. Empréstimos atrasados com multa
SELECT
    e.id_emprestimo,
    u.nome as usuario,
    l.titulo as livro,
    e.data_devolucao_prevista,
    CURDATE() as data_atual,
    DATEDIFF(CURDATE(), e.data_devolucao_prevista) as dias_atraso,
    DATEDIFF(CURDATE(), e.data_devolucao_prevista) * 2.50 as multa_calculada
FROM EMPRESTIMO e
INNER JOIN USUARIO u ON e.id_usuario = u.id_usuario
INNER JOIN LIVRO l ON e.id_livro = l.id_livro
WHERE e.status IN ('emprestado', 'atrasado')
    AND e.data_devolucao_prevista < CURDATE()
ORDER BY dias_atraso DESC;

-- 5. Histórico de devoluções de um usuário
SELECT
    e.id_emprestimo,
    l.titulo,
    l.autor,
    e.data_emprestimo,
    e.data_devolucao_prevista,
    e.data_devolucao_real,
    e.status,
    CASE
        WHEN e.status = 'devolvido' AND e.data_devolucao_real <= e.data_devolucao_prevista
            THEN 'No prazo'
        WHEN e.status = 'devolvido' AND e.data_devolucao_real > e.data_devolucao_prevista
            THEN 'Atrasado'
        ELSE 'Pendente'
    END as situacao
FROM EMPRESTIMO e
INNER JOIN LIVRO l ON e.id_livro = l.id_livro
WHERE e.id_usuario = 1
ORDER BY e.data_emprestimo DESC;

-- 6. Livros mais emprestados
SELECT
    l.id_livro,
    l.titulo,
    l.autor,
    COUNT(e.id_emprestimo) as total_emprestimos,
    COUNT(DISTINCT e.id_usuario) as total_usuarios
FROM LIVRO l
LEFT JOIN EMPRESTIMO e ON l.id_livro = e.id_livro
GROUP BY l.id_livro
ORDER BY total_emprestimos DESC;

-- 7. Estatísticas por categoria
SELECT
    l.categoria,
    COUNT(DISTINCT l.id_livro) as total_livros,
    SUM(l.quantidade_disponivel) as livros_disponiveis,
    COUNT(DISTINCT e.id_emprestimo) as total_emprestimos
FROM LIVRO l
LEFT JOIN EMPRESTIMO e ON l.id_livro = e.id_livro
GROUP BY l.categoria
ORDER BY total_emprestimos DESC;

-- 8. Usuários com empréstimos vencidos
SELECT
    u.id_usuario,
    u.nome,
    u.email,
    COUNT(e.id_emprestimo) as emprestimos_atrasados,
    SUM(DATEDIFF(CURDATE(), e.data_devolucao_prevista)) as dias_atraso_total
FROM USUARIO u
INNER JOIN EMPRESTIMO e ON u.id_usuario = e.id_usuario
WHERE e.status IN ('emprestado', 'atrasado')
    AND e.data_devolucao_prevista < CURDATE()
GROUP BY u.id_usuario
ORDER BY dias_atraso_total DESC;

-- =====================================================================
-- OPERAÇÕES DML
-- =====================================================================

-- Registrar devolução de um livro
-- UPDATE EMPRESTIMO
-- SET data_devolucao_real = CURDATE(),
--     status = 'devolvido'
-- WHERE id_emprestimo = 2;

-- Atualizar quantidade de livros disponíveis
-- UPDATE LIVRO
-- SET quantidade_disponivel = quantidade_disponivel + 1
-- WHERE id_livro = 2;

-- Bloquear usuário com muitos atrasos
-- UPDATE USUARIO
-- SET status = 'bloqueado'
-- WHERE id_usuario = 3;

-- Registrar perda de livro
-- UPDATE EMPRESTIMO
-- SET status = 'perdido',
--     multa_atraso = 150.00
-- WHERE id_emprestimo = 4;

-- =====================================================================
-- FIM DO SCRIPT
-- =====================================================================
