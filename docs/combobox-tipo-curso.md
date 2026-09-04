# Combobox de Tipo de Curso

**Objetivo:** Substituir o campo textual “Tipo de Curso” por um combobox.

**Tech Stack:** HTML e JavaScript

---

## Status Geral

| Passo | Descrição | Status |
|-------|-----------|--------|
| 1 | Substituir input por select | ✅ Concluído |
| 2 | Preencher opções de forma dinâmica | ✅ Concluído |
| 3 | Commit e publicação | ✅ Concluído |

---

### Passo 1: Substituir campo

**Status:** ✅ Concluído

**Arquivo:** Modificar `sistema/dashboard.html`

**Ação:** Trocar o input de texto por um select.

```html
<select class="crud-input" id="cfTipo"></select>
```

**Verificação:**

```powershell
Select-String -Path sistema/dashboard.html -Pattern 'select class="crud-input" id="cfTipo"'
```

Esperado: combobox presente.

---

### Passo 2: Preencher opções

**Status:** ✅ Concluído

**Arquivo:** Modificar `sistema/dashboard.html`

**Ação:** Combinar tipos existentes no Supabase com opções usuais do SENAI.

```javascript
function preencherTiposCurso(valorAtual) { ... }
```

**Verificação:**

```powershell
Select-String -Path sistema/dashboard.html -Pattern "preencherTiposCurso"
```

Esperado: edição e cadastro preenchem o combobox.

---

### Passo 3: Commit e publicação

**Status:** ✅ Concluído

**Arquivos:** `docs/combobox-tipo-curso.md`, `sistema/dashboard.html`

**Ação:** Versionar e publicar no branch principal.

```powershell
git add docs/combobox-tipo-curso.md sistema/dashboard.html
git commit -m "feat: transformar tipo de curso em combobox"
git push origin main
```

**Verificação:**

```powershell
git status --short
```

Esperado: arquivos da tarefa sem alterações pendentes.
