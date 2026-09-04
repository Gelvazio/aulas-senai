# ATIVIDADE 02: Diagrama Entidade-Relacionamento (DER) Revisado e Validado

**Projeto:** Sistema de Delivery de Comida  
**SGBD Escolhido:** MySQL 8.0  
**Normalização:** Até 3ª Forma Normal (3FN)

---

## 1. ENTIDADES, ATRIBUTOS E RELACIONAMENTOS

### 1.1 Levantamento de Requisitos

Para um sistema de Delivery de comida, são necessárias as seguintes entidades:

#### Entidades Principais:
1. **USUARIO** - Cadastro de clientes
2. **RESTAURANTE** - Dados dos restaurantes parceiros
3. **CARDAPIO** - Itens disponíveis no restaurante
4. **PEDIDO** - Registro de pedidos realizados
5. **ITEM_PEDIDO** - Itens que compõem cada pedido
6. **ENTREGADOR** - Profissionais de entrega
7. **AVALIACAO** - Avaliações de restaurantes e entregadores
8. **ENDERECO** - Endereços de entrega
9. **PAGAMENTO** - Métodos e histórico de pagamentos

### 1.2 Identificação Detalhada de Atributos

#### Entidade: USUARIO
```
Tipo: Cliente do sistema
Atributos:
  - id_usuario (PK): INT, AUTO_INCREMENT
  - nome: VARCHAR(100), NOT NULL
  - email: VARCHAR(100), UNIQUE, NOT NULL
  - telefone: VARCHAR(11), NOT NULL
  - cpf: VARCHAR(11), UNIQUE, NOT NULL
  - senha: VARCHAR(255), NOT NULL
  - data_cadastro: DATETIME, DEFAULT CURRENT_TIMESTAMP
  - status: ENUM('ativo', 'inativo'), DEFAULT 'ativo'
  - limite_credito: DECIMAL(10,2), DEFAULT 0
```

#### Entidade: RESTAURANTE
```
Tipo: Estabelecimento parceiro
Atributos:
  - id_restaurante (PK): INT, AUTO_INCREMENT
  - nome: VARCHAR(100), NOT NULL
  - cnpj: VARCHAR(14), UNIQUE, NOT NULL
  - descricao: TEXT
  - telefone: VARCHAR(11), NOT NULL
  - email: VARCHAR(100), NOT NULL
  - horario_abertura: TIME, NOT NULL
  - horario_fechamento: TIME, NOT NULL
  - taxa_entrega: DECIMAL(5,2), DEFAULT 0
  - tempo_medio_preparo: INT (minutos)
  - avaliacao_media: DECIMAL(3,2), DEFAULT 0
  - status: ENUM('ativo', 'inativo'), DEFAULT 'ativo'
  - data_cadastro: DATETIME, DEFAULT CURRENT_TIMESTAMP
  - id_endereco (FK): INT, NOT NULL
```

#### Entidade: CARDAPIO
```
Tipo: Itens do cardápio
Atributos:
  - id_cardapio (PK): INT, AUTO_INCREMENT
  - id_restaurante (FK): INT, NOT NULL
  - nome: VARCHAR(100), NOT NULL
  - descricao: TEXT
  - preco: DECIMAL(10,2), NOT NULL
  - categoria: VARCHAR(50), NOT NULL
  - disponivel: BOOLEAN, DEFAULT TRUE
  - quantidade_estoque: INT, NOT NULL
  - imagem_url: VARCHAR(255)
  - data_criacao: DATETIME, DEFAULT CURRENT_TIMESTAMP
```

#### Entidade: ENDERECO
```
Tipo: Endereços
Atributos:
  - id_endereco (PK): INT, AUTO_INCREMENT
  - cep: VARCHAR(8), NOT NULL
  - rua: VARCHAR(100), NOT NULL
  - numero: VARCHAR(10), NOT NULL
  - complemento: VARCHAR(100)
  - bairro: VARCHAR(50), NOT NULL
  - cidade: VARCHAR(50), NOT NULL
  - estado: VARCHAR(2), NOT NULL
  - latitude: DECIMAL(10,8)
  - longitude: DECIMAL(11,8)
  - tipo_endereco: ENUM('residencial', 'comercial'), DEFAULT 'residencial'
```

