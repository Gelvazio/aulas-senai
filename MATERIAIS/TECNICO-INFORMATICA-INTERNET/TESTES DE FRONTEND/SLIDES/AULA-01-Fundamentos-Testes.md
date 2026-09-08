# AULA 01: Fundamentos de Testes — Autogestão e Automação

**Carga Horária:** 4 horas  
**Módulo:** ESPECÍFICO I  
**Unidade Curricular:** Testes de Frontend  
**Competência:** Diferenciar tipos de testes e sua aplicação  

---

## 🎯 OBJETIVOS DA AULA

Ao final desta aula, você será capaz de:

- ✅ Diferenciar tipos de testes (unitário, integração, E2E)
- ✅ Compreender a Pirâmide de Testes
- ✅ Reconhecer benefícios de automação vs. testes manuais
- ✅ Entender responsabilidades na automação
- ✅ Identificar métricas de qualidade (cobertura, taxa de falha)

---

## 📊 SLIDE 1: Bem-vindo aos Testes de Frontend

**Tópico:** Introdução e Contexto

### Conteúdo

**O que é Teste de Software?**

Teste é o processo de **executar um programa com a intenção de encontrar erros**.

**Por que testes são críticos?**

- 🔴 **Custos altíssimos:** Um bug em produção custa 100x mais corrigir do que em desenvolvimento
- 📱 **User Experience:** Erros de frontend afetam experiência do usuário diretamente
- 💰 **Reputação:** Aplicação bugada = perda de clientes
- ⏱️ **Velocidade:** Testes automatizados permitem entregas rápidas e seguras

**Estatísticas reais:**

- 70% dos bugs poderiam ser evitados com testes adequados
- Testes automatizados reduzem custo de manutenção em 50%
- Empresas com TDD entregam 50% mais features sem aumento de bugs

### Discussão

"Vocês já viram um app ou site com bugs? Como isso afetou sua experiência?"

---

## 📊 SLIDE 2: Tipos de Testes — Visão Geral

**Tópico:** Classificação de Testes

### Conteúdo

**3 Categorias Principais:**

```
┌─────────────────────────────────────────────────┐
│         3 TIPOS FUNDAMENTAIS DE TESTES          │
├─────────────────────────────────────────────────┤
│                                                 │
│ 🔵 UNITÁRIO                                     │
│    • Testa uma função/componente isolado       │
│    • Rápido e isolado                          │
│    • Exemplo: testar função soma()             │
│    • Ferramenta: Vitest, Jest                  │
│                                                 │
│ 🟢 INTEGRAÇÃO                                   │
│    • Testa múltiplas partes trabalhando juntas │
│    • Valida comunicação entre componentes      │
│    • Exemplo: formulário → API → servidor      │
│    • Ferramenta: Testing Library, Cypress      │
│                                                 │
│ 🟡 END-TO-END (E2E)                             │
│    • Testa fluxo completo do usuário           │
│    • Simula interações reais                   │
│    • Exemplo: login → compra → confirmação     │
│    • Ferramenta: Playwright, Selenium          │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Analise

**Qual tipo testa cada situação?**

- "Botão 'Enviar' está desabilitado quando form vazio" → **Integração**
- "Função `calcularImposto()` retorna 10% corretamente" → **Unitário**
- "Usuário consegue fazer login e acessar dashboard" → **E2E**

---

## 📊 SLIDE 3: Pirâmide de Testes

**Tópico:** Proporção de Testes

### Conteúdo

**A Pirâmide de Testes — Proporção Ideal:**

```
                    ▲
                   /E2E \
                  /      \       ← 10% (poucos testes)
                 /________\
                /Integração\
               /            \    ← 30% (quantidade média)
              /______________\
             /     Unitário    \
            /                    \ ← 60% (muitos testes)
           /________________________\
```

**Por que esta proporção?**

| Tipo | % | Razão | Velocidade |
|------|---|-------|-----------|
| **Unitário** | 60% | Rápido, fácil de manter | ⚡ 1ms |
| **Integração** | 30% | Valida funcionamento real | 🔶 100ms |
| **E2E** | 10% | Caro, lento, crítico | 🐢 5s+ |

**Exemplo Real:**

```
Projeto: Dashboard de Vendas

