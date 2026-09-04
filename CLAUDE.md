# update branch
# professor-senai — Regras do Projeto

## 🎯 CONTEXTO-PROJETO

⚠️ **ATUALIZAR ESTE CONTEXTO A CADA INTERAÇÃO COM O CHAT** — Este documento deve refletir sempre o estado mais recente do projeto.

**Data Última Atualização:** 04-09-2026 (✅ Plano completo de 10 aulas + avaliações criado em sistema/INTRODUCAO-TIC/)  
**Objetivo Principal:** Implementar sistema de validação e sincronização de UCs + Documentar template pedagógico + Criar aulas de produtividade (Word, Excel, PowerPoint)

### ✅ Implementações Realizadas

1. **REGRA 01**: Identificação de UCs e containers (FICHA-PRODUTO-MAIS-TECH)
2. **REGRA 02**: Verificação de estrutura obrigatória (AULAS, AVALIACOES, EMENTA, PLANO_ENSINO, APOSTILA)
3. **REGRA 04**: Pasta ATIVIDADES com validação automática (2 horas = 1 atividade de 15 min)
4. **REGRA 05**: Pasta SUBSTITUICOES com guia de SGN para substituição de aulas
5. **REGRA 06**: Arquivo CLAUDE.md obrigatório em cada UC para documentação
6. **REGRA 07**: Filtro de pendências — busca apenas matérias ATIVAS (ativo=1)
7. **REGRA 08**: Campo de status de matérias aceita 3 valores: 1 (Ativa), 0 (Inativa), 2 (Concluída)
8. **REGRA 09**: Campo visivel_alunos em tabela materia — Controla visibilidade (SIM=mostra para alunos | NAO=oculta) — Professor sempre vê tudo
9. **CORREÇÃO URLS VERCEL**: Funções `abrirApostilaMateria()` e `abrirEmentaMateria()` agora adicionam prefixo `sistema/` aos caminhos para URLs em produção
10. **MATÉRIA COMPLETA**: "Análise de Dados Aplicada à Gestão" (TURMA_SALETE_2026_02) — ✅ Ementa + ✅ Apostila DOCX + ✅ Plano de 32h + ✅ 16 aulas detalhadas + ✅ Interface HTML interativa
11. **UC FUNDAMENTOS DA TECNOLOGIA E PROGRAMAÇÃO**: ✅ **16 aulas + 1 avaliação final** (33h totais) criadas em `/FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO/AULAS/`
12. **DASHBOARD INTERATIVO (index.html)**: ✅ Criado em `/FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO/AULAS/` — permite navegar por todas as aulas em Grid View e Detail View
13. **TEMPLATE PEDAGÓGICO DOCUMENTADO**: ✅ Arquivo `/sistema/CLAUDE.md` contém template completo de aulas e diretrizes para criar futuras UCs
14. **3 AULAS DE PRODUTIVIDADE DIGITAL**: ✅ Criadas em `/FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO/PLANO-3-AULAS/`:
    - **AULA 01 (03/09/2026)**: Editores de Texto — Word e Google Docs (com infográfico e mapa mental)
    - **AULA 02 (10/09/2026)**: Planilhas Eletrônicas — Excel e Google Planilhas (com infográfico e mapa mental)
    - **AULA 03 (17/09/2026)**: Apresentações — PowerPoint e Google Slides (com infográfico e mapa mental)
    - Cada aula: objetivos + conteúdo + 3 atividades práticas + recursos + rubrica de entrega + seção INFOGRÁFICO + seção MAPA MENTAL
