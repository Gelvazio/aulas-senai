# 📚 CLAUDE.md — Dashboard de Cursos SENAI

## Visão Geral

**Arquivo:** `dashboard.html`  
**Localização:** `C:\fontes\aulas-senai\sistema\dashboard.html`  
**Tamanho:** 7.004 linhas  
**Tipo:** SPA (Single Page Application) interativa  
**Framework:** HTML5 + CSS3 + Vanilla JavaScript  
**Backend:** Supabase (REST API + PostgreSQL)  
**Público:** Alunos e Professores (interface adaptativa por papel)

---

## 🎯 Propósito

Dashboard central de **gestão de cursos, unidades curriculares (UCs), matérias e aulas** para o sistema SENAI Tecnico de Informática para Internet.

- **Para Alunos:** Visualizar cursos disponíveis, acessar aulas, acompanhar progresso
- **Para Professores:** Criar/editar cursos e UCs, gerenciar conteúdo didático, adicionar aulas, administrar estrutura acadêmica

---

## 🏗️ Arquitetura

### Camadas

```
┌─────────────────────────────────────┐
│       HTML / DOM (Body)             │  ← Layout estático + placeholders
├─────────────────────────────────────┤
│       CSS Inline (7KB inline)       │  ← Estilos responsivos + temas
├─────────────────────────────────────┤
│    Vanilla JavaScript (4KB+)        │  ← Lógica de aplicação
│  - Manipulação do DOM               │
│  - Gerenciamento de estado (localStorage, sessionStorage, objetos globais)
│  - Chamadas à API Supabase          │
├─────────────────────────────────────┤
│   Supabase REST API (Cloud)         │  ← Backend
│  - PostgreSQL (usuario, curso, ...)  │
│  - Autenticação                      │
│  - Real-time subscriptions          │
└─────────────────────────────────────┘
```

---

## 📱 Interface

### Seções Principais

#### 1. **Header**
- Logo SENAI (link para inicio)
- Título "SENAI — Dashboard de Cursos"
- Botão de tema (🌙/☀️)
- Badge de perfil (Aluno 👨‍🎓 / Professor 👨‍🏫)
- Botão "Sair"
- **Responsive:** Em mobile, alguns botões se movem para segunda linha

#### 2. **Hero Section**
- Gradiente azul (003068 → 004384 → 0055b3)
- Badge "🎓 Aluno" ou "👨‍🏫 Professor"
- Título da página
- Subtítulo explicativo
- Barra laranja de destaque inferior

#### 3. **Grid de Cards (Principal)**
- Layout responsivo: 2 colunas (desktop), 1 coluna (mobile)
- Cards de **cursos** com:
  - Ícone emoji + cor do curso
  - Título e descrição
  - Tags (ex: "2 UCs", "33h")
  - Badge de pendências (🔔 com número)
  - Barra de progresso (alunos)
  - Botão "Acessar" (aluno) ou "Editar" (professor)
  - **Animação de pulso** se houver pendências

#### 4. **Modais (Professor Only)**
- **Modal de Aulas:** CRUD de aulas por UC
- **Modal de Unidades:** CRUD de unidades por curso
- **Modal de Matérias do Curso:** Listar/ordenar matérias (Supabase)
- **Modal Plano de Ensino:** Editar documento markdown com preview

#### 5. **Filtros e Toggles (Professor Only)**
- Toggle "Ocultar Cursos Bloqueados"
- Toggle "Admin" (switch entre modo professor normal e admin)
- Botão "Exportar Kursos" (para CSV/JSON)

---

## 🔄 Fluxo de Dados

### Autenticação

1. Usuário passa por `index.html` (login)
2. `index.html` armazena em `localStorage`:
   - `senai_role`: "ALUNO" ou "PROFESSOR"
   - `senai_login`: timestamp
3. `dashboard.html` lê `localStorage.senai_role` e adapta interface

### Carregamento de Dados

```
┌─ DOMContentLoaded
│
├─ 1. Detectar papel (localStorage.senai_role)
│
├─ 2. Chamar Supabase:
│     GET /rest/v1/curso?select=*
│     GET /rest/v1/cursomateria?select=*
│     GET /rest/v1/aula?select=*
│
├─ 3. Processar dados localmente:
│     - Vincular materias → cursos
│     - Contar aulas por UC
│     - Calcular progresso
│
├─ 4. Renderizar grid de cards (renderCursos)
│
└─ 5. Inicializar listeners de modais
```

