# BLOCO 02 — Vitest e Testing Library: Testes Unitários e Integração (16h)

**Carga horária:** 16 horas  
**Organização:** 4 aulas de 4 horas  
**Público:** Técnico em Informática para Internet  
**Capacidades:** Escrever testes unitários e testes de integração com DOM

---

## Apresentação do Bloco

Este bloco capacita os alunos a **implementar testes automatizados em JavaScript** através de frameworks modernos e metodologias consolidadas. Os colaboradores dominarão Vitest para testes unitários, Testing Library para testes de integração com DOM, compreenderão conceitos de mocks e spies, e aprenderão a estruturar suites de teste profissionais. A progressão avança de **configuração do ambiente**, passa por **sintaxe e matchers**, evolui para **mocks e spies complexos**, e culmina em **testes de integração reais com componentes e APIs mockadas**. O resultado é um profissional capaz de escrever testes que validam comportamento real do usuário.

---

## Conhecimentos

### Vitest: Testes Unitários
- Instalação e configuração (npm, package.json, vitest.config.js)
- Sintaxe básica (describe, it/test, expect)
- Matchers (toBe, toEqual, toBeNull, toBeDefined, toBeGreaterThan, toContain, toMatch)
- Assertions e validações por tipo de dado
- Mocks com vi.fn() (função mockada)
- Spies com vi.spyOn() (espiar método existente)
- Verificação de chamadas (toHaveBeenCalled, toHaveBeenCalledWith)
- Fixtures (beforeEach, afterEach, beforeAll, afterAll)
- Watch mode e re-execução automática
- Coverage report (line, branch, function, statement)
- Debugging de testes (console.log estratégico, debugger)

### Testing Library: Testes de Integração com DOM
- Filosofia: testar como usuário, não implementação
- Instalação e setup (@testing-library/react, cleanup automático)
- Queries (getByRole, getByLabelText, getByPlaceholderText, getByTestId)
- Diferenças: getBy (erro), queryBy (null), findBy (async)
- User events realistas (userEvent.click, userEvent.type, userEvent.selectOptions)
- Waiters (waitFor, findBy) para operações assincronass
- screen.debug() para debugging de DOM
- Acessibilidade automática (getByRole valida WCAG)
- Testes de elementos, inputs, dropdowns, modais
- Padrão AAA (Arrange-Act-Assert)

### Conceitos de Teste
- Testes isolados vs testes integrados
- Mock de dependências e APIs
- Spy em métodos existentes
- Setup e teardown automático
- Padrão AAA (preparação, ação, asserção)

---

## Estratégias Pedagógicas

- Exposição Dialogada com exemplos progressivos
- Demonstração Prática no VS Code
- Atividade Prática em Laboratório de Informática
- Pair Programming com colega
- Estudos de Caso com código autêntico
- Code Review entre pares
- Discussão sobre decisões de teste

---

## Atividades Práticas

1. **Setup do Ambiente Vitest:** Instalação passo a passo, criação de primeiro teste, execução com npm test, configuração de watch mode, interpretação de saída.

2. **Matchers e Assertions Vitest:** Escrever 8+ testes de função simples cobrindo diferentes matchers (igualdade, tipos, números, strings, arrays, objetos). Praticar com dados realistas.

3. **Mocks e Spies:** Criar função que depende de API externa, mockear com vi.fn(), espiar chamadas com vi.spyOn(), verificar chamadas com toHaveBeenCalled() e toHaveBeenCalledWith().

4. **Setup e Teardown:** Implementar beforeEach/afterEach para limpar estado, beforeAll/afterAll para setup inicial. Exemplo prático: teste de banco de dados fake.

5. **Testing Library Queries:** Testar componente Button com múltiplos estados, form com inputs e validação, lista dinâmica com filtro. Usar getByRole, getByLabelText, userEvent.

6. **Componentes Assincronos:** Testar componente que faz requisição HTTP, usar waitFor para esperar atualização, userEvent.type em input, simulação de erro de API.

---

## Ambiente de Aprendizagem

- Laboratório de informática com 20+ computadores
- Visual Studio Code com extensões de teste
- Node.js LTS + npm
- Navegadores modernos (Chrome, Firefox)

---

## Critérios de Avaliação

- ✅ Instala e configura Vitest e Testing Library
- ✅ Estrutura teste com describe/it/expect corretamente
- ✅ Utiliza matchers apropriados por tipo de dado
- ✅ Cria mocks com vi.fn() funcionalmente
- ✅ Utiliza spies com vi.spyOn() e verifica chamadas
- ✅ Implementa fixtures (beforeEach, afterEach)
- ✅ Executa testes em watch mode e interpreta saída
- ✅ Lê e interpreta relatório de coverage
- ✅ Utiliza queries apropriadas (getByRole prioritário)
- ✅ Simula interações realistas com userEvent
- ✅ Testa componentes com múltiplos estados
- ✅ Testa operações assincronass com waitFor
- ✅ Debuga testes com console.log e screen.debug()
- ✅ Aplica padrão AAA em testes
- ✅ Escreve testes que validam comportamento, não implementação

---

## Instrumentos de Avaliação

- Atividade prática de instalação e primeiro teste funcionando
- Exercício de cobertura completa com múltiplos matchers
- Projeto de mocks e spies em contexto real
- Atividade prática de Testing Library com 5+ componentes
- Trabalho em grupo: suite de testes para aplicação autêntica
- Code review de testes escritos por colega
- Apresentação: como foram tomadas decisões de teste

---

## Integração com Desafio Final (SA-BLOCO-02)

Este bloco prepara os estudantes para o desafio integrador da **SA-BLOCO-02**, onde consolidarão:
- Suite completa de testes unitários e integração
- Cobertura realista (70%+) de código
- Testes robustos que validam comportamento real
- Automação total com CI/CD (GitHub Actions)
- Relatório de cobertura profissional

---

## Referências

DODDS, Kent C. **Testing JavaScript**. Disponível em: https://testingjavascript.com

VITEST DOCUMENTATION. **Getting Started**. Disponível em: https://vitest.dev

TESTING LIBRARY DOCUMENTATION. **React Testing Library**. Disponível em: https://testing-library.com/react

FOWLER, Martin. **Test Pyramid**. Disponível em: https://martinfowler.com/bliki/TestPyramid.html

YOUTUBE. **Testing in JavaScript** - Egghead.io. Disponível em: https://egghead.io
