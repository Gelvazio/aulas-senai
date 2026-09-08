# 📚 ORIENTACAO_JS_CURSO.md

## Propósito
Gerenciar operações CRUD (Create, Read, Update, Delete) de **Cursos** no sistema.

## Localização
`C:\fontes\aulas-senai\sistema\js\curso.js`

## Responsabilidades
- ✅ Listar cursos (tabela, filtros, ordenação)
- ✅ Criar novo curso
- ✅ Editar curso existente
- ✅ Deletar curso com confirmação
- ✅ Abrir/fechar modal de cursos
- ✅ Cache local de cursos

## Estrutura Principal

### Variáveis
```javascript
let cacheCurso = [];  // Array com cursos carregados

const CRUD_CURSO = {
  label: "Cursos",
  table: "curso",
  listHeaders: ["ID", "Nome", "Descrição", "Ativo", "Ações"],
  listCols: ["id", "nome_completo", "descricao", "ativo", "id"],
  createFields: [
    { key: "nome_completo", label: "Nome", type: "text", required: true },
    { key: "descricao", label: "Descrição", type: "textarea" },
    { key: "ativo", label: "Ativo", type: "checkbox" },
  ],
};
```

### Funções Principais

| Função | Propósito |
|--------|-----------|
| `abrirModalCursos()` | Abre modal e carrega lista de cursos |
| `fecharModalCursos()` | Fecha modal |
| `listarCursos()` | Fetch cursos do Supabase, renderiza tabela |
| `editarCurso(id)` | Carrega curso para edição |
| `excluirCurso(id, nome)` | Deleta curso com confirmação |
| `salvarCurso()` | Salva curso novo ou editado |
| `fecharFormCurso()` | Limpa form após salvar |

## Tabela Supabase
- **Nome:** `curso`
- **Colunas principais:** `id`, `nome_completo`, `descricao`, `ativo`
- **Ordenação padrão:** `nome_completo` (A-Z)

## Regras de Negócio
- ⚠️ **NUNCA carregar curso em contextos alheios** — Use APENAS em dashboard.html
- ✅ Sempre ordenar por `nome_completo`
- ✅ Confirmar antes de deletar
- ✅ Validar nome como obrigatório

## Como Usar

### Exemplo: Listar cursos
```javascript
await listarCursos();  // Carrega e renderiza tabela
```

### Exemplo: Abrir modal
```javascript
await abrirModalCursos();  // Modal + lista aparece
```

### Exemplo: Salvar novo curso
```javascript
await salvarCurso();  // POST ao Supabase + refresh
```

## Integração com Outros Módulos
- **Depende de:** `supabase.js` (funções `sbGet`, `sbPost`, `sbPatch`, `sbDelete`)
- **Usado por:** `dashboard.html`
- **Não carrega:** matérias, aulas, unidades

## Modificações Comuns
- Alterar campos de formulário → editar `CRUD_CURSO.createFields`
- Alterar colunas da tabela → editar `CRUD_CURSO.listHeaders` e `listCols`
- Alterar ordenação → modificar string `order=nome_completo` em `listarCursos()`

## ⚠️ Notas Importantes
- **Isolamento:** Este módulo NÃO deve carregar dados de cursos para aulas/matérias
- **Cache:** `cacheCurso` é atualizado apenas ao chamar `listarCursos()`
- **Modal:** HTML do modal deve estar em `dashboard.html` com ID `modalCursos`
