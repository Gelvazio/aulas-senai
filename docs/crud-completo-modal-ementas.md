# Implementar CRUD Completo no Modal de Ementas

**Data Criação:** 2026-09-05  
**Hora:** 15:00:00  
**Status Geral:** ⬜ Planejado  
**Executor:** Claude Haiku 4.5

---

## Objetivo

Adicionar funcionalidade CRUD completa (Create, Read, Update, Delete) ao modal de ementas, permitindo criar, editar e deletar ementas diretamente da interface, assim como funciona com Aulas, Materiais e Matérias.

---

## Escopo

| Aspecto | Detalhes |
|--------|----------|
| **Arquivo Principal** | `GERADOR-SLIDES/dashboard/templates/dashboard/cursos.html` |
| **Views/API** | `GERADOR-SLIDES/dashboard/views.py` |
| **Tabelas BD** | `public.ementas` |
| **Funcionalidades** | Create, Read, Update, Delete |
| **Modo Modal** | Dois modos: Lista (READ) e Formulário (CREATE/UPDATE) |

---

## Plano de Execução

### Etapa 1: Criar APIs para CRUD de Ementas
- **Status:** ⬜ Pendente
- **Ação:** Adicionar funções em views.py
- **Arquivo:** `GERADOR-SLIDES/dashboard/views.py`
- **APIs:**
  - `api_criar_ementa` - POST /api/ementas/criar/
  - `api_editar_ementa` - POST /api/ementas/{ementa_id}/editar/
  - `api_deletar_ementa` - POST /api/ementas/{ementa_id}/deletar/
- **Verificação:** APIs retornam JSON correto

### Etapa 2: Adicionar Rotas das APIs
- **Status:** ⬜ Pendente
- **Ação:** Registrar rotas em urls.py
- **Arquivo:** `GERADOR-SLIDES/dashboard/urls.py`
- **Rotas:** Adicionar 3 novos paths
- **Verificação:** Rotas funcionam

### Etapa 3: Adicionar Botões de Ação na Tabela
- **Status:** ⬜ Pendente
- **Ação:** Adicionar botões ✏️ Editar e 🗑️ Deletar
- **Arquivo:** `cursos.html` (função `exibirEmentas`)
- **Posição:** Coluna "Ações" na tabela
- **Verificação:** Botões aparecem para cada ementa

### Etapa 4: Implementar Modo "Criar Ementa"
- **Status:** ⬜ Pendente
- **Ação:** Adicionar formulário para criar ementa
- **Arquivo:** `cursos.html`
- **Campos:**
  - Curso (FK) - select
  - Descrição (obrigatório)
  - Conteúdo (JSONB) - textarea
- **Verificação:** Formulário exibe corretamente

### Etapa 5: Implementar Modo "Editar Ementa"
- **Status:** ⬜ Pendente
- **Ação:** Preencher formulário com dados da ementa
- **Arquivo:** `cursos.html` (JavaScript)
- **Funcionalidade:** Carregar dados e permitir edição
- **Verificação:** Dados carregam corretamente

### Etapa 6: Implementar Delete com Confirmação
- **Status:** ⬜ Pendente
- **Ação:** Deletar ementa com confirmação
- **Arquivo:** `cursos.html` (JavaScript)
- **Funcionalidade:** Pedir confirmação antes de deletar
- **Verificação:** Delete funciona

### Etapa 7: Atualizar Layout do Modal
- **Status:** ⬜ Pendente
- **Ação:** Adicionar estrutura com `#secaoLista` e `#secaoFormulario`
- **Arquivo:** `cursos.html`
- **Modo Alternância:** Toggle entre lista e formulário
- **Verificação:** Modal muda de modo corretamente

### Etapa 8: Adicionar Funções JavaScript
- **Status:** ⬜ Pendente
- **Ação:** Implementar funções CRUD em JS
- **Arquivo:** `cursos.html` (bloco extra_js)
- **Funções:**
  - `mostrarFormularioCriarEmenta()`
  - `editarEmenta(ementaId, ...)`
  - `salvarEmenta()`
  - `deletarEmentaComConfirm()`
  - `voltarParaListaEmentas()`
- **Verificação:** Funções executam sem erros

### Etapa 9: Fazer Commit
- **Status:** ⬜ Pendente
- **Ação:** Commit de todas as alterações
- **Comando:** `git add . && git commit -m "..."`
- **Verificação:** Commit realizado com sucesso

---

## Estrutura de Dados - Campos da Ementa

```sql
id BIGSERIAL PRIMARY KEY
curso_id BIGINT (FK → curso)
materia_id BIGINT (FK → materia)
descricao TEXT (obrigatório)
conteudo JSONB (opcional)
data_criacao TIMESTAMPTZ
data_atualizacao TIMESTAMPTZ
```

---

## Mockup de Layout

```
┌─────────────────────────────────────────────┐
│ MODO LISTA:                                 │
│ Botão: ➕ Adicionar Ementa                   │
├─────────────────────────────────────────────┤
│ Tabela:                                     │
│ ID | Descrição | Data | Ações               │
│ ---|-----------|------|------- ────────────│
│ 1  | Conteúdo  | ...  | ✏️ 🗑️  │
├─────────────────────────────────────────────┤
│ MODO FORMULÁRIO:                            │
│ Título: Adicionar/Editar Ementa             │
│ [Inputs dos campos]                         │
│ [Botões: Salvar | Voltar]                   │
└─────────────────────────────────────────────┘
```

---

## Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|--------------|--------|-----------|
| Conflito de FK course_id | Média | Médio | Validar curso_id antes de inserir |
| Erro ao deletar ementa | Baixa | Médio | Usar ON DELETE CASCADE |
| Campos inválidos | Baixa | Baixo | Validação no formulário |

---

## Dependências

- ✅ Tabela `public.ementas` deve existir
- ✅ Tabela `public.curso` deve existir
- ✅ Django views já criadas
- ✅ Bootstrap modal funcionando

---

## Tempo Estimado

| Etapa | Tempo |
|-------|-------|
| APIs CRUD | 10 min |
| Rotas | 2 min |
| Botões e tabela | 5 min |
| Formulário | 10 min |
| JavaScript | 15 min |
| Commit | 1 min |
| **TOTAL** | **~43 minutos** |

---

**Aguardando aprovação do usuário para prosseguir.**
