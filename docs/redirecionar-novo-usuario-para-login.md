# 📋 PLANO — Redirecionar Novo Usuário para Login

**Data:** 2026-09-16  
**Objetivo:** Após criar novo usuário, redirecionar para página de login (não dashboard)  
**Escopo:** Alterar função `fazerCadastro()` em `js/login.js`  

---

## 📊 Detalhes da Tarefa

| Item | Status | Descrição |
|------|--------|-----------|
| **Arquivo Afetado** | 🔴 | `js/login.js` |
| **Função** | `fazerCadastro()` (linhas 54-124) |
| **Mudança** | Linha 115: `dashboard.html` → `index.html` |
| **Risco** | ✅ Baixo (mudança simples, isolada) |

---

## 🔧 Passos da Implementação

### ✅ **Passo 1: Consultar Documentação**
- ✅ Lido: `docs/ORIENTACAO_USUARIO.md`
- Regra crítica: Após signup, usuário deve fazer login explícito

### ✅ **Passo 2: Modificar `js/login.js`**
- ✅ Localizar linha 115
- ✅ Mudar: `window.location.href = "dashboard.html";`
- ✅ Para: `window.location.href = "index.html";`
- ✅ Comentário atualizado: "Redirecionar para login após 2 segundos"

### ✅ **Passo 3: Verificar Impacto**
- ✅ Nenhuma outra função redireciona em `fazerCadastro()`
- ✅ `sessionStorage` NÃO será mais preenchido (será feito apenas no login)
- ✅ Isso é correto: cadastro cria usuário, login autentica

### ✅ **Passo 4: Commit**
- ✅ Commit realizado: `b4a137c`
- Mensagem: `fix: redirecionar novo usuário para login após cadastro`

---

## ✅ Verificação

- [ ] Usuário cria conta com sucesso?
- [ ] Redireciona para `index.html` (login)?
- [ ] Pode fazer login com credenciais criadas?
- [ ] `sessionStorage` preenchido apenas após login?

---

## 📝 Observações

- Não precisa alterar HTML ou Supabase
- Mudança simples, localizada
- Melhora UX: força confirmação de credenciais via login

