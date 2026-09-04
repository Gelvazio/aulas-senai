# ATIVIDADE AULA 08 — Testes End-to-End (Parte 2)

**Objetivo:** Adicionar mais cenários E2E e testar performance + acessibilidade

**Duração:** 4 horas  
**Competências Praticadas:** Cenários complexos, performance, acessibilidade, assertions visuais  
**Modalidade:** Hands-on em laboratório

---

## 1. Tarefa Principal — Suite E2E Expandida

### 1.1 Arquivo: `tests/e2e/features.spec.js`

Adicione 5-7 novos cenários E2E:

```javascript
import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage.js';
import { DashboardPage } from './pages/DashboardPage.js';

test.describe('Funcionalidades Dashboard', () => {

  test.beforeEach(async ({ page }) => {
    // Fazer login antes de cada teste
    const login = new LoginPage(page);
    await login.navigate();
    await login.login('user@example.com', 'password123');
    await page.waitForURL(/dashboard/);
  });

  test('deve carregar dados da tabela', async ({ page }) => {
    // TODO: Implementar
    // Aguardar que tabela carregue
    // Verificar que tem pelo menos 1 linha
    // Verificar estrutura de colunas
  });

  test('deve filtrar dados da tabela', async ({ page }) => {
    // TODO: Implementar
    // Buscar por filtro input
    // Digitar termo de busca
    // Verificar que tabela filtra resultados
    // Verificar contagem de linhas diminuiu
  });

  test('deve ordenar tabela por coluna', async ({ page }) => {
    // TODO: Implementar
    // Click em header de coluna
    // Verificar que dados ordenaram
    // Click novamente para reverter ordem
  });

  test('deve editar perfil de usuário', async ({ page }) => {
    // TODO: Implementar
    // Click em botão editar
    // Preencher novo nome
    // Salvar
    // Verificar que nome atualizou na página
  });

  test('deve excluir item com confirmação', async ({ page }) => {
    // TODO: Implementar
    // Click delete
    // Aparecer modal de confirmação
    // Click confirmar
    // Verificar que item foi removido
  });

  test('deve navegar entre abas', async ({ page }) => {
    // TODO: Implementar
    // Se houver tabs/abas
    // Click em aba diferente
    // Verificar conteúdo mudou
    // Verificar URL mudou
  });

});
```

### 1.2 Testes de Performance

**Arquivo:** `tests/e2e/performance.spec.js`

```javascript
import { test, expect } from '@playwright/test';

test.describe('Performance Dashboard', () => {

  test('página deve carregar em < 3 segundos', async ({ page }) => {
    const start = Date.now();
    
    await page.goto('http://localhost:3000/dashboard.html');
    await page.waitForLoadState('networkidle');
    
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(3000);
  });

  test('tabela deve renderizar em < 1 segundo', async ({ page }) => {
    // TODO: Implementar
    // Medir tempo para tabela aparecer
    // Esperar por networkidle
    // Verificar tempo
  });

  test('não deve ter memory leaks', async ({ page }) => {
    // TODO: Implementar (avançado)
    // Se necessário medir memory
  });

});
```

### 1.3 Testes de Acessibilidade

**Arquivo:** `tests/e2e/accessibility.spec.js`

```javascript
import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test.describe('Acessibilidade Dashboard', () => {

  test('página não deve ter violações axe', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard.html');
    await injectAxe(page);
    await checkA11y(page, null, {});
  });

  test('deve ser navegável com teclado', async ({ page }) => {
    // TODO: Implementar
    // Tab através de elementos
    // Verificar que foco é visível
    // Verificar ordem de tab faz sentido
  });

  test('form deve ter labels acessíveis', async ({ page }) => {
    // TODO: Implementar
    // Verificar que inputs têm labels
    // Testar com screen reader (se possível)
  });

});
```

### 1.4 Requisitos

Criar:
- [ ] 5-7 cenários funcionais
- [ ] 2-3 testes de performance
- [ ] 2-3 testes de acessibilidade
- [ ] Total: 10-13 testes E2E nesta aula

---

## 2. Tarefa Complementar — Screenshots e Vídeos

Configure Playwright para capturar:

```javascript
test('deve fazer login', async ({ page }) => {
  // ... teste aqui
  
  // Screenshot em sucesso
  await page.screenshot({ path: 'success.png' });
});

test.use({
  video: 'retain-on-failure', // Vídeo só se falhar
  screenshot: 'only-on-failure'
});
```

---

## 3. Executar Testes

```bash
# Tudo
npx playwright test tests/e2e/

# Apenas features
npx playwright test tests/e2e/features.spec.js

# Com vídeos
npx playwright test --video retain-on-failure
```

---

## 4. Critério de Avaliação

- [ ] 5-7 testes funcionais
- [ ] 2-3 testes performance
- [ ] 2-3 testes acessibilidade
- [ ] Testes não-flaky (passam consistentemente)
- [ ] Screenshots/vídeos capturados

---

**Entrega:** `features.spec.js`, `performance.spec.js`, `accessibility.spec.js`  
**Onde:** Repositório GitHub
