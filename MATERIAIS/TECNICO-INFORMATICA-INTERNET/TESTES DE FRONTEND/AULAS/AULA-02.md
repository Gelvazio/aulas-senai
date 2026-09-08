# AULA 02: Conceitos Fundamentais e Planejamento de Testes

**Carga Horária:** 4 horas  
**Módulo:** ESPECÍFICO I  
**Unidade Curricular:** Testes de Frontend  
**Competência:** Planejar e estruturar testes sistematicamente  
**Pré-requisito:** Aula 01 — Fundamentos de Testes

---

## 🎯 OBJETIVOS DA AULA

Ao final desta aula, você será capaz de:

- ✅ Diferenciar verificação de validação
- ✅ Reconhecer especificações técnicas de interface
- ✅ Criar plano de testes estruturado
- ✅ Definir casos de teste com clareza
- ✅ Documentar requisitos de teste apropriadamente
- ✅ Planejar estratégia de teste para novo projeto

---

## 📊 SLIDE 1: Bem-vindo à Aula 02

**Tópico:** Transição de Conceitos para Prática

### Conteúdo

**Na Aula 01 aprendemos:**
- ✅ Tipos de testes (unitário, integração, E2E)
- ✅ Pirâmide de testes (60/30/10)
- ✅ STLC (7 fases)
- ✅ Métricas de qualidade

**Hoje vamos aprender:**
- 📋 Como PLANEJAR testes
- 📋 Como estruturar planos
- 📋 Como documentar casos de teste
- 📋 Como comunicar com desenvolvimento

**Por que planeja‌r é crítico?**

> "Falha no planejamento = planejamento para falhar"

Projeto sem plano de testes:
- ❌ Testa coisas erradas
- ❌ Deixa bugs passarem
- ❌ Tempo desperdiçado
- ❌ Falta de rastreabilidade

Projeto COM plano de testes:
- ✅ Cobertura sistemática
- ✅ Menos bugs em produção
- ✅ Eficiência garantida
- ✅ Documentação completa

---

## 📊 SLIDE 2: Verificação vs Validação

**Tópico:** Conceitos Fundamentais

### Conteúdo

**2 Conceitos Essenciais:**

```
VERIFICAÇÃO ≠ VALIDAÇÃO

┌──────────────────────────────────────┐
│ VERIFICAÇÃO                          │
├──────────────────────────────────────┤
│ "Product desenvolvido CORRETAMENTE?" │
│                                      │
│ • Foco: COMO foi feito               │
│ • Pergunta: Segue especificações?    │
│ • Teste: Unitário + Integração       │
│ • Responsável: Desenvolvedor         │
│                                      │
│ Exemplo: Função calcula corretamente?
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│ VALIDAÇÃO                            │
├──────────────────────────────────────┤
│ "PRODUTO CORRETO foi desenvolvido?"  │
│                                      │
│ • Foco: O QUE foi feito              │
│ • Pergunta: Atende requisitos?       │
│ • Teste: Integração + E2E            │
│ • Responsável: QA/Tester             │
│                                      │
│ Exemplo: Usuário consegue fazer login?
└──────────────────────────────────────┘
```

**Analogia:**

Construir uma casa:
- **Verificação:** Cimento foi misturado corretamente? Fundação segue especificação?
- **Validação:** Esta é a casa que cliente pediu? Atende necessidades?

**Na prática:**

```
Dev escreve código
  ↓
Dev verifica (testes unitários): "Código está correto?"
  ↓
QA valida (testes E2E): "Funciona como esperado?"
  ↓
Usuário usa em produção: "É exatamente o que eu queria?"
```

---

## 📊 SLIDE 3: Especificações Técnicas de Interface

**Tópico:** Lendo Requisitos

### Conteúdo

**Documento de Especificações:**

Antes de testar, você PRECISA entender:

1. **Requisitos Funcionais (O QUE fazer)**
   - "Botão 'Login' deve enviar credentials para API"
   - "Form deve validar email antes de submeter"
   - "Página deve carregar em <3 segundos"

2. **Requisitos Não-Funcionais (COMO fazer)**
   - "Suportar IE11+ e Chrome moderno"
   - "Funcionar com <100ms latência"
   - "Acessibilidade WCAG 2.1 Level AA"

3. **Critérios de Aceitação (Quando pronto)**
   - "Dado: usuário com credenciais válidas"
   - "Quando: clica botão 'Login'"
   - "Então: redireciona para dashboard"

**Exemplo Real — Feature: "Login Social Google"**

```
REQUISITO FUNCIONAL:
• Botão "Login com Google" deve abrir modal de seleção Google
• Após autenticação, usuário deve ser redirecionado para dashboard
• Dados do usuário (name, email) devem ser salvos no banco

REQUISITO NÃO-FUNCIONAL:
• Deve funcionar em Chrome, Safari, Firefox mobile/desktop
• Redirecionamento deve ocorrer em <2s
• Página deve ter score Lighthouse >80

CRITÉRIOS DE ACEITAÇÃO:
Given: usuário não autenticado
When: clica "Login com Google"
Then: modal Google abre
And: após autenticação, usuário vê dashboard
And: email apareça no perfil do usuário
```

