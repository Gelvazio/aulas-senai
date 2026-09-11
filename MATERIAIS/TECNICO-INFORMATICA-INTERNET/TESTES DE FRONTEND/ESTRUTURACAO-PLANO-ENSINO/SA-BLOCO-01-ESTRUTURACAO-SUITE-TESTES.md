# SA BLOCO 01 — Estruturação e Documentação Profissional de Suite de Testes

**Carga horária:** 16 horas (4 aulas de 4h)  
**Público:** Técnico em Informática para Internet  
**Capacidades:** Planejar e documentar suite de testes profissional

---

**Contexto:** Transformar requisitos em plano de testes estruturado  
**Foco:** Planejamento + Documentação + Rastreabilidade  
**Nome sugerido:** "SA 01 ESTRUTURACAO-SUITE-TESTES" ou "SA-PLANEJAMENTO-PROFISSIONAL-QUALIDADE"

---

## Situação/Contexto

Uma startup de tecnologia está desenvolvendo aplicação de e-commerce em React. A equipe de desenvolvimento precisa estabelecer estratégia de testes antes de iniciar implementação de features críticas (autenticação, carrinho, checkout). Atualmente não há documentação de testes, não há definição de proporção U/I/E2E, não há rastreabilidade de requisitos para testes, e ninguém sabe qual é o plano de qualidade do projeto.

A equipe de qualidade foi contratada para estruturar tudo: criar plano formal, definir estratégia de teste, estimar esforço, documentar casos de teste, garantir rastreabilidade. O resultado será base para que desenvolvedores saibam exatamente o que, quanto e como testar.

---

## Desafio Integrador

Você recebe especificação técnica de 3 features críticas do e-commerce:
1. **Autenticação com Email/Senha**
2. **Carrinho de Compras**
3. **Checkout e Pagamento**

Sua tarefa é criar **plano profissional e documentação de testes** que permita que qualquer desenvolvedor saiba:
- O que será testado (escopo)
- Como será testado (estratégia: U/I/E2E)
- Quanto será testado (estimativa de tempo)
- Quando será testado (cronograma)
- Quais são os riscos identificados

### Entregas Esperadas:

1. **Plano de Testes Formal (1-2 páginas):**
   - Informações gerais (projeto, datas, responsáveis)
   - Escopo (o que será/não será testado)
   - Estratégia (tipos, proporção, ferramentas, cronograma)
   - Métricas esperadas (cobertura, defect density)
   - Riscos identificados e plano B

2. **Casos de Teste Documentados (TC-001 até TC-XXX):**
   - Para cada feature, mínimo 5 casos de teste bem-formados
   - Formato padrão: ID, Título, Pré-requisitos, Passos, Resultado Esperado
   - Abrangendo happy path e edge cases (para autenticação: login válido, senha errada, email não existe, etc)
   - Especificar tipo de teste: U (unitário), I (integração), E (E2E)

3. **Matriz de Rastreabilidade:**
   - Cada requisito mapeado para 1+ caso de teste
   - Cada caso de teste mapeado para 1+ requisito
   - Tabela: Requisito ↔ TC ↔ Tipo Teste ↔ Status

4. **Estimativa de Tempo:**
   - Análise realista: quanto tempo cada caso de teste levará
   - Distribuição de esforço entre U/I/E2E
   - Timeline de execução por feature
   - Identificação de críticos vs nice-to-have

5. **Documento de Análise de Risco:**
   - Riscos identificados (ex: "feature de pagamento tem risco alto")
   - Probabilidade e impacto
   - Plano de mitigação (ex: aumentar cobertura de testes)

6. **Apresentação para Stakeholders:**
   - Explicação clara do plano para equipe de desenvolvimento
   - Responder: "Quantos testes precisamos escrever?"
   - Responder: "Quanto tempo vai levar?"
   - Responder: "Como sabemos que testamos o suficiente?"

---

## Resultado Esperado

