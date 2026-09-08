# Plano de Aulas — Testes de Frontend

> Documento para estruturação de conteúdo pedagógico
> Unidade Curricular: **Testes de Frontend**
> Carga Horária Total: **40 horas**
> Formato: 10 aulas de 4 horas (8 regulares + 2 avaliações)

---

## 1. Identificação do Plano de Aulas

| Campo | Informação |
|---|---|
| Unidade Curricular | Testes de Frontend |
| Curso | Técnico de Informática para Internet |
| Carga Horária Total | 40 horas |
| Número de Aulas | 10 (sendo 8 regulares + 2 avaliações) |
| Formato de Aula | 4 horas cada |
| Modalidade | Teórico-prática em laboratório |

---

## 2. Objetivo Geral da Unidade Curricular

Capacitar profissionais de tecnologia da informação a **planejar, executar e automatizar testes de aplicações frontend**, utilizando metodologias modernas, ferramentas especializadas e boas práticas da indústria, visando garantir qualidade, usabilidade e confiabilidade de interfaces web e progressivas.

---

## 3. Competências a Serem Desenvolvidas

### 3.1 Capacidades Técnicas
- Identificar tipos de testes aplicáveis a diferentes camadas do frontend
- Escrever testes unitários para funções JavaScript isoladas
- Estruturar e executar testes de integração entre componentes
- Automatizar testes end-to-end (E2E) simulando interações reais de usuários
- Configurar pipelines de CI/CD com testes automatizados
- Interpretar relatórios de cobertura de testes e identificar gaps

### 3.2 Capacidades Básicas
- Compreender ciclo de vida do desenvolvimento orientado por testes (TDD)
- Dominar ambiente de desenvolvimento com Node.js e ferramentas de teste
- Ler e escrever código JavaScript funcional e testável
- Usar sistemas de controle de versão (Git) durante ciclos de teste
- Trabalhar em equipes ágeis com práticas de QA contínua

### 3.3 Capacidades Socioemocionais
- Responsabilidade com qualidade do software
- Atenção ao detalhe e pensamento crítico
- Colaboração em code reviews e discussões técnicas
- Persistência na resolução de problemas complexos
- Comunicação clara de resultados de testes e bugs encontrados

---

## 4. Situação de Aprendizagem — Desafio Central

### 4.1 Contexto
A indústria de desenvolvimento web enfrenta desafio crescente de manter qualidade enquanto entrega funcionalidades rapidamente. Testes automatizados são essenciais para reduzir bugs em produção, diminuir custo de manutenção e aumentar confiança em lançamentos.

Frontend é camada crítica: erros afetam experiência do usuário diretamente. Profissionais que dominam testes de frontend são altamente valorizados no mercado.

### 4.2 Desafio Principal
**"Desenvolver suite completa de testes para um dashboard interativo, cobrindo múltiplas camadas (unitário, integração, E2E), configurar automação em CI/CD e apresentar relatório de qualidade."**

### 4.3 Resultados Esperados
1. Projeto prático com testes unitários, de integração e E2E
2. Pipeline de CI/CD funcional com testes automatizados
3. Relatório de cobertura de testes ≥ 80%
4. Documentação de estratégia de testes

---

## 5. Estrutura de Blocos Temáticos e Plano de Aulas

### 5.1 Bloco 01 — Fundamentos de Testes de Software

**Carga horária:** 4 horas | **Aula 01**

#### Capacidades a Serem Trabalhadas
- Diferenciar tipos de testes (unitário, integração, E2E, regressão, performance)
- Compreender ciclo de vida de testes (STLC)
- Reconhecer benefícios de automação vs. testes manuais
- Entender princípios de desenvolvimento orientado por testes (TDD/BDD)
- Identificar métricas de qualidade (cobertura, taxa de falha)

#### Conhecimentos Relacionados
- Pirâmide de testes (proporção ideal de cada tipo)
- Metodologias: Waterfall, Agile, DevOps
- Fases: planejamento, design, execução, reporte
- Conceitos: cobertura de código, falha positiva, regressão
- Ferramentas landscape: Jest, Vitest, Cypress, Playwright
- Relatórios e métricas (Istanbul/NYC, code coverage)