#### Entidade: PEDIDO
```
Tipo: Registro de pedidos
Atributos:
  - id_pedido (PK): INT, AUTO_INCREMENT
  - id_usuario (FK): INT, NOT NULL
  - id_restaurante (FK): INT, NOT NULL
  - id_entregador (FK): INT (pode ser NULL se não atribuído)
  - id_endereco_entrega (FK): INT, NOT NULL
  - data_pedido: DATETIME, DEFAULT CURRENT_TIMESTAMP
  - data_entrega: DATETIME
  - status_pedido: ENUM('pendente', 'confirmado', 'preparando', 'saiu_para_entrega', 'entregue', 'cancelado')
  - valor_total: DECIMAL(10,2), NOT NULL
  - valor_desconto: DECIMAL(10,2), DEFAULT 0
  - valor_taxa_entrega: DECIMAL(5,2), NOT NULL
  - observacoes: TEXT
```

#### Entidade: ITEM_PEDIDO
```
Tipo: Itens que compõem um pedido
Atributos:
  - id_item_pedido (PK): INT, AUTO_INCREMENT
  - id_pedido (FK): INT, NOT NULL
  - id_cardapio (FK): INT, NOT NULL
  - quantidade: INT, NOT NULL
  - preco_unitario: DECIMAL(10,2), NOT NULL
  - subtotal: DECIMAL(10,2), NOT NULL
  - observacoes: VARCHAR(255)
```

#### Entidade: ENTREGADOR
```
Tipo: Profissional de entrega
Atributos:
  - id_entregador (PK): INT, AUTO_INCREMENT
  - nome: VARCHAR(100), NOT NULL
  - cpf: VARCHAR(11), UNIQUE, NOT NULL
  - telefone: VARCHAR(11), NOT NULL
  - email: VARCHAR(100)
  - cnh: VARCHAR(11), UNIQUE, NOT NULL
  - categoria_cnh: VARCHAR(5), NOT NULL
  - veiculo: VARCHAR(50)
  - placa_veiculo: VARCHAR(7)
  - status: ENUM('ativo', 'inativo', 'em_entrega'), DEFAULT 'ativo'
  - avaliacao_media: DECIMAL(3,2), DEFAULT 0
  - data_cadastro: DATETIME, DEFAULT CURRENT_TIMESTAMP
  - id_endereco (FK): INT
```

#### Entidade: AVALIACAO
```
Tipo: Avaliações de restaurante e entregador
Atributos:
  - id_avaliacao (PK): INT, AUTO_INCREMENT
  - id_pedido (FK): INT, NOT NULL
  - id_usuario (FK): INT, NOT NULL
  - id_restaurante (FK): INT
  - id_entregador (FK): INT
  - nota: INT (1-5), NOT NULL
  - comentario: TEXT
  - data_avaliacao: DATETIME, DEFAULT CURRENT_TIMESTAMP
  - tipo_avaliacao: ENUM('restaurante', 'entregador'), NOT NULL
```

#### Entidade: PAGAMENTO
```
Tipo: Métodos de pagamento
Atributos:
  - id_pagamento (PK): INT, AUTO_INCREMENT
  - id_pedido (FK): INT, NOT NULL, UNIQUE
  - id_usuario (FK): INT, NOT NULL
  - tipo_pagamento: ENUM('cartao_credito', 'cartao_debito', 'pix', 'dinheiro'), NOT NULL
  - valor: DECIMAL(10,2), NOT NULL
  - status_pagamento: ENUM('pendente', 'processando', 'aprovado', 'recusado'), DEFAULT 'pendente'
  - data_pagamento: DATETIME
  - numero_transacao: VARCHAR(50)
  - gateway_pagamento: VARCHAR(50)
  - data_criacao: DATETIME, DEFAULT CURRENT_TIMESTAMP
```

---

## 2. RELACIONAMENTOS E CARDINALIDADES

### 2.1 Matriz de Relacionamentos

```
USUARIO (1) ────────── (N) PEDIDO
  │
  └───────────────── (N) AVALIACAO

RESTAURANTE (1) ────────── (N) CARDAPIO
  │
  ├───────────────── (N) PEDIDO
  │
  └───────────────── (N) AVALIACAO

ENTREGADOR (1) ────────── (N) PEDIDO
  │
  └───────────────── (N) AVALIACAO

PEDIDO (1) ────────── (N) ITEM_PEDIDO
  │
  └───────────────── (1) PAGAMENTO

CARDAPIO (1) ────────── (N) ITEM_PEDIDO

ENDERECO (1) ────────── (N) USUARIO
ENDERECO (1) ────────── (N) RESTAURANTE
ENDERECO (1) ────────── (N) ENTREGADOR
ENDERECO (1) ────────── (N) PEDIDO (como endereco_entrega)
```

