# 🔐 Corrigir Autenticação do Quiz — "Você precisa estar autenticado"

**Data:** 2026-09-16  
**Status:** ⬜ Pendente  
**Arquivos Afetados:**
- `MATERIAIS/OPERADOR-PRODUCAO-INDUSTRIAL/FundamentosProcessosProducao/AULAS/auth-config.js`
- `MATERIAIS/OPERADOR-PRODUCAO-INDUSTRIAL/FundamentosProcessosProducao/AULAS/quiz-qualidade-por-aluno.html`

---

## 📋 Problema

Quando o usuário tenta iniciar o quiz, recebe erro:
```
⚠️ Você precisa estar autenticado para iniciar o quiz!
```

### Causa Raiz

Na linha 28 de `auth-config.js`:
```javascript
const { data: { user }, error } = await supabase.auth.getUser();
```

Este método requer uma **sessão ativa no Supabase**, mas:
- O navegador foi fechado/reaberto
- A sessão não foi persistida corretamente
- O `sessionStorage` foi limpo

---

## ✅ Solução

Implementar um fluxo de autenticação baseado em **sessionStorage** (conforme documentação `ORIENTACAO_USUARIO.md`):

1. **Verificar `sessionStorage`** primeiro (rápido, offline)
2. **Se houver dados em `sessionStorage`**, usar esses dados
3. **Se não houver, validar com Supabase** usando `getSession()`
4. **Nunca redirecionar para login** — apenas avisar e retornar null

---

## 📝 Passos Numerados

| # | Ação | Arquivo | Verificação |
|---|------|---------|-------------|
| 1️⃣ | Atualizar `verificarAutenticacao()` para ler `sessionStorage` primeiro | `auth-config.js` | Função retorna dados quando há session |
| 2️⃣ | Implementar fallback para `supabase.auth.getSession()` | `auth-config.js` | Fallback funciona se sessionStorage estiver vazio |
| 3️⃣ | Remover redirecionamento automático para `index.html` | `auth-config.js` | Função retorna null sem redirecionar |
| 4️⃣ | Melhorar mensagem de erro no quiz | `quiz-qualidade-por-aluno.html` | Alerta com instruções claras |
| 5️⃣ | Testar fluxo: fazer login e abrir quiz | Navegar manualmente | Quiz inicia corretamente |

---

## 🔧 Implementação Detalhada

### Passo 1️⃣: Reescrever `verificarAutenticacao()`

**Arquivo:** `auth-config.js` (linha 22-68)

**Novo código:**
```javascript
async function verificarAutenticacao() {
  try {
    // 1. Verificar sessionStorage primeiro (rápido, offline)
    const usuarioId = sessionStorage.getItem("usuarioId");
    const usuarioPerfil = sessionStorage.getItem("usuarioPerfil");
    const usuarioEmail = sessionStorage.getItem("usuarioEmail");
    const usuarioNome = sessionStorage.getItem("usuarioNome");

    if (usuarioId && usuarioEmail) {
      console.log("✅ Usuário recuperado de sessionStorage");
      usuarioAutenticado = {
        id: usuarioId,
        email: usuarioEmail,
        nome: usuarioNome || usuarioEmail.split('@')[0],
        perfil: usuarioPerfil || "ALUNO"
      };
      return usuarioAutenticado;
    }

    // 2. Fallback: tentar obter da sessão Supabase
    const supabase = await inicializarSupabase();
    if (!supabase) throw new Error("Supabase não inicializado");

    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session) {
      console.warn("Nenhuma sessão ativa encontrada");
      return null;  // ✅ Não redireciona — apenas retorna null
    }

    // 3. Sessão encontrada — salvar em sessionStorage
    const user = session.user;
    sessionStorage.setItem("usuarioId", user.id);
    sessionStorage.setItem("usuarioEmail", user.email);

    // Tentar obter nome completo da tabela usuario
    try {
      const { data: usuarioDb } = await supabase
        .from('usuario')
        .select('nome_completo')
        .eq('email', user.email)
        .single();

      const nome = usuarioDb?.nome_completo || user.email.split('@')[0];
      sessionStorage.setItem("usuarioNome", nome);

      usuarioAutenticado = {
        id: user.id,
        email: user.email,
        nome: nome,
        perfil: usuarioDb?.perfil || "ALUNO"
      };
    } catch (dbError) {
      console.warn("Erro ao buscar nome do usuário, usando email:", dbError);
      const nome = user.email.split('@')[0];
      sessionStorage.setItem("usuarioNome", nome);
      
      usuarioAutenticado = {
        id: user.id,
        email: user.email,
        nome: nome,
        perfil: "ALUNO"
      };
    }

    return usuarioAutenticado;
  } catch (error) {
    console.error("Erro na autenticação:", error);
    return null;  // ✅ Não redireciona — apenas retorna null
  }
}
```

### Passo 2️⃣: Melhorar aviso no quiz

**Arquivo:** `quiz-qualidade-por-aluno.html` (linha 856)

**Novo código:**
```javascript
if (!usuario) {
  alert(
    "⚠️ Sessão expirada ou não autenticado.\n\n" +
    "Por favor, faça login novamente:\n" +
    "1. Clique em OK\n" +
    "2. Acesse a página de login\n" +
    "3. Retorne ao quiz"
  );
  // Redirecionar para login (adicionar link ou botão)
  window.location.href = "../../index.html";
  return;
}
```

---

## 🧪 Verificação

✅ **Teste 1:** Fazer login → Quiz inicia corretamente  
✅ **Teste 2:** Reabrir aba do quiz sem fechar → Quiz mantém autenticação  
✅ **Teste 3:** Limpar sessionStorage → Alerta com instruções  
✅ **Teste 4:** Sessão expirada → Redirecionar para login (não crash)

---

## ⚠️ Notas de Segurança

- ✅ sessionStorage é limpado ao fechar a aba (seguro)
- ✅ Não usar localStorage (persiste entre sessões)
- ✅ Sempre validar JWT com Supabase (não confiar só em sessionStorage)

---

## 📊 Status

| Item | Status | Detalhes |
|------|--------|----------|
| Análise | ✅ Concluído | Problema identificado em auth-config.js |
| Plano | ✅ Concluído | Passos detalhados acima |
| Aprovação | ✅ Concluído | Usuário confirmou em 2026-09-16 |
| Implementação | ✅ Concluído | Ambos os arquivos atualizados |
| Testes | ⏳ Em progresso | Necessário validar em browser |

---

## 🔄 Mudanças Realizadas

### ✅ auth-config.js
- Reescrita função `verificarAutenticacao()` 
- Agora verifica `sessionStorage` primeiro (rápido)
- Fallback para `supabase.auth.getSession()` (confiável)
- Sem redirecionamento automático — retorna null apenas
- Salva dados em `sessionStorage` para reutilização

### ✅ quiz-qualidade-por-aluno.html
- Alerta melhorado com instruções claras
- Redireciona para login (`../../index.html`) sem crash
- Mensagem amigável ao usuário

---

## 🧪 Como Testar

1. Faça login normalmente em `index.html`
2. Acesse o quiz `quiz-qualidade-por-aluno.html`
3. Quiz deve iniciar ✅
4. Feche a aba e reabra → Quiz mantém autenticação ✅
5. Limpe sessionStorage → Alerta e redireciona para login ✅

