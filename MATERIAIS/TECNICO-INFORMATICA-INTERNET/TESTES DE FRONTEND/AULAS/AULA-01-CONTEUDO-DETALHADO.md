# AULA 01: Fundamentos de Testes — Autogestão e Automação

**Bloco 01 | Testes de Frontend | 4-5 Horas**

---

## 📚 INTRODUÇÃO (10 min)

Bem-vindos à aula 01 de Testes de Frontend! Esta é a aula mais importante do curso, pois estabelece os fundamentos que você usará em TODAS as outras aulas.

Você provavelmente já ouviu o termo "testes de software" e pode estar se perguntando: "Por que testar? Não é mais rápido apenas desenvolver?"

A resposta é: **testando DURANTE o desenvolvimento, você economiza MUITO tempo depois**.

Nesta aula, vamos entender:
- Os 3 tipos principais de testes (e quando usar cada um)
- A Pirâmide de Testes (a proporção ideal)
- Como testes automatizados economizam tempo
- Métricas reais de qualidade

**Objetivo da Aula:** Que você saia entendendo EXATAMENTE quando usar testes unitários, de integração ou E2E, e por quê.

---

## 1. TIPOS FUNDAMENTAIS DE TESTES (30 min)

### 1.1 Testes Unitários — A Base

**O que é?** Um teste unitário testa UMA ÚNICA UNIDADE DE CÓDIGO em isolamento. Normalmente, é uma função ou método.

**Analogia:** Como testar um parafuso sozinho antes de montar o móvel inteiro. Você verifica:
- O parafuso é do tamanho correto?
- A rosca funciona?
- Está sem defeitos?

**Exemplo Real:**

```javascript
// Código a testar
function calcularDesconto(preco, percentualDesconto) {
  if (percentualDesconto < 0 || percentualDesconto > 100) {
    throw new Error("Desconto deve estar entre 0 e 100%");
  }
  return preco * (1 - percentualDesconto / 100);
}

// Teste unitário
describe("calcularDesconto", () => {
  test("aplica desconto de 10% corretamente", () => {
    expect(calcularDesconto(100, 10)).toBe(90);
  });

  test("aplica desconto de 50% corretamente", () => {
    expect(calcularDesconto(100, 50)).toBe(50);
  });

  test("rejeita desconto negativo", () => {
    expect(() => calcularDesconto(100, -10)).toThrow("Desconto deve estar entre 0 e 100%");
  });

  test("rejeita desconto maior que 100%", () => {
    expect(() => calcularDesconto(100, 150)).toThrow("Desconto deve estar entre 0 e 100%");
  });
});
```

**Características dos Testes Unitários:**

| Aspecto | Detalhes |
|---------|----------|
| **Velocidade** | Muito rápido (<100ms) — você pode rodar 1000 testes em 5 segundos |
| **Escopo** | Testa 1 função isolada, sem dependências externas |
| **Dificuldade** | Fácil de escrever — não precisa de setup complexo |
| **Confiabilidade** | Muito confiável — resultado é determinístico |
| **Cobertura** | Detecta bugs em lógica pura — muito útil |
| **Limitação** | Não testa integração com outras funções ou APIs |

**Ferramentas Populares:** Vitest, Jest, Jasmine

---

### 1.2 Testes de Integração — A Ponte

**O que é?** Testa MÚLTIPLOS COMPONENTES trabalhando JUNTOS. Verifica se as peças se encaixam corretamente.

**Analogia:** Depois de testar o parafuso, você testa o parafuso + a madeira + o módulo completo montado. Funciona tudo junto?

**Exemplo Real:**

```javascript
// Código a testar: formulário de login
describe("Fluxo de Login", () => {
  test("usuário pode fazer login com email e senha corretos", async () => {
    // 1. RENDER: renderizar o componente de login
    render(<LoginForm />);
    
    // 2. ACT: preencher formulário
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Senha");
    const submitButton = screen.getByRole("button", { name: /entrar/i });
    
    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "senha123" } });
    fireEvent.click(submitButton);
    
    // 3. ASSERT: verificar resultado
    // - API foi chamada com dados corretos?
    expect(mockFetch).toHaveBeenCalledWith("/api/login", {
      method: "POST",
      body: JSON.stringify({ email: "user@example.com", password: "senha123" })
    });
    
    // - Token foi armazenado em localStorage?
    await waitFor(() => {
      expect(localStorage.getItem("token")).toBe("abc123token");
    });
    
    // - Usuário foi redirecionado para dashboard?
    expect(window.location.pathname).toBe("/dashboard");
  });

  test("mostra erro se senha estiver incorreta", async () => {
    render(<LoginForm />);
    
    // ... preencher com senha errada ...
    
    // Verificar que mensagem de erro aparece
    await waitFor(() => {
      expect(screen.getByText(/senha incorreta/i)).toBeVisible();
    });
  });
});
```

