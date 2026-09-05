# Adicionar Ação "Aulas" em Matérias

**Data de Criação:** 2026-09-05  
**Status Geral:** ⬜ Planejado  
**Prioridade:** Alta

---

## 📌 Objetivo

Adicionar uma ação "📚 Aulas" em cada matéria do modal CRUD. Ao clicar, deve abrir um novo modal listando as aulas daquela matéria.

---

## 📋 Escopo

### Arquivos Afetados
- `dashboard/views.py` — API para buscar aulas de uma matéria
- `dashboard/urls.py` — Registrar rota de API
- `dashboard/templates/dashboard/cursos.html` — Adicionar botão + modal de aulas

### Tecnologias
- Bootstrap 5 Modal
- JavaScript fetch
- Supabase (coluna `materia.aulas` JSONB)

---

## 📊 Plano de Execução

### Etapa 1: Garantir Coluna `aulas` na Tabela `materia`
- **Status:** ⬜ Pendente
- **Ação:** Verificar se coluna `aulas` (JSONB) existe em `materia`
  - Se não existir, criar via SQL
  - Popular com dados existentes (se houver)
- **Arquivo:** Supabase SQL ou `SCRIPT-RESTAURAR-MATERIAS.sql`
- **Verificação:** Coluna existe e é do tipo JSONB

### Etapa 2: Criar Endpoint API para Buscar Aulas
- **Status:** ⬜ Pendente
- **Ação:** Adicionar função `api_aulas_materia()` em `views.py`
  - Receber: `materia_id`
  - Retornar: JSON com array de aulas de `materia.aulas`
- **Arquivo:** `dashboard/views.py`
- **Verificação:** Endpoint retorna JSON 200 com aulas

### Etapa 3: Registrar Rota de API
- **Status:** ⬜ Pendente
- **Ação:** Adicionar rota em `urls.py`:
  - Path: `api/aulas/<materia_id>/`
  - View: `api_aulas_materia`
- **Arquivo:** `dashboard/urls.py`
- **Verificação:** Rota registrada sem conflitos

### Etapa 4: Adicionar Botão "Aulas" na Tabela de Matérias
- **Status:** ⬜ Pendente
- **Ação:** Modificar `exibirMaterias()` em `cursos.html`
  - Adicionar 3º botão "📚 Aulas" (entre Editar e Deletar)
  - Usar event listener com data-index
  - Aumentar coluna de ações para 380px
- **Arquivo:** `dashboard/templates/dashboard/cursos.html`
- **Verificação:** Botão aparece corretamente formatado

### Etapa 5: Criar Modal de Aulas
- **Status:** ⬜ Pendente
- **Ação:** Adicionar novo modal em `cursos.html`
  - ID: `modalAulas`
  - Estrutura: Header (título), Body (lista de aulas), Footer (botão Fechar)
  - Lista de aulas em tabela ou lista simples
- **Arquivo:** `dashboard/templates/dashboard/cursos.html`
- **Verificação:** Modal HTML válido

### Etapa 6: Implementar JavaScript para Aulas
- **Status:** ⬜ Pendente
- **Ação:** Adicionar funções em `cursos.html`:
  - `abrirAulasModal(materiaId, materiaNome)` — Abrir modal
  - `carregarAulas(materiaId)` — Fetch GET aulas
  - `exibirAulas(aulas)` — Renderizar lista
  - Tratamento de erros
- **Arquivo:** `dashboard/templates/dashboard/cursos.html` (bloco `extra_js`)
- **Verificação:** Modal abre e lista aulas sem erros

### Etapa 7: Commit
- **Status:** ⬜ Pendente
- **Ação:** Fazer git commit
- **Arquivo:** `.git`
- **Verificação:** Commit realizado com sucesso

---

## ⚠️ Riscos

| Risco | Probabilidade | Mitigação |
|-------|---|---|
| Coluna `aulas` vazia em algumas matérias | Média | Exibir mensagem "Nenhuma aula cadastrada" |
| Estrutura JSONB diferente do esperado | Média | Validar estrutura no backend antes de retornar |
| Conflito com modal de Editar | Baixa | Usar IDs únicos, fechar antes de abrir outro |
| Texto truncado em nomes de aulas | Baixa | Usar text-truncate ou aumentar coluna |

---

## 📝 Estrutura Esperada de `materia.aulas`

```json
[
  {
    "id": 1,
    "titulo": "Aula 01 - Introdução",
    "descricao": "Conteúdo da aula",
    "duracao_minutos": 120,
    "data": "2026-01-15"
  },
  {
    "id": 2,
    "titulo": "Aula 02 - Conceitos",
    "descricao": "...",
    "duracao_minutos": 90,
    "data": "2026-01-22"
  }
]
```

---

## ✅ Checklist Final

- [ ] Coluna `aulas` existe em `materia`
- [ ] Endpoint API criado em `views.py`
- [ ] Rota registrada em `urls.py`
- [ ] Botão "Aulas" adicionado na tabela
- [ ] Modal de aulas criado
- [ ] JavaScript implementado sem erros
- [ ] Teste manual: listar aulas de uma matéria
- [ ] Commit realizado

---

**Próximo Passo:** Aguardar aprovação do usuário
