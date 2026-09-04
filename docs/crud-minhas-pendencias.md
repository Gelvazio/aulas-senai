# CRUD Minhas Pendências

**Objetivo:** Transformar o modal de pendências em um CRUD completo persistido no Supabase.

**Tech Stack:** HTML, CSS, JavaScript, Supabase REST e PostgreSQL

---

## Status Geral

| Passo | Descrição | Status |
|-------|-----------|--------|
| 1 | Criar formulário e ações do CRUD | ✅ Concluído |
| 2 | Implementar persistência e edição no Supabase | ✅ Concluído |
| 3 | Implementar exclusão e estrutura SQL | ✅ Concluído |
| 4 | Commit e publicação | ✅ Concluído |

---

### Passo 1: Criar formulário e ações

**Status:** ✅ Concluído

**Arquivo:** Modificar `sistema/dashboard.html`

**Ação:** Adicionar toolbar, formulário responsivo e botões para criar, editar e excluir registros.

```html
<button onclick="novaPendencia()">＋ Nova Pendência</button>
<button onclick="carregarPendenciasSupabase()">↻ Atualizar</button>
```

**Verificação:**

```powershell
Select-String -Path sistema/dashboard.html -Pattern "novaPendencia|carregarPendenciasSupabase"
```

Esperado: ações do CRUD presentes no modal.

---

### Passo 2: Implementar persistência e edição no Supabase

**Status:** ✅ Concluído

**Arquivo:** Modificar `sistema/dashboard.html`

**Ação:** Ler e gravar a tabela `pendencias` pela API REST existente e reutilizar o formulário na edição.

```javascript
await sbPost('pendencias', dados);
```

**Verificação:**

```powershell
Select-String -Path sistema/dashboard.html -Pattern "sbPost\('pendencias'|sbPatch\('pendencias'"
```

Esperado: chave de persistência definida no código.

---

### Passo 3: Excluir e criar estrutura SQL

**Status:** ✅ Concluído

**Arquivos:** Modificar `sistema/dashboard.html` e criar `sistema/supabase-pendencias.sql`

**Ação:** Permitir remoção com confirmação e versionar a criação da tabela, políticas RLS e carga inicial.

```javascript
await sbDelete('pendencias', 'id=eq.' + id);
```

**Verificação:**

```powershell
Select-String -Path sistema/dashboard.html,sistema/supabase-pendencias.sql -Pattern "excluirPendencia|create table"
```

Esperado: rotinas de exportação e exclusão presentes.

---

### Passo 4: Commit e publicação

**Status:** ✅ Concluído

**Arquivos:** `docs/crud-minhas-pendencias.md`, `sistema/dashboard.html`, `sistema/supabase-pendencias.sql`

**Ação:** Versionar e publicar a implementação no branch principal.

```powershell
git add docs/crud-minhas-pendencias.md sistema/dashboard.html sistema/supabase-pendencias.sql
git commit -m "feat: criar CRUD de pendencias do professor"
git push origin main
```

**Verificação:**

```powershell
git status --short
```

Esperado: arquivos da tarefa sem alterações pendentes.