---

## 📊 SLIDE 4: Plano de Testes — Estrutura

**Tópico:** Documento Formal

### Conteúdo

**Um Plano de Testes FORMAL tem:**

```
1. INFORMAÇÕES GERAIS
   ├─ Identificação do projeto
   ├─ Data de início/fim
   └─ Responsáveis (QA, Dev, PM)

2. ESCOPO
   ├─ O QUE será testado
   ├─ O QUE NÃO será testado
   └─ Justificativa

3. ESTRATÉGIA
   ├─ Tipos de testes (unitário, integração, E2E)
   ├─ Proporção (60/30/10)
   ├─ Ferramentas (Jest, Playwright)
   └─ Cronograma

4. CASOS DE TESTE
   ├─ Identificação (TC-001, TC-002)
   ├─ Descrição
   ├─ Passos
   ├─ Resultado esperado
   └─ Pré-requisitos

5. MÉTRICAS
   ├─ Cobertura esperada (≥70%)
   ├─ Taxa de defeitos aceitável (<5%)
   └─ Critério de sucesso

6. RISCOS E CONTINGÊNCIAS
   ├─ Riscos identificados
   ├─ Impacto
   └─ Plano B
```

**Tamanho esperado:**
- Projeto pequeno (5 features): 5-10 páginas
- Projeto médio (20 features): 20-30 páginas
- Projeto grande (100+ features): 50+ páginas

---

## 📊 SLIDE 5: Casos de Teste — Como Escrever

**Tópico:** Especificação Técnica

### Conteúdo

**Formato Padrão:**

```
CASO DE TESTE: TC-001
┌─────────────────────────────────────────────┐
│ ID: TC-001                                  │
│ Título: "Login com email e senha válidos"   │
│                                             │
│ PRÉ-REQUISITOS:                             │
│ • Usuário tem conta ativa                   │
│ • Email: test@example.com                   │
│ • Senha: SenhaSegura123!                    │
│                                             │
│ PASSOS:                                     │
│ 1. Abra app em http://localhost:3000        │
│ 2. Clique botão "Login"                     │
│ 3. Digite email: test@example.com           │
│ 4. Digite senha: SenhaSegura123!            │
│ 5. Clique "Entrar"                          │
│                                             │
│ RESULTADO ESPERADO:                         │
│ • ✅ Redirecionado para dashboard           │
│ • ✅ Nome de usuário aparece no header      │
│ • ✅ URL muda para /dashboard               │
│ • ✅ Token JWT salvo em localStorage        │
│                                             │
│ RESULTADO ATUAL: _______________            │
│ • ✅ PASSOU / ❌ FALHOU                      │
│                                             │
│ OBSERVAÇÕES:                                │
│ ___________________________________        │
└─────────────────────────────────────────────┘
```

**Boas Práticas:**

✅ **SIM:**
- Específico: "Digita 'test@example.com'" (não "digita email")
- Verificável: "URL muda para /dashboard" (testável)
- Independente: Não depende de outro teste
- Claro: Qualquer um consegue executar

❌ **NÃO:**
- Vago: "Testa login"
- Não verificável: "App funciona bem"
- Acoplado: "Após TC-001 passar..."
- Confuso: Passos não sequenciais

---

## 📊 SLIDE 6: Suíte de Testes — Agrupamento

**Tópico:** Organização

### Conteúdo

**Como agrupar casos de teste:**

```
SUITE: Login e Autenticação
  ├─ Categoria: Funcionalidade
  ├─ Prioridade: Crítica
  ├─ Estimativa: 8 casos de teste
  │
  ├─ TC-001: Login com credenciais válidas
  ├─ TC-002: Login com email inválido
  ├─ TC-003: Login com senha errada
  ├─ TC-004: Logout
  ├─ TC-005: Session persiste após refresh
  ├─ TC-006: Senha criptografada na transmissão
  ├─ TC-007: 3 tentativas erradas → bloqueio
  └─ TC-008: Recuperar senha via email

SUITE: Formulário de Cadastro
  ├─ Categoria: Funcionalidade
  ├─ Prioridade: Alta
  ├─ Estimativa: 5 casos de teste
  │
  ├─ TC-101: Cadastro com dados válidos
  ├─ TC-102: Email duplicado → erro
  ├─ TC-103: Senha fraca → validação
  ├─ TC-104: Termos não aceitos → bloqueio
  └─ TC-105: CAPTCHA funciona

SUITE: Performance
  ├─ Categoria: Performance
  ├─ Prioridade: Média
  ├─ Estimativa: 3 casos de teste
  │
  ├─ TC-201: Page load <3s
  ├─ TC-202: API responde <200ms
  └─ TC-203: Images otimizadas (<200kb)
```

