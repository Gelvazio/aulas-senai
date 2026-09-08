# 📚 ORIENTACAO_JS_MATERIA.md

## Propósito
Gerenciar operações CRUD (Create, Read, Update, Delete) de **Matérias** no sistema.

## Localização
`C:\fontes\aulas-senai\sistema\js\materia.js`

## Responsabilidades
- ✅ Listar matérias (tabela, filtros, ordenação)
- ✅ Criar nova matéria
- ✅ Editar matéria existente
- ✅ Deletar matéria com confirmação
- ✅ Abrir/fechar modal de matérias
- ✅ Carregar cursos em filter/formulário
- ✅ Cache local de matérias

## Estrutura Principal

### Variáveis
```javascript
let cacheMateria = [];  // Array com matérias carregadas

const CRUD_MATERIA = {
  label: "Matérias",
  table: "materia",
  listHeaders: ["ID", "Descrição", "Ativo", "Status Avaliação", "Ações"],
  listCols: ["id", "descricao", "ativo", "status_criacao_avaliacao", "id"],
};
```

### Funções Principais

| Função | Propósito |
|--------|-----------|
| `abrirModalMaterias()` | Abre modal, carrega cursos, carrega lista |
| `fecharModalMaterias()` | Fecha modal |
| `listarMaterias()` | Fetch matérias do Supabase, renderiza tabela |
| `carregarCursosFiltro()` | Popula dropdown de filtro por curso |
| `carregarCursosFormulario()` | Popula dropdown de curso no form |
| `editarMateria(id)` | Carrega matéria para edição |
| `excluirMateria(id, descricao)` | Deleta matéria com confirmação |
| `salvarMateria()` | Salva matéria novo ou editada |
| `fecharFormMateria()` | Limpa form após salvar |

## Tabela Supabase
- **Nome:** `materia`
- **Colunas principais:** `id`, `descricao` (⚠️ NÃO `nome`), `ativo`, `status_criacao_avaliacao`
- **Ordenação padrão:** `descricao` (A-Z)

📊 **Consulte schema completo:** `sistema/docs/database.md`

## ⚠️ Correção Crítica: Campo é "descricao", NÃO "nome"
```javascript
// ✅ CORRETO
const materia = { descricao: "Fundamentos...", ativo: true };

// ❌ ERRADO
const materia = { nome: "Fundamentos...", ativo: true };
```

## Regras de Negócio
- ⚠️ **NUNCA carregar dados de aulas** — Matérias são independentes
- ✅ Sempre usar campo `descricao` (não `nome`)
- ✅ Sempre ordenar por `descricao`
- ✅ Confirmar antes de deletar
- ✅ Validar descrição como obrigatória
- ✅ Carregar cursos em 2 lugares: filtro + formulário

## Como Usar

### Exemplo: Listar matérias
```javascript
await listarMaterias();  // Carrega e renderiza tabela
```

### Exemplo: Abrir modal
```javascript
await abrirModalMaterias();  // Modal + dropdowns + lista aparece
```

### Exemplo: Filtrar por curso
```javascript
const cursoId = document.getElementById("materiaFiltro").value;
// Aplicar filtro na tabela
```

### Exemplo: Salvar matéria
```javascript
const descricao = document.getElementById("materiaDescricao").value;
// Validar...
await salvarMateria();  // POST ao Supabase
```

## Integração com Outros Módulos
- **Depende de:** `supabase.js` (funções `sbGet`, `sbPost`, `sbPatch`, `sbDelete`)
- **Depende de:** `curso.js` (para carregar dropdown de cursos)
- **Usado por:** `uc.html`, `dashboard.html`
- **Não carrega:** aulas diretamente

## Modificações Comuns
- Alterar colunas de tabela → editar `CRUD_MATERIA.listHeaders` e `listCols`
- Alterar campos de form → editar selectors HTML
- Alterar ordenação → modificar `order=descricao`
- Adicionar filtro por status → expandir `carregarCursosFiltro()`

## ⚠️ Notas Importantes
- **Campo "descricao":** Sempre usar `m.descricao`, nunca `m.nome`
- **Isolamento:** Este módulo NÃO carrega aulas
- **Cache:** `cacheMateria` atualizado ao chamar `listarMaterias()`
- **Dropdowns:** São recarregados a cada `abrirModalMaterias()`

---

## ✅ Checklist para Modificações

- [ ] Usar `descricao` em TODAS as queries e posts
- [ ] Validar campo obrigatório
- [ ] Dropdowns carregam antes da tabela
- [ ] Ordenação padrão é `descricao`
- [ ] Teste de delete com confirmação