UNITÁRIOS (60%):
✅ Formatar data corretamente
✅ Calcular total de vendas
✅ Validar email
✅ ... (muitos mais)

INTEGRAÇÃO (30%):
✅ Formulário → API enviar dados
✅ Gráfico recebe dados da API
✅ Modal fecha ao confirmar
✅ ... (vários)

E2E (10%):
✅ Usuário faz login → vê dashboard → cria venda
✅ Usuário filtra dados → exporta CSV
```

### Atividade

**Desenhe a pirâmide de testes para um e-commerce:**

Quantos testes de cada tipo você criaria?

---

## 📊 SLIDE 4: Técnicas de Teste — Caixa Branca vs Caixa Preta

**Tópico:** Perspectivas de Teste

### Conteúdo

**2 Perspectivas Fundamentais:**

| Aspecto | Caixa Preta | Caixa Branca |
|--------|-----------|-------------|
| **O que testa** | Comportamento externo | Implementação interna |
| **Visão** | Usuário/Cliente | Desenvolvedor |
| **Exemplo** | "Botão funciona?" | "If está correto?" |
| **Ferramenta** | Teste funcional manual | Teste de código |
| **Quando sabe resultado** | Vê output | Lê código |

**Exemplos Práticos:**

**Caixa Preta (Funcional):**
- "Quando clico 'Enviar', form é submetido?" ✅ ou ❌
- Não importa como o código funciona, só o resultado

**Caixa Branca (Estrutural):**
- "A função `validarEmail()` retorna verdadeiro para emails válidos?"
- Preciso ver e testar o código internamente

### Analogia

**Caixa Preta:** Você é cliente testando um aplicativo (não sabe código)  
**Caixa Branca:** Você é desenvolvedor testando sua própria lógica

---

## 📊 SLIDE 5: Tipos de Testes por Característica

**Tópico:** Classificação por Tipo de Validação

### Conteúdo

**5 Tipos de Testes Fundamentais:**

```
1. FUNCIONALIDADE
   └─ "Faz o que deveria fazer?"
   └─ Exemplo: Botão abre modal? Formulário valida?

2. USABILIDADE
   └─ "Usuário consegue usar facilmente?"
   └─ Exemplo: Menu é intuitivo? Botões são visíveis?

3. CONFIABILIDADE
   └─ "Sistema é estável sob stress?"
   └─ Exemplo: Funciona com 1000 usuários? Trata erros?

4. DESEMPENHO
   └─ "Carrega rápido?"
   └─ Exemplo: Página carrega em <3s? API responde <200ms?

5. MANUTENIBILIDADE
   └─ "Código é fácil de entender e modificar?"
   └─ Exemplo: Novo desenvolvedor consegue fazer mudanças?
