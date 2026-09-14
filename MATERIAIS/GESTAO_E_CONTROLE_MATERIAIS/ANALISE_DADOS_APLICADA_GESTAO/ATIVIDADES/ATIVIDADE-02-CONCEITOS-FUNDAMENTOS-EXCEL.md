# 🖥️ ATIVIDADE 02: Conceitos e Fundamentos do Excel

**Disciplina:** Análise de Dados Aplicada à Gestão  
**Aula:** 2 - Excel Básico e Intermediário para Gestão  
**Slides Relacionados:** 4-14  
**Duração:** 90 minutos  
**Nível Cognitivo:** Entender, Aplicar, Criar

---

## 🎯 Objetivo

Dominar a interface do Excel, manipular dados básicos, compreender tipos de dados e construir primeiras fórmulas matemáticas.

---

## 📋 Caso Prático

**Cenário:** Você foi contratado para organizar um controle de vendas mensal de uma pequena loja de eletrônicos.

### Dados para Organizar

```
Produto: Notebook | Quantidade: 5 | Preço Unitário: 3500
Produto: Mouse | Quantidade: 20 | Preço Unitário: 85
Produto: Teclado | Quantidade: 15 | Preço Unitário: 150
Produto: Monitor | Quantidade: 8 | Preço Unitário: 800
Produto: Webcam | Quantidade: 12 | Preço Unitário: 250
```

---

## 📝 Parte 1: Estruturação no Excel (30 minutos)

### Tarefa 1.1 - Criar Estrutura da Planilha

1. **Abra um novo arquivo Excel**

2. **Crie cabeçalhos nas linhas 1:**
   - A1: "Produto"
   - B1: "Quantidade"
   - C1: "Preço Unitário"
   - D1: "Total da Venda"
   - E1: "% do Total"

3. **Formate os cabeçalhos:**
   - Letras **MAIÚSCULAS**
   - Fundo **cinza**
   - Texto **branco**
   - Bordas **pretas**

### Tarefa 1.2 - Inserir Dados

1. **Preencha os dados dos 5 produtos nas linhas 2-6**
2. **Identifique o tipo de dado:**
   - Qual célula tem **texto**?
   - Qual tem **número**?
   - Qual será calculada com **fórmula**?

### Tarefa 1.3 - Reconhecer Estrutura

Responda:

- ✅ Qual é o endereço da célula do Notebook (produto)?
- ✅ Em qual coluna estão os preços unitários?
- ✅ Quantas linhas de dados você inseriu?
- ✅ Qual célula conterá o total de vendas do Mouse?

---

## 📝 Parte 2: Construir Fórmulas Básicas (40 minutos)

### Tarefa 2.1 - Fórmula de Multiplicação

**Objetivo:** Calcular o total de venda (Quantidade × Preço)

1. **Clique na célula D2** (Total da Venda do Notebook)

2. **Digite a fórmula:**
   ```
   =B2*C2
   ```

3. **Pressione ENTER**

4. **Copie a fórmula para D3:D6:**
   - Clique em D2
   - Copie (Ctrl+C)
   - Selecione D3:D6
   - Cole (Ctrl+V)

**Resultado esperado:**
```
Notebook: 5 × 3500 = 17.500
Mouse: 20 × 85 = 1.700
Teclado: 15 × 150 = 2.250
Monitor: 8 × 800 = 6.400
Webcam: 12 × 250 = 3.000
```

### Tarefa 2.2 - Fórmula de Soma

1. **Clique na célula D7** (Total geral)

2. **Digite:**
   ```
   =SOMA(D2:D6)
   ```

3. **Pressione ENTER**

**Resultado esperado: 30.850**

### Tarefa 2.3 - Fórmula de Porcentagem

**Objetivo:** Calcular % que cada produto representa do total

1. **Clique em E2** (% do Notebook)

2. **Digite:**
   ```
   =D2/$D$7*100
   ```

   ⚠️ **IMPORTANTE:** O `$` trava a célula D7 para que não mude ao copiar

3. **Copie para E3:E6**

**Resultado esperado:**
```
Notebook: 56,72%
Mouse: 5,50%
Teclado: 7,29%
Monitor: 20,74%
Webcam: 9,72%
```

### Tarefa 2.4 - Funções Essenciais

Crie uma segunda tabela com:

| Métrica | Fórmula | Resultado |
|---------|---------|-----------|
| **Total de Vendas** | =SOMA(D2:D6) | 30.850 |
| **Maior Venda** | =MÁXIMO(D2:D6) | 17.500 |
| **Menor Venda** | =MÍNIMO(D2:D6) | 1.700 |
| **Média de Vendas** | =MÉDIA(D2:D6) | 6.170 |
| **Total de Produtos** | =SOMA(B2:B6) | 60 |

---

## 📝 Parte 3: Formatação e Apresentação (20 minutos)

### Tarefa 3.1 - Formatação Numérica

1. **Selecione as células D2:D7** (totais de venda)
2. **Formate como Moeda (R$):**
   - Clique direito → Formatar Células
   - Guia "Números"
   - Categoria "Moeda"
   - Símbolo "R$"
   - Decimais: 2

### Tarefa 3.2 - Formatação de Porcentagem

1. **Selecione E2:E6**
2. **Formate como Porcentagem:**
   - Clique direito → Formatar Células
   - Categoria "Porcentagem"
   - Decimais: 2

### Tarefa 3.3 - Aplicar Bordas

1. **Selecione toda a tabela A1:E7**
2. **Guia "Home" → Bordas → Todas as Bordas**

---

## ✅ Critérios de Avaliação

| Critério | Pontos | Resultado |
|----------|--------|-----------|
| Estrutura criada corretamente | 20 | ___ / 20 |
| Fórmulas matemáticas corretas | 30 | ___ / 30 |
| Funções SOMA, MÁXIMO, MÍNIMO, MÉDIA | 20 | ___ / 20 |
| Formatação profissional | 15 | ___ / 15 |
| Uso correto de referências ($) | 15 | ___ / 15 |
| **TOTAL** | **100** | ___ / 100 |

---

## 📋 Checklist Final

- [ ] Cabeçalhos criados e formatados
- [ ] Dados dos 5 produtos inseridos
- [ ] Fórmula de multiplicação em D2:D6
- [ ] Fórmula SOMA em D7
- [ ] Fórmula de porcentagem em E2:E6 com $D$7
- [ ] Tabela de métricas criada com 5 funções
- [ ] Formatação de moeda aplicada
- [ ] Formatação de porcentagem aplicada
- [ ] Bordas aplicadas
- [ ] Arquivo salvo como "Vendas_Loja.xlsx"

---

## 💡 Dicas Importantes

✅ **Referência Relativa:** B2*C2 (muda ao copiar)  
✅ **Referência Absoluta:** $D$7 (NÃO muda ao copiar)  
✅ **Sempre comece fórmula com:** =  
✅ **Ordem de operações:** Parênteses → Potência → Multiplicação/Divisão → Adição/Subtração  

---

**Data de Entrega:** _______________  
**Assinatura do Aluno:** _______________

