# CRUD de Avaliações por Matéria

**Objetivo:** Transformar o modal de avaliações em CRUD completo sem permitir menos de duas avaliações por matéria.

**Tech Stack:** HTML, CSS, JavaScript, Supabase REST e PostgreSQL

---

## Status Geral

| Passo | Descrição | Status |
|-------|-----------|--------|
| 1 | Criar formulário do CRUD | ✅ Concluído |
| 2 | Implementar cadastro e edição | ✅ Concluído |
| 3 | Implementar exclusão com mínimo de duas avaliações | ✅ Concluído |
| 4 | Commit e publicação | ✅ Concluído |

---

### Passo 1: Criar formulário

**Status:** ✅ Concluído

**Arquivo:** Modificar `sistema/dashboard.html`

**Ação:** Adicionar toolbar e formulário para título, data e quatro status.

```html
<button onclick="novaAvaliacao()">＋ Nova Avaliação</button>
```

**Verificação:**

```powershell
Select-String -Path sistema/dashboard.html -Pattern "novaAvaliacao"
```

Esperado: ação e formulário presentes.

---

### Passo 2: Cadastrar e editar

**Status:** ✅ Concluído

**Arquivo:** Modificar `sistema/dashboard.html`

**Ação:** Usar `sbPost` e `sbPatch` para persistir as avaliações no Supabase.

```javascript
await sbPost('avaliacao', dados);
await sbPatch('avaliacao', 'id', id, dados);
```

**Verificação:**

```powershell
Select-String -Path sistema/dashboard.html -Pattern "sbPost\('avaliacao'|sbPatch\('avaliacao'"
```

Esperado: operações de criação e atualização presentes.

---

### Passo 3: Excluir mantendo o mínimo

**Status:** ✅ Concluído

**Arquivos:** Modificar `sistema/dashboard.html` e `sistema/supabase-avaliacoes.sql`

**Ação:** Bloquear exclusão com duas avaliações tanto na interface quanto no banco.

```sql
create trigger avaliacao_minimo_duas
before delete on public.avaliacao ...;
```

**Verificação:**

```powershell
Select-String -Path sistema/supabase-avaliacoes.sql -Pattern "avaliacao_minimo_duas"
```

Esperado: regra de integridade presente.

---

### Passo 4: Commit e publicação

**Status:** ✅ Concluído

**Arquivos:** `docs/crud-avaliacoes-materia.md`, `sistema/dashboard.html`, `sistema/supabase-avaliacoes.sql`

**Ação:** Versionar e publicar no branch principal.

```powershell
git add docs/crud-avaliacoes-materia.md sistema/dashboard.html sistema/supabase-avaliacoes.sql
git commit -m "feat: criar CRUD de avaliacoes por materia"
git push origin main
```

**Verificação:**

```powershell
git status --short
```

Esperado: arquivos da tarefa sem alterações pendentes.
