# GUIA DE LABORATÓRIO — AULA 01: Fundamentos de Testes

**Duração:** 4 horas  
**Alunos:** Até 30 em laboratório  
**Pré-requisitos:** Conhecimento básico JavaScript  
**Objetivo:** Compreender tipos, técnicas e conceitos de testes  

---

## 📋 ESTRUTURA DA AULA

| Tempo | Atividade | Duração |
|-------|-----------|---------|
| **0:00 - 0:15** | Bem-vindo e Objetivos | 15 min |
| **0:15 - 1:30** | Apresentação Slides (1-10) | 75 min |
| **1:30 - 2:00** | Exercício 1: Classificar Testes | 30 min |
| **2:00 - 3:00** | Apresentação Slides (11-20) + Discussão | 60 min |
| **3:00 - 3:45** | Exercício 2: Desenhar Pirâmide | 45 min |
| **3:45 - 4:00** | Wrap-up e Próximos Passos | 15 min |

---

## ⏱️ BLOCO 1: BEM-VINDO (15 minutos)

### Atividade 1.1: Abertura e Contexto
**Tempo:** 5 min

**Professor faz:**
1. Apresenta-se (se primeira aula)
2. Mostra estrutura do curso (10 aulas de 4h)
3. Explica por que testes são críticos:
   - "Vocês já usaram app bugado? Como se sentiram?"
   - "Qual é o custo de um bug em produção?"

**Alunos participam:**
- Levantam mão com experiências
- Discussão aberta sobre qualidade

### Atividade 1.2: Objetivos da Aula
**Tempo:** 10 min

**Professor escreve no quadro:**
```
AO FINAL DESTA AULA, VOCÊ SERÁ CAPAZ DE:

✅ Diferenciar 3 tipos de testes
✅ Compreender Pirâmide de Testes
✅ Reconhecer técnicas (caixa branca vs preta)
✅ Entender benefícios de automação
✅ Ler e interpretar métricas de qualidade
```

**Checklist mental:**
- [ ] Todos entendem os objetivos?
- [ ] Alguém tem dúvida de pré-requisitos?

---

## 🎥 BLOCO 2: APRESENTAÇÃO SLIDES 1-10 (75 minutos)

### Apresentação Estruturada
**Tempo:** 75 min total (7-8 min por slide)

**Slides 1-10:**

| Slide | Tema | Tempo | Atividade |
|-------|------|-------|-----------|
| 1 | Bem-vindo | 5 min | Contextualizar |
| 2 | Tipos de Testes | 10 min | Explicar + exemplos |
| 3 | Pirâmide | 10 min | Desenhar no quadro |
| 4 | Técnicas | 8 min | Comparar caixa branca/preta |
| 5 | Tipos por Característica | 10 min | Passar exemplos |
| 6 | Autogestão | 8 min | Reflexão pessoal |
| 7 | Automação | 10 min | Demo ao vivo (manual vs auto) |
| 8 | Frameworks | 5 min | Listar ferramentas |
| 9 | STLC | 7 min | Traçar fluxo no quadro |
| 10 | Cobertura | 2 min | Breve visão |

### Dicas de Facilitação

**Slide 2 (Tipos de Testes):**
- Desenhe no quadro: 3 caixas (Unitário, Integração, E2E)
- Dê exemplos da vida real:
  - "Um botão é clicável?" → Integração
  - "Função soma() funciona?" → Unitário
  - "Usuário consegue fazer login?" → E2E

**Slide 3 (Pirâmide):**
- Desenhe pirâmide grande no quadro
- Pergunte: "Por que unitários são mais numerosos?"
- Resposta esperada: "Mais rápidos, fáceis de manter"

**Slide 7 (Automação):**
- **DEMO AO VIVO (muito importante!):**
  - Abra navegador
  - Mostre como testar manualmente (clicar botões)
  - Mostre pseudocódigo de teste automatizado
  - Compare velocidade

**Exemplo de Demo:**

```
MANUAL:
1. Abro app
2. Clico Login
3. Digito email
4. Digito senha
5. Clico Entrar
6. Espero carregar
7. Vejo dashboard
// TEMPO: 30 segundos

AUTOMATIZADO:
test('login', () => {
  login('user@email.com', 'senha');
  expect(dashboard).toBeVisible();
});
// TEMPO: 200ms = 150x mais rápido!
```

### Perguntas Interativas

Após cada 2 slides, faça pergunta:

