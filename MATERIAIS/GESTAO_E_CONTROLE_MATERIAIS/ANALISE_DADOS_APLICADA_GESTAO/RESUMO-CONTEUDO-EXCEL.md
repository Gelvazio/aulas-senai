# 📊 RESUMO: Conteúdo de Excel — Aulas 3 a 6

**Unidade Curricular:** Análise de Dados Aplicada à Gestão  
**Curso:** Técnico em Gestão e Controle de Materiais  
**Data:** 2026-09-14

---

## 📌 Visão Geral

Este resumo consolida o conteúdo de Excel das **Aulas 3, 4, 5 e 6**, distribuídas em dois blocos pedagógicos:
- **BLOCO 01:** Excel Básico e Intermediário (Aulas 3-4)
- **BLOCO 02:** Excel Avançado (Aulas 5-6)

---

## 🎯 Objetivos Gerais

Ao final destas aulas, os alunos serão capazes de:

1. ✅ **Dominar a interface e funcionalidades básicas** do Excel
2. ✅ **Aplicar fórmulas e funções** para automatizar cálculos
3. ✅ **Formatar dados** de forma profissional
4. ✅ **Usar funções avançadas** para consulta e análise
5. ✅ **Criar tabelas dinâmicas** para resumos automáticos
6. ✅ **Desenvolver gráficos e dashboards** para visualização

---

---

# AULA 3: Excel Básico — Interface e Fórmulas

## 📋 Conteúdo Principal

### 1. Interface do Excel

**Estrutura de Navegação:**
- **Fita (Ribbon):** Menu principal com abas (Página Inicial, Inserir, Layout, Fórmulas, etc)
- **Planilhas e Abas:** Múltiplas planilhas dentro de um arquivo
- **Célula:** Unidade básica (identificada por letra de coluna + número de linha)
  - Exemplo: A1, B5, Z100
- **Linhas e Colunas:** Estrutura de grade (1.048.576 linhas × 16.384 colunas)

**Elementos de Visualização:**
- Barra de Fórmulas (mostra conteúdo/fórmula da célula ativa)
- Barra de Status (informações sobre seleção atual)
- Painel de Navegação (lista de planilhas e nomes definidos)

### 2. Entrada de Dados

**Tipos de Dados:**
- **Números:** Inteiros, decimais, moedas
- **Texto:** Letras, caracteres especiais
- **Datas:** Formato DD/MM/AAAA ou similar
- **Hora:** Formato HH:MM:SS
- **Booleano:** VERDADEIRO ou FALSO

**Formatação Automática:**
- Excel reconhece tipo de dado automaticamente
- Alinhamento automático (números: direita, texto: esquerda)

### 3. Fórmulas Básicas

**Operadores Aritméticos:**
```
+   Adição
-   Subtração
*   Multiplicação
/   Divisão
^   Exponenciação (potência)
%   Percentual
```

**Exemplos de Fórmulas:**
```excel
=A1 + B1              // Soma de duas células
=A1:A10               // Referência a intervalo
=2 * C5               // Multiplicação
=(D1 + D2) / 2        // Cálculo de média simples
```

---

## 🔧 Funções Essenciais

### Funções Matemáticas e Estatísticas

| Função | Sintaxe | Descrição | Exemplo |
|--------|---------|-----------|---------|
| **SUM** | =SUM(intervalo) | Soma valores | =SUM(A1:A10) |
| **AVERAGE** | =AVERAGE(intervalo) | Calcula média | =AVERAGE(B1:B5) |
| **COUNT** | =COUNT(intervalo) | Conta números | =COUNT(C1:C20) |
| **MAX** | =MAX(intervalo) | Valor máximo | =MAX(D1:D100) |
| **MIN** | =MIN(intervalo) | Valor mínimo | =MIN(D1:D100) |
| **PRODUCT** | =PRODUCT(intervalo) | Multiplica valores | =PRODUCT(E1:E5) |

### Função IF (Lógica Condicional)

