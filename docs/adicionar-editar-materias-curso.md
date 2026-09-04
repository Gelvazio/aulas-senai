# Adicionar e Editar Matérias no Curso

**Objetivo:** Permitir cadastrar e editar matérias diretamente no modal de matérias de cada curso.

**Tech Stack:** HTML, CSS, JavaScript e Supabase REST

---

## Status Geral

| Passo | Descrição | Status |
|-------|-----------|--------|
| 1 | Criar formulário de matéria no modal | ✅ Concluído |
| 2 | Implementar cadastro e vínculo com curso | ✅ Concluído |
| 3 | Implementar edição da matéria | ✅ Concluído |
| 4 | Commit e publicação | ✅ Concluído |

---

### Passo 1: Criar formulário

**Status:** ✅ Concluído

**Arquivo:** Modificar `sistema/dashboard.html`

**Ação:** Adicionar botão, formulário de nome e status ativo.

```html
<button onclick="novaMateriaCurso()">＋ Adicionar Matéria</button>
```

**Verificação:**

```powershell
Select-String -Path sistema/dashboard.html -Pattern "novaMateriaCurso"
```

Esperado: ação presente no modal.

---

### Passo 2: Cadastrar e vincular

**Status:** ✅ Concluído

**Arquivo:** Modificar `sistema/dashboard.html`

**Ação:** Criar o registro em `materia` e o vínculo em `cursomateria`.

```javascript
const criada = await sbPost('materia', dados);
await sbPost('cursomateria', { cursoid, materiaid: criada[0].id });
```

**Verificação:**

```powershell
Select-String -Path sistema/dashboard.html -Pattern "sbPost\(\"cursomateria\""
```

Esperado: criação do vínculo implementada.

---

### Passo 3: Editar matéria

**Status:** ✅ Concluído

**Arquivo:** Modificar `sistema/dashboard.html`

**Ação:** Abrir o mesmo formulário preenchido e atualizar o registro no Supabase.

```javascript
await sbPatch('materia', 'id', id, dados);
```

**Verificação:**

```powershell
Select-String -Path sistema/dashboard.html -Pattern "editarMateriaCurso|salvarMateriaCurso"
```

Esperado: edição disponível em cada card.

---

### Passo 4: Commit e publicação

**Status:** ✅ Concluído

**Arquivos:** `docs/adicionar-editar-materias-curso.md`, `sistema/dashboard.html`

**Ação:** Versionar e publicar no branch principal.

```powershell
git add docs/adicionar-editar-materias-curso.md sistema/dashboard.html
git commit -m "feat: adicionar cadastro e edicao de materias no curso"
git push origin main
```

**Verificação:**

```powershell
git status --short
```

Esperado: arquivos da tarefa sem alterações pendentes.
