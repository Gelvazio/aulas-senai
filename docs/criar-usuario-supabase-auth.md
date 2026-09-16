# 🔐 Criar Usuário em Supabase Auth (auth.users)

**Data:** 2026-09-16  
**Email:** aluno@edu.sc.senai.br  
**Senha:** Senai.2026  
**Status:** ⏳ Aguardando solução

---

## 🔴 Problema Identificado

Usuário existe em:
- ✅ Tabela `usuario` (id=8, integer)
- ❌ Tabela `auth.users` (não existe!)

**Por isso:** Erro "usuário e senha inválido"

---

## ⚠️ Problema de Vinculação

A tabela `usuario` tem:
- **id:** INTEGER (8)
- Esperado: **UUID** (vinculado a auth.users.id)

---

## ✅ Solução: 2 Opções

### Opção 1️⃣: Via Supabase Dashboard (Recomendado)

1. Acesse: https://app.supabase.com
2. Projeto: aulas-senai
3. Authentication → Users
4. "Add user manually"
5. Email: `aluno@edu.sc.senai.br`
6. Password: `Senai.2026`
7. Copie o **UUID** gerado
8. UPDATE `usuario` SET `id` = UUID copiado WHERE email = 'aluno@edu.sc.senai.br'

### Opção 2️⃣: Recriar Usuário no Código

```javascript
// 1. Deletar registro antigo em usuario
await sbDelete("usuario", 8);

// 2. Criar via formulário de signup
const { data, error } = await supabase.auth.signUp({
  email: "aluno@edu.sc.senai.br",
  password: "Senai.2026"
});

// 3. Vincular com tabela usuario
const novoUsuario = {
  id: data.user.id,  // UUID do auth.users
  email: data.user.email,
  nome_completo: "ALUNO DA SILVA",
  perfil: "ALUNO",
  login_usuario: "aluno"
};

await sbPost("usuario", novoUsuario);
```

---

## 🎯 Qual opção você prefere?

1. **Dashboard** (mais rápido, manual)
2. **Código/Fórmulário** (automático, melhor fluxo)

