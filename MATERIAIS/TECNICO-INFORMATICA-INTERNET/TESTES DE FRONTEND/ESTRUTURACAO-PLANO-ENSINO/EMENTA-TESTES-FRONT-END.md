# EMENTA — TESTES DE FRONTEND

## 1. IDENTIFICAÇÃO DA DISCIPLINA

| Informação | Detalhes |
|---|---|
| **Unidade Curricular** | Testes de Frontend |
| **Curso** | Técnico em Informática para Internet |
| **Módulo** | ESPECÍFICO I |
| **Carga Horária Total** | 40 horas |
| **Período** | 2º Semestre |
| **Modalidade** | Teórico-Prática |
| **Pré-requisitos** | Codificação para Front-End, Lógica de Programação |
| **Código da Disciplina** | TEC-INFO-TESTE-FE |

---

## 2. OBJETIVO GERAL

Propiciar o desenvolvimento de capacidades básicas e socioemocionais para **planejar, executar e garantir a qualidade de interfaces para aplicações web**, por meio de testes funcionais, automação, validação de requisitos e aplicação de métodos, normas e procedimentos de teste para correção e implementação.

---

## 3. OBJETIVOS ESPECÍFICOS

Ao final desta disciplina, o aluno será capaz de:

- **OE1:** Diferenciar tipos de testes (unitário, integração, E2E) e compreender sua aplicação na pirâmide de testes
- **OE2:** Configurar ambiente de desenvolvimento com Node.js, npm e ferramentas de teste automatizado
- **OE3:** Escrever testes unitários em JavaScript utilizando Vitest com padrão AAA (Arrange-Act-Assert)
- **OE4:** Implementar testes de integração validando comportamento de componentes e interações com APIs
- **OE5:** Automatizar testes end-to-end com Playwright, aplicando padrão Page Object Model
- **OE6:** Avaliar performance de aplicações web utilizando Core Web Vitals e Lighthouse
- **OE7:** Validar acessibilidade de interfaces conforme padrões WCAG 2.1
- **OE8:** Configurar pipelines de integração contínua (CI/CD) com GitHub Actions
- **OE9:** Aplicar boas práticas na escrita de testes e estruturação de suites de teste
- **OE10:** Desenvolver projeto integrador com suite completa de testes em aplicação frontend

---

## 4. COMPETÊNCIAS A DESENVOLVER

### 4.1 Capacidades Técnicas

- Identificar tipos de testes aplicáveis a diferentes cenários de desenvolvimento frontend
- Escrever testes unitários para funções JavaScript isoladas com Vitest
- Estruturar e executar testes de integração entre componentes HTML/CSS/JS
- Automatizar testes end-to-end simulando interações reais de usuários
- Configurar pipelines de CI/CD com testes automatizados
- Interpretar relatórios de cobertura de testes e identificar gaps de qualidade
- Medir performance de aplicações (Core Web Vitals, LCP, FID, CLS)
- Validar conformidade com padrões de acessibilidade web (WCAG 2.1)
- Documentar estratégias de testes e resultados de execução

### 4.2 Capacidades Básicas

- Compreender ciclo de vida do desenvolvimento orientado por testes (TDD/BDD)
- Dominar ambiente de desenvolvimento com Node.js, npm e ferramentas de teste
- Ler e escrever código JavaScript funcional e testável
- Usar sistemas de controle de versão (Git) durante ciclos de teste
- Trabalhar em equipes ágeis com práticas de QA contínua
- Entender conceitos de mock, spy e stub em testes
- Aplicar padrões de design em testes (Page Object Model, Factory)

### 4.3 Capacidades Socioemocionais

- Responsabilidade e comprometimento com a qualidade do software
- Atenção ao detalhe e pensamento crítico na validação de funcionalidades
- Colaboração efetiva em code reviews e discussões técnicas
- Persistência na resolução de problemas complexos e testes intermitentes
- Comunicação clara de resultados de testes e bugs encontrados
- Autoaprendizagem contínua em novas ferramentas e frameworks de teste
- Empatia com usuários finais (foco em acessibilidade e performance)

---

## 5. EMENTA — CONTEÚDO PROGRAMÁTICO

### Bloco 01: Fundamentos de Testes — Autogestão e Automação (4-5 horas)

**Tópicos Oficiais (conforme CT-Informatica-Internet-1000-SENAI-SED-2026):**
- **Autogestão (1.1):** Responsabilidade no planejamento e execução de testes
- **Automação de Testes (2.1-2.4):** 
  - Definição e conceito de automação
  - Frameworks de automação disponíveis
  - Aplicação prática de automação em testes
  - Interação com equipe de testes
- **Técnicas de Testes (3.1-3.2):**
  - Teste funcional (caixa preta): validação de funcionalidades
  - Teste estrutural (caixa branca): validação de implementação
- **Tipos de Testes (4.1-4.5):**
  - Funcionalidade
  - Usabilidade
  - Confiabilidade
  - Desempenho
  - Manutenibilidade

**Conteúdo Expandido (4-5 horas):**

1. **Tipos Fundamentais de Testes (30 min)**
   - Testes Unitários: teste de função isolada, velocidade <100ms, ferramentas Vitest/Jest
   - Testes de Integração: múltiplas partes, velocidade 100ms-1s, Testing Library/Cypress
   - Testes E2E: fluxo completo, velocidade lenta (5s+), Playwright/Selenium
   - Comparação: velocidade, confiabilidade, custo de manutenção

2. **Pirâmide de Testes (30 min)**
   - Proporção ideal: 60% unitário, 30% integração, 10% E2E
   - Por quê: unitários rápidos e fáceis, integração valida interações, E2E testa fluxos críticos
   - Exemplo prático: E-commerce com 30 testes (18 unitários, 9 integração, 3 E2E)
   - Inversão de pirâmide: anti-padrão, testes lentos e caros demais

3. **Técnicas de Teste (30 min)**
   - Caixa Preta (Funcional): teste comportamento externo, não sabe implementação
   - Caixa Branca (Estrutural): teste implementação interna, sabe código
   - Diferenças de aplicação e trade-offs
   - Quando usar cada uma