### 2.2 Descrição Detalhada dos Relacionamentos

| Relacionamento | Cardinalidade | Descrição |
|---|---|---|
| USUARIO - PEDIDO | 1:N | Um usuário pode fazer vários pedidos, mas cada pedido pertence a um único usuário |
| RESTAURANTE - CARDAPIO | 1:N | Um restaurante tem vários itens no cardápio, mas cada item pertence a um restaurante |
| RESTAURANTE - PEDIDO | 1:N | Um restaurante prepara vários pedidos, cada pedido é de um restaurante |
| ENTREGADOR - PEDIDO | 1:N | Um entregador realiza vários pedidos, cada pedido tem um entregador |
| PEDIDO - ITEM_PEDIDO | 1:N | Um pedido contém vários itens, cada item pertence a um pedido |
| CARDAPIO - ITEM_PEDIDO | 1:N | Um item do cardápio pode aparecer em vários pedidos |
| PEDIDO - PAGAMENTO | 1:1 | Um pedido tem um pagamento, cada pagamento é de um pedido |
| USUARIO - AVALIACAO | 1:N | Um usuário faz várias avaliações, cada avaliação é de um usuário |
| RESTAURANTE - AVALIACAO | 1:N | Um restaurante recebe várias avaliações |
| ENTREGADOR - AVALIACAO | 1:N | Um entregador recebe várias avaliações |
| ENDERECO - USUARIO | 1:N | Um endereço pode ser de um usuário, usuários podem ter múltiplos endereços |
| ENDERECO - RESTAURANTE | 1:1 | Um restaurante tem um endereço |
| ENDERECO - ENTREGADOR | 1:N | Entregadores podem estar associados a endereços de referência |
| ENDERECO - PEDIDO | 1:N | Um endereço é usado para múltiplas entregas |

---

## 3. DIAGRAMA ENTIDADE-RELACIONAMENTO (Notação UML)

```
┌──────────────────┐
│    USUARIO       │
├──────────────────┤
│ id_usuario (PK)  │◄────┐
│ nome             │     │ 1
│ email            │     │
│ telefone         │     ├─── (1:N)
│ cpf              │     │
│ senha            │     │ N
│ data_cadastro    │     ├──────────────┐
│ status           │     │              │
│ limite_credito   │     │    ┌─────────▼──────────────┐
│ id_endereco (FK) │     │    │      PEDIDO           │
└──────────────────┘     │    ├──────────────────────┤
                         │    │ id_pedido (PK)       │
                         │    │ id_usuario (FK) ────┘
                         │    │ id_restaurante (FK)──┐
                         │    │ id_entregador (FK)───┼──┐
                         │    │ id_endereco_ent (FK) │  │
                         │    │ data_pedido          │  │
                         │    │ status_pedido        │  │
                         │    │ valor_total          │  │
                         │    │ valor_desconto       │  │
                         │    │ valor_taxa_entrega   │  │
                         │    │ observacoes          │  │
                         │    └─────────┬──────────────┘
                         │              │
                         │              │ 1
                         │              ├── (1:N)
                         │              │ N
                         │              │
                         └──────┬───────┴──────────────┐
                                │                      │
                         ┌──────▼──────────────┐  ┌────▼─────────────────┐
                         │   ITEM_PEDIDO       │  │    PAGAMENTO         │
                         ├─────────────────────┤  ├─────────────────────┤
                         │ id_item_pedido (PK) │  │ id_pagamento (PK)   │
                         │ id_pedido (FK)      │  │ id_pedido (FK)      │
                         │ id_cardapio (FK) ───┼──┼─► (1:1)             │
                         │ quantidade          │  │ id_usuario (FK)     │
                         │ preco_unitario      │  │ tipo_pagamento      │
                         │ subtotal            │  │ valor               │
                         │ observacoes         │  │ status_pagamento    │
                         └─────────────────────┘  │ data_pagamento      │
                                                   │ numero_transacao    │
                         ┌──────────────────────┐  │ gateway_pagamento   │
                         │    CARDAPIO          │  │ data_criacao        │
                         ├──────────────────────┤  └─────────────────────┘
                         │ id_cardapio (PK) ◄──┼──┐
                         │ id_restaurante (FK)  │  │ (1:N)
                         │ nome                 │  │
                         │ descricao            │  │
                         │ preco                │  │
                         │ categoria            │  │
                         │ disponivel           │  │
                         │ quantidade_estoque   │  │
                         │ imagem_url           │  │
                         │ data_criacao         │  │
                         └────────┬─────────────┘  │
                                  │                │
                                  │                │
┌──────────────────────┐          │                │
│   RESTAURANTE        │◄─────────┼────────────────┘
├──────────────────────┤  1       │
│ id_restaurante (PK)  │◄─────────┼─────┐
│ nome                 │    (1:N) │     │
│ cnpj                 │          │     │
│ descricao            │          │     │
│ telefone             │          │     │
│ email                │    ┌─────▼──────────────┐
│ horario_abertura     │    │   ENTREGADOR       │
│ horario_fechamento   │    ├────────────────────┤
│ taxa_entrega         │    │ id_entregador (PK) │
│ tempo_medio_preparo  │    │ nome               │
│ avaliacao_media      │    │ cpf                │
│ status               │    │ telefone           │
│ data_cadastro        │    │ email              │
│ id_endereco (FK) ────┼─┐  │ cnh                │
└──────────┬───────────┘ │  │ categoria_cnh      │
           │             │  │ veiculo            │
           │ (1:N)       │  │ placa_veiculo      │
           │             │  │ status             │
           │             │  │ avaliacao_media    │
           │             │  │ data_cadastro      │
           │             │  │ id_endereco (FK)   │
    ┌──────▼─────────────┼──┴─────────────────────┘
    │                    │
    │  ┌────────────────────────────┐
    │  │  ENDERECO                  │
    │  ├────────────────────────────┤
    │  │ id_endereco (PK)           │
    │  │ cep                        │
    │  │ rua                        │
    │  │ numero                     │
    │  │ complemento                │
    │  │ bairro                     │
    │  │ cidade                     │
    │  │ estado                     │
    │  │ latitude                   │
    │  │ longitude                  │
    │  │ tipo_endereco              │
    │  └────────────────────────────┘
    │
    └──────────────────────────────┐
                                   │
        ┌──────────────────────────┘
        │
        │ (1:N)
        │
┌───────▼─────────────────┐
│   AVALIACAO             │
├─────────────────────────┤
│ id_avaliacao (PK)       │
│ id_pedido (FK)          │
│ id_usuario (FK)         │
│ id_restaurante (FK)     │
│ id_entregador (FK)      │
│ nota                    │
│ comentario              │
│ data_avaliacao          │
│ tipo_avaliacao          │
└─────────────────────────┘
```

