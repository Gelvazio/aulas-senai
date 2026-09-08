# 📚 ORIENTACAO_JS_UNIDADE.md

## Propósito
Gerenciar operações CRUD (Create, Read, Update, Delete) de **Unidades** (filiais/locais) no sistema.

## Localização
`C:\fontes\aulas-senai\sistema\js\unidade.js`

## Responsabilidades
- ✅ Listar unidades (tabela, filtros, ordenação)
- ✅ Criar nova unidade
- ✅ Editar unidade existente
- ✅ Deletar unidade com confirmação
- ✅ Abrir/fechar modal de unidades
- ✅ Cache local de unidades

## Estrutura Principal

### Variáveis
```javascript
let cacheUnidade = [];  // Array com unidades carregadas

const CRUD_UNIDADE = {
  label: "Unidades",
  table: "unidade",
  listHeaders: ["ID", "Descrição", "Cidade", "Bairro", "Endereço", "Ações"],
  listCols: ["id", "descricao", "cidade", "bairro", "endereco", "id"],
  createFields: [
    { key: "descricao", label: "Descrição", type: "text", required: true },
    { key: "cidade", label: "Cidade", type: "text" },
    { key: "bairro", label: "Bairro", type: "text" },
    { key: "endereco", label: "Endereço", type: "text" },
  ],
};
```

### Funções Principais

| Função | Propósito |
|--------|-----------|
| `abrirModalUnidades()` | Abre modal e carrega lista de unidades |
| `fecharModalUnidades()` | Fecha modal |
| `listarUnidades()` | Fetch unidades do Supabase, renderiza tabela |
| `editarUnidade(id)` | Carrega unidade para edição |
| `excluirUnidade(id, descricao)` | Deleta unidade com confirmação |
| `salvarUnidade()` | Salva unidade novo ou editada |
| `fecharFormUnidade()` | Limpa form após salvar |

## Tabela Supabase
- **Nome:** `unidade`
- **Colunas principais:** `id`, `descricao`, `cidade`, `bairro`, `endereco`
- **Ordenação padrão:** `descricao` (A-Z)

## Regras de Negócio
- ⚠️ **NUNCA carregar dados de outros módulos** — Unidades são isoladas
- ✅ Sempre ordenar por `descricao`
- ✅ Confirmar antes de deletar
- ✅ Validar descrição como obrigatória
- ✅ Campos de endereço são opcionais

## Como Usar

### Exemplo: Listar unidades
```javascript
await listarUnidades();  // Carrega e renderiza tabela
```

### Exemplo: Abrir modal
```javascript
await abrirModalUnidades();  // Modal + lista aparece
```

### Exemplo: Criar nova unidade
```javascript
// Form preenchido pelo usuário
// Ao clicar "Salvar"
await salvarUnidade();  // POST ao Supabase
```

### Exemplo: Editar unidade
```javascript
await editarUnidade(5);  // Carrega unidade ID 5 no form
```

### Exemplo: Deletar unidade
```javascript
await excluirUnidade(5, "SENAI Centro");  // Deleta com confirmação
```

## Integração com Outros Módulos
- **Depende de:** `supabase.js` (funções `sbGet`, `sbPost`, `sbPatch`, `sbDelete`)
- **Usado por:** Admin/gerenciamento (não está em dashboard principal)
- **Não carrega:** cursos, matérias, aulas

## Modificações Comuns
- Alterar campos de formulário → editar `CRUD_UNIDADE.createFields`
- Alterar colunas da tabela → editar `CRUD_UNIDADE.listHeaders` e `listCols`
- Alterar ordenação → modificar string `order=descricao` em `listarUnidades()`
- Adicionar validação de CEP → criar função `validarCEP()` antes de salvar

## ⚠️ Notas Importantes
- **Isolamento:** Este módulo NÃO carrega dados de cursos/matérias
- **Cache:** `cacheUnidade` é atualizado apenas ao chamar `listarUnidades()`
- **Modal:** HTML do modal deve estar em `dashboard.html` (admin mode) com ID `modalUnidades`
- **Endereço:** Campos opcionais para flexibilidade

---

## ✅ Checklist para Modificações

- [ ] Modal abre corretamente
- [ ] Listagem ordena por descrição
- [ ] Criar/editar validam descrição obrigatória
- [ ] Delete pede confirmação
- [ ] Tabela renderiza 5 colunas corretas
- [ ] Formulário tem campos de cidade/bairro/endereço