4. **Tipos por Característica (20 min)**
   - Funcionalidade: 'Faz o que deveria?'
   - Usabilidade: 'Usuário consegue usar?'
   - Confiabilidade: 'Estável com stress?'
   - Desempenho: 'Carrega rápido?'
   - Manutenibilidade: 'Fácil de manter?'

5. **STLC — Software Testing Life Cycle (20 min)**
   - Planejamento: definir escopo, objetivos, estratégia
   - Design: criação de casos de teste
   - Execução: rodada dos testes
   - Monitoração: acompanhamento de progresso
   - Avaliação: análise de resultados
   - Ciclo contínuo e iterativo

6. **Autogestão e Automação (15 min)**
   - Autogestão: responsabilidade no planejamento, execução sistemática, documentação
   - Automação: escrever código para testar código
   - Benefícios: velocidade (100 manuais = 5 min vs 100 automatizados = 30s), repetibilidade, confiabilidade, CI/CD
   - Desafios: setup inicial, manutenção de testes

7. **Métricas de Qualidade (10 min)**
   - Cobertura de Testes: % de linhas testadas, meta ≥70%
   - Taxa de Defeitos: % de bugs que chegam a produção, meta <5%
   - Exemplo: 850/1000 linhas = 85% cobertura, 5 bugs/100 = 5% taxa
   - Interpretação e uso em decisões

**Exemplos Práticos com Código:**
- 3 testes simples mostrando diferença de velocidade (Unitário < Integração < E2E)
- Comparação visual: Pirâmide de Testes (infográfico com números)
- Vídeo curto (3 min): Bug que chegou a produção, impacto financeiro real

**Competências Praticadas:** Planejamento, responsabilidade, reconhecimento de tipos de teste, pensamento crítico

**Atividades Práticas (60 min):**
- Atividade 1 (20 min): Classificar 10 cenários em U/I/E2E
- Atividade 2 (30 min): Duplas — Desenhar pirâmide para 2 projetos reais
- Atividade 3 (10 min): Discussão — Custo de bug em teste vs produção

**Caso Real:** "Revolut pagou 200k por bug que teste E2E teria achado em 5 minutos"

**Checklist de Aprendizado:**
- [ ] Compreendo os 3 tipos principais de teste (U/I/E2E)
- [ ] Sei a proporção ideal da Pirâmide de Testes
- [ ] Consigo classificar um cenário como Unitário, Integração ou E2E
- [ ] Entendo por quê automação é importante
- [ ] Sei as 5 etapas do STLC

---

### Bloco 02: Conceitos Fundamentais e Planejamento de Testes (4-5 horas)

**Tópicos Oficiais (conforme CT-Informatica-Internet-1000-SENAI-SED-2026):**
- **Conceitos Fundamentais (5.1-5.2):**
  - Verificação: garantir que o produto foi desenvolvido corretamente
  - Validação: garantir que o produto correto foi desenvolvido
- **Planejamento de Testes Client-Side (6.1-6.4):**
  - Análise do documento de requisitos
  - Plano de testes: estrutura e organização
  - Suíte de testes: agrupamento e execução
  - Casos de testes: especificação e cobertura
- **Reconhecimento de Especificações Técnicas (Capacidades Básicas):**
  - Compreender documentação de interface
  - Entender requisitos de teste
  - Reconhecer etapas de planejamento de testes

**Conteúdo Expandido (4-5 horas):**

1. **Verificação vs Validação (30 min)**
   - Verificação: 'Desenvolvido corretamente?', responsável Dev, testes unitários/integração
   - Validação: 'Produto correto?', responsável QA, testes integração/E2E
   - Analogia: verificação é cimento correto, validação é casa que pediu
   - Matriz de decisão: quando cada uma é obrigatória

2. **Especificações Técnicas (30 min)**
   - Requisitos Funcionais: 'Login envia credentials para API'
   - Requisitos Não-Funcionais: 'IE11+ e Chrome, <100ms latência, WCAG 2.1 AA'
   - Critérios de Aceitação: Given/When/Then (BDD)
   - Exemplo: Login Social Google com 3 requisitos e 5 critérios de aceitação

3. **Plano de Testes — Estrutura (30 min)**
   - 1. Informações Gerais: projeto, datas, responsáveis
   - 2. Escopo: o que será testado e o que não
   - 3. Estratégia: tipos, proporção, ferramentas, cronograma
   - 4. Casos de Teste: TC-001 até TC-XXX com detalhes
   - 5. Métricas: cobertura esperada, taxa de defeitos
   - 6. Riscos: identificação, impacto, plano B
   - Tamanho: pequeno 5-10 pág, médio 20-30 pág, grande 50+ pág

4. **Casos de Teste — Formato Padrão (30 min)**
   - ID, Título, Pré-requisitos, Passos sequenciais, Resultado esperado
   - Bom: específico ('email test@example.com'), verificável, independente
   - Ruim: vago ('testa login'), não verificável, acoplado a outro
   - Exemplo completo com 5 passos e 3 verificações

5. **Suíte de Testes — Agrupamento (20 min)**
   - Agrupar por funcionalidade, prioridade, complexidade
   - Suite: Login (8 casos), Cadastro (5 casos), Performance (3 casos)
   - Vantagem: execução paralela, resultado claro por área
   - Rastreabilidade entre requisito e suíte

6. **Planejamento de Timeline (15 min)**
   - Projeto 40h: Semana 1 (4h planejamento, 8h design), Semana 2 (16h execução, 4h retest, 4h docs)
   - Estimativa: (Funcionalidades × 2) + Complexidade = Total
   - Exemplo: 12 features × 2 + 8 (integração pagamento) = 32h
   - Regra de ouro: 1h dev = 0.5-1h teste, projeto crítico = 1:1

