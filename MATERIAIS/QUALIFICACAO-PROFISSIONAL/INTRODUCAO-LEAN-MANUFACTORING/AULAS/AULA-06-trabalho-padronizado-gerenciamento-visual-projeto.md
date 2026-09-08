# AULA 06 — Trabalho Padronizado, Gerenciamento Visual e Projeto Integrador

**Programa:** Qualificação Profissional — SENAI  
**UC:** Introdução ao Lean Manufacturing  
**Duração:** 3 horas presenciais (180 min)  

---

## 🎯 Objetivos de Aprendizagem

1. ✅ Criar padrão de trabalho (Standard Work)
2. ✅ Implementar gerenciamento visual completo
3. ✅ Integrar todas as ferramentas Lean
4. ✅ Apresentar e defender projeto final

---

## 📚 Conteúdo Programático

### 1. **Trabalho Padronizado (Standard Work)** (60 min)

#### 1.1 — Conceito
> **Standard Work:** Melhor forma CONHECIDA de executar uma tarefa, documentada de forma visual e numérica

**Não é:**
- ❌ Decreto rígido que nunca muda
- ❌ Apenas um manual em PDF
- ❌ Escrito só por gerente

**É:**
- ✅ Melhor prática atual (pode melhorar amanhã = Kaizen)
- ✅ Visual: fotos, desenhos, números
- ✅ Criado COM operários (eles sabem melhor)
- ✅ Treinamento rápido (novo operário aprende em minutos)

#### 1.2 — Elementos do Standard Work

1. **Sequência de Operações:**
   - Passo 1: Pegar peça A
   - Passo 2: Inserir em fixador
   - Passo 3: Apertar parafuso (2 voltas)
   - Passo 4: Passar para próxima estação
   - (Claro, visualmente)

2. **Tempo de Ciclo (Takt Time):**
   - Cada operação deve levar X segundos
   - Exemplo: "Operação deve levar 45 seg"
   - Permite sincronização com demanda

3. **Quantidade de WIP (Work in Process):**
   - Quantas peças podem estar em processo entre estações?
   - Evita acúmulo
   - Exemplo: "Máximo 3 peças esperando"

4. **Segurança e Qualidade:**
   - Pontos críticos destacados
   - Onde NÃO pode errar
   - Exemplo: "⚠️ Verificar alinhamento antes de apertar"

#### 1.3 — Documentação Visual

**Formato A3 (padrão Toyota):**
```
┌─────────────────────────────────────┐
│ PADRÃO DE TRABALHO                  │
│ Operação: Montagem de Motor XY      │
│ Versão: 2.0 | Data: 08/09/2026     │
├─────────────────────────────────────┤
│ FOTOS (sequência com anotações):    │
│ [FOTO 1] Passo 1: Pegar motor      │
│          Tempo: 10 seg              │
│                                     │
│ [FOTO 2] Passo 2: Inserir parafuso │
│          Tempo: 15 seg              │
│          ⚠️ Alinhar antes!          │
│                                     │
│ [FOTO 3] Passo 3: Apertar         │
│          Tempo: 20 seg              │
│                                     │
├─────────────────────────────────────┤
│ CICLO TOTAL: 45 seg                │
│ WIP Máximo: 3 unidades             │
│ Aprox por hora: 80 unidades        │
└─────────────────────────────────────┘
```

#### 1.4 — Ciclo de Melhoria do Standard Work

```
1. Criar padrão (hoje) ─────────┐
   ↓                            │
2. Executar & Treinar          │
   ↓                            │
3. Observar (Gemba Walk)        │ Kaizen
   ↓                            │ (contínuo)
4. Sugerir melhoria             │
   ↓                            │
5. Testar (PDCA)                │
   ↓                            │
6. Atualizar padrão ────────────┘
   ↓
Repeat (amanhã é melhor que hoje)
```

---

### 2. **Gerenciamento Visual Completo** (60 min)

#### 2.1 — Elementos do Gerenciamento Visual

**Objetivo:** Toda informação importante visível ao primeiro olhar (sem perguntar)

#### **1. Quadro Andon/Status:**
```
ESTAÇÃO A    ESTAÇÃO B    ESTAÇÃO C
    ●             ⭕              ●
   VERDE        AMARELO         VERDE
(Normal)    (Em revisão)    (Normal)

Última alteração: 09h30
Próxima meta: 50 unidades até 12h
Responsável: João
```

