# 🔧 Corrigir Erro CORS no Login — "Failed to fetch"

**Data de Criação:** 2026-09-14  
**Status Geral:** ⬜ Planejado  
**Prioridade:** 🔴 Alta (bloqueia login)

---

## 📌 Objetivo

Resolver o erro `TypeError: Failed to fetch` que ocorre ao tentar fazer login. A causa é que algumas funções Supabase em `js/supabase.js` não possuem a configuração CORS necessária.

---

## 📋 Escopo

- **Arquivos afetados:**
  - `js/supabase.js` (funções `sbGet`, `sbPost`, `sbPatch`, `sbDelete`)
  - `index.html` (já tem CORS correto)
  
- **Tecnologias:**
  - Fetch API com modo CORS
  - Supabase REST API
  
- **Dependências:**
  - Supabase API precisa estar configurada corretamente

---

## 📊 Análise do Problema

### O que acontece:
1. Usuário tenta fazer login em `index.html`
2. A função `fazerLogin()` chama `sbGet("usuario", ...)`
3. O `index.html` tem `mode: "cors"` (linha 277) ✅
4. MAS `js/supabase.js` NÃO tem `mode: "cors"` em suas funções ❌
5. Resultado: CORS error → "Failed to fetch"

### Comparação:

**index.html (CORRETO):**
```javascript
const r = await fetch(url, {
  method: "GET",
  mode: "cors",
  credentials: "omit",
  headers: sbH(),
});
```

**js/supabase.js (INCOMPLETO):**
```javascript
async function sbGet(table, qs = "") {
  const r = await fetch(`${SUPABASE.URL}/rest/v1/${table}?${qs}`, {
    headers: sbH(),
  });
  // ❌ Faltam: mode: "cors", method: "GET", credentials: "omit"
}
```

---

## 📊 Plano de Execução

### Etapa 1: Adicionar CORS a sbGet()
- **Status:** ⬜ Pendente
- **Ação:** Editar função `sbGet` para incluir `mode: "cors"`, `method: "GET"` e `credentials: "omit"`
- **Arquivo:** `js/supabase.js` (linhas 23-29)
- **Verificação:** Tentar fazer login com qualquer email/senha

### Etapa 2: Adicionar CORS a sbPost()
- **Status:** ⬜ Pendente
- **Ação:** Editar função `sbPost` para incluir `mode: "cors"` e `credentials: "omit"`
- **Arquivo:** `js/supabase.js` (linhas 31-39)
- **Verificação:** Tentar criar novo curso ou registro

### Etapa 3: Adicionar CORS a sbPatch()
- **Status:** ⬜ Pendente
- **Ação:** Editar função `sbPatch` para incluir `mode: "cors"` e `credentials: "omit"`
- **Arquivo:** `js/supabase.js` (linhas 41-49)
- **Verificação:** Tentar editar um curso

### Etapa 4: Adicionar CORS a sbDelete()
- **Status:** ⬜ Pendente
- **Ação:** Editar função `sbDelete` para incluir `mode: "cors"` e `credentials: "omit"`
- **Arquivo:** `js/supabase.js` (linhas 51-57)
- **Verificação:** Tentar deletar um curso

### Etapa 5: Fazer Commit
- **Status:** ⬜ Pendente
- **Ação:** `git add . && git commit -m "fix: adicionar modo CORS em todas as funções Supabase (sbGet, sbPost, sbPatch, sbDelete)"`
- **Arquivo:** Nenhum (comando git)
- **Verificação:** Ver log do git com novo commit

---

## ⚠️ Riscos e Mitigações

| Risco | Probabilidade | Mitigação |
|-------|---|---|
| Quebrar outra funcionalidade ao alterar CORS | Baixa | CORS é apenas configuração de segurança do navegador; não afeta lógica |
| Requests ainda falharem por outro motivo | Média | Já há logs de debug no index.html; usá-los para diagnosticar |
| Conflito entre `index.html` e `js/supabase.js` | Baixa | Ambos usarão mesma config CORS; sem conflito |

---

## 📝 Notas

- O commit anterior `3055080` já adicionou CORS ao `index.html`, mas não sincronizou com `js/supabase.js`
- O erro "Failed to fetch" é clássico de CORS no navegador
- Após fix, testar com F12 (DevTools) aberto para ver logs

---

## ✅ Checklist Final

- [ ] Função `sbGet()` tem `mode: "cors"`, `method: "GET"`, `credentials: "omit"`
- [ ] Função `sbPost()` tem `mode: "cors"`, `credentials: "omit"`
- [ ] Função `sbPatch()` tem `mode: "cors"`, `credentials: "omit"`
- [ ] Função `sbDelete()` tem `mode: "cors"`, `credentials: "omit"`
- [ ] Login testado e funcionando
- [ ] Commit realizado com mensagem descritiva
- [ ] Sem erros no console (F12)