**Características dos Testes de Integração:**

| Aspecto | Detalhes |
|---------|----------|
| **Velocidade** | Médio (100ms - 1s) — mais lento que unitários |
| **Escopo** | Testa 2+ componentes + interações reais |
| **Dificuldade** | Médio — precisa de setup de mocks e fixtures |
| **Confiabilidade** | Confiável — testa fluxos reais |
| **Cobertura** | Detecta bugs em integração e fluxos complexos |
| **Limitação** | Não testa o browser real ou ações do usuário |

**Ferramentas Populares:** Testing Library, React Test Renderer, Vitest

---

### 1.3 Testes E2E — O Teste Real

**O que é?** Testa a aplicação INTEIRA, do jeito que um USUÁRIO REAL usaria. Browser real, ações reais.

**Analogia:** Você entrega o móvel montado para o cliente usar por uma semana. Tudo funciona? Cadeira é confortável? Prateleira aguenta peso?

**Exemplo Real:**

```javascript
// Teste E2E com Playwright
describe("Fluxo de Login E2E", () => {
  test("usuário faz login e acessa dashboard", async ({ page }) => {
    // 1. NAVIGATE: ir para página de login (no browser real)
    await page.goto("https://app.example.com/login");
    
    // 2. FILL: preencher formulário
    await page.fill('input[name="email"]', "user@example.com");
    await page.fill('input[name="password"]', "senha123");
    
    // 3. SUBMIT: clicar botão (interação real)
    await page.click('button[type="submit"]');
    
    // 4. WAIT: esperar navegação para dashboard
    await page.waitForURL("https://app.example.com/dashboard");
    
    // 5. ASSERT: verificar conteúdo do dashboard
    await expect(page.locator("h1")).toContainText("Bem-vindo");
    
    // 6. INTERACT: fazer mais ações (como usuário faria)
    await page.click("text=Meu Perfil");
    await expect(page).toHaveURL("https://app.example.com/profile");
  });

  test("testes em diferentes browsers (Chrome, Firefox, Safari)", async () => {
    // Playwright roda mesmo teste em 3 browsers automaticamente
    // Se passar em todos, é realmente compatível!
  });
});
```

**Características dos Testes E2E:**

| Aspecto | Detalhes |
|---------|----------|
| **Velocidade** | Lento (5s - 30s por teste) — mas muito realista |
| **Escopo** | Testa aplicação INTEIRA em browser real |
| **Dificuldade** | Difícil — muito setup e network envolvido |
| **Confiabilidade** | Pode ser "flaky" (intermitente) — rede, timing |
| **Cobertura** | Testa tudo: UI, backend, integração, APIs reais |
| **Limitação** | Lento demais para rodar 1000 vezes |

**Ferramentas Populares:** Cypress, Playwright, Selenium, WebDriver

---

### 1.4 Comparação: Qual Usar Quando?

```
┌──────────────────────────────────────────────────────────────┐
│ QUANDO USAR CADA TIPO DE TESTE                               │
├──────────────────────┬──────────────────────────────────────┤
│ UNITÁRIO             │ INTEGRAÇÃO           │ E2E            │
├──────────────────────┼──────────────────────┼────────────────┤
│ Função pura          │ 2+ componentes       │ Fluxo completo │
│ Lógica de negócio    │ Interação entre      │ de usuário     │
│ Validação de entrada │ componentes          │                │
│ Cálculos matemáticos │ Com APIs mockadas    │ APIs reais     │
│                      │ Estados globais      │ Browser real   │
│                      │                      │ Múltiplos      │
│                      │                      │ browsers       │
└──────────────────────┴──────────────────────┴────────────────┘
```