7. **Documentação de Testes (10 min)**
   - Plano Formal: 1-2 páginas escopo, estratégia, timeline
   - Casos de Teste: TC-001 até TC-XXX com detalhes
   - Relatório de Execução: testes rodados, passaram, falharam, taxa sucesso
   - Lista de Defeitos: ID, descrição, severidade, status
   - Matriz de Rastreabilidade: REQ ↔ TC ↔ Status

8. **Setup Node.js e Ferramentas (15 min)**
   - Instalação: Node.js LTS, npm init, npm install vitest
   - Estrutura: src/, test/, package.json com scripts
   - Primeiro teste: describe, it, expect(result).toBe(expected)
   - Executar: npm test, watch mode, coverage

**Exemplos Práticos:**
- Template de Plano de Testes (1 página preenchida, 1 vazia para praticar)
- Comparação: Plano formal vs Kanban board (quando cada um?)
- Setup prático step-by-step: Node.js, npm, package.json, primeira execução

**Competências Praticadas:** Leitura de requisitos, planejamento, documentação, estruturação

**Atividades Práticas (70 min):**
- Atividade 1 (25 min): Escrever 3 casos de teste em formato padrão
- Atividade 2 (40 min): Duplas — Plano completo para feature "Carrinho de Compras"
- Atividade 3 (5 min): Discussão — Quando plano é overkill? Trade-offs de documentação

**Caso Real:** "E-commerce com 100% sem testes → 50 bugs em produção no primeiro mês"

**Checklist de Aprendizado:**
- [ ] Consigo diferenciar Verificação vs Validação
- [ ] Entendo como estruturar um Plano de Testes
- [ ] Consigo escrever Casos de Teste bem-formados
- [ ] Sei estimar tempo de testes para um projeto
- [ ] Consigo integrar Suítes de Teste com Requisitos

---

### Bloco 03: Vitest — Testes Unitários (8 horas)

**Tópicos Oficiais (conforme CT-Informatica-Internet-1000-SENAI-SED-2026):**
- **Processo Fundamental de Teste (7.1-7.5):**
  - **Planejamento (7.1):** Definição de escopo, objetivos e estratégia de teste
  - **Desenho dos Testes (7.2):** Criação de casos de teste, cenários, dados
  - **Execução dos Testes (7.3):** Rodada dos testes, registro de resultados
  - **Monitoração e Controle (7.4):** Acompanhamento do progresso, métricas
  - **Avaliação dos Resultados (7.5):** Análise de resultados, conclusões, relatórios
- **Aplicação de Testes (Capacidades Técnicas):**
  - Desenvolver conjunto de testes automatizados
  - Aplicar testes definidos no plano de testes
  - Reconhecer etapas de planejamento de testes
- **Documentação de Testes:**
  - Requisitos de documentação
  - Elaboração de relatórios de teste

**Conteúdo Expandido (8 horas):**

1. **Instalação e Configuração do Vitest (60 min)**
   - Instalação guiada: printscreens de cada passo
   - npm init, npm install vitest
   - Configuração package.json scripts
   - Estrutura de pastas (src/, test/, vitest.config.js)
   - Primeiros 5 minutos rodando primeiro teste

2. **Sintaxe e Estrutura de Testes (90 min)**
   - describe(): agrupamento de testes
   - it() / test(): definição de teste individual
   - expect(): assertions e matchers
   - Exemplo prático: 5 funções simples até complexas

3. **Matchers e Assertions (60 min)**
   - Igualdade: toBe(), toEqual(), toStrictEqual()
   - Tipos: toBeNull(), toBeUndefined(), toBeDefined(), toBeTruthy(), toBeFalsy()
   - Números: toBeGreaterThan(), toBeLessThan(), toBeCloseTo()
   - Strings: toContain(), toMatch(), toHaveLength()
   - Arrays: toContain(), toHaveLength(), toEqual()
   - Objetos: toHaveProperty(), toMatchObject()

4. **Mocks e Spies (90 min)**
   - vi.fn(): criar mock de função
   - vi.spyOn(): espiar método existente
   - toHaveBeenCalled(), toHaveBeenCalledWith()
   - Exemplo: Mock de API, chamadas de callback

5. **Fixtures e Setup/Teardown (30 min)**
   - beforeEach() / afterEach()
   - beforeAll() / afterAll()
   - Exemplo: Setup de DOM, banco de dados fake, limpeza

6. **Watch Mode e Coverage (30 min)**
   - npm test --watch
   - Modo de re-execução ao salvar arquivo
   - npm test -- --coverage
   - Relatório de cobertura (line, branch, function, statement)
   - Integração com CI/CD

7. **Debugging de Testes (30 min)**
   - console.log() estratégico
   - Debug mode no VS Code
   - screen.debug() para DOM
   - Breakpoints e time-travel debugging

**Exemplos Práticos com Código:**
- 5 exemplos com código executável: funções simples até mocks
- Arquivo `exemplo-aula-03.js` com comentários
- Output esperado documentado

**Competências Praticadas:** Desenvolvimento de testes automatizados, debugging, estruturação sistemática

**Atividades Práticas (120 min):**
- Atividade 1 (30 min): Fazer 5 testes unitários simples
- Atividade 2 (40 min): Duplas — Integrar mocks e spies em teste mais complexo
- Atividade 3 (10 min): Discussão — Quando mock é necessário?

**Caso Real:** "Teste unitário que economizou 2 dias de debug de integração com API externa"

**Checklist de Aprendizado:**
- [ ] Consigo instalar e configurar Vitest
- [ ] Sei estruturar um teste com describe/it/expect
- [ ] Consigo usar matchers apropriados para cada tipo de dado
- [ ] Entendo mocks, spies e quando usá-los
- [ ] Consigo ler e interpretar relatório de coverage

---

### Bloco 04: Testing Library — Testes de Integração com DOM (8 horas)

**Tópicos Oficiais:**
- **Execução Prática (Capacidades Técnicas):**
  - Aplicar testes definidos no plano de testes
  - Executar casos de teste manuais e automatizados
  - Registrar resultados de execução
  - Identificar e documentar defeitos encontrados
- **Testes de Funcionalidade:**
  - Validação de funcionalidades da interface
  - Teste de fluxos de usuário
  - Verificação de requisitos funcionais
