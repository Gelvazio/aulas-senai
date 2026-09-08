# ATIVIDADE AULA 05 — Testes de Integração (Parte 1)

**Objetivo:** Testar componentes HTML com DOM Testing Library

**Duração:** 4 horas  
**Competências Praticadas:** DOM Testing, user events, assertions assíncronas  
**Modalidade:** Hands-on em laboratório

---

## 1. Tarefa Principal — Testar Componente de Formulário

### 1.1 Arquivo HTML a Testar: `src/LoginForm.html`

```html
<!DOCTYPE html>
<html>
<head>
  <title>Login Form</title>
  <style>
    .form-group { margin-bottom: 10px; }
    .error { color: red; font-size: 12px; display: none; }
    .error.show { display: block; }
    button { background: blue; color: white; padding: 8px 16px; }
    button:disabled { background: gray; cursor: not-allowed; }
  </style>
</head>
<body>
  <form id="loginForm">
    <div class="form-group">
      <label for="email">Email:</label>
      <input 
        id="email" 
        name="email" 
        type="email" 
        placeholder="seu@email.com"
        required
      />
      <span id="emailError" class="error">Email inválido</span>
    </div>

    <div class="form-group">
      <label for="password">Senha:</label>
      <input 
        id="password" 
        name="password" 
        type="password" 
        placeholder="Mínimo 6 caracteres"
        minlength="6"
        required
      />
      <span id="passwordError" class="error">Mínimo 6 caracteres</span>
    </div>

    <button id="submitBtn" type="submit">Entrar</button>
    <div id="successMessage" class="success" style="display: none; color: green;">
      Login realizado com sucesso!
    </div>
  </form>

  <script>
    const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const submitBtn = document.getElementById('submitBtn');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const successMessage = document.getElementById('successMessage');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      let isValid = true;
      
      // Validar email
      if (!emailInput.value.includes('@')) {
        emailError.classList.add('show');
        isValid = false;
      } else {
        emailError.classList.remove('show');
      }
      
      // Validar senha
      if (passwordInput.value.length < 6) {
        passwordError.classList.add('show');
        isValid = false;
      } else {
        passwordError.classList.remove('show');
      }
      
      if (isValid) {
        successMessage.style.display = 'block';
        form.reset();
      }
    });

    emailInput.addEventListener('blur', () => {
      if (!emailInput.value.includes('@')) {
        emailError.classList.add('show');
      } else {
        emailError.classList.remove('show');
      }
    });
  </script>
</body>
</html>
```

### 1.2 Seu Trabalho — Criar Testes de Integração

**Arquivo:** `tests/integration/LoginForm.test.js`

```javascript
import { describe, it, expect, beforeEach } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

describe('LoginForm - Integração', () => {
  beforeEach(() => {
    // Limpar DOM antes de cada teste
    document.body.innerHTML = '';
    // Carregar HTML (ajustar conforme seu setup)
    // loadHTMLFixture('src/LoginForm.html');
  });

  describe('Renderização Inicial', () => {
    it('deve renderizar formulário com todos os campos', () => {
      // TODO: Implementar
      // Verificar se email input existe
      // Verificar se password input existe
      // Verificar se botão submit existe
    });

    it('deve ter labels corretos', () => {
      // TODO: Implementar
    });
  });

  describe('Validação de Email', () => {
    it('deve mostrar erro quando email inválido no blur', async () => {
      // TODO: Implementar
      // Digitar email sem @
      // Dispara blur
      // Verificar que erro aparece
    });

    it('deve esconder erro quando email válido', async () => {
      // TODO: Implementar
    });
  });

  describe('Validação de Senha', () => {
    it('deve bloquear submit se senha < 6 caracteres', async () => {
      // TODO: Implementar
    });

    it('deve aceitar submit com senha válida', async () => {
      // TODO: Implementar
    });
  });

  describe('Envio do Formulário', () => {
    it('deve mostrar mensagem de sucesso ao enviar válido', async () => {
      // TODO: Implementar
      // Preencher email válido
      // Preencher senha válida
      // Click submit
      // Verificar mensagem de sucesso aparece
    });

    it('deve limpar formulário após sucesso', async () => {
      // TODO: Implementar
    });

    it('deve não enviar se email inválido', async () => {
      // TODO: Implementar
    });
  });
});
```

### 1.3 Requisitos de Testes

Crie **8-10 testes** cobrindo:

1. **Renderização (2 testes)**
   - Todos os campos presentes
   - Labels corretos

2. **Validação Email (2 testes)**
   - Mostrar erro com email inválido
   - Esconder erro com email válido

3. **Validação Senha (2 testes)**
   - Erro com senha curta
   - OK com senha longa

4. **Interação Completa (2-3 testes)**
   - Submit com sucesso
   - Formulário limpo pós-sucesso
   - Não submit se erro

### 1.4 Dicas Técnicas

```javascript
// Usar userEvent para inputs
const emailInput = screen.getByRole('textbox', { name: /email/i });
await userEvent.type(emailInput, 'test@email.com');

// Verificar se elemento aparece
expect(screen.getByText('Login realizado com sucesso!')).toBeVisible();

// Aguardar elemento (assíncrono)
await waitFor(() => {
  expect(screen.getByText('Sucesso')).toBeInTheDocument();
});
```

---

## 2. Tarefa Complementar — Adicionar Novo Teste

Modifique o HTML para **adicionar um checkbox "Lembrar de mim"** e crie 1 teste verificando seu funcionamento.

---

## 3. Executar Testes

```bash
npm test tests/integration/LoginForm.test.js
```

---

## 4. Critério de Avaliação

### Checklist
- [ ] 8-10 testes de integração
- [ ] Renderização testada
- [ ] Validações testadas
- [ ] Eventos de usuário simulados
- [ ] Mensagens de sucesso/erro verificadas
- [ ] Tarefa complementar (checkbox)

### Rubrica
| Critério | 10 | 8 | 6 | 4 |
|---|---|---|---|---|
| **Testes** | 10+ testes | 8-9 testes | 6-7 testes | < 6 |
| **User Events** | Sempre userEvent | 90% userEvent | Misturado | Mostly fireEvent |
| **Assertions** | Completas e corretas | Boas | Aceitáveis | Faltam checks |
| **Extra** | Checkbox + 1 teste | Checkbox implementado | Parcial | Não fez |

---

**Entrega:** `LoginForm.test.js` commitado  
**Onde:** Repositório GitHub (push até 23h59)