**Exemplos de Decisão:**

| Cenário | Tipo | Por Quê? |
|---------|------|---------|
| Testar função `parseEmail()` | **Unitário** | Simples, rápido, determinístico |
| Testar fluxo: form → submit → API → tabela atualiza | **Integração** | Múltiplas partes, mas sem browser real |
| Testar: usuário faz login, navega, compra produto | **E2E** | Fluxo real, precisa de browser, rede, backend |
| Testar: botão de "Salvar" mostra "Salvo com sucesso" | **Integração** | Não precisa de browser real, mas testa DOM |
| Testar: cálculo de desconto com várias condições | **Unitário** | Pura lógica, sem dependências |

---

## 2. A PIRÂMIDE DE TESTES (30 min)

### 2.1 O Conceito

A "Pirâmide de Testes" é a proporção IDEAL de cada tipo de teste que você deve ter.

```
                    ▲
                   ╱ ╲
                  ╱   ╲         E2E (10%)
                 ╱     ╲        - Poucos
                ╱───────╲       - Lentos
               ╱         ╲      - Custosos
              ╱           ╲
             ╱─────────────╲    Integração (30%)
            ╱               ╲   - Médios
           ╱                 ╲  - Moderados
          ╱___________________╲
         ╱                     ╲ Unitários (60%)
        ╱                       ╲ - Muitos
       ╱_________________________╲ - Rápidos
                                  - Baratos
```

### 2.2 Por Quê Essa Proporção?

**UNITÁRIOS (60%)** — A Base Sólida
- ✅ Rápido: 1000 testes = 5 segundos
- ✅ Fácil de escrever: sem setup complexo
- ✅ Detecta bugs cedo: na lógica pura
- ✅ CI/CD rápido: feedback instantâneo
- ✅ Desenvolvimento mais rápido: escrever, testar, refatorar

**INTEGRAÇÃO (30%)** — Validando Conexões
- ✅ Testa fluxos reais: componentes juntos
- ✅ Pega bugs que unitários não pegam: communication bugs
- ✅ Moderadamente rápido: 100ms - 1s por teste
- ⚠️ Mais complexo que unitário: precisa de setup

**E2E (10%)** — A Última Linha de Defesa
- ✅ Testa TUDO: UI, backend, APIs, rede
- ✅ Fluxo real de usuário: como cliente usa
- ⚠️ LENTO: 5-30s por teste
- ⚠️ CARO: infraestrutura, manutenção
- ⚠️ FRÁGIL: pode ser intermitente

### 2.3 Exemplo Real: E-Commerce

**Projeto: Carrinho de compras com 30 testes**

```
ESTRUTURA IDEAL:
├─ Testes Unitários (60% = 18 testes)
│  ├─ calcularPreco() com descontos → 3 testes
│  ├─ validarEmail() → 2 testes
│  ├─ validarCartão() → 3 testes
│  ├─ aplicarCupom() → 4 testes
│  ├─ calcularFrete() → 3 testes
│  └─ formatarMoeda() → 2 testes
│
├─ Testes de Integração (30% = 9 testes)
│  ├─ Usuário adiciona produto → lista atualiza → 2 testes
│  ├─ Usuário aplica cupom → preço atualiza → 2 testes
│  ├─ Usuário muda endereço → frete recalcula → 2 testes
│  ├─ Múltiplos cupons: qual tem prioridade? → 2 testes
│  └─ Produto sai de estoque → mensagem aviso → 1 teste
│
└─ Testes E2E (10% = 3 testes)
   ├─ Usuário completa checkout começo a fim → 1 teste
   ├─ Usuário faz login, compra, recebe email → 1 teste
   └─ Carrinho persiste após logout/login → 1 teste
```

**Por que essa proporção funciona:**
- 18 unitários rodam em 1 segundo = feedback rápido
- 9 integração rodam em 3-5 segundos = feedback razoável
- 3 E2E rodam em 30-60 segundos = testa fluxos críticos
- **Total: ~1 minuto de testes no CI/CD** ✅

---

## 3. TÉCNICAS DE TESTE (30 min)

### 3.1 Caixa Preta (Funcional)

**O que é?** Você testa SEM SABER como o código funciona internamente. Só testa o comportamento externo.

