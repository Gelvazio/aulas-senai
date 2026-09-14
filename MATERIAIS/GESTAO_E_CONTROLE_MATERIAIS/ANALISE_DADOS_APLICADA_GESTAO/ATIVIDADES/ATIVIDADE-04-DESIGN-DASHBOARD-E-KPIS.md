# 📊 ATIVIDADE 04: Design de Dashboard e KPIs

**Disciplina:** Análise de Dados Aplicada à Gestão  
**Aula:** 4 - Dashboards Executivos e Projeto Final Integrado  
**Slides Relacionados:** 8-18  
**Duração:** 150 minutos  
**Nível Cognitivo:** Entender, Aplicar, Analisar, Criar

---

## 🎯 Objetivo

Criar um dashboard executivo profissional com KPIs estruturados, gráficos dinâmicos e design visual alinhado à metodologia SENAI.

---

## 📋 Caso Prático

**Cenário:** A diretora executiva da empresa precisa de um painel para acompanhar o desempenho mensal em **tempo real**.

**Dados Disponíveis:**
- Faturamento (Atual vs. Meta)
- Margem de Lucro
- Quantidade de Pedidos
- Satisfação do Cliente

---

## 📝 Parte 1: Definir KPIs Estruturados (30 minutos)

### Tarefa 1.1 - Identificar KPIs Críticos

Complete a tabela abaixo para 4 KPIs essenciais:

| KPI | Valor Realizado | Meta | Variação % | Status | Ícone |
|-----|-----------------|------|------------|--------|-------|
| **Faturamento** | R$ 125.500 | R$ 120.000 | +4,6% | ✅ Atingido | 📈 |
| **Margem Bruta** | 32,5% | 30% | +2,5% | ✅ Atingido | 📈 |
| **Pedidos Processados** | 185 | 150 | +23,3% | ✅ Atingido | 📈 |
| **Satisfação Cliente** | 8,7/10 | 8,5 | +2,4% | ✅ Atingido | 📈 |

### Tarefa 1.2 - Calcular Variações

**Fórmula da Variação Percentual:**
```
Variação % = ((Realizado - Meta) / Meta) × 100
```

Calcule para cada KPI:
- Se > 0: resultado POSITIVO (verde, ✅)
- Se < 0: resultado NEGATIVO (vermelho, ❌)
- Se = 0: resultado NEUTRO (cinza, ⚠️)

### Tarefa 1.3 - Determinar Status Visual

Crie uma regra:
```
=SE(Variação>10;"🟢 Excelente";SE(Variação>0;"🟡 Bom";SE(Variação>=(-10);"🟠 Atenção";"🔴 Crítico")))
```

---

## 📝 Parte 2: Estruturar Dados para o Dashboard (20 minutos)

### Tarefa 2.1 - Organizar Abas

Crie **3 abas** na sua pasta:

1. **Base_Dados** - Dados brutos (oculta da apresentação)
2. **Calculos_Dinamicas** - Tabelas dinâmicas (oculta)
3. **Dashboard** - Painel executivo (VISÍVEL)

### Tarefa 2.2 - Preparar Dados Brutos

**Na aba "Base_Dados", crie tabela com 30 linhas:**

```
Data       | Produto    | Faturamento | Margem % | Satisfação | Região
01/01/2026 | Notebook   | 3.500       | 28       | 8.5        | Sul
01/01/2026 | Mouse      | 500         | 35       | 9.2        | Norte
01/01/2026 | Teclado    | 850         | 32       | 8.8        | Sul
...
31/01/2026 | Monitor    | 2.100       | 30       | 8.6        | Nordeste
```

### Tarefa 2.3 - Converter em Tabela Oficial

Selecione A1:F30 e converta em tabela:
- **Aba "Home" → Formatar como Tabela**
- Dê nome: "tbl_Vendas"

---

## 📝 Parte 3: Criar Tabelas Dinâmicas (40 minutos)

### Tarefa 3.1 - Tabela Dinâmica para Total de Faturamento

**Na aba "Calculos_Dinamicas":**

1. Selecione a tabela tbl_Vendas
2. **Inserir → Tabela Dinâmica**
3. Configurar:
   - **Linhas:** Nenhuma (resumo total)
   - **Valores:** SUM(Faturamento)

**Resultado esperado:** Célula única com ~125.500

### Tarefa 3.2 - Tabela Dinâmica por Região

1. Crie nova tabela dinâmica
2. Configurar:
   - **Linhas:** Região
   - **Valores:** SUM(Faturamento)

**Resultado esperado:**
```
Região    | Faturamento
Norte     | 32.500
Nordeste  | 28.000
Sul       | 35.000
Centro    | 30.000
```

### Tarefa 3.3 - Tabela Dinâmica por Produto

1. Crie terceira tabela dinâmica
2. Configurar:
   - **Linhas:** Produto
   - **Valores:** COUNT (quantidade) + SUM(Faturamento)

---

## 📝 Parte 4: Construir o Dashboard Visual (50 minutos)

