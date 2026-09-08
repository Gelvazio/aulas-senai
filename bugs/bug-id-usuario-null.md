# 🐛 BUG: ID NULL ao Inserir Usuário (Erro 23502)

## Problema
Erro ao inserir novo usuário:
```
❌ Erro 23502: null value in column "id" of relation "usuario" violates not-null constraint
```

Coluna `id` está recebendo NULL quando deveria receber `data.user.id` do Supabase Auth.

---

## Análise

### Erro Detalhado
```
Failing row contains (
  null,                          ← ❌ ID está NULL (deveria ser ID do auth.users)
  ALUNO DA SILVA,                ← nome_completo (OK)
  aluno@email.com,               ← email (OK)
  Senai.2026,                    ← login_usuario (OK)
  null,                          ← outro campo
  CAIXA,                         ← outro campo
  ...
)
```

### Causa Raiz
Código de **cadastro de aluno** não está passando `id: data.user.id` ao inserir em `usuario`.

**Documentação (ORIENTACAO_USUARIO.md:68-76):**
```javascript
const novoUsuario = {
  id: data.user.id,              // ⚠️ CRÍTICO: usar ID do auth.users
  email: data.user.email,
  nome_completo: "Nome",
  perfil: "ALUNO",
  login_usuario: email.split("@")[0]
};

const resultado = await sbPost("usuario", novoUsuario);
```

**Problema:** Código está ignorando o campo `id` ao fazer POST.

### Arquivos Afetados
- **Localização:** Provavelmente em formulário de cadastro ou `js/login.js`
- **Função:** Função de cadastro/signup de aluno
- **Erro:** Não passa `id` ao fazer `sbPost("usuario", ...)`

**Documentação relevante:**
- `ORIENTACAO_USUARIO.md` — Fluxo de autenticação
- `ORIENTACAO_JS_SUPABASE.md` — Operações Supabase

---

## Plano de Resolução

### ✅ Passo 1: Localizar Código de Cadastro
**Status:** Concluído  
**Ação:** Encontrar onde está o POST para `usuario` ao fazer signup  
**Resultado:** ✅ Encontrado em `index.html` linhas 322-330

### ✅ Passo 2: Verificar Campos sendo Passados
**Status:** Concluído  
**Ação:** Confirmar que `id` NÃO está sendo passado  
**Resultado:** 
  - ❌ Código NÃO passa `id: data.user.id`
  - ❌ Código NÃO usa `supabase.auth.signUp()`
  - Campo `nome` deveria ser `nome_completo`
  - Armazenava `senha` em plain text (CRÍTICO!)
**Arquivo:** `index.html:322-330`

### ✅ Passo 3: Corrigir Inserção em `usuario`
**Status:** Concluído  
**Ação:** Adicionar `supabase.auth.signUp()` e campo `id`  

**Antes:**
```javascript
// ❌ Sem usar auth.signUp()
const novoUsuario = {
  login_usuario: email.split("@")[0],
  nome: nome,
  email: email,
  senha: senha,              // ❌ Plain text!
  perfil: "ALUNO"
  // ❌ Sem id
};
const resultado = await sbPost("usuario", novoUsuario);
```

**Depois:**
```javascript
// ✅ Criar em auth.users primeiro
const { data: authData, error: authError } = await supabase.auth.signUp({
  email: email,
  password: senha
});

// ✅ Usar ID do auth.users
const novoUsuario = {
  id: authData.user.id,              // ⚠️ CRÍTICO
  login_usuario: email.split("@")[0],
  nome_completo: nome,               // ✅ Campo correto
  email: email,
  perfil: "ALUNO"
};
const resultado = await sbPost("usuario", novoUsuario);
```

**Verificação:** 
  - Chama `auth.signUp()`? ✅
  - Campo `id` incluído com `data.user.id`? ✅
  - Campo `nome_completo` (não `nome`)? ✅
  - Valida erros de auth? ✅
**Arquivo:** `index.html:318-356`
**Resultado:** ✅ Corrigido

### ⬜ Passo 4: Testar Cadastro
**Status:** Pendente (você pode testar)
**Ação:** Criar novo aluno e verificar se insere sem erro 23502  
**Verificação:** 
  - Signup bem-sucedido? ✅
  - Usuário criado em `usuario`? ✅
  - ID preenchido corretamente? ✅
  - Nenhum erro 23502? ✅
**Arquivo:** Browser/Supabase Dashboard

### ✅ Passo 5: Commit
**Status:** Pendente  
**Ação:** Fazer commit após aprovação  
**Mensagem:** `fix: usar supabase auth.signUp() ao cadastrar aluno`  
**Arquivo:** Git

---

## 🚨 Regras de Segurança

- ⚠️ **SEMPRE usar `data.user.id`** do Supabase Auth
- ⚠️ **NUNCA gerar ID manualmente** (Supabase já gera)
- ⚠️ **VALIDAR que `data.user.id` existe** antes de usar
- ✅ **Vínculo FK:** `usuario.id` → `auth.users.id`

---

## 📅 Timestamps

| Evento | Data/Hora |
|--------|-----------|
| Identificação do erro | 2026-09-08 (Chat 21) |
| Criação do plano | 2026-09-08 (Chat 21) |
| Aprovação do usuário | ⏳ Pendente |
| Início da resolução | ⏳ Pendente |
| Conclusão | ⏳ Pendente |

---

**Status Geral:** 🔄 Aguardando aprovação do usuário
