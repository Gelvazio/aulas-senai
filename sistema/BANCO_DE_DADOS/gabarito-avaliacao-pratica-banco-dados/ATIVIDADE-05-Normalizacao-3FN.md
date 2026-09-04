# ATIVIDADE 05: Aplicação de Normalização até 3ª Forma Normal

**Projeto:** Sistema de Delivery de Comida  
**SGBD:** MySQL 8.0  
**Versão:** 1.0

---

## 1. CONCEITO DE FORMAS NORMAIS

### 1.1 Definição

A normalização é um processo sistemático de organizando dados em tabelas para:
- ✅ Eliminar redundância
- ✅ Minimizar anomalias de dados
- ✅ Melhorar integridade referencial
- ✅ Facilitar manutenção

### 1.2 Progressão das Formas Normais

```
Dados Não-Organizados
        ↓
    1ª Forma Normal (1FN) → Elimina atributos multivalorados
        ↓
    2ª Forma Normal (2FN) → Elimina dependências parciais
        ↓
    3ª Forma Normal (3FN) → Elimina dependências transitivas
        ↓
    Modelo Normalizado e Otimizado
```

---

## 2. VERIFICAÇÃO DE 1ª FORMA NORMAL (1FN)

### 2.1 Definição de 1FN

**Requisito:** Todos os atributos devem conter apenas valores atômicos (indivisíveis).

**O que violar 1FN:**
- ❌ Atributos multivalorados (listas dentro de um campo)
- ❌ Atributos compostos (nome_completo em um campo)
- ❌ Atributos repetidos (telefone1, telefone2, telefone3)

### 2.2 Análise por Entidade

#### USUARIO - Verificação 1FN
```
Atributos:
  - id_usuario: INT → Atômico ✓
  - nome: VARCHAR(100) → Atômico ✓
  - email: VARCHAR(100) → Atômico ✓
  - telefone: VARCHAR(11) → Atômico ✓
  - cpf: VARCHAR(11) → Atômico ✓
  - senha: VARCHAR(255) → Atômico ✓
  - id_endereco: INT (FK) → Atômico ✓
  - data_cadastro: DATETIME → Atômico ✓
  - status: ENUM → Atômico ✓
  - limite_credito: DECIMAL → Atômico ✓

Status: EM 1FN ✅
```

#### ENDERECO - Verificação 1FN
```
Potencial Problema: Endereço Composto?
  - cep: Atômico ✓
  - rua: Atômico ✓
  - numero: Atômico ✓
  - complemento: Atômico ✓
  - bairro: Atômico ✓
  - cidade: Atômico ✓
  - estado: Atômico ✓
  - latitude: Atômico ✓
  - longitude: Atômico ✓

Justificação: Separamos cada componente do endereço em colunas atômicas
Status: EM 1FN ✅
```

#### RESTAURANTE - Verificação 1FN
```
Atributos:
  - id_restaurante: INT → Atômico ✓
  - nome: VARCHAR(100) → Atômico ✓
  - cnpj: VARCHAR(14) → Atômico ✓
  - descricao: TEXT → Atômico ✓
  - telefone: VARCHAR(11) → Atômico ✓
  - email: VARCHAR(100) → Atômico ✓
  - id_endereco: INT → Atômico ✓
  - horario_abertura: TIME → Atômico ✓
  - horario_fechamento: TIME → Atômico ✓
  - taxa_entrega: DECIMAL → Atômico ✓
  - tempo_medio_preparo: INT → Atômico ✓
  - avaliacao_media: DECIMAL → Atômico ✓

Status: EM 1FN ✅
```

#### CARDAPIO - Verificação 1FN
```
Atributos: Todos atômicos
  - id_cardapio ✓
  - id_restaurante ✓
  - nome ✓
  - descricao ✓
  - preco ✓
  - categoria ✓
  - disponivel ✓
  - quantidade_estoque ✓
  - imagem_url ✓

Status: EM 1FN ✅
```

#### PEDIDO - Verificação 1FN
```
Potencial Problema? Valor Total é composto?
  - valor_total: Resultado de cálculo, MAS é armazenado como atômico ✓
  - valor_desconto: Atômico ✓
  - valor_taxa_entrega: Atômico ✓
  
Justificação: Cada valor é armazenado em campo separado e atômico

Status: EM 1FN ✅
```

