# AULA 02: Planejamento de Testes

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

## 📊 CONTEÚDO PRINCIPAL

### 1. Verificação vs Validação

**VERIFICAÇÃO**
- "Product desenvolvido CORRETAMENTE?"
- Foco: COMO foi feito
- Pergunta: Segue especificações?
- Teste: Unitário + Integração
- Responsável: Desenvolvedor

**VALIDAÇÃO**
- "PRODUTO CORRETO foi desenvolvido?"
- Foco: O QUE foi feito
- Pergunta: Atende requisitos?
- Teste: Integração + E2E
- Responsável: QA/Tester

**Analogia:**
Construir uma casa:
- Verificação: Cimento foi misturado corretamente? Fundação segue especificação?
- Validação: Esta é a casa que cliente pediu? Atende necessidades?

---

### 2. Especificações Técnicas de Interface

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

---

### 3. Plano de Testes — Estrutura

**Um Plano de Testes FORMAL tem:**

1. INFORMAÇÕES GERAIS
   - Identificação do projeto
   - Data de início/fim
   - Responsáveis (QA, Dev, PM)

2. ESCOPO
   - O QUE será testado
   - O QUE NÃO será testado
   - Justificativa

3. ESTRATÉGIA
   - Tipos de testes (unitário, integração, E2E)
   - Proporção (60/30/10)
   - Ferramentas (Jest, Playwright)
   - Cronograma

4. CASOS DE TESTE
   - Identificação (TC-001, TC-002)
   - Descrição
   - Passos
   - Resultado esperado
   - Pré-requisitos

5. MÉTRICAS
   - Cobertura esperada (≥70%)
   - Taxa de defeitos aceitável (<5%)
   - Critério de sucesso

6. RISCOS E CONTINGÊNCIAS
   - Riscos identificados
   - Impacto
   - Plano B

**Tamanho esperado:**
- Projeto pequeno (5 features): 5-10 páginas
- Projeto médio (20 features): 20-30 páginas
- Projeto grande (100+ features): 50+ páginas

---

### 4. Casos de Teste — Como Escrever

**Formato Padrão:**

```
CASO DE TESTE: TC-001
ID: TC-001
Título: "Login com email e senha válidos"

PRÉ-REQUISITOS:
• Usuário tem conta ativa
• Email: test@example.com
• Senha: SenhaSegura123!

PASSOS:
1. Abra app em http://localhost:3000
2. Clique botão "Login"
3. Digite email: test@example.com
4. Digite senha: SenhaSegura123!
5. Clique "Entrar"

RESULTADO ESPERADO:
• Redirecionado para dashboard
• Nome de usuário aparece no header
• URL muda para /dashboard
• Token JWT salvo em localStorage

RESULTADO ATUAL: _______________
• PASSOU / FALHOU

OBSERVAÇÕES:
___________________________________
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

### 5. Suíte de Testes — Agrupamento

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
```

---

### 6. Planejamento — Timeline

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
└─ 4º (2h): Deploy com confiança!
```

---

### 7. Estimativas — Fórmula

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

## 🎬 ATIVIDADES PROPOSTAS

### Atividade 1: Criar Mini Plano (20 min)

**Feature:** "Adicionar ao Carrinho"

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

### Atividade 2: Discussão — Qualidade (10 min)

**Perguntas:**

1. "Um plano perfeito garante 0 bugs?"
   - ❌ Não! Plano garante COBERTURA, não perfection

2. "Quantos casos são 'suficientes'?"
   - ✅ Quantidade que cobre 100% de funcionalidades

3. "Plano nunca muda?"
   - ❌ Muda conforme requisitos evoluem!

---

### Atividade 3: Estimar Projeto (15 min)

**Cenário:** Novo projeto com 8 funcionalidades, médio porte

**Calcule:**
- Horas totais de teste
- Breakdown por fase
- Timeline em dias

---

## ✅ CRITÉRIOS DE SUCESSO

Ao final, você consegue:
- [ ] Diferenciar verificação vs validação
- [ ] Ler especificações técnicas corretamente
- [ ] Escrever casos de teste claros
- [ ] Criar plano de testes estruturado
- [ ] Estimar horas de teste com precisão
- [ ] Organizar suítes de testes logicamente

---

## 📚 REFERÊNCIAS

- ISTQB: Test Planning and Control
- Testing Pyramid — Google Testing Blog
- Vitest Documentation
- Playwright Documentation

---

**Versão:** 1.0  
**Status:** ✅ Pronto para Lecionar  
**Próxima Aula:** Processo Fundamental P1