**Sintaxe Básica:**
```excel
=IF(condição, valor_se_verdadeiro, valor_se_falso)
```

**Exemplos:**
```excel
=IF(A1>100, "Acima do limite", "Dentro do limite")
=IF(B5="Ativo", 1, 0)
=IF(C10<50, "Crítico", IF(C10<100, "Atenção", "OK"))  // IF aninhado
```

**Aplicação Prática:**
- Classificação de produtos (A, B, C por valor)
- Alertas de estoque (criticamente baixo, normal, alto)
- Bonificações condicionais (comissão por faixa)

---

## 🔗 Referências de Células

### Referência Relativa vs Absoluta

**Referência Relativa:** A célula muda ao copiar
```excel
=A1 + B1
// Ao copiar para linha 2: =A2 + B2
// Ao copiar para coluna C: =B1 + C1
```

**Referência Absoluta:** A célula permanece fixa (usa $)
```excel
=A$1 + B1           // Fixa a linha 1
=$A1 + B1           // Fixa a coluna A
=$A$1 + B1          // Fixa linha E coluna (célula completa)
```

**Uso Prático:**
- Tabela de taxas/percentuais fixos
- Referências a constantes (como uma taxa de inflação)
- Cópia de fórmulas mantendo referência a célula específica

---

## ✏️ Atividades Práticas — Aula 3

1. **Criação de Planilha de Vendas:**
   - Estruturar dados com cabeçalhos
   - Inserir dados de 10 produtos (nome, quantidade, preço)
   - Criar coluna de total (quantidade × preço)

2. **Aplicação de SUM e AVERAGE:**
   - Calcular total de vendas (SUM)
   - Calcular preço médio (AVERAGE)
   - Contar produtos (COUNT)

3. **Uso de IF para Classificação:**
   - Classificar produtos como "Caro" (>R$100) ou "Barato"
   - Marcar estoque baixo (<50 unidades)

4. **Cópia de Fórmulas:**
   - Praticar cópia com referências relativas
   - Entender diferença com referências absolutas

---

---

# AULA 4: Excel Intermediário — Formatação e Validação

## 📋 Conteúdo Principal

### 1. Formatação de Células

**Formatação de Números:**
```
Tipo             | Exemplo    | Sintaxe
Geral            | 1234.56    | Padrão
Número           | 1,234.56   | 2 casas decimais
Moeda            | R$ 1.234,56 | BRL - Real
Percentual       | 25.5%      | Com % símbolo
Data             | 14/09/2026 | DD/MM/AAAA
Hora             | 14:30:45   | HH:MM:SS
Contabilidade    | R$ 1.234,56 | Alinhado à direita
```

**Como Formatar:**
1. Selecionar célula(s)
2. Clicar direito → "Formatar Células"
3. Escolher categoria e configurações
4. Aplicar

### 2. Formatação Condicional Básica

**Conceito:** Aplicar cores/estilos baseado em condições

**Exemplos:**
```
Condição                  | Formatação
Valor > 1000              | Fundo vermelho
Valor < 100               | Fundo amarelo
Valor = "Crítico"         | Texto vermelho, negrito
Valor entre 50 e 200      | Barra de dados
```

**Aplicação:**
- Destaque de valores fora do padrão
- Alertas visuais de anomalias
- Indicadores de performance (verde=bom, vermelho=ruim)

### 3. Formatação de Células

**Bordas e Linhas:**
- Adicionar bordas para separação visual
- Estilos de linha (sólida, pontilhada, dupla)

**Cores e Preenchimento:**
- Cor de fundo para agrupar dados
- Cor de texto para destaque

**Fonte e Alinhamento:**
- Tamanho e estilo de fonte
- Alinhamento horizontal (esquerda, centro, direita)
- Alinhamento vertical (superior, meio, inferior)
- Quebra de texto para células com muito conteúdo

