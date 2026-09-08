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

### Bloco 01: Fundamentos de Testes — Autogestão e Automação (4 horas)

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

**Competências Praticadas:** Planejamento, responsabilidade, reconhecimento de tipos de teste

**Atividade Principal:** Análise de documentação de testes e identificação de tipos apropriados

---

### Bloco 02: Conceitos Fundamentais e Planejamento de Testes (4 horas)

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

**Competências Praticadas:** Leitura de requisitos, planejamento, documentação

**Atividade Principal:** Elaboração de plano de testes e casos de teste para interface web

---

### Bloco 03: Processo Fundamental de Teste — Planejamento e Design (8 horas)

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

**Competências Praticadas:** Planejamento sistemático, execução, documentação, controle

**Atividades Práticas:**
- Criação de plano detalhado de testes para componente web
- Execução prática de testes conforme planejado
- Análise de resultados e elaboração de relatório
- Discussão em grupo sobre qualidade e cobertura

---

### Bloco 04: Execução de Testes de Interface (8 horas)

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

**Competências Praticadas:** Execução de testes, documentação de resultados, análise crítica

**Atividades Práticas:**
- Execução de planos de teste preparados
- Preenchimento de relatórios de teste
- Documentação de erros encontrados
- Discussão de resultados em grupo

---

### Bloco 05: Automação e Otimização de Testes (8 horas)

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

**Competências Praticadas:** Automação, monitoramento, controle de qualidade

**Atividades Práticas:**
- Setup de ambiente de automação
- Criação de scripts de teste automatizados
- Execução e monitoramento de testes
- Análise de métricas e cobertura

---

### Bloco 06: Documentação e Relatórios de Teste (4 horas)

**Tópicos Oficiais:**
- **Documentação de Testes (Capacidades Técnicas):**
  - Elaboração de planos de teste formais
  - Documentação de casos de teste
  - Especificação de requisitos de teste
- **Avaliação dos Resultados (7.5):**
  - Análise de resultados de execução
  - Conclusões sobre qualidade
  - Relatórios de teste
- **Metadados de Teste:**
  - Rastreabilidade de requisitos vs. testes
  - Histórico de execução
  - Evidências de teste

**Competências Praticadas:** Documentação formal, relatórios técnicos, rastreabilidade

**Atividades Práticas:**
- Elaboração de plano de testes completo
- Preenchimento de relatório de execução
- Criação de sumário executivo de qualidade
- Apresentação de resultados

---

### Bloco 07: Métodos, Normas e Correção de Defeitos (4 horas)

**Tópicos Oficiais:**
- **Métodos, Normas e Procedimentos (Capacidades Técnicas):**
  - Normas técnicas de teste
  - Procedimentos padronizados
  - Boas práticas da indústria
  - Ciclo de vida de defeitos
- **Correção e Implementação:**
  - Ciclo de correção de bugs
  - Verificação de correções
  - Retest após correção
  - Testes de regressão
- **Melhoria Contínua:**
  - Lições aprendidas
  - Otimização de processos
  - Feedback para desenvolvimento

**Competências Praticadas:** Procedimentos formais, gestão de defeitos, qualidade

**Atividades Práticas:**
- Aplicação de procedimentos padronizados
- Gestão de ciclo de defeitos
- Execução de testes de regressão
- Documentação de melhorias

---

### Bloco 08: Projeto Integrador e Avaliação Final (4 horas)

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

**Competências Praticadas:** Síntese, documentação, comunicação, trabalho em equipe

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
