# 📚 CLAUDE.md — Sistema Completo SENAI — 6 Arquivos HTML

---

## 🚀 LEIA PRIMEIRO — Grafo de Conhecimento do Projeto

⚠️ **ANTES DE QUALQUER COISA, leia o relatório do grafo de conhecimento para entender a arquitetura completa:**

📄 **Arquivo:** `graphify-out/GRAPH_REPORT.md`  
📍 **Localização:** `C:\fontes\aulas-senai\graphify-out\GRAPH_REPORT.md`  
⚠️ **Atualizado em:** 2026-09-08 (7815 nós, 7762 arestas, 672 comunidades)

Este relatório contém:
- ✅ Visão geral da estrutura do projeto (7815 nós, 7762 arestas)
- ✅ Comunidades de código (672 clusters)
- ✅ Dependências entre arquivos
- ✅ Padrões de arquitetura
- ✅ Hot spots (arquivos críticos)
- ✅ Mapa completo de navegação

**Por quê?** O GRAPH_REPORT fornece uma análise automática de toda a codebase, enquanto este CLAUDE.md documenta os 6 arquivos HTML principais. Juntos, oferecem visão 360° do projeto.

---

## 🌍 Visão Geral

**Localização:** `C:\fontes\aulas-senai\sistema\`  
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

#### 🔐 Conteúdo Principal

**Legislação (Conformidade):**
- ✅ LDB 9.394/96 (Art. 41)
- ✅ Decreto 8.540/2015
- ✅ CNE/CEB Resolução 6/2012 (Art. 11)
- ✅ ABNT NBR ISO/IEC 17024

**10 Provas (detalhes para cada):**

| # | Prova | Tipo | Tempo | Peso |
|---|-------|------|-------|------|
| 1 | Objetiva | Teórico | 60 min | 8% |
| 2 | Discursiva | Teórico | 60 min | 8% |
| 3 | Estudo de Casos | Teórico | 90 min | 9% |
| 4 | Projeto Orientado | Prático | 6h | 15% |
| 5 | Exercício Fechado | Prático | 3h | 12% |
| 6 | Troubleshooting | Prático | 2h | 10% |
| 7 | Live Coding | Prático | 90 min | 8% |
| 8 | Apresentação Técnica | Prático | 30 min | 5% |
| 9 | Portfólio Profissional | Experiencial | Livre | 8% |
| 10 | Entrevista Estruturada | Experiencial | 45 min | 7% |

**Plataformas Recomendadas:**
- Credly (Badging)
- Accredible (Certificados)
- Canvas (LMS)
- Pearson Vue (Testes)
- GitHub (Portfolio técnico)
- SENAI (Brasil)
- e outras 11+

---

### 6️⃣ **visualizador-central-aulas-pendentes.html** — Central de Aulas Pendentes

#### 📊 Especificações
- **Linhas:** ~413
- **Tamanho:** ~11 KB
- **Responsividade:** 1 col (mobile) → 3 cols (desktop)

#### 🎯 Propósito
Painel dedicado para professores visualizar:
- Aulas ainda a lecionar (encontros 1-N)
- Status de carga horária cumprida
- Plano detalhado por UC
- Modal interativo com iframe

#### 🏗️ Estrutura
```
visualizador-central-aulas-pendentes.html
├─ Header
│  ├─ Título "📚 Visualizador Central — Aulas Pendentes"
│  └─ Subtítulo "Selecione uma UC..."
│
├─ Info-box
│  └─ "ℹ️ Clique em qualquer card abaixo..."
│
├─ Grid de UCs (responsiva)
│  └─ Para cada UC com aulas pendentes:
│     ├─ .uc-card (onclick → abre modal)
│     │  ├─ .uc-header (gradiente azul)
│     │  │  ├─ Badge "ENCONTROS 1-3"
│     │  │  ├─ Nome UC
│     │  │  └─ Bloco (ex: "Bloco 1 — Tecnologia")
│     │  │
│     │  └─ .uc-body
│     │     ├─ Status badge (amarelo com número de horas)
│     │     ├─ Linha: Carga Horária Total
│     │     ├─ Linha: Já Lecionado (% visual)
│     │     ├─ Linha: Próximo Encontro
│     │     └─ Button "🔍 Visualizar Plano"
│
└─ Modal (overlay)
   ├─ .modal-header
   │  ├─ Título dinâmico
   │  └─ Button "✕" fechar
   │
   └─ .iframe-container
      └─ <iframe src="FICHA-PRODUTO-MAIS-TECH/{pasta}/...">
```

#### 🔧 Dados Hardcoded

```javascript
const ucs = [
  {
    nome: "Fundamentos da Tecnologia e Programação",
    pasta: "FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO",
    ch: 33,
    bloco: "Bloco 1 — Tecnologia e Mundo Digital",
    icon: "💻",
    pendentes_arquivo: "visualizador-aulas-pendentes.html",
    aulas_lecionadas: 8,
    aulas_pendentes: 6
  }
];
```

#### 💾 Armazenamento

- **Dados:** Hardcoded em JavaScript (sem Supabase)
- **Modal:** Carrega iframe com caminho relativo
- **Acesso:** Qualquer usuário (sem verificação de papel)

---

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

```sql
-- Autenticação
usuario (id, login_usuario, senha_hash, perfil)

-- Cursos e Matérias
curso (id, nome, icone, cor, descricao, status, ensalado, criado_em)
cursomateria (id, curso_id, materia_id, ordem)
materia (
  id, 
  descricao,            ⚠️ NÃO 'nome' — coluna se chama 'descricao'
  codigo, 
  unidade_curricular_id,
  ativo,
  ementa_caminho,
  apostila_caminho,
  conteudo_aulas (JSONB),
  status_criacao_avaliacao,
  status_plano_aula,
  status_plano_ensino,
  ensalado,
  created_at,
  updated_at,
  ementa_gerada
)

