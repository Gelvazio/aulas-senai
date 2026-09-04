# Corrigir Hover de Editar Matéria

**Objetivo:** Manter o texto do botão “Editar Matéria” branco e legível ao passar o mouse.

**Tech Stack:** CSS

---

## Status Geral

| Passo | Descrição | Status |
|-------|-----------|--------|
| 1 | Identificar conflito de estilos | ✅ Concluído |
| 2 | Corrigir cor no hover | ✅ Concluído |
| 3 | Commit e publicação | ✅ Concluído |

---

### Passo 1: Identificar conflito

**Status:** ✅ Concluído

**Arquivo:** `sistema/dashboard.html`

**Ação:** Confirmar que o hover geral muda o fundo sem sobrescrever o texto azul da variante de edição.

**Verificação:**

```powershell
Select-String -Path sistema/dashboard.html -Pattern "curso-materia-acessar:hover|curso-materia-editar"
```

Esperado: ambos os seletores localizados.

---

### Passo 2: Corrigir hover

**Status:** ✅ Concluído

**Arquivo:** Modificar `sistema/dashboard.html`

**Ação:** Definir texto branco no hover específico do botão.

```css
.curso-materia-editar:hover { color: #fff; }
```

**Verificação:**

```powershell
Select-String -Path sistema/dashboard.html -Pattern "curso-materia-editar:hover"
```

Esperado: regra específica presente.

---

### Passo 3: Commit e publicação

**Status:** ✅ Concluído

**Arquivos:** `docs/corrigir-hover-editar-materia.md`, `sistema/dashboard.html`

**Ação:** Versionar e publicar no branch principal.

```powershell
git add docs/corrigir-hover-editar-materia.md sistema/dashboard.html
git commit -m "fix: manter texto visivel no hover de editar materia"
git push origin main
```

**Verificação:**

```powershell
git status --short
```

Esperado: arquivos da tarefa sem alterações pendentes.
