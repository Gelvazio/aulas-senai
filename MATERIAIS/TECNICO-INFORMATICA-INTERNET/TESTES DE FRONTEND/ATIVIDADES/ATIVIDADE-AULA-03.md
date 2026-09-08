# ATIVIDADE AULA 03 — Testes Unitários em JavaScript (Parte 1)

**Objetivo:** Escrever testes unitários robustos usando padrão AAA e matchers avançados

**Duração:** 4 horas  
**Competências Praticadas:** Teste unitário, padrão AAA, matchers, assertions  
**Modalidade:** Hands-on em laboratório

---

## 1. Tarefa Principal — Suite de Testes Unitários Completa

### 1.1 Contexto
Você vai testar uma **classe de usuário** que possui validações, transformações de dados e tratamento de erros.

### 1.2 Arquivo a Testar: `src/User.js`

```javascript
export class User {
  constructor(name, email, age) {
    this.name = name;
    this.email = email;
    this.age = age;
    this.createdAt = new Date();
  }

  isAdult() {
    return this.age >= 18;
  }

  isEmailValid() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }

  getInitials() {
    return this.name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  }

  updateAge(newAge) {
    if (newAge < 0) {
      throw new Error('Idade não pode ser negativa');
    }
    if (newAge > 150) {
      throw new Error('Idade deve ser menor que 150');
    }
    this.age = newAge;
  }

  toJSON() {
    return {
      name: this.name,
      email: this.email,
      age: this.age,
      adult: this.isAdult()
    };
  }
}
```

### 1.3 Instruções — Escrever Testes

**Arquivo:** `tests/unit/User.test.js`

Você deve criar testes para as 5 funções acima. Siga o padrão **Arrange-Act-Assert (AAA)**:

```
1. Arrange (Preparar) — Criar dados necessários
2. Act (Agir) — Chamar a função
3. Assert (Verificar) — Confirmar resultado
```

**Exemplo fornecido:**

```javascript
import { describe, it, expect, beforeEach } from 'vitest';
import { User } from '../../src/User.js';

describe('Classe User', () => {
  let user;

  beforeEach(() => {
    // Arrange: Preparar dados para cada teste
    user = new User('João Silva', 'joao@email.com', 25);
  });

  describe('isAdult()', () => {
    it('deve retornar true para maiores de 18 anos', () => {
      // Act & Assert
      expect(user.isAdult()).toBe(true);
    });

    it('deve retornar false para menores de 18 anos', () => {
      const youngUser = new User('Maria', 'maria@email.com', 16);
      expect(youngUser.isAdult()).toBe(false);
    });

    it('deve retornar true exatamente com 18 anos', () => {
      const exactUser = new User('Pedro', 'pedro@email.com', 18);
      expect(exactUser.isAdult()).toBe(true);
    });
  });

  // TODO: Você deve adicionar testes para:
  // - isEmailValid()
  // - getInitials()
  // - updateAge()
  // - toJSON()

});
```

### 1.4 Seu Trabalho

**Completar a suite de testes adicionando:**

1. **4 testes para `isEmailValid()`** (happy path + edge cases)
   - Email válido simples
   - Email com domínio .com.br
   - Email sem @
   - Email vazio

2. **4 testes para `getInitials()`** (happy path + edge cases)
   - Nome com 2 palavras
   - Nome com 3+ palavras
   - Nome com uma palavra
   - Nome com caracteres especiais

3. **5 testes para `updateAge()`** (happy path + erros)
   - Atualizar idade válida
   - Lançar erro com idade negativa
   - Lançar erro com idade > 150
   - Atualizar para idade 0
   - Atualizar para idade 150

4. **2 testes para `toJSON()`** (transformação)
   - Retornar objeto com todos os campos
   - Campo `adult` refletir resultado de `isAdult()`

### 1.5 Matchers Permitidos

Use os matchers apropriados:
- `toBe()` — para valores exatos
- `toEqual()` — para objetos/arrays
- `toContain()` — para strings/arrays
- `toThrow()` — para erros
- `toMatch()` — para regex

---

## 2. Tarefa Complementar — Code Review

Após completar sua suite, faça **peer review** com um colega:

- [ ] Todos os testes têm nome descritivo?
- [ ] Segue padrão AAA consistentemente?
- [ ] Edge cases estão cobertos?
- [ ] Matchers são apropriados?
- [ ] Não há código duplicado?

Registre feedback em um documento curto.

---

## 3. Executar Testes

```bash
npm test tests/unit/User.test.js

# Esperado:
# ✓ tests/unit/User.test.js (15)
# Test Files  1 passed (1)
#      Tests  15 passed (15)
```

---

## 4. Critério de Avaliação

### Checklist
- [ ] 4 testes para `isEmailValid()` com casos variados
- [ ] 4 testes para `getInitials()` com edge cases
- [ ] 5 testes para `updateAge()` cobrindo erros
- [ ] 2 testes para `toJSON()`
- [ ] **Total: ≥ 15 testes** passando
- [ ] Código de teste legível e bem-comentado
- [ ] Peer review completado

### Rubrica
| Critério | 10 | 8 | 6 | 4 |
|---|---|---|---|---|
| **Quantidade de Testes** | 18+ testes | 15-17 testes | 12-14 testes | < 12 testes |
| **Cobertura de Casos** | Casos normais + edge + erros | Casos normais + alguns edge | Casos normais | Faltam muitos casos |
| **Legibilidade** | Nomes claros, bem-estruturado | Nomes bons, 1-2 melhorias | Nomes aceitáveis | Difícil de ler |
| **Matchers Corretos** | Sempre apropriados | 90% corretos | 70% corretos | Muitos incorretos |

---

## 5. Recursos

- Documentação Vitest Matchers: https://vitest.dev/api/expect.html
- Arquivo fornecido: `src/User.js`
- Exemplo de teste completo no repositório

---

## 6. Próximos Passos

- **Aula 04** você vai **expandir** com testes assíncronos e mocks
- Vamos testar funções que fazem chamadas a API

---

**Entrega:** Arquivo `User.test.js` commitado no Git  
**Formato:** Arquivo .js com suite completa  
**Onde:** Repositório GitHub (push até 23h59)
