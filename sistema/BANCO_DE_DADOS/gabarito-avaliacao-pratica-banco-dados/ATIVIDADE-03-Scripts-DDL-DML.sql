-- =====================================================================
-- SISTEMA DE DELIVERY DE COMIDA
-- Scripts SQL (DDL e DML)
-- SGBD: MySQL 8.0
-- Normalização: 3ª Forma Normal (3FN)
-- =====================================================================

-- =====================================================================
-- PARTE 1: DDL (Data Definition Language)
-- Criação das tabelas e estruturas do banco de dados
-- =====================================================================

-- Criar banco de dados
CREATE DATABASE IF NOT EXISTS delivery_comida;
USE delivery_comida;

-- =====================================================================
-- Tabela: ENDERECO
-- Descrição: Armazena endereços reutilizáveis para usuários, restaurantes,
--            entregadores e locais de entrega
-- =====================================================================
CREATE TABLE ENDERECO (
    id_endereco INT AUTO_INCREMENT PRIMARY KEY,
    cep VARCHAR(8) NOT NULL,
    rua VARCHAR(100) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    complemento VARCHAR(100),
    bairro VARCHAR(50) NOT NULL,
    cidade VARCHAR(50) NOT NULL,
    estado VARCHAR(2) NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    tipo_endereco ENUM('residencial', 'comercial') DEFAULT 'residencial',
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,

    -- Índices para performance
    INDEX idx_cep (cep),
    INDEX idx_bairro_cidade (bairro, cidade)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================================
-- Tabela: USUARIO
-- Descrição: Clientes que utilizam a plataforma de delivery
-- =====================================================================
CREATE TABLE USUARIO (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    telefone VARCHAR(11) NOT NULL,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    id_endereco INT,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('ativo', 'inativo') DEFAULT 'ativo',
    limite_credito DECIMAL(10, 2) DEFAULT 0.00,

    -- Chaves estrangeiras
    CONSTRAINT fk_usuario_endereco FOREIGN KEY (id_endereco)
        REFERENCES ENDERECO(id_endereco) ON DELETE SET NULL,

    -- Índices
    INDEX idx_email (email),
    INDEX idx_cpf (cpf),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================================
-- Tabela: RESTAURANTE
-- Descrição: Estabelecimentos parceiros que oferecem serviço de delivery
-- =====================================================================
CREATE TABLE RESTAURANTE (
    id_restaurante INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cnpj VARCHAR(14) NOT NULL UNIQUE,
    descricao TEXT,
    telefone VARCHAR(11) NOT NULL,
    email VARCHAR(100) NOT NULL,
    id_endereco INT NOT NULL,
    horario_abertura TIME NOT NULL,
    horario_fechamento TIME NOT NULL,
    taxa_entrega DECIMAL(5, 2) DEFAULT 0.00,
    tempo_medio_preparo INT COMMENT 'Tempo em minutos',
    avaliacao_media DECIMAL(3, 2) DEFAULT 0.00,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('ativo', 'inativo') DEFAULT 'ativo',

    -- Chaves estrangeiras
    CONSTRAINT fk_restaurante_endereco FOREIGN KEY (id_endereco)
        REFERENCES ENDERECO(id_endereco) ON DELETE RESTRICT,

    -- Índices
    INDEX idx_cnpj (cnpj),
    INDEX idx_status (status),
    INDEX idx_nome (nome)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================================
-- Tabela: CARDAPIO
-- Descrição: Itens do cardápio disponíveis em cada restaurante
-- =====================================================================
CREATE TABLE CARDAPIO (
    id_cardapio INT AUTO_INCREMENT PRIMARY KEY,
    id_restaurante INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10, 2) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    disponivel BOOLEAN DEFAULT TRUE,
    quantidade_estoque INT NOT NULL DEFAULT 0,
    imagem_url VARCHAR(255),
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,

    -- Chaves estrangeiras
    CONSTRAINT fk_cardapio_restaurante FOREIGN KEY (id_restaurante)
        REFERENCES RESTAURANTE(id_restaurante) ON DELETE CASCADE,

    -- Índices
    INDEX idx_restaurante (id_restaurante),
    INDEX idx_categoria (categoria),
    INDEX idx_disponivel (disponivel)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================================
-- Tabela: ENTREGADOR
-- Descrição: Profissionais de entrega que realizam as entregas
-- =====================================================================
CREATE TABLE ENTREGADOR (
    id_entregador INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    telefone VARCHAR(11) NOT NULL,
    email VARCHAR(100),
    cnh VARCHAR(11) NOT NULL UNIQUE,
    categoria_cnh VARCHAR(5) NOT NULL,
    veiculo VARCHAR(50),
    placa_veiculo VARCHAR(7),
    id_endereco INT,
    avaliacao_media DECIMAL(3, 2) DEFAULT 0.00,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('ativo', 'inativo', 'em_entrega') DEFAULT 'ativo',

    -- Chaves estrangeiras
    CONSTRAINT fk_entregador_endereco FOREIGN KEY (id_endereco)
        REFERENCES ENDERECO(id_endereco) ON DELETE SET NULL,

    -- Índices
    INDEX idx_cpf (cpf),
    INDEX idx_status (status),
    INDEX idx_placa (placa_veiculo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================================
-- Tabela: PEDIDO
-- Descrição: Registro de todos os pedidos realizados no sistema
-- =====================================================================
CREATE TABLE PEDIDO (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_restaurante INT NOT NULL,
    id_entregador INT,
    id_endereco_entrega INT NOT NULL,
    data_pedido DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_entrega DATETIME,
    status_pedido ENUM('pendente', 'confirmado', 'preparando',
                      'saiu_para_entrega', 'entregue', 'cancelado') DEFAULT 'pendente',
    valor_total DECIMAL(10, 2) NOT NULL,
    valor_desconto DECIMAL(10, 2) DEFAULT 0.00,
    valor_taxa_entrega DECIMAL(5, 2) NOT NULL,
    observacoes TEXT,

    -- Chaves estrangeiras
    CONSTRAINT fk_pedido_usuario FOREIGN KEY (id_usuario)
        REFERENCES USUARIO(id_usuario) ON DELETE RESTRICT,
    CONSTRAINT fk_pedido_restaurante FOREIGN KEY (id_restaurante)
        REFERENCES RESTAURANTE(id_restaurante) ON DELETE RESTRICT,
    CONSTRAINT fk_pedido_entregador FOREIGN KEY (id_entregador)
        REFERENCES ENTREGADOR(id_entregador) ON DELETE SET NULL,
    CONSTRAINT fk_pedido_endereco FOREIGN KEY (id_endereco_entrega)
        REFERENCES ENDERECO(id_endereco) ON DELETE RESTRICT,

    -- Índices
    INDEX idx_usuario (id_usuario),
    INDEX idx_restaurante (id_restaurante),
    INDEX idx_entregador (id_entregador),
    INDEX idx_status (status_pedido),
    INDEX idx_data_pedido (data_pedido),
    INDEX idx_usuario_data (id_usuario, data_pedido)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================================
-- Tabela: ITEM_PEDIDO
-- Descrição: Itens que compõem cada pedido (tabela de junção)
-- =====================================================================
CREATE TABLE ITEM_PEDIDO (
    id_item_pedido INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT NOT NULL,
    id_cardapio INT NOT NULL,
    quantidade INT NOT NULL,
    preco_unitario DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    observacoes VARCHAR(255),

    -- Chaves estrangeiras
    CONSTRAINT fk_item_pedido_pedido FOREIGN KEY (id_pedido)
        REFERENCES PEDIDO(id_pedido) ON DELETE CASCADE,
    CONSTRAINT fk_item_pedido_cardapio FOREIGN KEY (id_cardapio)
        REFERENCES CARDAPIO(id_cardapio) ON DELETE RESTRICT,

    -- Índices
    INDEX idx_pedido (id_pedido),
    INDEX idx_cardapio (id_cardapio)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================================
-- Tabela: PAGAMENTO
-- Descrição: Registro de pagamentos de pedidos
-- =====================================================================
CREATE TABLE PAGAMENTO (
    id_pagamento INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT NOT NULL UNIQUE,
    id_usuario INT NOT NULL,
    tipo_pagamento ENUM('cartao_credito', 'cartao_debito', 'pix', 'dinheiro') NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    status_pagamento ENUM('pendente', 'processando', 'aprovado', 'recusado') DEFAULT 'pendente',
    data_pagamento DATETIME,
    numero_transacao VARCHAR(50),
    gateway_pagamento VARCHAR(50),
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,

    -- Chaves estrangeiras
    CONSTRAINT fk_pagamento_pedido FOREIGN KEY (id_pedido)
        REFERENCES PEDIDO(id_pedido) ON DELETE RESTRICT,
    CONSTRAINT fk_pagamento_usuario FOREIGN KEY (id_usuario)
        REFERENCES USUARIO(id_usuario) ON DELETE RESTRICT,

    -- Índices
    INDEX idx_pedido (id_pedido),
    INDEX idx_status (status_pagamento),
    INDEX idx_usuario (id_usuario)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================================
-- Tabela: AVALIACAO
-- Descrição: Avaliações de restaurantes e entregadores por clientes
-- =====================================================================
CREATE TABLE AVALIACAO (
    id_avaliacao INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT NOT NULL,
    id_usuario INT NOT NULL,
    id_restaurante INT,
    id_entregador INT,
    nota INT NOT NULL CHECK (nota >= 1 AND nota <= 5),
    comentario TEXT,
    tipo_avaliacao ENUM('restaurante', 'entregador') NOT NULL,
    data_avaliacao DATETIME DEFAULT CURRENT_TIMESTAMP,

    -- Chaves estrangeiras
    CONSTRAINT fk_avaliacao_pedido FOREIGN KEY (id_pedido)
        REFERENCES PEDIDO(id_pedido) ON DELETE CASCADE,
    CONSTRAINT fk_avaliacao_usuario FOREIGN KEY (id_usuario)
        REFERENCES USUARIO(id_usuario) ON DELETE CASCADE,
    CONSTRAINT fk_avaliacao_restaurante FOREIGN KEY (id_restaurante)
        REFERENCES RESTAURANTE(id_restaurante) ON DELETE CASCADE,
    CONSTRAINT fk_avaliacao_entregador FOREIGN KEY (id_entregador)
        REFERENCES ENTREGADOR(id_entregador) ON DELETE CASCADE,

    -- Índices
    INDEX idx_restaurante (id_restaurante),
    INDEX idx_entregador (id_entregador),
    INDEX idx_tipo (tipo_avaliacao),
    INDEX idx_data (data_avaliacao)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================================
-- PARTE 2: DML (Data Manipulation Language)
-- Inserção de dados de teste (10 registros por tabela)
-- =====================================================================

-- Limpar dados existentes
DELETE FROM AVALIACAO;
DELETE FROM PAGAMENTO;
DELETE FROM ITEM_PEDIDO;
DELETE FROM PEDIDO;
DELETE FROM CARDAPIO;
DELETE FROM ENTREGADOR;
DELETE FROM RESTAURANTE;
DELETE FROM USUARIO;
DELETE FROM ENDERECO;

-- =====================================================================
-- Inserir endereços (10 registros)
-- =====================================================================
INSERT INTO ENDERECO (cep, rua, numero, complemento, bairro, cidade, estado, latitude, longitude, tipo_endereco) VALUES
('12345678', 'Rua das Flores', '100', 'Apto 101', 'Centro', 'São Paulo', 'SP', -23.5505, -46.6333, 'residencial'),
('12345679', 'Avenida Paulista', '1000', NULL, 'Bela Vista', 'São Paulo', 'SP', -23.5613, -46.6560, 'comercial'),
('12345680', 'Rua Augusta', '500', 'Sala 200', 'Consolação', 'São Paulo', 'SP', -23.5528, -46.6582, 'comercial'),
('12345681', 'Rua Vergueiro', '3000', 'Apto 305', 'Vila Mariana', 'São Paulo', 'SP', -23.5897, -46.6116, 'residencial'),
('12345682', 'Avenida Brasil', '1500', NULL, 'Sumaré', 'São Paulo', 'SP', -23.5186, -46.6987, 'comercial'),
('12345683', 'Rua Oscar Freire', '800', 'Apto 501', 'Cerqueira César', 'São Paulo', 'SP', -23.5573, -46.6821, 'residencial'),
('12345684', 'Largo do Arouche', '100', NULL, 'Centro', 'São Paulo', 'SP', -23.5498, -46.6399, 'comercial'),
('12345685', 'Rua Bandeira', '200', 'Apto 102', 'Liberdade', 'São Paulo', 'SP', -23.5587, -46.6350, 'residencial'),
('12345686', 'Avenida Imigrantes', '2000', 'Loja 10', 'Vila Mariana', 'São Paulo', 'SP', -23.5920, -46.6200, 'comercial'),
('12345687', 'Rua Haddock Lobo', '400', 'Apto 808', 'Cerqueira César', 'São Paulo', 'SP', -23.5614, -46.6775, 'residencial');

-- =====================================================================
-- Inserir usuários (10 registros)
-- =====================================================================
INSERT INTO USUARIO (nome, email, telefone, cpf, senha, id_endereco, status, limite_credito) VALUES
('João Silva', 'joao@email.com', '11987654321', '12345678901', 'hash_senha_1', 1, 'ativo', 100.00),
('Maria Santos', 'maria@email.com', '11987654322', '12345678902', 'hash_senha_2', 2, 'ativo', 150.00),
('Pedro Oliveira', 'pedro@email.com', '11987654323', '12345678903', 'hash_senha_3', 3, 'ativo', 200.00),
('Ana Costa', 'ana@email.com', '11987654324', '12345678904', 'hash_senha_4', 4, 'ativo', 100.00),
('Carlos Mendes', 'carlos@email.com', '11987654325', '12345678905', 'hash_senha_5', 5, 'ativo', 175.00),
('Lucia Ferreira', 'lucia@email.com', '11987654326', '12345678906', 'hash_senha_6', 6, 'ativo', 120.00),
('Roberto Gomes', 'roberto@email.com', '11987654327', '12345678907', 'hash_senha_7', 7, 'inativo', 0.00),
('Fernanda Lima', 'fernanda@email.com', '11987654328', '12345678908', 'hash_senha_8', 8, 'ativo', 100.00),
('Gabriel Santos', 'gabriel@email.com', '11987654329', '12345678909', 'hash_senha_9', 9, 'ativo', 250.00),
('Juliana Rocha', 'juliana@email.com', '11987654330', '12345678910', 'hash_senha_10', 10, 'ativo', 100.00);

-- =====================================================================
-- Inserir restaurantes (10 registros)
-- =====================================================================
INSERT INTO RESTAURANTE (nome, cnpj, descricao, telefone, email, id_endereco, horario_abertura, horario_fechamento, taxa_entrega, tempo_medio_preparo, status, avaliacao_media) VALUES
('Pizza Italiana', '12345678000100', 'Autêntica pizzaria italiana', '1133445566', 'pizza@rest.com', 2, '11:00:00', '23:00:00', 5.00, 30, 'ativo', 4.50),
('Sushi House', '12345678000101', 'Melhor sushi da região', '1133445567', 'sushi@rest.com', 3, '10:00:00', '22:00:00', 6.00, 25, 'ativo', 4.80),
('Burger King', '12345678000102', 'Hamburgers premium', '1133445568', 'burger@rest.com', 4, '11:00:00', '23:30:00', 4.50, 20, 'ativo', 4.20),
('Churrascaria BBQ', '12345678000103', 'Churrasco de excelência', '1133445569', 'bbq@rest.com', 5, '12:00:00', '23:00:00', 7.00, 40, 'ativo', 4.70),
('Tempero do Nordeste', '12345678000104', 'Comida nordestina autêntica', '1133445570', 'nordeste@rest.com', 6, '11:00:00', '22:00:00', 5.50, 35, 'ativo', 4.30),
('Cantina Mineira', '12345678000105', 'Comida de minas gerais', '1133445571', 'mineira@rest.com', 7, '11:30:00', '22:30:00', 5.00, 30, 'ativo', 4.60),
('Café Aroma', '12345678000106', 'Café gourmet e doces', '1133445572', 'cafe@rest.com', 8, '07:00:00', '20:00:00', 4.00, 15, 'ativo', 4.40),
('Comida Chinesa Asia', '12345678000107', 'Culinária chinesa internacional', '1133445573', 'asia@rest.com', 9, '10:00:00', '23:00:00', 6.50, 28, 'ativo', 4.50),
('Vegetariano Fresh', '12345678000108', 'Pratos vegetarianos saudáveis', '1133445574', 'fresh@rest.com', 10, '11:00:00', '21:00:00', 5.00, 25, 'ativo', 4.65),
('Kebab Express', '12345678000109', 'Fast food turco', '1133445575', 'kebab@rest.com', 1, '12:00:00', '23:30:00', 3.50, 18, 'ativo', 4.25);

-- =====================================================================
-- Inserir cardápio (10 registros distribuídos entre restaurantes)
-- =====================================================================
INSERT INTO CARDAPIO (id_restaurante, nome, descricao, preco, categoria, disponivel, quantidade_estoque) VALUES
(1, 'Pizza Margherita', 'Clássica com tomate, mozzarela e manjericão', 45.00, 'pizza', TRUE, 50),
(1, 'Pizza Calabresa', 'Pizza com calabresa, cebola e queijo', 48.00, 'pizza', TRUE, 45),
(2, 'Sushi Combinado', 'Combinação de 20 peças variadas', 65.00, 'sushi', TRUE, 30),
(2, 'Sashimi Premium', 'Sashimi de salmão e atum', 75.00, 'sushi', TRUE, 25),
(3, 'X-Burger Premium', 'Hambúrguer com bacon, queijo e alface', 35.00, 'burger', TRUE, 60),
(3, 'Batata Frita Grande', 'Batata frita crocante', 15.00, 'acompanhamento', TRUE, 100),
(4, 'Churrasco Misto', 'Picanha, costela e frango', 85.00, 'churrasco', TRUE, 20),
(5, 'Acarajé com Camarão', 'Acarajé tradicional baiano', 18.00, 'comida_típica', TRUE, 40),
(6, 'Brigadeiro Mineiro', 'Brigadeiro caseiro cremoso', 12.00, 'doce', TRUE, 80),
(7, 'Cappuccino Premium', 'Café cappuccino com espuma de leite', 12.00, 'bebida', TRUE, 200);

-- =====================================================================
-- Inserir entregadores (10 registros)
-- =====================================================================
INSERT INTO ENTREGADOR (nome, cpf, telefone, email, cnh, categoria_cnh, veiculo, placa_veiculo, id_endereco, status, avaliacao_media) VALUES
('Diego Silva', '98765432101', '11987654401', 'diego@entrega.com', '11111111111', 'A', 'Moto Honda PCX', 'ABC1234', 1, 'ativo', 4.70),
('Marcelo Costa', '98765432102', '11987654402', 'marcelo@entrega.com', '11111111112', 'A', 'Moto Yamaha', 'ABD1235', 2, 'ativo', 4.50),
('Thiago Santos', '98765432103', '11987654403', 'thiago@entrega.com', '11111111113', 'B', 'Carro Gol', 'ABE1236', 3, 'ativo', 4.80),
('Lucas Oliveira', '98765432104', '11987654404', 'lucas@entrega.com', '11111111114', 'A', 'Moto Honda CG', 'ABF1237', 4, 'em_entrega', 4.60),
('Felipe Pereira', '98765432105', '11987654405', 'felipe@entrega.com', '11111111115', 'A', 'Moto Suzuki', 'ABG1238', 5, 'ativo', 4.40),
('Rodrigo Ferreira', '98765432106', '11987654406', 'rodrigo@entrega.com', '11111111116', 'B', 'Carro Palio', 'ABH1239', 6, 'ativo', 4.75),
('Bruno Alves', '98765432107', '11987654407', 'bruno@entrega.com', '11111111117', 'A', 'Moto Honda', 'ABI1240', 7, 'ativo', 4.55),
('Anderson Gomes', '98765432108', '11987654408', 'anderson@entrega.com', '11111111118', 'A', 'Moto Yamaha XJ', 'ABJ1241', 8, 'ativo', 4.65),
('Julio Ribeiro', '98765432109', '11987654409', 'julio@entrega.com', '11111111119', 'B', 'Carro Fiat', 'ABK1242', 9, 'inativo', 4.30),
('Rafael Martins', '98765432110', '11987654410', 'rafael@entrega.com', '11111111120', 'A', 'Moto Honda CB', 'ABL1243', 10, 'ativo', 4.85);

-- =====================================================================
-- Inserir pedidos (10 registros)
-- =====================================================================
INSERT INTO PEDIDO (id_usuario, id_restaurante, id_entregador, id_endereco_entrega, data_pedido, status_pedido, valor_total, valor_desconto, valor_taxa_entrega) VALUES
(1, 1, 1, 1, '2024-01-15 18:30:00', 'entregue', 140.00, 10.00, 5.00),
(2, 2, 2, 2, '2024-01-16 19:00:00', 'entregue', 195.00, 15.00, 6.00),
(3, 3, 3, 3, '2024-01-17 12:30:00', 'confirmado', 85.00, 0.00, 4.50),
(4, 4, 4, 4, '2024-01-18 20:15:00', 'preparando', 110.00, 0.00, 7.00),
(5, 5, 5, 5, '2024-01-19 19:45:00', 'pendente', 65.00, 5.00, 5.50),
(6, 6, 6, 6, '2024-01-20 18:00:00', 'saiu_para_entrega', 95.00, 0.00, 5.00),
(7, 7, 7, 7, '2024-01-21 10:30:00', 'cancelado', 50.00, 10.00, 4.00),
(8, 8, 8, 8, '2024-01-22 20:00:00', 'entregue', 75.00, 0.00, 5.00),
(9, 9, 9, 9, '2024-01-23 19:30:00', 'entregue', 125.00, 20.00, 5.00),
(10, 10, 10, 10, '2024-01-24 13:00:00', 'preparando', 45.00, 0.00, 3.50);

-- =====================================================================
-- Inserir itens de pedidos (10 registros)
-- =====================================================================
INSERT INTO ITEM_PEDIDO (id_pedido, id_cardapio, quantidade, preco_unitario, subtotal, observacoes) VALUES
(1, 1, 2, 45.00, 90.00, 'Sem cebola na margherita'),
(1, 6, 1, 15.00, 15.00, NULL),
(2, 3, 1, 65.00, 65.00, 'Com gengibre extra'),
(3, 5, 2, 35.00, 70.00, 'Muito molho'),
(4, 7, 1, 85.00, 85.00, 'Bem passado'),
(5, 8, 3, 18.00, 54.00, 'Com molho de pimenta'),
(6, 9, 2, 12.00, 24.00, 'Embrulhado bem'),
(7, 10, 4, 12.00, 48.00, NULL),
(8, 2, 1, 48.00, 48.00, 'Massa crocante'),
(9, 4, 1, 75.00, 75.00, 'Muito gelo na bebida');

-- =====================================================================
-- Inserir pagamentos (10 registros)
-- =====================================================================
INSERT INTO PAGAMENTO (id_pedido, id_usuario, tipo_pagamento, valor, status_pagamento, numero_transacao, gateway_pagamento, data_pagamento) VALUES
(1, 1, 'cartao_credito', 145.00, 'aprovado', 'TRX20240115001', 'PagSeguro', '2024-01-15 18:35:00'),
(2, 2, 'pix', 201.00, 'aprovado', 'TRX20240116002', 'PagBank', '2024-01-16 19:02:00'),
(3, 3, 'cartao_debito', 89.50, 'aprovado', 'TRX20240117003', 'Stone', '2024-01-17 12:32:00'),
(4, 4, 'dinheiro', 117.00, 'pendente', NULL, NULL, NULL),
(5, 5, 'pix', 70.00, 'processando', 'TRX20240119005', 'PagBank', '2024-01-19 19:47:00'),
(6, 6, 'cartao_credito', 100.00, 'aprovado', 'TRX20240120006', 'PagSeguro', '2024-01-20 18:05:00'),
(7, 7, 'cartao_credito', 40.00, 'recusado', 'TRX20240121007', 'PagSeguro', '2024-01-21 10:32:00'),
(8, 8, 'pix', 80.00, 'aprovado', 'TRX20240122008', 'PagBank', '2024-01-22 20:03:00'),
(9, 9, 'cartao_credito', 110.00, 'aprovado', 'TRX20240123009', 'Stone', '2024-01-23 19:35:00'),
(10, 10, 'dinheiro', 48.50, 'pendente', NULL, NULL, NULL);

-- =====================================================================
-- Inserir avaliações (10 registros)
-- =====================================================================
INSERT INTO AVALIACAO (id_pedido, id_usuario, id_restaurante, id_entregador, nota, comentario, tipo_avaliacao) VALUES
(1, 1, 1, NULL, 5, 'Excelente pizza, muito saborosa!', 'restaurante'),
(1, 1, NULL, 1, 4, 'Entrega rápida, moto barulhenta', 'entregador'),
(2, 2, 2, NULL, 5, 'Sushi fresco e de ótima qualidade', 'restaurante'),
(2, 2, NULL, 2, 5, 'Entregador muito atencioso', 'entregador'),
(3, 3, 3, NULL, 4, 'Burger bom, batata poderia ser mais crocante', 'restaurante'),
(4, 4, 4, NULL, 5, 'Churrasco suculento e macio', 'restaurante'),
(4, 4, NULL, 4, 4, 'Entrega no horário', 'entregador'),
(8, 8, 8, NULL, 5, 'Delicioso, superou expectativas!', 'restaurante'),
(8, 8, NULL, 8, 5, 'Excelente entregador, muito pontual', 'entregador'),
(9, 9, 9, NULL, 4, 'Pratos vegetarianos bem preparados', 'restaurante');

-- =====================================================================
-- VERIFICAÇÃO: Consultas de validação
-- =====================================================================

-- Verificar total de registros insertados
SELECT 'ENDERECO' as Tabela, COUNT(*) as Total FROM ENDERECO
UNION ALL
SELECT 'USUARIO', COUNT(*) FROM USUARIO
UNION ALL
SELECT 'RESTAURANTE', COUNT(*) FROM RESTAURANTE
UNION ALL
SELECT 'CARDAPIO', COUNT(*) FROM CARDAPIO
UNION ALL
SELECT 'ENTREGADOR', COUNT(*) FROM ENTREGADOR
UNION ALL
SELECT 'PEDIDO', COUNT(*) FROM PEDIDO
UNION ALL
SELECT 'ITEM_PEDIDO', COUNT(*) FROM ITEM_PEDIDO
UNION ALL
SELECT 'PAGAMENTO', COUNT(*) FROM PAGAMENTO
UNION ALL
SELECT 'AVALIACAO', COUNT(*) FROM AVALIACAO
ORDER BY Tabela;

-- Fim do script
-- =====================================================================