15. **PASTA `GESTAO-E-MATERIAIS/` (raiz do projeto)**: contém o Projeto de Curso oficial "Assistente em Processos de Gestão e Controle de Materiais" (456h, 18 UCs) e a avaliação da UC **Processos Logísticos e Controle de Materiais** (72h)
16. **AVALIAÇÃO PROCESSOS LOGÍSTICOS — COBERTURA 100%**: ✅ `Avaliacao_Gestao_Controle_de_Materiais.docx` ampliada de 10 para **16 itens** (8 objetivos + 8 discursivos), com **1 item por capacidade técnica (C1–C16)** da UC. Itens complementares criados: 06 (C1 normas/legislação), 07 (C2 fluxo de apoio aos setores), 08 (C12 documentação de transporte/cubagem), 14 (C13 relatórios e auditoria), 15 (C14 fluxo e arquivamento de documentos), 16 (C15 destinação de descartes). Pontuação: objetivos 0,5 + discursivos 0,75 = 10,0
17. **UC INTRODUÇÃO À TIC (`sistema/INTRODUCAO-TIC/`) — PLANO COMPLETO DE 40h**: ✅ Criado plano de **10 encontros de 4h** (9 aulas de conteúdo + Aula 10 de avaliações), com cobertura de **10/10 domínios de conhecimento** e **5/5 capacidades básicas** da ementa. Estrutura: `PLANO-DE-AULAS.md`, pasta `AULAS/` (10 arquivos `.md` + `index.html` navegável) e pasta `AVALIACOES/` (prova objetiva de 40 questões com gabarito comentado + prova prática de 4 tarefas com critérios de correção). A **Aula 01** inclui, além do conteúdo da ementa, história da computação, hardware × software, mouse, teclado, área de trabalho, pastas e arquivos. Avaliação: objetiva 4,0 + prática 6,0 = 10,0.

### 📋 Estrutura de Cursos e UCs Existentes

As seguintes UCs ou contêineres pedagógicos existem no projeto:

- `BANCO_DE_DADOS`
- `FICHA-PRODUTO-MAIS-TECH` — **curso/contêiner; não é matéria**
- `GESTAO_E_CONTROLE_MATERIAIS` — **curso/contêiner; não é matéria**
- `INTRODUCAO_A_TECNOLOGIA_DA_INFORMACAO_E_COMUNICACAO`
- `INTRODUCAO_TIC`
- `LOGICA-PROGRAMACAO`
- `PENDENCIAS-PROFESSOR`
- `TECNICO-INFORMATICA-INTERNET` — **curso/contêiner; não é matéria**
- `Tecnico em Desenvolvimento de Sistemas` — **curso/contêiner; não é matéria**

⚠️ **Status da Estrutura Obrigatória:**
- **INTRODUCAO_TIC**: ✅ Completa (AULAS + MATERIAIS)
- **INTRODUCAO_A_TECNOLOGIA_DA_INFORMACAO_E_COMUNICACAO**: ⚠️ Incompleta (tem AULAS, falta MATERIAIS)
- **ANALISE_DADOS_APLICADA_GESTAO** (em TURMA_SALETE_2026_02): ✅ Completa (AULAS + EMENTA + APOSTILA + PLANO + INTERFACE)
- Demais UCs: ❌ Sem estrutura obrigatória (faltam AULAS e/ou MATERIAIS)

### 🔧 Ferramentas Criadas

- **syncdata/server.js**: ✅ API REST com endpoints para sincronização
- **dashboard.html**: ✅ Dashboard interativo com resumo de UCs, pendências e progresso
- **Dashboard Modal**: "Relatório SYNC" para visualizar status de sincronização

### ⏳ Ferramentas Planejadas (Parcialmente Implementadas)

- **syncdata/verify-uc.js**: Verificador de estrutura de UCs (pendente)
- **scripts/gerar_slides.js**: Script de geração de slides (pendente)
- **PLANO-AULAS.md**: ✅ Análise de Dados Aplicada à Gestão (32h implementado) | ⏳ Testes de Frontend (pendente)

### 📊 API Endpoints

- `POST /api/sync` - Sincroniza e gera relatório-pastas.json
- `GET /api/relatorio` - Retorna relatório de sincronização
- `GET /api/status` - Status do servidor
- `GET /api/aulas` - Lista de aulas escaneadas
- `GET /api/pendencias` - Lista de pendências

### 🚀 Como Usar

1. Servidor: `npm run dev` em `syncdata/` (porta 3333)
2. Dashboard: Clique em "📊 Relatório SYNC" para visualizar
3. Botão de atualizar no modal sincroniza tudo automaticamente

---

## Commit e Push obrigatórios

⚠️ **APÓS QUALQUER INTERAÇÃO NO CHAT que resulte em alteração de arquivo, faça commit IMEDIATAMENTE, sem perguntar e sem pedir confirmação.**

