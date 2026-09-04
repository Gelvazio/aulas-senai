# Ementa por Matéria

**Objetivo:** Adicionar um botão “Ementa” em cada matéria, com caminho editável e visualização em modal.

**Tech Stack:** HTML, CSS, JavaScript, Markdown e Supabase

---

## Status Geral

| Passo | Descrição | Status |
|-------|-----------|--------|
| 1 | Adicionar caminho da ementa no banco | ✅ Concluído |
| 2 | Adicionar campo ao formulário de matéria | ✅ Concluído |
| 3 | Criar botão e modal de ementa | ✅ Concluído |
| 4 | Commit e publicação | ✅ Concluído |

---

### Passo 1: Persistir caminhos

**Status:** ✅ Concluído

**Arquivo:** Modificar `sistema/supabase-materias-mais-tech.sql`

**Ação:** Adicionar `ementa_caminho` e preencher os caminhos das 8 matérias.

```sql
alter table public.materia add column if not exists ementa_caminho text;
```

**Verificação:**

```powershell
Select-String -Path sistema/supabase-materias-mais-tech.sql -Pattern "ementa_caminho"
```

Esperado: coluna e caminhos presentes.

---

### Passo 2: Editar caminho

**Status:** ✅ Concluído

**Arquivo:** Modificar `sistema/dashboard.html`

**Ação:** Incluir o caminho no formulário de cadastro e edição de matéria.

```html
<input id="cursoMateriaEmenta" type="text">
```

**Verificação:**

```powershell
Select-String -Path sistema/dashboard.html -Pattern "cursoMateriaEmenta"
```

Esperado: campo integrado ao CRUD.

---

### Passo 3: Visualizar ementa

**Status:** ✅ Concluído

**Arquivo:** Modificar `sistema/dashboard.html`

**Ação:** Adicionar botão, carregar o Markdown e renderizar em modal.

```javascript
const resposta = await fetch(materia.ementa_caminho);
```

**Verificação:**

```powershell
Select-String -Path sistema/dashboard.html -Pattern "abrirEmentaMateria"
```

Esperado: botão e modal implementados.

---

### Passo 4: Commit e publicação

**Status:** ✅ Concluído

**Arquivos:** `docs/ementa-por-materia.md`, `sistema/dashboard.html`, `sistema/supabase-materias-mais-tech.sql`

**Ação:** Versionar e publicar no branch principal.

```powershell
git add docs/ementa-por-materia.md sistema/dashboard.html sistema/supabase-materias-mais-tech.sql
git commit -m "feat: adicionar ementa por materia"
git push origin main
```

**Verificação:**

```powershell
git status --short
```

Esperado: arquivos da tarefa sem alterações pendentes.
