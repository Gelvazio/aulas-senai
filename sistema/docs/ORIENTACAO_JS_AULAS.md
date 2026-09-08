# 📚 ORIENTACAO_JS_AULAS.md

## Propósito
Gerenciar operações CRUD (Create, Read, Update, Delete) de **Aulas** no sistema.

## Localização
`C:\fontes\aulas-senai\sistema\js\aulas.js`

## Responsabilidades
- ✅ Listar aulas (tabela, filtros, ordenação)
- ✅ Criar nova aula
- ✅ Editar aula existente
- ✅ Deletar aula com confirmação
- ✅ Abrir/fechar modal de aulas
- ✅ **Exibir combo de cursos no modal** ⭐ (OBRIGATÓRIO)
- ✅ Cache local de aulas

## Estrutura Principal

### Variáveis
```javascript
let cacheAula = [];  // Array com aulas carregadas

const CRUD_AULA = {
  label: "Aulas",
  table: "aulas",
  listHeaders: ["ID", "Título", "Matéria", "Ações"],
  listCols: ["id", "titulo", "materia_id", "id"],
};
```

### Funções Principais

| Função | Propósito |
|--------|-----------|
| `abrirModalAulas()` | Abre modal, carrega cursos, carrega lista de aulas |
| `fecharModalAulas()` | Fecha modal |
| `listarAulas()` | Fetch aulas do Supabase, renderiza tabela |
| `editarAula(id)` | Carrega aula para edição |
| `excluirAula(id, titulo)` | Deleta aula com confirmação |
| `salvarAula()` | Salva aula novo ou editada |
| `fecharFormAula()` | Limpa form após salvar |
| `carregarComboCursos()` | **NOVO** - Popula combo de cursos no modal |

## Tabela Supabase
- **Nome:** `aulas`
- **Colunas principais:** `id`, `titulo`, `materia_id`, `curso_id` (se houver)
- **Ordenação padrão:** `titulo` (A-Z)

## ⭐ Regra Crítica: Combo de Curso Obrigatório

**Sempre que o modal de aula abrir, deve exibir um COMBO de cursos:**

```javascript
async function abrirModalAulas() {
  document.getElementById("modalAulas").style.display = "flex";
  fecharFormAula();
  await carregarComboCursos();  // ✅ OBRIGATÓRIO
  await listarAulas();
}
```

**Elementos esperados no HTML:**
```html
<select id="aulaFormCurso">
  <option value="">— Selecione um curso —</option>
  <!-- Options populadas dinamicamente -->
</select>
```

## Regras de Negócio
- ⚠️ **NUNCA carregar dados de outros módulos** — Use APENAS `aulas` e `cursos` para combo
- ⚠️ **Isolamento total:** Este módulo é independente de materia.js e curso.js
- ✅ Sempre ordenar por `titulo`
- ✅ Confirmar antes de deletar
- ✅ Validar título como obrigatório
- ✅ **Combo de curso SEMPRE visível no form**

## Como Usar

### Exemplo: Listar aulas
```javascript
await listarAulas();  // Carrega e renderiza tabela
```

### Exemplo: Abrir modal COM combo
```javascript
await abrirModalAulas();  // Modal + combo de cursos + lista aparece
```

### Exemplo: Salvar nova aula
```javascript
const cursoSelecionado = document.getElementById("aulaFormCurso").value;
// Validar curso
await salvarAula();  // POST ao Supabase + refresh
```

## Integração com Outros Módulos
- **Depende de:** `supabase.js` (funções `sbGet`, `sbPost`, `sbPatch`, `sbDelete`)
- **Depende de:** `curso.js` (para carregar combo de cursos)
- **Usado por:** `uc.html`, `dashboard.html`
- **Não carrega:** matérias (apenas referencia `materia_id`)

## Modificações Comuns
- Alterar campos de formulário → editar form HTML
- Alterar colunas da tabela → editar `CRUD_AULA.listHeaders` e `listCols`
- Alterar ordenação → modificar string `order=titulo` em `listarAulas()`

## ⚠️ Notas Importantes
- **Isolamento:** Este módulo NÃO carrega dados de cursos (apenas combo)
- **Cache:** `cacheAula` é atualizado apenas ao chamar `listarAulas()`
- **Modal:** HTML do modal deve estar em `uc.html` ou `dashboard.html` com ID `modalAulas`
- **Combo:** Deve estar SEMPRE presente e funcional

---

## ✅ Checklist para Modificações

- [ ] Modal abre com combo de cursos populado
- [ ] Combo permite seleção antes de salvar aula
- [ ] Aula nova vinculada ao curso selecionado
- [ ] Edição mantém curso anterior visível
- [ ] Tabela lista todas as aulas corretamente
