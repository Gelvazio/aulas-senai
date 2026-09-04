# Definir Ficha Produto Mais Tech como Curso

**Objetivo:** Classificar `FICHA-PRODUTO-MAIS-TECH` como curso que contém matérias, e não como uma matéria/UC.

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

**Ação:** Definir `FICHA-PRODUTO-MAIS-TECH` como pasta de curso/contêiner e suas subpastas pedagógicas como matérias.

```markdown
**Ficha Produto Mais Tech:** `sistema/FICHA-PRODUTO-MAIS-TECH/` é uma pasta de curso. Ela não é uma matéria; contém as matérias do curso.
```

**Verificação:** Conferir a regra na seção de estrutura das UCs.

---

### Passo 2: Registrar a tarefa

**Status:** ✅ Concluído

**Arquivo:** Criar `C:\fontes\professor-senai\docs\definir-ficha-produto-mais-tech-como-curso.md`

**Ação:** Documentar objetivo, regra e publicação.

**Verificação:** Conferir a presença deste documento.

---

### Passo 3: Commit e push

**Status:** ✅ Concluído

```powershell
git add CLAUDE.md docs/definir-ficha-produto-mais-tech-como-curso.md
git commit -m "Define Ficha Produto Mais Tech como curso"
git push origin main
```

**Verificação:** Conferir o envio para `origin/main`.