**Exemplo de Formatação Profissional:**
```
Cabeçalho:    Negrito, fundo azul, texto branco, alinhado ao centro
Dados:        Fonte 11pt, alinhado conforme tipo (número: direita, texto: esquerda)
Total:        Negrito, borda superior dupla, fundo cinza claro
```

### 4. Congelamento de Painéis

**Propósito:** Manter cabeçalhos visíveis ao rolar

**Tipos:**
- **Congelar Linhas:** Mantém primeira(s) linha(s) visível(is)
- **Congelar Colunas:** Mantém primeira(s) coluna(s) visível(is)
- **Congelar Painéis:** Combina linhas e colunas

**Como Fazer:**
1. Selecionar célula abaixo/à direita do que quer congelar
2. Menu Exibição → Congelar Painéis
3. Rolar e verificar que cabeçalhos permanecem

---

## 🔑 Validação de Dados

**Conceito:** Controlar tipo e formato de dados que podem ser inseridos

**Tipos de Validação:**

| Tipo | Configuração | Exemplo |
|------|---|---|
| **Número Inteiro** | Min: 1, Max: 1000 | Quantidade de peças |
| **Número Decimal** | Min: 0.0, Max: 100.0 | Percentual entre 0 e 100 |
| **Data** | Entre 01/01/2026 e 31/12/2026 | Data de entrega válida |
| **Hora** | Entre 08:00 e 18:00 | Horário comercial |
| **Lista Suspensa** | Opções: Ativo, Inativo, Cancelado | Status de pedido |
| **Texto** | Tamanho: 5-50 caracteres | Descrição do produto |

**Criação de Lista Suspensa:**
1. Selecionar célula(s)
2. Dados → Validação de Dados
3. Permitir: Lista
4. Origem: Digite valores separados por vírgula OU referência a intervalo

**Benefícios:**
- ✅ Evita erros de digitação
- ✅ Padroniza entrada de dados
- ✅ Facilita análise (sem variações de "Ativo" vs "ativo")
- ✅ Acelera entrada de dados em listas predefinidas

---

## ✏️ Atividades Práticas — Aula 4

1. **Formatação de Relatório:**
   - Pegar planilha anterior (aula 3)
   - Formatar moedas como BRL
   - Percentuais com até 2 casas decimais
   - Cabeçalhos com fundo colorido

2. **Formatação Condicional:**
   - Destacar produtos com estoque baixo (<50)
   - Destacar preços acima de R$ 500
   - Aplicar barra de dados para visualizar volumes

3. **Congelamento de Painéis:**
   - Criar planilha com 100+ linhas de dados
   - Congelar primeira linha (cabeçalho)
   - Rolar e verificar que cabeçalho permanece visível

4. **Validação de Dados:**
   - Criar coluna de "Status" com lista (Ativo, Inativo)
   - Criar coluna de "Quantidade" com validação 0-10000
   - Testar: tentar inserir dados inválidos
   - Verificar que validação rejeita valores fora do padrão

---

---

# AULA 5: Excel Avançado — Funções Complexas e Busca

## 📋 Conteúdo Principal

### 1. Funções de Busca e Consulta

**PROCV (VLOOKUP) — Consulta Vertical:**

**Sintaxe:**
```excel
=PROCV(valor_procurado, intervalo_tabela, numero_coluna, [intervalo_exato])
```

**Parâmetros:**
- `valor_procurado:` O que você quer encontrar (ex: código do produto)
- `intervalo_tabela:` Tabela onde buscar (ex: A1:D100)
- `numero_coluna:` Qual coluna retornar (1=primeira, 2=segunda, etc)
- `intervalo_exato:` FALSE (exato), TRUE (aproximado)

**Exemplo Prático:**
```excel
=PROCV("P001", A1:D100, 3, FALSE)
// Procura "P001" na coluna A, retorna valor da 3ª coluna (preço)
```

**Aplicação:**
- Buscar preço de um produto pelo código
- Buscar nome do fornecedor pelo ID
- Consultar dados em tabela de referência

**Limitação:** Só busca em coluna à esquerda

