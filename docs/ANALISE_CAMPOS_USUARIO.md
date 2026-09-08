# 📊 Análise: Quais Campos da Tabela `usuario` são Realmente Usados?

**Data:** 2026-09-08  
**Objetivo:** Identificar campos usados vs. não usados na tabela `usuario`

---

## 🔍 Campos REALMENTE USADOS

### ✅ Campos Essenciais (Usados Ativamente)

| Campo | Onde Usado | Propósito | Status |
|-------|-----------|-----------|--------|
| **`id`** | `js/login.js:35`, `index.html:336`, `sessionStorage` | PK, FK para `auth.users.id` | 🟢 CRÍTICO |
| **`login_usuario`** | `js/login.js:19,36,84,108`, `dashboard.html:365,390,457` | Identificador de login único | 🟢 CRÍTICO |
| **`email`** | `js/login.js:37`, `sessionStorage`, `supabase.js:15` | Email do usuário | 🟢 IMPORTANTE |
| **`perfil`** | `js/login.js:38`, `dashboard.html:488,575,617,658`, `sessionStorage` | ALUNO ou PROFESSOR | 🟢 CRÍTICO |
| **`nome_completo`** | `js/login.js:39,110`, `index.html:339`, `sessionStorage` | Nome exibido na interface | 🟢 IMPORTANTE |
| **`favoritos_aluno`** | `dashboard.html:391` | Cursos favoritos (JSONB) | 🟡 OPCIONAL |

---

## ❌ Campos NÃO USADOS ou PROBLEMÁTICOS

| Campo | Mencionado em | Problema | Ação |
|-------|---------|----------|------|
| **`senha`** | `index.html:326` (OLD) | ❌ Armazenar plain text é INSEGURO | ⛔ REMOVER |
| **`senha_hash`** | `CLAUDE.md` (aviso) | ❌ Nunca deveria ser armazenado | ⛔ REMOVER |
| **`ativo`** | `CLAUDE.md` (aviso) | ❌ Campo não existe/não usado | ⛔ REMOVER |
| **`criado_em`** | `CLAUDE.md` (aviso) | ❌ Campo não existe/não usado | ⛔ REMOVER |
| (Outros campos não documentados) | Schema desconhecido | ❓ Não mencionado em queries | ⏳ INVESTIGAR |

---

## 📋 Schema Proposto (Limpo)

A tabela `usuario` deveria ter **APENAS**:

```sql
CREATE TABLE "usuario" (
  id BIGINT PRIMARY KEY,                    -- FK para auth.users.id
  login_usuario TEXT UNIQUE NOT NULL,       -- Email ou username único
  nome_completo TEXT NOT NULL,              -- Nome exibido
  email TEXT NOT NULL,                      -- Email (cópia de auth.users)
  perfil TEXT NOT NULL,                     -- ALUNO | PROFESSOR
  favoritos_aluno JSONB,                    -- Cursos favoritos (opcional)
  created_at TIMESTAMPTZ DEFAULT now(),     -- Data criação
  updated_at TIMESTAMPTZ DEFAULT now()      -- Data última atualização
);
```

---

## 🔐 Regra CRÍTICA

⚠️ **NUNCA armazene senha em `usuario`!**

- ✅ Autenticação: Use `supabase.auth.signUp()` / `signIn()`
- ✅ Supabase Auth já hash a senha de forma segura
- ✅ Tabela `usuario` é apenas **referência/perfil**, não autenticação

---

## 🚨 Campos Perigosos Encontrados

### Na Corrente Atual:

1. **`index.html:326` (OLD)** - Tentava armazenar `senha` em plain text
   - ❌ **REMOVIDO** na correção anterior
   - ✅ Agora usa `supabase.auth.signUp()`

2. **`js/login.js` (se existir)** - Pode ter similar
   - ⏳ Verificar se também armazena senha

---

## 📊 Resumo de Uso

| Categoria | Campos | Status |
|-----------|--------|--------|
| **Críticos** | `id`, `login_usuario`, `perfil` | 🟢 Usar sempre |
| **Importantes** | `email`, `nome_completo` | 🟢 Usar sempre |
| **Opcionais** | `favoritos_aluno` | 🟡 Se necessário |
| **Nunca Usar** | `senha`, `senha_hash`, `ativo`, `criado_em` | ⛔ Remover |

---

## ✅ Ações Recomendadas

1. **Verificar `js/login.js`** — Se também armazena senha, remover
2. **Limpar schema** — Remover campos não usados do Supabase
3. **Documentar** — Atualizar `database.md` com schema limpo
4. **Auditar** — Verificar se há queries com campos inválidos

---

**Status:** 🔄 Análise Completa  
**Próxima Ação:** Investigar `js/login.js` para campos perigosos