```

**Em qual tipo focamos em Frontend?**

**Primária:** Funcionalidade + Usabilidade  
**Secundária:** Desempenho + Confiabilidade  
**Terciária:** Manutenibilidade (responsabilidade da arquitetura)

### Exemplo Integrado

**Teste de "Adicionar ao Carrinho":**

- **Funcionalidade:** Produto foi adicionado? ✅
- **Usabilidade:** Mensagem de sucesso é clara? ✅
- **Desempenho:** Atualizou em <200ms? ✅
- **Confiabilidade:** Funciona com carrinho cheio? ✅

---

## 📊 SLIDE 6: Autogestão em Testes — Responsabilidade

**Tópico:** Competência Socioemocionai

### Conteúdo

**Autogestão na Automação:**

> Responsabilidade no planejamento e execução de testes

**O que significa?**

| Responsabilidade | Ação | Benefício |
|-----------------|------|-----------|
| **Planejar** | Definir estratégia antes de testar | Não testa errado |
| **Executar Sistemático** | Seguir plano, não improvisar | Cobertura adequada |
| **Documentar** | Registrar resultado de cada teste | Rastreabilidade |
| **Comunicar** | Avisar sobre bugs encontrados | Coordenação |
| **Melhorar** | Refletir sobre qualidade | Testes melhores |

**Cenário Real:**

❌ **Sem Autogestão:**
- Testa algumas funções aleatoriamente
- Não documenta nada
- Não avisa sobre bugs
- Mesmo bug aparece em produção

✅ **Com Autogestão:**
- Cria plano de testes
- Executa sistematicamente
- Documenta cada resultado
- Avisa equipe de desenvolvimento
- Testes de regressão evitam repetição

### Discussão

"Como você testaria uma calculadora de forma responsável?"

---

## 📊 SLIDE 7: Automação de Testes — Conceito

**Tópico:** O que é Automação

### Conteúdo

**Automação = Escrever código para testar código**

**Comparação:**

| Aspecto | Manual | Automatizado |
|--------|--------|-------------|
| **Execução** | Pessoa clica botões | Script executa passos |
| **Velocidade** | 1 teste = 5 minutos | 100 testes = 30 segundos |
| **Repetição** | Tedioso | Automático |
| **Cobertura** | 5-10 casos | 50+ casos por aula |
| **CI/CD** | Impossível | Possível (rodar a cada commit) |

**Quando Automatizar?**

✅ **SIM:**
- Testes que rodam repetidas vezes
- Regressões críticas
- Fluxos complexos
- Suite completa (pre-deploy)

❌ **NÃO:**
- Teste que roda 1 única vez
- Interface muito nova (muda muito)
- Teste visual (imagem vs referência)

### Exemplo

```javascript
// MANUAL:
1. Abrir navegador
2. Acessar app.com
3. Clicar "Login"
4. Digitar email
5. Digitar senha
6. Clicar "Entrar"
7. Verificar se dashboard apareceu
// Tempo: 5 minutos

// AUTOMATIZADO:
test('usuário consegue fazer login', () => {
  visit('app.com');
  login('user@email.com', 'senha123');
  expect(dashboard).toBeVisible();
});
// Tempo: 500ms
```

---

## 📊 SLIDE 8: Frameworks de Automação — Opções

**Tópico:** Ferramentas Disponíveis

### Conteúdo

**Principais Frameworks:**

```
TESTES UNITÁRIOS:
├─ Vitest (JavaScript, recomendado)
├─ Jest (JavaScript)
└─ Pytest (Python)

TESTES DE INTEGRAÇÃO:
├─ Testing Library (React/Vue/Angular)
├─ Cypress (E2E + integração)
└─ Enzyme (React)

TESTES E2E:
├─ Playwright (moderno, rápido)
├─ Cypress (dev-friendly)
├─ Selenium (antigo, onipresente)
└─ Puppeteer (headless browser)
```

**Escolher qual usar?**

Depende do projeto:
- **Novo projeto JavaScript:** Vitest + Testing Library + Playwright
- **React App:** Jest + Testing Library
- **Legacy Code:** Selenium
- **Performance crítica:** Vitest + Playwright

### Nossa Stack

Neste curso, usaremos como **exemplos opcionais:**

- 🔵 **Vitest** para testes unitários
- 🟢 **Testing Library** para integração
- 🟡 **Playwright** para E2E

> Mas foco é no **CONCEITO**, não na ferramenta!

---

## 📊 SLIDE 9: Ciclo de Vida de Teste — STLC

**Tópico:** Processo Completo

### Conteúdo

**Software Testing Life Cycle (STLC):**

```
PLANEJAMENTO
   ↓
DESIGN
   ↓
EXECUÇÃO
   ↓
MONITORAÇÃO
   ↓
AVALIAÇÃO
   ↓ (se bugs encontrados)
CORREÇÃO & RETEST
   ↓
