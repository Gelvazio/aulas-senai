# ATIVIDADE AULA 01 — Fundamentos de Testes de Software

**Objetivo:** Compreender tipos de testes e construir a pirâmide de testes

**Duração:** 4 horas  
**Competências Praticadas:** Análise crítica, classificação de testes, reconhecimento de benefícios  
**Modalidade:** Presencial em laboratório

---

## 1. Tarefa Principal — Análise de Projeto Real

### 1.1 Contexto
Você recebeu o código-fonte de um projeto web real (uma calculadora com histórico). Sua tarefa é **analisar este código e propor uma estratégia de testes completa**, utilizando a pirâmide de testes como guia.

### 1.2 Instruções Passo-a-Passo

**Passo 1: Exploração do Código (30 minutos)**
- Abra o arquivo `calculator.js` fornecido pelo professor
- Identifique as seguintes funções:
  - `add(a, b)` — soma simples
  - `calculate(expression)` — avalia expressão
  - `saveToHistory(result)` — salva em localStorage
  - `getHistory()` — recupera histórico
- Faça um diagrama simples mostrando como essas funções se relacionam

**Passo 2: Classificação de Testes (45 minutos)**
- Crie uma tabela com 3 colunas:
  | Função | Tipo de Teste | Caso de Teste Sugerido |
  |---|---|---|
  | `add()` | Unit | add(2,3) = 5 |
  | ... | ... | ... |
  
- Para cada função, identifique:
  - 1 teste unitário
  - 1 teste de integração (se aplicável)
  - 1 teste E2E (se aplicável)

**Passo 3: Construção da Pirâmide (45 minutos)**
- Desenhe no papel uma pirâmide de testes para este projeto
- Escreva em cada nível:
  - **Base (Testes Unitários):** Quantidade de testes
  - **Meio (Integração):** Quantidade de testes
  - **Topo (E2E):** Quantidade de testes
- Justifique por que essa proporção faz sentido

**Passo 4: Estudo de Caso — Benefícios Mensuráveis (1h 30min)**
- Leia o documento "benefits-of-testing.pdf" fornecido
- Responda:
  1. Quantos bugs foram evitados em produção com testes automatizados?
  2. Qual foi a redução de tempo de release?
  3. Como testes contínuos aumentaram confiança da equipe?
- Prepare um parágrafo (5-7 linhas) resumindo um benefício principal

---

## 2. Tarefa Complementar — Quiz Interativo

**Tempo:** 10 minutos

Responda às questões no Kahoot ou formulário digital:

1. A pirâmide de testes sugere ter mais testes de qual tipo?
   - A) E2E
   - B) Integração
   - C) Unitários ✓
   
2. Qual é a vantagem de testes automatizados vs. manuais?
   - A) Mais rápidos, repetíveis, confiáveis ✓
   - B) Mais baratos
   - C) Não requerem manutenção

3. TDD significa?
   - A) Test Driven Design
   - B) Test Driven Development ✓
   - C) Testing During Development

---

## 3. Critério de Avaliação

### Entrega
- [ ] Tabela de classificação de testes completa
- [ ] Pirâmide de testes desenhada e justificada
- [ ] Resumo escrito sobre benefícios (parágrafo)
- [ ] Quiz respondido (≥ 70% de acerto)

### Rubrica
| Critério | Excelente (10) | Bom (8) | Satisfatório (6) | Insatisfatório |
|---|---|---|---|---|
| **Classificação de Testes** | Todas as funções classificadas corretamente | 90% correto | 70% correto | < 70% |
| **Pirâmide de Testes** | Proporções justificadas e bem-fundamentadas | Proporções adequadas | Proporções aceitáveis | Não faz sentido |
| **Compreensão Conceitual** | Explicações claras e profundas | Explicações boas | Explicações básicas | Faltam conceitos |
| **Quiz** | ≥ 90% acerto | 80-89% acerto | 70-79% acerto | < 70% acerto |

---

## 4. Recursos Fornecidos

- Arquivo `calculator.js` (código fornecido)
- Documento PDF: "benefits-of-testing.pdf"
- Link Kahoot: [quiz-fundamentos-testes]
- Exemplos de pirâmides: [figma link com template]

---

## 5. Dúvidas Frequentes

**P: Posso usar IA ou ChatGPT para ajudar?**  
R: Você pode usar como reference, mas a análise e justificativas devem ser suas próprias.

**P: E se a função não for testável?**  
R: Isso é uma observação válida! Documente por quê e sugira uma refatoração.

**P: Preciso escrever código de teste?**  
R: Não, esta é uma aula teórica. Você vai começar a escrever código na Aula 03.

---

## 6. Próximos Passos

- Semana que vem, na Aula 02, você vai **configurar o ambiente** para começar a escrever testes reais com Vitest
- Traga suas dúvidas sobre a pirâmide para a próxima aula

---

**Entrega:** Até 23h59 do dia seguinte à aula  
**Formato:** PDF ou documento Word com imagens (fotografias da pirâmide desenhada aceitáveis)  
**Onde:** Plataforma do curso ou email do professor
