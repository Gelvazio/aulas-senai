# ATIVIDADE AULA 07 — Testes End-to-End (Parte 1)

**Objetivo:** Automatizar testes E2E com Playwright usando Page Object Model

**Duração:** 4 horas  
**Competências Praticadas:** Playwright, POM, seletores, cenários de teste  
**Modalidade:** Hands-on em laboratório

---

## 1. Tarefa Principal — Suite E2E com Page Object Model

### 1.1 Setup Inicial

```bash
npm install --save-dev @playwright/test
npx playwright install
```

### 1.2 Página de Teste: `examples/dashboard.html`

Uma página de dashboard simples com:
- Login form
- Logout button
- User card
- Data table

*Arquivo fornecido pelo professor*

### 1.3 Seu Trabalho — Implementar POM + E2E Tests

**Arquivo 1:** `tests/e2e/pages/LoginPage.js` (Page Object Model)

```javascript
export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.submitButton = page.locator('button[type="submit"]');
    this.errorMessage = page.locator('.error-message');
  }

  async navigate() {
    await this.page.goto('http://localhost:3000/login.html');
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }

  async isErrorVisible() {
    return await this.errorMessage.isVisible();
  }

  // TODO: Adicione mais métodos para:
  // - Verificar se elemento está no viewport
  // - Aguardar sucesso do login
}
```

**Arquivo 2:** `tests/e2e/pages/DashboardPage.js`

```javascript
export class DashboardPage {
  constructor(page) {
    this.page = page;
    this.userCard = page.locator('[data-testid="user-card"]');
    this.logoutButton = page.locator('button:has-text("Logout")');
    this.dataTable = page.locator('table');
  }

  async navigate() {
    await this.page.goto('http://localhost:3000/dashboard.html');
  }

  async logout() {
    await this.logoutButton.click();
  }

  async getUserName() {
    return await this.userCard.locator('h2').textContent();
  }

  async getTableRowCount() {
    const rows = await this.dataTable.locator('tr').count();
    return rows - 1; // Descontar header
  }

  // TODO: Adicione mais métodos para interações
}
```

**Arquivo 3:** `tests/e2e/auth.spec.js` (Test Suite)

```javascript
import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage.js';
import { DashboardPage } from './pages/DashboardPage.js';

test.describe('Fluxo de Autenticação', () => {
  
  test('deve fazer login com credenciais válidas', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);

    // Act
    await loginPage.navigate();
    await loginPage.login('user@example.com', 'password123');

    // Assert
    await expect(page).toHaveURL(/dashboard/);
  });

  test('deve mostrar erro com email inválido', async ({ page }) => {
    // TODO: Implementar
    // Navigate to login
    // Try login com email inválido
    // Verificar que erro aparece
  });

  test('deve fazer logout com sucesso', async ({ page }) => {
    // TODO: Implementar
    // Login
    // Click logout
    // Verificar que voltou para login
  });

  test('cenário completo: login -> usar dashboard -> logout', async ({ page }) => {
    // TODO: Implementar
    // Login
    // Verificar que está no dashboard
    // Verificar dados do usuário
    // Logout
    // Verificar que está na página de login
  });
});
```

### 1.4 Requisitos de Testes

Criar **5-7 cenários E2E**:

1. **Login (2 testes)**
   - Login com credenciais válidas
   - Erro com email inválido

2. **Dashboard (2 testes)**
   - Exibir dados de usuário
   - Tabela carrega dados

3. **Logout (1 teste)**
   - Logout funciona

4. **Fluxo Completo (1-2 testes)**
   - Cenário completo de usuário

---

## 2. Tarefa Complementar — Verificações Visuais

Adicione screenshot em caso de falha:

```javascript
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== 'passed') {
    await page.screenshot({ path: `failure-${Date.now()}.png` });
  }
});
```

---

## 3. Executar Testes

```bash
npx playwright test tests/e2e/auth.spec.js

# Modo headed (vendo navegador)
npx playwright test --headed

# Modo debug
npx playwright test --debug
```

---

## 4. Critério de Avaliação

- [ ] POM implementado corretamente
- [ ] 5-7 cenários E2E
- [ ] Page Object methods reutilizáveis
- [ ] Seletores apropriados (data-testid preferível)
- [ ] Testes passando consistentemente (não flaky)

---

**Entrega:** `auth.spec.js` + `pages/*.js` commitados  
**Onde:** Repositório GitHub