CONCLUSÃO
```

**Cada Fase:**

1. **PLANEJAMENTO** (2h)
   - Definir escopo e objetivos
   - Identificar what/how/who will test

2. **DESIGN** (8h)
   - Criar casos de teste
   - Especificar cenários
   - Preparar dados de teste

3. **EXECUÇÃO** (8h)
   - Rodar testes
   - Registrar resultados
   - Documentar defeitos

4. **MONITORAÇÃO** (2h)
   - Acompanhar progresso
   - Coletar métricas

5. **AVALIAÇÃO** (2h)
   - Analisar resultados
   - Gerar conclusões

6. **CORREÇÃO & RETEST** (variável)
   - Desenvolvedores corrigem bugs
   - Tester verifica correção

### Timeline Real

Para um dashboard de vendas (40 horas):
- Planejamento: 2h
- Design: 8h
- Execução: 20h
- Monitoração: 4h
- Avaliação: 4h
- Correção & Retest: 2h

---

## 📊 SLIDE 10: Métricas de Qualidade — Cobertura

**Tópico:** Como Medir Sucesso

### Conteúdo

**Cobertura de Testes:**

> Percentual de código testado

```
Total de Linhas de Código: 1000
Linhas Testadas: 850
Cobertura: 85%
```

**Tipos de Cobertura:**

| Tipo | Exemplo | Meta |
|------|---------|------|
| **Linha** | Cada linha tem teste? | ≥80% |
| **Função** | Cada função tem teste? | ≥70% |
| **Branch** | Cada if/else testado? | ≥80% |
| **Caminho** | Todas combinações testadas? | ≥90% |

**Exemplo:**

```javascript
function desconto(preco, categoria) {
  if (categoria === 'VIP') {        // Branch 1
    return preco * 0.9;              // ← Testado?
  } else if (categoria === 'NOVO') { // Branch 2
    return preco * 0.95;             // ← Testado?
  } else {                           // Branch 3
    return preco;                    // ← Testado?
  }
}

// Com 100% de cobertura:
✅ Teste com categoria='VIP' → retorna 0.9x
✅ Teste com categoria='NOVO' → retorna 0.95x
✅ Teste com categoria='COMUM' → retorna preço
```

### Meta Realista

- **Iniciante:** 40-50%
- **Bom:** 70-80%
- **Excelente:** 85%+
- **Obsessivo:** 95%+ (diminuir retorno)

---

## 📊 SLIDE 11: Taxa de Defeitos — Outro Indicador

**Tópico:** Qualidade em Produção

### Conteúdo

**Taxa de Defeitos:**

> Número de bugs encontrados vs. corrigidos

```
Bugs Encontrados em Teste: 50
Bugs Corrigidos: 45
Taxa de Defeito Residual: 10% (5 bugs em produção)
```

**Interpretação:**

| Taxa | Qualidade | Ação |
|------|----------|------|
| <5% | ✅ Excelente | Deploy com confiança |
| 5-10% | 🟡 Aceitável | Monitorar em produção |
| 10-20% | ⚠️ Preocupante | Mais testes necessários |
| >20% | 🔴 Inaceitável | Adiar release |

### Real-World

**Comparação de Produtos:**

- Google Chrome: <1% bugs residual (milhares de testes)
- Startup típica: 15-20% (poucos testes)
- Projeto educacional: 30%+ (sem testes automatizados)

---

## 📊 SLIDE 12: Benefícios da Automação

**Tópico:** Por que Investir em Testes

### Conteúdo

**5 Benefícios Principais:**

1. **⚡ Velocidade**
   - Executar 100 testes em segundos (vs horas manual)
   - Feedback imediato ao desenvolver

2. **📈 Escala**
   - Testar mesma coisa 1000x sem esforço
   - Rodar suite completa a cada commit

3. **💰 Economia**
   - Bug em produção = 100x mais caro
   - Automação economiza na manutenção

4. **📊 Cobertura**
   - Testes manuais cobrem ~30% casos
   - Automação cobre 85%+ casos

5. **🚀 Confiança**
   - Refatorar sem medo de quebrar tudo
   - Deploy em sexta-feira às 17h! 😊

### Analogia

**Sem Automação:**
- Toda feature = retest manual = 5h
- 2 features/semana = 10h de testes manuais
- Bug em produção = crise

**Com Automação:**
- Suite roda automática = 2m
- Qualidade melhor
- Deploy confiante

---

## 📊 SLIDE 13: Desafios da Automação

**Tópico:** Realidade do Teste Automatizado

### Conteúdo

**3 Desafios Principais:**

| Desafio | Impacto | Solução |
|---------|---------|---------|
| **Testes Frágeis** | Quebram com pequenas mudanças | Boas práticas de design |
| **Manutenção** | Atualizar testes consome tempo | Refatorar regularmente |
| **Flaky Tests** | Passam/falham aleatoriamente | Isolamento correto de testes |

**Testes Frágeis — Exemplo:**

❌ **Frágil:**
```javascript
test('dashboard', () => {
  const element = document.querySelector('.sidebar-nav-item-5');
  // Se adicionar item novo no menu → quebra
  expect(element).toBeVisible();
});
```

✅ **Robusto:**
```javascript
test('dashboard mostra menu vendas', () => {
  const menuVendas = screen.getByText('Vendas');
  expect(menuVendas).toBeVisible();
});
```

### Realidade

Automatizar NÃO é "escrever código rápido"  
Automatizar É "escrever código que dura 5 anos"

---

## 📊 SLIDE 14: Interação com Equipe — Comunicação

**Tópico:** Colaboração QA + Dev

### Conteúdo

**QA (Tester) ↔ Dev (Desenvolvedor):**

```
DESENVOLVEDOR                 QA/TESTER
     ↓ Entrega feature              ↓
     ├─ Código novo            Executa testes
     │                              ↓
     │ ← Bug encontrado ─────────── +
     │                              |
     ├─ Corrige bug                 |
     │                              |
     │ ← Retest (passa) ──────────── +
     │                              
     └─ Deploy com confiança! ✅
