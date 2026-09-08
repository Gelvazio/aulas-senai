# 📚 CLAUDE.md — Sistema Completo SENAI — 6 Arquivos HTML

---

## 🚨 REGRA CRÍTICA — SEMPRE CONSULTAR `docs/` ANTES DE MODIFICAR

⚠️ **DE SUMA IMPORTÂNCIA — OBRIGATÓRIO EM CADA INTERAÇÃO**

**ANTES de modificar QUALQUER arquivo neste projeto**, você DEVE:

1. ✅ **Verificar se existe documentação** em `docs/ORIENTACAO_*.md`
2. ✅ **LER COMPLETAMENTE** a orientação correspondente
3. ✅ **APLICAR TODAS AS REGRAS** documentadas
4. ✅ **CONSULTAR `database.md`** se envolver schema/banco de dados
5. ✅ **Só então modificar** o arquivo

### 📁 Documentação Disponível

#### Em `docs/`
| Documento | Usa quando | Prioridade |
|-----------|-----------|-----------|
| **ORIENTACAO_JS_LOGIN.md** | Editar autenticação | 🔴 **CRÍTICA** |
| **ORIENTACAO_JS_SUPABASE.md** | Editar queries Supabase | 🔴 **CRÍTICA** |
| **ORIENTACAO_USUARIO.md** | Editar auth.users vinculação | 🔴 **CRÍTICA** |
| **ORIENTACAO_JS_AULAS.md** | Editar `js/aulas.js` | 🟠 Padrão |
| **ORIENTACAO_JS_CURSO.md** | Editar `js/curso.js` | 🟠 Padrão |
| **ORIENTACAO_JS_MATERIA.md** | Editar `js/materia.js` | 🟠 Padrão |
| **ORIENTACAO_JS_UNIDADE.md** | Editar `js/unidade.js` | 🟠 Padrão |
| **database.md** | Consultar schema | 🟡 Referência |
| **relatorio_verificacao_database.html** | Ver schema visualmente | 🟡 Referência |

#### Em `bugs/`
| Documento | Usa quando | Prioridade |
|-----------|-----------|-----------|
| **bug-*.md** | Corrigir um bug identificado | 🟣 Resolução |

### ✅ Checklist Antes de Qualquer Modificação

```
☐ Identifiquei o arquivo a modificar (ex: aulas.js)
☐ Procurei a documentação correspondente (ex: ORIENTACAO_JS_AULAS.md)
☐ A documentação existe? Sim → Leia COMPLETAMENTE
☐ Entendi todas as regras e restrições da documentação
☐ Estou pronto para modificar CORRETAMENTE
```

---

## 📖 Documentação de Orientação JavaScript

⚠️ **Orientações de cada arquivo JavaScript**

Para cada arquivo em `sistema/js/*.js`, existe uma **orientação correspondente** em `sistema/docs/`:

```
sistema/js/
├── curso.js              → docs/ORIENTACAO_JS_CURSO.md
├── aulas.js              → docs/ORIENTACAO_JS_AULAS.md
├── materia.js            → docs/ORIENTACAO_JS_MATERIA.md
├── login.js              → docs/ORIENTACAO_USUARIO.md ⚠️ LEIA ANTES!
├── supabase.js           → docs/ORIENTACAO_JS_SUPABASE.md
└── unidade.js            → docs/ORIENTACAO_JS_UNIDADE.md
```

**Regra:** Toda orientação referente a um arquivo `xxx.js` estará no arquivo `ORIENTACAO_JS_XXX.md` correspondente na pasta `docs/`.

✅ **Consulte a orientação antes de modificar qualquer arquivo JavaScript**

---

## 🔐 REGRA CRÍTICA — AUTENTICAÇÃO COM SUPABASE AUTH

⚠️ **ANTES de modificar `js/login.js`, `index.html` ou `js/supabase.js`, LEIA:**

📄 **Arquivo obrigatório:** `docs/ORIENTACAO_USUARIO.md`

**O que está documentado:**
- ✅ Fluxo de autenticação com Supabase Auth (não manual)
- ✅ Vínculo entre `auth.users` (Supabase) e tabela `usuario`
- ✅ Estrutura de dados (campos corretos/incorretos)
- ✅ Erros comuns e soluções
- ✅ RLS policies necessárias