---

**PROCH (HLOOKUP) — Consulta Horizontal:**

**Sintaxe:**
```excel
=PROCH(valor_procurado, intervalo_tabela, numero_linha, [intervalo_exato])
```

**Diferença:** Busca em linha (horizontal) em vez de coluna

**Exemplo:**
```excel
=PROCH("Janeiro", A1:G5, 2, FALSE)
// Procura "Janeiro" na primeira linha, retorna valor da 2ª linha
// Útil para tabelas com meses em colunas
```

---

**ÍNDICE + CORRESPONDÊNCIA — Alternativa Flexível:**

**Sintaxe:**
```excel
=ÍNDICE(intervalo_retorno, CORRESPONDÊNCIA(valor, intervalo_busca, 0))
```

**Vantagem:** Funciona em qualquer direção (não limitado a coluna/linha)

**Exemplo:**
```excel
=ÍNDICE(C1:C100, CORRESPONDÊNCIA("P001", A1:A100, 0))
// Procura "P001" em A1:A100, retorna valor correspondente em C
```

---

### 2. Tratamento de Erros

**IFERROR — Capturar e Tratar Erros:**

**Sintaxe:**
```excel
=IFERROR(formula, valor_se_erro)
```

**Exemplo:**
```excel
=IFERROR(PROCV("P001", A1:D100, 3, FALSE), "Produto não encontrado")
// Se PROCV não encontrar, retorna "Produto não encontrado"
```

**Erros Comuns no Excel:**
| Erro | Causa | Solução |
|------|-------|---------|
| #DIV/0! | Divisão por zero | Verificar divisor ≠ 0 |
| #N/A | Valor não encontrado | IFERROR ou revisar busca |
| #REF! | Referência inválida | Verificar intervalo deletado |
| #VALUE! | Tipo de dado incompatível | Garantir tipos corretos |

---

### 3. Funções Condicionais Avançadas

**CONTSE (COUNTIF) — Contar Condicionalmente:**

**Sintaxe:**
```excel
=CONTSE(intervalo, critério)
```

**Exemplos:**
```excel
=CONTSE(A1:A100, ">1000")        // Conta células > 1000
=CONTSE(B1:B50, "Ativo")         // Conta "Ativo"
=CONTSE(C1:C30, "<>")            // Conta células não vazias
=CONTSE(D1:D100, ">=50")         // Conta >= 50
```

**Aplicações:**
- Contar produtos com estoque crítico
- Contar pedidos com status "Pendente"
- Contar valores dentro de faixa

---

**SOMASE (SUMIF) — Somar Condicionalmente:**

**Sintaxe:**
```excel
=SOMASE(intervalo_critério, critério, [intervalo_soma])
```

**Exemplos:**
```excel
=SOMASE(A1:A100, "Ativo", C1:C100)
// Soma valores em C1:C100 onde A1:A100 = "Ativo"

=SOMASE(B1:B50, ">100", C1:C50)
// Soma C se B > 100
```

**Aplicações:**
- Total de vendas por categoria
- Total de custos para fornecedores específicos
- Faturamento acima de valor mínimo

---

### 4. IF Aninhado (Múltiplas Condições)

**Conceito:** Combinar múltiplos IFs para lógica complexa

**Sintaxe:**
```excel
=IF(condição1, valor1, IF(condição2, valor2, IF(condição3, valor3, valor_padrão)))
```

**Exemplo — Classificação ABC:**
```excel
=IF(A1>5000, "A", IF(A1>1000, "B", "C"))
// Se A1 > 5000: "A"
// Senão, se A1 > 1000: "B"
// Senão: "C"
```

**Aplicação Prática — Comissão por Faixa:**
```excel
=IF(B1<1000, B1*0.05, IF(B1<5000, B1*0.10, B1*0.15))
// 0-1000: 5%, 1000-5000: 10%, >5000: 15%
```

---

## ✏️ Atividades Práticas — Aula 5