**Analogia:** Testar um forno. Você coloca bolo, ajusta temperatura, espera. Não se importa se tem resistência ou gás dentro — só quer saber se assa o bolo.

**Exemplo:**

```javascript
// Você NÃO sabe se internamente usa if/switch/ternário
// Você só testa: dado X input, qual é o output esperado?

function classificarIdade(idade) {
  // Implementação interna (você não precisa saber)
  if (idade < 13) return "criança";
  if (idade < 18) return "adolescente";
  return "adulto";
}

// Teste de Caixa Preta: testa comportamento, não implementação
describe("classificarIdade - Caixa Preta", () => {
  test("idade 10 → criança", () => {
    expect(classificarIdade(10)).toBe("criança");
  });
  
  test("idade 15 → adolescente", () => {
    expect(classificarIdade(15)).toBe("adolescente");
  });
  
  test("idade 30 → adulto", () => {
    expect(classificarIdade(30)).toBe("adulto");
  });
});
```

**Vantagens:**
- ✅ Não depende da implementação
- ✅ Refactoring seguro: se comportamento igual, teste passa
- ✅ Testa o que importa: resultado final

**Quando usar:** Na maioria das vezes! 80% dos seus testes devem ser assim.

---

### 3.2 Caixa Branca (Estrutural)

**O que é?** Você SABE a implementação interna e testa todos os caminhos do código.

**Analogia:** Testar o forno sabendo que tem resistência. Você testa:
- Resistência acende?
- Termostato funciona?
- Timer toca no tempo correto?

**Exemplo:**

```javascript
// Caixa Branca: testa COMO o código funciona
function calcularPrecoFinal(preco, cupom) {
  let desconto = 0;
  
  // Caminho 1: sem cupom
  if (!cupom) {
    return preco;
  }
  
  // Caminho 2: cupom inválido
  if (!cupom.ativo) {
    return preco;
  }
  
  // Caminho 3: cupom válido
  desconto = preco * (cupom.percentual / 100);
  if (desconto > cupom.maxDesconto) {
    desconto = cupom.maxDesconto;
  }
  
  return preco - desconto;
}

describe("calcularPrecoFinal - Caixa Branca", () => {
  // Teste CADA CAMINHO do código
  
  test("Caminho 1: sem cupom → retorna preço normal", () => {
    expect(calcularPrecoFinal(100, null)).toBe(100);
  });
  
  test("Caminho 2: cupom inativo → retorna preço normal", () => {
    const cupom = { ativo: false, percentual: 10 };
    expect(calcularPrecoFinal(100, cupom)).toBe(100);
  });
  
  test("Caminho 3: cupom válido → aplica desconto", () => {
    const cupom = { ativo: true, percentual: 10, maxDesconto: Infinity };
    expect(calcularPrecoFinal(100, cupom)).toBe(90);
  });
  
  test("Caminho 4: desconto excede máximo → limita", () => {
    const cupom = { ativo: true, percentual: 50, maxDesconto: 20 };
    expect(calcularPrecoFinal(100, cupom)).toBe(80); // Não 50!
  });
});
```

**Vantagens:**
- ✅ Testa TODOS os caminhos do código
- ✅ Detecta bugs em edge cases
- ✅ Garante cobertura de código

**Desvantagens:**
- ❌ Quebra se refatorar a implementação
- ❌ Mais testes necessários
- ❌ Depende de conhecimento interno

**Quando usar:** ~20% dos testes. Bom para lógica crítica com muitos caminhos.

---

## 4. TIPOS POR CARACTERÍSTICA (20 min)

### 4.1 Teste de Funcionalidade

**Pergunta:** "O app faz o que deveria fazer?"

```javascript
// Testa que login FUNCIONA
test("usuário pode fazer login com email e senha", async () => {
  const resultado = await fazerLogin("user@example.com", "senha123");
  expect(resultado.sucesso).toBe(true);
  expect(resultado.usuario.id).toBe(123);
});
```

---

### 4.2 Teste de Usabilidade

**Pergunta:** "O usuário consegue usar sem se perder?"

```javascript
// Testa que UI é intuitiva
test("botão de login é fácil de encontrar", () => {
  render(<LoginPage />);
  const botao = screen.getByRole("button", { name: /entrar/i });
  expect(botao).toBeVisible(); // Visível, não escondido
});
```

