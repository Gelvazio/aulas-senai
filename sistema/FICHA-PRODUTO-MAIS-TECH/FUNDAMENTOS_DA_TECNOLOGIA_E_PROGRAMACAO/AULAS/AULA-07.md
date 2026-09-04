# AULA 07 — Produtividade Digital: Planilhas Eletrônicas (Excel/Google Sheets)

**Programa:** Rio do Sul Mais Tech  
**UC:** Fundamentos da Tecnologia e Programação  
**Duração:** 2 horas presenciais  
**Data:** ___/___/______  

---

## Objetivos de Aprendizagem

- Dominar estrutura de planilhas
- Usar fórmulas simples
- Organizar e analisar dados
- Criar gráficos básicos

---

## Conteúdo Programático

### 1. O que é Planilha Eletrônica? (15 min)

**Definição:** Grade de células para organizar dados numéricos e de texto.

**Estrutura:**
- **Célula:** Cada caixinha (ex: A1, B2, C3)
- **Linha:** Fileira horizontal (1, 2, 3, 4...)
- **Coluna:** Fileira vertical (A, B, C, D...)
- **Planilha:** Conjunto de linhas e colunas
- **Pasta:** Arquivo com múltiplas planilhas

---

### 2. Operações Básicas (25 min)

| Operação | Descrição |
|---|---|
| **Selecionar célula** | Clicar em uma célula |
| **Digitar dados** | Escrever número, texto ou fórmula |
| **Formatar** | Negrito, cores, alinhamento |
| **Mesclar células** | Unir células |
| **Copiar/Colar** | Duplicar dados (Ctrl+C / Ctrl+V) |
| **Autopreenchimento** | Preencher sequência automaticamente |

**Tipos de dados:**
- Texto: "João", "Rio do Sul"
- Número: 10, 3.14, 1000
- Fórmula: =A1+A2, =SUM(A1:A10)
- Data: 01/01/2026
- Booleano: VERDADEIRO, FALSO

---

### 3. Fórmulas Simples (30 min)

**Operações Aritméticas:**
- `=A1+A2` (soma)
- `=A1-A2` (subtração)
- `=A1*A2` (multiplicação)
- `=A1/A2` (divisão)

**Funções Principais:**
- `=SUM(A1:A10)` (soma de intervalo)
- `=AVERAGE(A1:A10)` (média)
- `=MAX(A1:A10)` (valor máximo)
- `=MIN(A1:A10)` (valor mínimo)
- `=COUNT(A1:A10)` (conta células com números)
- `=IF(A1>10, "SIM", "NÃO")` (se/então)

**Exemplo prático — Calcular nota final:**
```
A1: Nota Prova = 7.5
A2: Nota Trabalho = 8.0
A3: Nota Seminário = 9.0
A4: Média = =AVERAGE(A1:A3)
```

---

### 4. Gráficos (20 min)

**Tipos de gráfico:**
- **Coluna:** Comparar valores
- **Linha:** Mostrar tendências
- **Pizza:** Mostrar proporções
- **Barra:** Dados horizontais

**Como criar:**
1. Selecionar dados
2. Inserir > Gráfico
3. Escolher tipo
4. Personalizar título e eixos

---

## Atividades Práticas

### Atividade 1: Planilha de Notas (40 min)

Criar planilha para controlar notas de alunos:

| Aluno | Prova | Trabalho | Seminário | Média |
|---|---|---|---|---|
| João | 7.5 | 8.0 | 9.0 | =AVERAGE() |
| Maria | 8.0 | 7.5 | 8.5 | =AVERAGE() |
| Pedro | 6.5 | 7.0 | 7.5 | =AVERAGE() |

**Requisitos:**
- Mínimo 5 alunos
- Fórmula =AVERAGE() em cada linha
- Colorir fundo de cada coluna
- Criar gráfico de barras com as médias

### Atividade 2: Análise de Gastos (40 min)

Criar planilha de orçamento pessoal:

| Categoria | Janeiro | Fevereiro | Março |
|---|---|---|---|
| Alimentação | 300 | 320 | 310 |
| Transporte | 150 | 150 | 160 |
| Lazer | 100 | 120 | 90 |
| **TOTAL** | =SUM() | =SUM() | =SUM() |

**Requisitos:**
- 5-6 categorias
- 3-4 meses
- Fórmulas SUM()
- Gráfico comparativo

---

## Recursos Necessários

- Laboratório de computadores
- Google Sheets ou Excel
- Projetor
- Dados de amostra (notas, orçamentos)

---

## Avaliação Formativa

- Correto uso de fórmulas
- Organização dos dados
- Gráficos bem formatados
- Análise dos resultados

---

## Tarefa de Casa

**Projeto:** Criar planilha de controle pessoal (escolha):
- Gastos mensais
- Notas escolares
- Inventário de livros
- Agenda de estudos

**Requisitos:** Mínimo 3 fórmulas, 1 gráfico, bem formatado

---

**Próxima aula:** AULA-08 — Internet: Navegadores e Boas Práticas
