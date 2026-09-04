-- =====================================================================
-- MODELO FÍSICO - SISTEMA DE BIBLIOTECA
-- SGBD: MySQL 8.0
-- Descrição: Implementação real com sintaxe MySQL específica
-- =====================================================================

-- Criar banco de dados
CREATE DATABASE IF NOT EXISTS biblioteca_fisica;
USE biblioteca_fisica;

-- =====================================================================
-- TABELA FÍSICA 1: USUARIO
-- Implementação MySQL específica com engine InnoDB
-- =====================================================================
CREATE TABLE USUARIO (
    /* Chave Primária */
    id_usuario INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador único do usuário',

    /* Dados Pessoais */
    nome VARCHAR(100) NOT NULL COMMENT 'Nome completo do usuário',
    email VARCHAR(100) NOT NULL UNIQUE COMMENT 'Email único para contato',
    telefone VARCHAR(11) COMMENT 'Telefone para contato',
    cpf VARCHAR(11) NOT NULL UNIQUE COMMENT 'CPF brasileiro (11 dígitos)',

    /* Dados Administrativos */
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Data/hora de cadastro',
    status ENUM('ativo', 'inativo', 'bloqueado') DEFAULT 'ativo' COMMENT 'Status do usuário',
    limite_emprestimos INT DEFAULT 5 COMMENT 'Máximo de livros que pode emprestar',

    /* Índices para Performance */
    INDEX idx_email (email) COMMENT 'Busca rápida por email',
    INDEX idx_cpf (cpf) COMMENT 'Busca rápida por CPF',
    INDEX idx_status (status) COMMENT 'Filtro de usuários por status',
    INDEX idx_data_cadastro (data_cadastro) COMMENT 'Ordenação cronológica'

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Tabela de usuários cadastrados na biblioteca';

-- =====================================================================
-- TABELA FÍSICA 2: LIVRO
-- Implementação MySQL com validações específicas
-- =====================================================================
CREATE TABLE LIVRO (
    /* Chave Primária */
    id_livro INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador único do livro',

    /* Dados Bibliográficos */
    titulo VARCHAR(150) NOT NULL COMMENT 'Título da obra',
    autor VARCHAR(100) NOT NULL COMMENT 'Autor(es) da obra',
    isbn VARCHAR(13) NOT NULL UNIQUE COMMENT 'ISBN internacional (13 dígitos)',
    editora VARCHAR(100) COMMENT 'Editora responsável',
    ano_publicacao INT COMMENT 'Ano de publicação original',
    categoria VARCHAR(50) COMMENT 'Gênero ou categoria (Ficção, História, etc)',

    /* Controle de Estoque */
    quantidade_total INT NOT NULL DEFAULT 1 COMMENT 'Total de cópias no acervo',
    quantidade_disponivel INT NOT NULL DEFAULT 1 COMMENT 'Cópias disponíveis para empréstimo',
    preco_aquisicao DECIMAL(10, 2) COMMENT 'Preço pago na aquisição',

    /* Dados Administrativos */
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Quando foi catalogado',
    status ENUM('disponivel', 'indisponivel', 'descartado') DEFAULT 'disponivel'
        COMMENT 'Situação do livro no acervo',

    /* Constraints de Integridade */
    CONSTRAINT chk_quantidade_positiva CHECK (quantidade_total > 0)
        COMMENT 'Sempre deve haver pelo menos 1 cópia',
    CONSTRAINT chk_disponivel_valido CHECK (quantidade_disponivel >= 0 AND quantidade_disponivel <= quantidade_total)
        COMMENT 'Disponível nunca negativa ou maior que total',
    CONSTRAINT chk_preco_valido CHECK (preco_aquisicao IS NULL OR preco_aquisicao >= 0)
        COMMENT 'Preço não pode ser negativo',

    /* Índices para Performance */
    INDEX idx_titulo (titulo) COMMENT 'Busca por título',
    INDEX idx_autor (autor) COMMENT 'Busca por autor',
    INDEX idx_isbn (isbn) COMMENT 'Busca por ISBN',
    INDEX idx_categoria (categoria) COMMENT 'Filtro por categoria',
    INDEX idx_status (status) COMMENT 'Filtro de disponibilidade',
    INDEX idx_data_cadastro (data_cadastro) COMMENT 'Ordenação cronológica'

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Catálogo de livros da biblioteca';

-- =====================================================================
-- TABELA FÍSICA 3: EMPRESTIMO
-- Implementação MySQL com chaves estrangeiras e cascatas
-- =====================================================================
CREATE TABLE EMPRESTIMO (
    /* Chave Primária */
    id_emprestimo INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador único do empréstimo',

    /* Chaves Estrangeiras */
    id_usuario INT NOT NULL COMMENT 'Referência ao usuário',
    id_livro INT NOT NULL COMMENT 'Referência ao livro',

    /* Datas */
    data_emprestimo DATETIME DEFAULT CURRENT_TIMESTAMP
        COMMENT 'Data/hora quando o livro foi retirado',
    data_devolucao_prevista DATE NOT NULL
        COMMENT 'Data limite para devolução',
    data_devolucao_real DATE COMMENT 'Data real de devolução (NULL se pendente)',

    /* Valores Monetários */
    multa_atraso DECIMAL(8, 2) DEFAULT 0.00
        COMMENT 'Multa cobrada por atraso (armazenada para auditoria)',

    /* Status e Observações */
    status ENUM('emprestado', 'devolvido', 'atrasado', 'perdido') DEFAULT 'emprestado'
        COMMENT 'Situação atual do empréstimo',
    observacoes TEXT COMMENT 'Notas ou observações sobre o empréstimo',

    /* Chaves Estrangeiras com Restrições */
    CONSTRAINT fk_emprestimo_usuario FOREIGN KEY (id_usuario)
        REFERENCES USUARIO(id_usuario)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
        COMMENT 'Referência ao usuário que pegou emprestado',

    CONSTRAINT fk_emprestimo_livro FOREIGN KEY (id_livro)
        REFERENCES LIVRO(id_livro)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
        COMMENT 'Referência ao livro emprestado',

    /* Constraints de Negócio */
    CONSTRAINT chk_data_devolucao CHECK (
        data_devolucao_real IS NULL OR data_devolucao_real >= DATE(data_emprestimo)
    ) COMMENT 'Devolução não pode ser antes do empréstimo',

    CONSTRAINT chk_data_prevista CHECK (
        data_devolucao_prevista > DATE(data_emprestimo)
    ) COMMENT 'Devolução prevista deve ser após empréstimo',

    CONSTRAINT chk_multa_valida CHECK (multa_atraso >= 0)
        COMMENT 'Multa não pode ser negativa',

    /* Índices para Performance */
    INDEX idx_id_usuario (id_usuario) COMMENT 'Histórico de empréstimos do usuário',
    INDEX idx_id_livro (id_livro) COMMENT 'Histórico do livro',
    INDEX idx_status (status) COMMENT 'Filtro de empréstimos ativos/devolvidos',
    INDEX idx_data_emprestimo (data_emprestimo) COMMENT 'Ordenação por data',
    INDEX idx_data_devolucao_prevista (data_devolucao_prevista) COMMENT 'Detecção de atrasados',

    /* Índices Compostos para Queries Complexas */
    INDEX idx_usuario_status (id_usuario, status)
        COMMENT 'Empréstimos ativos de um usuário (rápido)',
    INDEX idx_status_data_prevista (status, data_devolucao_prevista)
        COMMENT 'Empréstimos vencidos (rápido)'

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Registro de empréstimos de livros';

-- =====================================================================
-- DADOS DE TESTE (10 registros por tabela)
-- =====================================================================

-- Limpar dados anteriores
DELETE FROM EMPRESTIMO;
DELETE FROM LIVRO;
DELETE FROM USUARIO;

-- Inserir usuários
INSERT INTO USUARIO (nome, email, telefone, cpf, status, limite_emprestimos) VALUES
('João Silva Santos', 'joao.silva@email.com', '11987654321', '12345678901', 'ativo', 5),
('Maria Oliveira Costa', 'maria.costa@email.com', '11987654322', '12345678902', 'ativo', 5),
('Pedro Martins Gomes', 'pedro.gomes@email.com', '11987654323', '12345678903', 'ativo', 3),
('Ana Paula Ferreira', 'ana.ferreira@email.com', '11987654324', '12345678904', 'bloqueado', 0),
('Carlos Eduardo Rocha', 'carlos.rocha@email.com', '11987654325', '12345678905', 'ativo', 5),
('Lucia Mendes Silva', 'lucia.silva@email.com', '11987654326', '12345678906', 'ativo', 5),
('Roberto Alves Santos', 'roberto.santos@email.com', '11987654327', '12345678907', 'inativo', 2),
('Fernanda Lima Costa', 'fernanda.lima@email.com', '11987654328', '12345678908', 'ativo', 5),
('Gabriel Pereira Dias', 'gabriel.dias@email.com', '11987654329', '12345678909', 'ativo', 4),
('Juliana Ribeiro Carvalho', 'juliana.carvalho@email.com', '11987654330', '12345678910', 'ativo', 5);

-- Inserir livros
INSERT INTO LIVRO (titulo, autor, isbn, editora, ano_publicacao, categoria, quantidade_total, quantidade_disponivel, preco_aquisicao, status) VALUES
('O Senhor dos Anéis: A Sociedade do Anel', 'J.R.R. Tolkien', '9788595086676', 'Aleph', 1954, 'Ficção Fantasia', 3, 1, 89.90, 'disponivel'),
('Harry Potter e a Pedra Filosofal', 'J.K. Rowling', '9788532530786', 'Rocco', 1997, 'Ficção Fantasia', 5, 2, 49.90, 'disponivel'),
('1984', 'George Orwell', '9788522009307', 'Companhia das Letras', 1949, 'Ficção Distopia', 2, 0, 45.00, 'indisponivel'),
('O Hobbit', 'J.R.R. Tolkien', '9788595086683', 'Aleph', 1937, 'Ficção Fantasia', 2, 1, 59.90, 'disponivel'),
('Cem Anos de Solidão', 'Gabriel García Márquez', '9788532511010', 'Record', 1967, 'Ficção Realismo Mágico', 1, 1, 55.00, 'disponivel'),
('O Príncipe', 'Nicolau Maquiavel', '9788535919851', 'L&PM', 1513, 'Filosofia Política', 1, 1, 35.00, 'disponivel'),
('Sapiens: Uma Breve História da Humanidade', 'Yuval Noah Harari', '9788532629760', 'L&PM', 2011, 'História', 2, 1, 59.90, 'disponivel'),
('A Revolução dos Bichos', 'George Orwell', '9788535911718', 'Companhia das Letras', 1945, 'Ficção Alegoria', 3, 3, 38.90, 'disponivel'),
('Dom Casmurro', 'Machado de Assis', '9788525404508', 'Companhia das Letras', 1899, 'Ficção Romance Brasileiro', 2, 2, 42.00, 'disponivel'),
('O Cortiço', 'Aluísio Azevedo', '9788535901634', 'Companhia das Letras', 1890, 'Ficção Naturalismo', 1, 1, 38.00, 'disponivel');

-- Inserir empréstimos
INSERT INTO EMPRESTIMO (id_usuario, id_livro, data_emprestimo, data_devolucao_prevista, data_devolucao_real, multa_atraso, status, observacoes) VALUES
(1, 1, '2024-01-10 10:30:00', '2024-01-24', NULL, 0.00, 'emprestado', 'Leitura em andamento'),
(2, 2, '2024-01-15 14:00:00', '2024-01-29', '2024-01-28', 0.00, 'devolvido', 'Devolução antecipada'),
(1, 4, '2024-01-18 11:15:00', '2024-02-01', NULL, 0.00, 'emprestado', 'Leitura em andamento'),
(3, 7, '2024-01-12 09:45:00', '2024-02-09', NULL, 15.00, 'atrasado', 'Prazo vencido há 6 dias'),
(5, 6, '2024-01-20 16:30:00', '2024-02-03', NULL, 0.00, 'emprestado', 'Primeira leitura'),
(2, 8, '2024-01-22 13:20:00', '2024-02-05', NULL, 0.00, 'emprestado', 'Reservado previamente'),
(6, 5, '2024-01-14 11:00:00', '2024-01-28', '2024-01-27', 0.00, 'devolvido', 'Ótimo estado'),
(8, 9, '2024-01-19 15:45:00', '2024-02-02', NULL, 0.00, 'emprestado', 'Clássico da literatura'),
(4, 10, '2024-01-25 10:00:00', '2024-02-08', NULL, 0.00, 'emprestado', 'Usuário bloqueado (não deveria ter)'),
(7, 3, '2023-12-20 09:30:00', '2024-01-03', NULL, 50.00, 'perdido', 'Livro reportado como perdido');

-- =====================================================================
-- VISUALIZAÇÃO DOS DADOS INSERIDOS
-- =====================================================================

-- Verificar total de registros inseridos
SELECT 'USUARIO' as tabela, COUNT(*) as total_registros FROM USUARIO
UNION ALL
SELECT 'LIVRO', COUNT(*) FROM LIVRO
UNION ALL
SELECT 'EMPRESTIMO', COUNT(*) FROM EMPRESTIMO;

-- Verificar integridade referencial
SELECT 'Verificação de Integridade Referencial' as verificacao;

SELECT COUNT(*) as emprestimos_órfãos_usuario
FROM EMPRESTIMO e
WHERE e.id_usuario NOT IN (SELECT id_usuario FROM USUARIO);

SELECT COUNT(*) as emprestimos_órfãos_livro
FROM EMPRESTIMO e
WHERE e.id_livro NOT IN (SELECT id_livro FROM LIVRO);

-- =====================================================================
-- COMENTÁRIOS FINAIS DO MODELO FÍSICO
-- =====================================================================

/*
CARACTERÍSTICAS IMPLEMENTADAS:

1. ENGINE INNODB
   - Suporte a transações ACID
   - Suporte a chaves estrangeiras
   - Consistência de dados garantida
   - Crash recovery automático

2. TIPOS DE DADOS ESPECÍFICOS
   - INT: Para IDs (4 bytes = até 2 bilhões)
   - VARCHAR: Texto variável (eficiente em espaço)
   - ENUM: Valores pré-definidos (otimizado)
   - DATETIME: Data e hora com precisão
   - DATE: Apenas data
   - DECIMAL(10,2): Números monetários com precisão

3. CONSTRAINTS IMPLEMENTADAS
   - PRIMARY KEY: Unicidade e índice automático
   - UNIQUE: Índice único para email, cpf, isbn
   - FOREIGN KEY: Integridade referencial com CASCADE
   - CHECK: Validação de regras de negócio
   - NOT NULL: Campos obrigatórios
   - DEFAULT: Valores padrão automáticos

4. ÍNDICES PARA PERFORMANCE
   - Índices simples: Busca e filtro
   - Índices compostos: Queries complexas
   - AUTO_INCREMENT: ID sequencial automático

5. CHARSET UTF-8
   - Suporte a acentuação português
   - Compatibilidade internacional
   - Armazenamento eficiente

6. COLLATION UTF8MB4_UNICODE_CI
   - Busca case-insensitive
   - Suporte a emojis e caracteres especiais

PRÓXIMAS ETAPAS:
- Criar triggers para atualizar quantidade_disponivel
- Criar stored procedures para operações complexas
- Implementar views para relatórios
- Configurar backups automáticos
*/

-- =====================================================================
-- FIM DO MODELO FÍSICO
-- =====================================================================
