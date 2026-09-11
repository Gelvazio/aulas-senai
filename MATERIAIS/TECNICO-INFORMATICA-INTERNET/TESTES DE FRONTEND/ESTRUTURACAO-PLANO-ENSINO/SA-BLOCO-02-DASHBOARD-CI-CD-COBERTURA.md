# SA BLOCO 02 — Desenvolvimento de Pipeline CI/CD e Dashboard de Cobertura de Testes

**Carga horária:** 16 horas (4 aulas de 4h)  
**Público:** Técnico em Informática para Internet  
**Capacidades:** Implementar automação de testes e monitorar qualidade

---

**Contexto:** Automatizar execução de testes e criar visibilidade de qualidade  
**Foco:** CI/CD + GitHub Actions + Relatórios de Cobertura  
**Nome sugerido:** "SA 02 PIPELINE-AUTOMACAO-QUALIDADE" ou "SA-CI-CD-DASHBOARD-COBERTURA"

---

## Situação/Contexto

Uma equipe de desenvolvimento trabalha em projeto React. Após estruturar plano de testes (SA-BLOCO-01) e escrever primeira batida de testes (Blocos 01-02), percebem que:
- Testes são executados manualmente antes de cada deploy (processo lento e propenso a erro)
- Não há visibilidade de cobertura de testes (ninguém sabe qual % do código está testado)
- PRs são mergeadas sem validação de qualidade (testes podem estar falhando)
- Quando um bug chega a produção, ninguém consegue rastrear por que os testes não pegaram

A equipe de DevOps foi convidada para implementar **pipeline de integração contínua** que execute testes automaticamente e crie **dashboard de cobertura** mostrando saúde do projeto.

---

## Desafio Integrador

Você recebe repositório GitHub com:
- Código-fonte React de aplicação (src/)
- Testes Vitest já escritos (test/)
- Testes E2E com Cypress (cypress/e2e/)

Sua tarefa é criar **pipeline completo de CI/CD** que:

### 1. **Automação em GitHub Actions:**
- Criar workflow que roda em cada push e PR
- Executar npm test (Vitest com coverage)
- Executar npm run e2e (Cypress)
- Bloquear merge se testes falharem
- Gerar relatório de cobertura

### 2. **Métricas de Qualidade:**
- Coletar relatório de cobertura (line, branch, function, statement)
- Calcular defect density (bugs/1000 linhas)
- Rastrear flakiness rate (% testes intermitentes)
- Comparar cobertura antes/depois

### 3. **Visibilidade (Dashboard/Badges):**
- Badge de status de testes no README (pass/fail)
- Badge de cobertura (%) no README
- Histórico de cobertura (semana anterior vs atual)
- Relatório HTML de cobertura interativo
- Identificação visual de arquivos com baixa cobertura

### 4. **Integração com GitHub:**
- Comentário automático em PR: "Cobertura: 75% → 78% ✅"
- Bloquear merge se cobertura cair abaixo de 70%
- Status check no PR indicando quais testes passaram/falharam

### 5. **Documentação de Pipeline:**
- Explicação clara do workflow (.github/workflows/test.yml)
- Instruções para devs: "Como rodar testes localmente"
- Instruções para novatos: "Como contribuir mantendo qualidade"
- Troubleshooting: "Teste está falhando, o que fazer?"

### 6. **Apresentação do Pipeline:**
- Demonstração ao vivo do workflow em ação
- Explicação do fluxo (push → testes automáticos → relatório)
- Discussão sobre como isso previne bugs em produção
- Sugestões de otimizações futuras

---

## Resultado Esperado

**Portfólio Técnico Profissional contendo:**

**Arquivos de Configuração:**
- `.github/workflows/test.yml` - Workflow completo de CI/CD
- `.github/workflows/coverage.yml` - Workflow de relatório de cobertura (opcional)
- `vitest.config.js` - Configuração Vitest com coverage
- `cypress.config.js` - Configuração Cypress

**Documentação:**
- `TESTING.md` - Guia completo de testes (como rodar, como escrever, how to debug)
- `CONTRIBUTING.md` - Guia para contribuidores (requisitos de qualidade)
- `CI-CD-WORKFLOW.md` - Explicação do pipeline (para who wants to understand)