- **Testes de Usabilidade:**
  - Avaliação da experiência do usuário
  - Validação de navegação
  - Verificação de acessibilidade básica

**Conteúdo Expandido (8 horas):**

1. **Comparação: Testing Library vs Enzyme (30 min)**
   - Testing Library: foca no comportamento do usuário (recomendado)
   - Enzyme: foca na implementação interna (evitar)
   - Por quê Testing Library é melhor: testa como usuário vê

2. **Instalação e Setup (30 min)**
   - npm install @testing-library/react
   - Configuração de render() e cleanup automático
   - Estrutura de projeto com Testing Library

3. **Queries: Obtendo Elementos (90 min)**
   - getByRole(): 'button', 'textbox', 'heading', etc
   - getByLabelText(): para inputs com label
   - getByPlaceholderText(): para inputs sem label
   - getByTestId(): último recurso quando outros falham
   - Diferença: getBy vs queryBy vs findBy
   - Exemplo: 6 componentes React diferentes

4. **User Events: Interações Realistas (90 min)**
   - userEvent.click(), userEvent.type(), userEvent.selectOptions()
   - fireEvent (diferença para userEvent)
   - Exemplo: Formulário com validação, dropdown, checkbox

5. **Waiters: Testando Async (60 min)**
   - waitFor(): esperar por mudança no DOM
   - findBy: combinação de getBy + waitFor
   - Exemplo: Requisição AJAX, carregamento de dados

6. **Accessibility (Acessibilidade) (60 min)**
   - getByRole() automaticamente testa acessibilidade
   - ARIA labels e roles
   - Teste que encontrou 5 problemas WCAG

7. **Debugging (30 min)**
   - screen.debug(): visualizar DOM renderizado
   - screen.logTestingPlaygroundURL(): gerar queries automaticamente
   - console.log() seletivo

**Exemplos Práticos com Código:**
- 6 exemplos com componentes React: input, button, form, async, select, custom
- Arquivo `exemplo-aula-04.jsx` com comentários
- Output esperado documentado

**Competências Praticadas:** Testes de integração de UI, validação de acessibilidade, debugging de DOM

**Atividades Práticas (100 min):**
- Atividade 1 (30 min): Testar componente Button com estados
- Atividade 2 (40 min): Duplas — Testar formulário completo com validação
- Atividade 3 (10 min): Discussão — Acessibilidade: como testes ajudam?

**Caso Real:** "Acessibilidade: teste que encontrou 5 problemas WCAG antes do code review"

**Checklist de Aprendizado:**
- [ ] Consigo instalar Testing Library
- [ ] Sei usar getByRole(), getByLabelText(), getByTestId()
- [ ] Consigo simular cliques, digitação, submit de formulário
- [ ] Entendo waitFor() e quando usá-lo
- [ ] Consigo debugar testes de DOM efetivamente

---

### Bloco 05: Testes de Integração Avançados (8 horas)

**Tópicos Oficiais:**
- **Automação de Testes (2.1-2.4):**
  - Frameworks e ferramentas de automação
  - Scripts de teste automatizados
  - Execução repetida de testes
  - Integração com equipe de desenvolvimento
- **Monitoração e Controle (7.4):**
  - Acompanhamento do progresso dos testes
  - Métricas de qualidade
  - Taxa de defeitos vs. cobertura
- **Tipos de Testes Aplicados:**
  - Testes de regressão automatizados
  - Testes de desempenho da interface
  - Testes de confiabilidade

**Conteúdo Expandido (8 horas):**

1. **Diferenças: U vs I vs E2E (30 min)**
   - Tabela grande comparativa
   - Unitário: função isolada, sem dependências
   - Integração: múltiplos componentes, com API
   - E2E: fluxo completo, browser real, usuário real
   - Trade-offs: velocidade vs confiabilidade

2. **Testando Múltiplos Componentes (90 min)**
   - Componente A → Componente B (passa dados)
   - Estados compartilhados
   - Context API / Redux
   - Exemplo: Lista + Filtro + Ordenação

3. **Mock de APIs (90 min)**
   - MSW (Mock Service Worker): intercepta requisições HTTP
   - fetch mock: alternativa simples
   - Servidor fake: estateless
   - Exemplo: Login + Busca de usuário

4. **Estados Compartilhados (60 min)**
   - localStorage mock
   - Context mock
   - Redux mock (se aplicável)
   - Exemplo: Carrinho de compras persiste entre componentes

5. **Debugging de Testes de Integração (30 min)**
   - Logs estratégicos
   - Isolated vs integrated (testar em isolamento)
   - Ferramentas de debugging

6. **Fluxos Completos (60 min)**
   - Autenticação com API mock
   - Validação de integração após login
   - Simulação de erro de rede
   - Retry automático

**Exemplos Práticos com Código:**
- 4 exemplos: 2 componentes, API mock, estado compartilhado
- Arquivo `exemplo-aula-05.jsx` com comentários
- Output esperado documentado

**Competências Praticadas:** Integração de componentes, mock de APIs, automação, monitoramento

**Atividades Práticas (100 min):**
- Atividade 1 (35 min): Testar fluxo de autenticação com API mock
- Atividade 2 (40 min): Duplas — Testar integração completa (lista + filtro + sort)
- Atividade 3 (10 min): Discussão — Integração que passou em testes mas falhou em produção

**Caso Real:** "Integração que passou em testes mas falhou em produção por race condition em async"

**Checklist de Aprendizado:**
- [ ] Consigo testar múltiplos componentes juntos
- [ ] Entendo como mockear APIs com MSW
- [ ] Consigo testar estados compartilhados
- [ ] Entendo fluxos assíncronos e race conditions
- [ ] Consigo debugar testes de integração complexos

---

### Bloco 06: Cypress — Testes E2E (8 horas)

**Tópicos Oficiais:**
- **Automação de Testes (2.1-2.4):**
  - Frameworks e ferramentas de automação
  - Scripts de teste automatizados
  - Execução repetida de testes
  - Integração com equipe de desenvolvimento
