# 📚 ORIENTACAO_JS_LOGIN.md

## Propósito
Gerenciar autenticação de usuários (login/logout) e navegação pós-autenticação.

## Localização
`C:\fontes\aulas-senai\sistema\js\login.js`

## Responsabilidades
- ✅ Validar credenciais de usuário (login/senha)
- ✅ Calcular hash SHA-256 da senha
- ✅ Buscar usuário no banco Supabase
- ✅ Armazenar sessão em `localStorage`
- ✅ Redirecionar para dashboard.html
- ✅ Fazer logout (limpar sessionStorage/localStorage)
- ✅ Gerenciar mensagens de erro/sucesso

## Estrutura Principal

### Fluxo de Login
```
1. Usuário insere login + senha
2. Validação básica (campos vazios?)
3. Calcular SHA-256(senha)
4. Query Supabase: SELECT * FROM usuario WHERE login_usuario=?
5. Comparar hash: usuarioBD.senha_hash === hashCalculado
6. Se OK: armazenar role em localStorage + redirecionar
7. Se ERRO: mostrar mensagem
```

### Variáveis de Sessão
```javascript
localStorage.setItem("senai_role", "ALUNO" | "PROFESSOR");  // Perfil do usuário
localStorage.setItem("senai_login", Date.now());             // Timestamp login
localStorage.setItem("senai_tema", "light" | "dark");        // Preferência tema
```

### Funções Principais

| Função | Propósito |
|--------|-----------|
| `fazerLogin()` | Valida credenciais, autentica no Supabase, redireciona |
| `calcularSHA256(texto)` | Calcula hash SHA-256 da senha |
| `mostrarMsgLogin(msg, erro)` | Exibe mensagem de status |
| `fazerLogout()` | Limpa sessionStorage e localStorage |
| `atualizarTema()` | Toggle tema light/dark |

## Tabela Supabase
- **Nome:** `usuario`
- **Colunas principais:** `id`, `login_usuario`, `senha_hash`, `perfil`
- **Perfis válidos:** `ALUNO`, `PROFESSOR`

## Segurança

### Autenticação
- ✅ Senhas são hashadas com SHA-256 antes de transmitir
- ✅ HTTPS em produção (Supabase)
- ✅ Validação no servidor (Supabase)
- ⚠️ **NUNCA armazenar senha em plain text**

### Session Management
- ✅ `senai_role` define acesso (ALUNO/PROFESSOR)
- ✅ `senai_login` usado para validar sessão
- ✅ localStorage limpo ao logout
- ⚠️ **localStorage é público** — não armazenar dados sensíveis

## Regras de Negócio
- ✅ Login obrigatório para acessar dashboard.html
- ✅ Se `senai_role` ausente → redireciona para index.html
- ✅ Hash SHA-256 calculado no cliente (JavaScript)
- ✅ Perfil define quais páginas/funcionalidades aparecem
- ✅ Logout limpa tudo e volta para index.html

## Como Usar

### Exemplo: Login (chamado ao clicar botão "Entrar")
```javascript
await fazerLogin();  // Fluxo completo de autenticação
```

### Exemplo: Logout
```javascript
fazerLogout();  // Limpa localStorage + redireciona
```

### Exemplo: Verificar autenticação
```javascript
const role = localStorage.getItem("senai_role");
if (!role) {
  window.location.href = "index.html";  // Redireciona se não autenticado
}
```

### Exemplo: Detectar perfil
```javascript
const perfil = localStorage.getItem("senai_role");
if (perfil === "PROFESSOR") {
  // Mostrar botões de admin
} else if (perfil === "ALUNO") {
  // Mostrar botões de aluno
}
```

## Integração com Outros Módulos
- **Depende de:** `supabase.js` (funções `sbGet`)
- **Usado por:** `index.html`, `dashboard.html`, `uc.html`, todas as páginas
- **Redirecionamentos:** → `dashboard.html` (após sucesso)

## Campos do Formulário (index.html)
```html
<input id="loginUsuario" type="text" placeholder="Usuário">
<input id="loginSenha" type="password" placeholder="Senha">
<button onclick="fazerLogin()">Entrar</button>
<div id="msgLogin"></div>
```

## Mensagens de Erro Padrão
| Mensagem | Causa |
|----------|-------|
| "Usuário e senha são obrigatórios" | Campos vazios |
| "Usuário ou senha incorretos" | Login não encontrado ou hash não bate |
| "Autenticando..." | Processando no Supabase |

## ⚠️ Notas Importantes
- **SHA-256:** Implementado com Crypto API do navegador
- **localStorage:** Persiste mesmo após fechar navegador (cuidado)
- **HTTPS:** Obrigatório em produção para proteger tráfego
- **Timeout:** Considere adicionar validação de sessão expirada

---

## ✅ Checklist para Modificações

- [ ] SHA-256 calcula corretamente
- [ ] localStorage armazena role corretamente
- [ ] Logout limpa tudo
- [ ] Redirecionar automático para index.html se sem role
- [ ] Mensagens de erro claras
- [ ] Tema persiste após login
