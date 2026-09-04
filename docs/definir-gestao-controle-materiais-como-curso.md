# Definir Gestão e Controle de Materiais como Curso

**Objetivo:** Classificar `GESTAO_E_CONTROLE_MATERIAIS` como curso que contém matérias, e não como uma matéria/UC.

**Tech Stack:** Markdown e Git

---

## Status Geral

| Passo | Descrição | Status |
|-------|-----------|--------|
| 1 | Atualizar a classificação em `CLAUDE.md` | ✅ Concluído |
| 2 | Registrar a tarefa | ✅ Concluído |
| 3 | Commit e push | ✅ Concluído |

---

### Passo 1: Atualizar a classificação

**Status:** ✅ Concluído

**Arquivo:** Modificar `C:\fontes\professor-senai\CLAUDE.md`

**Ação:** Definir `GESTAO_E_CONTROLE_MATERIAIS` como pasta de curso/contêiner e suas subpastas pedagógicas como matérias.

```markdown
**Gestão e Controle de Materiais:** `sistema/GESTAO_E_CONTROLE_MATERIAIS/` é uma pasta de curso. Ela não é uma matéria; contém as matérias do curso.
```

**Verificação:** Conferir a regra na seção de estrutura das UCs.

---

### Passo 2: Registrar a tarefa

**Status:** ✅ Concluído

**Arquivo:** Criar `C:\fontes\professor-senai\docs\definir-gestao-controle-materiais-como-curso.md`

**Ação:** Documentar objetivo, regra e publicação.

**Verificação:** Conferir a presença deste documento.

---

### Passo 3: Commit e push

**Status:** ✅ Concluído

```powershell
git add CLAUDE.md docs/definir-gestao-controle-materiais-como-curso.md
git commit -m "Define Gestão e Controle de Materiais como curso"
git push origin main
```

**Verificação:** Conferir o envio para `origin/main`.