**Checklist antes de editar autenticação:**
- [ ] Li `docs/ORIENTACAO_USUARIO.md` completamente
- [ ] Entendo o vínculo entre `auth.users` e `usuario`
- [ ] Não estou adicionando campos como `ativo`, `criado_em`, `senha_hash`
- [ ] Estou usando `supabase.auth.signInWithPassword()` ou `signUp()`
- [ ] Estou usando `data.user.id` ao vincular com tabela `usuario`

---

## 🔒 REGRA CRÍTICA — SEGURANÇA: RLS + JWT Token

⚠️ **TODA requisição ao Supabase DEVE:**
1. ✅ Usar JWT do usuário autenticado (NÃO chave de serviço)
2. ✅ Passar via header `Authorization: Bearer <token>`
3. ✅ A tabela correspondente DEVE ter RLS habilitado
4. ✅ RLS policies DEVEM validar `auth.uid()`

**Implementação obrigatória em `js/supabase.js`:**

```javascript
async function sbH() {
  const headers = {
    apikey: SUPABASE.KEY,
    "Content-Type": "application/json",
  };

  // 🔑 CRÍTICO: Usar JWT do usuário autenticado
  const session = await supabase.auth.getSession();
  if (session?.data?.session?.access_token) {
    headers.Authorization = "Bearer " + session.data.session.access_token;
  } else {
    headers.Authorization = "Bearer " + SUPABASE.KEY; // fallback
  }

  return headers;
}
```

**Exemplo RLS Policy:**
```sql
ALTER TABLE "usuario" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "usuarios_veem_seus_dados"
ON "usuario"
FOR SELECT
TO authenticated
USING (id = auth.uid());
```

**Checklist de Segurança:**
- [ ] `js/supabase.js` usa JWT token do usuário?
- [ ] TODAS as tabelas com dados sensíveis têm RLS?
- [ ] RLS policies validam `auth.uid()`?
- [ ] Um aluno/professor não pode acessar dados de outro?

📄 **Referência completa:** `docs/ORIENTACAO_USUARIO.md`

---

## 🔄 REGRA CRÍTICA — ATUALIZAR RELATORIO AO MEXER EM DATABASE.MD

⚠️ **Sempre que modificar `sistema/docs/database.md`, DEVE atualizar:**
- 📄 `sistema/docs/relatorio_verificacao_database.html` (arquivo visual)

**Ordem de atualização (OBRIGATÓRIA):**
1. ✅ Modificar `database.md` (fonte primária)
2. ✅ Atualizar `relatorio_verificacao_database.html` com as mudanças
3. ✅ Commitar ambos os arquivos juntos

**Por quê?** O HTML é um derivado de database.md. Sem sincronização, eles se desincronizam e a documentação fica inútil.

**Checklist ao mexer em database.md:**
- [ ] Editei `database.md` (mudanças nos campos/tabelas)
- [ ] Atualizei `relatorio_verificacao_database.html` (tabelas, campos refletem o banco)
- [ ] Ambos os arquivos foram commitados com mensagem descritiva

---

## 🚀 LEIA PRIMEIRO — Grafo de Conhecimento do Projeto

⚠️ **ANTES DE QUALQUER COISA, leia o relatório do grafo de conhecimento para entender a arquitetura completa:**

📄 **Arquivo:** `graphify-out/GRAPH_REPORT.md`  
📍 **Localização:** `C:\fontes\aulas-senai\graphify-out\GRAPH_REPORT.md`  
⚠️ **Atualizado em:** 2026-09-08 (7678 nós, 7612 arestas, 640 comunidades)

Este relatório contém:
- ✅ Visão geral da estrutura do projeto (7678 nós, 7612 arestas)
- ✅ Comunidades de código (640 clusters)
- ✅ Dependências entre arquivos
- ✅ Padrões de arquitetura
- ✅ Hot spots (arquivos críticos)
- ✅ Mapa completo de navegação

**Por quê?** O GRAPH_REPORT fornece uma análise automática de toda a codebase, enquanto este CLAUDE.md documenta os 6 arquivos HTML principais. Juntos, oferecem visão 360° do projeto.

---

## 🌍 Visão Geral