- **Após Slide 2:** "Qual é a diferença entre unitário e E2E?"
- **Após Slide 4:** "Um teste de login é caixa branca ou preta? Por quê?"
- **Após Slide 7:** "Vocês conseguem ver valor em automação?"

### Checklist do Professor

- [ ] Todos os slides apresentados?
- [ ] Alunos entenderam pirâmide?
- [ ] Alguém dúvidas sobre automação?
- [ ] Tempo no prazo?

---

## ✏️ BLOCO 3: EXERCÍCIO 1 (30 minutos)

### Exercício 1: Classificar Testes

**Objetivo:** Aplicar conceitos de tipos de testes

**Tempo:** 30 min total
- Instrução: 5 min
- Trabalho Individual: 15 min
- Discussão: 10 min

### Instruções

**Professor:**

1. Distribui folha impressa com 10 cenários
2. Explica: "Vocês vão classificar cada teste como Unitário (U), Integração (I) ou E2E (E)"
3. Tempo: 15 minutos
4. Sem consultar colegas
5. Depois discutimos as respostas

### Cenários (Impressa e Entregue)

```
CLASSIFICAR CADA TESTE:

1. "Botão 'Enviar' abre modal de confirmação"
   → Tipo: _____ (Dica: Envolve DOM + evento)

2. "Função calcularImposto(100, 0.1) retorna 110"
   → Tipo: _____ (Dica: Só testar função)

3. "Usuário faz login → vê dashboard → clica em vendas → vê lista de vendas"
   → Tipo: _____ (Dica: Fluxo completo)

4. "Formulário valida email quando campo perde foco"
   → Tipo: _____ (Dica: Interação de componentes)

5. "Array.sort() ordena números crescente"
   → Tipo: _____ (Dica: Função isolada)

6. "Input aceita máximo 50 caracteres"
   → Tipo: _____ (Dica: Validação de componente)

7. "Usuário consegue fazer upload de arquivo, vê preview, clica 'Confirmar', arquivo salva"
   → Tipo: _____ (Dica: Fluxo do usuário)

8. "Promise resolve com dados corretos"
   → Tipo: _____ (Dica: Função assíncrona)

9. "Modal fecha quando clica botão X ou fora da modal"
   → Tipo: _____ (Dica: Interação)

10. "API /users retorna JSON com estrutura esperada"
    → Tipo: _____ (Dica: Teste de integração com API)
```

### Gabarito (Para Professor Apenas)

```
1. INTEGRAÇÃO (envolve DOM + evento)
2. UNITÁRIO (função isolada)
3. E2E (fluxo completo do usuário)
4. INTEGRAÇÃO (validação + DOM)
5. UNITÁRIO (função pura)
6. INTEGRAÇÃO (interação DOM)
7. E2E (fluxo completo)
8. UNITÁRIO (função assíncrona isolada)
9. INTEGRAÇÃO (interação de componente)
10. INTEGRAÇÃO (teste de API)
```

### Discussão (10 min)

**Professor revela respostas e**:

1. Pergunta: "Quem acertou todas?"
   - Elogia: "Excelente compreensão!"

2. Discute respostas erradas:
   - "Por que #1 é integração e não unitário?"
   - "Porque envolve DOM + evento, não é função isolada"

3. Reforça conceitos:
   - Unitário = função isolada
   - Integração = múltiplas partes
   - E2E = fluxo do usuário do início ao fim

### Notas para Alunos

Entregue folha de resumo:

```
DICA RÁPIDA PARA CLASSIFICAR:

☐ Testa UMA função isolada, sem UI? → UNITÁRIO
☐ Testa múltiplas partes juntas? → INTEGRAÇÃO
☐ Testa fluxo completo do usuário? → E2E

EXEMPLOS:
• função sum() → UNITÁRIO
• formulário + API → INTEGRAÇÃO
• login → dashboard → compra → email → E2E
```

---

## 🎥 BLOCO 4: APRESENTAÇÃO SLIDES 11-20 (60 minutos)

### Apresentação Estruturada
**Tempo:** 60 min total (6 min por slide)

**Slides 11-20:**

| Slide | Tema | Tempo | Atividade |
|-------|------|-------|-----------|
| 11 | Taxa de Defeitos | 5 min | Interpretação |
| 12 | Benefícios Automação | 8 min | Enfatizar ROI |
| 13 | Desafios Automação | 5 min | Realismo |
| 14 | Comunicação QA/Dev | 8 min | Cycle de defeito |
| 15 | Exemplo Integrado | 12 min | Story telling |
| 16 | Resumo | 7 min | Reforço |
| 17 | Classificar Testes | 5 min | Interativo |
| 18 | Discussão | 5 min | Reflexão |
| 19 | Próximos Passos | 3 min | Teaser |
| 20 | Checklist | 1 min | Auto-avaliação |

