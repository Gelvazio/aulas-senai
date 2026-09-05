# Corrigir Formulário de Edição de Curso

**Data de Criação:** 2026-09-05  
**Status Geral:** ⬜ Planejado  
**Prioridade:** Alta

---

## 📌 Objetivo

Implementar funcionalidade completa para editar um curso existente. Atualmente, o botão "✏️ Editar" em `cursos.html` apenas mostra um alerta vazio e nada acontece.

**Problema:** Função `editarCurso()` em `cursos.html` (linha 353) não está implementada.

---

## 📋 Escopo

### Arquivos Afetados
- `dashboard/templates/dashboard/cursos.html` — Adicionar modal de edição + JavaScript
- `dashboard/views.py` — Criar endpoint API para editar curso
- `dashboard/urls.py` — Registrar rota de edição

### Tecnologias
- Bootstrap 5 Modal
- Django REST API
- SupabaseService

---

## 📊 Plano de Execução

### Etapa 1: Criar Endpoint de Edição de Curso
- **Status:** ⬜ Pendente
- **Ação:** Adicionar função `api_editar_curso()` em `views.py`
  - Receber: `curso_id`, `nome`, `descricao`
  - Atualizar: tabela `curso` no Supabase
  - Retornar: JSON com sucesso/erro
- **Arquivo:** `dashboard/views.py`
- **Verificação:** Endpoint retorna JSON 200 com mensagem de sucesso

### Etapa 2: Registrar Rota de Edição
- **Status:** ⬜ Pendente
- **Ação:** Adicionar rota em `urls.py`:
  - Path: `api/cursos/<curso_id>/editar/`
  - View: `api_editar_curso`
- **Arquivo:** `dashboard/urls.py`
- **Verificação:** Rota registrada sem conflitos

### Etapa 3: Criar Modal de Edição
- **Status:** ⬜ Pendente
- **Ação:** Adicionar modal Bootstrap para editar curso em `cursos.html`
  - Campos: Nome e Descrição
  - Botões: Salvar e Cancelar
  - Estilo: Consistente com modal de matérias
- **Arquivo:** `dashboard/templates/dashboard/cursos.html`
- **Verificação:** Modal HTML válido

### Etapa 4: Implementar JavaScript
- **Status:** ⬜ Pendente
- **Ação:** Reescrever funções `editarCurso()` e `excluirCurso()` em `cursos.html`
  - `editarCurso(cursoId)` — Abrir modal com dados do curso
  - `salvarCursoEdicao()` — Fazer POST para atualizar
  - `carregarCursoParaEditar(cursoId)` — Buscar dados atuais
  - Tratamento de erros com feedback ao usuário
- **Arquivo:** `dashboard/templates/dashboard/cursos.html` (bloco `extra_js`)
- **Verificação:** Requisições fetch funcionam sem erros

### Etapa 5: Commit
- **Status:** ⬜ Pendente
- **Ação:** Fazer git commit com alterações
- **Arquivo:** `.git`
- **Verificação:** Commit realizado com sucesso

---

## ⚠️ Riscos

| Risco | Probabilidade | Mitigação |
|-------|---|---|
| Campo `nome_completo` vs `nome` | Média | Verificar schema exato da tabela `curso` |
| Conflito com outro modal | Baixa | Usar ID único para modal de edição |
| Usuário sem permissão | Média | Adicionar validação no backend |

---

## ✅ Checklist Final

- [ ] Endpoint API criado em `views.py`
- [ ] Rota registrada em `urls.py`
- [ ] Modal HTML adicionado em `cursos.html`
- [ ] JavaScript implementado sem erros
- [ ] Teste manual: editar um curso funciona
- [ ] Commit realizado

---

**Próximo Passo:** Aguardar aprovação para implementar