**Localização:** `C:\fontes\aulas-senai\`  
**Arquivos:** 6 páginas HTML + Supabase backend  
**Tipo:** Aplicação web multiplataforma (aluno/professor)  
**Framework:** HTML5 + CSS3 + JavaScript Vanilla  
**Backend:** Supabase (REST API + PostgreSQL)  
**Público:** Alunos (15–17 anos) e Professores  

---

## 📍 Fluxo de Navegação

```
┌─────────────────────────────────────────────────────────────┐
│ index.html (PORTA DE ENTRADA)                               │
│ - Login com tema claro/escuro                               │
│ - Autenticação Supabase (usuário + senha)                   │
│ - Armazena role em localStorage                             │
└────────────────────┬────────────────────────────────────────┘
                     │ OK: Login bem-sucedido
                     ▼
        ┌────────────────────────────┐
        │ PERFIL ALUNO 👨‍🎓             │    PERFIL PROFESSOR 👨‍🏫
        │                            │                          │
        ├─► dashboard.html           ├─► dashboard.html ◄─────┘
        │   - Cursos (read-only)      │   - Cursos (CRUD)
        │   - Progresso              │   - Editar/duplicar
        │   - Acessar UCs            │   - Admin mode
        │                            │
        ├─► uc.html (opcional)       ├─► uc.html (PRINCIPAL)
        │   - Visualizar UCs         │   - Gerenciar UCs
        │   - Expandir conteúdo      │   - Vincular matérias
        │                            │   - Checklist docente
        │                            │
        ├─► questionarios.html       ├─► questionarios.html
        │   - Responder provas       │   - Gerenciar provas
        │   - Ver gabarito           │   - Adicionar questões
        │   - Consultar scripts      │   - Criar formulários
        │                            │
        └─► validacao.html           ├─► validacao.html
            - Informações gerais     │   - Protocolo completo
            - Estrutura de provas    │   - Documentação RPL
            - Plataformas de cert.   │
                                     │
                                     ├─► visualizador-central-aulas-pendentes.html
                                     │   - Aulas ainda a lecionar
                                     │   - Plano por UC
                                     │   - Modal interativo
```

---

## 📄 Descrição Detalhada de Cada Arquivo

### 1️⃣ **index.html** — Portal de Login

#### 📊 Especificações
- **Linhas:** ~370
- **Tamanho:** ~12 KB
- **Tema:** Compacto, elegante, minimalista
- **Responsividade:** Totalmente responsivo (mobile-first)

#### 🎯 Propósito
Autenticação de usuários (aluno/professor) com:
- Card branco centralizado
- Tema claro/escuro (toggle 🌙/☀️)
- Validação de credenciais contra Supabase
- Spinner de carregamento
- Mensagens de erro claras

#### 🏗️ Estrutura
```html
<body style="background: #004384">
  <div class="card">
    ├─ .card-header (gradiente azul)
    │  ├─ Logo "SENAI"
    │  ├─ Título "SENAI e Tecnologia 3.0"
    │  └─ Subtítulo "UC1 — Introdução..."
    │
    ├─ .card-body
    │  ├─ Dropdown "Perfil de acesso" (ALUNO | PROFESSOR)
    │  ├─ Input "Senha do Professor" (condicional)
    │  ├─ Button "Entrar"
    │  └─ div.spinner (loading)
    │
    └─ .footer
       ├─ Crédito "Professor Gelvazio"
       └─ Button tema (🌙/☀️)
```

#### 🔐 Lógica de Autenticação

```javascript
// Caso ALUNO:
const HASH_ALUNO = "a21d6f3803f0491c32444ef91a0836be243cc4da5186357e805b7009a5b0669b";
// SHA-256 pré-computado

// Caso PROFESSOR:
const hash = await sha256(inputSenha); // Calcula SHA-256 em tempo real

// Query Supabase:
GET /rest/v1/usuario?login_usuario=eq.{role}&senha_hash=eq.{hash}&select=perfil

