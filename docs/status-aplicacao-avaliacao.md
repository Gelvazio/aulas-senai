# Status de Aplicação da Avaliação

**Objetivo:** Adicionar ao CRUD de avaliações o campo “Aplicação da Avaliação”.

**Tech Stack:** HTML, JavaScript, Supabase REST e PostgreSQL

---

## Status Geral

| Passo | Descrição | Status |
|-------|-----------|--------|
| 1 | Adicionar coluna no Supabase | ✅ Concluído |
| 2 | Adicionar campo no formulário | ✅ Concluído |
| 3 | Exibir e persistir o novo status | ✅ Concluído |
| 4 | Commit e publicação | ✅ Concluído |

---

### Passo 1: Adicionar coluna

**Status:** ✅ Concluído

**Arquivo:** Modificar `sistema/supabase-avaliacoes.sql`

**Ação:** Criar `status_aplicacao` com valor inicial `PENDENTE` e opções controladas.

```sql
status_aplicacao text not null default 'PENDENTE'
```

**Verificação:**

```powershell
Select-String -Path sistema/supabase-avaliacoes.sql -Pattern "status_aplicacao"
```

Esperado: coluna presente na criação e na migração idempotente.

---

### Passo 2: Adicionar ao formulário

**Status:** ✅ Concluído

**Arquivo:** Modificar `sistema/dashboard.html`

**Ação:** Adicionar seleção com Pendente, Concluído e Cancelado.

```html
<select id="avaliacaoStatusAplicacao">...</select>
```

**Verificação:**

```powershell
Select-String -Path sistema/dashboard.html -Pattern "avaliacaoStatusAplicacao"
```

Esperado: campo presente no formulário.

---

### Passo 3: Exibir e persistir

**Status:** ✅ Concluído

**Arquivo:** Modificar `sistema/dashboard.html`

**Ação:** Mostrar “Aplicação da Avaliação” no card e incluir o campo no cadastro e edição.

```javascript
status_aplicacao: document.getElementById('avaliacaoStatusAplicacao').value
```

**Verificação:**

```powershell
Select-String -Path sistema/dashboard.html -Pattern "Aplicação da avaliação|status_aplicacao"
```

Esperado: valor renderizado e enviado ao Supabase.

---

### Passo 4: Commit e publicação

**Status:** ✅ Concluído

**Arquivos:** `docs/status-aplicacao-avaliacao.md`, `sistema/dashboard.html`, `sistema/supabase-avaliacoes.sql`

**Ação:** Versionar e publicar no branch principal.

```powershell
git add docs/status-aplicacao-avaliacao.md sistema/dashboard.html sistema/supabase-avaliacoes.sql
git commit -m "feat: adicionar status de aplicacao da avaliacao"
git push origin main
```

**Verificação:**

```powershell
git status --short
```

Esperado: arquivos da tarefa sem alterações pendentes.