#### Estratégias de Ensino
- Aula expositiva dialogada com exemplos de projeto real
- Estudo de caso: análise de pirâmide de testes em projeto de sucesso
- Comparação entre testes manuais e automatizados (vídeo demonstração)
- Discussão em grupo: "Que testes faltariam neste código?"
- Introdução prática ao ambiente de laboratório

#### Recursos
- Sala de aula + Laboratório de Informática
- Projetor/slides
- Vídeos de referência (demonstração de ferramentas)
- Exemplos de código GitHub
- Computadores com Node.js pré-instalado

#### Critérios de Avaliação
- Classifica corretamente os tipos de testes para diferentes cenários
- Explica o porquê de cada tipo na pirâmide
- Reconhece benefícios mensuráveis de testes automatizados
- Diferencia TDD de desenvolvimento tradicional

#### Instrumentos
- Quiz interativo (10 questões, 5 minutos)
- Discussão e anotações de conclusões do estudo de caso
- Checklist de conhecimentos-chave

---

### 5.2 Bloco 02 — Configuração de Ambiente e Ferramentas

**Carga horária:** 4 horas | **Aula 02**

#### Capacidades a Serem Trabalhadas
- Instalar e configurar Node.js, npm e gerenciadores de pacotes
- Inicializar projeto com package.json
- Instalar e configurar Vitest para testes unitários
- Entender estrutura de projetos testáveis
- Dominar linha de comando para execução de testes

#### Conhecimentos Relacionados
- Node.js, npm, yarn (gerenciamento de dependências)
- package.json: scripts, dependências dev vs. prod
- Estrutura ideal de diretórios para testes
- Configuração de .gitignore, .eslintrc
- Vitest: configuração, plugins, reporters
- Conceito de mock e stub (introdução)

#### Estratégias de Ensino
- Hands-on: cada aluno configura seu próprio projeto do zero
- Demonstração ao vivo do processo de setup
- Troubleshooting colaborativo de erros comuns
- Criação de template reutilizável para futuros projetos
- Prática com terminal e comandos npm

#### Recursos
- Laboratório de Informática
- Documentação oficial (vitest.dev, nodejs.org)
- Script de setup automatizado (opcional, para economia de tempo)
- Guia passo-a-passo impresso ou digital

#### Critérios de Avaliação
- Cria projeto novo com package.json correto
- Instala Vitest e dependências sem erros
- Executa comando de teste com sucesso
- Entende e modifica configuração de Vitest

#### Instrumentos
- Projeto funcional criado pelo aluno
- Screenshot/evidência de teste passando
- Checklist de configurações obrigatórias

---

### 5.3 Bloco 03 — Testes Unitários em JavaScript

**Carga horária:** 8 horas | **Aulas 03-04**

#### Capacidades a Serem Trabalhadas
- Escrever testes unitários com Vitest
- Estruturar testes com arrange-act-assert (AAA)
- Usar assertions e matchers corretamente
- Aplicar conceitos de mock, spy e stub
- Testar funções puras, async e callbacks
- Reconhecer código não-testável e refatorar

#### Conhecimentos Relacionados
- Estrutura de teste (describe, it, test)
- Matchers: toBe, toEqual, toContain, toThrow, etc.
- Fixtures e setup/teardown (beforeEach, afterEach)
- Mocking: vi.mock(), vi.fn(), vi.spyOn()
- Testes de funções assíncronas (async/await)
- Testes de erros e exceções
- Código testável vs. código acoplado

#### Estratégias de Ensino
- Apresentação de padrão AAA com exemplos visuais
- Live coding: professor escreve e executa testes ao vivo
- Exercícios progressivos: simples → complexo
- Pair programming: duplas escrevem testes juntas
- Refactoring colaborativo: melhorar código para torná-lo testável
- Análise de código real de projeto aberto (ex: biblioteca npm)

