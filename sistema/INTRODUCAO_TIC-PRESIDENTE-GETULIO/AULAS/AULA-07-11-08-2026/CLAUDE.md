# AULA 07 — 11/08/2026
## UC: Introdução à Tecnologia da Informação e Comunicação

Esta pasta contém os materiais utilizados na Aula 07, realizada em 11/08/2026.
O tema central da aula foi **Editor de Apresentações (Google Slides)** e **Planilhas Eletrônicas**.

---

## Arquivos

### `SLIDE_AULA_07.html`
Apresentação de slides da Aula 07 em formato HTML interativo.
- **Tema:** Google Slides — Editor de Apresentações
- **Quantidade de slides:** 15 (mínimo obrigatório)
- **Conteúdo:** introdução ao Google Slides, interface, ferramentas, formatação, colaboração em tempo real, compatibilidade com PowerPoint (.pptx)
- **Recursos:** navegação por botões, contador de slides, barra de progresso, botão para exportar PDF
- **Estilo:** identidade visual SENAI (azul #004384 e laranja #f7941d)
- **Navegação:** link de volta ao `dashboard.html` da UC

### `SLIDE_AULA_07.pdf`
Versão PDF dos slides da Aula 07.
- Gerado a partir do `SLIDE_AULA_07.html` via função de impressão do navegador
- Formato A4 paisagem
- Usado para distribuição impressa ou envio digital aos alunos

---

### `Controle_Abate_Pamplona.xlsx`
Planilha Excel de controle de abate de suínos da **Pamplona Alimentos** (unidade de Presidente Getúlio/SC).
- **Finalidade:** atividade prática de planilhas eletrônicas usando um caso real da indústria alimentícia
- **Abas:** Dashboard · Colonos · Agendamentos · Recebimento · Abate · Relatório Diário · Legenda
- **Fórmulas:** peso médio, peso total, KPIs, rendimento de carcaça (automático)
- **Fluxo dos animais:** AGENDADO → EM TRÂNSITO → RECEBIDO → EM DESCANSO → EM ABATE → ABATIDO (ou CONDENADO)
- Cores por status: azul, laranja, verde, roxo, vermelho, grafite

### `PESQUISA-PAMPLONA-EXCEL-PG.md`
Documento de pesquisa e referência sobre a estrutura da planilha `Controle_Abate_Pamplona.xlsx`.
- Descreve o contexto operacional da Pamplona Alimentos (colonos integrados, transporte, abate, inspeção SIF)
- Documenta todos os campos de cada aba, os status dos animais e os KPIs do dashboard
- Inclui boas práticas: descanso pré-abate (mínimo 3h), rendimento esperado de carcaça (72–78%), inspeção SIF ante e post-mortem
- Referências: MAPA, SIF, ABCS
- Criado em: 13/08/2026

---

### `GASTOS-CASA.ini`
Arquivo de texto estruturado (formato INI) com um modelo de orçamento doméstico.
- **Finalidade:** base de referência para a atividade prática de planilhas eletrônicas de gastos pessoais/domésticos
- **Receitas:** salário de indústria alimentícia (R$ 3.500,00) + freelancer como desenhista (R$ 1.200,00) = **R$ 4.700,00/mês**
- **Despesas:** aluguel (R$ 1.800,00) · alimentação (R$ 1.200,00) · educação (R$ 300,00) · lazer (R$ 300,00) · saúde (R$ 300,00) · investimentos (R$ 800,00)
- **Saldo:** R$ 0,00 (orçamento equilibrado — intencional para o exercício)
- Os alunos devem recriar e explorar esse orçamento em planilha

### `Planilha-Gastos-Casa-AULA-13-08-2026.xlsx`
Planilha Excel de gastos domésticos criada para a aula de 13/08/2026.
- **Finalidade:** atividade prática — os alunos montam uma planilha de controle de gastos de uma família
- Baseada nos dados do arquivo `GASTOS-CASA.ini`
- Exercita: formatação de células, fórmulas de soma, subtração e saldo, organização de dados em tabela

---

### `ATIVIDADE-EXCEL.md`
Descrição completa da atividade prática de planilha eletrônica para os alunos.
- **Finalidade:** roteiro detalhado da atividade em formato texto/Markdown
- **Trabalho:** em duplas — Aluno A (Word) + Aluno B (Planilha)
- **Contexto:** criação de planilha de controle de abate simplificada (baseada na Pamplona)
- **Conteúdo:** divisão de tarefas, dados para digitar, fórmulas guiadas, perguntas e critérios de avaliação
- **Duração prevista:** 1 hora

### `ATIVIDADE-EXCEL-13-08-2026.docx`
Versão Word da atividade prática — documento distribuído aos alunos na aula de 13/08/2026.
- **Formato:** Word (.docx), layout profissional com identidade visual SENAI
- **Estrutura:**
  - Cabeçalho SENAI + título da atividade
  - Campos para identificação da dupla (nome, turma, data)
  - Divisão da dupla: Aluno A (Word) × Aluno B (Planilha)
  - Parte 2 — Passo a passo para criar a planilha (7 colunas, 5 linhas de dados, fórmulas, formatação)
  - Parte 3 — 5 perguntas com espaço de resposta (Aluno A preenche)
  - Critérios de avaliação (10 pontos)
- **Destinado a:** alunos de 14–17 anos com primeiro contato com computador

---

## Relação com o Plano de Ensino

| Conteúdo da Ementa | Arquivo |
|--------------------|---------|
| 4.3 — Editor de Apresentações (Google Slides) | `SLIDE_AULA_07.html`, `SLIDE_AULA_07.pdf` |
| 4.2 — Editor de Planilhas Eletrônicas | `Controle_Abate_Pamplona.xlsx`, `Planilha-Gastos-Casa-AULA-13-08-2026.xlsx` |
| 4.2.5 — Inserção de fórmulas básicas | `GASTOS-CASA.ini` (dados-base), planilhas |
| 4.2.7 — Gráficos, quadros e tabelas | `Controle_Abate_Pamplona.xlsx` (Dashboard) |
| 4.2.5 — Inserção de fórmulas básicas (prática alunos) | `ATIVIDADE-EXCEL.md`, `ATIVIDADE-EXCEL-13-08-2026.docx` |
