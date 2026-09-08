---
título: Expansão de Aulas para 4-5 Horas Cada
data_inicio: 2026-09-08
status: ⬜ Pendente
---

# 📚 Plano de Expansão das 10 Aulas para 4-5 Horas Efetivas

## 📋 Objetivo
Expandir significativamente cada uma das 10 aulas de Testes de Frontend, passando de 30-60 minutos para 4-5 horas efetivas de conteúdo com:
- Conceitos teóricos detalhados
- Exemplos práticos com código
- Exercícios estruturados (individuais e em duplas)
- Casos reais de uso
- Discussões e reflexão crítica
- Avaliação formativa

---

## 🎯 Estrutura de Cada Aula (4-5 horas)

### Tempo Recomendado
```
Total: 240-300 minutos (4-5 horas)

Abertura/Revisão:              15 min
Conteúdo Teórico Principal:   90 min  (3 tópicos × 30 min)
Exemplo Prático com Código:   45 min
Exercício Prático (duplas):   60 min
Discussão/Reflexão:          15 min
Fechamento e Avaliação:      15 min
```

### Componentes Obrigatórios

1. **Conceitos Fundamentais** — 3-4 tópicos principais
   - Cada um com explicação clara, analogia, exemplo do mundo real
   - Exemplo: "Teste Unitário" → O que é, por quê importa, quando usar, exemplo com Jest

2. **Código Executável** — Mínimo 3 exemplos
   - Arquivo separado: `exemplo-aula-XX.js` com comentários
   - Mostrar execução passo a passo
   - Output esperado documentado

3. **Exercício Prático Estruturado** — Mínimo 2 exercícios
   - Exercício 1 (individual, fácil, 20 min): Aplicar conceito recém aprendido
   - Exercício 2 (duplas, intermediário, 40 min): Caso real mais complexo
   - Solução esperada fornecida

4. **Estudos de Caso Reais** — Mínimo 1 por aula
   - Exemplo: "Bug que chegou a produção porque faltou teste E2E"
   - Análise: Como teste teria prevenido?
   - Lição: O que aprender?

5. **Discussão/Reflexão** — Perguntas disparadoras
   - Mínimo 3 perguntas abertas
   - Estimula pensamento crítico
   - Exemplos: "Qual seria o custo de um teste E2E neste caso?"

6. **Checklist de Aprendizado** — Autoavaliação
   - 5-7 itens que devem entender ao final
   - [ ] Compreendo o conceito de X
   - [ ] Consigo aplicar X em um exemplo prático
   - [ ] Entendo quando usar X vs Y

---

## 📄 Aulas a Expandir

| # | Aula | Tópicos Principais | Status |
|---|------|-------------------|--------|
| 1 | **Fundamentos de Testes** | Tipos (U/I/E2E), Pirâmide, Técnicas, STLC, Autogestão, Métricas | ⬜ |
| 2 | **Planejamento de Testes** | Verificação vs Validação, Specs, Plano, Casos, Timeline, Setup Node.js | ⬜ |
| 3 | **Vitest: Testes Unitários** | Instalação, Sintaxe, Assertions, Mocks, Spies, Fixtures | ⬜ |
| 4 | **Testing Library: DOM** | Queries, User Events, Waiters, Accessibility, RTL Best Practices | ⬜ |
| 5 | **Testes de Integração** | Múltiplos Componentes, API Mocks, Estados Compartilhados, Debugging | ⬜ |
| 6 | **Cypress: Testes E2E** | Instalação, Seletores, Commands, Assertions, Flakiness, CI/CD | ⬜ |
| 7 | **Cobertura de Testes** | Métricas, Metas Realistas, Análise de Relatórios, Trade-offs | ⬜ |
| 8 | **Debugging e TDD** | Test-Driven Development, Ciclo Red-Green-Refactor, Debugging Técnicas | ⬜ |
| 9 | **Qualidade e Performance** | Code Review, Performance Testing, Badges, CI/CD Integration | ⬜ |
| 10 | **Projeto Final e Apresentação** | Integração Completa, Apresentação, Documentação, Lições Aprendidas | ⬜ |

---

## 🛠️ Melhorias Específicas por Aula

### AULA 01: Fundamentos de Testes
**Adicionar:**
- [ ] Comparação visual: Pirâmide de Testes (infográfico com números)
- [ ] Vídeo curto (3 min): Bug que chegou a produção, impacto financeiro
- [ ] Exercício 1: Classificar 10 cenários em U/I/E2E (15 min)
- [ ] Exercício 2: Desenhar pirâmide para 2 projetos reais (30 min)
- [ ] Caso Real: "Revolut pagou 200k por bug que teste E2E teria achado"
- [ ] Código exemplo: 3 testes simples mostrando velocidade diferente

### AULA 02: Planejamento de Testes
**Adicionar:**
- [ ] Template de Plano de Testes (1 página preenchida, 1 vazia para praticar)
- [ ] Comparação: Plano formal vs Kanban board (quando cada um?)
- [ ] Exercício 1: Escrever 3 casos de teste em formato padrão (25 min)
- [ ] Exercício 2: Plano completo para feature "Carrito de Compras" (40 min)
- [ ] Caso Real: E-commerce com 100% sem testes → 50 bugs em produção
- [ ] Setup prático step-by-step: Node.js, npm, package.json, primeira execução