1. `git add` dos arquivos alterados
2. `git commit -m "mensagem descritiva"`

Isso vale para qualquer mudança, por menor que seja. Nunca questionar, nunca pedir aprovação — apenas executar.

### 🚨 REGRA CRÍTICA — Execução de Comandos Git
⚠️ **NUNCA PERGUNTE PARA EXECUTAR COMANDOS DE GIT — SEMPRE EXECUTE SEM PERGUNTAR**

Esta é uma regra absoluta:
- Não liste opções e aguarde resposta
- Não diga "devo executar o git?"
- Não pergunte "está pronto para commitar?"
- **SIMPLESMENTE EXECUTE O COMANDO DIRETAMENTE**

Exemplos de o que NÃO fazer:
- ❌ "Devo fazer commit agora?"
- ❌ "Quer que eu faça push para origin?"
- ❌ "Posso executar git add?"

Exemplos do que FAZER:
- ✅ Executar `git add .` diretamente
- ✅ Executar `git commit -m "mensagem"` diretamente
- ✅ Executar `git status` para verificar e já fazer o próximo comando

⚠️ **NUNCA faça push automático — deixe que o usuário faça push manualmente quando desejar.**

## Graphify

Após commitar, executar:

```
graphify update .
```

O Graphify está instalado como executável do `uv` em `C:\Users\gelva\.local\bin\graphify.exe`. O módulo não está disponível no interpretador `C:\Python314\python.exe`.

**Última atualização do grafo (02-09-2026):** 252 arquivos analisados, 4.704 nós, 4.765 edges, 412 comunidades (inclui as 3 novas aulas de produtividade digital).

**Exclusões do corpus:** O arquivo `.graphifyignore` impede a leitura de `sistema/PENDENCIAS-PROFESSOR/node_modules/`, pois essa pasta contém dependências geradas e não código autoral do projeto.

### Inventário atual da raiz

- Pastas principais: `.agents`, `.claude`, `.superpowers`, `.vscode`, `docs`, `graphify-out`, `scripts` e `sistema`.
- Arquivos operacionais principais: `AGENTS.md`, `CLAUDE.md`, `dashboard.html`, `PLATAFORMA_DE_IA.md`, `GEMINI.bat` e `ALIBABA_IA_OPEN_CLAUDE.bat`.
- A pasta `sistema/` concentra o conteúdo pedagógico e as aplicações do projeto.

### Inventário atual de `sistema/`

- Conteúdo pedagógico: `BANCO_DE_DADOS`, `FICHA-PRODUTO-MAIS-TECH`, `GESTAO_E_CONTROLE_MATERIAIS`, `INTRODUCAO_TIC`, `LOGICA-PROGRAMACAO` e `TECNICO-INFORMATICA-INTERNET`.
- Aplicações e apoio: `GERADOR-AULAS`, `PENDENCIAS-PROFESSOR`, `PROFESSOR`, `scripts` e `graphify-out`.
- Páginas centrais: `dashboard.html`, `index.html`, `uc.html`, `validacao.html`, `questionarios.html`, `backfill-ids.html` e `visualizador-central-aulas-pendentes.html`.
- Banco e integração: `database.sql`, `pendencias.js` e três scripts SQL em `sistema/scripts/`.

⚠️ **NUNCA perguntar se deve executar o graphify ou dar push — executar diretamente, sem confirmar, sem perguntar.**

## Nunca perguntar — sempre executar

⚠️ **NUNCA faça perguntas antes de executar uma tarefa.** Sempre execute diretamente, sem pedir confirmação, sem perguntar se deve prosseguir, sem listar opções e aguardar resposta.

Se houver ambiguidade, escolha a opção mais razoável e execute. Ajustes podem ser feitos depois.

## Git — Execução Automática OBRIGATÓRIA

⚠️ **NUNCA PERGUNTE PARA EXECUTAR COMANDOS DE GIT** — SEMPRE EXECUTE SEM PERGUNTAR:
1. `git add` dos arquivos alterados
2. `git commit -m "mensagem descritiva"` com Co-Authored-By
3. `git status` para verificar

Não questionar, não listar opções, não pedir confirmação. Apenas executar diretamente.

