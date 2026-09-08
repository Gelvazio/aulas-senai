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

### Tabela: `usuario` (vinculada com `auth.users`)

| Campo | Tipo | Restrição | Vinculação | Uso |
|-------|------|-----------|-----------|-----|
| **id** | UUID | PK, FK | → `auth.users.id` | Vinculação com auth |
| **email** | TEXT | NOT NULL, UNIQUE | — | Email da conta |
| **nome_completo** | TEXT | NOT NULL | — | Nome do usuário |
| **perfil** | TEXT | NOT NULL | Enum: ALUNO, PROFESSOR | Tipo de acesso |
| **login_usuario** | TEXT | Nullable | — | Username legível |
| **created_at** | TIMESTAMPTZ | DEFAULT now() | — | Data criação |
| **updated_at** | TIMESTAMPTZ | DEFAULT now() | — | Última atualização |

### Campos NÃO usar

❌ **Nunca** adicione estes campos:
- `senha_hash` — Supabase Auth gerencia senhas
- `ativo` — Coluna não existe
- `criado_em` — Use `created_at` (PostgreSQL padrão)

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

## ⚠️ REGRA CRÍTICA

**SEMPRE consulte este arquivo antes de modificar:**
- `js/login.js`
- `index.html` (formulário de login/cadastro)
- `js/supabase.js` (headers de autenticação)

Se encontrar inconsistências, atualize esta documentação PRIMEIRO, depois implemente.
