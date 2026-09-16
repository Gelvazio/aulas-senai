# 🔐 Corrigir RLS da Tabela `usuario` — Erro 401 42501

**Data:** 2026-09-16  
**Status:** ⬜ Pendente  
**Erro:** `{"code":"42501","message":"new row violates row-level security policy for table \"usuario\""}`

---

## 📋 Problema

RLS (Row Level Security) está habilitado na tabela `usuario` e **bloqueando INSERTs** ao criar novo usuário.

### Por quê desabilitar RLS em `usuario`?

✅ Tabela `usuario` é apenas **referência/cache** de usuários  
✅ Autenticação REAL é feita via `auth.users` (Supabase Auth)  
✅ Não há dados sensíveis nessa tabela que precisem de RLS  
✅ Outras tabelas (`materia`, `curso`, `aulas`) MANTÊM RLS

---

## ✅ Solução

Executar SQL via MCP Supabase:

```sql
ALTER TABLE "public"."usuario" DISABLE ROW LEVEL SECURITY;
```

---

## 📝 Passos

| # | Ação | Status |
|---|------|--------|
| 1️⃣ | Usar MCP Supabase `execute_sql` | ⬜ Pendente |
| 2️⃣ | Executar `ALTER TABLE ... DISABLE ROW LEVEL SECURITY` | ⬜ Pendente |
| 3️⃣ | Verificar sucesso (sem erro 42501) | ⬜ Pendente |
| 4️⃣ | Atualizar `database.md` com novo status | ⬜ Pendente |
| 5️⃣ | Fazer commit | ⬜ Pendente |

---

## 🎯 Resultado Esperado

✅ Novo usuário pode ser criado sem erro RLS  
✅ Tabela `usuario` fica acessível para INSERTs  
✅ Segurança mantida via autenticação `auth.users`