#### **2. Gráfico de Produção (Rastreamento):**
```
Produção vs. Meta (Dia 8 de setembro)

100│   ╱─ Meta
 80│  ╱
 60│╱╱╱─── Real (até 14h)
 40│
 20│
  0└─────────────────────
    06h 08h 10h 12h 14h 16h 18h
```

#### **3. Quadro de Problemas & Kaizen:**
```
🔴 PROBLEMAS (últimas 48h)
- Setup longo (Estação B) — causado por falta de ferramentas
- Defeito (3 un.) — parafuso solto — calibre máquina

✅ IDEIAS (aprovadas esta semana)
[✓] Organizar ferramentas em painel (ganho: 5 min setup)
[✓] Protocolo inspeção visual novo (implementando)
```

#### **4. Calendário 5S (Audit Visual):**
```
AUDIT 5S — Setembro 2026
Seg Ter Qua Qui Sex
 1 ✅ ⚠️  ✅  ✅  ⚠️   (Score: 4/5)
 8 ✅ ✅  ✅  ✅  ✅  (Score: 5/5) ← Melhor semana!
15 ✅ ⚠️  ✅  ✅  ✅
22 ✅ ✅  ⚠️  ✅  ✅
29 [pending]
```

#### **5. Mapa de Fluxo de Valor (Foto/Desenho):**
- Mostrar fisicamente o layout
- Indicar gargalos (vermelho)
- Lead times visíveis

#### **6. Padrão de Trabalho (Fotos A3):**
- Pendurado acima de cada estação
- Operário novo não precisa perguntar (vê foto)

#### **7. Quadro de Sugestões:**
```
IDEIAS DE MELHORIA — Setembro
[📝] João: Melhorar 5S almoxarifado
    Status: ⏳ Em análise (PDCA iniciado)
    
[✅] Maria: Trocar clamp por versão rápida (TRF)
    Status: ✅ Implementado — Ganho: 3 min/troca
    Reconhecimento: Vale-presente R$ 50
    
[📝] Pedro: Sensor de temperatura
    Status: ⏳ Orçando fornecedor
```

#### 2.2 — Locais de Painel Visual (Mapa)

```
FÁBRICA LAYOUT

Entrada → [Quadro 1: Status Geral] → [Quadro 2: Problemas]
          ↓
      Estação A  Estação B  Estação C
      [Padrão]   [Padrão]   [Padrão]
      [Andon]    [Andon]    [Andon]
          ↓
      [Quadro 3: 5S Audit]
      [Quadro 4: Sugestões]
      [Quadro 5: Gráfico Produção]
          ↓
        Saída

👉 Cada painel tem propósito, atualização clara, responsável designado
```

---

### 3. **Projeto Integrador Lean — Aplicar Tudo** (60 min apresentação + trabalho anterior)

#### 3.1 — Objetivo do Projeto
Aplicar TODOS os conceitos Lean (5 Princípios + 8 Ferramentas) em processo real ou simulado.

#### 3.2 — Fases do Projeto

**Fase 1: Diagnóstico (2-3 dias antes)**
- Escolher processo (real ou simulado)
- Fazer Gemba Walk (observar)
- Desenhar VSM (current state)
- Identificar desperdícios (8 tipos)
- Listar problemas (top 3)

**Fase 2: Planejamento (2-3 dias)**
- Definir meta (ex: reduzir lead time 30%)
- Propor ferramentas Lean (quais aplicar?)
- Cronograma: quando implementar
- Responsabilidades: quem faz?

**Fase 3: Implementação (durante projeto)**
- 5S: organizar e limpar
- Padrão de Trabalho: criar visual
- Sistema puxado: implementar Kanban
- Jidoka: detector de erro
- TRF: otimizar setup

**Fase 4: Validação (final)**
- Medir resultados (tempo, custo, qualidade)
- Comparar: antes vs. depois
- Calcular ROI

**Fase 5: Apresentação (hoje)**
- Slides: situação inicial, ações, resultados
- Demo: mostrar funcionando
- Discussão: aprendizados, desafios

#### 3.3 — Exemplo de Projeto: Cafeteria Escolar

**Inicial (Problema):**
- Fila longa (15 min esperar)
- Café frio às 11h30
- Desperdício: bolos vencidos no fim do dia
- Lead time: cliente entra → café na mão = 15 min

**Diagnóstico:**
- Muda identificada: Espera (fila), Superprodução (bolos em excesso), Tempo de processamento
- Gargalo: Caixa (1 pessoa)
- Desperdício de comida