### Estado Global

O dashboard mantém estado em objetos JavaScript globais:

```javascript
let cursos = [];           // Array de cursos do Supabase
let cursosMateria = [];    // Vínculos curso-materia
let aulas = [];            // Aulas por UC
let cursoAtualEdicao = {}; // Curso selecionado para editar
let materiaEmEdicao = {};  // Materia selecionada

// localStorage
senai_role                 // "ALUNO" | "PROFESSOR"
senai_tema                 // "light" | "dark"
senai_visibilidade        // JSON: { cursoId: bool }
senai_login               // timestamp
```

---

## 🎨 CSS Destacado

### Breakpoints Responsivos

- **Desktop:** 900px+ (2 colunas, header completo)
- **Tablet:** 641–900px (grid adaptada, alguns botões ocultos)
- **Mobile:** ≤640px (1 coluna, header em 2 linhas, nav oculta)

### Temas

- **Light:** Fundo #e8eaed, texto escuro
- **Dark:** Fundo #0e1117, texto claro (via `[data-theme="dark"]`)
- Toggle com tema sistema (prefers-color-scheme)

### Animações

- **Hover de card:** `translateY(-2px)` + shadow maior
- **Pulso de pendências:** `scale + translateY` @ 2.8s
- **Transições:** 0.15–0.2s em cores, sombras, transforms

### Cards Especiais

- `.card.bloqueado`: opacidade 0.65, conteúdo desabilitado
- `.card.com-pendencias`: borda vermelha, animação de pulso
- `.card-pendencias`: badge absoluto (topo-direita) com número

---

## 🔧 Funcionalidades (JavaScript)

### Por Papel

#### **Aluno**
- Visualiza cursos e UCs disponíveis
- Clica "Acessar" → navega para a UC (pasta dentro de /sistema)
- Acompanha progresso (barra de progresso por curso)
- Alterna tema claro/escuro
- Faz logout ("Sair")

#### **Professor**
- Visualiza todos os cursos (bloqueados e ativos)
- **Criar Curso:** Modal com nome, ícone, cor
- **Editar Curso:** Modal para renomear, mudar ícone/cor
- **Duplicar Curso:** Copia curso + todas as UCs
- **Deletar Curso:** Com confirmação
- **Gerenciar UCs:** Modal para adicionar/editar/deletar UCs
- **Editar Plano de Ensino:** Editor markdown com preview
- **Administrar Aulas:** CRUD de aulas por UC
- **Vincular Matérias:** Associar matérias do Supabase a cursos
- **Toggle Admin:** Modo de administração avançada
- **Exportar:** Gera CSV/JSON dos cursos

### Funções Principais

| Função | Descrição |
|--------|-----------|
| `loadCursos()` | Busca cursos do Supabase, popula `cursos[]` |
| `renderCursos()` | Renderiza grid de cards a partir de `cursos[]` |
| `abrirModalCurso()` | Abre modal para criar/editar curso |
| `salvarCurso()` | POST/PUT curso ao Supabase |
| `deletarCurso()` | DELETE curso + aulas + vínculos (cascade) |
| `abrirModalUC()` | Modal para UC (dentro do curso selecionado) |
| `abrirModalMateria()` | Modal para listar matérias do Supabase |
| `abrirModalAulas()` | Modal para gerenciar aulas da UC |
| `abrirPlanoEnsino()` | Editor markdown do plano de ensino |
| `toggleTema()` | Alterna light/dark, salva em localStorage |
| `aplicarTema()` | Aplica tema ao document.documentElement |
| `fazerLogout()` | Limpa localStorage, redireciona a index.html |
| `calcularProgresso()` | Calcula % de aulas/matérias completas |

---

## 🗄️ Modelo de Dados (Supabase)

### Tabelas Principais

#### `curso`
```sql
id          UUID PRIMARY KEY
nome        VARCHAR
icone       VARCHAR (emoji)
cor         VARCHAR (hex #RRGGBB)
descricao   TEXT
status      VARCHAR (ativo/bloqueado)
ensalado    BOOLEAN
criado_em   TIMESTAMP
```