---

### 4.3 Teste de Confiabilidade

**Pergunta:** "O app se quebra sob stress?"

```javascript
// Testa que app aguenta 1000 usuários simultâneos
test("carrinho aguenta 100 adições simultâneas", async () => {
  const promessas = Array(100)
    .fill(null)
    .map(() => adicionarAoCarrinho(1));
  
  const resultados = await Promise.all(promessas);
  expect(resultados.every(r => r.sucesso)).toBe(true);
});
```

---

### 4.4 Teste de Desempenho

**Pergunta:** "Carrega rápido?"

```javascript
// Testa que página carrega < 2 segundos
test("dashboard carrega em menos de 2s", async () => {
  const inicio = performance.now();
  render(<Dashboard />);
  await waitFor(() => screen.getByText("Bem-vindo"));
  const tempo = performance.now() - inicio;
  
  expect(tempo).toBeLessThan(2000); // 2 segundos
});
```

---

### 4.5 Teste de Manutenibilidade

**Pergunta:** "Fácil mudar o código sem quebrar?"

```javascript
// Testa que refatoração não quebra comportamento
// Se mudar implementação, mas comportamento igual, teste passa
test("desconto de 10% continua funcionando após refactor", () => {
  expect(calcularDesconto(100, 10)).toBe(90);
  // Implementação pode mudar, mas resultado deve ser igual
});
```

---

## 5. STLC — SOFTWARE TESTING LIFE CYCLE (20 min)

O STLC é o ciclo de vida de testes. Tem 5 fases:

### Fase 1: PLANEJAMENTO (Semana 1)

**O que fazer?**
- Ler requisitos do projeto
- Definir: "O que vamos testar?"
- Estimar: "Quanto tempo vai levar?"
- Planejar: "Que recursos precisamos?"

**Exemplo:**
```
Projeto: Carrinho de compras
Requisitos:
- Usuário adiciona produtos
- Sistema calcula preço com impostos
- Cupom de desconto funciona
- Frete é calculado

Planejamento:
- Vamos fazer: 60% unitário, 30% integração, 10% E2E
- Tempo estimado: 40 horas de testes
- Ferramentas: Vitest, Testing Library, Cypress
```

---

### Fase 2: DESIGN (Semana 1)

**O que fazer?**
- Criar casos de teste (TC-001, TC-002, etc)
- Definir dados de teste
- Planejar fixtures e mocks

**Exemplo:**
```
TC-001: Adicionar produto ao carrinho
Pré-requisito: Usuário logado
Passos:
  1. Clicar no produto "Notebook"
  2. Clicar em "Adicionar ao Carrinho"
Resultado esperado:
  - Carrinho atualiza com 1 item
  - Preço total = R$ 2.999,00

TC-002: Aplicar cupom válido
Pré-requisito: Carrinho com R$ 100
Passos:
  1. Clicar em "Adicionar Cupom"
  2. Digitar "DESCONTO10"
  3. Clicar em "Aplicar"
Resultado esperado:
  - Preço atualiza para R$ 90,00
  - Economia mostrada: R$ 10,00
```

---

### Fase 3: EXECUÇÃO (Semana 2)

**O que fazer?**
- Escrever os testes
- Rodar os testes
- Registrar falhas

**Exemplo:**
```javascript
// ESCREVER
describe("Carrinho", () => {
  test("TC-001: Adicionar produto", () => {
    render(<App />);
    fireEvent.click(screen.getByText("Notebook"));
    fireEvent.click(screen.getByText("Adicionar ao Carrinho"));
    expect(screen.getByText("1 item no carrinho")).toBeVisible();
  });
});

// RODAR
npm test

// RESULTADO
PASS  Carrinho
  ✓ TC-001: Adicionar produto (45ms)
  ✓ TC-002: Aplicar cupom válido (52ms)
  ✗ TC-003: Aplicar cupom inválido (failed)
    → Erro: "Cupom não reconhecido"
```

---

### Fase 4: MONITORAÇÃO (Contínuo)

**O que fazer?**
- Acompanhar progresso
- Registrar métricas
- Alertar sobre bloqueios