**Plano Lean:**
1. 5S: Reorganizar estoque, limpar geladeira
2. TRF: Setup rápido de máquina de café (pré-aquecimento)
3. Padrão Work: Sequência de atendimento (pedido → pagamento → entrega) em 90 seg
4. Kanban: Produzir bolo sob demanda (tarde) não antecipado
5. Andon: Luz vermelha se café acaba (parar venda)
6. Fluxo contínuo: 2 funcionários (1 prepara, 1 atende caixa)

**Resultados:**
- Lead time: 15 min → 3 min (80% redução!)
- Fila: 20 pessoas → 5 pessoas
- Desperdício: -60% bolos vencidos
- Satisfação: aumentou
- Custo operacional: reduzido (menos hora-extra)

**Apresentação:** Fotos antes/depois, gráfico, lições aprendidas

---

## 🎬 Estratégias de Ensino

1. **Demonstração:** Criar padrão em tempo real (fotos + anotações)
2. **Simulação:** Implementar gerenciamento visual em sala
3. **Apresentações:** Grupos apresentam projeto final
4. **Discussão:** Lições aprendidas, desafios

---

## ✍️ Atividades Práticas

### **Atividade 1: Criar Standard Work A3** (30 min)
**Objetivo:** Documentar processo em forma visual (A3)

**Procedimento:**
1. Grupos escolhem operação simples (ex.: fazer sanduíche, embalar livro)
2. Fotografam cada passo
3. Anotam tempo de cada passo
4. Criam A3 com fotos, textos, tempo, observações
5. Apresentam (5 min)

**Resultado:** Documento que novo operário entende sem explicação

---

### **Atividade 2: Apresentação Projeto Final** (30 min)
**Objetivo:** Consolidar aprendizado aplicando tudo

**Procedimento:**
1. Grupos apresentam projeto (5-7 min):
   - Processo escolhido
   - Diagnóstico (VSM, desperdícios)
   - Plano Lean (ferramentas)
   - Resultados (números)
   - Aprendizados
2. Classe questiona (2 min per grupo)
3. Votação: melhor projeto (prêmio)

---

## 📋 Avaliação Somativa (Projeto Final)

**Critérios de Avaliação:**

| Critério | Peso | Score |
|----------|------|-------|
| Diagnóstico (VSM, desperdícios identificados) | 20% | _/10 |
| Plano coerente (ferramentas apropriadas) | 20% | _/10 |
| Implementação (prático, com fotos) | 30% | _/10 |
| Resultados mensuráveis (antes/depois) | 20% | _/10 |
| Apresentação (clareza, defesa) | 10% | _/10 |
| **TOTAL** | **100%** | _/50 |

**Aprovação:** ≥ 35/50 pontos

---

## 🎒 Tarefa Complementar (para projeto final)

Grupos já trabalham em projeto durante as 6 aulas; culmina em apresentação hoje (AULA 06).

---

## 📚 Recursos Necessários

- Câmera (fotos projeto)
- Papel A3 (Standard Work)
- Marcadores, fita adesiva
- Projetor (apresentações)
- Rubric de avaliação (impresso)

---

## 📞 Referências

- LIKER, Jeffrey K. *The Toyota Way*. Cap. "Standardized Work & Kaizen"
- WOMACK, James P. *Lean Thinking*. Cap. "Criar Fluxo"

---

## 🏆 Conclusão da UC

**Aprendizados Principais:**
1. ✅ 5 Princípios do Lean (não é apenas ferramentas)
2. ✅ 8 Tipos de Desperdício (muda existe em todo lado)
3. ✅ Casa do Lean (fundação + pilares + teto + suporte)
4. ✅ 6 Ferramentas (5S, TRF, Fluxo Contínuo, Jidoka, Padrão, Gerenciamento Visual)
5. ✅ Mentalidade: Melhoria Contínua = Kaizen permanente

**Próximos Passos:**
- Aplicar Lean em seu trabalho/vida
- Buscar certificações (Green Belt, Black Belt)
- Continuar aprendendo (leitura, cursos)
- Engajar colegas (criar cultura Lean)

**Frase Final:** "Lean não é destino, é jornada. Amanhã tem que ser melhor que hoje." 🌱

---

**Preparado por:** [Nome do Docente]  
**Data:** 2026-09-08  
**Versão:** 1.0  
**Status:** ✅ Pronto para lecionar

**UC CONCLUÍDA COM SUCESSO!**