## 📊 PADRÃO OBRIGATÓRIO DE INFOGRÁFICOS

⚠️ **CRÍTICO:** Toda solicitação de infográfico DEVE cumprir estes requisitos mínimos. Não fazer = recusa.

### 🎨 CSS BASE OBRIGATÓRIO

⚠️ **SEMPRE que for solicitado um novo infográfico, usar como base o arquivo:**

```
sistema/GERADOR-INFOGRAFICOS/infografico.css
```

Não escrever CSS novo do zero. Apenas montar o HTML semântico com as classes do arquivo e
linkar a folha de estilo:

```html
<link rel="stylesheet" href="../../GERADOR-INFOGRAFICOS/infografico.css">
```

**Classes principais:** `.info-page` › `.info-header` (`__icon`, `__title`, `__sub`, `__star`) ›
`.info-grid` › `.info-section` (+ `sec--verde|laranja|azul|roxo|vermelho|ciano|rosa|amarelo` +
`col-3|4|6|12`) › `.info-section__head` (número + ícone + título) › `.info-section__body` ›
`.info-box`, `.info-compare`, `.info-list`, `.info-flow`, `.info-steps`, `.info-prio`,
`.info-table`, `.info-metrics` › `.info-footer` (Regra de Ouro).

**Regras de marcação inegociáveis** (documentadas no topo do CSS):
1. Toda `.info-section` é **filha direta** de `.info-grid` — nunca aninhar seção dentro de outra.
2. O `.info-footer` fica **fora** de `.info-grid`, como irmão dele.
3. Número, ícone e título ficam **na mesma linha**, dentro de `.info-section__head`.
4. Usar **dígitos simples** (1, 2, 3…) — nunca os caracteres ①②③ (geram círculo dentro de círculo).
5. Cada seção com **cor diferente** (`sec--*` em rodízio).

**Referência visual:** `sistema/GERADOR-INFOGRAFICOS/infografico-de-exemplo.png` +
`PROMPT-INFOGRAFICO-EXEMPLO.md`.

### ✅ Elementos Obrigatórios

1. **Cabeçalho Visual:**
   - Título principal em branco (GRANDE, legível)
   - Subtítulo em dourado/ouro (2-3 palavras-chave ou resumo)
   - Ícone representativo (tema do infográfico)
   - Star/destaque visual (canto superior)

2. **Estrutura de Conteúdo:**
   - Mínimo 6 seções numeradas (sequencial: 1, 2, 3, etc.)
   - Cada seção tem cor DIFERENTE (paleta diversa)
   - Cada seção tem ícone representativo
   - Hierarquia clara: começo → desenvolvimento → fim

3. **Design Visual:**
   - Fundo escuro (azul, cinza ou preto) para contraste
   - Texto branco/claro em fundo escuro
   - Cores vibrantes para sections (azul, laranja, verde, vermelho, amarelo, roxo, rosa)
   - Máximo 2-3 tons da mesma cor
   - Sem poluição (espaço em branco é importante)

4. **Elementos Interativos:**
   - Boxes/cards destacados com tips ou alertas
   - Exemplos práticos intercalados (não apenas teoria)
   - Diagramas quando necessário (problema → causa → solução)
   - Checklist ou "regra de ouro" no rodapé
   - Setas/linhas conectando fluxo

5. **Tipografia:**
   - Títulos de seção: GRANDE, BOLD, cor diferente
   - Subtítulos: Médio, destaque
   - Corpo: Legível (sem serifa preferível)
   - Hierarquia clara (título > subtítulo > conteúdo)

6. **Layout:**
   - Grid organizado (colunas/linhas balanceadas)
   - Proporcional (16:9 ou A4 landscape)
   - Alinhamento consistente
   - Espaçamento regular entre elementos

7. **Rodapé/Conclusão:**
   - "Regra de Ouro" ou insight principal destacado
   - Próximos passos ou call-to-action
   - Branding/identificação (opcional mas bem-vindo)

### 🎨 Estrutura Recomendada de Cores por Tema

