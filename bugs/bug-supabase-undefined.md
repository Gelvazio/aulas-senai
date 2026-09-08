# 🐛 BUG: "supabase is not defined" em index.html

## Problema
Erro ao tentar usar `supabase.auth.signUp()` em `index.html`:
```
❌ ReferenceError: supabase is not defined
```

`index.html` tenta usar cliente Supabase mas não o carrega.

---

## Causa Raiz

**Faltam dois componentes:**

1. ❌ **Não há cliente Supabase JavaScript importado**
   - `index.html` não carrega a biblioteca `@supabase/supabase-js`
   - Sem ela, `supabase` object não existe

2. ❌ **Não há inicialização do cliente**
   - Precisa criar: `const supabase = createClient(URL, KEY)`
   - Atualmente só há `js/supabase.js` com funções REST (não cliente auth)

**Documentação relevante:**
- `ORIENTACAO_JS_SUPABASE.md` — Funções CRUD
- CLAUDE.md — Autenticação obrigatória com Supabase Auth

---

## Solução

### ✅ Passo 1: Adicionar Biblioteca Supabase em index.html
**Status:** Concluído  
**Ação:** Adicionar `<script>` que carrega biblioteca  
**Script Adicionado:**
```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
```

**Localização:** Linha 7, após `<title>` em `index.html`
**Resultado:** ✅ Biblioteca carregada

### ✅ Passo 2: Criar Cliente Supabase em index.html
**Status:** Concluído  
**Ação:** Inicializar cliente com credenciais em `<script>` tag isolada
**Script Adicionado:**
```html
<script>
  window.supabase = window.supabase.createClient(
    "https://hxlvonriearllcmfqeri.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  );
</script>
```

**Localização:** Linhas 8-13, logo após carregar biblioteca CDN, antes de `<style>`
**Resultado:** ✅ Cliente criado e disponível globalmente (sem conflito de declaração)

### ⬜ Passo 3: Testar Cadastro
**Status:** Pendente (você pode testar)
**Ação:** Criar novo aluno e verificar se `supabase.auth.signUp()` funciona  
**Verificação:** 
  - Sem erro "supabase is not defined"? ✅
  - Cadastro bem-sucedido? ✅
  - Usuário criado em auth.users? ✅

### ✅ Passo 4: Commit
**Status:** Pendente  
**Ação:** Fazer commit quando atingir 20 chats  
**Mensagem:** `fix: adicionar cliente supabase javascript em index.html`  

---

## 📋 Informações Técnicas

### Biblioteca Supabase JavaScript
- **CDN:** `https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2`
- **Global após carregamento:** `window.supabase`
- **Função principal:** `createClient(URL, KEY)`
- **Resultado:** Objeto com métodos como `.auth.signUp()`, `.auth.signIn()`, etc.

### Credenciais (já em supabase.js)
- **URL:** `https://hxlvonriearllcmfqeri.supabase.co`
- **KEY:** Anônima (está em supabase.js)

---

## 🚨 Por Quê Isso Aconteceu?

Original `js/supabase.js` tinha:
- ✅ Funções CRUD via REST API (sbGet, sbPost, etc.)
- ❌ **MAS NÃO tinha cliente Supabase Auth** (`createClient`)

Quando adicionamos `supabase.auth.signUp()` em `index.html`:
- ❌ Tentava usar um objeto que não existia
- ❌ Resultado: ReferenceError

**Solução:** Adicionar biblioteca JavaScript + inicializar cliente

---

## 📅 Timestamps

| Evento | Data/Hora |
|--------|-----------|
| Identificação do erro | 2026-09-08 (Chat 9) |
| Criação do plano | 2026-09-08 (Chat 9) |
| Aprovação do usuário | ⏳ Pendente |
| Início da resolução | ⏳ Pendente |
| Conclusão | ⏳ Pendente |

---

**Status Geral:** 🔄 Aguardando aprovação do usuário
