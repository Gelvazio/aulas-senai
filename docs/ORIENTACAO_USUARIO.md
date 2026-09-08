# 🔐 ORIENTAÇÃO — Autenticação com Supabase Auth

**Arquivo relacionado:** `js/login.js`, `index.html`  
**Data:** 2026-09-08  
**Status:** ✅ Ativo

---

## 📋 Visão Geral

Este arquivo documenta a autenticação do sistema usando **Supabase Auth nativa** com vínculo à tabela `usuario`.

### Arquitetura

```
┌─────────────────────────────────────┐
│ Supabase Auth (auth.users)          │
│ - ID único                          │
│ - Email                             │
│ - Senha (hash seguro)               │
└──────────────┬──────────────────────┘
               │ FK: id → usuario.id
               ▼
┌─────────────────────────────────────┐
│ Tabela: usuario                     │
│ - id (PK, FK → auth.users.id)       │
│ - email                             │
│ - nome_completo                     │
│ - perfil (ALUNO, PROFESSOR)         │
│ - login_usuario                     │
└─────────────────────────────────────┘
```

---

## 🔑 Fluxo de Autenticação

### 1️⃣ LOGIN

```javascript
// 1. Usuário clica "Entrar"
const { data, error } = await supabase.auth.signInWithPassword({
  email: "usuario@senai.br",
  password: "senha123"
});

// 2. Supabase valida credenciais e retorna session
// 3. Carregar dados do perfil da tabela 'usuario'
const usuario = await sbGet("usuario", `id=eq.${data.user.id}&select=*`);

// 4. Salvar em sessionStorage
sessionStorage.setItem("usuarioId", data.user.id);
sessionStorage.setItem("usuarioPerfil", usuario.perfil);
sessionStorage.setItem("usuarioEmail", data.user.email);
```

### 2️⃣ CADASTRO (Aluno)

```javascript
// 1. Usuário clica "Criar Conta"
const { data, error } = await supabase.auth.signUp({
  email: "novo@senai.br",
  password: "senha123"
});

// 2. Supabase cria auth.users e retorna user.id
// 3. Vincular com tabela 'usuario'
const novoUsuario = {
  id: data.user.id,              // ⚠️ CRÍTICO: usar ID do auth.users
  email: data.user.email,
  nome_completo: "Nome",
  perfil: "ALUNO",
  login_usuario: email.split("@")[0]
};

const resultado = await sbPost("usuario", novoUsuario);
```

### 3️⃣ LOGOUT

```javascript
// 1. Desconectar do Supabase Auth
await supabase.auth.signOut();

// 2. Limpar sessionStorage
sessionStorage.clear();

// 3. Redirecionar para login
window.location.href = "index.html";
```

---

## 🗂️ Estrutura de Dados

### Tabela: `usuario` (Schema Real do BD)

| Campo | Tipo | Restrição | Uso |
|-------|------|-----------|-----|
| **id** | INTEGER | PK | Identificador único do usuário |
| **nome** | VARCHAR | NOT NULL | Nome do usuário ⚠️ NÃO é `nome_completo` |
| **email** | VARCHAR | NOT NULL, UNIQUE | Email da conta |
| **perfil** | TEXT | DEFAULT 'ALUNO' | Enum: ALUNO, PROFESSOR |
| **login_usuario** | TEXT | Nullable | Username legível |
| **senha** | VARCHAR | NOT NULL | Senha em texto claro (⚠️ considerar hash) |
| **senha_hash** | TEXT | Nullable | Hash SHA-256 da senha (opcional) |
| **token** | VARCHAR | Nullable | Token de autenticação |
| **tipo** | VARCHAR | DEFAULT 'CAIXA' | Tipo de usuário |
| **permissoes** | JSONB | Nullable | Permissões customizadas |
| **configuracoes** | JSONB | Nullable | Configurações do usuário |
| **curso_id** | BIGINT | Nullable | FK para curso |
| **hash** | TEXT | Nullable | Hash de validação |
| **auth** | VARCHAR | DEFAULT '...' | Autenticação auxiliar |
| **emailsenai** | INTEGER | DEFAULT 0 | Flag SENAI |
| **parametros** | JSONB | DEFAULT {...} | Parâmetros de UI |

### Campos NÃO usar

❌ **Nunca** adicione estes campos (não existem no BD):
- `nome_completo` — A coluna real é `nome` (apenas)
- `ativo` — Coluna não existe
- `criado_em` — Não existe; use status_* se necessário

---

## 🔗 Função: `sbGet()` com Autenticação

Em `js/supabase.js`, a função `sbGet()` automaticamente inclui:

```javascript
function sbH() {
  const headers = {
    apikey: SUPABASE.KEY,
    Authorization: "Bearer " + SUPABASE.KEY,
    "Content-Type": "application/json",
  };

  // Header de autenticação (será usado para RLS policies)
  const usuarioEmail = sessionStorage.getItem("usuarioEmail");
  if (usuarioEmail) {
    headers["X-User-Email"] = usuarioEmail;
  }

  return headers;
}
```