- **Documentação de Testes:**
  - Análise de resultados de execução
  - Conclusões sobre qualidade
  - Relatórios de teste

**Conteúdo Expandido (8 horas):**

1. **Instalação e Configuração (60 min)**
   - npm install cypress
   - Estrutura de pastas: cypress/e2e, cypress/support, cypress.config.js
   - Primeiro teste E2E passo a passo
   - Interface gráfica do Cypress (time-travel debugging)

2. **Seletores e Navegação (90 min)**
   - cy.visit(): navegar para URL
   - cy.get(): selecionar elementos
   - cy.contains(): buscar por texto
   - cy.click(), cy.type(), cy.submit()
   - Exemplo: Navegação completa de site com 5 páginas

3. **Assertions e Validações (60 min)**
   - cy.should(): validar estado
   - expect(): assertions diretas
   - Verificação de: título, URL, conteúdo, visibilidade
   - Exemplo: Validar login bem-sucedido com 10 verificações

4. **Async e Waiters (60 min)**
   - cy.wait(): esperar requisição HTTP
   - cy.intercept(): mockar requisições
   - Retry automático (default 4s)
   - Timeout realista
   - Exemplo: Login com API, simulação de erro de rede

5. **Screenshots e Vídeos (30 min)**
   - Captura automática em falhas
   - Vídeos completos de execução
   - Debugging visual com time-travel
   - Exemplo: Replay de falha com screenshot anotado

6. **Flakiness e Otimização (60 min)**
   - Testes intermitentes: causas comuns (race conditions, timing)
   - Retry automático do Cypress
   - Integração com GitHub Actions
   - Best practices para evitar flakiness
   - Exemplo: Teste que falhava 20% das vezes → otimizado para 0%

**Exemplos Práticos com Código:**
- 5 exemplos: navegação, formulário, async, network interception, screenshots
- Arquivo `exemplo-aula-06.cy.js` com comentários
- Output esperado documentado

**Competências Praticadas:** Automação E2E, debugging visual, integração com CI/CD

**Atividades Práticas (80 min):**
- Atividade 1 (30 min): Testar login end-to-end com 5 validações
- Atividade 2 (45 min): Duplas — Testar checkout completo (carrinho + pagamento)
- Atividade 3 (5 min): Discussão — Cypress vs Selenium vs Playwright

**Caso Real:** "Cypress que encontrou bug que nunca seria encontrado em testes unitários — race condition em checkout"

**Checklist de Aprendizado:**
- [ ] Consigo instalar e executar Cypress
- [ ] Sei usar cy.get(), cy.click(), cy.type(), cy.should()
- [ ] Consigo testar fluxos completos de usuário
- [ ] Entendo cy.intercept() para mockar APIs
- [ ] Consigo debugar testes E2E com screenshots e vídeos

---

### Bloco 07: Cobertura de Testes (4 horas)

**Tópicos Oficiais:**
- **Monitoração e Controle (7.4):**
  - Acompanhamento do progresso dos testes
  - Métricas de qualidade
  - Taxa de defeitos vs. cobertura
- **Métodos e Boas Práticas:**
  - Normas técnicas de teste
  - Procedimentos padronizados
  - Melhoria contínua

**Conteúdo Expandido (4 horas):**

1. **Métricas Explicadas (60 min)**
   - Line coverage: % de linhas executadas
   - Branch coverage: % de branches if/else testados
   - Function coverage: % de funções chamadas
   - Statement coverage: % de statements executados
   - Exemplo: Código com 4 branches, 1 não testado = 75% branch coverage
   - Relação entre métricas e qualidade real

2. **Leitura de Relatórios (60 min)**
   - Istanbul report visual (HTML interativo)
   - CodeCov badges e integração GitHub
   - Coverage trends (histórico)
   - Identificar gaps (linhas vermelhas não testadas)
   - Exemplo: ler relatório com 50 arquivos, 200 linhas não cobertas

3. **Metas Realistas (30 min)**
   - 70% é meta comum para produção
   - 85-90% é excelente (diminishing returns)
   - 100% não é realista (edge cases, error handling)
   - Regra de ouro: 1h desenvolvimento = 0.5-1h testes
   - Quando aumentar/diminuir meta

4. **Trade-offs (30 min)**
   - Mais cobertura = mais tempo gasto
   - ROI diminui após 80%
   - Focar em funcionalidades críticas (80/20)
   - Custo de manutenção de testes 100%
   - Decisão estratégica: cobertura vs velocidade

**Exemplos Práticos:**
- Código com coverage report visual (antes/depois)
- Arquivo `exemplo-aula-07.js` com comentários
- Relatório Istanbul interativo

**Competências Praticadas:** Análise de métricas, gestão de qualidade, decisão estratégica

**Atividades Práticas (60 min):**
- Atividade 1 (25 min): Ler relatório de coverage, identificar gaps de 60% → 80%
- Atividade 2 (50 min): Duplas — Aumentar coverage de 60% para 85%
- Atividade 3 (5 min): Discussão — 100% coverage é possível? Vale o custo?

**Caso Real:** "100% de coverage não significava 100% de qualidade — bug mesmo assim chegou a produção (condição não testada)"

**Checklist de Aprendizado:**
- [ ] Consigo gerar relatório de coverage com npm
- [ ] Entendo os 4 tipos de coverage (line, branch, function, statement)
- [ ] Consigo ler e interpretar Istanbul reports HTML
- [ ] Sei metas realistas de coverage por contexto
- [ ] Entendo trade-offs de tempo vs cobertura vs qualidade

---

### Bloco 08: Debugging e TDD (4 horas)

**Tópicos:**
- **Test-Driven Development (Capacidades Técnicas):**
  - Ciclo Red-Green-Refactor
  - Desenvolvimento guiado por testes
  - Qualidade via testes
- **Métodos e Boas Práticas:**
  - Procedimentos padronizados
  - Refactoring com confiança
  - Melhoria contínua

**Conteúdo Expandido (4 horas):**