```

**Comunicação Efetiva:**

✅ **BOM:**
- "Login falha quando email > 100 caracteres"
- "Reproduz com user@example.com e senha123"
- "Passos: 1) Abrir app, 2) Click login, 3) Enter email"

❌ **RUIM:**
- "Algo está errado"
- "Não funciona"
- "Testa de novo"

### Ciclo de Defeito

```
1. QA encontra bug
   ↓
2. QA reporta com detalhe: "Quando faço X, Y acontece"
   ↓
3. Dev confirma: "Achei o problema em linha 42"
   ↓
4. Dev corrige e avisa
   ↓
5. QA faz RETEST: "Confirmado corrigido"
   ↓
6. Bug marca como RESOLVIDO
```

---

## 📊 SLIDE 15: Ciclo Completo — Dashboard de Vendas

**Tópico:** Exemplo Integrado

### Conteúdo

**Projeto: Teste Dashboard de Vendas**

**Contexto:**
- Aplicação web para gerenciar vendas
- 5 devs, 1 tester, deadline 2 semanas
- 20 features novas planejadas

**Estratégia de Testes:**

```
UNITÁRIOS (60%):
- ✅ Formatar datas
- ✅ Calcular totais
- ✅ Validar email
- ✅ Formatar moeda
... (30 testes)

INTEGRAÇÃO (30%):
- ✅ Form → API enviar dados
- ✅ Gráfico recebe dados API
- ✅ Modal abre/fecha
... (15 testes)

