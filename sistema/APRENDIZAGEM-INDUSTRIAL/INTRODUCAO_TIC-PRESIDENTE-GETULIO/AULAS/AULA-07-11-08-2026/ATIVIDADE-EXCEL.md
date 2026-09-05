# ATIVIDADE PRÁTICA — Planilha Eletrônica
## UC: Introdução à Tecnologia da Informação e Comunicação
**Aula:** 07 | **Data:** 11/08/2026 | **Duração estimada:** 1 hora  
**Trabalho em dupla**

---

## Contexto

A **Pamplona Alimentos** é uma indústria alimentícia localizada em **Presidente Getúlio/SC** que abate suínos (porcos) fornecidos por produtores rurais chamados **colonos**.

Cada produtor agenda a entrega de um **lote** de porcos. Quando os animais chegam à fábrica, são pesados e registrados. Depois do abate, a fábrica registra o peso das carcaças.

---

## Divisão da Dupla

| Aluno A | Aluno B |
|---------|---------|
| Preenche o documento Word com os dados e respostas | Cria a planilha no Google Sheets ou Excel |

---

## PARTE 1 — Aluno A (Word)

### O que fazer

Abra este documento e preencha:
1. O nome completo dos dois alunos da dupla
2. A data de realização da atividade
3. As **respostas** das perguntas no final do documento

---

## PARTE 2 — Aluno B (Planilha)

### O que criar

Crie uma planilha com o nome: **Controle de Abate — Pamplona**

### Colunas da planilha

| Coluna | Nome | Tipo |
|--------|------|------|
| A | Nº do Lote | Número |
| B | Nome do Colono | Texto |
| C | Município | Texto |
| D | Qtd. de Porcos | Número |
| E | Peso Total (kg) | Número |
| F | Peso Médio (kg) | **Fórmula** |
| G | Status | Texto |

### Fórmula da coluna F — Peso Médio

O peso médio é calculado automaticamente: **Peso Total ÷ Quantidade de Porcos**

Na célula **F2**, digitar: `=E2/D2`  
Na célula **F3**, digitar: `=E3/D3`  
*(e assim por diante até F6)*

### Dados para digitar

| Nº | Colono | Município | Qtd | Peso Total (kg) | Status |
|----|--------|-----------|-----|-----------------|--------|
| 1 | João Silva | Presidente Getúlio | 25 | 2.500 | ABATIDO |
| 2 | Maria Souza | Taió | 18 | 1.800 | EM DESCANSO |
| 3 | Pedro Santos | Ibirama | 30 | 3.100 | RECEBIDO |
| 4 | Ana Lima | Rio do Sul | 22 | 2.200 | ABATIDO |
| 5 | Carlos Ramos | Lontras | 15 | 1.550 | AGENDADO |

### Linha de TOTAL (linha 7)

Na célula **D7**, digitar a fórmula: `=SOMA(D2:D6)`  
Na célula **E7**, digitar a fórmula: `=SOMA(E2:E6)`  
Na célula **F7**, digitar a fórmula: `=E7/D7`

### Formatação obrigatória

- Linha 1 (cabeçalho): **negrito** + fundo azul + letra branca
- Linha 7 (TOTAL): **negrito**
- Coluna F (Peso Médio): formatar com 1 casa decimal (ex: 100,0)

---

## Perguntas — Aluno A responde no Word

1. Quantos porcos no total foram registrados na planilha?
2. Qual é o peso total (em kg) de todos os lotes?
3. Qual foi o colono que trouxe **mais** porcos?
4. Quantos lotes já foram **ABATIDOS**?
5. O que significa o status **EM DESCANSO**?

---

## Critérios de Avaliação

| Item | Valor |
|------|-------|
| Planilha criada com as 7 colunas | 2,0 |
| Dados digitados corretamente | 2,0 |
| Fórmulas de Peso Médio funcionando | 2,0 |
| Linha de TOTAL com fórmulas SOMA | 2,0 |
| Perguntas respondidas no Word | 2,0 |
| **TOTAL** | **10,0** |
