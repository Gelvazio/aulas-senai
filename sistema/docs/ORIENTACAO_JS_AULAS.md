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
| `carregarComboCursos()` | ✅ Popula combo de cursos no modal (reutilizável) |
| `novaAula()` | Prepara form para criar nova aula + carrega cursos |
| `editarAula(id)` | Carrega aula para edição |
| `excluirAula(id, titulo)` | Deleta aula com confirmação |
| `salvarAula()` | Salva aula novo ou editada |
| `atualizarMateriasParaAula()` | Carrega matérias conforme curso selecionado |
| `fecharFormAula()` | Limpa form após salvar |

## Tabela Supabase
- **Nome:** `aulas`
- **Colunas principais:** `id`, `titulo`, `materia_id`, `curso_id` (se houver)
- **Ordenação padrão:** `titulo` (A-Z)

## ⭐ Regra Crítica: Combo de Curso Obrigatório

**✅ IMPLEMENTADO:** Sempre que o modal de aula abrir, exibe um COMBO de cursos populado.

```javascript
// Implementação atual
async function abrirModalAulas() {
  document.getElementById("modalAulas").style.display = "flex";
  fecharFormAula();
  await carregarComboCursos();  // ✅ Carrega cursos do Supabase
  await listarAulas();
}

async function carregarComboCursos() {
  try {
    const cursos = await sbGet("curso", "select=id,nome_completo&order=nome_completo");
    const selectCurso = document.getElementById("aulaCurso");
    selectCurso.innerHTML = '<option value="">-- Selecione um curso --</option>';
    cursos.forEach(c => {
      selectCurso.innerHTML += `<option value="${c.id}">${c.nome_completo}</option>`;
    });
  } catch (erro) {
    console.error("❌ Erro ao carregar cursos:", erro);
  }
}
```

**Elementos HTML esperados:**
```html
<select id="aulaCurso">
  <option value="">-- Selecione um curso --</option>
  <!-- Options populadas dinamicamente pelo carregarComboCursos() -->
</select>
```

**Campo utilizado:** `nome_completo` (não `nome`)

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

### Exemplo: Selecionar curso → Carregar matérias
```html
<!-- HTML do select de cursos -->
<select id="aulaCurso" onchange="atualizarMateriasParaAula()">
  <option value="">-- Selecione um curso --</option>
</select>

<!-- Quando usuário seleciona um curso:
     1. atualizarMateriasParaAula() é disparada
     2. Query: SELECT materia FROM cursomateria WHERE curso_id=?
     3. Popula select id="aulaMateria" com as matérias
-->
```

### Exemplo: Salvar nova aula
```javascript
const cursoSelecionado = document.getElementById("aulaCurso").value;
const materiaSelecionada = document.getElementById("aulaMateria").value;
// Validar ambos antes de salvar
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

## 📝 Histórico de Mudanças

| Data | Mudança | Commit |
|------|---------|--------|
| 2026-09-08 | Melhorar `atualizarMateriasParaAula()`: logs, ordenação, tratamento erro | `34377cd` |
| 2026-09-08 | Adicionar função `carregarComboCursos()` reutilizável | `56ce631` |
| 2026-09-08 | Chamar `carregarComboCursos()` em `abrirModalAulas()` | `56ce631` |
| 2026-09-08 | Corrigir campo de `nome` para `nome_completo` | `56ce631` |
| 2026-09-08 | Melhorar tratamento de erro ao carregar cursos | `56ce631` |

---

## ✅ Checklist para Modificações

- [x] Modal abre com combo de cursos populado ✅ (Implementado em `abrirModalAulas()`)
- [x] Combo permite seleção antes de salvar aula ✅ (Validação em `salvarAula()`)
- [x] Ao selecionar curso → matérias são carregadas ✅ (`atualizarMateriasParaAula()`)
- [x] Aula nova vinculada ao curso selecionado ✅ (POST com `curso_id`)
- [x] Edição mantém curso anterior visível ✅ (`editarAula()` preserva dados)
- [x] Tabela lista todas as aulas corretamente ✅ (`listarAulas()` renderiza)
- [x] Delete pede confirmação ✅ (Confirmação em `excluirAula()`)
- [x] Validação de campos obrigatórios ✅ (Título, Curso, Matéria)