| Tema | Cor Primária | Cor Secundária | Acentos |
|------|---|---|---|
| **Word/Google Docs** | Azul #0B3D91 | Azul Claro #4285F4 | Branco, Ouro |
| **Excel/Planilhas** | Verde #00B050 | Verde Claro #34A853 | Branco, Laranja |
| **PowerPoint/Slides** | Roxo #1A0033 | Rosa #FF69B4 | Branco, Dourado |

### ❌ O Que NUNCA Fazer

- ❌ Infográfico apenas texto (sem ícones/cores/visual)
- ❌ Menos de 6 seções
- ❌ Cores muito claras em fundo claro
- ❌ Muitas cores diferentes (mais de 5-6)
- ❌ Sem hierarquia visual (tudo igual)
- ❌ Sem exemplos práticos
- ❌ Sem rodapé/conclusão
- ❌ Texto minúsculo ou ilegível

### ✅ Exemplo de Estrutura

```
┌─────────────────────────────────────────┐
│  TÍTULO GRANDE                  ⭐      │
│  Subtítulo em ouro • Resumo     🎨      │
├─────────────────────────────────────────┤
│ ① SEÇÃO 1 (Azul)    │ ② SEÇÃO 2 (Laranja) │
│ [Ícone] Conteúdo    │ [Ícone] Conteúdo    │
├─────────────────────────────────────────┤
│ ③ SEÇÃO 3 (Verde)   │ ④ SEÇÃO 4 (Roxo)    │
│ [Ícone] Conteúdo    │ [Ícone] Conteúdo    │
├─────────────────────────────────────────┤
│ ⭐ REGRA DE OURO / INSIGHT PRINCIPAL     │
│ Conclusão destacada em ouro/destaque    │
└─────────────────────────────────────────┘
```

---

## Slides

Todo arquivo de slide HTML deve ter **no mínimo 15 slides**.

## Estrutura de Unidades Curriculares

Em regra, cada subpasta pedagógica dentro de `sistema/` representa uma **Unidade Curricular (UC)**, salvo as pastas explicitamente classificadas como cursos ou áreas de apoio. As pastas de UC existentes são:

- `BANCO_DE_DADOS`
- `FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO`
- `INTRODUCAO_A_COMUNICACAO_ORAL_E_ESCRITA_PARA_O_MUNDO_DO_TRABALHO`
- `INTRODUCAO_A_TECNOLOGIA_DA_INFORMACAO_E_COMUNICACAO`
- `LOGICA-PROGRAMACAO`

### Curso Ficha Produto Mais Tech

**Ficha Produto Mais Tech:** a pasta `sistema/FICHA-PRODUTO-MAIS-TECH/` é um **curso/contêiner de matérias**. Ela **não deve ser tratada como matéria ou UC**.

As subpastas pedagógicas dentro desse curso representam suas matérias: `COMPETENCIAS_SOCIOEMOCIONAIS_E_EMPREENDEDORISMO/`, `EXPLORACAO_CARREIRAS_INDUSTRIAIS_TECNOLOGICAS/`, `FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO/`, `INTRODUCAO_COMUNICACAO_ORAL_ESCRITA/`, `NOCOES_ELETRICIDADE_CIRCUITOS_BASICOS/`, `OFICINAS_IMPRESSAO_3D_ROBOTICA/`, `REFORCO_LINGUAGENS/` e `REFORCO_MATEMATICA_E_RACIOCINIO_LOGICO/`.

Ao listar, validar ou acessar matérias desse curso, o sistema deve navegar dentro de `FICHA-PRODUTO-MAIS-TECH/` e aplicar as regras de UC às pastas de matérias, não à pasta do curso.

### Curso Gestão e Controle de Materiais

**Gestão e Controle de Materiais:** a pasta `sistema/GESTAO_E_CONTROLE_MATERIAIS/` é um **curso/contêiner de matérias**. Ela **não deve ser tratada como matéria ou UC**.

As subpastas pedagógicas dentro desse curso representam suas matérias. Atualmente, `ANALISE_DADOS_APLICADA_GESTAO/` é uma matéria identificada diretamente no curso, e agrupamentos de turma, como `TURMA_SALETE_2026_02/`, podem conter matérias adicionais.

Ao listar, validar ou acessar matérias desse curso, o sistema deve navegar dentro de `GESTAO_E_CONTROLE_MATERIAIS/` e aplicar as regras de UC às pastas de matérias, não à pasta do curso.