#### `cursomateria`
```sql
id          UUID PRIMARY KEY
curso_id    UUID (FK curso)
materia_id  UUID (FK materia)
ordem       INT
criado_em   TIMESTAMP
```

#### `aula`
```sql
id          UUID PRIMARY KEY
materia_id  UUID (FK materia)
titulo      VARCHAR
conteudo    TEXT (markdown)
ordem       INT
criado_em   TIMESTAMP
```

#### `materia`
```sql
id          UUID PRIMARY KEY
nome        VARCHAR
unidade_curricular_id UUID
criado_em   TIMESTAMP
```

---

## 🔐 Autenticação & Autorização

### Fluxo

1. **Login:** `index.html` valida credenciais contra Supabase
2. **Armazenamento:** `localStorage.senai_role` + `senai_login`
3. **Verificação:** `dashboard.html` checa `senai_role` no load
4. **UI Condicional:**
   - Se ausente ou inválido → redireciona a `index.html`
   - Se "ALUNO" → interface simplificada
   - Se "PROFESSOR" → interface completa com CRUD

### Proteção

- Botões/formulários CRUD ocultados se `senai_role !== "PROFESSOR"`
- Supabase (RLS policies) também restringe:
  - Alunos: read-only
  - Professores: read/write

---

## 🚀 Performance

### Otimizações

- **CSS Inline:** Todo CSS está no `<style>` (sem HTTP request)
- **JS Vanilla:** Sem bundle, sem framework overhead
- **localStorage:** Cache local de cursos/progresso
- **Grid layout:** GPU-accelerated (CSS Grid)
- **Animações:** GPU-accelerated (transform, opacity)
- **Lazy-loading:** Modais renderizados sob demanda

### Gargalos Conhecidos

- Grande volume de cursos (1000+) → lentidão no grid
- Muitas aulas por UC → modal pode ficar pesado
- Edição de plano de ensino grande → preview pode travar

---

## 📋 Checklist de Uso

### Para Alunos
- [ ] Fazer login em `index.html`
- [ ] Visualizar cursos disponíveis em `dashboard.html`
- [ ] Clicar "Acessar" para entrar em uma UC
- [ ] Acompanhar barra de progresso
- [ ] Fazer logout quando terminar

### Para Professores
- [ ] Fazer login como "PROFESSOR"
- [ ] Criar novo curso (botão "Novo Curso" ou card "Adicionar")
- [ ] Adicionar UCs ao curso (dentro do modal de edição)
- [ ] Vincular matérias do Supabase
- [ ] Gerenciar aulas (criar, editar, deletar)
- [ ] Editar plano de ensino (markdown + preview)
- [ ] Duplicar ou deletar cursos conforme necessário
- [ ] Exportar dados (CSV/JSON)

---

## 🐛 Troubleshooting

| Problema | Causa | Solução |
|----------|-------|------|
| Dashboard vazio | localStorage corrompido | Fazer logout + login novamente |
| Cards bloqueados não aparecem | Toggle "Ocultar Bloqueados" ativo | Desativar toggle em filtros |
| Modal de matérias vazio | Sem matérias no Supabase | Adicionar matérias via painel Supabase |
| Tema não persiste | localStorage bloqueado | Verificar políticas de privacidade do navegador |
| Dados não atualizam | Cache do browser | F5 (refresh) ou Ctrl+Shift+R (hard refresh) |

---

## 📞 Contato & Suporte

**Proprietário:** Professor Gelvazio Camargo  
**Email:** gelvazio@gmail.com  
**Última Atualização:** 2026-09-07  
**Versão:** 1.0 (Production)

---

## 🔗 Arquivos Relacionados

- [index.html](./index.html) — Página de login
- [uc.html](./uc.html) — Gerencador de UCs (professor)
- [questionarios.html](./questionarios.html) — Avaliações e questões
- [validacao.html](./validacao.html) — Protocolo de validação de competências
- [visualizador-central-aulas-pendentes.html](./visualizador-central-aulas-pendentes.html) — Visualização de aulas

---

**Nota:** Este arquivo é a **principal porta de entrada** do sistema após login. Todas as operações de gerenciamento acadêmico passam por aqui.