---

## 4. APLICAÇÃO DE NORMALIZAÇÃO

### 4.1 Verificação de 1ª Forma Normal (1FN)

**Requisito:** Cada atributo deve conter apenas valores atômicos (indivisíveis)

**Análise:**
- ✅ USUARIO: Todos os atributos são atômicos
- ✅ RESTAURANTE: Horários separados (abertura/fechamento)
- ✅ CARDAPIO: Sem atributos multivalorados
- ✅ PEDIDO: Sem atributos compostos
- ✅ ITEM_PEDIDO: Valores simples
- ✅ ENTREGADOR: Dados individuais, sem composição
- ✅ ENDERECO: Lat/Long separados, sem composição
- ✅ AVALIACAO: Sem multivalorados
- ✅ PAGAMENTO: Atributos simples

**Conclusão:** Todas as entidades estão em 1FN ✅

### 4.2 Verificação de 2ª Forma Normal (2FN)

**Requisito:** Estar em 1FN + Não há dependências parciais (todos os atributos não-chave dependem da chave primária completa)

**Análise por entidade:**

#### USUARIO
```
Chave Primária: id_usuario (simples)
Dependências:
  - nome depende de id_usuario ✓
  - email depende de id_usuario ✓
  - cpf depende de id_usuario ✓
Status: EM 2FN ✅
```

#### CARDAPIO
```
Chave Primária: id_cardapio (simples)
Dependências:
  - nome depende de id_cardapio ✓
  - preco depende de id_cardapio ✓
  - id_restaurante depende de id_cardapio ✓
Status: EM 2FN ✅
```

#### ITEM_PEDIDO
```
Chave Primária: id_item_pedido (simples)
Dependências:
  - quantidade depende de id_item_pedido ✓
  - preco_unitario depende de id_item_pedido ✓
Status: EM 2FN ✅
```

#### PEDIDO
```
Chave Primária: id_pedido (simples)
Dependências:
  - id_usuario depende de id_pedido ✓
  - status_pedido depende de id_pedido ✓
  - valor_total depende de id_pedido ✓
Status: EM 2FN ✅
```

