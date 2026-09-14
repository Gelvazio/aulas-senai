# 🔍 ATIVIDADE 03: Funções de Busca Avançadas

**Disciplina:** Análise de Dados Aplicada à Gestão  
**Aula:** 3 - Excel Avançado e Visualização de Dados  
**Slides Relacionados:** 8-18  
**Duração:** 120 minutos  
**Nível Cognitivo:** Aplicar, Analisar, Criar

---

## 🎯 Objetivo

Dominar as funções de busca (PROCV, PROCH, ÍNDICE/CORRESPONDÊNCIA) para integrar dados de múltiplas tabelas.

---

## 📋 Caso Prático

**Cenário:** Você trabalha no RH de uma empresa e precisa criar um relatório que cruze:
- Números de **vendedores** com seus nomes
- Seu **salário base**
- Seu **faturamento mensal**
- Sua **comissão** (calculada automaticamente)

---

## 📝 Parte 1: Preparar as Bases de Dados (20 minutos)

### Tarefa 1.1 - Criar Tabela de Vendedores

**Na Aba "Vendedores" (criar nova aba), crie:**

```
ID   | Nome           | Salário Base | Departamento
101  | João Silva     | 2.500        | Vendas
102  | Maria Santos   | 2.800        | Vendas
103  | Pedro Oliveira | 3.000        | Gestão
104  | Ana Costa      | 2.600        | Vendas
105  | Carlos Neves   | 3.200        | Gestão
```

### Tarefa 1.2 - Criar Tabela de Faturamento

**Na Aba "Faturamento", crie:**

```
ID   | Mês      | Faturamento
101  | Janeiro  | 15.000
102  | Janeiro  | 18.500
103  | Janeiro  | 12.000
104  | Janeiro  | 16.200
105  | Janeiro  | 20.500
```

### Tarefa 1.3 - Criar Tabela de Comissões

**Na Aba "Comissões", crie:**

```
Faturamento Mínimo | Taxa de Comissão
0                  | 3%
15.000             | 5%
18.000             | 8%
```

---

## 📝 Parte 2: Usar PROCV para Buscas Simples (30 minutos)

### Tarefa 2.1 - Buscar Nome do Vendedor

**Na Aba "Relatorio", crie:**

| ID | Nome | Salário | Faturamento | Comissão |
|----|------|---------|-------------|----------|
| 101 | ? | ? | 15.000 | ? |
| 102 | ? | ? | 18.500 | ? |
| 103 | ? | ? | 12.000 | ? |

1. **Na célula B2, use PROCV para buscar o nome:**
   ```
   =PROCV(A2;Vendedores!A:D;2;FALSO)
   ```
   - **A2** = ID que procuro
   - **Vendedores!A:D** = matriz de dados
   - **2** = coluna que quero (Nome é a 2ª)
   - **FALSO** = busca exata

2. **Copie a fórmula para as demais linhas**

### Tarefa 2.2 - Buscar Salário

**Na célula C2, crie:**
```
=PROCV(A2;Vendedores!A:D;3;FALSO)
```

**Copie para as demais linhas**

### Tarefa 2.3 - Tratamento de Erros com SEERRO

Se houver um ID que não existe, PROCV retorna erro #N/D.

**Corrija a fórmula de B2:**
```
=SEERRO(PROCV(A2;Vendedores!A:D;2;FALSO);"Vendedor Não Encontrado")
```

---

## 📝 Parte 3: Usar ÍNDICE e CORRESPONDÊNCIA (30 minutos)

### Tarefa 3.1 - Buscar em Qualquer Direção

Às vezes precisamos buscar para a **esquerda** do ID. PROCV não faz isso, mas ÍNDICE/CORRESPONDÊNCIA sim.

**Crie uma nova coluna "Departamento":**

```
=ÍNDICE(Vendedores!D:D;CORRESPONDÊNCIA(A2;Vendedores!A:A;0))
```

**Como funciona:**
- **CORRESPONDÊNCIA** encontra em qual linha está o ID (retorna: 2, 3, 4...)
- **ÍNDICE** busca o valor naquela linha e coluna D

### Tarefa 3.2 - Busca com Múltiplos Critérios

Agora calcule a **Comissão** com base no **Faturamento**:

```
=ÍNDICE(Comissões!B:B;CORRESPONDÊNCIA(D2;Comissões!A:A;1))
```

**Nota:** O `1` no CORRESPONDÊNCIA significa "buscar o maior valor ≤ ao meu valor"

---

## 📝 Parte 4: Calcular Comissão com SE Aninhado (25 minutos)

### Tarefa 4.1 - Lógica de Faixas

Altern ativamente, use **SE aninhado** para calcular comissão:

```
=SE(D2<15000;D2*0,03;SE(D2<18000;D2*0,05;D2*0,08))
```

**Estrutura:**
- Se faturamento < 15.000 → 3%
- Se faturamento < 18.000 → 5%
- Senão → 8%

### Tarefa 4.2 - Calcular Valor da Comissão

**Crie nova coluna "Valor Comissão":**

```
=D2 * (taxa_encontrada) / 100
```

ou use diretamente:
```
=D2 * SE(D2<15000;0,03;SE(D2<18000;0,05;0,08))
```

---

## 📝 Parte 5: Análise Integrada (15 minutos)

### Tarefa 5.1 - Resumo Gerencial

Crie uma tabela resumida:

| Métrica | Fórmula | Resultado |
|---------|---------|-----------|
| Total Faturado | =SOMA(D2:D4) | ? |
| Maior Faturamento | =MÁXIMO(D2:D4) | ? |
| Total Comissão | =SOMA(E2:E4) | ? |
| Média de Comissão | =MÉDIA(E2:E4) | ? |

### Tarefa 5.2 - Validação

Responda:

- ✅ Qual vendedor faturou mais?
- ✅ Quanto pagou em comissão total?
- ✅ Qual era o salário do vendedor com maior faturamento?
- ✅ Se tivéssemos um ID 110 que não existe, o que mostraria?

---

## ✅ Critérios de Avaliação

| Critério | Pontos | Resultado |
|----------|--------|-----------|
| Tabelas criadas corretamente | 15 | ___ / 15 |
| PROCV funcionando | 20 | ___ / 20 |
| PROCV com SEERRO | 15 | ___ / 15 |
| ÍNDICE/CORRESPONDÊNCIA | 20 | ___ / 20 |
| SE aninhado para comissões | 20 | ___ / 20 |
| Análise integrada correta | 10 | ___ / 10 |
| **TOTAL** | **100** | ___ / 100 |

---

## 🔍 Checklist

- [ ] Aba "Vendedores" criada com 5 vendedores
- [ ] Aba "Faturamento" criada com dados
- [ ] Aba "Comissões" criada com tabela de faixas
- [ ] Aba "Relatorio" criada
- [ ] PROCV buscando nomes corretamente
- [ ] PROCV buscando salários corretamente
- [ ] SEERRO tratando erros #N/D
- [ ] ÍNDICE/CORRESPONDÊNCIA buscando departamentos
- [ ] SE aninhado calculando comissões
- [ ] Resumo gerencial preenchido
- [ ] Arquivo salvo como "Analise_Vendedores.xlsx"

---

**Data de Entrega:** _______________  
**Assinatura do Aluno:** _______________