#### ITEM_PEDIDO - Verificação 1FN
```
Atributos:
  - id_item_pedido ✓
  - id_pedido ✓
  - id_cardapio ✓
  - quantidade: INT → Atômico ✓
  - preco_unitario: DECIMAL → Atômico ✓
  - subtotal: DECIMAL → Atômico ✓
  - observacoes: VARCHAR → Atômico ✓

Status: EM 1FN ✅
```

#### ENTREGADOR - Verificação 1FN
```
Atributos:
  - id_entregador ✓
  - nome ✓
  - cpf ✓
  - telefone ✓
  - email ✓
  - cnh ✓
  - categoria_cnh ✓
  - veiculo ✓
  - placa_veiculo ✓
  - id_endereco ✓
  - avaliacao_media ✓
  - status ✓

Status: EM 1FN ✅
```

#### PAGAMENTO - Verificação 1FN
```
Todos os atributos são atômicos
Status: EM 1FN ✅
```

#### AVALIACAO - Verificação 1FN
```
Todos os atributos são atômicos
Status: EM 1FN ✅
```

### 2.3 Conclusão sobre 1FN

✅ **Todas as 9 entidades estão em 1ª Forma Normal**

---

## 3. VERIFICAÇÃO DE 2ª FORMA NORMAL (2FN)

### 3.1 Definição de 2FN

**Requisito:** Estar em 1FN + Nenhum atributo não-chave pode depender parcialmente da chave primária.

**Quando viola 2FN:**
- ❌ Chave primária composta e alguns atributos dependem apenas de PARTE da chave

### 3.2 Análise de Dependências Parciais

#### USUARIO - Verificação 2FN
```
Chave Primária: id_usuario (SIMPLES)
Por ter chave simples, não há risco de dependência parcial

Dependências:
  - nome DEPENDE DE id_usuario ✓
  - email DEPENDE DE id_usuario ✓
  - telefone DEPENDE DE id_usuario ✓
  - cpf DEPENDE DE id_usuario ✓

Status: EM 2FN ✅
```

#### ITEM_PEDIDO - Verificação 2FN (Potencial Problema)
```
Chave Primária: id_item_pedido (SIMPLES)

Análise:
  - id_pedido: Referencia o pedido, mas também identifica o item ✓
  - id_cardapio: Referencia o cardápio, parte da identidade ✓
  - quantidade: Depende do item_pedido específico ✓
  - preco_unitario: Preço no momento do pedido, depende do item ✓
  - subtotal: Cálculo de quantidade × preco_unitario ✓

Status: EM 2FN ✅

Nota: Não há dependência parcial porque a chave é simples (id_item_pedido)
```

#### CARDAPIO - Verificação 2FN
```
Chave Primária: id_cardapio (SIMPLES)

Dependências:
  - id_restaurante: Identifica qual restaurante ✓
  - nome: Depende do cardápio ✓
  - descricao: Depende do cardápio ✓
  - preco: Depende do cardápio ✓
  - categoria: Depende do cardápio ✓

Status: EM 2FN ✅
```

#### PEDIDO - Verificação 2FN
```
Chave Primária: id_pedido (SIMPLES)

Todas as colunas:
  - id_usuario: Depende do pedido ✓
  - id_restaurante: Depende do pedido ✓
  - id_entregador: Depende do pedido ✓
  - status_pedido: Depende do pedido ✓
  - valor_total: Depende do pedido ✓

Status: EM 2FN ✅
```

#### RESTAURANTE - Verificação 2FN
```
Chave Primária: id_restaurante (SIMPLES)

Dependências:
  - nome: Depende de id_restaurante ✓
  - cnpj: Depende de id_restaurante ✓
  - email: Depende de id_restaurante ✓
  - telefone: Depende de id_restaurante ✓
  - avaliacao_media: Depende de id_restaurante ✓

Status: EM 2FN ✅
```

#### ENTREGADOR - Verificação 2FN
```
Chave Primária: id_entregador (SIMPLES)

Todas as colunas dependem diretamente de id_entregador
Status: EM 2FN ✅
```