**Relatórios:**
- Relatório HTML de cobertura (dist/coverage/index.html)
- Histórico de cobertura (últimas 10 execuções)
- Status badges funcionando no README

**README Atualizado:**
```
# Meu Projeto

[![Tests](https://github.com/user/repo/workflows/Tests/badge.svg)](...)
[![Coverage](https://img.shields.io/codecov/c/github/user/repo)](...) 
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](...)

## Testing

Rodar testes localmente: `npm test`
Rodar E2E: `npm run cypress`
Ver cobertura: `npm test -- --coverage`
```

**Demonstração Prática:**
- Fazer push de código com teste falhando
- Mostrar workflow rodando automaticamente
- Mostrar GitHub bloqueando merge
- Corrigir teste, fazer novo push
- Mostrar workflow passando e merge liberado

---

## Conhecimentos Envolvidos

### GitHub Actions
- Sintaxe de workflow YAML
- Triggers (push, pull_request, schedule)
- Jobs e steps
- Checkout de código
- Setup de Node.js
- Execução de scripts npm
- Upload de artefatos
- Status checks e permissions

### Métricas de Cobertura
- Tipos: line, branch, function, statement
- Interpretação de relatórios
- Metas realistas (70%, 85-90%)
- Trade-offs de tempo vs cobertura
- Diminishing returns após 80%

### Relatórios e Badges
- Formato Istanbul HTML
- CodeCov integration (opcional)
- Badges de status markdown
- Histórico de métricas
- Comunicação visual de qualidade

### CI/CD Concepts
- Integração contínua (testes em cada push)
- Continuous delivery (pronto para produção)
- Gatekeeping (bloquear merge se testes falham)
- Automation (execução automática de testes)
- Fast feedback (resultado em minutos, não horas)

### Boas Práticas
- Testes rápidos (suite deve rodar <5min)
- Testes confiáveis (não intermitentes)
- Testes isolados (não dependem um do outro)
- Coverage meaningful (70% com testes bons > 100% ruim)

---

## Estratégias Pedagógicas

- Exposição Dialogada de CI/CD
- Demonstração Prática de workflow rodando
- Atividade Prática em Laboratório
- Trabalho em Grupo configurando pipeline
- Estudos de Caso com projetos reais
- Apresentação ao vivo do fluxo
- Discussão crítica sobre automação

---

## Critérios de Avaliação

- ✅ Cria workflow YAML funcional e bem-estruturado
- ✅ Implementa triggers apropriados (push, PR)
- ✅ Executa testes automaticamente (Vitest + Cypress)
- ✅ Coleta e relata cobertura corretamente
- ✅ Bloqueia merge se testes falham
- ✅ Gera relatório HTML de cobertura interativo
- ✅ Implementa badges de status no README
- ✅ Documenta pipeline e instruções para devs
- ✅ Demonstra workflow funcionando ao vivo
- ✅ Interpreta corretamente métricas de cobertura
- ✅ Explica decisões de gates (quando bloquear merge)
- ✅ Identifica e comunica oportunidades de melhoria

---

## Matriz de Avaliação

| Critério | Peso | Descrição |
|----------|------|-----------|
| Qualidade técnica do workflow | 25% | YAML bem-estruturado, jobs otimizados |
| Execução correta de testes | 20% | Vitest + Cypress rodando, cobertura coletada |
| Relatórios e visibilidade | 20% | HTML coverage, badges, histórico |
| Documentação do pipeline | 15% | Guias claros para devs e contribuidores |
| Apresentação e demonstração | 20% | Demonstração ao vivo, explicação profissional |

---

## Referências

GITHUB ACTIONS DOCUMENTATION. **Getting Started with GitHub Actions**. Disponível em: https://docs.github.com/en/actions

CODECOV DOCUMENTATION. **Codecov - Code Coverage Made Easy**. Disponível em: https://docs.codecov.io

FOWLER, Martin. **Continuous Integration**. Disponível em: https://martinfowler.com/articles/continuousIntegration.html

FOWLER, Martin. **Test Coverage**. Disponível em: https://martinfowler.com/bliki/TestCoverage.html

VITEST DOCUMENTATION. **Coverage**. Disponível em: https://vitest.dev/guide/coverage.html

---

**Data de Criação:** 2026-09-11  
**Status:** ✅ Pronto para Execução
