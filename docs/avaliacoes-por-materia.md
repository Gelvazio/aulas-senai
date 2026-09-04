# Avaliações por Matéria

**Objetivo:** Adicionar um modal de avaliações a cada matéria, garantindo no mínimo duas avaliações pendentes por matéria.

**Tech Stack:** HTML, CSS, JavaScript, Supabase REST e PostgreSQL

---

## Status Geral

| Passo | Descrição | Status |
|-------|-----------|--------|
| 1 | Criar estrutura de avaliações no Supabase | ✅ Concluído |
| 2 | Adicionar botão e modal de avaliações | ✅ Concluído |
| 3 | Garantir e listar duas avaliações por matéria | ✅ Concluído |
| 4 | Commit e publicação | ✅ Concluído |

---

### Passo 1: Criar estrutura no Supabase

**Status:** ✅ Concluído

**Arquivo:** Criar `sistema/supabase-avaliacoes.sql`

**Ação:** Criar tabela, políticas RLS e função idempotente que garante as avaliações 1 e 2.

```sql
create table if not exists public.avaliacao (...);
```

**Verificação:**

```powershell
Select-String -Path sistema/supabase-avaliacoes.sql -Pattern "garantir_avaliacoes_materia"
```

Esperado: função de garantia definida no SQL.

---

### Passo 2: Adicionar botão e modal

**Status:** ✅ Concluído

**Arquivo:** Modificar `sistema/dashboard.html`

**Ação:** Incluir “Avaliações” nos cards das matérias e criar modal responsivo para a listagem.

```html
<button onclick="abrirAvaliacoesMateria(id)">Avaliações</button>
```

**Verificação:**

```powershell
Select-String -Path sistema/dashboard.html -Pattern "abrirAvaliacoesMateria"
```

Esperado: ação disponível nos cards.

---

### Passo 3: Garantir e listar avaliações

**Status:** ✅ Concluído

**Arquivo:** Modificar `sistema/dashboard.html`

**Ação:** Executar a RPC, consultar avaliações e exibir data e quatro status.

```javascript
await sbRpc('garantir_avaliacoes_materia', { p_materia_id: materiaId });
```

**Verificação:**

```powershell
Select-String -Path sistema/dashboard.html -Pattern "status_criacao|status_revisao|status_cadastro_sgn"
```

Esperado: todos os status são renderizados.

---

### Passo 4: Commit e publicação

**Status:** ✅ Concluído

**Arquivos:** `docs/avaliacoes-por-materia.md`, `sistema/dashboard.html`, `sistema/supabase-avaliacoes.sql`

**Ação:** Versionar e publicar no branch principal.

```powershell
git add docs/avaliacoes-por-materia.md sistema/dashboard.html sistema/supabase-avaliacoes.sql
git commit -m "feat: adicionar avaliacoes por materia"
git push origin main
```

**Verificação:**

```powershell
git status --short
```

Esperado: arquivos da tarefa sem alterações pendentes.