### Tarefa 4.1 - Layout da Aba Dashboard

**Organize assim:**

```
┌─────────────────────────────────────┐
│ DASHBOARD EXECUTIVO - JANEIRO 2026  │ (Título)
├─────────────────────────────────────┤
│ ┌─────────┬─────────┬─────────┬──────────┐
│ │Faturame │ Margem  │ Pedidos │Satisfação│ (KPIs)
│ │ento    │ Bruta   │         │          │
│ │125.500 │  32,5%  │  185    │  8,7/10  │
│ └─────────┴─────────┴─────────┴──────────┘
│
│ ┌──────────────────┬──────────────────┐
│ │ Faturamento por  │ Faturamento por  │ (Gráficos)
│ │ Região (Coluna)  │ Produto (Linha)  │
│ │                  │                  │
│ └──────────────────┴──────────────────┘
│
│ Região: [☑ Sul]  [☐ Norte]  [☐ Nordeste]  (Segmentadores)
└─────────────────────────────────────┘
```

### Tarefa 4.2 - Criar Cartões de KPI

**Na célula A1, crie um cartão:**

```
=CONCATENAR("R$ ",TEXTO(B5;"#.##0"))
```

Onde B5 tem o valor do faturamento (125.500)

**Formate a célula:**
- Fonte: **Arial, 28pt, Negrito**
- Cor: **Azul corporativo (#004384)**
- Fundo: Branco
- Borda: Azul

### Tarefa 4.3 - Adicionar Indicadores de Status

**Ao lado do cartão, crie:**
```
=SE(D5>C5;"🟢 Acima da Meta";"🔴 Abaixo da Meta")
```

### Tarefa 4.4 - Criar Gráficos

1. **Gráfico 1: Faturamento por Região (Coluna)**
   - Selecione tabela dinâmica de região
   - Inserir Gráfico de Coluna
   - Título: "Faturamento por Região"
   - Sem linhas de grade
   - Cores: azul corporativo

2. **Gráfico 2: Faturamento por Produto (Barras Horizontais)**
   - Selecione tabela dinâmica de produto
   - Inserir Gráfico de Barras
   - Título: "Top 10 Produtos"

---

## 📝 Parte 5: Adicionar Interatividade (30 minutos)

### Tarefa 5.1 - Criar Segmentadores

1. Clique em qualquer tabela dinâmica
2. **Inserir → Segmentador de Dados**
3. Selecione "Região"
4. Posicione no lado esquerdo do dashboard

### Tarefa 5.2 - Conectar Segmentador aos Gráficos

1. Clique no **Segmentador**
2. **Aba "Segmentador" → Conexões de Relatório**
3. Marque TODOS os gráficos e tabelas dinâmicas
4. Teste clicando em "Sul" - todos gráficos devem filtrar

---

## 📝 Parte 6: Estética e Finalização (20 minutos)

### Tarefa 6.1 - Ocultar Linhas de Grade

1. **Aba Exibir → Linhas de Grade (desmarcar)**

### Tarefa 6.2 - Aplicar Formatação Profissional

- [ ] Cabeçalho com logo/nome da empresa
- [ ] Cor de fundo: branco ou cinza muito claro
- [ ] Texto: preto ou cinza escuro (não colorido)
- [ ] Bordas apenas onde necessário
- [ ] Alinhamento: esquerda para texto, direita para números

### Tarefa 6.3 - Adicionar Data de Atualização

**Célula no rodapé:**
```
=CONCATENAR("Atualizado em: ";HOJE())
```

---

## ✅ Critérios de Avaliação

| Critério | Pontos | Resultado |
|----------|--------|-----------|
| KPIs estruturados corretamente | 20 | ___ / 20 |
| Tabelas dinâmicas criadas | 20 | ___ / 20 |
| Gráficos profissionais | 20 | ___ / 20 |
| Segmentadores funcionando | 15 | ___ / 15 |
| Design limpo e profissional | 15 | ___ / 15 |
| Interatividade e usabilidade | 10 | ___ / 10 |
| **TOTAL** | **100** | ___ / 100 |

---

## 🔍 Checklist Final

- [ ] Aba Base_Dados com 30 registros
- [ ] Tabela oficial (tbl_Vendas) criada
- [ ] 3 tabelas dinâmicas criadas
- [ ] 3 cartões de KPI formatados
- [ ] Gráfico de coluna por região
- [ ] Gráfico de barras por produto
- [ ] Segmentador de região criado
- [ ] Segmentador conectado a todos os gráficos
- [ ] Linhas de grade ocultas
- [ ] Data de atualização adicionada
- [ ] Dashboard salvo como "Dashboard_Executivo.xlsx"

---

## 📱 Dica de Ouro

**Dashboard executivo deve ser lido em menos de 10 segundos!**

- Números grandes e claros
- Cores significam status (verde=bom, vermelho=ruim)
- Um gráfico por pergunta (não mais que 2-3)
- Segmentadores fáceis de encontrar

---

**Data de Entrega:** _______________  
**Assinatura do Aluno:** _______________