E2E (10%):
- ✅ Login → Dashboard → Criar venda
- ✅ Filtrar → Exportar CSV
... (3 testes)
```

**Timeline:**

```
Semana 1:
├─ Day 1: Planejar testes (4h)
├─ Day 2-3: Design casos teste (8h)
├─ Day 4-5: Execução manual (8h)
│
Semana 2:
├─ Day 1-3: Corrigir bugs (8h tester + devs)
├─ Day 4: Retest (4h)
├─ Day 5: Testes E2E final (4h)
│
DEPLOY: Sexta à noite com confiança ✅
```

**Resultado Esperado:**

- ✅ 48 testes executados
- ✅ 15 bugs encontrados e corrigidos
- ✅ 80% cobertura de código
- ✅ <5% taxa de defeito residual
- ✅ Deploy seguro!

---

## 📊 SLIDE 16: Resumo — Conceitos-Chave

**Tópico:** Reforço de Aprendizado

### Conteúdo

**10 Conceitos que você agora entende:**

1. ✅ **3 Tipos:** Unitário, Integração, E2E
2. ✅ **Pirâmide:** 60% unitário, 30% integração, 10% E2E
3. ✅ **Técnicas:** Caixa Branca vs Caixa Preta
4. ✅ **Tipos:** Funcionalidade, Usabilidade, Confiabilidade, Desempenho
5. ✅ **Autogestão:** Responsabilidade no planejamento e execução
6. ✅ **Automação:** Escrever código para testar código
7. ✅ **Frameworks:** Vitest, Testing Library, Playwright
8. ✅ **STLC:** 7 fases do ciclo de vida de testes
9. ✅ **Métricas:** Cobertura e taxa de defeitos
10. ✅ **Comunicação:** QA ↔ Dev para qualidade

---

## 📊 SLIDE 17: Atividade — Classificar Testes

**Tópico:** Prática Interativa

### Conteúdo

**Exercício: Classifique cada teste**

Dado: Aplicação de carrinho de compras

1. "Função `calcularTotal()` retorna valor correto"
   → **Unitário** ✓

2. "Usuário adiciona produto ao carrinho"
   → **Integração** (formulário + estado) ✓

3. "Usuário faz login → adiciona produto → compra → recebe email de confirmação"
   → **E2E** (fluxo completo) ✓

4. "Botão 'Comprar' está desabilitado quando carrinho vazio"
   → **Integração** (validação + UI) ✓

5. "API `/carrinho` retorna JSON válido"
   → **Integração** (ou unitário se só função) ✓

### Discussão

"Qual tipo você testaria PRIMEIRO em um projeto novo?"

💡 **Resposta:** Unitários! São mais rápidos e base sólida.

---

## 📊 SLIDE 18: Discussão — Qualidade

**Tópico:** Reflexão Crítica

### Conteúdo

**Perguntas para refletir:**

1. "O que custa mais: encontrar bug em teste, ou em produção?"
   → Encontrar em teste! (pode corrigir)

2. "Automação elimina testes manuais?"
   → NÃO! Automação complementa, não substitui

3. "100% cobertura = zero bugs?"
   → NÃO! Testes verificam cenários, não lógica de negócio

4. "Qual é o maior desafio de testes?"
   → Manutenção (testes quebram com mudanças)

### Discussão em Grupo

"Como vocês testariam um botão de logout?"

Possíveis respostas:
- Unitário: função `logout()` limpa sessionStorage?
- Integração: Clique no botão → estado limpa → redirecionado?
- E2E: Login → clica logout → volta ao login?

**Todas estão corretas!** Depende do contexto.

---

## 📊 SLIDE 19: Próximos Passos

**Tópico:** O que Vem Depois

### Conteúdo

**Na próxima aula (Aula 02):**

- 📋 **Conceitos:** Verificação vs Validação
- 📋 **Planejamento:** Como estruturar um plano de testes
- 📋 **Documentação:** Casos de teste bem-escritos
- 📋 **Exercício:** Criar plano para uma interface real

**Para pensar:**

"Se vocês fossem testar um formulário de cadastro, por onde começariam?"

---

## 📊 SLIDE 20: Checklist — Domina este Slide?

**Tópico:** Auto-avaliação

### Conteúdo

**Você consegue responder?**

- [ ] O que diferencia teste unitário de E2E?
- [ ] Qual é a proporção ideal na pirâmide de testes?
- [ ] Qual é a diferença entre técnica de caixa branca e caixa preta?
- [ ] Por que automação é importante?
- [ ] Qual é a diferença entre cobertura de 70% e 80%?
- [ ] O que significa "STLC"?
- [ ] Como QA e Dev devem se comunicar?
- [ ] Qual framework você usaria para teste unitário? E2E?

**Se respondeu SIM a 6+:** ✅ Domina a Aula 01!  
**Se respondeu SIM a 4-5:** 🟡 Revise alguns tópicos  
**Se respondeu SIM a <4:** ❌ Refaça os slides  

---

## 📌 RESUMO EXECUTIVO

| Item | Resposta |
|------|----------|
| **Objetivo** | Entender tipos e ciclo de testes |
| **Duração** | 4 horas |
| **Conceitos** | 10 (tipos, pirâmide, técnicas, STLC, métricas) |
| **Próxima Aula** | Planejamento de Testes |
| **Entrega** | Compreensão conceitual sólida |

---

**Fim da Aula 01**

*Versão: 1.0*  
*Data: 2026-09-08*  
*Status: ✅ Pronto para Apresentação*