// Se encontrado:
localStorage.setItem("senai_role", rows[0].perfil);    // "ALUNO" | "PROFESSOR"
localStorage.setItem("senai_login", Date.now());       // timestamp
window.location.href = "dashboard.html";               // Redireciona
```

#### 🎨 Tema
- **Header:** Gradiente azul (#004384 → #0055b3)
- **Card:** Branco com sombra, border-radius 12px
- **Tema Escuro:** `[data-theme="dark"]` altera fundo, inputs, texto
- **Acessibilidade:** Contraste WCAG AAA

---

### 2️⃣ **dashboard.html** — Hub Central de Gerenciamento

#### 📊 Especificações
- **Linhas:** 7.004 (MAIOR arquivo)
- **Tamanho:** ~322 KB
- **Tipo:** SPA (Single Page Application)
- **Responsividade:** 2 colunas (desktop) → 1 coluna (mobile)

#### 🎯 Propósito
Portal central pós-login com:
- **Aluno:** Visualizar cursos, acompanhar progresso, acessar UCs
- **Professor:** CRUD de cursos/UCs, editar planos, gerenciar aulas

#### 🏗️ Arquitetura
```
dashboard.html
├─ Header
│  ├─ Logo SENAI → dashboard.html
│  ├─ Título "Dashboard de Cursos"
│  ├─ Botão Tema 🌙/☀️
│  └─ Badge Perfil (ALUNO/PROFESSOR)
│
├─ Hero
│  ├─ Badge "🎓 Aluno" ou "👨‍🏫 Professor"
│  ├─ Título "Dashboard de Cursos"
│  └─ Subtítulo explicativo
│
├─ Section: Grid de Cursos
│  └─ Cards 2 cols (desktop) / 1 col (mobile)
│     ├─ .card-thumb (emoji + cor)
│     ├─ .card-body
│     │  ├─ Tipo "CURSO 01"
│     │  ├─ Título (nome do curso)
│     │  ├─ Descrição
│     │  └─ Tags ("2 UCs", "33h")
│     │
│     ├─ .card-footer
│     │  ├─ Barra de progresso (aluno)
│     │  └─ Button "Acessar" (aluno) | "Editar" (prof)
│     │
│     └─ .card-edit (professor only)
│        ├─ Button "📋 Aulas"
│        └─ Button "✏️ Editar"
│
└─ Modais (Professor Only)
   ├─ Modal Novo Curso
   ├─ Modal Nova UC
   ├─ Modal Aulas da UC
   ├─ Modal Matérias
   ├─ Modal Checklist Docente
   ├─ Modal Plano de Ensino (markdown editor + preview)
   ├─ Modal Conferência (análise de pendências)
   └─ Modal Duplicar Curso