#### PAGAMENTO - Verificação 2FN
```
Chave Primária: id_pagamento (SIMPLES)

Dependências:
  - id_pedido: Depende do pagamento ✓
  - id_usuario: Depende do pagamento ✓
  - tipo_pagamento: Depende do pagamento ✓
  - valor: Depende do pagamento ✓

Status: EM 2FN ✅
```

#### AVALIACAO - Verificação 2FN
```
Chave Primária: id_avaliacao (SIMPLES)

Dependências:
  - id_pedido: Depende da avaliação ✓
  - id_usuario: Depende da avaliação ✓
  - nota: Depende da avaliação ✓

Status: EM 2FN ✅
```

#### ENDERECO - Verificação 2FN
```
Chave Primária: id_endereco (SIMPLES)

Todas as colunas dependem de id_endereco
Status: EM 2FN ✅
```

### 3.3 Conclusão sobre 2FN

✅ **Todas as 9 entidades estão em 2ª Forma Normal**

---

## 4. VERIFICAÇÃO DE 3ª FORMA NORMAL (3FN)

### 4.1 Definição de 3FN

**Requisito:** Estar em 2FN + Nenhum atributo não-chave pode depender de outro atributo não-chave (eliminar dependências transitivas).

**O que viola 3FN:**
- ❌ Coluna A depende de B, e B não é a chave primária
- ❌ Dados derivados sem justificativa

### 4.2 Identificação de Dependências Transitivas

#### RESTAURANTE - Análise Crítica
```
Anomalia Potencial Identificada: avaliacao_media

Análise da Dependência:
  - avaliacao_media depende de id_restaurante ✓ (chave primária)
  - MAS avaliacao_media é DERIVADA de:
    - AVALIACAO.nota (tabela AVALIACAO)
    - Onde AVALIACAO.id_restaurante = RESTAURANTE.id_restaurante
    - Cálculo: AVG(AVALIACAO.nota)

Isso cria uma DEPENDÊNCIA TRANSITIVA IMPLÍCITA:
  - RESTAURANTE.avaliacao_media DEPENDE DE AVALIACAO.nota
  - AVALIACAO.nota DEPENDE DE RESTAURANTE.id_restaurante

Violação de 3FN? Tecnicamente SIM, mas...

DECISÃO: Manter a desnormalização por RAZÕES DE PERFORMANCE

Justificativa:
  1. Consultas frequentes de listagem de restaurantes precisam das avaliações
  2. Sem avaliacao_media, seria necessário JOIN com AVALIACAO a cada consulta
  3. A atualização é feita através de TRIGGER (automática)
  4. Benefício: Performance >> Custo: Redundância controlada

Trigger de Atualização Automática:
```

#### SQL: Criar Trigger para Manter avaliacao_media Sincronizada
```sql
DELIMITER //
CREATE TRIGGER atualizar_avaliacao_restaurante
AFTER INSERT ON AVALIACAO
FOR EACH ROW
BEGIN
  IF NEW.tipo_avaliacao = 'restaurante' THEN
    UPDATE RESTAURANTE
    SET avaliacao_media = (
      SELECT ROUND(AVG(nota), 2)
      FROM AVALIACAO
      WHERE id_restaurante = NEW.id_restaurante
        AND tipo_avaliacao = 'restaurante'
    )
    WHERE id_restaurante = NEW.id_restaurante;
  END IF;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER atualizar_avaliacao_restaurante_update
AFTER UPDATE ON AVALIACAO
FOR EACH ROW
BEGIN
  IF NEW.tipo_avaliacao = 'restaurante' THEN
    UPDATE RESTAURANTE
    SET avaliacao_media = (
      SELECT ROUND(AVG(nota), 2)
      FROM AVALIACAO
      WHERE id_restaurante = NEW.id_restaurante
        AND tipo_avaliacao = 'restaurante'
    )
    WHERE id_restaurante = NEW.id_restaurante;
  END IF;
END //
DELIMITER ;
```