1. **Test-Driven Development (60 min)**
   - Ciclo Red-Green-Refactor explicado visualmente
   - Red: escrever teste que falha (teste descreve comportamento)
   - Green: escrever código mínimo que passa (quick and dirty ok)
   - Refactor: melhorar código mantendo testes passando (seguro)
   - Exemplo: FizzBuzz via TDD passo a passo

2. **Debugging Técnicas (60 min)**
   - Breakpoints no VS Code
   - console.log() estratégico (não spam)
   - Isolated vs integrated (testar em isolamento para debug)
   - Time-travel debugging (Cypress)
   - Exemplo: Teste que falhava intermitentemente → debugado

3. **Ciclo TDD em Prática (90 min)**
   - 3 exemplos TDD: função simples → integração
   - Exemplo 1: Validador de email (simples)
   - Exemplo 2: Carrinho de compras (intermediário)
   - Exemplo 3: Autenticação com API (complexo)
   - Refactoring seguro com testes passando

4. **Melhorias Contínuas (30 min)**
   - Refactor sem quebrar testes
   - Confiança em mudanças de código
   - Documentação via testes (testes como especificação)
   - Padrão: "Arrange-Act-Assert" (AAA)

**Exemplos Práticos com Código:**
- 3 exemplos TDD: função simples até integração
- Arquivo `exemplo-aula-08.js` com comentários
- Passo a passo visual do ciclo Red-Green-Refactor

**Competências Praticadas:** TDD, debugging, refactoring seguro, qualidade

**Atividades Práticas (60 min):**
- Atividade 1 (25 min): Red-Green-Refactor para função simples (validar CPF)
- Atividade 2 (50 min): Duplas — Desenvolver feature inteira via TDD (filtro de lista)
- Atividade 3 (5 min): Discussão — TDD vale o investimento? Quando usar?

**Caso Real:** "TDD que preveniu 15 bugs antes do code review — teria sido 3-4 dias de debug em produção"

**Checklist de Aprendizado:**
- [ ] Entendo o ciclo Red-Green-Refactor
- [ ] Consigo escrever teste antes do código
- [ ] Sei debugar testes com breakpoints
- [ ] Consigo refatorar com confiança (testes garantem)
- [ ] Entendo benefícios e custo de TDD

---

### Bloco 09: Qualidade, Performance e CI/CD (4 horas)

**Tópicos Principais:**
- **Métricas de Qualidade (60 min)**
   - Defect density: bugs por 1000 linhas
   - Test effectiveness ratio: bugs encontrados / total bugs
   - Pass rate: % de testes passando
   - Flakiness rate: % de testes intermitentes
   - Exemplo: Projeto com 2% defect density vs 8%

- **Performance de Testes (60 min)**
   - Suite que demorava 40 min → otimizou para 8 min
   - Execução paralela (cy.config.js: specPattern)
   - Lazy loading de testes
   - Timeout realista (não excessivo)
   - Exemplo: Identificar testes lentos (> 30s)

- **CI/CD Integration (60 min)**
   - GitHub Actions workflow completo
   - Rodar testes em pull request (não permite merge sem testes)
   - Badges de status no README
   - Relatório automático de cobertura
   - Exemplo: Workflow pronto para copiar

- **Code Review Checklist (30 min)**
   - Checklist que todo PR deve ter
   - Testes devem passar
   - Coverage deve aumentar (ou manter)
   - Sem testes = rejeitar PR
   - Exemplo: Checklist de 8 itens

**Exemplos Práticos:**
- Performance report visual
- GitHub Actions workflow pronto (`exemplo-aula-09.yml`)
- Badge markdown para README

**Atividades Práticas (60 min):**
- Atividade 1 (30 min): Otimizar testes lentos (encontrar gargalos com npm test -- --reporter=verbose)
- Atividade 2 (45 min): Duplas — Implementar CI/CD completo com GitHub Actions e badges
- Atividade 3 (5 min): Discussão — Teste lento vale a pena? Quando rodar E2E vs Unitário?

**Caso Real:** "Suite de 2000 testes que demorava 40 min → otimizou para 8 min com parallelização e lazy loading"

**Checklist de Aprendizado:**
- [ ] Consigo interpretar métricas de qualidade
- [ ] Entendo como otimizar performance de testes (parallelização)
- [ ] Sei configurar CI/CD com GitHub Actions (workflow.yml)
- [ ] Consigo adicionar badges de status ao README
- [ ] Tenho checklist de code review pronto

---

### Bloco 10: Projeto Final e Apresentação (8 horas)

**Tópicos:**
- **Aplicação Completa de Conhecimento:**
  - Integração de todos os tópicos aprendidos
  - Plano, design, execução, monitoração, avaliação
  - Documentação profissional de testes
  - Relatórios executivos
- **Capacidades Socioemocionais:**
  - Valorizar diferentes ideias para resolver problemas
  - Fundamentar decisões em evidências
  - Considerar propostas de melhoria
  - Engajamento e cooperação na equipe
- **Apresentação de Resultados:**
  - Comunicação clara de achados
  - Discussão de qualidade e cobertura
  - Recomendações para melhorias

**Conteúdo Expandido (8 horas):**

1. **Projeto Integrador (240 min)**
   - Integração de todas as técnicas em um projeto real
   - Template de projeto: pastas, package.json, configurações
   - Exercício: Implementar suite completa de testes em projeto E-commerce
   - Meta: ≥80% cobertura (unitário + integração + E2E)

2. **Estrutura de Projeto (30 min)**
   - Pastas: src/, test/, cypress/e2e/, cypress/support/
   - package.json: scripts (test, test:watch, test:coverage, e2e)
   - vitest.config.js, cypress.config.js
   - .github/workflows/test.yml (CI/CD)

3. **Documentação Profissional (30 min)**
   - README com instruções (instalação, executar testes)
   - Métricas: cobertura, tempo de execução
   - Lições aprendidas (o que funcionou, o que não)
   - Recomendações para futuro

