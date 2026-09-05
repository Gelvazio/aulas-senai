# Implementar Ações "Aulas" e "Materiais" em Matérias

**Data de Criação:** 2026-09-05  
**Status Geral:** ⬜ Planejado  
**Prioridade:** Alta

---

## 📌 Objetivo

Implementar duas ações interligadas:
1. **Ação "📚 Aulas"** em cada matéria → abre modal com lista de aulas
2. **Ação "📎 Materiais"** em cada aula → abre modal com lista de materiais

---

## 📋 Escopo

### Arquivos Afetados
- `dashboard/views.py` — 2 endpoints API
- `dashboard/urls.py` — 2 rotas
- `dashboard/templates/dashboard/cursos.html` — 2 modais + JavaScript

### Tecnologias
- Bootstrap 5 Modal
- JavaScript fetch API
- Supabase (tabelas: aulas, material)

---

## 📊 Plano de Execução

### Etapa 1: Criar Endpoint para Listar Aulas
- **Status:** ⬜ Pendente
- **Ação:** Adicionar `api_aulas_materia()` em `views.py`
  - Receber: `materia_id`
  - Query: SELECT * FROM aulas WHERE materia_id = ?
  - Retornar: JSON com array de aulas
- **Arquivo:** `dashboard/views.py`
- **Verificação:** Endpoint retorna JSON 200

### Etapa 2: Criar Endpoint para Listar Materiais de Aula
- **Status:** ⬜ Pendente
- **Ação:** Adicionar `api_materiais_aula()` em `views.py`
  - Receber: `aula_id`
  - Query: SELECT * FROM material WHERE aula_id = ? (ou materia_id se aula_id vazio)
  - Retornar: JSON com array de materiais
- **Arquivo:** `dashboard/views.py`
- **Verificação:** Endpoint retorna JSON 200

### Etapa 3: Registrar Rotas de API
- **Status:** ⬜ Pendente
- **Ação:** Adicionar 2 rotas em `urls.py`:
  - `/api/aulas/<materia_id>/` → api_aulas_materia
  - `/api/materiais/aula/<aula_id>/` → api_materiais_aula
- **Arquivo:** `dashboard/urls.py`
- **Verificação:** Rotas registradas sem conflitos

### Etapa 4: Adicionar Botão "Aulas" em Matérias
- **Status:** ⬜ Pendente
- **Ação:** Modificar `exibirMaterias()` em `cursos.html`
  - Adicionar 4º botão "📚 Aulas" (após Editar/Deletar)
  - Usar event listener com data-index
  - Aumentar coluna de ações para 450px
- **Arquivo:** `dashboard/templates/dashboard/cursos.html`
- **Verificação:** Botão aparece corretamente

### Etapa 5: Criar Modal de Aulas
- **Status:** ⬜ Pendente
- **Ação:** Adicionar novo modal em `cursos.html`
  - ID: `modalAulas`
  - Título: "📚 Aulas da Matéria: [Nome]"
  - Lista de aulas em tabela (numero, titulo, duracao, data)
  - Botão "📎 Materiais" para cada aula
- **Arquivo:** `dashboard/templates/dashboard/cursos.html`
- **Verificação:** Modal HTML válido

### Etapa 6: Criar Modal de Materiais
- **Status:** ⬜ Pendente
- **Ação:** Adicionar novo modal em `cursos.html`
  - ID: `modalMateriais`
  - Título: "📎 Materiais da Aula: [Nome]"
  - Lista de materiais em tabela (nome, tipo, descricao, data)
- **Arquivo:** `dashboard/templates/dashboard/cursos.html`
- **Verificação:** Modal HTML válido

### Etapa 7: Implementar JavaScript
- **Status:** ⬜ Pendente
- **Ação:** Adicionar funções em `cursos.html`:
  - `abrirAulasModal(materiaId, materiaNome)`
  - `carregarAulas(materiaId)`
  - `exibirAulas(aulas)`
  - `abrirMateriaisModal(aulaId, aulaNome)`
  - `carregarMateriais(aulaId)`
  - `exibirMateriais(materiais)`
  - Tratamento de erros
- **Arquivo:** `dashboard/templates/dashboard/cursos.html` (bloco `extra_js`)
- **Verificação:** Sem erros de sintaxe, requisições funcionam

### Etapa 8: Commit
- **Status:** ⬜ Pendente
- **Ação:** Fazer git commit
- **Arquivo:** `.git`
- **Verificação:** Commit realizado

---

## 📐 Estrutura de Dados

### Tabela: `aulas`
```
id | numero | titulo | materia_id | curso_id | duracao_minutos | data_planejada | ativo
```

### Tabela: `material`
```
id | nome | descricao | tipo_material_id | aula_id | materia_id | curso_id | ativo | ordem
```

---

## ⚠️ Riscos

| Risco | Probabilidade | Mitigação |
|-------|---|---|
| Aula sem materiais | Média | Exibir "Nenhum material cadastrado" |
| Matéria sem aulas | Média | Exibir "Nenhuma aula cadastrada" |
| Conflito com outros modais | Baixa | Usar IDs únicos e fechar antes de abrir |
| Performance com muitos materiais | Baixa | Adicionar paginação se necessário |

---

## 🎯 User Flow

```
1. Usuário clica "📖 Matérias" em um curso
   ↓
2. Abre modal com lista de matérias
   - Cada matéria tem botões: Editar | Deletar | 📚 Aulas
   ↓
3. Clica "📚 Aulas" em uma matéria
   ↓
4. Abre novo modal com lista de aulas
   - Cada aula tem coluna de ações: 📎 Materiais
   ↓
5. Clica "📎 Materiais" em uma aula
   ↓
6. Abre novo modal com lista de materiais daquela aula
```

---

## ✅ Checklist Final

- [ ] Endpoint api_aulas_materia criado
- [ ] Endpoint api_materiais_aula criado
- [ ] Rotas registradas em urls.py
- [ ] Botão "Aulas" adicionado em matérias
- [ ] Modal de aulas criado
- [ ] Modal de materiais criado
- [ ] JavaScript implementado sem erros
- [ ] Teste manual: Matéria → Aulas → Materiais
- [ ] Commit realizado

---

## 🔄 Sequência de Implementação

```
views.py → urls.py → cursos.html (HTML) → cursos.html (JS) → git commit
```

---

**Próximo Passo:** Aguardar aprovação do usuário
