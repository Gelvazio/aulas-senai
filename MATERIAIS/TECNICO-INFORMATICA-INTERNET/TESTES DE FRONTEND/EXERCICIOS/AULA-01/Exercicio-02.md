# EXERCÍCIO 02 — Aula 01: Desenhar Pirâmide de Testes

**Duração:** 45 minutos (25 min trabalho + 20 min apresentação/discussão)  
**Dificuldade:** ⭐⭐ Médio  
**Formato:** Duplas  
**Objetivo:** Internalizar proporção ideal de testes e planejamento estratégico  

---

## 📋 INSTRUÇÃO

**Em duplas**, escolham UM dos projetos abaixo. Vocês devem:

1. Entender o contexto do projeto
2. Identificar tipos de testes necessários
3. **Desenhar a Pirâmide de Testes** com números reais
4. Justificar cada número
5. Apresentar para turma (5 min)

**Tempo:**
- Compreensão do projeto: 5 min
- Design da pirâmide: 15 min
- Apresentação: 5 min

---

## 🎯 ESCOLHA DO PROJETO

### Opção A: E-COMMERCE (Loja Online)

**Descrição:**
Aplicação web para comprar produtos online:
- Homepage com catálogo
- Busca/filtros
- Carrinho de compras
- Checkout com múltiplos passos
- Pagamento (Stripe)
- Confirmação de pedido
- Email de confirmação

**Funcionalidades a Testar:**

| Funcionalidade | Complexidade | Crítico? |
|---|---|---|
| Busca de produtos | Média | Sim |
| Adicionar ao carrinho | Média | Sim |
| Validação de form checkout | Baixa | Sim |
| Cálculo de total + impostos | Baixa | Sim |
| Processamento de pagamento | Alta | Crítico |
| Envio de email | Média | Sim |
| Atualizar quantidade no carrinho | Baixa | Não |
| Remover do carrinho | Baixa | Não |
| Mostrar histórico de pedidos | Média | Não |

---

### Opção B: DASHBOARD DE ANALYTICS

**Descrição:**
Painel para visualizar dados de vendas:
- Login de usuário
- Página com gráficos
- Filtros por período
- Exportar dados (CSV, PDF)
- Alertas de limite
- Comparação período anterior

**Funcionalidades a Testar:**

| Funcionalidade | Complexidade | Crítico? |
|---|---|---|
| Autenticação login | Alta | Crítico |
| Carregar gráficos | Média | Sim |
| Filtrar por data | Média | Sim |
| Cálculos (média, total, % crescimento) | Baixa | Sim |
| Exportar CSV | Média | Não |
| Alertas quando limite atingido | Alta | Crítico |
| Responsividade mobile | Média | Sim |
| Performance (carrega em <3s) | Alta | Crítico |

---

### Opção C: APLICATIVO DE TAREFAS

**Descrição:**
Sistema simples de gerenciar tarefas (TODO):
- Criar tarefa
- Editar tarefa
- Marcar como concluída
- Deletar tarefa
- Filtrar (ativas, concluídas, todas)
- Persistir em localStorage
- Dark/Light mode

**Funcionalidades a Testar:**

| Funcionalidade | Complexidade | Crítico? |
|---|---|---|
| Criar tarefa | Baixa | Sim |
| Editar tarefa | Baixa | Sim |
| Marcar como concluída | Baixa | Sim |
| Deletar tarefa | Baixa | Sim |
| Filtro de estado | Média | Não |
| Persistência localStorage | Média | Sim |
| Dark mode toggle | Baixa | Não |
| Validação de input vazio | Baixa | Sim |
| Limpar concluídas | Baixa | Não |

---

## 🎨 TEMPLATE: DESENHE SUA PIRÂMIDE

**Use este template (em papel ou digital):**

```
                    ▲
                   / \
                  /E2E \
                 /  ?   \  ← Quantos testes E2E?
                /________\
               /Integração\
              /      ?      \ ← Quantos testes Integração?
             /______________\
            /    Unitários    \
           /         ?         \ ← Quantos testes Unitários?
          /____________________\

Explicação para cada nível:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

UNITÁRIOS (?):
  • Justificativa:
  • Exemplos:

INTEGRAÇÃO (?):
  • Justificativa:
  • Exemplos:

E2E (?):
  • Justificativa:
  • Exemplos:
```

---

## 📊 REFERÊNCIA: PROPORÇÃO PADRÃO

**Lembrança do Google/Industry Standard:**

```
        ▲
       /E2E \
      /  10%  \ = 2-3 testes (ex: 48 total = 5 E2E)
     /________\
    /Integração\
   /    30%     \ = 14-15 testes (ex: 48 total = 15 I)
  /______________\
 /    Unitários    \
/      60%          \ = 28-30 testes (ex: 48 total = 28 U)
/____________________\
```

**Fórmula:**
- Se projeto tem 50 testes:
  - Unitários: 50 × 0.60 = 30
  - Integração: 50 × 0.30 = 15
  - E2E: 50 × 0.10 = 5

---

## 💡 PERGUNTAS GUIA

Responda estas perguntas para ajudar a decidir números:

