# Corrigir Carregamento da Ementa de TIC

**Objetivo:** Carregar a ementa oficial de Introdução à Tecnologia da Informação e Comunicação mesmo quando o caminho salvo no banco estiver ausente ou inválido.

**Tech Stack:** HTML, JavaScript e Markdown

---

## Status Geral

| Passo | Descrição | Status |
|-------|-----------|--------|
| 1 | Identificar a causa | ✅ Concluído |
| 2 | Adicionar o caminho-padrão da UC | ✅ Concluído |
| 3 | Aplicar fallback após falha do caminho salvo | ✅ Concluído |
| 4 | Commit e publicação | ✅ Concluído |

---

### Passo 1: Identificar a causa

**Status:** ✅ Concluído

**Arquivo:** Analisar `sistema/dashboard.html`

**Ação:** Confirmar que a mensagem ocorre após falha do `fetch`, que o arquivo existe e que a matéria não está no mapa de caminhos-padrão.

```javascript
if (!resposta.ok) throw new Error("HTTP " + resposta.status);
```

**Verificação:** Revisão estática, sem testes.

---

### Passo 2: Adicionar o caminho-padrão

**Status:** ✅ Concluído

**Arquivo:** Modificar `sistema/dashboard.html`

**Ação:** Mapear a descrição normalizada da UC para o arquivo Markdown oficial.

```javascript
"introducao a tecnologia da informacao e comunicacao": "INTRODUCAO_A_TECNOLOGIA_DA_INFORMACAO_E_COMUNICACAO/EMENTA-INTRODUCAO-TENOLOGIA-INFORMACAO.md"
```

**Verificação:** Não executar testes ou navegador.

---

### Passo 3: Aplicar fallback

**Status:** ✅ Concluído

**Arquivo:** Modificar `sistema/dashboard.html`

**Ação:** Tentar primeiro o caminho salvo e, se falhar, tentar o caminho-padrão oficial sem repetir URLs.

```javascript
for (const caminho of caminhosEmenta) {
  const resposta = await fetch(caminho, { cache: "no-store" });
}
```

**Verificação:** Revisão estática do diff, sem testes.

---

### Passo 4: Commit e publicação

**Status:** ✅ Concluído

**Arquivos:** `docs/corrigir-carregamento-ementa-tic.md` e `sistema/dashboard.html`

**Ação:** Versionar e publicar a correção no branch principal.

```powershell
git add docs/corrigir-carregamento-ementa-tic.md sistema/dashboard.html
git commit -m "fix: corrigir carregamento da ementa de tic"
git push origin main
```

**Verificação:** Confirmar somente o resultado do versionamento.