#### Recursos
- Laboratório de Informática
- Apresentação com diagramas AAA
- Banco de funções prontas para testar
- Exemplos de código testável e código ruim (comparativo)
- Referência rápida de matchers

#### Critérios de Avaliação
- Escreve testes que cobrem happy path e edge cases
- Usa matchers apropriados
- Implementa mocks quando necessário
- Testa funções assíncronas corretamente
- Código teste é legível e bem-estruturado

#### Instrumentos
- Exercícios práticos com 5-10 testes por aluno
- Revisão de código entre pares
- Relatório de cobertura (meta: ≥ 80% para código testado)
- Mini-projeto: suite de testes para pequena biblioteca

---

### 5.4 Bloco 04 — Testes de Integração

**Carga horária:** 8 horas | **Aulas 05-06**

#### Capacidades a Serem Trabalhadas
- Testar interação entre múltiplos módulos
- Usar DOM Testing Library para testar componentes HTML
- Simular eventos do usuário (cliques, input, drag-drop)
- Testar API calls com mocks de fetch/axios
- Validar comportamento completo de funcionalidade
- Usar snapshots com prudência

#### Conhecimentos Relacionados
- DOM Testing Library (queries, user events)
- JSDOM: simular ambiente do navegador
- Mocking de APIs (MSW - Mock Service Worker, vitest-mock-fetch)
- User events vs. fireEvent
- Testes de formulários
- Assertions assíncronas (waitFor, findBy)
- Snapshot testing: quando usar e quando evitar

#### Estratégias de Ensino
- Demonstração de componente real sendo testado
- Comparação: teste unitário vs. teste de integração (antes/depois)
- Exercício: converter testes unitários em integração
- Desafio: testar formulário com validação e submit
- Estudo de caso: teste de integração com API mockada
- Code review colaborativo de testes de integração

#### Recursos
- Laboratório de Informática
- Componentes HTML de exemplo prontos
- Documentação de DOM Testing Library
- Exemplos de APIs mockadas
- Ferramentas: MSW ou alternatives

#### Critérios de Avaliação
- Testa comportamento completo do componente
- Simula eventos de usuário corretamente
- Valida estado DOM após ação
- Integra mocking de API de forma funcional
- Evita testes muito frágeis (não depender de implementação)

#### Instrumentos
- Suite de testes para componentes funciona com múltiplas interações
- Teste de formulário com validação
- Teste de integração com chamada API mockada
- Relatório de cobertura (meta: ≥ 70%)

---

### 5.5 Bloco 05 — Testes End-to-End (E2E)

**Carga horária:** 8 horas | **Aulas 07-08**

#### Capacidades a Serem Trabalhadas
- Automatizar testes E2E com Playwright ou Cypress
- Escrever cenários de teste do ponto de vista do usuário
- Estruturar testes E2E em página object pattern
- Testar fluxo completo: navegação, interação, validação
- Configurar execução em múltiplos navegadores
- Gerar evidências de testes (screenshots, vídeos)
- Integrar E2E em CI/CD

#### Conhecimentos Relacionados
- Playwright vs. Cypress (comparativo)
- Seletores: CSS, XPath, data-testid
- Page Object Model (POM): padrão de design
- Waits: implicit, explicit, wait for element
- Screenshot e vídeo de teste
- Configuração de ci.yml para testes E2E
- Relatórios e integração com dashboard

#### Estratégias de Ensino
- Introdução ao Playwright com demo ao vivo
- Padrão Page Object: explicação + prática imediata
- Exercício: escrever 3-5 cenários de teste para aplicação
- Debugging de testes falhando (pause, slow motion)
- Executar testes em headless vs. headed
- Análise de falhando intermitente (flaky tests)

#### Recursos
- Laboratório de Informática
- Documentação de Playwright
- Aplicação web de teste (pode ser dashboard simples)
- Guia de POM (Page Object Model)
- Videos tutoriais de debugging

#### Critérios de Avaliação
- Escreve cenários de teste realistas e completos
- Implementa Page Object Model corretamente
- Testes passam consistentemente (não flaky)
- Captura evidências de falhas (screenshot)
- Testes E2E executam em CI/CD

