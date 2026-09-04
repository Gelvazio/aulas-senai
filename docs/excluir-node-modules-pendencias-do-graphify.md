# Excluir Node Modules de Pendências do Graphify

**Objetivo:** Impedir que o Graphify leia `sistema/PENDENCIAS-PROFESSOR/node_modules/`.

**Tech Stack:** Graphify, arquivo `.graphifyignore` e Git

---

## Status Geral

| Passo | Descrição | Status |
|-------|-----------|--------|
| 1 | Criar regra de exclusão | ✅ Concluído |
| 2 | Atualizar o grafo | ✅ Concluído |
| 3 | Atualizar o contexto do projeto | ✅ Concluído |
| 4 | Commit e push | ✅ Concluído |

---

### Passo 1: Criar regra de exclusão

**Status:** ✅ Concluído

**Arquivo:** Criar `C:\fontes\professor-senai\.graphifyignore`

**Ação:** Adicionar o caminho específico das dependências da aplicação de pendências.

```gitignore
sistema/PENDENCIAS-PROFESSOR/node_modules/
```

**Verificação:** Conferir que a regra existe no arquivo.

---

### Passo 2: Atualizar o grafo

**Status:** ✅ Concluído

```powershell
graphify update .
```

**Verificação:** Conferir a conclusão do Graphify e o relatório atualizado.

---

### Passo 3: Atualizar o contexto

**Status:** ✅ Concluído

**Arquivo:** Modificar `C:\fontes\professor-senai\CLAUDE.md`

**Ação:** Registrar a exclusão permanente de `node_modules` do corpus.

**Verificação:** Conferir o diff do arquivo.

---

### Passo 4: Commit e push

**Status:** ✅ Concluído

```powershell
git add .graphifyignore CLAUDE.md docs/excluir-node-modules-pendencias-do-graphify.md graphify-out
git commit -m "Exclui node_modules de pendências do Graphify"
git push origin main
```

**Verificação:** Conferir o envio para `origin/main`.