#### ENTREGADOR - Análise Similar
```
Anomalia Potencial: avaliacao_media (entregador)

Mesma situação de RESTAURANTE:
  - É derivada de AVALIACAO
  - Viola 3FN tecnicamente
  - Mantida por performance
  - Atualizada via TRIGGER
```

#### Outras Entidades - Verificação 3FN

**USUARIO:**
- Nenhum atributo depende de outro não-chave ✅ (3FN)

**ITEM_PEDIDO:**
- preco_unitario: Cópia do preço no momento do pedido
  - Justificativa: Manter histórico (não muda se cardápio mudar)
  - É uma desnormalização INTENCIONAL e CORRETA ✅ (3FN com exceção)

**PEDIDO:**
- valor_total: Resultado de cálculo, MAS armazenado para histórico ✓
- Nenhuma dependência transitiva ✅ (3FN)

**CARDAPIO:**
- Nenhuma dependência transitiva ✅ (3FN)

**PAGAMENTO:**
- Nenhuma dependência transitiva ✅ (3FN)

**AVALIACAO:**
- Nenhuma dependência transitiva ✅ (3FN)

**ENDERECO:**
- Nenhuma dependência transitiva ✅ (3FN)

### 4.3 Conclusão sobre 3FN

✅ **Todas as 9 entidades estão em 3ª Forma Normal (com desnormalizações justificadas)**

---

## 5. ANOMALIAS ELIMINADAS PELA NORMALIZAÇÃO

### 5.1 Anomalia de Inserção

**Antes (Se não normalizado):**
```
Tentativa de inserir um novo restaurante sem nenhum pedido
❌ ERRO: Impossível, pois precisaria de valores para endereço, avaliação, etc.
```

**Depois (Normalizado):**
```
✅ INSERT INTO RESTAURANTE (nome, cnpj, email, id_endereco, ...) VALUES (...)
   Funciona perfeitamente, cada entidade é independente
```

### 5.2 Anomalia de Atualização

**Antes (Se não normalizado):**
```
Tabela RESTAURANTE teria repetidas: (id, nome, endereco, endereco, endereco)
Para cada pedido do restaurante
❌ PROBLEMA: Atualizar endereço exigiria múltiplas operações
```

**Depois (Normalizado):**
```
UPDATE ENDERECO SET rua = '...' WHERE id_endereco = 5
✅ Uma única atualização afeta todos que usam esse endereço
```

### 5.3 Anomalia de Exclusão

**Antes (Se não normalizado):**
```
DELETE FROM RESTAURANTE WHERE id = 1
❌ PROBLEMA: Perder todo o histórico de pedidos, avaliações
```

**Depois (Normalizado):**
```
DELETE FROM RESTAURANTE WHERE id = 1
✅ Apenas o restaurante é deletado
✅ Histórico de PEDIDO, AVALIACAO, CARDAPIO é preservado (FK com RESTRICT)
```

---

## 6. PROCEDIMENTOS DE SEGURANÇA E BACKUP

### 6.1 Implementação de Backup

#### Backup Completo Semanal
```bash
# mysqldump para backup completo
mysqldump -u root -p delivery_comida > backup_completo_$(date +%Y%m%d).sql

# Agendado via cron
0 2 * * 0 mysqldump -u root -p delivery_comida > /backups/completo_$(date +\%Y\%m\%d).sql
```

#### Backup Incremental (Binary Log)
```sql
-- Habilitar binary logging (my.cnf):
[mysqld]
log_bin = mysql-bin
binlog_format = ROW
binlog_retention_days = 7

-- Verificar binlogs
SHOW BINARY LOGS;

-- Restaurar a partir de binlog
mysqlbinlog mysql-bin.000001 | mysql -u root -p delivery_comida
```

### 6.2 Recuperação de Desastres

#### Procedimento de Recuperação
```bash
# 1. Restaurar backup completo
mysql -u root -p delivery_comida < backup_completo_20240115.sql

# 2. Aplicar binlogs desde o backup até o ponto desejado
mysqlbinlog --start-date="2024-01-15 14:00:00" \
            --stop-date="2024-01-15 16:00:00" \
            mysql-bin.000005 | mysql -u root -p delivery_comida
```

### 6.3 Teste de Restauração