```

#### 🔧 Funcionalidades

**ALUNO:**
- ✅ Visualizar cursos (apenas os com `ensalado=true`)
- ✅ Ver progresso (barra percentual)
- ✅ Clique → navega para pasta UC
- ✅ Tema claro/escuro
- ✅ Logout

**PROFESSOR:**
- ✅ Criar curso (nome, ícone emoji, cor hex)
- ✅ Editar curso
- ✅ Duplicar curso (copia tudo: UC, aulas, matérias)
- ✅ Deletar curso (com confirmação)
- ✅ Criar/editar/deletar UCs
- ✅ Vincular matérias do Supabase
- ✅ Editar plano de ensino (markdown com preview)
- ✅ Gerenciar aulas (CRUD)
- ✅ Visualizar checklist docente (38 itens × 4 fases)
- ✅ Conferência de pendências (Supabase + localStorage)
- ✅ Toggle "Admin" (modo avançado)
- ✅ Exportar cursos (CSV/JSON)

#### 💾 Dados no localStorage

```javascript
senai_role           // "ALUNO" | "PROFESSOR"
senai_tema           // "light" | "dark"
senai_login          // timestamp
senai_cursos_v2      // JSON.stringify(cursos[])
senai_checklist_v1   // JSON.stringify({ ucId: { itemId: bool } })
senai_visibilidade   // JSON.stringify({ cursoId: bool })
```

#### 📊 Tabelas Supabase Utilizadas

| Tabela | Usado por | Operações |
|--------|-----------|-----------|
| `curso` | Dashboard | SELECT, INSERT, UPDATE, DELETE |
| `cursomateria` | Dashboard, uc.html | SELECT, INSERT, DELETE |
| `aula` | Dashboard, uc.html | SELECT, INSERT, UPDATE, DELETE |
| `materia` | Dashboard | SELECT (read-only para alunos) |
| `usuario` | index.html | SELECT (autenticação) |
| `validacao_competencias` | validacao.html | SELECT (informativo) |

---

### 3️⃣ **uc.html** — Gerenciador de Unidades Curriculares

#### 📊 Especificações
- **Linhas:** ~1.040
- **Tamanho:** ~322 KB (lido parcialmente)
- **Responsividade:** Totalmente responsivo
- **Acesso:** Professor (redirect se não-professor)

#### 🎯 Propósito
Interface dedicada a:
- Visualizar e gerenciar UCs de um curso
- Associar matérias
- Implementar checklist docente (38 itens)
- Conferência de pendências (análise de conformidade)

#### 🏗️ Estrutura
```
uc.html
├─ Header
│  ├─ Logo SENAI → dashboard.html (botão voltar)
│  ├─ Título "Cursos e Unidades Curriculares"
│  ├─ Botão "🔍 Conferência" (badge com pendências)
│  ├─ Button "+ Novo Curso"
│  └─ Button "← Voltar"
│
├─ Hero
│  ├─ Badge "📚 Professor"
│  ├─ Título
│  └─ Subtítulo "Acesse e gerencie suas UCs..."
│
├─ Seção: Grid de Cursos
│  └─ Para cada curso:
│     ├─ .curso-section (expandível)
│     │  ├─ .curso-header
│     │  │  ├─ Barra colorida (left: 5px)
│     │  │  ├─ Ícone emoji
│     │  │  ├─ Nome do curso
│     │  │  ├─ Contagem de UCs
│     │  │  └─ Button "+ Nova UC"
│     │  │
│     │  └─ .uc-content (grid 2 cols)
│     │     └─ Para cada UC:
│     │        ├─ .uc-card
│     │        │  ├─ .uc-card-top (cor da UC)
│     │        │  ├─ .uc-card-body
│     │        │  │  ├─ Ícone
│     │        │  │  ├─ Nome UC
│     │        │  │  ├─ Pasta (monospace)
│     │        │  │  └─ Badges:
│     │        │  │     ├─ ✓ AULAS / ✗ AULAS
│     │        │  │     ├─ ✓ MATERIAIS / ✗ MATERIAIS
│     │        │  │     └─ ⏳ N pendentes
│     │        │  │
│     │        │  └─ .uc-card-footer
│     │        │     ├─ Status (dot color + texto)
│     │        │     ├─ Button "📋 Checklist"
│     │        │     ├─ Button "Acessar" ou "⚠️ Incompleta"
│     │        │     └─ Button "🗑️ Deletar" (custom only)
│
└─ Modais (Professor)
   ├─ Modal Novo Curso
   ├─ Modal Nova UC
   ├─ Modal Checklist (com progresso 0-38 itens)
   └─ Modal Conferência (status gráfico de UCs)
