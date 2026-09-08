# AULA 01: Fundamentos de Testes — Autogestão e Automação

**Carga Horária:** 4 horas  
**Módulo:** ESPECÍFICO I  
**Unidade Curricular:** Testes de Frontend  
**Competência:** Diferenciar tipos de testes e compreender ciclo de testes  

---

## 🎯 OBJETIVOS DA AULA

Ao final desta aula, você será capaz de:

- ✅ Diferenciar 3 tipos de testes (unitário, integração, E2E)
- ✅ Compreender Pirâmide de Testes (60/30/10)
- ✅ Reconhecer benefícios de automação vs. testes manuais
- ✅ Entender responsabilidades na automação
- ✅ Identificar métricas de qualidade (cobertura, taxa de falha)
- ✅ Compreender STLC (Software Testing Life Cycle)

---

## 📊 CONTEÚDO PRINCIPAL

### 1. Tipos de Testes (3 Fundamentais)

**UNITÁRIO (60% da pirâmide)**
- Testa UMA função isolada
- Rápido (<100ms)
- Exemplo: `sum(2, 3) === 5`
- Ferramenta: Vitest, Jest

**INTEGRAÇÃO (30% da pirâmide)**
- Testa múltiplas partes juntas
- Médio (100ms-1s)
- Exemplo: Formulário → API → servidor
- Ferramenta: Testing Library, Cypress

**E2E (10% da pirâmide)**
- Testa fluxo completo do usuário
- Lento (5s+)
- Exemplo: Login → dashboard → compra → confirmação
- Ferramenta: Playwright, Selenium

---

### 2. Pirâmide de Testes

```
                  ▲
                 / \
                /E2E \
               /  10%  \ ← Poucos, caros, lentos
              /________\
             /Integração\
            /    30%     \ ← Quantidade média
           /______________\
          /    Unitários    \
         /       60%         \ ← Muitos, rápidos, fáceis
        /______________________\
```

**Por quê essa proporção?**
- Unitários são rápidos e fáceis de manter
- Integração valida interações reais
- E2E testa fluxos críticos apenas

---

### 3. Técnicas de Teste

**CAIXA PRETA (Funcional)**
- Testa comportamento externo
- Não sabe como código funciona
- Exemplo: "Botão abre modal?"

**CAIXA BRANCA (Estrutural)**
- Testa implementação interna
- Sabe como código funciona
- Exemplo: "If está correto?"

---

### 4. Tipos por Característica

| Tipo | O Que Testa | Exemplo |
|------|-----------|---------|
| **Funcionalidade** | "Faz o que deveria?" | Botão funciona? |
| **Usabilidade** | "Usuário consegue usar?" | Menu é intuitivo? |
| **Confiabilidade** | "Estável com stress?" | Funciona com 1000 usuários? |
| **Desempenho** | "Carrega rápido?" | <3s? |
| **Manutenibilidade** | "Fácil de manter?" | Novo dev consegue editar? |

---

### 5. STLC (Software Testing Life Cycle)

```
PLANEJAMENTO → DESIGN → EXECUÇÃO → MONITORAÇÃO → AVALIAÇÃO → CORREÇÃO
```

---

### 6. Autogestão e Automação

**Autogestão:**
- Responsabilidade no planejamento
- Execução sistemática
- Documentação completa
- Comunicação com dev

**Automação:**
- Escrever código para testar código
- 100 testes manuais = 5 minutos
- 100 testes automatizados = 30 segundos
- Rodar antes de cada commit (CI/CD)

---

### 7. Métricas de Qualidade

**Cobertura de Testes**
- % de linhas de código testadas
- Meta: ≥70%
- Exemplo: 850 linhas testadas / 1000 = 85% cobertura

**Taxa de Defeitos**
- % de bugs que chegam a produção
- Meta: <5%
- Exemplo: 50 bugs encontrados, 45 corrigidos = 10% residual

---

## 🎬 ATIVIDADES PROPOSTAS

### Atividade 1: Classificar Tipos de Testes (15 min)

**Exercício:** Para cada cenário, classifique como U (Unitário), I (Integração) ou E (E2E):

1. "Botão 'Enviar' abre modal de confirmação" → **I**
2. "Função calcularImposto(100, 0.1) retorna 110" → **U**
3. "Usuário faz login → vê dashboard → clica vendas → vê lista" → **E**
4. "Formulário valida email quando perde foco" → **I**
5. "Array.sort() ordena números crescente" → **U**

---

### Atividade 2: Desenhar Pirâmide de Testes (30 min)

**Projeto:** E-commerce (Buscar → Carrinho → Checkout → Pagamento)

**Tarefa em Duplas:**
1. Quanto testes unitários? (resposta: ~18)
   - Validações, cálculos, formatações
2. Quanto testes integração? (~9)
   - Form → API, Gráfico + dados, Checkout steps
3. Quanto testes E2E? (~3)
   - Usuário novo: busca → compra → email
   - Usuário retorna: login → compra
   - Admin: produto → editar → deletar

**Desenhe a pirâmide com números!**

---

### Atividade 3: Discussão — Qualidade (15 min)

**Perguntas:**
- "O que custa mais: bug em teste ou em produção?"
  → **Resposta:** 100x mais em produção!
  
- "Automação elimina testes manuais?"
  → **Resposta:** Não, complementa
  
- "100% cobertura = zero bugs?"
  → **Resposta:** Não, testa cenários, não lógica negócio

---

## ✅ CRITÉRIOS DE SUCESSO

Ao final, você consegue:
- [ ] Diferenciar 3 tipos de testes
- [ ] Desenhar pirâmide com proporções certas
- [ ] Classificar teste novo em categoria
- [ ] Explicar por que pirâmide tem essa proporção
- [ ] Identificar exemplos em código real

---

## 📚 REFERÊNCIAS

- ISTQB: Test Planning and Control
- Testing Pyramid — Google Testing Blog
- Vitest Documentation
- Playwright Documentation

---

**Versão:** 1.0  
**Status:** ✅ Pronto para Lecionar  
**Próxima Aula:** Planejamento de Testes