**Exemplo:**
```
Status de Testes (Today, 14:00)
✓ Testes Unitários: 120/120 passing (100%)
✓ Testes Integração: 25/30 passing (83%)
✗ Testes E2E: 2/3 passing (67%)

Bloqueados:
- TC-003: Cupom inválido (Dev bloqueado: não verifica cupom)
- TC-E2E-02: Login flaky (rede intermitente)

Recomendação: Esperar Dev corrigir TC-003
```

---

### Fase 5: AVALIAÇÃO (Fim)

**O que fazer?**
- Analisar resultados
- Escrever relatório
- Documentar lições aprendidas

**Exemplo:**
```
RELATÓRIO FINAL DE TESTES

Testes Executados: 148
Testes Passando: 145 (98%)
Testes Falhando: 3 (2%)
Taxa de Defeitos: 2%

BUGS ENCONTRADOS:
1. Cupom inválido não gera erro (Severidade: Alta)
2. Login intermitente em rede lenta (Severidade: Média)
3. Formatação de moeda com centavos (Severidade: Baixa)

COBERTURA: 87% de linhas testadas

CONCLUSÃO: Pronto para produção após correção dos 3 bugs
```

---

## 6. AUTOGESTÃO E AUTOMAÇÃO (15 min)

### 6.1 Autogestão

**O que é?** Responsabilidade de se organizar e executar testes SEM ficar esperando alguém mandar.

**Como aplicar:**
- ✅ Ler especificação ANTES de codificar
- ✅ Fazer sua lista de testes (TC-001, TC-002...)
- ✅ Revisar seus testes antes de enviar
- ✅ Documentar o que testou
- ✅ Executar testes regularmente (diariamente)

**Checklist de Autogestão:**
```
☐ Li os requisitos completamente?
☐ Fiz lista de todos os cenários a testar?
☐ Criei casos de teste detalhados?
☐ Executei testes antes de enviar PR?
☐ Documentei quais testes criei?
☐ Revisei logs de falha?
☐ Comunicai bloqueios ao time?
```

---

### 6.2 Automação

**O que é?** Escrever código que TESTA código, em vez de testar manualmente.

**Comparação:**

| Tipo | Tempo | Repetições | Confiabilidade |
|------|-------|-----------|----------------|
| **Manual** | 100 cliques = 5 min | 1x por semana | ⚠️ Erros humanos |
| **Automado** | 100 testes = 30s | 100x por dia | ✅ Sempre igual |

**Exemplo:**

```javascript
// MANUAL (5 minutos cada vez)
// 1. Abrir app
// 2. Clicar login
// 3. Digitar email
// 4. Digitar senha
// 5. Clicar entrar
// 6. Verificar se aparece "Bem-vindo"
// 7. Repetir para cada teste = MUITO TEMPO

// AUTOMADO (30 segundos para 100 testes)
test("login funciona", () => {
  render(<LoginForm />);
  fireEvent.change(screen.getByLabelText("Email"), { target: { value: "user@test.com" } });
  fireEvent.change(screen.getByLabelText("Senha"), { target: { value: "123456" } });
  fireEvent.click(screen.getByRole("button", { name: /entrar/i }));
  expect(screen.getByText("Bem-vindo")).toBeVisible();
});

// Rodar: npm test
// Resultado: ✓ login funciona (45ms)
```

**Benefícios da Automação:**

| Benefício | Impacto |
|-----------|---------|
| **Velocidade** | 100 testes = 5 min → 30s (10x mais rápido) |
| **Repetibilidade** | Rodar mesmos testes 10 vezes por dia sem cansaço |
| **Confiabilidade** | Sem erro humano (clicar no lugar errado, etc) |
| **CI/CD** | Rodar testes automaticamente a cada commit |
| **Regression** | Descobrir bugs que antigas mudanças causaram |
| **Confiança** | Fazer refactor com certeza que não quebrou nada |

---

## 7. MÉTRICAS DE QUALIDADE (10 min)

### 7.1 Cobertura de Testes

**O que é?** Porcentagem do código que foi EXECUTADO por testes.

```javascript
// Código
function calcularPreco(preco, temDesconto) {
  let total = preco;
  if (temDesconto) {
    total = total * 0.9; // 10% desconto
  }
  return total;
}

// Teste que só testa com desconto
test("desconto de 10%", () => {
  expect(calcularPreco(100, true)).toBe(90);
});

// COBERTURA: 50% (falta testar a linha: total = preco)
```

