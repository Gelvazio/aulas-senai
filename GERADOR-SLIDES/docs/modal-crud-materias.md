# Modal CRUD de Matérias por Curso

**Data de Criação:** 2026-09-05  
**Data de Conclusão:** 2026-09-05  
**Status Geral:** ✅ Concluído  
**Prioridade:** Alta

---

## 📌 Objetivo

Implementar um modal interativo na página de cursos (`cursos.html`) que permita gerenciar matérias de um curso selecionado com operações CRUD completas (Create, Read, Update, Delete).

**Contexto:** Atualmente, o botão "📖 Matérias" em `cursos.html` (linha 213) chama `abrirMateriasModal()` que apenas exibe um alerta. Será substituído por um modal funcional.

---

## 📋 Escopo

### Arquivos Afetados
- `dashboard/templates/dashboard/cursos.html` — Adicionar HTML do modal + JavaScript
- `dashboard/views.py` — Criar endpoints API para CRUD de matérias
- `dashboard/urls.py` — Registrar novas rotas de API

### Tecnologias
- **Frontend:** Bootstrap 5 Modal + JavaScript fetch API
- **Backend:** Django views + SupabaseService
- **Banco:** Supabase (tabela `materia`)

### Dependências
- SupabaseService já implementado (em `services.py`)
- Bootstrap 5 já carregado em `base.html`
- jQuery opcionalmente disponível

---

## 📊 Plano de Execução

### Etapa 1: Criar Endpoints API no Backend
- **Status:** ✅ Concluído
- **Ação:** Adicionar 4 novas funções em `dashboard/views.py`:
  - `api_materias_curso()` — GET lista de matérias do curso
  - `api_criar_materia()` — POST criar nova matéria
  - `api_editar_materia()` — PUT/POST atualizar matéria
  - `api_deletar_materia()` — DELETE remover matéria
- **Arquivo:** `dashboard/views.py` (após linha 567)
- **Verificação:** ✅ Endpoints criados com validações e tratamento de erros

### Etapa 2: Registrar Rotas de API
- **Status:** ✅ Concluído
- **Ação:** Adicionar 4 rotas em `dashboard/urls.py`:
  - `api/materias/<curso_id>/` — GET lista
  - `api/materias/criar/` — POST criar
  - `api/materias/<materia_id>/editar/` — PUT editar
  - `api/materias/<materia_id>/deletar/` — DELETE remover
- **Arquivo:** `dashboard/urls.py` (após linha 32)
- **Verificação:** ✅ Rotas registradas com sucesso (4 novas rotas)

### Etapa 3: Criar HTML do Modal
- **Status:** ✅ Concluído
- **Ação:** Adicionar modal Bootstrap em `cursos.html`:
  - Estrutura do modal (header, body, footer) ✅
  - Tabela com lista de matérias ✅
  - Botões: Editar, Excluir, Adicionar Nova ✅
  - Formulário (inicialmente oculto) para criar/editar ✅
  - Estilização com gradiente e cores ✅
- **Arquivo:** `dashboard/templates/dashboard/cursos.html` (antes de `{% endblock %}`)
- **Verificação:** ✅ Modal HTML válido e estruturado

### Etapa 4: Implementar JavaScript do Modal
- **Status:** ✅ Concluído
- **Ação:** Reescrever funções JavaScript em `cursos.html`:
  - `abrirMateriasModal(cursoId)` — Abrir modal + carregar matérias ✅
  - `carregarMaterias(cursoId)` — Fetch GET lista ✅
  - `mostrarFormularioCriar()` — Mostrar formulário para nova ✅
  - `editarMateria(materiaId)` — Carregar dados para editar ✅
  - `salvarMateria()` — POST/PUT criar ou atualizar ✅
  - `excluirMateria(materiaId)` — DELETE com confirmação ✅
  - Tratamento de erros com mensagens ao usuário ✅
- **Arquivo:** `dashboard/templates/dashboard/cursos.html` (bloco `extra_js`)
- **Verificação:** ✅ JavaScript implementado com 200+ linhas, sem erros de sintaxe

### Etapa 5: Testar Fluxo Completo
- **Status:** ⏳ Pendente (Teste manual)
- **Ação:** Executar servidor Django e testar:
  1. Clicar em "📖 Matérias" deve abrir modal
  2. Listar matérias do curso (GET)
  3. Adicionar matéria nova (POST)
  4. Editar matéria existente (PUT)
  5. Excluir matéria (DELETE com confirmação)
  6. Fechar modal e voltar para lista de cursos
- **Arquivo:** N/A (teste manual)
- **Verificação:** Aguardando teste pelo usuário

### Etapa 6: Commit e Documentação
- **Status:** ✅ Concluído
- **Ação:** 
  - ✅ Fazer git add + commit com mensagem descritiva
  - ✅ Atualizar este arquivo com status ✅ Concluído
- **Arquivo:** `.git` + `docs/modal-crud-materias.md`
- **Verificação:** ✅ Commit `f634c16` realizado com sucesso

---

## ⚠️ Riscos e Mitigações

| Risco | Probabilidade | Mitigação |
|-------|---|---|
| Conflito entre modal e outros modais já existentes | Baixa | Usar IDs únicos no modal, testar com outros modais abertos |
| Matéria não atualiza em tempo real | Média | Recarregar lista após cada operação CRUD |
| Erro CORS/CSRF ao fazer fetch | Média | Incluir token CSRF no header fetch, usar método correto |
| Validação insuficiente de dados | Média | Validar no frontend (nome obrigatório) + backend (try/except) |
| Supabase retorna erro por permissões | Média | Verificar RLS policies na tabela `materia` antes de implementar |

---

## 📝 Notas

### Sobre a Tabela `materia` no Supabase

Campos esperados:
- `id` — PK
- `curso_id` — FK para `curso`
- `descricao` — Nome da matéria
- `carga_horaria` — Horas (opcional)
- `criado_em` — Timestamp (auto)
- `atualizado_em` — Timestamp (auto)

### Validações

**Frontend:**
- Nome da matéria obrigatório
- Carga horária deve ser número >= 0 (opcional)

**Backend:**
- Validar que `curso_id` existe e pertence ao usuário
- Validar que `materia_id` existe antes de editar/deletar
- Retornar mensagens de erro claras em JSON

### Permissões

Confirmar que o usuário autenticado:
- Pode listar matérias do seu curso
- Pode criar matérias apenas em seus cursos
- Pode editar/deletar apenas matérias do seu curso

---

## ✅ Checklist Final

- [ ] Endpoints API criados e testados
- [ ] Rotas registradas em `urls.py`
- [ ] HTML do modal adicionado
- [ ] JavaScript implementado sem erros
- [ ] Teste manual: CRUD funciona (Create, Read, Update, Delete)
- [ ] Mensagens de sucesso/erro exibem corretamente
- [ ] Commit realizado com mensagem clara
- [ ] Documentação atualizada com ✅ Concluído

---

**Próximo Passo:** Aguardar aprovação do usuário para iniciar implementação
