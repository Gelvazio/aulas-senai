# Ajuste das Ementas

**Objetivo:** Garantir que as oito ementas do Rio do Sul Mais Tech sejam localizadas mesmo quando o caminho ainda não estiver persistido no Supabase.

**Tech Stack:** HTML, JavaScript, Markdown e Supabase

---

## Status Geral

| Passo | Descrição | Status |
|-------|-----------|--------|
| 1 | Mapear caminhos-padrão das ementas | ✅ Concluído |
| 2 | Aplicar fallback na edição e visualização | ✅ Concluído |
| 3 | Revisar alterações sem executar testes | ✅ Concluído |
| 4 | Commit e publicação | ✅ Concluído |

---

### Passo 1: Mapear caminhos-padrão

**Status:** ✅ Concluído

**Arquivo:** Modificar `sistema/dashboard.html`

**Ação:** Criar um mapa centralizado com os caminhos dos oito arquivos de ementa e resolver o caminho pela descrição da matéria.

```javascript
const EMENTAS_PADRAO_POR_MATERIA = {};
function obterCaminhoEmentaMateria(materia) {}
```

**Verificação:**

```powershell
Select-String -Path sistema/dashboard.html -Pattern "EMENTAS_PADRAO_POR_MATERIA"
```

Esperado: mapa e função de resolução presentes.

---

### Passo 2: Aplicar fallback

**Status:** ✅ Concluído

**Arquivo:** Modificar `sistema/dashboard.html`

**Ação:** Usar o caminho personalizado quando existente e o caminho-padrão nos demais casos, tanto no formulário quanto no modal.

```javascript
const caminhoEmenta = obterCaminhoEmentaMateria(materia);
```

**Verificação:**

```powershell
Select-String -Path sistema/dashboard.html -Pattern "obterCaminhoEmentaMateria"
```

Esperado: edição e visualização compartilham a mesma resolução de caminho.

---

### Passo 3: Revisar alterações

**Status:** ✅ Concluído

**Arquivos:** `docs/ajuste-ementas.md`, `sistema/dashboard.html`

**Ação:** Inspecionar o diff sem executar testes, conforme a regra do projeto.

**Verificação:**

```powershell
git diff --check
```

Esperado: revisão estática concluída, sem execução de testes.

---

### Passo 4: Commit e publicação

**Status:** ✅ Concluído

**Arquivos:** `docs/ajuste-ementas.md`, `sistema/dashboard.html`

**Ação:** Versionar e publicar o ajuste no branch principal.

```powershell
git add docs/ajuste-ementas.md sistema/dashboard.html
git commit -m "fix: ajustar caminhos das ementas"
git push origin main
```

**Verificação:** Não executar testes; confirmar apenas o resultado dos comandos de versionamento.