**Meta realista:** 70-80% de cobertura

```
0-30% cobertura  → ❌ Muito baixo, muitos bugs passam
30-50% cobertura → ⚠️ Aceitável, mas fraco
50-70% cobertura → ✅ Bom
70-90% cobertura → ✅ Excelente
90%+ cobertura   → ⚠️ Pode ser overkill (diminishing returns)
```

---

### 7.2 Taxa de Defeitos

**O que é?** Quantos bugs chegam a PRODUÇÃO (seu app ao vivo).

**Fórmula:**
```
Taxa de Defeitos = (Bugs em produção / Total de bugs) × 100%

Exemplo:
- Total de bugs encontrados: 100
- Bugs encontrados em teste: 95
- Bugs que chegaram a produção: 5
- Taxa: (5/100) × 100% = 5%

Meta: < 5% (ou seja, pegar 95% dos bugs antes de produção)
```

**Por que importa?**
- 0% taxa → Todos os bugs foram pegos em teste (impossível, mas ideal)
- 5% taxa → Bom, a maioria dos bugs foi pega
- 20% taxa → Ruim, testes não são efetivos
- 50%+ taxa → Crítico, testes não servem para nada

---

## 8. CASO REAL: REVOLUT PAGOU 200K POR BUG (10 min)

**Situação:**
- Revolut (app de banco)
- 2018, transferência internacional
- Cliente transferiu 200 mil

**O Bug:**
```
Validação incorreta em transferência internacional
Se valor > limite do dia → deveria REJEITAR
Mas código tinha lógica errada:

❌ CÓDIGO COM BUG:
if (valor < limiteMax) {  // ← Usa < quando deveria ser >
  aplicarTaxa();
}

✅ CÓDIGO CORRETO:
if (valor > limiteMax) {  // Agora está certo
  aplicarTaxa();
}
```

**O Que Aconteceu:**
1. Cliente tenta transferir 200 mil (excede limite)
2. Validação falha (bug não detecta)
3. Transferência é processada 2x (bug de duplicação)
4. Conta perde 400 mil em vez de 200 mil
5. Descobre-se 1 semana depois (já foi para banco exterior)

**Impacto:**
- 💰 Revolut perdeu: 200 mil
- ⏰ Tempo de debug: 2 semanas
- 😤 Cliente muito insatisfeito
- 📰 Notícia negativa na mídia

**E Se Tivessem Testes?**

```javascript
// Teste E2E: 5 minutos para escrever
describe("Limite diário de transferência", () => {
  test("rejeita transferência acima do limite", async () => {
    const resultado = await transferirInternacional(200000);
    expect(resultado.sucesso).toBe(false);
    expect(resultado.erro).toContain("Excede limite diário");
  });
});

// Teste executado: ✗ FALHA (encontra o bug)
// Bug corrigido ANTES de produção
// Cliente nunca perde dinheiro
```

**Lição:**
- ✅ Um teste E2E teria pego esse bug em 5 minutos
- ✅ Economizaria 200 mil
- ✅ Evitaria 2 semanas de debug
- ✅ ROI: infinito

**Conclusão:** Investir em testes é MUITO mais barato do que arcar com bugs em produção.

---

## 🎬 ATIVIDADES PRÁTICAS (60 min)

### Atividade 1: Classificar Tipos de Teste (20 min)

**Objetivo:** Você consegue reconhecer quando usar U/I/E2E?

**Cenários:**

1. Testar que função `validarEmail()` rejeita "invalid@email"
   - [ ] Unitário  [ ] Integração  [ ] E2E
   - Por quê? _______________

2. Testar fluxo: usuário clica "Comprar" → API é chamada → tabela atualiza
   - [ ] Unitário  [ ] Integração  [ ] E2E
   - Por quê? _______________

3. Testar que usuário consegue fazer checkout INTEIRO no browser real
   - [ ] Unitário  [ ] Integração  [ ] E2E
   - Por quê? _______________

4. Testar que `calcularFrete(10, "SP")` retorna 15.50
   - [ ] Unitário  [ ] Integração  [ ] E2E
   - Por quê? _______________

