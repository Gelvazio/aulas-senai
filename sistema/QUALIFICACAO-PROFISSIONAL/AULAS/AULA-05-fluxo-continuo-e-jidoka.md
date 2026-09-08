# AULA 05 — Ferramentas Lean: Fluxo Contínuo e Jidoka

**Programa:** Qualificação Profissional — SENAI  
**UC:** Introdução ao Lean Manufacturing  
**Duração:** 3 horas presenciais (180 min)  

---

## 🎯 Objetivos de Aprendizagem

1. ✅ Implementar fluxo contínuo (one-piece-flow)
2. ✅ Entender conceito de Jidoka (automação com aspecto humano)
3. ✅ Aplicar sistema Andon (alertas visuais)
4. ✅ Reconhecer benefícios de parada imediata

---

## 📚 Conteúdo Programático

### 1. **Fluxo Contínuo de Produção** (90 min)

#### 1.1 — Conceito de Fluxo vs. Lote

**Método Tradicional (Lote):**
```
Estação A     Estação B     Estação C
├─ 100 peças ├─ Fila ───┬─ Fila ────┐
│ processadas│ (50 min) │ (60 min)  │
│ em 40 min  └─────────┘           │
                                    ↓
Tempo total: 40 + 50 + processing + 60 = ~200 minutos
WIP: 200 peças em processo
```

**Fluxo Contínuo (One-Piece-Flow):**
```
Estação A → Estação B → Estação C → Saída
├─ 1 peça → 1 peça → 1 peça → 1 peça

Tempo total: ~4 minutos (suma dos tempos)
WIP: 3 peças máximo
Vantagem: Defeito descoberto em minutos, não em dias
```

#### 1.2 — Componentes do Fluxo Contínuo

1. **Dimensionamento de Célula:**
   - Próximo ao cliente (não máquinas distantes)
   - Formato em U ou linha
   - Equipamento sequencial

2. **Balanceamento de Operações:**
   - Cada estação tem tempo de ciclo IGUAL (balanceado)
   - Se A = 5 min, B = 5 min, C = 5 min → fluxo perfeito
   - Se A = 5, B = 8, C = 3 → B é gargalo (deve ser otimizado)

3. **Eliminação de Buffer:**
   - Evitar pilhas de materiais entre estações
   - Máximo 1-2 peças de WIP

4. **Operador Polivalente:**
   - Operário consegue fazer múltiplas tarefas
   - Balanceia tarefas conforme necessário

#### 1.3 — Implementação Prática

**Exemplo: Célula de Montagem Eletrônica**

Tradicional (3 operários, 1 lote de 50 peças):
- Operário 1: Solda 50 peças (50 min) → fila
- Operário 2: Testa 50 peças (60 min) → fila
- Operário 3: Embalagem 50 peças (40 min)
- **Lead time: 150 min | Defeito visto em 2+ horas**

Fluxo Contínuo (3 operários, 1 peça por vez):
- Operário 1: Solda 1 peça (1 min)
  - Passa para Operário 2
- Operário 2: Testa 1 peça (1,2 min)
  - Passa para Operário 3
- Operário 3: Embala 1 peça (0,8 min)
  - Peça sai completa
- **Lead time: 3 min | Defeito visto em minutos**

**Ganho:** 
- Lead time: 98% menor
- Defeitos detectados rapidamente
- Cliente recebe em horas, não dias

#### 1.4 — Desafios e Soluções

| Desafio | Solução |
|---------|---------|
| Operações com tempo diferente | Balancear: dividir tarefas, auxiliar gargalo |
| Máquina lenta (2h ciclo) | Dedicar operário só à máquina; outros fazem outro produto |
| Flutuação de demanda | Usar Takt Time para sincronizar |
| Espaço limitado | Organizar layout em U (compacto) |

---

### 2. **Jidoka (Automação com Aspecto Humano)** (90 min)

#### 2.1 — Conceito de Jidoka

> **Jidoka (自動化):** "Automação com aspecto humano" — máquinas/processos que **detectam anormalidades e PARAM automaticamente**, liberando operário para atividades de valor agregado

**Diferença:**
- **Automação tradicional:** Máquina liga, faz tudo, operário é espectador (caro!)
- **Jidoka:** Máquina faz trabalho; se erro → máquina PARA + avisa (operário reage)

#### 2.2 — Os 4 Princípios de Jidoka

1. **Detecção de Anormalidade:**
   - Sensor detecta defeito, variação, ou problem
   - Não esperar até fim de lote (é tarde!)
   - Exemplos:
     - Sensor de temperatura (se fora do range → alerta)
     - Detector de posição (se peça não encaixou → para)
     - Câmera (detecta falta de componente)

2. **Parada Imediata:**
   - Máquina PARA assim que detecta problema
   - Evita que defeito se propague para próximas peças
   - Resultado: 1 peça ruim, não 100

3. **Aviso Visual/Sonoro:**
   - **Andon (行灯):** Luz que acusa (verde = OK; amarelo = atenção; vermelho = parou)
   - **Buzzer:** Som para chamar atenção do operário
   - **Display:** Mostra código de erro
   - Objetivo: Qualquer um vê o problema de longe

4. **Resposta Rápida:**
   - Operário/supervisor vem investigar imediatamente
   - Fixa problema ou solicita manutenção
   - Reinicia máquina
   - Registra causa (para evitar reincidência)

#### 2.3 — Implementação Prática de Jidoka

**Exemplo 1: Linha de Corte de Tecido**