### Dicas de Facilitação

**Slide 12 (Benefícios Automação):**
- Mostre gráfico mental:
  - "1 teste manual = 5 min"
  - "100 testes = 500 min = 8+ horas"
  - "100 testes automatizados = 30 segundos"
  - "Diferença: 8 horas de economia!"

**Slide 14 (Comunicação):**
- Role-play (atuação):
  - Professor faz papel de QA
  - Um aluno faz papel de Dev
  - Reporte um bug fictício:
    - ❌ "Algo está errado"
    - ✅ "Quando clico botão X com dados Y, acontece Z"

**Slide 15 (Exemplo Integrado):**
- **Contar história de projeto real:**
  - Projeto: Dashboard de vendas
  - Contexto: 2 semanas, 20 features
  - Desafio: Entregar com qualidade
  - Solução: Testes sistemáticos
  - Resultado: 0 bugs em produção (ou <5%)

### Discussão Interativa (Slide 18)

**Perguntas abertas:**

1. "O que vocês acham que custa mais: encontrar bug em teste ou em produção?"
   - Esperado: "Em produção!"
   - Reforço: "100x mais caro"

2. "Automação elimina testes manuais?"
   - Esperado: "Não, complementa"
   - Exemplo: QA ainda faz testes exploratórios

3. "Qual é o maior desafio de testes?"
   - Possível resposta: "Manutenção"
   - Reforço: "Sim! Testes quebram com mudanças"

### Checklist do Professor

- [ ] Slides 11-20 apresentados?
- [ ] Alunos entenderam ciclo de defeito?
- [ ] Benefícios e desafios foram claros?
- [ ] Tempo no prazo?

---

## ✏️ BLOCO 5: EXERCÍCIO 2 (45 minutos)

### Exercício 2: Desenhar Pirâmide de Testes

**Objetivo:** Internalizar proporção ideal de testes

**Tempo:** 45 min total
- Instrução: 5 min
- Trabalho Dupla: 25 min
- Apresentação: 15 min

### Instruções

**Professor:**

1. Alunos formam duplas
2. Cada dupla recebe projeto fictício (ex: E-commerce)
3. Tarefa: Desenhar pirâmide com:
   - Quantos testes unitários?
   - Quantos testes de integração?
   - Quantos testes E2E?
4. Justificar cada número

### Projetos para Duplas

**Opção A: E-commerce**
```
Sistema: Loja online com carrinho, checkout, pagamento

Questões:
• Quantos testes unitários? (funções isoladas)
• Quantos testes integração? (formulário → API)
• Quantos testes E2E? (usuário → compra)

Desenhe pirâmide com números reais
```

**Opção B: Dashboard de Analytics**
```
Sistema: Dashboard com gráficos, filtros, exportação

Questões:
• Quantos testes unitários? (cálculos)
• Quantos testes integração? (gráfico + API)
• Quantos testes E2E? (usuário + filtro → export)

Desenhe pirâmide com números reais
```

**Opção C: Aplicativo de Tarefas**
```
Sistema: Criar, editar, deletar, marcar tarefas

Questões:
• Quantos testes unitários? (funções)
• Quantos testes integração? (ações + UI)
• Quantos testes E2E? (fluxos completos)

Desenhe pirâmide com números reais
```

### Entrega (O que esperar)

**Pirâmide esperada:**

```
                  ▲
                 /E2E\
                /  2-3 \ ← 10%
               /________\
              /Integração\
             /     8-12    \ ← 30%
            /______________\
           /    Unitários   \
          /       30-40      \ ← 60%
         /______________________\
```

**Com justificativas:**
- "60 unitários porque cada função precisa de teste"
- "10 integração porque poucas interações críticas"
- "2 E2E porque são caros e lentos"

### Apresentação (15 min)

**2-3 duplas apresentam:**

1. Mostram desenho
2. Explicam números
3. Justificam proporção

**Professor reforça:**
- "Excelente pensamento sobre proporção!"
- "Perceberam por que E2E são poucos?"
- "Isso é exatamente como Pirâmide do Google!"

### Entrega Final

Alunos deixam desenho na lousa (foto para próxima aula)

---

## 🏁 BLOCO 6: WRAP-UP (15 minutos)

### Atividade 6.1: Síntese (7 min)

