# ATIVIDADE AULA 09 — CI/CD e Boas Práticas

**Objetivo:** Configurar pipeline CI/CD e documentar boas práticas de testes

**Duração:** 4 horas  
**Competências Praticadas:** GitHub Actions, CI/CD, documentação técnica  
**Modalidade:** Hands-on em laboratório

---

## 1. Tarefa Principal — Configurar Pipeline CI/CD

### 1.1 Arquivo: `.github/workflows/test.yml`

Criar pipeline que:
- Executa em cada push
- Roda todos os tipos de teste (unit, integration, E2E)
- Gera relatório de cobertura
- Bloqueia merge se testes falharem

```yaml
name: Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [16.x, 18.x]
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run unit tests
        run: npm run test:unit
      
      - name: Run integration tests
        run: npm run test:integration
      
      - name: Run E2E tests
        run: npm run test:e2e
      
      - name: Generate coverage report
        run: npm run test:coverage
      
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json
          fail_ci_if_error: true
      
      - name: Comment PR with coverage
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v6
        with:
          script: |
            // TODO: Adicionar script para comentar cobertura no PR
```

### 1.2 Seu Trabalho — Completar o Pipeline

**Tarefas:**

1. **Criar arquivo `.github/workflows/test.yml`**
   - [ ] Cópia do template acima
   - [ ] Ajustar versões Node.js se necessário
   - [ ] Adicionar etapas faltantes

2. **Criar/Atualizar `package.json` scripts**
   ```json
   {
     "scripts": {
       "test": "vitest",
       "test:unit": "vitest tests/unit/",
       "test:integration": "vitest tests/integration/",
       "test:e2e": "playwright test",
       "test:coverage": "vitest --coverage",
       "test:watch": "vitest --watch"
     }
   }
   ```

3. **Configurar Branch Protection**
   - No GitHub: Settings → Branches → Add rule
   - Require pull request reviews: ON
   - Require status checks: ON (selecionar os testes)
   - Require branches to be up to date: ON

4. **Documentar Estratégia de Testes**
   - Criar arquivo: `docs/TESTING-STRATEGY.md`
   - Incluir:
     - Pirâmide de testes (proporção)
     - Tipos de teste e responsabilidades
     - Como rodar testes localmente
     - Como debugar testes
     - Cobertura esperada (≥ 70%)

### 1.3 Arquivo: `docs/TESTING-STRATEGY.md`

Modelo:

```markdown
# Estratégia de Testes — Projeto X

## Pirâmide de Testes

```
      E2E (5-10%)
      ▲
     / \
    /   \  Integration (20-30%)
   /     \
  /       \ Unit (60-70%)
 /_________\
```

## Tipos de Testes

### Unit Tests (60-70%)
- Testam funções isoladas
- Sem dependências externas
- Rápidos (< 1ms cada)
- Framework: Vitest

### Integration Tests (20-30%)
- Testam componentes + interações
- Podem usar mocks de API
- Incluem DOM Testing Library
- Framework: Vitest + Testing Library

### E2E Tests (5-10%)
- Testam fluxos completos
- Navegador real
- Lentos (1-5s cada)
- Framework: Playwright

## Cobertura

- **Meta:** ≥ 70% de cobertura
- **Crítico:** ≥ 80% para código crítico
- **Relatório:** Gerado em `coverage/`

## Como Rodar

\`\`\`bash
# Todos os testes
npm test

# Apenas unit
npm run test:unit

# Com watch mode
npm run test:watch

# Com coverage
npm run test:coverage

# E2E
npm run test:e2e
\`\`\`

## Debugging

- Usar `--inspect` flag
- Usar `test.only()` para teste específico
- Usar `test.skip()` para pular testes

## CI/CD

Pipeline executa em cada push/PR:
- Testes devem passar
- Cobertura ≥ 70%
- Sem console.errors

Ver `.github/workflows/test.yml`
```

---

## 2. Tarefa Complementar — Badge de Status

Adicionar badge no `README.md`:

```markdown
![Tests](https://github.com/seu-usuario/seu-repo/workflows/Tests/badge.svg)
![Coverage](https://codecov.io/gh/seu-usuario/seu-repo/branch/main/graph/badge.svg)
```

---

## 3. Verificação

Fazer um commit e push para verificar:
- [ ] Workflow executa no GitHub Actions
- [ ] Todos os testes passam
- [ ] Cobertura é reportada
- [ ] PR com testes falhando é bloqueado

---

## 4. Critério de Avaliação

- [ ] `.github/workflows/test.yml` criado e funcionando
- [ ] `package.json` scripts configurados
- [ ] Branch protection ativo
- [ ] `docs/TESTING-STRATEGY.md` bem-escrito
- [ ] Badges no README
- [ ] CI/CD executando e bloqueando MRs

---

**Entrega:** Push com workflow + documentação  
**Onde:** Repositório GitHub