4. **Apresentação em Duplas (60 min)**
   - 10 minutos por dupla
   - Explicar arquitetura de testes
   - Mostrar coverage report
   - Discutir decisões (quando usar unitário vs integração vs E2E)
   - Feedback do grupo

**Exemplos Práticos:**
- Template de projeto pronto
- Arquivo `README.md` exemplo
- Arquivo `.github/workflows/test.yml` pronto

**Competências Praticadas:** Síntese, documentação, comunicação, trabalho em equipe, decisão estratégica

**Atividades Práticas (360 min):**
- Atividade 1 (180 min): Duplas — Implementar suite completa em projeto E-commerce
- Atividade 2 (60 min): Criar documentação profissional (README, métricas)
- Atividade 3 (60 min): Apresentação (10 min) + Feedback (5 min) por dupla
- Atividade 4 (30 min): Reflexão final — O que aprendeu? Como aplicaria em projeto real?

**Caso Real:** "Projeto E-commerce que evitou 200+ bugs em produção com suite de 500 testes (80% cobertura)"

**Checklist de Aprendizado:**
- [ ] Consigo planejar suite completa de testes
- [ ] Sei escolher estratégia apropriada (U vs I vs E2E)
- [ ] Consigo implementar e documentar testes profissionalmente
- [ ] Entendo métricas e trade-offs de projeto
- [ ] Consigo comunicar resultados e recomendações

**Atividades Práticas:**
- Execução completa de projeto de teste
- Elaboração de documentação profissional
- Apresentação de resultados
- Discussão e feedback do grupo

---

## 6. METODOLOGIA DE ENSINO

### 6.1 Estratégias Pedagógicas

- **Aula Expositiva Dialogada:** Apresentação de conceitos com exemplos práticos e discussão com alunos
- **Live Coding:** Demonstração ao vivo de escrita de testes pelo professor
- **Aprendizagem Ativa:** Exercícios práticos a cada bloco, alternando com teoria
- **Aprendizagem Baseada em Projeto:** Mini-projetos progressivos evoluindo em complexidade
- **Peer Learning:** Code review entre alunos e pair programming
- **Estudo de Caso:** Análise de projetos reais e decisões de arquitetura de testes
- **Reflexão Crítica:** Discussões sobre tradeoffs e decisões de design

### 6.2 Recursos Didáticos

- Apresentações em slides (PDF)
- Guias de laboratório com passo-a-passo
- Banco de exercícios com soluções comentadas
- Referências rápidas (cheat sheets) em papel e digital
- Exemplos de código em repositório GitHub
- Vídeos tutoriais (playlists curtas)
- Documentação oficial das ferramentas

### 6.3 Ambiente de Aprendizagem

- Laboratório de Informática com ≥15 computadores
- Conectividade Internet estável
- Projetor e tela para demonstrações
- Quadro branco para sketching
- Acesso a IDE (VS Code ou equivalente)
- Repositório Git compartilhado

### 6.4 Diferenciação

- **Alunos Avançados:** Desafios extras (testes com frameworks como React, TypeScript, testes visuais)
- **Alunos em Dificuldade:** Suporte individualizado, exercícios simplificados, tutoria
- **Flexibilidade:** Ritmo adaptado conforme progresso do grupo

---

## 7. AVALIAÇÃO

### 7.1 Avaliação Contínua (Formativa)

**Ao longo das 8 aulas regulares:**

| Instrumento | Peso | Detalhes |
|---|---:|---|
| Exercícios Práticos | 30% | 1-2 exercícios por bloco, avaliados por funcionalidade e qualidade |
| Participação em Laboratório | 10% | Observação de engajamento, perguntas, colaboração |
| Code Reviews entre Pares | 10% | Revisão crítica de código de colegas |
| Quiz/Discussões | 10% | Verificação conceitual, discussões de boas práticas |

**Subtotal Contínuo: 60%**

### 7.2 Avaliação Somativa (Certificação)

**Aula 10 — Avaliações Finais (8 horas):**

#### 7.2.1 Avaliação Prática — 4 horas (Peso: 25%)

**Objetivo:** Demonstrar competência prática escrevendo suite completa de testes

**Formato:**
- Projeto com aplicação frontend fornecida (dashboard ou similar)
- Aluno deve criar:
  - Testes unitários para funções/módulos
  - Testes de integração com interação de usuário
  - Testes E2E para fluxos principais
- Meta: ≥ 70% cobertura de testes

**Critérios de Aceitação:**
- ✅ Testes unitários: ≥ 5 casos cobrindo happy path e edge cases
- ✅ Testes de integração: validação de comportamento completo
- ✅ Testes E2E: ≥ 3 cenários de fluxo de usuário
- ✅ Cobertura de código: ≥ 70%
- ✅ Código limpo: sem duplicação, bem-estruturado, bem-nomeado
- ✅ Execução em CI/CD: funcional e automatizado

**Instrumentos de Avaliação:**
- Projeto entregue no repositório Git
- Relatório de cobertura (saída do coverage reporter)
- Documentação de estratégia de testes
- Execução bem-sucedida de todos os testes

#### 7.2.2 Avaliação Teórica Objetiva — 4 horas (Peso: 15%)

**Objetivo:** Verificar conhecimento conceitual e teórico de testes de frontend

**Formato:**
- Prova objetiva com 40-50 questões
- Múltipla escolha, verdadeiro/falso, correlação, cenários
- Tempo: 4 horas (aproximadamente 5-6 minutos por questão)

**Tópicos Cobertos:**
- Tipos e pirâmide de testes (Bloco 01) — 8 questões
- Configuração de ferramentas (Bloco 02) — 6 questões
- Testes unitários: estrutura e matchers (Bloco 03) — 8 questões
- Testes de integração: DOM e mocks (Bloco 04) — 8 questões
- Testes E2E: seletores e padrões (Bloco 05) — 8 questões
- Performance e acessibilidade (Bloco 06) — 4 questões
- CI/CD e automação (Bloco 07) — 4 questões
- Boas práticas (Bloco 08) — 4 questões