### Curso Técnico de Informática para Internet

**Técnico de Informática para Internet:** a pasta `sistema/TECNICO-INFORMATICA-INTERNET/` é um **curso/contêiner de matérias**. Ela **não deve ser tratada como matéria ou UC**.

As subpastas pedagógicas dentro desse curso representam suas matérias. Atualmente, `TESTES DE FRONTEND/` é uma matéria identificada no curso. A pasta `MATERIAIS-EXISTENTES/` é uma área de materiais de referência e não deve ser listada como matéria.

Ao listar, validar ou acessar matérias desse curso, o sistema deve navegar dentro de `TECNICO-INFORMATICA-INTERNET/` e aplicar as regras de UC às pastas de matérias, não à pasta do curso nem à área `MATERIAIS-EXISTENTES/`.

### Curso Técnico em Desenvolvimento de Sistemas

**Técnico em Desenvolvimento de Sistemas:** a pasta `sistema/Tecnico em Desenvolvimento de Sistemas/` é um **curso/contêiner de matérias**. Ela **não deve ser tratada como matéria ou UC**.

As subpastas pedagógicas dentro desse curso representam suas matérias. Atualmente, `LOGICA-PROGRAMACAO/` é uma matéria identificada dentro do curso.

Ao listar, validar ou acessar matérias desse curso, o sistema deve navegar dentro de `Tecnico em Desenvolvimento de Sistemas/` e aplicar as regras de UC às pastas de matérias, não à pasta do curso.

## Pasta PROFESSOR

A pasta `PROFESSOR/` (dentro de `sistema/`) **NÃO é uma Unidade Curricular (matéria)**. Ela contém:
- Configurações e dados de aulas para edição pelo professor
- Trabalhos e arquivos de uso exclusivo do professor

Não aplicar a ela a estrutura obrigatória de UC (`AULAS/`, `MATERIAIS/`), nem listá-la como matéria no sistema.

### Estrutura obrigatória de cada UC

Toda UC **deve conter** as subpastas:
- `AULAS/` — aulas da unidade curricular
- `MATERIAIS/` — materiais de apoio

Se uma dessas pastas não existir ao tentar acessar a UC no sistema (`uc.html`), deve ser exibido um **alerta visual** informando quais pastas estão faltando.

Ao criar ou mencionar arquivos de uma UC, use sempre o caminho `sistema/<NOME_DA_PASTA_UC>/AULAS/` ou `sistema/<NOME_DA_PASTA_UC>/MATERIAIS/`.

### Organização das provas teóricas

**Prova Teórica:** sempre em `AVALIACOES_CRIADAS/PROVA_TEORICA/`.

Todos os dados e artefatos relacionados a provas teóricas devem usar esse caminho dentro da respectiva UC, incluindo provas, recuperações, gabaritos, formulários, notas, instruções, corretores e arquivos auxiliares.

## Organização das provas práticas de Introdução à TIC

Todos os dados e artefatos de **prova prática** da UC `INTRODUCAO_A_TECNOLOGIA_DA_INFORMACAO_E_COMUNICACAO` devem ficar em:

`sistema/INTRODUCAO_A_TECNOLOGIA_DA_INFORMACAO_E_COMUNICACAO/AVALIACOES_CRIADAS/PROVA_PRATICA/`

Essa regra abrange provas, recuperações, corretores automáticos, gabaritos, formulários, notas, instruções e arquivos auxiliares relacionados à prova prática. Ao criar, editar, regenerar ou mencionar qualquer desses artefatos, usar sempre esse caminho e não a raiz de `AVALIACOES_CRIADAS/`.

## 🔔 Sistema de Pendências — Regra Crítica

⚠️ **EXTREMAMENTE IMPORTANTE**: O sistema de pendências **SEMPRE** deve buscar dados do **Supabase**, NUNCA apenas de localStorage ou dados locais.

### Definição de Pendências

Pendências são contadas a partir de **3 fontes** no Supabase:

1. **Campos de status nas matérias** (`materia` table):
   - `status_criacao_avaliacao` = "PENDENTE"
   - `status_plano_aula` = "PENDENTE"
   - `status_plano_ensino` = "PENDENTE"