1. **Criação de Base de Dados:**
   - Tabela de Produtos (ID, Nome, Preço)
   - Tabela de Pedidos (ID Pedido, ID Produto, Quantidade)

2. **Aplicação de PROCV:**
   - Em coluna de Preço em Pedidos, buscar preço de Produtos usando PROCV
   - Usar IFERROR para tratar produtos não encontrados

3. **Contagem Condicional:**
   - CONTSE: Contar quantos pedidos existem para cada produto
   - SOMASE: Calcular valor total de vendas por produto

4. **Lógica Complexa com IF:**
   - IF aninhado para classificação de volume (Baixo, Médio, Alto)
   - Aplicar desconto baseado em volume (IF aninhado)

---

---

# AULA 6: Excel Avançado — Tabelas Dinâmicas e Gráficos

## 📋 Conteúdo Principal

### 1. Tabelas Dinâmicas (Pivot Tables)

**Conceito:** Resumo automático de grandes volumes de dados

**Benefícios:**
- ✅ Agregar dados sem fórmulas complexas
- ✅ Criar múltiplas perspectivas rapidamente
- ✅ Analisar tendências e padrões
- ✅ Relatórios executivos em minutos

**Estrutura de Tabela Dinâmica:**

```
            Coluna 1    Coluna 2    Coluna 3
Linha 1     ✓           ✓           ✓
Linha 2     ✓           ✓           ✓
Linha 3     ✓           ✓           ✓
Valores     (agregação: SUM, COUNT, AVG, etc)
```

**Áreas da Tabela Dinâmica:**
1. **Linhas:** Rótulos de linhas (ex: Produto, Categoria)
2. **Colunas:** Rótulos de colunas (ex: Mês, Região)
3. **Valores:** Dados agregados (ex: Total de Vendas)
4. **Filtros:** Filtro de página (ex: Selecionar ano específico)

---

**Criação Passo a Passo:**

1. Selecionar dados (com cabeçalho)
2. Inserir → Tabela Dinâmica
3. Escolher campos para Linhas, Colunas, Valores
4. Configurar agregação (SUM, AVERAGE, COUNT, etc)
5. Aplicar

**Exemplo — Análise de Vendas por Mês e Produto:**

```
           Janeiro    Fevereiro    Março        Total
Produto A  R$ 10.000  R$ 12.000   R$ 15.000    R$ 37.000
Produto B  R$ 8.000   R$ 9.000    R$ 11.000    R$ 28.000
Produto C  R$ 5.000   R$ 6.000    R$ 7.000     R$ 18.000
Total      R$ 23.000  R$ 27.000   R$ 33.000    R$ 83.000
```

---

### 2. Filtros em Tabelas Dinâmicas

**Filtro de Página:**
- Selecionar campo para filtro (ex: Vendedor)
- Filtrar por valores específicos
- Útil para análise por região, período, responsável

**Filtros Automáticos:**
- Cada rótulo tem menu dropdown
- Deselecionar itens para ocultar

**Ordenação:**
- A → Z (alfabética)
- Maior → Menor (numérica)
- Customizada (ordem específica)

---

### 3. Agrupamento de Dados

**Agrupamento por Período (Datas):**
- Agrupar por Ano, Trimestre, Mês, Semana, Dia
- Útil para análise de séries temporais

**Agrupamento Customizado:**
- Agrupar produtos por categoria
- Agrupar cidades por região
- Grupos manuais

**Exemplo:**
```
2026
├─ Q1 (Janeiro-Março)
├─ Q2 (Abril-Junho)
├─ Q3 (Julho-Setembro)
└─ Q4 (Outubro-Dezembro)
```

---

### 4. Gráficos

**Tipos de Gráficos Comuns:**

| Tipo | Uso | Exemplo |
|------|-----|---------|
| **Colunas** | Comparar categorias | Vendas por produto |
| **Linhas** | Tendências ao longo do tempo | Faturamento mês a mês |
| **Setores (Pizza)** | Composição/proporção | % de market share |
| **Barras** | Comparação horizontal | Ranking de vendedores |
| **Scatter** | Correlação entre variáveis | Preço vs Quantidade |
| **Combinado** | Múltiplas séries | Receita (coluna) e Lucro (linha) |