### AULA 03: Vitest — Testes Unitários
**Adicionar:**
- [ ] Instalação guiada: printscreens de cada passo
- [ ] 5 exemplos com código executável: funções simples até mocks
- [ ] Exercício 1: Fazer 5 testes unitários simples (30 min)
- [ ] Exercício 2: Integrar mocks e spies em teste mais complexo (40 min)
- [ ] Caso Real: "Teste unitário que economizou 2 dias de debug"
- [ ] Configuração de watch mode, coverage, CI/CD

### AULA 04: Testing Library — DOM
**Adicionar:**
- [ ] Comparação: Testing Library vs Enzyme (por quê TL é melhor)
- [ ] 6 exemplos com componentes React: input, button, form, async
- [ ] Exercício 1: Testar componente Button (30 min)
- [ ] Exercício 2: Testar formulário completo com validação (40 min)
- [ ] Caso Real: "Acessibilidade: teste que encontrou 5 problemas WCAG"
- [ ] Debugging: screen.debug(), screen.logTestingPlaygroundURL()

### AULA 05: Testes de Integração
**Adicionar:**
- [ ] Diferenças claras: Unitário vs Integração vs E2E (tabela grande)
- [ ] 4 exemplos: 2 componentes, API mock, estado compartilhado
- [ ] Exercício 1: Testar fluxo de autenticação com API mock (35 min)
- [ ] Exercício 2: Testar integração completa (lista + filtro + sort) (40 min)
- [ ] Caso Real: "Integração que passou em testes mas falhou em produção"
- [ ] Mock de APIs: MSW (Mock Service Worker) vs fetch mock

### AULA 06: Cypress — Testes E2E
**Adicionar:**
- [ ] Instalação passo a passo com screenshots
- [ ] 5 exemplos: navegação, formulário, async, network, screenshots
- [ ] Exercício 1: Testar login end-to-end (30 min)
- [ ] Exercício 2: Testar checkout completo (45 min)
- [ ] Caso Real: "Cypress que encontrou bug que nunca seria encontrado em testes unitários"
- [ ] CI/CD: integração com GitHub Actions, retry automático

### AULA 07: Cobertura de Testes
**Adicionar:**
- [ ] Métricas explicadas: Line, Branch, Function, Statement coverage
- [ ] Exemplos de código com coverage report visual
- [ ] Exercício 1: Ler relatório de coverage, identificar gaps (25 min)
- [ ] Exercício 2: Aumentar coverage de 60% para 85% (50 min)
- [ ] Caso Real: "100% de coverage não significa 100% de qualidade"
- [ ] Ferramentas: Istanbul, CodeCov, badges em README

### AULA 08: Debugging e TDD
**Adicionar:**
- [ ] Ciclo Red-Green-Refactor explicado visualmente
- [ ] 3 exemplos TDD: função simples até integração
- [ ] Exercício 1: Red-Green-Refactor para função simples (25 min)
- [ ] Exercício 2: Desenvolver feature inteira via TDD (50 min)
- [ ] Caso Real: "TDD que preveniu 15 bugs antes do code review"
- [ ] Debugging: breakpoints, console.log estratégico, time-travel debugging

### AULA 09: Qualidade e Performance
**Adicionar:**
- [ ] Métricas de qualidade: defect density, test effectiveness ratio
- [ ] Performance: Como testar velocidade de teste, flakiness detection
- [ ] Exercício 1: Otimizar testes lentos (30 min)
- [ ] Exercício 2: Implementar CI/CD completo com badges (45 min)
- [ ] Caso Real: "Suite de 2000 testes que demorava 40 min → otimizou para 8 min"
- [ ] Code Review: Checklist de testes que todo PR deve ter

### AULA 10: Projeto Final
**Adicionar:**
- [ ] Integração de todas as técnicas em um projeto real
- [ ] Template de projeto: pastas, package.json, configurações
- [ ] Exercício: Implementar cobertura 80% em projeto E-commerce simplificado (180 min)
- [ ] Apresentação: Cada dupla explica arquitetura de testes (30 min)
- [ ] Documentação: README com instruções, métricas, lições aprendidas
- [ ] Reflexão final: O que aprendeu? Como aplicaria em projeto real?

---

## 📊 Checklist de Implementação

### Para Cada Aula:
- [ ] Expandir conteúdo principal (90 min mínimo)
- [ ] Adicionar 3+ exemplos com código executável
- [ ] Criar 2 exercícios práticos estruturados
- [ ] Incluir 1 caso real do mundo profissional
- [ ] Adicionar 3-5 perguntas de discussão
- [ ] Criar checklist de aprendizado (5-7 itens)
- [ ] Testar com impressão (deve caber bem no papel A4)
- [ ] Validar links e recursos externos
- [ ] Adicionar tempo estimado em cada seção
- [ ] Revisar alinhamento com próxima aula

---

## 🚀 Próximas Ações

1. **Implementar Aula 01** — Fundamentos (4-5 horas com exemplos)
2. **Implementar Aula 02** — Planejamento (com template real)
3. **Implementar Aula 03-10** — Sequencialmente
4. **Criar pasta `exemplos-aulas/`** — Código executável para cada aula
5. **Testar com alunos** — Coletar feedback de tempo e dificuldade
6. **Ajustar iterativamente** — Aumentar/diminuir tempo conforme necessário

---

**Status Final:** ⬜ Pendente (aguardando confirmação do usuário)
