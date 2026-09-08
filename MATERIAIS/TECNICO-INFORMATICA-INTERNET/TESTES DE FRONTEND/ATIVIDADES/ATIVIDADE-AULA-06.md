# ATIVIDADE AULA 06 — Testes de Integração (Parte 2)

**Objetivo:** Testar integração com API mockada

**Duração:** 4 horas  
**Competências Praticadas:** Mocking de APIs, testes assíncronos com DOM, MSW  
**Modalidade:** Hands-on em laboratório

---

## 1. Tarefa Principal — Testar Componente com Fetch

### 1.1 Arquivo: `src/UserList.js`

```javascript
export class UserList {
  constructor(containerId, apiUrl = 'https://api.example.com') {
    this.container = document.getElementById(containerId);
    this.apiUrl = apiUrl;
    this.users = [];
  }

  async loadUsers() {
    const response = await fetch(`${this.apiUrl}/users`);
    const data = await response.json();
    this.users = data;
    this.render();
  }

  render() {
    this.container.innerHTML = '';
    
    if (this.users.length === 0) {
      this.container.innerHTML = '<p>Nenhum usuário encontrado</p>';
      return;
    }

    const list = document.createElement('ul');
    this.users.forEach(user => {
      const li = document.createElement('li');
      li.textContent = `${user.name} (${user.email})`;
      li.dataset.userId = user.id;
      list.appendChild(li);
    });

    this.container.appendChild(list);
  }

  deleteUser(userId) {
    this.users = this.users.filter(u => u.id !== userId);
    this.render();
  }
}
```

### 1.2 HTML Fixture: `tests/fixtures/userlist.html`

```html
<!DOCTYPE html>
<html>
<body>
  <div id="userContainer"></div>
  <script src="../../src/UserList.js"></script>
</body>
</html>
```

### 1.3 Seu Trabalho — Criar Testes

**Arquivo:** `tests/integration/UserList.test.js`

```javascript
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { UserList } from '../../src/UserList.js';

describe('UserList - Integração com API', () => {
  let container;
  let userList;

  beforeEach(() => {
    // Criar container mock
    container = document.createElement('div');
    container.id = 'userContainer';
    document.body.appendChild(container);
    
    // Criar instância
    userList = new UserList('userContainer', 'https://api.test.com');
  });

  afterEach(() => {
    document.body.removeChild(container);
    vi.clearAllMocks();
  });

  describe('loadUsers()', () => {
    it('deve carregar lista de usuários da API', async () => {
      // Arrange
      const mockUsers = [
        { id: 1, name: 'João', email: 'joao@test.com' },
        { id: 2, name: 'Maria', email: 'maria@test.com' }
      ];
      
      global.fetch = vi.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockUsers)
        })
      );

      // Act
      await userList.loadUsers();

      // Assert
      expect(fetch).toHaveBeenCalledWith('https://api.test.com/users');
      expect(userList.users).toEqual(mockUsers);
      expect(container.querySelector('ul')).toBeInTheDocument();
    });

    it('deve renderizar usuários na DOM', async () => {
      // TODO: Implementar
      // Mock users
      // Load
      // Verificar que <li> são renderizados
      // Verificar conteúdo correto
    });

    it('deve mostrar mensagem quando lista vazia', async () => {
      // TODO: Implementar
      // Mock resposta vazia []
      // Load
      // Verificar texto "Nenhum usuário encontrado"
    });

    it('deve atualizar lista ao chamar loadUsers novamente', async () => {
      // TODO: Implementar
      // Primeira carga com 2 usuários
      // Segunda carga com 3 usuários
      // Verificar que lista foi atualizada
    });
  });

  describe('deleteUser()', () => {
    it('deve remover usuário da lista local', () => {
      // TODO: Implementar
      // Setar users manualmente
      // Render
      // Delete usuário
      // Verificar que foi removido da DOM
    });

    it('deve atualizar renderização após delete', () => {
      // TODO: Implementar
    });
  });

  describe('render()', () => {
    it('deve limpar container antes de renderizar', () => {
      // TODO: Implementar
      // Adicionar conteúdo ao container
      // Chamar render
      // Verificar que container foi limpo
    });
  });
});
```

### 1.4 Requisitos

Crie **8-10 testes** cobrindo:

1. **Load com sucesso (2 testes)**
   - API chamada corretamente
   - Usuários renderizados

2. **Casos especiais (2 testes)**
   - Lista vazia
   - Atualizar lista

3. **Delete (2 testes)**
   - Remove usuário
   - Atualiza DOM

4. **Render (2 testes)**
   - Limpa antes de renderizar
   - Renderiza vazio

---

## 2. Tarefa Complementar — Tratamento de Erros

Adicione ao `UserList.js`:

```javascript
async loadUsers() {
  try {
    const response = await fetch(`${this.apiUrl}/users`);
    if (!response.ok) throw new Error('Erro ao carregar usuários');
    this.users = await response.json();
    this.render();
  } catch (error) {
    this.container.innerHTML = `<p class="error">${error.message}</p>`;
  }
}
```

Crie **2 testes** para erro (404, 500, etc).

---

## 3. Executar Testes

```bash
npm test tests/integration/UserList.test.js
```

---

## 4. Critério de Avaliação

- [ ] 8-10 testes base
- [ ] 2 testes de erro (tarefa complementar)
- [ ] Mocks de fetch funcionais
- [ ] DOM assertions corretas
- [ ] Renderização verificada

---

**Entrega:** `UserList.test.js` commitado  
**Onde:** Repositório GitHub