```

#### 🔧 Funcionalidades

**Checklist Docente (38 itens × 4 fases):**

| Fase | Itens | Descrição |
|------|-------|-----------|
| 1. Planejamento | 13 | Antes da UC: email tutor, materiais, ensalamento, adaptação |
| 2. Execução | 11 | Durante aulas: mediação, docência ativa, frequência |
| 3. Acompanhamento | 8 | Ao término: correção, feedback, registro pedagógico |
| 4. Fechamento | 6 | Ao final: atas, notas, conselho de classe |

**Conferência de Pendências:**
- Integra dados do Supabase (tabela `materia` + `validacao_competencias`)
- Mostra quantos itens pendentes por UC
- Barra de progresso visual (% concluído)

#### 💾 Dados Supabase Consultados

```sql
SELECT * FROM curso WHERE ensalado=true;
SELECT * FROM cursomateria WHERE curso_id=?;
SELECT * FROM materia WHERE unidade_curricular_id=?;
SELECT * FROM validacao_competencias WHERE ensalado=true;
SELECT status_criacao_avaliacao, status_plano_aula, status_plano_ensino FROM materia;
```

---

### 4️⃣ **questionarios.html** — Avaliações e Questionários

#### 📊 Especificações
- **Linhas:** ~278
- **Tamanho:** ~8 KB
- **Responsividade:** Grid 3 cols (desktop) → 2 → 1 col (mobile)

#### 🎯 Propósito
Portal de questionários com:
- **Aluno:** Responder provas, ver gabarito
- **Professor:** Gerenciar formas, criar com Google Apps Script

#### 🏗️ Estrutura
```
questionarios.html
├─ Header
│  ├─ Logo SENAI → dashboard.html
│  ├─ Título "Questionários e Avaliações — UC1"
│  ├─ Badge Perfil
│  ├─ Button "🏠 Início"
│  ├─ Button "🔑 Códigos" → codigos.html
│  └─ Button "🚪 Sair" (prof only)
│
├─ Hero/Seção
│  └─ Grid de 3 cards (avaliações)
│     ├─ Card 1: "🖥️ História da Computação"
│     │  ├─ 27 questões
│     │  ├─ Múltipla escolha
│     │  ├─ Button "📝 Responder Questionário" (link externo)
│     │  ├─ Button "✅ Respostas" (prof only, abre modal gabarito)
│     │  └─ Button "📥 Banco GIFT (AVA SENAI)" (prof only, download)
│     │
│     ├─ Card 2: "💻 Iniciando no Chromebook"
│     │  └─ (similar)
│     │
│     └─ Card 3: "💬 Elementos da Comunicação (Aula 02)"
│        └─ Status: "🔒 Questionário disponível em breve"
│
└─ Modal Gabarito (prof only, expandível)
   └─ Grid 5 colunas de respostas
      └─ Cada célula: Q## + Letra (A-E)
```

#### 🔧 Funcionalidades

**ALUNO:**
- ✅ Ver formulários Google disponíveis
- ✅ Clique → abre form em nova aba
- ✅ Responde e submete via Google Forms

**PROFESSOR:**
- ✅ Ver scripts path para cada avaliação
- ✅ Abrir Google Apps Script para criar forms
- ✅ Modal gabarito com 27 questões pre-preenchidas
- ✅ Download de banco de questões (formato GIFT)

#### 📝 Estrutura de Card

```html
<div class="card">
  <div class="card-header card-header-azul">
    <span class="card-icon">🖥️</span>
    <div class="card-meta">
      <div class="card-tag">Avaliação objetiva</div>
      <div class="card-titulo">História da Computação</div>
    </div>
  </div>
  <div class="card-body">
    <div class="card-info">
      <span class="badge badge-blue">27 questões</span>
      <span class="badge badge-orange">Múltipla escolha</span>
    </div>
    <p class="card-desc">Surgimento e Gerações, Como funciona um PC...</p>
    <div class="card-actions">
      <div class="steps prof-only">
        <div class="step"><span class="step-num">1</span>Abra script</div>
        <div class="step"><span class="step-num">2</span>Execute função</div>
      </div>
      <a class="btn btn-primary" href="...">📝 Responder</a>
      <button class="btn btn-secondary prof-only">✅ Respostas</button>
    </div>
  </div>
</div>
```

---

### 5️⃣ **validacao.html** — Protocolo de Validação de Competências

#### 📊 Especificações
- **Linhas:** ~1.770 (SEGUNDO MAIOR)
- **Tamanho:** ~85 KB
- **Tipo:** Documento interativo (seções com tabs)
- **Responsividade:** Totalmente responsivo

#### 🎯 Propósito
Documentação completa e navegável sobre:
- 10 tipos de provas (teórica, prática, experiencial)
- Matriz de pesos (25% + 50% + 15% = 100%)
- Comissão avaliadora (5 pessoas, responsabilidades)
- Calendário de execução (2-3 semanas)
- Banco de dados Supabase (schema)
- Checklist de implementação
- Plataformas de validação (Credly, Canvas, GitHub, etc)

#### 🏗️ Navegação

```
validacao.html
├─ Header
│  └─ Título "🎓 Protocolo Completo de Validação de Competências"
│
├─ Nav (sticky, 9 abas)
│  ├─ 📋 Introdução
│  ├─ ⚖️ Legislação
│  ├─ 🔍 10 Tipos de Provas
│  ├─ 📊 Matriz de Pesos
│  ├─ 🏢 Comissão
│  ├─ 📅 Calendário
│  ├─ 💾 Banco de Dados
│  ├─ ✅ Checklist
│  └─ 🌐 Plataformas
│
├─ Container
│  └─ 9 Seções (visibilidade condicional)
│     ├─ Seção 0: Introdução
│     ├─ Seção 1: Legislação (CNE/CEB, ABNT, Decreto, LDB)
│     ├─ Seção 2: Provas (3 teóricas + 5 práticas + 2 experienciais)
│     ├─ Seção 3: Matriz (tabela com pesos, fórmula cálculo)
│     ├─ Seção 4: Comissão (organograma, responsabilidades)
│     ├─ Seção 5: Calendário (timeline 2-3 semanas)
│     ├─ Seção 6: BD (schema SQL, estructura de pastas)
│     ├─ Seção 7: Checklist (35 itens com checkboxes)
│     └─ Seção 8: Plataformas (17 alternativas: Credly, Canvas, GitHub, etc)
│
└─ Footer
   └─ Crédito SENAI