**Professor resume:**

```
HOJE APRENDEMOS:

✅ 3 Tipos: Unitário (60%), Integração (30%), E2E (10%)
✅ Técnicas: Caixa branca (estrutural) vs caixa preta (funcional)
✅ Autogestão: Responsabilidade no planejamento
✅ Automação: Código testando código
✅ STLC: 7 fases do ciclo de testes
✅ Métricas: Cobertura e taxa de defeitos
✅ Comunicação: QA ↔ Dev
```

### Atividade 6.2: Próximos Passos (5 min)

**Pergunte:**
- "Dúvidas sobre o que aprendemos?"
- "O que você NÃO entendeu?"

**Então:**
- "Na próxima aula (Aula 02), vamos PLANEJAR testes"
- "Vamos aprender a criar plano formal"
- "Exercício: Criar plano para interface real"

### Atividade 6.3: Feedback (3 min)

**Peça feedback rápido:**

"Rapidamente, quem conseguiu:
- ✅ Entender diferença entre unitário e E2E? (levante mão)
- ✅ Compreender pirâmide? (levante mão)
- ⚠️ Ficou com dúvida? (fale o quê)"

**Nota Mental:**
- Se muitos não entendem = revisar antes da próxima aula

---

## 📚 MATERIAL DE APOIO

### Folha de Referência (Distribua)

```
╔════════════════════════════════════════════════╗
║       TIPOS DE TESTES — REFERÊNCIA RÁPIDA     ║
╠════════════════════════════════════════════════╣
║                                                ║
║ UNITÁRIO 🔵                                    ║
│ • Testa 1 função isolada                      ║
│ • Rápido (<100ms)                             ║
│ • Ex: sum() retorna valor correto?            ║
│ • Ferramenta: Vitest, Jest                    ║
│                                                ║
║ INTEGRAÇÃO 🟢                                  ║
│ • Testa múltiplas partes juntas               ║
│ • Médio (100ms-1s)                            ║
│ • Ex: Formulário → API funciona?              ║
│ • Ferramenta: Testing Library, Cypress       ║
│                                                ║
║ E2E 🟡                                         ║
│ • Testa fluxo completo do usuário             ║
│ • Lento (5s+)                                 ║
│ • Ex: Login → compra → confirmação            ║
│ • Ferramenta: Playwright, Selenium            ║
│                                                ║
╚════════════════════════════════════════════════╝

PROPORÇÃO IDEAL: 60% unitário, 30% integração, 10% E2E
```

### Slides Impressos

Imprima slides 1-20 em PDF (16 páginas frente/verso)
- 1 cópia por aluno
- Alunos anotam durante aula

### Gabarito de Exercícios

Guarde gabarito seguro (não distribua)
- Necessário para discussão final
- Use para corrigir trabalhos individuais

---

## 🎯 CRITÉRIOS DE SUCESSO

**Ao final desta aula, alunos conseguem:**

- [x] Diferenciar 3 tipos de testes
- [x] Desenhar pirâmide com proporções certas
- [x] Classificar teste novo em categoria correta
- [x] Explicar por que pirâmide tem essa proporção
- [x] Identificar exemplos de cada tipo em código real
- [x] Compreender benefícios de automação
- [x] Entender ciclo de defeitos QA/Dev

**Se <60% conseguem:** Revisar Aula 01 antes de Aula 02  
**Se 60-80%:** Bom, continuar  
**Se >80%:** Excelente, está pronto

---

## 📝 NOTAS DO PROFESSOR

### Diferenciação

**Alunos Avançados:**
- Pergunte: "Qual framework vocês escolheriam para testar API?"
- Desafio: "Design testes para login social (Google/Facebook)"

**Alunos em Dificuldade:**
- Repita exemplos simples (botão, calculadora)
- Use analogias do dia-a-dia
- Apoio individualizado no Exercício 1

### Tempo

- Se ficar atrás: Pule Slide 19-20 (são recap)
- Se sobrar tempo: Faça discussão extra ou exercício 3

### Problemas Comuns

| Problema | Solução |
|----------|---------|
| "Não entendo diferença entre unitário e integração" | Desenhe exemplos reais no quadro |
| "Por que E2E é tão caro?" | Mostre que precisa de navegador + UI renderizada |
| "Automação é complicado" | Reforce que hoje é conceitual, código vem depois |

---

**Fim do Guia de Laboratório — Aula 01**

*Versão: 1.0*  
*Data: 2026-09-08*  
*Status: ✅ Pronto para Usar em Aula*