---

## 📊 SLIDE 7: Planejamento — Timeline

**Tópico:** Cronograma

### Conteúdo

**Exemplo de Projeto Real: E-commerce (40 horas)**

```
SEMANA 1:
├─ 2º (4h): Reunião kickoff + ler specs
├─ 3º (8h): Desenhar casos de teste
├─ 4º (8h): Plano de testes formal
└─ 5º (4h): Review plano com Dev + PM

SEMANA 2:
├─ 2º (8h): Execução de testes (P1)
├─ 3º (8h): Execução de testes (P2)
├─ 4º (4h): Reporte de bugs
└─ 5º (4h): Retest após correções

SEMANA 3:
├─ 2º (4h): Testes E2E finais
├─ 3º (2h): Documentação final
└─ 4º (2h): Deploy com confiança! ✅
```

---

## 📊 SLIDE 8: Estimativas — Fórmula

**Tópico:** Custo vs Benefício

### Conteúdo

**Como estimar horas de teste?**

```
Fórmula Básica:

Horas de Teste = (Funcionalidades × 2) + (Complexidade)

Exemplo E-commerce:

Funcionalidades: 12 (busca, carrinho, checkout, etc)
Base: 12 × 2 = 24 horas
Complexidade: +8 (porque integra pagamento, múltiplas APIs)
TOTAL: 32 horas de teste

Breakdown:
├─ Planejamento: 4h (12%)
├─ Design de casos: 6h (19%)
├─ Execução: 16h (50%)
├─ Retest: 4h (12%)
└─ Documentação: 2h (7%)
```

**Regra de ouro:**
- Para cada 1 hora de dev = 0.5-1 hora de teste
- Projeto crítico = 1 hora de teste por hora de dev
- Projeto simples = 0.5 hora de teste

---

## 📊 SLIDE 9: Documentação — Entregáveis

**Tópico:** O que Entregar

### Conteúdo

**Documentos que você produz:**

1. **Plano de Testes** (1-2 páginas iniciais)
   - Escopo, estratégia, timeline

2. **Casos de Teste** (10-50 casos)
   - Formato: TC-XXX
   - Detalhado: pré-requisitos, passos, resultado

3. **Relatório de Execução** (5-10 páginas)
   - Testes executados: 48
   - Testes passaram: 45 ✅
   - Testes falharam: 3 ❌
   - Taxa de sucesso: 93.75%

4. **Lista de Defeitos** (varia)
   - ID: BUG-001
   - Descrição: "Botão 'Enviar' não desabilita após clique"
   - Severidade: Alta
   - Status: Aberto / Resolvido / Rejeitado

5. **Matriz de Rastreabilidade**
   - Requisito (REQ-001) ↔ Caso de Teste (TC-001)
   - Garante 100% cobertura

---

## 📊 SLIDE 10: Exercício Prático — Mini Plano

**Tópico:** Aplicação Imediata

### Conteúdo

**Você vai criar um MINI Plano de Testes para:**

Feature: "Adicionar ao Carrinho"

**O que fazer:**
1. Listar 5 casos de teste (TC-001 até TC-005)
2. Escrever 2 com detalhes completos
3. Tempo: 20 minutos

**Sugestão de casos:**

- TC-001: Adicionar 1 produto ao carrinho vazio
- TC-002: Aumentar quantidade de produto existente
- TC-003: Carrinho atualiza total automaticamente
- TC-004: Mensagem de sucesso aparece
- TC-005: Carrinho persiste após refresh

---

## 📊 SLIDE 11: Discussão — Qualidade de Planos

**Tópico:** Reflexão Crítica

### Conteúdo

**Perguntas para responder:**

1. "Um plano perfeito garante 0 bugs?"
   - ❌ Não! Plano garante COBERTURA, não perfection

2. "Quantos casos são 'suficientes'?"
   - ✅ Quantidade que cobre 100% de funcionalidades

3. "Plano nunca muda?"
   - ❌ Muda conforme requisitos evoluem!

---

## 📊 SLIDE 12: Resumo Executivo

**Tópico:** Reforço

### Conteúdo

**Você agora sabe:**

1. ✅ Verificação vs Validação
2. ✅ Como ler especificações
3. ✅ Estrutura de plano de testes
4. ✅ Como escrever casos de teste
5. ✅ Como organizar suítes
6. ✅ Como estimar horas
7. ✅ Cronograma de execução
8. ✅ Documentação necessária

---

**Fim da Aula 02**

*Versão: 1.0*  
*Data: 2026-09-08*  
*Status: ✅ Pronto para Apresentação*  
*Pré-requisito para Aula 03: Ler especificações de um projeto real*
