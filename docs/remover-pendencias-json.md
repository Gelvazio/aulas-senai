# Remover Pendências JSON

**Objetivo:** Remover o arquivo local `sistema/pendencias.json` após a migração do CRUD para o Supabase.

**Tech Stack:** Supabase e Git

---

## Status Geral

| Passo | Descrição | Status |
|-------|-----------|--------|
| 1 | Marcar documentação anterior como substituída | ✅ Concluído |
| 2 | Excluir o arquivo JSON local | ✅ Concluído |
| 3 | Commit e publicação | ✅ Concluído |

---

### Passo 1: Atualizar documentação histórica

**Status:** ✅ Concluído

**Arquivo:** Modificar `docs/minhas-pendencias-dashboard.md`

**Ação:** Informar que a implementação baseada em JSON foi substituída pelo CRUD no Supabase.

**Verificação:**

```powershell
Select-String -Path docs/minhas-pendencias-dashboard.md -Pattern "Substituída"
```

Esperado: documentação histórica sinalizada como substituída.

---

### Passo 2: Excluir JSON local

**Status:** ✅ Concluído

**Arquivo:** Excluir `sistema/pendencias.json`

**Ação:** Remover a fonte local que deixou de ser usada pelo dashboard.

**Verificação:**

```powershell
Test-Path sistema/pendencias.json
```

Esperado: `False`.

---

### Passo 3: Commit e publicação

**Status:** ✅ Concluído

**Ação:** Versionar a remoção e enviar ao branch principal.

```powershell
git add docs/minhas-pendencias-dashboard.md docs/remover-pendencias-json.md sistema/pendencias.json
git commit -m "chore: remover arquivo local de pendencias"
git push origin main
```

**Verificação:**

```powershell
git status --short
```

Esperado: arquivos da tarefa sem alterações pendentes.