-- Aulas
aula (id, materia_id, titulo, conteudo, ordem, criado_em)

-- Validação
validacao_competencias (id, aluno_id, disciplina_id, prova_1..._10, nota_final, status)
```

### 🐛 Correção: Referência a materia.nome

**Status:** ✅ CORRIGIDO em 2026-09-08

**Problema:** Arquivo `sistema/js/materia.js` estava usando `materia.nome` em queries SQL e JavaScript, mas a coluna real é `materia.descricao`.

**Erro original:**
```
{"code":"42703","message":"column materia.nome does not exist"}
```

**Arquivos corrigidos:**
- ✅ `sistema/js/materia.js` — Linhas 9, 24, 40, 46, 77, 100

**Mudanças:**
- `select=*&order=nome` → `select=*&order=descricao`
- `m.nome` → `m.descricao` (em todas as referências)
- Campo POST: `nome` → `descricao`

**Commit:** `05bf123` (2026-09-08)

---

## 🎨 Design System

### Paleta de Cores

| Contexto | Cor | Hex |
|----------|-----|-----|
| Primary (Header/Buttons) | Azul SENAI | #004384 |
| Secondary | Laranja Destaque | #f7941d |
| Success | Verde | #2e7d32 |
| Error | Vermelho | #c62828 |
| Warning | Amarelo/Laranja | #e65100 |
| Background Light | Cinza Claro | #e8eaed |
| Background Dark | Quase Preto | #0e1117 |

### Typography

- **Sans-serif:** "Google Sans", Roboto, Arial
- **Tamanhos:** 10px (label) → 52px (hero)
- **Weight:** 500 (normal) → 700/800 (bold/extra-bold)

### Responsive Breakpoints

- **Mobile:** ≤640px (1 col)
- **Tablet:** 641–900px (2 cols)
- **Desktop:** ≥900px (2-3 cols)

---

## 🔐 Segurança

### localStorage
- `senai_role` — define acesso (ALUNO/PROFESSOR)
- `senai_login` — timestamp para validação de sessão
- `senai_tema` — preferência do usuário
- **Sensibilidade:** Baixa (dados públicos)

### Supabase RLS Policies
- Alunos: `SELECT` apenas cursos com `ensalado=true`
- Professores: `SELECT, INSERT, UPDATE, DELETE` em tudo
- Hash de senha: SHA-256 (professor) ou hash pré-computado (aluno)

### HTTPS & CSP
- ✅ Toda comunicação com Supabase é HTTPS
- ✅ Nenhum dado sensível em URL
- ⚠️ localStorage limpo ao fazer logout

---

## 📊 Checklist: Como Usar

### Primeiro Acesso

- [ ] Abrir `index.html`
- [ ] Fazer login (aluno / professor)
- [ ] Verificar localStorage no DevTools (senai_role, senai_tema)
- [ ] Ser redirecionado a `dashboard.html`

### Fluxo Aluno

- [ ] Ver cursos (apenas ensalados)
- [ ] Clique em curso → navega para pasta UC
- [ ] Acompanhar barra de progresso
- [ ] Visitar `questionarios.html` para responder avaliações
- [ ] Consultar `validacao.html` para entender estrutura de provas
- [ ] Logout: "Sair"

### Fluxo Professor

- [ ] Dashboard: criar/editar/deletar cursos
- [ ] Adicionar UCs (com matérias do Supabase)
- [ ] Editar plano de ensino (markdown → preview)
- [ ] uc.html: implementar checklist docente (38 itens)
- [ ] uc.html: conferência de pendências (análise Supabase)
- [ ] questionarios.html: gerenciar avaliações
- [ ] visualizador-central-aulas-pendentes.html: acompanhar aulas restantes
- [ ] Logout quando terminar

---

## 🐛 Troubleshooting

| Problema | Causa | Solução |
|----------|-------|--------|
| Redireciona a index.html | senai_role inválido | Fazer logout + login |
| Grid vazio | localStorage corrompido | F5 (refresh) |
| Cards bloqueados não aparecem | Filter toggle ativo | Desativar em dashboard |
| Modal de matérias vazio | Sem matérias no Supabase | Adicionar via Supabase console |
| Tema não persiste | Cookie policy | Ajustar privacidade browser |
| Erro Supabase 401 | API Key expirada | Verificar em Supabase console |

---

## 📞 Informações

**Proprietário:** Professor Gelvazio Camargo  
**Email:** gelvazio@gmail.com  
**Última Atualização:** 2026-09-08  
**Versão:** 1.1 (Production — Correção de schema materia)  
**Projeto:** SENAI — Técnico de Informática para Internet  
**Público-alvo:** Alunos 15–17 anos + Professores  
**Grafo:** 7815 nós, 7762 arestas, 672 comunidades (atualizado 2026-09-08)

---

## 🔗 Referências Externas

- [Supabase REST API](https://supabase.com/docs/guides/api)
- [Marked.js (Markdown Parser)](https://marked.js.org/)
- [Google Forms API](https://developers.google.com/forms/api)
- [ABNT NBR ISO/IEC 17024](https://www.abnt.org.br)
- [CNE/CEB Resolução 6/2012](http://portal.mec.gov.br)

---

**NOTA:** Este sistema é **multi-página, multi-papel (aluno/professor) e data-driven (Supabase)**. Cada arquivo HTML é independente mas integrado via navegação e localStorage compartilhado. Não há backend em Node.js — tudo é cliente-side (SPA).
