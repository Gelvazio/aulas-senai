# 📊 EMENTA COMPLETA — Análise de Dados Aplicada à Gestão

## Unidade Curricular: Análise de Dados Aplicada à Gestão | Técnico em Gestão e Controle de Materiais | SENAI

---

## 📑 ÍNDICE

1. [Resumo Executivo](#resumo)
2. [Introdução Expandida](#introducao)
3. [Visão Geral dos 10 Blocos](#blocos)
4. [Mapas Conceptuais](#mapas)
5. [Matriz de Competências](#competencias)
6. [Aplicações Reais](#aplicacoes)
7. [Recursos e Próximos Passos](#recursos)

---

## 📌 RESUMO EXECUTIVO {#resumo}

**Análise de Dados Aplicada à Gestão** é uma Unidade Curricular de **40 horas** integrada ao **3º Semestre** do curso **Técnico em Gestão e Controle de Materiais**. Capacita estudantes a transformar dados em decisões estratégicas, utilizando ferramentas modernas para otimizar operações logísticas, reduzir custos e melhorar eficiência.

### O que os Alunos Alcançarão

- **📊 Analisar** dados operacionais de gestão de materiais
- **📈 Visualizar** informações complexas em dashboards executivos
- **🔮 Prever** demanda e otimizar estoque
- **💰 Reduzir** custos através de análise quantitativa
- **🎯 Tomar** decisões baseadas em dados (data-driven)
- **⚙️ Automatizar** relatórios e processos repetitivos
- **📱 Comunicar** insights para stakeholders

### Habilidades Desenvolvidas

**Técnicas:** Excel, SQL, Python, Tableau/Power BI, Forecasting, Power Query  
**Conceituais:** Estatística descritiva, análise exploratória, otimização, KPIs  
**Socioemocionais:** Pensamento crítico, comunicação visual, resolução de problemas

### Público-Alvo

Alunos do **3º Semestre** com conhecimento prévio de Gestão de Materiais e Lógica Básica. Ideal para especializar-se em **Inteligência de Dados (BI)**, **Supply Chain Analytics** ou **Gestão Operacional**.

---

## 🌍 INTRODUÇÃO EXPANDIDA {#introducao}

### Por Que Análise de Dados Importa em Gestão?

Empresas que usam dados na tomada de decisão têm **35% mais lucro** do que concorrentes. Exemplos reais:

- **Amazon:** Análise preditiva reduz estoque em 40% sem perder vendas
- **Natura:** Forecasting de demanda economizou R$50M em excesso de estoque
- **Carrefour:** Dashboard de gestão de materiais reduziu tempo de reposição de 24h para 4h

### A Pirâmide de Dados

A evolução do dado até sabedoria:

```
         ╔═════════════════════════════╗
         ║   SABEDORIA (5%)            ║  Decisões estratégicas
         ║   "Por que isto acontece?"  ║
         ╠═════════════════════════════╣
         ║  CONHECIMENTO (15%)         ║  Padrões e tendências
         ║  "Qual a causa?"            ║
         ╠═════════════════════════════╣
         ║  INFORMAÇÃO (30%)           ║  Contexto e significado
         ║  "O que significa?"         ║
         ╠═════════════════════════════╣
         ║  DADOS (50%)                ║  Números brutos
         ║  "O que temos?"             ║
         ╚═════════════════════════════╝
```

### KPIs Críticos em Gestão de Materiais

- **Rotatividade de Estoque:** Quantas vezes vende-se o estoque/ano (meta: >8)
- **Custo de Estoque:** % do custo operacional (meta: <25%)
- **Nível de Serviço:** % pedidos atendidos no prazo (meta: >98%)
- **Acurácia de Inventário:** % diferença entre sistema e físico (meta: >99%)

---

## 🏗️ VISÃO GERAL DOS 10 BLOCOS {#blocos}

### **BLOCO 01** — Fundamentos de Dados em Gestão (4h)

Conceitos básicos: dados brutos, fontes (ERP, planilhas, sensores), STLC aplicado. Aluno aprende ciclo de vida dos dados em ambiente real. Compreende estrutura de dados em sistemas de gestão integrados (SAP, Oracle, Microsoft Dynamics). Entende a importância da qualidade dos dados desde o ponto de entrada. Prática: importar dados de múltiplas fontes e consolidar em planilha.

**Competências:** Análise crítica, documentação de processos, pensamento sistêmico  
**Ferramentas:** Excel, CSV, JSON  
**Avaliação:** Identificar 5 fontes de dados em empresa real

### **BLOCO 02** — Estatística Descritiva Aplicada (4h)

Média, mediana, moda, desvio padrão, quartis e percentis. Análise de distribuições normais em demanda histórica. Identificação de outliers e anomalias em gestão (vendas anormais, devoluções, perdas). Teste de normalidade. Transformações de dados. Correlação e causação.

**Aplicações Práticas:** Análise de dados de 12 meses de vendas, identificação de sazonalidade, detecção de problemas operacionais em estoque  
**Ferramentas:** Excel, funções estatísticas  
**Projeto:** Resumir dataset de 1000+ registros com estatísticas

### **BLOCO 03** — Excel Avançado e Power Query (4h)

Power Query para conectar múltiplas fontes. VLOOKUP, INDEX/MATCH, SUMIF, SUMIFS avançados. Tabelas dinâmicas (Pivot Tables) com múltiplos níveis. Formatação condicional. Validação de dados. Gráficos dinâmicos e interativos. Criação de dashboard básico em Excel. Automação com macros simples (VBA).

**Exemplos Práticos:** Consolidar dados de 5 planilhas diferentes, criar Pivot Table de custos por categoria, gráfico de tendência de demanda  
**Ferramentas:** Excel 365, Power Query  
**Projeto:** Dashboard de estoque com KPIs principais

### **BLOCO 04** — SQL para Gestão de Materiais (5h)

SELECT, WHERE, ORDER BY, DISTINCT. JOIN (INNER, LEFT, RIGHT, FULL). GROUP BY, HAVING, SUM, COUNT, AVG, MIN, MAX. UNION e UNION ALL. Subqueries e CTEs (Common Table Expressions). Window functions (ROW_NUMBER, RANK). Queries de performance. Índices e otimização. Constraint e integridade de dados. Triggers básicos.

**Consultas Reais:** Estoque por categoria, custos acumulados, movimentação diária, TOP 10 produtos mais vendidos, análise de fornecedores  
**Banco de Dados:** SQL Server, PostgreSQL, MySQL  
**Projeto:** Criar 10+ queries para análise de gestão de materiais

### **BLOCO 05** — Python, NumPy e Pandas (5h)

Fundamentos Python: variáveis, loops, funções. NumPy: arrays, operações matemáticas, álgebra linear. Pandas: DataFrames, leitura/escrita de CSV, operações de agregação. Merge e join de datasets. Limpeza de dados: tratamento de nulos, valores duplicados, outliers. Análise exploratória com describe(), groupby(). Visualização básica com Matplotlib. Exportação de resultados.

**Scripts Práticos:** Ler 100.000 registros, calcular medidas agregadas, remover inconsistências, gerar relatório automático  
**Bibliotecas:** Pandas, NumPy, Matplotlib  
**Projeto:** Análise exploratória completa de dataset de gestão

### **BLOCO 06** — Visualização Profissional de Dados (4h)

Tableau ou Power BI: interface, conexão a fontes, transformação de dados (Power Query). Criação de gráficos (barras, linhas, scatter, mapas, KPI cards). Filtros e segmentadores interativos. Dashboards executivos com múltiplas visualizações. Storytelling: narrativa de dados. Publicação e compartilhamento. Drill-down e navegação. Alertas automáticos.

**Dashboards Reais:** Gestão de estoque, análise de custos, performance de fornecedores, indicadores operacionais  
**Ferramentas:** Tableau Desktop, Power BI Desktop, Looker  
**Projeto:** Dashboard executivo com 5+ visualizações e 3 filtros

### **BLOCO 07** — Forecasting e Previsão de Demanda (4h)

Time series analysis: componentes (trend, sazonalidade, ciclos, ruído). Médias móveis simples e exponenciais. ARIMA (AutoRegressive Integrated Moving Average). Prophet (Facebook). Validação de modelos: MAE, RMSE, MAPE. Backtesting e cross-validation. Previsão com Python ou R. Sazonalidade em gestão: meses de pico, períodos de queda. Ajustes por variáveis externas.

**Casos de Uso:** Prever demanda de produto para 3 meses, estimar estoque de segurança, identificar tendências  
**Ferramentas:** Python (statsmodels, Prophet), Excel  
**Projeto:** Modelo de forecasting com validação completa e recomendações

### **BLOCO 08** — Análise de Custos e Otimização (3h)

Curva ABC de materiais: classificação por valor. Custos: diretos, indiretos, fixos, variáveis. Análise de lote: quantidade ótima de compra (EOQ). Lead time e ponto de reposição. Margem de contribuição. Análise de sensibilidade. ROI de investimentos em estoque. Benchmarking: comparação com concorrentes e padrões industriais. Simulações de cenários.

**Exemplos:** Classificar 500 itens em ABC, calcular EOQ, simular economia com redução de 10% no estoque  
**Ferramentas:** Excel Solver, Python, Tableau  
**Projeto:** Análise de custos completa com recomendações de otimização

### **BLOCO 09** — Automação, CI/CD e Relatórios Dinâmicos (2h)

Agendamento automático de relatórios em Excel e BI. Triggers em banco de dados. APIs para integração de dados. GitHub para versionamento de scripts. Alertas automáticos: notificações por email quando KPIs excedem limite. Dashboards em tempo real. Documentação de processos. Monitoramento de performance de queries.

**Implementações:** Relatório diário automático, alertas de desvios, dashboard atualizado a cada hora  
**Tecnologias:** Power Automate, SQL Jobs, Python scheduling  
**Projeto:** Pipeline de automação completo

### **BLOCO 10** — Projeto Final Integrado (2h)

Projeto capstone: análise completa de problema real de gestão de materiais. Dataset de 5.000+ registros. Planejamento, exploração, análise estatística, forecasting, visualização e recomendações. Documentação profissional com insights e ações propostas. Apresentação executiva (10 min) com demonstração de dashboard. Defesa de decisões e metodologias. Feedback de professores e pares.

---

## 🗺️ MAPAS CONCEPTUAIS {#mapas}

### Mapa 1: Progressão nos 10 Blocos

```
FUNDAMENTOS (Bloco 01)
    ↓ Estatística (Bloco 02)
    ↓ Excel (Bloco 03)
    ↓ SQL (Bloco 04)
    ↓ Python (Bloco 05)
    ↓ Visualização (Bloco 06)
    ↓ Forecasting (Bloco 07)
    ↓ Custos (Bloco 08)
    ↓ Automação (Bloco 09)
    ↓ Projeto (Bloco 10)
```

### Mapa 2: Decisão de Ferramenta

```
Análise simples? → Excel
Múltiplas tabelas? → SQL
Cálculos complexos? → Python
Visualização? → Tableau/Power BI
Predição? → Python + Forecasting
```

---

## 📊 MATRIZ DE COMPETÊNCIAS {#competencias}

### Competências Técnicas por Bloco

| Competência | Bloco 1-3 | Bloco 4-6 | Bloco 7-10 | Descrição |
|---|:---:|:---:|:---:|---|
| SQL | - | ✅ | ⚙️ | Consultas, JOINs, agregações, otimização |
| Python/Pandas | - | - | ✅ | Análise exploratória, limpeza, processamento |
| Excel | ✅ | ⚙️ | - | Power Query, Pivot Tables, análise |
| BI Tools | - | ✅ | ✅ | Tableau, Power BI, dashboards |
| Forecasting | - | ⚙️ | ✅ | Time series, ARIMA, Prophet, previsões |
| Análise crítica | ⚙️ | ✅ | ✅ | Interpretação, insights, decisões |
| Comunicação | ⚙️ | ⚙️ | ✅ | Storytelling, apresentação, visualização |

**Legenda:** ✅ = Foco principal | ⚙️ = Aplicação prática | - = Não abordado

### Competências Socioemocionais Desenvolvidas

| Competência | Descrição | Como Avaliada |
|---|---|---|
| **Responsabilidade** | Integridade dos dados, documentação sistemática | Exercícios, projetos |
| **Pensamento Crítico** | Questionar dados, identificar inconsistências | Análises exploratórias |
| **Atenção ao Detalhe** | Detectar erros, outliers, anomalias | Limpeza de dados |
| **Persistência** | Resolver problemas complexos iterativamente | Debugging de queries, modelos |
| **Colaboração** | Compartilhar dashboards, code review | Apresentações, projetos em dupla |
| **Comunicação Visual** | Explicar dados com gráficos efetivos | Dashboards e apresentações |
| **Empatia** | Focar em decisor final, facilitar entendimento | Relatórios executivos |

---

## 💼 APLICAÇÕES REAIS {#aplicacoes}

### Caso 1: Amazon (Gestão de Estoque)

Usa análise preditiva para saber exatamente quanto estoque manter. Resultado: **40% redução** em excesso sem perder vendas.

### Caso 2: Natura (Forecasting)

Modelo de previsão de demanda economizou **R$50 milhões** em estoque desnecessário.

### Caso 3: Carrefour (Dashboard)

Sistema de gestão em tempo real reduziu reposição de **24 horas para 4 horas**.

---

## 🚀 ROADMAP DE APRENDIZAGEM

### Semana 1-2: Fundamentos (Blocos 01-02)
- Conceitos de dados, fontes, STLC. Estatística descritiva. Excel básico e Power Query.
- **Entregável:** Análise exploratória com 5+ estatísticas

### Semana 3-4: SQL e Python (Blocos 04-05)
- SELECT, WHERE, JOIN, GROUP BY. Python, NumPy, Pandas, análise exploratória.
- **Entregável:** 10+ queries SQL + análise completa em Pandas

### Semana 5-6: Visualização e Forecasting (Blocos 06-07)
- Tableau/Power BI, dashboards executivos. Time series, ARIMA, Prophet, previsões.
- **Entregável:** Dashboard funcional + modelo de forecasting validado

### Semana 7-8: Otimização e Projeto (Blocos 08-10)
- Curva ABC, análise de custos, automação de relatórios. Projeto final integrado.
- **Entregável:** Análise completa com recomendações + apresentação executiva

---

## 📚 RECURSOS E PRÓXIMOS PASSOS {#recursos}

### Documentação Oficial

- **Power BI:** https://learn.microsoft.com/power-bi
- **Tableau:** https://www.tableau.com/learn
- **SQL:** https://www.w3schools.com/sql
- **Python:** https://docs.python.org

### Comunidades e Fóruns

- Stack Overflow (tags: `sql`, `power-bi`, `python`)
- Dev.to (artigos sobre dados)
- Comunidades BI brasileiras

### Próximas Especialidades

- **Advanced Analytics:** Machine Learning para gestão
- **Supply Chain:** Otimização de logística
- **Business Intelligence:** Especialista em BI
- **Data Science:** Análise profunda

### Certificações Relevantes

- **Google Data Analytics**
- **Microsoft Certified: Data Analyst**
- **Tableau Desktop Specialist**

---

## 🎓 SÍNTESE FINAL

**Análise de Dados Aplicada à Gestão** transforma profissionais em **especialistas em tomada de decisão baseada em dados**. Em 40 horas, os alunos dominam ferramentas e metodologias consolidadas da indústria, preparando-se para funções em **BI, Supply Chain Analytics** ou **Gestão Operacional**.

Resultado esperado: Aluno consegue planejar, executar e otimizar qualquer processo de gestão através de análise quantitativa.

---

**Documento:** EMENTA-CHALKIE-AI.md  
**Versão:** 1.0  
**Data:** 08/09/2026  
**Status:** ✅ Aprovado  
**Público-Alvo:** Alunos 3º Semestre | Técnico em Gestão e Controle de Materiais | SENAI