---

**Criação de Gráfico:**

1. Selecionar dados
2. Inserir → Tipo de Gráfico
3. Configurar dados (séries, categorias)
4. Adicionar título, eixos, legenda
5. Formatar cores e estilos

**Exemplo — Gráfico de Colunas para Vendas:**

```
Vendas por Mês — 2026
(Eixo Y: R$)    (Eixo X: Mês)

R$               Jan  Fev  Mar  Abr  Mai  Jun
|
100k ┌─────┬─────┬─────┬─────┬─────┬─────┐
     │     │     │     │     │     │     │
80k  │     │     │     │     │     │     │
     │ ■   │ ■   │ ■   │ ■   │ ■   │ ■   │
60k  │     │     │     │     │     │     │
     └─────┴─────┴─────┴─────┴─────┴─────┘
```

---

### 5. Formatação de Gráficos

**Elementos Editáveis:**
- Título do gráfico
- Rótulos de eixos (X, Y)
- Legenda (posição e conteúdo)
- Cores das séries
- Tipo de linha (sólida, pontilhada)
- Tamanho e fonte

**Boas Práticas:**
- ✅ Título claro e descritivo
- ✅ Legendas explícitas
- ✅ Cores que contrastem
- ✅ Eixos com unidades (R$, %, unidades)
- ✅ Evitar excesso de elementos

---

### 6. Dashboards

**Conceito:** Painel com múltiplos gráficos e indicadores para visão executiva

**Elementos de Dashboard:**

1. **KPIs (Key Performance Indicators):**
   - Indicadores principais (Total Vendas, Margem Lucro, etc)
   - Formato: Número grande + contexto (ex: R$ 1.2M em Jan)

2. **Gráficos:**
   - Tendências (linhas)
   - Comparações (colunas)
   - Proporções (setores)

3. **Tabelas Resumidas:**
   - Tabelas dinâmicas filtradas
   - Top 10 produtos, clientes, etc

4. **Filtros:**
   - Segmentadores (período, região, etc)
   - Interatividade

---

**Layout Recomendado:**

```
┌──────────────────────────────────────────┐
│  DASHBOARD EXECUTIVO — VENDAS JAN-2026   │
├──────────────────────────────────────────┤
│                                          │
│  Total Vendas  │  Margem Lucro │ Clientes  │
│  R$ 1.2M       │    25%         │   145     │
│                                          │
├──────────────────────────────────────────┤
│                                          │
│  Vendas por Mês (Linha)                  │
│  [Gráfico grande no topo]                │
│                                          │
├──────┬───────────────────────────────────┤
│      │                                   │
│ Top 5│  Vendas por Produto (Coluna)     │
│ Prod │  [Gráfico à direita]              │
│      │                                   │
└──────┴───────────────────────────────────┘
```

---

## ✏️ Atividades Práticas — Aula 6

1. **Criação de Tabela Dinâmica:**
   - Usar dados de vendas (Produto, Mês, Valor)
   - Tabela com Produtos nas linhas, Meses nas colunas
   - Valores = SUM de vendas
   - Adicionar linha/coluna de Total

2. **Filtros e Agrupamento:**
   - Aplicar filtro por região
   - Agrupar datas por trimestre
   - Testar diferentes agregações (SUM, AVERAGE, COUNT)

3. **Criação de Gráficos:**
   - Gráfico de colunas (vendas por produto)
   - Gráfico de linhas (vendas ao longo do tempo)
   - Gráfico de setores (% de vendas por categoria)

4. **Dashboard Integrado:**
   - Combinar tabela dinâmica + gráficos
   - Adicionar KPIs (Total, Média, Máximo)
   - Aplicar formatação profissional
   - Testar filtros interativos