```sql
-- Teste 1: Verificar integridade dos dados
SELECT COUNT(*) FROM USUARIO;
SELECT COUNT(*) FROM PEDIDO;
SELECT COUNT(*) FROM PAGAMENTO;

-- Teste 2: Verificar relacionamentos
SELECT * FROM PEDIDO WHERE id_usuario NOT IN (SELECT id_usuario FROM USUARIO);
-- Resultado: Vazio (sem orphans)

-- Teste 3: Validar valores
SELECT * FROM PAGAMENTO WHERE valor < 0;
-- Resultado: Vazio (sem valores negativos)
```

---

## 7. NORMALIZAÇÃO DE LINGUAGENS DE BANCO DE DADOS

### 7.1 DDL - Data Definition Language

**Comandos utilizados na normalização:**

```sql
-- CREATE: Criar tabelas normalizadas
CREATE TABLE CARDAPIO (
    id_cardapio INT PRIMARY KEY,
    id_restaurante INT NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_restaurante) REFERENCES RESTAURANTE(id_restaurante)
);

-- ALTER: Adicionar constraints de integridade
ALTER TABLE CARDAPIO
ADD CONSTRAINT chk_preco CHECK (preco > 0);

-- DROP: Remover estruturas quando necessário
DROP TABLE ITEM_PEDIDO;
```

### 7.2 DML - Data Manipulation Language

**Comandos usados na validação:**

```sql
-- INSERT: Adicionar dados preservando integridade
INSERT INTO RESTAURANTE (nome, id_endereco, ...) VALUES (...);

-- UPDATE: Modificar dados mantendo normalização
UPDATE RESTAURANTE SET avaliacao_media = ... WHERE id_restaurante = ...;

-- DELETE: Remover dados com cascata controlada
DELETE FROM RESTAURANTE WHERE id_restaurante = 1;

-- SELECT: Verificar integridade
SELECT * FROM PEDIDO WHERE id_restaurante NOT IN 
    (SELECT id_restaurante FROM RESTAURANTE);
```

### 7.3 DCL - Data Control Language

**Controle de acesso:**

```sql
-- Criar usuário com permissões limitadas
CREATE USER 'aplicacao'@'localhost' IDENTIFIED BY 'senha_segura';

-- Conceder permissões específicas
GRANT SELECT, INSERT, UPDATE ON delivery_comida.* TO 'aplicacao'@'localhost';

-- Deny DELETE em tabelas críticas
REVOKE DELETE ON delivery_comida.USUARIO FROM 'aplicacao'@'localhost';
```

---

## 8. CHECKLIST DE NORMALIZAÇÃO

### Verificação de 1FN
- ✅ Todos os atributos contêm valores atômicos
- ✅ Não há atributos multivalorados
- ✅ Não há atributos compostos repetidos
- ✅ Cada tabela representa uma entidade única

### Verificação de 2FN
- ✅ Modelo está em 1FN
- ✅ Todos os atributos não-chave dependem COMPLETAMENTE da chave primária
- ✅ Não há dependências parciais
- ✅ Se houver chave composta, todos os atributos dependem de TODAS as colunas da chave

### Verificação de 3FN
- ✅ Modelo está em 2FN
- ✅ Nenhum atributo não-chave depende de outro atributo não-chave
- ✅ Desnormalizações identificadas são justificadas por performance
- ✅ Triggers implementadas para manter consistência em dados derivados

### Qualidade de Implementação
- ✅ Chaves primárias definidas em todas as tabelas
- ✅ Chaves estrangeiras configuradas com ON DELETE/UPDATE apropriados
- ✅ Índices criados para colunas frequentemente consultadas
- ✅ Constraints CHECK implementadas para validação

---

## CONCLUSÃO

O modelo de dados do **Sistema de Delivery de Comida** foi verificado e validado até a **3ª Forma Normal (3FN)**. 

As desnormalizações identificadas (avaliacao_media em RESTAURANTE e ENTREGADOR, preco_unitario em ITEM_PEDIDO) são intencionais, justificadas por razões de performance, e mantidas consistentes através de triggers e procedimentos automáticos.

**Status:** ✅ **MODELO NORMALIZADO E PRONTO PARA PRODUÇÃO**

