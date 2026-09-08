# 🧪 EMENTA COMPLETA — Testes de Frontend
## Unidade Curricular: Testes de Frontend | Técnico em Informática para Internet | SENAI

---

## 📑 ÍNDICE

1. [Resumo Executivo](#resumo)
2. [Identificação da Disciplina](#id)
3. [Objetivos Geral e Específicos](#obj)
4. [Competências a Desenvolver](#comp)
5. [Os 10 Blocos de Aprendizagem](#blocos)
6. [Mapas Conceptuais e Diagramas](#mapas)
7. [Matriz de Competências](#matriz)
8. [Casos Reais de Aplicação](#casos)
9. [Próximos Passos](#proximos)

---

## 📌 RESUMO EXECUTIVO {#resumo}

**Testes de Frontend** é uma unidade curricular de **40 horas** integrada ao **2º Semestre** do curso Técnico em Informática para Internet, estruturada em modalidade teórico-prática. A disciplina capacita alunos a planejar, executar e garantir a qualidade de interfaces web através de testes automatizados, utilizando ferramentas modernas e metodologias consolidadas da indústria de tecnologia.

Ao concluir esta disciplina, os alunos estarão preparados para profissões em QA Automatizado, Desenvolvedor Frontend com foco em qualidade, ou Especialista em Testes de UI/UX. A carga horária distribui-se em 8 aulas de 4-5 horas cada, culminando em avaliação prática com projeto capstone e avaliação teórica de 4 horas.

---

## 🏛️ IDENTIFICAÇÃO DA DISCIPLINA {#id}

| Informação | Detalhes |
|---|---|
| **Unidade Curricular** | Testes de Frontend |
| **Curso** | Técnico em Informática para Internet |
| **Módulo** | ESPECÍFICO I |
| **Carga Horária Total** | 40 horas |
| **Período de Oferta** | 2º Semestre |
| **Modalidade** | Teórico-Prática |
| **Pré-requisitos Obrigatórios** | Codificação para Front-End, Lógica de Programação |
| **Código da Disciplina** | TEC-INFO-TESTE-FE |
| **Público-Alvo** | Alunos com conhecimento em JavaScript, HTML/CSS e Git |

---

## 🎯 OBJETIVOS {#obj}

### Objetivo Geral

Propiciar desenvolvimento de capacidades básicas e socioemocionais para **planejar, executar e garantir a qualidade de interfaces para aplicações web**, por meio de testes funcionais, automação, validação de requisitos e aplicação de métodos, normas e procedimentos de teste para correção e implementação de software.

### Objetivos Específicos

Ao final desta disciplina, o aluno será capaz de:

1. Diferenciar tipos de testes (unitário, integração, E2E) e compreender sua aplicação na pirâmide de testes
2. Configurar ambiente de desenvolvimento com Node.js, npm e ferramentas de teste automatizado
3. Escrever testes unitários em JavaScript utilizando Vitest com padrão AAA (Arrange-Act-Assert)
4. Implementar testes de integração validando comportamento de componentes e interações com APIs
5. Automatizar testes end-to-end com Playwright, aplicando padrão Page Object Model
6. Avaliar performance de aplicações web utilizando Core Web Vitals e Lighthouse
7. Validar acessibilidade de interfaces conforme padrões WCAG 2.1
8. Configurar pipelines de integração contínua (CI/CD) com GitHub Actions
9. Aplicar boas práticas na escrita de testes e estruturação de suites de teste
10. Desenvolver projeto integrador com suite completa de testes em aplicação frontend

---

## 💡 COMPETÊNCIAS A DESENVOLVER {#comp}

### Capacidades Técnicas

- Identificar tipos de testes aplicáveis por cenário de desenvolvimento
- Escrever testes unitários com Vitest para funções isoladas
- Estruturar testes de integração entre componentes
- Automatizar E2E com Playwright
- Configurar CI/CD com testes automatizados
- Interpretar relatórios de cobertura e gaps
- Medir performance (Core Web Vitals, LCP, FID, CLS)
- Validar acessibilidade conforme WCAG 2.1
- Documentar estratégias de teste e resultados

### Capacidades Básicas

- Compreender ciclo de vida do desenvolvimento orientado por testes (TDD/BDD)
- Dominar ambiente de desenvolvimento com Node.js, npm e ferramentas de teste
- Ler e escrever código JavaScript funcional e testável
- Usar sistemas de controle de versão (Git) durante ciclos de teste
- Trabalhar em equipes ágeis com práticas de QA contínua
- Entender conceitos fundamentais de mock, spy e stub em testes
- Aplicar padrões de design em testes (Page Object Model, Factory)

### Capacidades Socioemocionais

- Responsabilidade e comprometimento com a qualidade do software
- Atenção ao detalhe e pensamento crítico na validação de funcionalidades
- Colaboração efetiva em code reviews e discussões técnicas
- Persistência na resolução de problemas complexos e testes intermitentes
- Comunicação clara de resultados de testes e bugs encontrados
- Autoaprendizagem contínua em novas ferramentas e frameworks de teste
- Empatia com usuários finais (foco em acessibilidade e performance)

---

## 🏗️ OS 10 BLOCOS DE APRENDIZAGEM {#blocos}

### **BLOCO 01** — Fundamentos de Testes e Autogestão (4-5 horas)

**Tema Central:** Tipos de teste, pirâmide de testes, STLC, autogestão e automação

Alunos aprendem a diferenciar testes unitários (funções isoladas, <100ms), testes de integração (múltiplos componentes, 100ms-1s) e testes E2E (fluxo completo de usuário, 5s+). Proporção ideal: 60% unitário, 30% integração, 10% E2E. Técnicas: caixa branca (estrutural) vs caixa preta (funcional). STLC tem 5 fases: planejamento, design, execução, monitoração, avaliação. **Atividades Práticas:** Classificar 10 cenários de teste em tipos apropriados, desenhar pirâmide de testes para 2 projetos reais diferentes, discussão de custos e impactos de bugs encontrados em diferentes estágios.

---

### **BLOCO 02** — Conceitos Fundamentais e Planejamento (4-5 horas)

**Tema Central:** Verificação vs validação, especificações técnicas, plano de testes, casos de teste

Verificação = "Desenvolvido corretamente?" (responsabilidade Dev). Validação = "Produto correto?" (responsabilidade QA). Plano de testes inclui: informações gerais, escopo, estratégia, casos de teste (TC-001 até TC-XXX), métricas, riscos. Formato de caso: ID, título, pré-requisitos, passos, resultado esperado. Rastreabilidade entre requisitos e testes. **Atividades Práticas:** Escrever 3 casos de teste em formato padrão ISO, criar plano completo para feature "Carrinho de Compras", refinar requisitos vagos em critérios de aceitação BDD (Given/When/Then).

---

### **BLOCO 03** — Vitest: Testes Unitários (8 horas)

**Tema Central:** Framework de testes, matchers, mocks, spies, coverage

Vitest é framework moderno para testes unitários em JavaScript. Instalação: npm init, npm install vitest. Sintaxe: describe() agrupa testes, it()/test() define teste individual, expect() realiza assertions. Matchers principais: toBe(), toEqual(), toBeNull(), toBeDefined(), toBeGreaterThan(), toContain(). Mocks: vi.fn() cria função mockada, vi.spyOn() espia método existente, verificar chamadas com toHaveBeenCalled(). **Atividades Práticas:** Escrever 5 testes de funções simples até complexas com diferentes matchers, implementar mocks e spies em teste integrado, interpretar relatório de coverage (line, branch, function, statement).

---

### **BLOCO 04** — Testing Library: Testes de Integração com DOM (8 horas)

**Tema Central:** Testes de componentes, interações realistas, acessibilidade

Testing Library foca em testar **comportamento do usuário**, não implementação. Queries principais: getByRole() busca elementos por role ARIA, getByLabelText() para inputs com label, getByPlaceholderText() para inputs sem label, getByTestId() como último recurso. Diferenças entre getBy (erro se não encontra), queryBy (null se não encontra), findBy (combina getBy + waitFor para async). Acessibilidade automática via getByRole(). **Atividades Práticas:** Testar componente Button com múltiplos estados, testar formulário com validação em tempo real, testar lista dinâmica com filtro.

---

### **BLOCO 05** — Testes de Integração Avançados (8 horas)

**Tema Central:** Múltiplos componentes, APIs mockadas, estados compartilhados

Testa fluxos que envolvem múltiplos componentes interagindo, APIs externas, estados compartilhados (Context API, Redux, localStorage). Mock Service Worker (MSW) intercepta requisições HTTP realistically. Aborda race conditions e testes assíncronos complexos com múltiplos usuários interagindo simultaneamente. Padrão: given-when-then. **Atividades Práticas:** Testar fluxo completo de autenticação com API mockada, testar persistência de dados em localStorage, testar integração entre múltiplos componentes com estado compartilhado.

---

### **BLOCO 06** — Cypress: Testes End-to-End (8 horas)

**Tema Central:** Automação de fluxos completos, time-travel debugging

Cypress simula navegador real completo, permite time-travel debugging (voltar no tempo para ver o que aconteceu), captura screenshots/vídeos de falhas automaticamente. Seletores: cy.visit() navega URL, cy.get() seleciona elemento, cy.contains() busca por texto. Interações: cy.click(), cy.type(), cy.submit(). Assertions: cy.should() valida estado, expect() assertions diretas. **Atividades Práticas:** Testar fluxo E2E de login com múltiplas validações, automatizar checkout completo, testar navegação entre múltiplas páginas.

---

### **BLOCO 07** — Cobertura de Testes (4 horas)

**Tema Central:** Métricas de qualidade, leitura de relatórios, trade-offs

Cobertura é ferramenta, não meta. 4 tipos: Line Coverage (% linhas executadas), Branch Coverage (% branches if/else testados), Function Coverage (% funções chamadas), Statement Coverage (% statements executados). Meta realista: 70% é ótima, 85-90% é excelente, 100% tem ROI negativo. Relatório Istanbul (HTML interativo). CodeCov para badges GitHub. **Atividades Práticas:** Ler relatório de coverage com múltiplos arquivos, identificar gaps de cobertura, aumentar coverage de 60% para 85% através de testes estratégicos.

---

### **BLOCO 08** — Debugging e Test-Driven Development (4 horas)

**Tema Central:** TDD, ciclo Red-Green-Refactor, debugging

Red: escrever teste que falha (teste descreve requisito). Green: escrever código mínimo que passa (quick and dirty ok). Refactor: melhorar código mantendo testes passando (refactoring seguro). Garante código testável por design. Debugging: breakpoints VS Code, console.log estratégico, isolated vs integrated testing, time-travel debugging no Cypress. **Atividades Práticas:** Aplicar ciclo Red-Green-Refactor para validador de CPF, desenvolver feature completa usando TDD, discussão sobre trade-offs de investimento inicial em TDD.

---

### **BLOCO 09** — Qualidade, Performance e CI/CD (4 horas)

**Tema Central:** Métricas de qualidade, otimização, automação contínua

Métricas: Defect Density (bugs/1000 linhas, meta <2%), Test Effectiveness (bugs encontrados antes testes), Pass Rate (% testes passando, meta 100%), Flakiness Rate (% intermitentes, meta <1%). GitHub Actions: workflow que roda testes em PR, bloqueia merge se falharem, relatório cobertura automático. Badges de status no README. **Atividades Práticas:** Otimizar testes lentos (paralelização, lazy loading), implementar CI/CD completo com GitHub Actions, adicionar badges de cobertura e status ao README, criar checklist de code review com requisitos de testes.

---

### **BLOCO 10** — Projeto Final (8 horas)

**Tema:** Integração, documentação, apresentação

Projeto: **E-commerce com suite completa de testes**. Meta: ≥80% cobertura. Estrutura: src/, test/, cypress/e2e/, .github/workflows/, vitest.config.js, cypress.config.js, README.md. Documentação: plano, coverage, lições. Apresentação em duplas (10 min).

---

## 🗺️ MAPAS CONCEPTUAIS {#mapas}

### Progressão nos 10 Blocos
```
01: FUNDAMENTOS → 02: PLANEJAMENTO → 03: UNITÁRIO
→ 04-05: INTEGRAÇÃO → 06: E2E → 07: COBERTURA
→ 08: TDD → 09: CI/CD → 10: PROJETO FINAL
```

### Decidindo Qual Teste Usar
```
Precisa testar?
├─ Função isolada? → UNITÁRIO (Vitest, <100ms)
├─ Componente + interação? → INTEGRAÇÃO (Testing Library, 100ms-1s)
└─ Fluxo completo usuário? → E2E (Cypress, 5s+)
```

### Ciclo STLC (Software Testing Life Cycle)
```
PLANEJAMENTO (1h) → DESIGN (2h) → EXECUÇÃO (3h)
→ MONITORAÇÃO (30min) → AVALIAÇÃO (30min)
→ PRÓXIMA ITERAÇÃO (ou conclusão)
```

---

## 📊 MATRIZ DE COMPETÊNCIAS {#matriz}

| Competência | B01 | B03 | B04 | B06 | B09 |
|---|:---:|:---:|:---:|:---:|:---:|
| Tipos de teste (U/I/E2E) | ✅ | ⚙️ | ⚙️ | ✅ | ⚙️ |
| Vitest (testes unitários) | - | ✅ | - | - | ⚙️ |
| Testing Library (integração) | - | - | ✅ | ⚙️ | ✅ |
| Cypress/Playwright (E2E) | - | - | ⚙️ | ✅ | ✅ |
| Mocks e Spies | - | ✅ | ✅ | ⚙️ | - |
| MSW (Mock de APIs) | - | - | ✅ | ⚙️ | ✅ |
| Cobertura de testes | ⚙️ | ✅ | - | - | ✅ |
| GitHub Actions | - | - | - | - | ✅ |
| TDD (Red-Green-Refactor) | ⚙️ | ⚙️ | ⚙️ | - | - |
| Acessibilidade (WCAG) | - | - | ✅ | ⚙️ | - |

**Legenda:** ✅ = Foco principal | ⚙️ = Aplicação prática | - = Não abordado

---

## 💼 CASOS REAIS DE APLICAÇÃO {#casos}

### Stripe (Processamento de Pagamentos)
10.000+ testes estruturados: 70% unitário, 25% integração, 5% E2E. Resultado: <1 bug crítico por release, confiança para deploy 10x/dia sem risco de falhas críticas.

### Airbnb (Plataforma de Hospedagem)
Problema: Pirâmide invertida (80% E2E). Suite demorava 6h, 35% flakiness, 200+ bugs/release. Solução: Rebalancear para 60%-30%-10%. Resultado: 12min, <2% flakiness, <10 bugs/release.

### Shopify (E-commerce SaaS)
Incidente: Race condition Black Friday (2h offline, -$500K vendas). Solução: Testes integração com concorrência simulada. Resultado: 5+ anos sem race condition em produção.

---

## 🚀 PRÓXIMOS PASSOS {#proximos}

### Especialização Recomendada Pós-Disciplina

**QA Automatizado:** Selenium para múltiplos browsers, Page Object Model, testes visuais (Percy, Chromatic), BDD com Gherkin.

**Performance:** Lighthouse API, Web Vitals monitoring, bundle size analysis, profiling, otimização.

**Acessibilidade:** WCAG 2.1, axe-core, Pa11y, keyboard navigation, screen reader testing.

### Recursos Recomendados
- **Vitest:** https://vitest.dev — Framework moderno de testes unitários
- **Testing Library:** https://testing-library.com — Melhor prática para testes de integração
- **Playwright:** https://playwright.dev — Alternativa a Cypress para E2E
- **GitHub Actions:** https://docs.github.com/en/actions — CI/CD nativo no GitHub
- **WCAG 2.1:** https://www.w3.org/WAI/WCAG21 — Padrão internacional de acessibilidade

### Portfolio Profissional Sugerido
1. Suite completa em projeto real (U/I/E2E)
2. CI/CD com GitHub Actions e relatórios
3. Coverage ≥70% com histórico
4. README com instruções
5. Documentação de estratégia

---

**Documento:** EMENTA-CHALKIE-AI.md | **Versão:** 2.0 Final | **Data:** 08/09/2026 | **Status:** ✅ Completo
