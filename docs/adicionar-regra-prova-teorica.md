# Adicionar Regra de Prova Teórica

**Objetivo:** Registrar na estrutura das UCs que provas teóricas devem ficar em `AVALIACOES_CRIADAS/PROVA_TEORICA/`.

**Tech Stack:** Markdown e Git

---

## Status Geral

| Passo | Descrição | Status |
|-------|-----------|--------|
| 1 | Atualizar a regra em `CLAUDE.md` | ✅ Concluído |
| 2 | Registrar a tarefa | ✅ Concluído |
| 3 | Commit e push | ✅ Concluído |

---

### Passo 1: Atualizar a estrutura das UCs

**Status:** ✅ Concluído

**Arquivo:** Modificar `C:\fontes\professor-senai\CLAUDE.md`

**Ação:** Adicionar a regra abaixo na seção `Estrutura de Unidades Curriculares`:

```markdown
**Prova Teórica:** sempre em `AVALIACOES_CRIADAS/PROVA_TEORICA/`.
```

**Verificação:** Conferir o diff do arquivo.

---

### Passo 2: Registrar a tarefa

**Status:** ✅ Concluído

**Arquivo:** Criar `C:\fontes\professor-senai\docs\adicionar-regra-prova-teorica.md`

**Ação:** Documentar objetivo, alteração e publicação.

**Verificação:** Conferir a presença deste documento.

---

### Passo 3: Commit e push

**Status:** ✅ Concluído

```powershell
git add CLAUDE.md docs/adicionar-regra-prova-teorica.md
git commit -m "Adiciona regra de organização de provas teóricas"
git push origin main
```

**Verificação:** Conferir o envio para `origin/main`.