2. **Campos de status nas avaliações** (`avaliacao` table):
   - `status_avaliacao` = "PENDENTE"
   - `status_gabarito` = "PENDENTE"
   - `status_revisao` = "PENDENTE"
   - `status_cadastro_sgn` = "PENDENTE"
   - `acompanhamento_pedagogico_sgn` = "PENDENTE"

3. **Tabela de pendências** (`pendencias` table):
   - Registros com `status` = "PENDENTE" e associados a matérias/cursos

### Implementação Obrigatória

- **uc.html**: Deve chamar função `carregarPendenciasCursos()` (ou equivalente) que busca do Supabase
- **dashboard.html**: Já implementa corretamente com `carregarPendenciasCursos()`
- **Novos componentes**: SEMPRE integrar com Supabase para pendências

### ❌ O que NÃO fazer

- ❌ Contar apenas itens de checklist local (localStorage)
- ❌ Usar dados hardcoded ou em memória
- ❌ Ignorar campos de avaliação e matérias do Supabase
- ❌ Criar sistema de pendências sem buscar do banco

### Fluxo Automático de Pendências

Quando usuário clica "Atualizar Pendências" no dashboard:

1. **BUSCA**: Procura por campos PENDENTE em matérias e avaliações
2. **INSERE**: Adiciona automaticamente registros na tabela `pendencias`
3. **CONCLUI**: Marca como "CONCLUIDA" se o status da matéria/avaliação não for mais PENDENTE
4. **LISTA**: Exibe todas as pendências na tela

Exemplo:
- Matéria tem `status_criacao_avaliacao = "PENDENTE"` → Cria pendência automaticamente
- Usuário muda para `status_criacao_avaliacao = "CONCLUIDO"` → Ao clicar "Atualizar", pendência é marcada como CONCLUIDA automaticamente

### 📊 Estrutura da Tabela "pendencias"

⚠️ **CRÍTICO**: A tabela `pendencias` deve ter SEMPRE as seguintes colunas:

**Para registros de MATÉRIAS:**
```
materia_id         (FK para tabela materia)
status_criacao_avaliacao  (VARCHAR: "PENDENTE" ou NULL)
status_plano_aula         (VARCHAR: "PENDENTE" ou NULL)
status_plano_ensino       (VARCHAR: "PENDENTE" ou NULL)
```

**Para registros de AVALIAÇÕES:**
```
materia_id                        (FK para tabela materia)
avaliacao_id                      (FK para tabela avaliacao)
status_avaliacao                  (VARCHAR: "PENDENTE" ou NULL)
status_gabarito                   (VARCHAR: "PENDENTE" ou NULL)
status_revisao                    (VARCHAR: "PENDENTE" ou NULL)
status_cadastro_sgn               (VARCHAR: "PENDENTE" ou NULL)
acompanhamento_pedagogico_sgn     (VARCHAR: "PENDENTE" ou NULL)
```

### 🔄 Fluxo de Inserção de Pendências

1. **UM registro por matéria** — não múltiplos registros
   - Se matéria tem 3 campos PENDENTE → 1 registro com os 3 campos marcados como "PENDENTE"
   - Campos não PENDENTE → NULL

2. **UM registro por avaliação** — não múltiplos registros
   - Se avaliação tem 5 campos PENDENTE → 1 registro com os 5 campos marcados como "PENDENTE"
   - Campos não PENDENTE → NULL

3. **Nenhuma duplicata**
   - Verificar se já existe registro antes de inserir
   - Se existe e tem campos não PENDENTE agora, pode ser atualizado

### ✅ Checklist de implementação

Ao implementar pendências em qualquer página:
1. ✅ Percorrer TODAS as matérias (sem filtro)
2. ✅ Percorrer TODAS as avaliações (sem filtro)
3. ✅ Para cada matéria com pelo menos 1 campo PENDENTE → inserir 1 registro em `pendencias`
4. ✅ Para cada avaliação com pelo menos 1 campo PENDENTE → inserir 1 registro em `pendencias`
5. ✅ Manter TODAS as colunas de status no registro (PENDENTE ou NULL)
6. ✅ Verificar por `materia_id` ou `avaliacao_id` para evitar duplicatas
7. ✅ CONCLUIR automaticamente pendências quando matérias/avaliações não forem mais PENDENTE
8. ✅ Mostrar badge com total de pendências nos cards