**Importante:** O `Authorization` header usa a chave de serviço, mas RLS policies devem validar:
- Token JWT do usuario autenticado (melhor segurança)
- Ou header `X-User-Email` como fallback

---

## ✅ Checklist: Implementar Autenticação

- [ ] **js/login.js**: Usar `supabase.auth.signInWithPassword()`
- [ ] **index.html**: Remover verificação de `senha_hash` manual
- [ ] **Supabase Console**: Ativar Email/Password auth
- [ ] **Supabase Console**: Desabilitar confirmação de email (opcional: dev)
- [ ] **RLS Policies**: Criar policies que validam `auth.uid()`
- [ ] **Tabela usuario**: Garantir FK `id → auth.users.id`

---

## 🚨 Erros Comuns

| Erro | Causa | Solução |
|------|-------|--------|
| `PGRST401 Unauthorized` | RLS policy nega acesso | Verificar policies para role `authenticated` |
| `null id ao cadastrar` | Não usar `data.user.id` | Usar obrigatoriamente `data.user.id` de `auth.signUp` |
| `Email duplicado` | Validação antes de signup | Supabase já valida; confiar no erro retornado |
| `Sessão perdida` | Session expira | Verificar `supabase.auth.session()` periodicamente |

---

## 📖 Referências

- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [JavaScript Client](https://supabase.com/docs/reference/javascript/auth-signup)

---

## 🔒 SEGURANÇA: RLS + Token Autenticado

### Regra Crítica: TODA requisição deve usar JWT do usuário

**⚠️ NÃO FAÇA ISSO (Inseguro):**
```javascript
// ❌ Usando chave de serviço (qualquer um pode acessar tudo)
headers: {
  apikey: SUPABASE.KEY,
  Authorization: "Bearer " + SUPABASE.KEY
}
```

**✅ FAÇA ASSIM (Seguro):**
```javascript
// ✅ Usando JWT do usuário autenticado
const session = await supabase.auth.getSession();
headers: {
  apikey: SUPABASE.KEY,
  Authorization: "Bearer " + session.data.session.access_token
}
```

### Implementação em `js/supabase.js`

```javascript
async function sbH() {
  const headers = {
    apikey: SUPABASE.KEY,
    "Content-Type": "application/json",
  };

  // 🔑 CRÍTICO: Usar JWT do usuário autenticado
  const session = await supabase.auth.getSession();
  if (session?.data?.session?.access_token) {
    headers.Authorization = "Bearer " + session.data.session.access_token;
  } else {
    // Fallback: chave de serviço (apenas para operações públicas)
    headers.Authorization = "Bearer " + SUPABASE.KEY;
  }

  return headers;
}
```

### RLS Policies Obrigatórias

**Toda tabela que contenha dados sensíveis DEVE ter:**

```sql
-- 1. Ativar RLS
ALTER TABLE "public"."TABELA" ENABLE ROW LEVEL SECURITY;

-- 2. Policy SELECT: usuários autenticados veem seus próprios dados
CREATE POLICY "usuarios_autenticados_select"
ON "public"."TABELA"
FOR SELECT
TO authenticated
USING (
  -- Exemplo: um aluno vê apenas seus próprios registros
  user_id = auth.uid()
  -- Ou: um professor vê dados de seus cursos
  -- curso_id IN (SELECT curso_id FROM professor_cursos WHERE professor_id = auth.uid())
);

-- 3. Policy INSERT: usuários autenticados criam registros
CREATE POLICY "usuarios_autenticados_insert"
ON "public"."TABELA"
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

-- 4. Policy UPDATE: usuários autenticados atualizam seus próprios registros
CREATE POLICY "usuarios_autenticados_update"
ON "public"."TABELA"
FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- 5. Policy DELETE: usuários autenticados deletam seus próprios registros
CREATE POLICY "usuarios_autenticados_delete"
ON "public"."TABELA"
FOR DELETE
TO authenticated
USING (user_id = auth.uid());
```

### Tabelas que DEVEM usar RLS

| Tabela | Dados | RLS Obrigatório |
|--------|-------|-----------------|
| `usuario` | Perfil pessoal | ✅ **SIM** - apenas lê seus dados |
| `curso` | Cursos (públicos?) | ⚠️ Avaliado por tabela |
| `materia` | Matérias | ⚠️ Avaliado por tabela |
| `aulas` | Conteúdo de aulas | ✅ **SIM** - aluno vê apenas aulas ensaladas |
| `avaliacao` | Notas, resultados | ✅ **SIM** - aluno vê apenas suas notas |

---

## ⚠️ REGRA CRÍTICA

**SEMPRE consulte este arquivo antes de modificar:**
- `js/login.js`
- `index.html` (formulário de login/cadastro)
- `js/supabase.js` (headers de autenticação)
- **QUALQUER arquivo que faça requisições ao Supabase**

**CHECKLIST de Segurança:**
- [ ] Estou usando JWT do usuário autenticado em `js/supabase.js`?
- [ ] A tabela tem RLS habilitado?
- [ ] As policies validam `auth.uid()`?
- [ ] Um aluno/professor não pode acessar dados de outro?

Se encontrar inconsistências, atualize esta documentação PRIMEIRO, depois implemente.