**Conclusão:** Todas as entidades estão em 2FN ✅

### 4.3 Verificação de 3ª Forma Normal (3FN)

**Requisito:** Estar em 2FN + Nenhum atributo não-chave depende de outro atributo não-chave (eliminar dependências transitivas)

**Anomalia Identificada em RESTAURANTE:**
```
Problema Potencial: avaliacao_media
  - avaliacao_media depende de id_restaurante ✓
  - MAS avaliacao_media é DERIVADA de AVALIACAO
  - Isso cria dependência transitiva implícita

Solução: 
  - Manter avaliacao_media para performance (desnormalização controlada)
  - Criar trigger para atualizar automaticamente
  - Justificativa: Evita JOIN custoso em cada consulta de listagem
```

**Trigger para Manter avaliacao_media:**
```sql
DELIMITER //
CREATE TRIGGER atualizar_avaliacao_restaurante
AFTER INSERT ON AVALIACAO
FOR EACH ROW
BEGIN
  UPDATE RESTAURANTE 
  SET avaliacao_media = (
    SELECT AVG(nota) 
    FROM AVALIACAO 
    WHERE id_restaurante = NEW.id_restaurante
  )
  WHERE id_restaurante = NEW.id_restaurante;
END //
DELIMITER ;
```

**Análise Final:**
- ✅ USUARIO: Sem dependências transitivas (3FN)
- ✅ RESTAURANTE: Desnormalização justificada por performance (3FN com exceção controlada)
- ✅ CARDAPIO: Sem dependências transitivas (3FN)
- ✅ PEDIDO: Sem dependências transitivas (3FN)
- ✅ ITEM_PEDIDO: Sem dependências transitivas (3FN)
- ✅ ENTREGADOR: Sem dependências transitivas (3FN)
- ✅ ENDERECO: Sem dependências transitivas (3FN)
- ✅ AVALIACAO: Sem dependências transitivas (3FN)
- ✅ PAGAMENTO: Sem dependências transitivas (3FN)

**Conclusão:** Modelo em 3ª Forma Normal ✅

---

## 5. IDENTIFICAÇÃO DE ANOMALIAS

### 5.1 Anomalias Eliminadas

#### Anomalia de Inserção
**Evitada por:** Estrutura de chaves estrangeiras
- Não é possível inserir um ITEM_PEDIDO sem um PEDIDO existente
- Não é possível criar um PEDIDO sem USUARIO e RESTAURANTE

#### Anomalia de Atualização
**Evitada por:** Normalização
- Atualizar endereço de restaurante só afeta uma linha
- Histórico de pedidos não é afetado por mudanças de cadastro

#### Anomalia de Exclusão
**Evitada por:** Constraints de integridade referencial com CASCADE controlado
- Deletar USUARIO deleta seus PEDIDOS (com cuidado/soft delete)
- Manter histórico de PAGAMENTOS mesmo após deleção de PEDIDO

---

## 6. CHECKLIST DE AVALIAÇÃO RESPONDIDO

✅ **Reconhecimento de entidades, atributos e relacionamentos** - Detalhado em seção 1  
✅ **Características de modelagem** - Aplicadas técnicas de normalização  
✅ **Distinção entre entidades, atributos e relacionamentos** - Documentado em seção 2  
✅ **Elementos do modelo conceitual, lógico e físico** - DER apresentado na notação padrão  
✅ **Tipos de dados e restrições** - Definidos para cada atributo  
✅ **Atributos-chave e derivados** - Identificadas PKs, FKs e atributos calculados  
✅ **Técnicas de modelagem aplicadas** - 1FN, 2FN, 3FN verificadas  
✅ **Padrão de notação UML** - Diagrama segue convenções  
✅ **Representação gráfica correta** - Cardinalidades e relacionamentos indicados  
✅ **Revisão para coerência** - Sem redundâncias ou inconsistências  
✅ **Normalização até 3FN** - Verificada e documentada  
✅ **Anomalias identificadas** - Eliminadas através de normalização  
✅ **Classificação de normalização** - Modelo está em 3FN  
✅ **Ajustes na estrutura** - Apenas desnormalização controlada (avaliacao_media)  

---

## CONCLUSÃO

O modelo conceitual para o Sistema de Delivery está **validado, normalizado até 3FN e pronto para implementação físico em MySQL**. O diagrama é coerente, não apresenta redundâncias e atende todos os requisitos do projeto.

