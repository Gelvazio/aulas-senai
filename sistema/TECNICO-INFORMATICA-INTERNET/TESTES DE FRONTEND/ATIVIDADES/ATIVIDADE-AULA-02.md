# ATIVIDADE AULA 02 — Configuração de Ambiente e Ferramentas

**Objetivo:** Configurar projeto Node.js com Vitest do zero

**Duração:** 4 horas  
**Competências Praticadas:** Uso de terminal, gerenciamento de dependências, configuração de ferramentas  
**Modalidade:** Hands-on em laboratório

---

## 1. Tarefa Principal — Setup Completo de Projeto

### 1.1 Objetivos da Atividade
Ao final, você terá um projeto funcional com:
- ✅ Node.js e npm configurados
- ✅ Vitest instalado e funcionando
- ✅ Primeiro teste executando com sucesso
- ✅ Estrutura de diretórios pronta para aulas futuras

### 1.2 Instruções Passo-a-Passo

**Passo 1: Criar Diretório do Projeto (10 min)**

```bash
# No terminal, execute:
mkdir meu-projeto-testes
cd meu-projeto-testes
pwd  # Confirme que está no diretório correto
```

**Passo 2: Inicializar package.json (5 min)**

```bash
npm init -y
# Isso cria um arquivo package.json com valores padrão
```

Abra o arquivo `package.json` criado e edite conforme abaixo:

```json
{
  "name": "meu-projeto-testes",
  "version": "1.0.0",
  "description": "Projeto de testes de frontend com Vitest",
  "type": "module",
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  },
  "devDependencies": {}
}
```

**Passo 3: Instalar Vitest (15 min)**

```bash
npm install --save-dev vitest
# Aguarde a instalação completar (pode levar 2-3 minutos)
```

Verifique que `node_modules` foi criado:
```bash
ls -la  # ou dir (Windows)
```

**Passo 4: Criar Estrutura de Diretórios (10 min)**

```bash
# Crie as pastas
mkdir src
mkdir tests
mkdir tests/unit

# Crie um .gitignore
echo "node_modules/" > .gitignore
echo ".DS_Store" >> .gitignore
echo "coverage/" >> .gitignore
```

**Passo 5: Criar Primeiro Arquivo de Função (15 min)**

Arquivo: `src/math.js`

```javascript
// Funções matemáticas simples para testar
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

export function multiply(a, b) {
  return a * b;
}

export function divide(a, b) {
  if (b === 0) throw new Error("Divisão por zero!");
  return a / b;
}
```

**Passo 6: Criar Primeiro Teste (30 min)**

Arquivo: `tests/unit/math.test.js`

```javascript
import { describe, it, expect } from 'vitest';
import { add, subtract, multiply, divide } from '../../src/math.js';

describe('Funções de Matemática', () => {
  
  describe('add()', () => {
    it('deve somar dois números positivos', () => {
      expect(add(2, 3)).toBe(5);
    });

    it('deve somar números negativos', () => {
      expect(add(-2, -3)).toBe(-5);
    });

    it('deve retornar o número quando somado com zero', () => {
      expect(add(5, 0)).toBe(5);
    });
  });

  describe('subtract()', () => {
    it('deve subtrair dois números', () => {
      expect(subtract(5, 3)).toBe(2);
    });
  });

  describe('multiply()', () => {
    it('deve multiplicar dois números', () => {
      expect(multiply(4, 5)).toBe(20);
    });

    it('deve retornar zero ao multiplicar por zero', () => {
      expect(multiply(5, 0)).toBe(0);
    });
  });

  describe('divide()', () => {
    it('deve dividir dois números', () => {
      expect(divide(10, 2)).toBe(5);
    });

    it('deve lançar erro ao dividir por zero', () => {
      expect(() => divide(10, 0)).toThrow("Divisão por zero!");
    });
  });

});
```

**Passo 7: Executar Testes (10 min)**

```bash
# Execute os testes
npm test

# Você deve ver algo assim:
# ✓ tests/unit/math.test.js (4)
#
# Test Files  1 passed (1)
#      Tests  4 passed (4)
```

**Passo 8: Explorar Interface Vitest (15 min)**

```bash
# Execute com interface visual
npm run test:ui

# Abra o navegador no link exibido (normalmente http://localhost:____)
# Explore a interface, execute testes novamente
```

**Passo 9: Gerar Relatório de Cobertura (10 min)**

```bash
# Instale cobertura
npm install --save-dev @vitest/coverage-v8

# Configure em vitest.config.js (criar novo arquivo)
```

Arquivo: `vitest.config.js`

```javascript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html']
    }
  }
});
```

```bash
# Gere cobertura
npm run test:coverage

# Abra coverage/index.html no navegador
```

---

## 2. Checklist de Configuração

Marque cada item conforme completa:

- [ ] Diretório criado e `pwd` confirmado
- [ ] `npm init -y` executado
- [ ] `package.json` editado com scripts
- [ ] Vitest instalado (`node_modules` existe)
- [ ] Diretórios src/ e tests/ criados
- [ ] `.gitignore` criado
- [ ] `src/math.js` criado com 4 funções
- [ ] `tests/unit/math.test.js` criado com 6 testes
- [ ] `npm test` executado com ✓ todos os testes passando
- [ ] `npm run test:ui` abriu interface visual
- [ ] `vitest.config.js` criado
- [ ] Cobertura gerada e aberta no navegador

---

## 3. Tarefa Complementar — Troubleshooting

Se você enfrentar algum erro, siga este guia:

### "npm: command not found"
- Verifique se Node.js está instalado: `node --version`
- Se não está, instale em nodejs.org

### "Cannot find module 'vitest'"
- Verifique que está no diretório correto: `pwd`
- Reinstale: `npm install --save-dev vitest`

### Testes não rodando
- Verifique o arquivo: `npm test` (sem `--ui`)
- Procure por erros de sintaxe no arquivo `.test.js`

### Package.json não tem field "type": "module"
- Adicione manualmente: `"type": "module",`

---

## 4. Critério de Avaliação

### Entrega
Tire um print da tela mostrando:
1. Terminal com output de `npm test` (✓ todos passando)
2. Interface Vitest (test:ui) aberta no navegador
3. Relatório de cobertura (coverage/index.html)
4. Arquivo `vitest.config.js` no VS Code

### Rubrica
| Critério | Excelente | Bom | Satisfatório | Insatisfatório |
|---|---|---|---|---|
| **Projeto Criado** | Todos os arquivos presentes e corretos | Faltam 1-2 arquivos | Faltam 3+ arquivos | Não foi criado |
| **Vitest Instalado** | Rodando sem erros | Rodando com warnings | Erros menores | Não funciona |
| **Testes Passando** | ≥ 6 testes ✓ | 5 testes ✓ | 3-4 testes ✓ | < 3 testes |
| **Documentação** | Print com 4 evidências | Print com 3 evidências | Print com 2 evidências | Sem evidências |

---

## 5. Recursos Fornecidos

- Link Documentação Vitest: https://vitest.dev/
- Vídeo Tutorial Setup: [link YouTube]
- Template package.json: Fornecido no Discord

---

## 6. Próximos Passos

- Aula 03 você vai **expandir esses testes** com edge cases
- Vamos adicionar **mocks e spies** para funções mais complexas
- Mantenha este projeto, vamos usar nas aulas futuras!

---

**Entrega:** Screenshots até 23h59 do dia seguinte  
**Formato:** PDF com 4 prints (terminal, UI, cobertura, config)  
**Onde:** Plataforma do curso