## 🎯 Implementação Completa do Sistema de Pendências (26-08-2026)

### ✅ Funcionalidades Implementadas

#### 1. **Criação Automática de Pendências**
- Função `carregarPendenciasSupabase()` busca TODAS as matérias e avaliações
- Cria automaticamente registros na tabela `pendencias` para cada campo PENDENTE
- APENAS campos com valor são inseridos (sem NULLs desnecessários)
- Campo `materia_descricao` preenchido automaticamente com `materia.descricao` (não `nome`)

#### 2. **Descrições Automáticas**
Pendências são criadas com descrições claras:

**MATÉRIAS:**
- `status_criacao_avaliacao` → "Criar avaliação"
- `status_plano_aula` → "Criar plano de aula"
- `status_plano_ensino` → "Criar plano de ensino"
- Formato final: `"Descrição — Nome da Matéria"`

**AVALIAÇÕES:**
- `status_avaliacao` → "Completar avaliação"
- `status_gabarito` → "Criar gabarito"
- `status_revisao` → "Revisar avaliação"
- `status_cadastro_sgn` → "Cadastrar no SGN"
- `acompanhamento_pedagogico_sgn` → "Acompanhamento pedagógico"
- Formato final: `"Descrição — Nome da Avaliação"`

#### 3. **Sincronização Bidirecional**
Quando pendência está com status = 'CONCLUIDO':
- Busca o campo correspondente na tabela de origem (materia ou avaliacao)
- **APENAS marca como CONCLUIDO o campo específico que estava PENDENTE**
- Não toca em campos NULL ou com outros valores

#### 4. **Interface de Pendências**
- **Botão Toggle (✓)**: Marcar pendência como CONCLUIDO/PENDENTE
  - Cinza quando PENDENTE
  - Verde quando CONCLUIDO
  - Primeiro botão em cada linha
- **Botão Editar (✏️)**: Editar descrição, datas, horas
- **Botão Excluir (🗑️)**: Remover pendência individual
- **Botão Excluir Todas (🗑️)**: Deleta TODAS as pendências com confirmação dupla

#### 5. **Campos da Tabela `pendencias`**
```sql
id (PK)
materia_id (FK não-nulo)
avaliacao_id (FK nulo se apenas matéria)
materia_descricao (VARCHAR)
descricao (TEXT)
status (VARCHAR: PENDENTE, CONCLUIDA, CANCELADA)
data (DATE)
datavencimento (DATE)
total_horas (NUMERIC)
horas_ministradas (NUMERIC)
status_criacao_avaliacao (VARCHAR: PENDENTE ou NULL)
status_plano_aula (VARCHAR: PENDENTE ou NULL)
status_plano_ensino (VARCHAR: PENDENTE ou NULL)
status_avaliacao (VARCHAR: PENDENTE ou NULL)
status_gabarito (VARCHAR: PENDENTE ou NULL)
status_revisao (VARCHAR: PENDENTE ou NULL)
status_cadastro_sgn (VARCHAR: PENDENTE ou NULL)
acompanhamento_pedagogico_sgn (VARCHAR: PENDENTE ou NULL)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

### 📋 Scripts SQL Necessários

1. **Criar tabela**: `sistema/scripts/001_criar_tabela_pendencias.sql`
2. **Adicionar colunas faltantes**: `sistema/scripts/003_add_columns_pendencias.sql`

Certifique-se de executar os scripts no Supabase SQL Editor!

### ⚡ Fluxo de Atualização Obrigatório

⚠️ **REGRA CRÍTICA**: A cada interação com o usuário, SEMPRE:
1. Executar `C:\Python314\python.exe -m graphify update .`
2. Atualizar este arquivo `CLAUDE.md` com:
   - Novas regras implementadas
   - Mudanças no estado do projeto
   - Estrutura de UCs
   - Status de ferramentas
3. Fazer commit de todas as alterações

Isso garante que futuras interações saibam das mudanças feitas e o projeto sempre esteja documentado corretamente.
