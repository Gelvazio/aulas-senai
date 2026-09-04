# Modal de Matérias por Curso

**Objetivo:** Fazer o botão “Acessar” dos cards de cursos abrir um modal com cards das matérias vinculadas ao curso.

**Tech Stack:** HTML, CSS, JavaScript e Supabase REST

---

## Status Geral

| Passo | Descrição | Status |
|-------|-----------|--------|
| 1 | Redirecionar o botão Acessar | ✅ Concluído |
| 2 | Criar cards de matérias no modal | ✅ Concluído |
| 3 | Integrar matérias e cursos pelo Supabase | ✅ Concluído |
| 4 | Commit e publicação | ✅ Concluído |

---

### Passo 1: Redirecionar o botão Acessar

**Status:** ✅ Concluído

**Arquivo:** Modificar `sistema/dashboard.html`

**Ação:** Trocar a abertura direta das aulas pela abertura do modal de matérias.

```html
<button onclick="abrirCursoModal('codigo-do-curso')">Acessar ↗</button>
```

**Verificação:**

```powershell
Select-String -Path sistema/dashboard.html -Pattern "onclick=\"abrirCursoModal"
```

Esperado: botão associado ao modal de matérias.

---

### Passo 2: Criar cards de matérias

**Status:** ✅ Concluído

**Arquivo:** Modificar `sistema/dashboard.html`

**Ação:** Renderizar cards responsivos com nome, código, situação e ação para abrir aulas.

```html
<article class="curso-materia-card">...</article>
```

**Verificação:**

```powershell
Select-String -Path sistema/dashboard.html -Pattern "curso-materia-card"
```

Esperado: estrutura e estilos dos cards presentes.

---

### Passo 3: Integrar com Supabase

**Status:** ✅ Concluído

**Arquivo:** Modificar `sistema/dashboard.html`

**Ação:** Consultar `cursomateria` e `materia`, tratando carregamento, vazio e erro.

```javascript
const vinculos = await sbGet('cursomateria', `cursoid=eq.${curso.idNum}&select=materiaid`);
```

**Verificação:**

```powershell
Select-String -Path sistema/dashboard.html -Pattern "cursoid=eq.*select=materiaid"
```

Esperado: vínculo curso-matéria utilizado na listagem.

---

### Passo 4: Commit e publicação

**Status:** ✅ Concluído

**Arquivos:** `docs/modal-materias-por-curso.md`, `sistema/dashboard.html`

**Ação:** Versionar e publicar no branch principal.

```powershell
git add docs/modal-materias-por-curso.md sistema/dashboard.html
git commit -m "feat: listar materias ao acessar curso"
git push origin main
```

**Verificação:**

```powershell
git status --short
```

Esperado: arquivos da tarefa sem alterações pendentes.