```

## 🔗 Fluxo Completo de Navegação

```
┌─ Login: index.html
│  │ username + senha
│  └─► Supabase: valida usuario + hash
│      │ senai_role = "ALUNO" ou "PROFESSOR"
│      │ senai_login = timestamp
│      └─► localStorage
│
├─ Dashboard: dashboard.html
│  │ (porta de entrada principal)
│  ├─► Aluno:
│  │    └─ Visualiza cursos → Clique → Pasta UC (filesystem)
│  │
│  └─► Professor:
│       ├─ CRUD de cursos
│       ├─ Edita plano de ensino (markdown)
│       ├─ Gerencia aulas
│       ├─ Admin mode (checklist docente)
│       └─ Exporta dados
│
├─ UC.html (Professor)
│  │ (gerenciador avançado de UCs)
│  ├─ Exibe checklist (38 itens × 4 fases)
│  ├─ Conferência de pendências (Supabase)
│  └─ Vincular matérias
│
├─ Questionarios.html
│  │ (avaliações)
│  ├─ Aluno: Responder provas, ver gabarito
│  └─ Professor: Scripts, GIFT export
│
├─ Validacao.html
│  │ (documentação)
│  ├─ 9 seções navegáveis
│  └─ Protocolo RPL (Reconhecimento Prévio de Aprendizagem)
│
└─ Visualizador-Central-Aulas-Pendentes.html
   │ (aulas ainda a lecionar)
   └─ Modal interativo por UC
```

---

## 💾 Supabase: Tabelas Principais
Consulte docs/database.md 
# 📚 Instruções Claude — Aulas SENAI

## 🚀 REGRA CRÍTICA — COMMIT E PUSH

⚠️ **COMMIT E PUSH APENAS APÓS 20 CHATS/INTERAÇÕES**

### Como Funciona

1. **Contagem de Chats:** Cada mensagem do usuário = 1 chat
2. **Sem limite de edições:** Você pode editar e fazer `git add` quantas vezes quiser
3. **Após 20 chats:** Fazer commit e push OBRIGATORIAMENTE
4. **Antes de 20:** Não fazer commit automático

### Exemplo

```
Chat 1: Usuário: "Crie um arquivo"
        → Você: Cria o arquivo, faz git add, MAS NÃO COMMITA

Chat 2-19: Usuário: "Edite..."
           → Você: Edita, git add... (sem commit)

Chat 20: Usuário: "..."
         → Você: COMMIT E PUSH OBRIGATÓRIO ✅
         → Resetar contador para 0

Chat 21: Novo ciclo começa
```

### Exceções

❌ **NÃO APLICAR** quando:
- Usuário pedir commit/push explicitamente ("faça commit agora")
- Será último commit antes de entrega importante
- Usuário disser "só commit, sem push"

### Como Rastrear

- Conte cada `Chat X:` na conversa
- Ao atingir 20, faça commit + push
- Resete o contador imediatamente

---

## 📝 Outras Regras

✅ Tudo conforme `C:\Users\gelva\.claude\CLAUDE.md` (global)  
✅ Grafo: `graphify update .` após cada sessão  
✅ Documentação: `docs/<tarefa>.md` antes de implementar  
✅ Tabelas de resultado ao finalizar tarefas  

---

**Versão:** 1.0  
**Data:** 2026-09-08  
**Status:** ✅ Ativo