5. Testar que 3 componentes (header + cart + checkout) trabalham juntos
   - [ ] Unitário  [ ] Integração  [ ] E2E
   - Por quê? _______________

**Respostas:**
1. **Unitário** — Função isolada, sem dependências
2. **Integração** — Múltiplos componentes (DOM), mas sem browser real
3. **E2E** — Fluxo completo no browser real
4. **Unitário** — Cálculo puro, sem side effects
5. **Integração** — Múltiplos componentes juntos

---

### Atividade 2: Desenhar Pirâmide para Projeto Real (30 min)

**Projeto: Sistema de Pedidos**

Requisitos:
- Usuário cria pedido
- Pedido vai para fila
- Admin processa pedido
- Email é enviado ao cliente
- Relatório é gerado

**Tarefa (em duplas):**

1. Listar todos os testes que PRECISAM ser feitos
2. Classificar cada um como U/I/E2E
3. Desenhar a pirâmide resultante
4. Contar: quantos de cada tipo?

**Exemplo de Resposta:**

```
UNITÁRIOS (60% = 18 testes):
- validarPedido() com dados incompletos → 2
- calcularTotal() com múltiplos items → 3
- aplicarDesconto() com várias regras → 3
- validarEmailCliente() → 2
- formatarData() → 2
- etc...

INTEGRAÇÃO (30% = 9 testes):
- Usuário cria pedido → fila recebe → 1
- Admin processa → email enviado → 1
- Relatório gerado com dados corretos → 1
- etc...

E2E (10% = 3 testes):
- Usuário completo: criar → processar → relatório → 1
- Admin workflow completo → 1
- Duas sessões simultâneas → 1
```

---

### Atividade 3: Discussão — Custo de Bug (15 min)

**Pergunta para discussão (em grupo):**

"Um bug foi encontrado em 3 momentos diferentes. Qual é o custo em cada um?"

1. **Durante Desenvolvimento** (dev criando teste)
   - Tempo para arrumar: 5 minutos
   - Custo: Muito baixo

2. **Durante Code Review** (colega encontra)
   - Tempo para arrumar: 30 minutos (entender contexto, discutir abordagem)
   - Custo: Baixo

3. **Durante Testes** (QA encontra)
   - Tempo para arrumar: 2 horas (dev parou outra tarefa, entrou novamente)
   - Custo: Médio

4. **Em Produção** (Cliente encontra)
   - Tempo para arrumar: 1 semana (emergência, chamada noturna, hotfix, rollback)
   - Custo: ALTÍSSIMO
   - Impacto: Reputação, clientes insatisfeitos, perda de dados

**Gráfico de Custo:**

```
         Custo
         ▲
    1000%│                    ■
         │                 ■  ■
         │              ■     ■
         │           ■        ■
         │        ■           ■
         │     ■              ■
         │  ■                 ■
         │■                   ■
         └────────────────────────── Tempo
         Dev  Code-  Testes  Prod
             Review
```

**Conclusão:** Quanto MAIS CEDO encontrar o bug, MAIS BARATO sai.

Por isso os testes unitários (encontram rápido) são tão importantes!

---

## ✅ CHECKLIST DE APRENDIZADO

Ao final desta aula, você deve conseguir:

- [ ] **Explicar** os 3 tipos principais de teste (Unitário, Integração, E2E)
- [ ] **Diferenciar** quando usar cada tipo
- [ ] **Desenhar** a Pirâmide de Testes e explicar por quê
- [ ] **Reconhecer** testes de Caixa Preta vs Caixa Branca
- [ ] **Descrever** as 5 fases do STLC (Planejamento, Design, Execução, Monitoração, Avaliação)
- [ ] **Calcular** Taxa de Defeitos com números reais
- [ ] **Argumentar** por quê automação é melhor que manual
- [ ] **Aplicar** em exercícios: classificar testes por tipo

---

## 📚 REFERÊNCIAS E LEITURA ADICIONAL

- Uncle Bob: "Clean Code" — Capítulo sobre Testes
- Kent Beck: "Test Driven Development: By Example"
- Google: "Just Say No to More End-to-End Tests"
- James Bach: "Rapid Software Testing"

---

**Versão:** 2.0 EXPANDIDA | **Status:** ✅ Pronto para 4-5 Horas de Aula | **SENAI 2026**