Tradicional:
- Máquina corta lote de 100 tecidos
- Operário supervisiona
- Se faca fica cega (corte ruim) → 50 tecidos já estão ruins
- Perda total!

Jidoka:
- Sensor mede espessura de corte
- Se corte fica >5% abaixo → máquina PARA
- Luz vermelha acende + buzzer toca
- Operário troca faca (5 min)
- Apenas 1 tecido perdido

**Exemplo 2: Processo de Soldagem**

Tradicional:
- Operário solda peças manualmente
- Se pressão está baixa → solda fraca (invisível)
- Descobrimento: em inspeção (2 dias depois)

Jidoka:
- Máquina monitora pressão DURANTE solda
- Se pressão cai → máquina PARA, marca peça com tinta vermelha
- Operário ve imediatamente
- Peça é retrabalha ou descartada (mesma hora)

#### 2.4 — Sistema Andon (Visual Management)**

**O Que É Andon?**
- Painel visual que mostra status de cada máquina/estação
- Cores: 🟢 Verde (normal), 🟡 Amarelo (atenção), 🔴 Vermelho (parou)
- Deve ser visível de qualquer ponto da fábrica

**Benefícios:**
- Gerente vê tudo de longe (sem perguntar)
- Operário sabe que o problema é visível (age rápido)
- Lead time reduz (resposta rápida)

**Implementação:**
```
Estação A: 🟢 (normal)
Estação B: 🔴 (parou)        ← Vermelho = procure aqui!
Estação C: 🟡 (atenção)
Estação D: 🟢 (normal)
```

#### 2.5 — Fases de Implementação Jidoka

1. **Fase 1: Identificação**
   - Mapear onde há erros frequentes
   - Descrever tipo de erro (dimensão, defeito, falta)

2. **Fase 2: Detecção**
   - Instalar sensor / camera / sistema que deteta erro
   - Testes: verificar detecção correto

3. **Fase 3: Parada Automática**
   - Programar máquina para PARAR ao erro
   - Teste: simular erro e confirmar parada

4. **Fase 4: Aviso + Resposta**
   - Ativar Andon (luz + som)
   - Treinar operário para resposta
   - Cronometrar tempo resposta (meta: <5 min)

5. **Fase 5: Análise de Causa Raiz**
   - Coletar dados de erros
   - Usar 5 Porquês para achar raiz
   - Eliminar causa (preventivo)

---

## 🎬 Estratégias de Ensino

1. **Simulação Fluxo:** Jogo onde grupos montam lego em lote vs. um a um
2. **Demonstração Andon:** Luz/buzzer em simulação
3. **Vídeo:** Fábrica Toyota mostrando Jidoka em ação
4. **Discussão:** Onde Jidoka pode ser aplicado fora de manufatura?
5. **Projeto:** Desenhar sistema Andon para departamento

---

## ✍️ Atividades Práticas

### **Atividade 1: Jogo Lote vs. Fluxo** (45 min)
**Objetivo:** Vivenciar diferença de lead time

**Simulação:** Montar pulseira com 4 contas (estações A, B, C, D)

**Rodada 1 (Lote):**
- Grupo 1: Faz 10 pulseiras na estação A → fila
- Grupo 2: Recebe, faz 10 na estação B → fila
- Etc.
- Cronometro: tempo até 1ª pulseira sair? Tempo até 10ª?
- Resultado: 30-40 min, muita fila, acúmulo de WIP

**Rodada 2 (Fluxo):**
- Mesmos grupos, mesmas operações
- Mas: 1 conta por vez
- Cronometro: tempo até 1ª? Tempo até 10ª?
- Resultado: 5 min, nenhuma fila, WIP baixo

**Comparação:** Mostrar impacto visual (100% melhora!)

---

### **Atividade 2: Detectar e Corrigir Erro** (45 min)
**Objetivo:** Praticar Jidoka (detecção + parada + resposta)

**Setup:** Simulação de produção com "defeito intencionalmente inserido"

**Procedimento:**
1. Rodar "processo" com produto defeituoso
2. Classe tem que:
   - Detectar (virar luz vermelha ou buzzer)
   - Identificar tipo erro
   - Parar produção (levantar mão)
   - Diagnosticar (5 porquês)
   - Corrigir
3. Cronometro: tempo até resolução
4. Objetivo: <10 min resposta

---

## 📋 Avaliação Formativa

**Checklist:**
- [ ] Aluno explica fluxo contínuo vs. lote
- [ ] Compreende Jidoka como "parada inteligente"
- [ ] Identifica quando aplicar cada ferramenta
- [ ] Propõe sistema Andon coerente

---

## 🎒 Tarefa de Casa

1. **Análise:** Descrever processo conhecido; propor fluxo contínuo
2. **Jidoka:** Identificar 3 pontos onde erro pode ocorrer; propor detecção
3. **Andon:** Desenhar painel Andon para departamento

---

## 📚 Recursos Necessários

- Contas, barbante (simulação fluxo)
- Buzzer / luz vermelha (simulação Andon)
- Vídeo: "Toyota Jidoka" (YouTube, 5 min)
- Câmera (fotos antes/depois layout)

---

## 📍 Próxima Aula

**AULA 06 — Trabalho Padronizado, Gerenciamento Visual e Projeto Final**
- Standard Work (padronização de operações)
- Gerenciamento Visual completo
- Projeto integrador (aplicar tudo)

---

**Preparado por:** [Nome do Docente]  
**Data:** 2026-09-08  
**Versão:** 1.0  
**Status:** ✅ Pronto para lecionar
