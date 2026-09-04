# Insert das Matérias Mais Tech

**Objetivo:** Gerar um SQL idempotente que cadastra as 8 pastas como matérias e as vincula ao curso Rio do Sul Mais Tech.

**Tech Stack:** PostgreSQL e Supabase

---

## Status Geral

| Passo | Descrição | Status |
|-------|-----------|--------|
| 1 | Mapear as pastas para nomes de matérias | ✅ Concluído |
| 2 | Gerar inserts idempotentes | ✅ Concluído |
| 3 | Criar vínculos com o curso | ✅ Concluído |
| 4 | Commit e publicação | ✅ Concluído |

---

### Passo 1: Mapear matérias

**Status:** ✅ Concluído

**Ação:** Converter as 8 pastas em nomes pedagógicos oficiais conforme a ficha do produto.

**Verificação:**

```powershell
Get-ChildItem sistema/FICHA-PRODUTO-MAIS-TECH -Directory
```

Esperado: oito pastas curriculares.

---

### Passo 2: Gerar inserts

**Status:** ✅ Concluído

**Arquivo:** Criar `sistema/supabase-materias-mais-tech.sql`

**Ação:** Inserir somente matérias ainda inexistentes, com status ativo.

```sql
insert into public.materia (descricao, ativo)
select nome, 1 from materias_mais_tech;
```

**Verificação:**

```powershell
Select-String -Path sistema/supabase-materias-mais-tech.sql -Pattern "insert into public.materia"
```

Esperado: insert idempotente presente.

---

### Passo 3: Vincular ao curso

**Status:** ✅ Concluído

**Arquivo:** `sistema/supabase-materias-mais-tech.sql`

**Ação:** Localizar o curso Mais Tech e criar registros em `cursomateria` sem duplicidade.

```sql
insert into public.cursomateria (cursoid, materiaid)
```

**Verificação:**

```powershell
Select-String -Path sistema/supabase-materias-mais-tech.sql -Pattern "insert into public.cursomateria"
```

Esperado: vínculo automático presente.

---

### Passo 4: Commit e publicação

**Status:** ✅ Concluído

**Arquivos:** `docs/insert-materias-mais-tech.md`, `sistema/supabase-materias-mais-tech.sql`

**Ação:** Versionar e publicar no branch principal.

```powershell
git add docs/insert-materias-mais-tech.md sistema/supabase-materias-mais-tech.sql
git commit -m "feat: gerar insert das materias Mais Tech"
git push origin main
```

**Verificação:**

```powershell
git status --short
```

Esperado: arquivos da tarefa sem alterações pendentes.