#### Instrumentos
- Suite E2E com 5-10 cenários de teste
- Implementação de POM para aplicação
- Relatório de execução com screenshots
- Integração em GitHub Actions ou CI simples

---

### 5.6 Bloco 06 — Testes de Performance e Acessibilidade

**Carga horária:** 4 horas | **Aula 09 (parte 1)**

#### Capacidades a Serem Trabalhadas
- Medir performance (Core Web Vitals, LCP, FID, CLS)
- Testar acessibilidade (WCAG 2.1)
- Usar ferramentas: Lighthouse, axe-core
- Identificar gargalos de performance
- Validar conformidade com padrões de acessibilidade
- Documentar issues de performance/a11y

#### Conhecimentos Relacionados
- Core Web Vitals: Largest Contentful Paint (LCP), First Input Delay (FID), Cumulative Layout Shift (CLS)
- Métricas: Time to Interactive (TTI), First Contentful Paint (FCP)
- WCAG 2.1: níveis A, AA, AAA
- Testes de teclado e screen reader
- Lighthouse API e axe-core integration
- Performance budgets

#### Estratégias de Ensino
- Demo ao vivo: rodando Lighthouse em site real
- Exercício: identificar 5 problemas de acessibilidade em componente
- Análise: Como performance afeta usuários reais?
- Prática: integrar axe-core em teste E2E
- Discussão: tradeoffs entre performance e funcionalidade

#### Recursos
- Laboratório de Informática
- Ferramenta Lighthouse
- axe-core documentation
- Site com problemas conhecidos de a11y
- Screen reader (NVDA ou Narrator)

#### Critérios de Avaliação
- Identifica 3+ problemas de acessibilidade
- Usa Lighthouse para medir Core Web Vitals
- Compreende impacto de performance
- Sugere melhorias baseadas em dados

#### Instrumentos
- Relatório Lighthouse (antes/depois)
- Lista de issues de acessibilidade encontradas
- Recomendações de performance

---

### 5.7 Bloco 07 — Integração Contínua (CI/CD) e Automação

**Carga horária:** 4 horas | **Aula 09 (parte 2)**

#### Capacidades a Serem Trabalhadas
- Configurar pipeline CI/CD (GitHub Actions)
- Automatizar execução de testes em cada commit
- Reportar cobertura de testes
- Configurar branch protection com testes obrigatórios
- Integrar múltiplos tipos de teste em pipeline
- Monitorar saúde do projeto

#### Conhecimentos Relacionados
- GitHub Actions: workflow, jobs, steps
- .github/workflows/ci.yml
- Coverage reports e badges
- Branch protection rules
- Parallelização de testes
- Fail-fast strategy
- Notificações de falha

#### Estratégias de Ensino
- Demonstração ao vivo de CI/CD em ação
- Criar primeiro workflow em grupo
- Exercício: adicionar diferentes tipos de teste ao pipeline
- Debugging de workflow falhando
- Análise: como CI/CD muda ritmo de desenvolvimento

#### Recursos
- Repositório GitHub (ou alternativa)
- Documentação GitHub Actions
- Exemplo de workflow bem-estruturado
- Ferramenta de visualização de workflows

#### Critérios de Avaliação
- Workflow CI/CD é funcional
- Todos os tipos de teste são executados
- Cobertura é reportada
- Branch protection está ativo
- Documentação do workflow é clara

#### Instrumentos
- Arquivo ci.yml funcional e committed
- Evidência de pipeline passando
- Relatório de cobertura integrado
- Documentação de como executar testes localmente

---

### 5.8 Bloco 08 — Boas Práticas e Projeto Integrador

**Carga horária:** 4 horas | **Aula 10 (primeira parte)**

#### Capacidades a Serem Trabalhadas
- Aplicar boas práticas em escrita de testes
- Evitar armadilhas comuns (testes frágeis, lentos, flakey)
- Estruturar projeto de testes para manutenibilidade
- Documentar estratégia de testes
- Revisar testes de colegas
- Planejar cobertura de testes para novo projeto

