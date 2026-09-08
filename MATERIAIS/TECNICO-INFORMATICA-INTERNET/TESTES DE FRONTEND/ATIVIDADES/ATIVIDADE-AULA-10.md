# ATIVIDADE AULA 10 — Avaliação Prática + Teórica

**Objetivo:** Demonstrar domínio completo de testes de frontend

**Duração:** 4 horas  
**Competências Praticadas:** Todas as aulas anteriores  
**Modalidade:** Presencial — Laboratório + Sala de aula

---

## PARTE 1 — AVALIAÇÃO PRÁTICA (Primeira Metade — 2 horas)

### 1.1 Projeto Proposto

Você receberá uma **aplicação web simples** com bugs e requisitos de testes.

**Exemplo:** "Sistema de gerenciamento de tarefas (TODO App)"

Funcionalidades:
- Adicionar tarefa
- Marcar como concluída
- Deletar tarefa
- Filtrar por status
- Persistir em localStorage

### 1.2 Sua Tarefa — Criar Suite Completa de Testes

**Requisitos obrigatórios:**

1. **Testes Unitários (30%)**
   - [ ] Testar lógica de adição de tarefas
   - [ ] Testar lógica de conclusão
   - [ ] Testar lógica de deleção
   - [ ] Mínimo: 8-10 testes unitários
   - [ ] Meta cobertura: ≥ 80%

2. **Testes de Integração (30%)**
   - [ ] Testar interação completa (adicionar + renderizar)
   - [ ] Testar localStorage (salvar e recuperar)
   - [ ] Testar filtros
   - [ ] Mínimo: 6-8 testes de integração
   - [ ] Meta cobertura: ≥ 70%

3. **Testes E2E (20%)**
   - [ ] Cenário: Adicionar tarefa
   - [ ] Cenário: Marcar como concluída
   - [ ] Cenário: Deletar tarefa
   - [ ] Mínimo: 3-5 cenários E2E
   - [ ] Usar Page Object Model

4. **Cobertura Total (20%)**
   - [ ] Relatório de cobertura gerado
   - [ ] Meta: ≥ 70% do código
   - [ ] Arquivo de cobertura commitado

### 1.3 Rubrica Avaliação Prática

| Critério | Excelente (10) | Bom (8) | Satisfatório (6) | Insuficiente (≤4) |
|---|---|---|---|---|
| **Testes Unitários** | 10+ testes, 80%+ cobertura | 8-9 testes, 70-79% cobertura | 6-7 testes, 60-69% cobertura | <6 testes ou <60% cobertura |
| **Testes Integração** | 8+ testes, interações completas | 6-7 testes, boas interações | 5-6 testes, algumas gaps | <5 testes |
| **Testes E2E** | 5+ cenários, POM bem-estruturado | 4 cenários, POM bom | 3 cenários, POM básico | <3 cenários |
| **Código de Teste** | Legível, bem-organizado, DRY | Bom, algumas repetições | Aceitável, várias repetições | Confuso, muito duplicado |
| **Documentação** | Completa com exemplos | Boa, cobre o essencial | Mínima | Falta documentação |

**Pontuação Total Prática:** (Unitários + Integração + E2E + Código + Docs) / 5 = X / 10

---

## PARTE 2 — AVALIAÇÃO TEÓRICA (Segunda Metade — 2 horas)

### 2.1 Prova Objetiva

**Formato:** 40 questões / 4 horas / 6 minutos por questão

**Conteúdo coberto:**

**Bloco 01 (4 questões) — Fundamentos**
- Tipos de testes e pirâmide
- TDD vs BDD
- Métricas de qualidade
- Benefícios de automação

**Bloco 02 (3 questões) — Ambiente**
- Node.js, npm, package.json
- Instalação de ferramentas
- Estrutura de projeto

**Bloco 03 (8 questões) — Testes Unitários**
- Padrão AAA
- Matchers (toBe, toEqual, toThrow, etc.)
- Mocks e spies
- Testes de funções assíncronas

**Bloco 04 (8 questões) — Testes de Integração**
- DOM Testing Library
- Simulação de eventos
- User events
- Assertions assíncronas (waitFor)

**Bloco 05 (8 questões) — Testes E2E**
- Playwright vs Cypress
- Seletores
- Page Object Model
- Waits e timeouts

**Bloco 06 (3 questões) — Performance & A11y**
- Core Web Vitals
- WCAG 2.1
- Lighthouse e axe-core

**Bloco 07 (3 questões) — CI/CD**
- GitHub Actions
- Branch protection
- Badges e relatórios

**Bloco 08 (4 questões) — Boas Práticas**
- DRY em testes
- Nomes descritivos
- Testes flaky
- Cobertura vs qualidade

### 2.2 Formato das Questões

**Tipo 1: Múltipla Escolha (30 questões)**
```
Qual é a ordem correta do padrão AAA?
a) Act, Arrange, Assert
b) Arrange, Act, Assert ✓
c) Assert, Arrange, Act
d) Arrange, Assert, Act
```

**Tipo 2: Verdadeiro/Falso (8 questões)**
```
[ ] TDD significa "Test Driven Development"
[ ] Testes E2E devem ser a maioria da pirâmide
[ ] Cobertura 100% garante zero bugs
```

**Tipo 3: Associação (2 questões)**
```
Associe cada ferramenta com seu propósito:

1. Vitest          a) Testes E2E
2. DOM Testing Lib b) Testes unitários
3. Playwright      c) Testes de integração DOM
```

### 2.3 Critério de Aprovação

- **Mínimo:** 60% de acerto (24/40 questões)
- **Bom:** 80% de acerto (32/40 questões)
- **Excelente:** 90%+ de acerto (36+ questões)

### 2.4 Rubrica Teórica

| Acerto | Nota | Conceito |
|---|---|---|
| 90-100% | 10 | Excelente |
| 80-89% | 8 | Bom |
| 70-79% | 7 | Satisfatório |
| 60-69% | 6 | Aprovado |
| <60% | ≤4 | Reprovado |

---

## NOTAS GERAIS

### Materiais Permitidos
- [ ] Notas pessoais (papel)
- [ ] Documentação oficial online
- [ ] IDE/terminal para referência
- ❌ **NÃO permitido:** ChatGPT, copiar de colegas, código pré-pronto

### Pontuação Final

```
Nota Final = (Prática × 0.6) + (Teórica × 0.4)
```

**Exemplo:**
- Prática: 8/10
- Teórica: 7/10
- **Final:** (8 × 0.6) + (7 × 0.4) = 4.8 + 2.8 = **7.6**

### Aprovação
- **Prática ≥ 6:** Necessário para passar
- **Teórica ≥ 6:** Necessário para passar
- **Final ≥ 6:** Aprovado

---

## CRONOGRAMA DA AULA 10

| Horário | Atividade | Duração |
|---|---|---|
| 08:00 - 08:10 | Instruções e sorteio de projeto | 10 min |
| 08:10 - 10:10 | **Prova Prática** | 2h |
| 10:10 - 10:20 | Intervalo | 10 min |
| 10:20 - 12:20 | **Prova Teórica** | 2h |
| 12:20 - 12:30 | Recolhimento de provas e encerramento | 10 min |

---

## PRÓXIMOS PASSOS (Pós-Aula 10)

- Feedback individual sobre resultados
- Revisão de desempenho geral do curso
- Sugestões de recursos para continuidade
- Certificado de conclusão (se aprovado)

---

**Importante:** Esta é uma **avaliação sumativa**. Prepare-se bem revisando as atividades das aulas 01-09!

**Boa sorte!** 🎯