**Critérios de Aprovação:**
- Mínimo de 60% de acerto para aprovação (24/40 questões)
- Algumas questões podem ter múltiplas respostas corretas
- Questões com justificativa pesam mais em caso de recurso

**Instrumentos:**
- Prova impressa ou plataforma digital
- Gabarito comentado com referências
- Revisão individualizada de resultados

---

## 8. CÁLCULO FINAL DE NOTAS

```
Nota Final = (Avaliação Contínua × 0,60) + (Avaliação Prática × 0,25) + (Avaliação Teórica × 0,15)

Aprovação: Nota Final ≥ 6,0
Recuperação: Oportunidade de refazer Avaliação Prática e/ou Teórica
```

### 8.1 Relatório de Competências

Independente da nota numérica, aluno receberá relatório descritivo por competência:

- ✅ **Desenvolvida** — Aluno demonstra domínio claro
- 🟡 **Em Desenvolvimento** — Aluno está no caminho certo, com apoio
- ⚠️ **Não Desenvolvida** — Aluno necessita reforço ou reavalição

---

## 9. REFERÊNCIAS BIBLIOGRÁFICAS

### 9.1 Livros

1. **Dodds, Kent C.** *Testing JavaScript* — Learn to test JavaScript applications. Kent C. Dodds (2021)
2. **Feathers, Michael C.** *Working Effectively with Legacy Code* — Prentice Hall (2004)
3. **Osmani, Addy.** *Learning JavaScript Design Patterns* — O'Reilly (2012)

### 9.2 Documentação Oficial

- [Vitest Documentation](https://vitest.dev) — Framework de testes
- [Playwright Documentation](https://playwright.dev) — Automação E2E
- [DOM Testing Library](https://testing-library.com) — Testes de integração
- [GitHub Actions Documentation](https://docs.github.com/en/actions) — CI/CD
- [MDN Web Docs](https://developer.mozilla.org) — Referência JavaScript

### 9.3 Recursos Educacionais Online

- "Testing Principles" — Uncle Bob (Clean Code), YouTube
- "JavaScript Testing Best Practices" — GitHub Repository
- "WCAG 2.1 Guidelines" — W3C (https://www.w3.org/WAI/WCAG21)
- "Core Web Vitals Guide" — Google Developers

### 9.4 Comunidades e Fóruns

- Stack Overflow: tags `vitest`, `playwright`, `testing-library`, `javascript`
- Dev.to: artigos sobre testes em JavaScript
- GitHub Discussions: comunidades de ferramentas
- Testing JavaScript Community Slack

---

## 10. QUADRO RESUMO DE CARGA HORÁRIA

| # | Bloco | Tema | Carga Horária | Aulas |
|---|---|---|---:|---|
| 01 | Fundamentos | Tipos, TDD, Ferramentas | 4h | 01 |
| 02 | Configuração | Setup Node.js, Vitest | 4h | 02 |
| 03 | Testes Unitários | Vitest, matchers, mocking | 8h | 03-04 |
| 04 | Integração | DOM Testing, APIs mockadas | 8h | 05-06 |
| 05 | E2E | Playwright, Page Object | 8h | 07-08 |
| 06 | Performance & A11y | Lighthouse, axe-core | 4h | 09 (parte 1) |
| 07 | CI/CD | GitHub Actions, workflows | 4h | 09 (parte 2) |
| 08 | Boas Práticas | Code review, documentação | 4h | 10 (parte 1) |
| — | **Avaliações** | Prática + Teórica | **8h** | **10 (parte 2)** |
| — | **TOTAL** | | **40h** | |

---

## 11. CORRELAÇÃO COM MATRIZ CURRICULAR

Esta disciplina **Testes de Frontend** é parte do **2º Semestre** (Período II) do curso Técnico em Informática para Internet, e se relaciona com:

- **Pré-requisito:** Codificação para Front-End (100h, 2º semestre)
- **Pré-requisito:** Lógica de Programação (128h, 1º semestre)
- **Correlação:** Interação com APIs (40h, 2º semestre)
- **Correlação:** Projeto de Front-End (90h, 2º semestre)

---

## 12. OBSERVAÇÕES IMPORTANTES

### 12.1 Expectativas de Aprendizagem

- Alunos devem estar familiarizados com JavaScript e HTML/CSS
- Conhecimento de Git e GitHub é fundamental
- Acesso a computador com capacidade de executar Node.js (≥ 8GB RAM)
- Disposição para aprender ferramentas novas e resolver problemas

### 12.2 Acessibilidade

- Laboratório está equipado com acessibilidade arquitetônica
- Materiais fornecidos em formatos digitais acessíveis (PDF com tags)
- Suporte adicional para alunos com deficiências visuais, auditivas ou motoras
- Ambiente de desenvolvimento pode ser adaptado conforme necessidade

### 12.3 Integração com Mercado de Trabalho

Profissionais que completam esta disciplina com aprovação estão preparados para:
- Posições de QA Automatizado Junior
- Desenvolvedor Frontend com foco em qualidade
- Especialista em testes de UI/UX
- Posições em startups e empresas de tecnologia que adotam TDD/BDD

---

## 13. APROVAÇÃO E ASSINATURA

| Informação | Data |
|---|---|
| Documento Criado | 31/08/2026 |
| Versão | 1.0 (Oficial) |
| Válido a Partir de | 01/09/2026 |
| Próxima Revisão | Junho 2027 |

---

## 14. NOTAS DO PROFESSOR

- Esta ementa foi estruturada com foco em **JavaScript Vanilla** e **Playwright**, alinhado ao stack do projeto professor-senai
- Flexibilidade para adaptações conforme feedback de alunos e evolução das ferramentas
- Incentivo a contribuições da comunidade e sugestões de melhorias
- Disponibilidade para tutoria adicional em horários agendados

---

**Documento: EMENTA-TESTES-FRONT-END.md**  
*Unidade Curricular: Testes de Frontend | Curso: Técnico em Informática para Internet | SENAI*

*Esta ementa é documento oficial e deve ser disponibilizado a todos os alunos no primeiro dia de aula.*