### Para Unitários:
- "Quantas funções e lógicas isoladas preciso testar?"
- "Exemplo: Calcular impostos, validar email, formatar data"
- **Resposta esperada:** MUITOS (30-50)

### Para Integração:
- "Quantas interações entre componentes?"
- "Exemplo: Form → API, Gráfico recebe dados, Modal abre/fecha"
- **Resposta esperada:** MÉDIO (10-20)

### Para E2E:
- "Quantos fluxos críticos do usuário?"
- "Exemplo: Login → compra → email, admin cria produto"
- **Resposta esperada:** POUCOS (2-5)

---

## ✅ EXEMPLO DE RESPOSTA (E-COMMERCE)

### Projeto: E-Commerce

```
                    ▲
                   / \
                  / 3  \  ← 3 testes E2E
                 /______\
                /   9    \  ← 9 testes Integração
               /__________\
              /     18      \ ← 18 testes Unitários
             /______________\

Total: 30 testes

UNITÁRIOS (18 testes = 60%):
  • Validação de email
  • Cálculo de preço com desconto
  • Cálculo de imposto
  • Formato de moeda (R$ 100,00)
  • Validação CPF
  • Validação de cartão (números)
  • Geração de número pedido
  • Hash de senha
  • Validação cep
  • Cálculo de frete
  • ... (mais 8)

INTEGRAÇÃO (9 testes = 30%):
  • Form checkout → validação → habilitação do botão
  • Adicionar item ao carrinho → atualizar total → exibir
  • Remover do carrinho → recalcular total
  • Aplicar cupom desconto → recalcular preço
  • Selecionar método pagamento → mostrar campos
  • Preenchimento de endereço → buscar cep (API)
  • Filtro de produtos → API buscar

E2E (3 testes = 10%):
  • Usuário novo: busca → compra → confirmação
  • Usuário retorna: login → compra → confirmação
  • Admin: criar produto → listar → editar → deletar
```

---

## 🎯 CRITÉRIOS DE AVALIAÇÃO

**A pirâmide está BOM se:**

- [x] Tem proporção 60/30/10 (± 5%)
- [x] Unitários > Integração > E2E (quantidade)
- [x] Cada nível tem justificativa clara
- [x] Exemplos fazem sentido com projeto
- [x] Explicação é apresentável

**Proporcionalidade aceita:**
- ✅ 55/35/10 (um pouco mais integração)
- ✅ 65/25/10 (um pouco mais unitário)
- ❌ 30/60/10 (inverteu = errado!)

---

## 📝 INSTRUÇÕES PARA APRESENTAÇÃO

Cada dupla tem **5 minutos** para:

1. **Apresentar projeto** (30 segundos)
   - "Escolhemos e-commerce"
   - "30 testes no total"

2. **Mostrar pirâmide** (1 min)
   - Levante cartaz/mostre desenho
   - "18 unitários, 9 integração, 3 E2E"

3. **Justificar números** (2 min)
   - "Unitários porque muitas validações/cálculos"
   - "Integração porque formulários complexos"
   - "E2E porque fluxo de compra é crítico"

4. **Exemplos** (1 min)
   - "Unitário: testar cálculo de imposto"
   - "Integração: form → validação → habilitação botão"
   - "E2E: usuário faz login → compra → email"

---

## 🎤 PERGUNTAS PROFESSOR PODE FAZER

Depois de cada apresentação:

1. "Por que não 10 E2E em vez de 3?"
   - Resposta esperada: "Porque E2E são lentos e caros"

2. "Por que não 5 unitários em vez de 18?"
   - Resposta esperada: "Porque muita lógica precisa de teste"

3. "Algum teste que não colocou e deveria?"
   - Abre discussão sobre cobertura

---

## 💾 O QUE ENTREGAR

**Cada dupla entrega:**

1. **Desenho da Pirâmide** (papel ou digital)
   - Legível
   - Com números
   - Com justificativas escritas

2. **Apresentação Oral** (durante aula)
   - Fale alto
   - Justifique decisões
   - Responda perguntas

---

## 🏆 RESULTADO ESPERADO

**Ao final, você será capaz de:**

- ✅ Estimar quantidade de testes por tipo
- ✅ Justificar proporção 60/30/10
- ✅ Planejar estratégia de teste para novo projeto
- ✅ Entender trade-offs (mais E2E = mais caro)

---

## 💡 DICA FINAL

**Se ficar em dúvida sobre quantidade:**

Comece com a **proporção padrão**:
- Se projeto tem N funcionalidades:
  - Unitários: N × 1.5 = quantidade de testes
  - Integração: N × 0.5
  - E2E: N × 0.1 a 0.2

**Exemplo:**
- E-commerce tem 9 funcionalidades
- Unitários: 9 × 1.5 = 13-15 (coloquei 18, OK)
- Integração: 9 × 0.5 = 4-5 (coloquei 9, mais, mas OK)
- E2E: 9 × 0.1 = 1 (coloquei 3, OK)

---

**Fim do Exercício 02**

*Dificuldade: Médio*  
*Tempo: 45 min*  
*Conceito: Pirâmide de Testes*  
*Formato: Duplas + Apresentação*