---

---

# 📊 Comparativo: Excel Básico vs Avançado

| Aspecto | Básico (Aulas 3-4) | Avançado (Aulas 5-6) |
|---------|-------------------|----------------------|
| **Fórmulas** | SUM, AVERAGE, COUNT, IF | PROCV, ÍNDICE, SOMASE, CONTSE |
| **Dados** | Entrada manual | Consulta automática em tabelas |
| **Análise** | Cálculos simples | Múltiplas perspectivas |
| **Visualização** | Formatação de células | Gráficos e dashboards |
| **Escalabilidade** | Centenas de linhas | Milhares de linhas |
| **Tempo de Análise** | Horas (manual) | Minutos (automatizado) |

---

# 🎓 Capacidades Desenvolvidas

Ao final dessas 4 aulas, o aluno será capaz de:

✅ **Domínio Técnico:**
- Criar planilhas estruturadas e profissionais
- Automatizar cálculos com fórmulas e funções
- Consultar dados em bases de referência
- Resumir grandes volumes de dados

✅ **Análise de Dados:**
- Identificar tendências em séries temporais
- Comparar categorias e segmentos
- Detectar anomalias com formatação condicional
- Interpretar resultados de análises

✅ **Comunicação:**
- Apresentar dados de forma clara e visual
- Criar dashboards para tomadores de decisão
- Destacar informações críticas
- Contar histórias com dados

✅ **Aplicação Prática:**
- Resolver problemas reais de gestão
- Tomar decisões baseadas em dados
- Melhorar processos através de análise
- Comunicar resultados para a liderança

---

# 📚 Referências e Recursos

## Referências Bibliográficas

1. SENAI. **Raciocínio Lógico e Análise de Dados**. Brasília: SENAI/DN, 2020.
2. SENAI. **Planilha Eletrônica**. Brasília: SENAI/DN, 2012.
3. JELEN, Bill; ALEXANDER, Michael. **Excel 2016 - Fórmulas**. São Paulo: Bookman, 2016.
4. FERNANDES, Edésio. **Análise de Dados com Excel**. São Paulo: Érica, 2014.

## Recursos Online

- [Microsoft Excel Help](https://support.microsoft.com/en-us/excel)
- [LibreOffice Calc Documentation](https://help.libreoffice.org/Calc)
- YouTube: "Excel Tutorial" (canais oficiais Microsoft)

---

# ✅ Checklist de Aprendizagem

Marque conforme dominar cada tópico:

**AULA 3 - Excel Básico:**
- [ ] Interface do Excel (células, linhas, colunas)
- [ ] Entrada de dados e tipos
- [ ] Fórmulas básicas (+, -, *, /)
- [ ] Funções SUM, AVERAGE, COUNT
- [ ] Função IF simples
- [ ] Referências relativas e absolutas
- [ ] Cópia de fórmulas

**AULA 4 - Formatação:**
- [ ] Formatação de números, moedas, datas
- [ ] Formatação condicional
- [ ] Bordas, cores, fontes
- [ ] Congelamento de painéis
- [ ] Validação de dados
- [ ] Listas suspensas

**AULA 5 - Funções Avançadas:**
- [ ] PROCV e PROCH
- [ ] ÍNDICE + CORRESPONDÊNCIA
- [ ] IFERROR para tratamento de erros
- [ ] CONTSE (COUNTIF)
- [ ] SOMASE (SUMIF)
- [ ] IF aninhado (múltiplas condições)

**AULA 6 - Tabelas e Gráficos:**
- [ ] Criação de tabelas dinâmicas
- [ ] Filtros em tabelas dinâmicas
- [ ] Agrupamento por período
- [ ] Tipos de gráficos (colunas, linhas, pizza)
- [ ] Formatação de gráficos
- [ ] Criação de dashboards
- [ ] Interatividade e filtros em dashboards

---

**Documento gerado:** 2026-09-14  
**Versão:** 1.0  
**Status:** ✅ Completo