**Portfólio profissional de qualidade contendo:**
- Plano de Testes formal (1-2 páginas, estruturado)
- Mínimo 15 casos de teste bem-documentados (5 por feature)
- Matriz de rastreabilidade completa (Req ↔ TC)
- Estimativa de tempo e cronograma
- Análise de riscos identificados
- Documento interpretativo explicando estratégia
- Apresentação clara para equipe

**Estrutura de Pastas:**
```
SA-01-Estruturacao-Suite-Testes/
├── PLANO-TESTES-ECOMMERCE.md
├── CASOS-TESTE-AUTENTICACAO.md
├── CASOS-TESTE-CARRINHO.md
├── CASOS-TESTE-CHECKOUT.md
├── MATRIZ-RASTREABILIDADE.xlsx
├── ESTIMATIVA-TEMPO.xlsx
├── ANALISE-RISCO.md
└── APRESENTACAO.pdf (ou slides)
```

---

## Conhecimentos Envolvidos

### Planejamento de Testes
- Análise de requisitos funcionais/não-funcionais
- Estrutura de plano de testes formal
- Definição de escopo e estratégia
- Estimativa realista de tempo
- Identificação de risco
- Cronogramação de atividades

### Documentação de Testes
- Escrita de casos de teste formato padrão ISO
- Padrão: ID, Título, Pré-requisitos, Passos, Resultado
- Escrita clara e verificável
- Cobertura de happy path + edge cases

### Rastreabilidade
- Mapeamento requisito ↔ teste
- Cobertura completa de requisitos
- Matriz de rastreabilidade
- Garantia de que nada foi esquecido

### Estratégia de Teste
- Proporção U/I/E2E (60%-30%-10%)
- Definição de quando usar cada tipo
- Estimativa de tempo por tipo
- Priorização de casos críticos

### Comunicação
- Apresentação clara para não-técnicos
- Explicação de decisões
- Justificativa de estimativas
- Discussão de trade-offs

---

## Estratégias Pedagógicas

- Exposição Dialogada de processos de planejamento
- Estudo de Caso com especificação real
- Atividade Prática em Laboratório
- Trabalho em Grupo na análise de requisitos
- Discussão facilitada sobre decisões
- Apresentação para Público (simulando stakeholders)

---

## Critérios de Avaliação

- ✅ Analisa requisitos e identifica todos os cenários de teste
- ✅ Estrutura plano de testes formal e profissional
- ✅ Define escopo claro (o que será/não será testado)
- ✅ Propõe estratégia realista (proporção U/I/E2E)
- ✅ Estima tempo realista para cada caso
- ✅ Documenta casos de teste formato padrão
- ✅ Cobre happy path e edge cases
- ✅ Cria matriz de rastreabilidade completa
- ✅ Identifica riscos relevantes
- ✅ Propõe mitigações apropriadas
- ✅ Apresenta plano com clareza
- ✅ Justifica decisões de estratégia
- ✅ Demonstra compreensão de trade-offs

---

## Matriz de Avaliação

| Critério | Peso | Descrição |
|----------|------|-----------|
| Qualidade do plano de testes | 20% | Estrutura, clareza, completude |
| Documentação de casos de teste | 25% | Formato padrão, cobertura, especificidade |
| Matriz de rastreabilidade | 15% | Completude, correção de mapeamento |
| Estimativa de tempo | 15% | Realismo, justificativa |
| Análise de risco | 10% | Identificação, probabilidade/impacto |
| Apresentação e comunicação | 15% | Clareza, profissionalismo |

---

## Referências

SYMONS, Charles. **Software Testing: An ISEB Foundation Course**. 2ª ed. Swindon: BCS, 2008.

SENAI. Departamento Nacional. **Testes de Software - Processos e Metodologias**. Brasília: SENAI/DN, 2022.

IEEE. **IEEE 829-2008 Standard for Software and System Test Documentation**. IEEE, 2008.

KANER, Cem. **A Software Testing Primer**. Disponível em: http://www.testingeducation.org

---

**Data de Criação:** 2026-09-11  
**Status:** ✅ Pronto para Execução
