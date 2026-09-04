# Corrigir Listas Numeradas da Apostila

**Objetivo:** Corrigir a renderização das listas numeradas no modal de Apostila e nos demais conteúdos Markdown do dashboard.

**Tech Stack:** HTML, JavaScript e Markdown

---

## Status Geral

| Passo | Descrição | Status |
|-------|-----------|--------|
| 1 | Identificar a causa no parser | ✅ Concluído |
| 2 | Corrigir a captura dos itens numerados | ✅ Concluído |
| 3 | Revisar os blocos afetados | ✅ Concluído |
| 4 | Commit e publicação | ✅ Concluído |

---

### Passo 1: Identificar a causa

**Status:** ✅ Concluído

**Arquivo:** Analisar `sistema/dashboard.html`

**Ação:** Confirmar que a expressão regular cria somente um grupo, enquanto o renderizador tenta ler o segundo grupo.

```javascript
line.match(/^\d+\. (.+)$/); // apenas m[1]
out.push('<li>' + m[2] + '</li>'); // m[2] inexistente
```

**Verificação:** Revisão estática, sem testes.

---

### Passo 2: Corrigir a captura

**Status:** ✅ Concluído

**Arquivo:** Modificar `sistema/dashboard.html`

**Ação:** Capturar separadamente o número e o texto, preservando o uso de `m[2]` para o conteúdo do item.

```javascript
line.match(/^\s*(\d+)\.\s+(.+)$/)
```

**Verificação:** Não executar testes ou navegador.

---

### Passo 3: Revisar os blocos afetados

**Status:** ✅ Concluído

**Arquivo:** Revisar `sistema/FICHA-PRODUTO-MAIS-TECH/INTRODUCAO_COMUNICACAO_ORAL_ESCRITA/Apostila_Comunicacao_Oral_Escrita_33h.md`

**Ação:** Confirmar que os trechos informados usam o mesmo padrão de lista numerada corrigido no parser.

```markdown
1. Primeiro item
2. Segundo item
```

**Verificação:** Revisão textual, sem testes.

---

### Passo 4: Commit e publicação

**Status:** ✅ Concluído

**Arquivos:** `docs/corrigir-listas-numeradas-apostila.md` e `sistema/dashboard.html`

**Ação:** Versionar e publicar a correção no branch principal.

```powershell
git add docs/corrigir-listas-numeradas-apostila.md sistema/dashboard.html
git commit -m "fix: corrigir listas numeradas da apostila"
git push origin main
```

**Verificação:** Confirmar somente o resultado do versionamento.
