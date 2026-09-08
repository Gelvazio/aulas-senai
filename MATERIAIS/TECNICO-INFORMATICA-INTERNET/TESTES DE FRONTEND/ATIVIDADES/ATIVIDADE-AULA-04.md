# ATIVIDADE AULA 04 — Testes Unitários em JavaScript (Parte 2)

**Objetivo:** Testar funções assíncronas e usar mocks/spies com Vitest

**Duração:** 4 horas  
**Competências Praticadas:** Testes assíncronos, mocking, spying, tratamento de promessas  
**Modalidade:** Hands-on em laboratório

---

## 1. Tarefa Principal — Testes Assíncronos com Mocks

### 1.1 Arquivo a Testar: `src/UserService.js`

```javascript
export class UserService {
  constructor(apiUrl = 'https://api.example.com') {
    this.apiUrl = apiUrl;
  }

  async fetchUser(userId) {
    const response = await fetch(`${this.apiUrl}/users/${userId}`);
    if (!response.ok) {
      throw new Error(`Erro ao buscar usuário: ${response.status}`);
    }
    return response.json();
  }

  async saveUser(userData) {
    const response = await fetch(`${this.apiUrl}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return response.json();
  }

  async deleteUser(userId) {
    const response = await fetch(`${this.apiUrl}/users/${userId}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Erro ao deletar');
    return { success: true };
  }

  getUsersCount() {
    return 42; // Número fixo para testes
  }
}
```

### 1.2 Instruções — Criar Suite de Testes

**Arquivo:** `tests/unit/UserService.test.js`

Você deve criar testes para as funções acima mockando as chamadas de API.

**Scaffold Fornecido:**

```javascript
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { UserService } from '../../src/UserService.js';

describe('UserService', () => {
  let userService;

  beforeEach(() => {
    userService = new UserService('https://api.test.com');
    // Limpar mocks antes de cada teste
    vi.clearAllMocks();
  });

  describe('fetchUser()', () => {
    it('deve retornar usuário quando API responde com sucesso', async () => {
      // Arrange
      const mockUser = { id: 1, name: 'João', email: 'joao@test.com' };
      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockUser)
        })
      );

      // Act
      const result = await userService.fetchUser(1);

      // Assert
      expect(result).toEqual(mockUser);
      expect(fetch).toHaveBeenCalledWith('https://api.test.com/users/1');
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    // TODO: Adicione mais 3 testes para fetchUser()
    // - Error quando API retorna 404
    // - Error quando API retorna 500
    // - Verificar que URL está correta
  });

  describe('saveUser()', () => {
    it('deve fazer POST com dados corretos', async () => {
      // TODO: Implemente este teste
    });

    // TODO: Adicione mais 2 testes
  });

  describe('deleteUser()', () => {
    // TODO: Implemente 2 testes
  });

  describe('getUsersCount()', () => {
    // TODO: Implemente 1 teste (função síncrona)
  });
});
```

### 1.3 Seu Trabalho — Completar a Suite

**Criar testes para:**

1. **4 testes para `fetchUser()`** ✓ (1 é exemplo)
   - Retornar usuário com sucesso (exemplo fornecido)
   - Lançar erro quando API retorna 404
   - Lançar erro quando API retorna 500
   - Verificar que URL foi chamada corretamente

2. **3 testes para `saveUser()`**
   - POST com dados corretos
   - Retornar resposta da API
   - Verificar headers corretos

3. **2 testes para `deleteUser()`**
   - DELETE com sucesso
   - Lançar erro se falhar

4. **1 teste para `getUsersCount()`**
   - Retornar 42

**Total esperado: 10+ testes**

### 1.4 Dicas de Implementação

Use `vi.fn()` para criar mocks:
```javascript
const mockFetch = vi.fn(() => 
  Promise.resolve({ ok: true, json: () => Promise.resolve({}) })
);
global.fetch = mockFetch;
```

Use `toHaveBeenCalled` para verificar mocks:
```javascript
expect(fetch).toHaveBeenCalled();
expect(fetch).toHaveBeenCalledWith('url');
expect(fetch).toHaveBeenCalledTimes(1);
```

---

## 2. Tarefa Complementar — Refactoring

Após completar os testes, **refatore** o código `UserService.js` para melhorar testabilidade:

- [ ] Injetar fetch como dependência (ao invés de usar global)?
- [ ] Extrair URL base para melhor reutilização?
- [ ] Adicionar method private para construir URLs?

Documente as melhorias em um parágrafo.

---

## 3. Executar Testes

```bash
npm test tests/unit/UserService.test.js

# Esperado: 10+ testes passando
```

---

## 4. Critério de Avaliação

### Checklist
- [ ] 10+ testes total (4+3+2+1)
- [ ] Todos os testes usando async/await corretamente
- [ ] Mocks de fetch implementados
- [ ] toHaveBeenCalledWith usado corretamente
- [ ] Tratamento de erros testado
- [ ] Refactoring documentado

### Rubrica
| Critério | Excelente | Bom | Satisfatório | Insuficiente |
|---|---|---|---|---|
| **Quantidade** | 12+ testes | 10-11 testes | 8-9 testes | < 8 testes |
| **Testes Assíncronos** | Sempre async/await | 90% correto | 70% correto | Muitos erros |
| **Mocks** | Bem-estruturados | Funcionais | Funcionais mas confusos | Não funcionam |
| **Refactoring** | Significativo, bem-documentado | Alguns ajustes bons | Mínimo | Não fez |

---

## 5. Recursos

- Documentação Vitest Mock: https://vitest.dev/api/vi.html
- Exemplo de fetch mock: Fornecido
- API Test Service: https://jsonplaceholder.typicode.com/ (para referência)

---

## 6. Próximos Passos

- **Aula 05** você vai passar para **testes de integração** (DOM + componentes)
- Mantenha esta suite, vamos reutilizar em CI/CD

---

**Entrega:** Arquivo `UserService.test.js` commitado  
**Formato:** Arquivo .js com 10+ testes  
**Onde:** Repositório GitHub (push até 23h59)