#### Conhecimentos Relacionados
- DRY (Don't Repeat Yourself) em testes
- Nomes claros de testes (comportamento esperado)
- Testes independentes (sem dependência de ordem)
- Dado-Quando-Então (Given-When-Then)
- Fixtures e factories de dados
- Evitar private implementation details
- Documentação técnica de estratégia de testes

#### Estratégias de Ensino
- Palestra: "Testes que duram 5 anos"
- Code review em grupo: identificar problemas
- Checklist de qualidade de testes
- Refactoring de testes legados
- Discussão aberta: "Qual foi seu maior desafio em testes?"
- Planejamento colaborativo de teste para novo componente

#### Recursos
- Sala de aula
- Exemplos de testes bons e ruins (código)
- Checklist impresso
- Referência rápida (cartão)

#### Critérios de Avaliação
- Testes são legíveis e bem-nomeados
- Sem duplicação de código
- Independentes entre si
- Focam em comportamento, não implementação
- Documentação presente

#### Instrumentos
- Análise crítica de suite de testes existente
- Refactoring colaborativo
- Resumo escrito de boas práticas aprendidas

---

## 6. Avaliações

### 6.1 Avaliação Prática — 4 horas (Aula 09 final + Aula 10 final)

**Objetivo:** Demonstrar competência prática escrevendo suite completa de testes

**Formato:**
- Projeto com dashboard ou aplicação frontend fornecida
- Aluno deve criar: testes unitários, integração e E2E
- Meta: ≥ 70% cobertura de testes
- Tempo: 4 horas

**Critérios de Aceitação:**
- Testes unitários com ≥ 5 casos de teste
- Testes de integração com interação completa de usuário
- Testes E2E (≥ 3 cenários de fluxo)
- Cobertura ≥ 70%
- Código limpo e bem-estruturado
- Funciona em CI/CD

**Instrumentos:**
- Projeto entregue no repositório GitHub
- Relatório de cobertura
- Documentação de estratégia de testes

---

### 6.2 Avaliação Teórica Objetiva — 4 horas (Aula 10)

**Objetivo:** Verificar conhecimento conceitual de testes de frontend

**Formato:**
- Prova objetiva com 40-50 questões
- Múltipla escolha, verdadeiro/falso, correlação
- Tempo: 4 horas

**Tópicos Cobertos:**
- Tipos e pirâmide de testes (Bloco 01)
- Configuração de ferramentas (Bloco 02)
- Testes unitários: estrutura e matchers (Bloco 03)
- Testes de integração: DOM e mocks (Bloco 04)
- Testes E2E: seletores e padrões (Bloco 05)
- Performance e acessibilidade (Bloco 06)
- CI/CD e automação (Bloco 07)
- Boas práticas (Bloco 08)

**Pontuação:**
- Mínimo de 60% para aprovação
- Questões podem ter múltiplas respostas corretas

**Instrumentos:**
- Prova impressa ou digital
- Gabarito comentado
- Revisão individualizada de resultados

---

## 7. Quadro Resumo de Carga Horária

| # | Bloco | Tema | Horas | Aula(s) |
|---|---|---|---:|---|
| 01 | Fundamentos de Testes | Tipos, TDD, Ferramentas | 4h | 01 |
| 02 | Ambiente e Ferramentas | Setup Node.js, Vitest | 4h | 02 |
| 03 | Testes Unitários | Vitest, matchers, mocking | 8h | 03-04 |
| 04 | Testes de Integração | DOM Testing, APIs mockadas | 8h | 05-06 |
| 05 | Testes E2E | Playwright, Page Object | 8h | 07-08 |
| 06 | Performance & A11y | Lighthouse, axe-core | 4h | 09 (parte 1) |
| 07 | CI/CD e Automação | GitHub Actions, workflows | 4h | 09 (parte 2) |
| 08 | Boas Práticas | Code review, planejamento | 4h | 10 (parte 1) |
| — | **Avaliação Prática** | Suite completa de testes | **4h** | **10 (parte 2)** |
| — | **Avaliação Teórica** | Prova objetiva | **4h** | **10 (final)** |
| — | **TOTAL** | | **40h** | |

---

## 8. Metodologia e Estratégias Transversais

### 8.1 Abordagem Pedagógica
- **Aprendizagem Ativa:** Exercícios práticos a cada bloco
- **Aprendizagem Baseada em Projeto:** Mini-projetos progressivos
- **Peer Learning:** Code review e pair programming
- **Reflexão Crítica:** Discussões sobre tradeoffs e decisões

### 8.2 Diferenciação
- Alunos avançados: desafios extras (framework como React, TypeScript)
- Alunos em dificuldade: suporte individualizado, exercícios simplificados
- Flexibilidade: ritmo adaptado conforme progresso

### 8.3 Avaliação Contínua
- Observação de prática em laboratório
- Exercícios e mini-projetos por bloco
- Revisão de código entre pares
- Autoavaliação e feedback

---

## 9. Recursos Necessários

### 9.1 Ambiente Físico
- Laboratório de Informática com 15-30 computadores
- Conectividade Internet estável
- Projetor e tela
- Quadro branco/flipchart

### 9.2 Softwares e Ferramentas
- Node.js (LTS)
- npm ou yarn
- Vitest
- Playwright ou Cypress
- VS Code (IDE)
- Git e GitHub
- Ferramentas: Lighthouse, axe-core

### 9.3 Material Didático
- Slides apresentação (PDF)
- Guias de laboratório (passo a passo)
- Banco de exercícios e soluções
- Referências rápidas (cheat sheets)
- Exemplos de código (GitHub repository)

### 9.4 Documentação
- Documentação oficial: Vitest, Playwright, node.js
- Artigos: testes em JavaScript, CI/CD
- Vídeos tutoriais (playlists YouTube)
- Comunidade: Stack Overflow, Dev.to

---

## 10. Observações e Próximos Passos

### 10.1 Estrutura Proposta
Este plano propõe uma jornada progressiva de 40 horas focada em **testes de frontend em JavaScript vanilla**, que é o stack do projeto professor-senai. 

### 10.2 Ajustes Pendentes
- **Ementa oficial:** Confirmar com stakeholders qual será a ementa oficial desta UC
- **Ferramentas específicas:** Definir se será Vitest+Playwright ou Cypress
- **Projeto integrador:** Escolher se será dashboard, e-commerce, ou app específico
- **Recursos:** Validar disponibilidade de computadores, internet, softwares

### 10.3 Cronograma
- **Semana 1-2:** Blocos 01-02 (Fundamentos + Setup)
- **Semana 3-4:** Blocos 03-04 (Unitários + Integração)
- **Semana 5:** Bloco 05 (E2E)
- **Semana 6:** Blocos 06-07 (Performance + CI/CD)
- **Semana 7:** Bloco 08 (Boas Práticas)
- **Semana 8:** Avaliações (Prática + Teórica)

### 10.4 Métricas de Sucesso
- ≥ 80% dos alunos com aprovação (≥ 60%)
- Média de cobertura de testes: ≥ 70%
- Satisfação de alunos: ≥ 4/5
- Projetos finais prontos para portfólio profissional

---

## 11. Referências

### 11.1 Ferramentas
- [Vitest Documentation](https://vitest.dev)
- [Playwright Documentation](https://playwright.dev)
- [DOM Testing Library](https://testing-library.com)
- [GitHub Actions](https://github.com/features/actions)

### 11.2 Recursos Educacionais
- "Testing JavaScript" by Kent C. Dodds
- "Working Effectively with Legacy Code" by Michael Feathers
- MDN Web Docs: JavaScript Testing
- YouTube: "Testing Principles" by Uncle Bob (Clean Code)

### 11.3 Comunidades
- JavaScript Testing Best Practices (GitHub)
- Testing JavaScript Community
- Stack Overflow tags: jest, vitest, cypress, playwright

---

**Documento em esboço — Aguardando ementa oficial para refinamento.**

*Criado em: 2026-08-31*
*Versão: 1.0 (esboço)*
*Próxima revisão: Após recebimento da ementa*
