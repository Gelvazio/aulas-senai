# AULA 04 — Ferramentas Lean: 5S e Troca Rápida de Ferramenta (TRF/SMED)

**Programa:** Qualificação Profissional — SENAI  
**UC:** Introdução ao Lean Manufacturing  
**Duração:** 3 horas presenciais (180 min)  

---

## 🎯 Objetivos de Aprendizagem

1. ✅ Implementar 5S passo a passo em ambiente real
2. ✅ Entender TRF (Troca Rápida de Ferramenta) e SMED
3. ✅ Aplicar técnicas de otimização de setup
4. ✅ Medir ganhos de eficiência

---

## 📚 Conteúdo Programático

### 1. **Implementação Prática do 5S** (90 min)

#### **1 — SEIRI (Seleção/Classificação)** (15 min)
- **Objetivo:** Separar o que é necessário do que é desnecessário
- **Perguntas Chave:**
  - "Isso é usado com frequência?" (diária/semanal/mensal)
  - "Está em bom estado?" (funciona?)
  - "Cliente vê valor nisso?"
- **Ação:** Separar em 3 piles:
  - ✅ **Verde:** Necessário (manter, organizar)
  - 🟡 **Amarelo:** Questionável (guardar por 1 mês, depois reavalia)
  - 🔴 **Vermelho:** Desnecessário (jogar fora, reciclar, vender como sucata)
- **Exemplo:** Ferramentas quebradas, materiais vencidos, documentos antigos → tudo sai!
- **Benefício:** Reduz clutter, libera espaço, aumenta segurança

#### **2 — SEITON (Organização)** (15 min)
- **Objetivo:** Cada coisa em seu lugar (eficiência de busca)
- **Princípios:**
  - Local lógico: material próximo de uso
  - Frequência de uso: itens usados diariamente ao alcance; raramente usados distante
  - Altura certa: cintura é melhor que acima da cabeça ou no chão (ergonomia)
  - Fácil de encontrar: etiquetas, cores, linhas
- **Técnica — Layout 5S:**
  - Desenhar no chão (fita branca) onde cada ferramenta vai
  - Etiqueta visual (foto + nome + código)
  - Cores: ferramentas de corte = vermelha; de medição = azul (padrão)
- **Exemplo:** Painel de ferramentas (shadow board) — cada ferramenta tem seu desenho
- **Benefício:** Buscar uma ferramenta em <10 segundos

#### **3 — SEISO (Limpeza)** (15 min)
- **Objetivo:** Manter limpo, eliminar resíduos
- **Ações:**
  - Limpeza profunda (equipamentos, pisos, prateleiras)
  - Remove pó, óleo, restos de material
  - Inspecionar durante limpeza (descobre problemas)
- **Frequência:** Diária (fim de expediente), semanal (profunda)
- **Responsabilidades:** Cada operário limpa seu posto (não é só pessoal de limpeza)
- **Inspeção:** Usar limpeza como oportunidade de ver problemas (vazamento, parafuso solto, etc.)
- **Benefício:** Ambiente seguro, maior concentração, menor contaminação

#### **4 — SEIKETSU (Padronização)** (15 min)
- **Objetivo:** Estabelecer padrões visuais que todos entendam
- **Elementos:**
  - Cores: verde (OK), amarelo (atenção), vermelho (erro/perigo)
  - Linhas: demarcação de áreas (corredor, estação de trabalho)
  - Etiquetas: nome, código, validade
  - Fotografias: "ideal" pendurada na parede (antes/depois)
  - SOP visual: quadro com procedimento em imagens (não texto)
- **Exemplo:**
  - Linha amarela = corredor (não há estoque aqui)
  - Luz vermelha = alerta (defeito detectado)
  - Foto do painel organizado (inspiração diária)
- **Benefício:** Novo colaborador entende tudo visualmente

#### **5 — SHITSUKE (Disciplina/Sustentação)** (15 min)
- **Objetivo:** Manter hábitos e rotinas (5S não "desgasta")
- **Ações:**
  - Auditorias mensais (checklist 5S)
  - Reconhecimento de setor mais organizado
  - Treinamento contínuo de novatos
  - Liderança modela o comportamento
- **Ciclo:** Se não há disciplina, bagunça volta (em 3-6 meses)
- **Ferramenta — 5S Audit:** Pontuação 1-5 em cada aspecto
  - Resultado: Mapa visual do progresso (gráfico)
- **Benefício:** Cultura de excelência sustentada

**Resumo 5S em Prática:**
1. Tirar tudo desnecessário (Seiri)
2. Organizar logicamente (Seiton)
3. Limpar completamente (Seiso)
4. Padronizar visualmente (Seiketsu)
5. Manter disciplina (Shitsuke)

---

### 2. **Troca Rápida de Ferramenta (TRF) / SMED** (90 min)

#### 2.1 — Conceito de Setup
- **Setup:** Tempo entre o fim de um produto e o início do próximo (mudança de ferramenta/configuração)
- **Problema Tradicional:** Setup pode levar 2-4 horas!
  - Resultado: Produzir em lotes grandes (não Lean)
- **Solução SMED:** Single Minute Exchange of Die (reduzir para minutos)
  - SMED literalmente = trocar ferramenta em menos de 10 minutos

#### 2.2 — Os 4 Passos do SMED

**Passo 1: Separar Operações Internas × Externas** (30 min — aula)
- **Operações Internas:** Só podem ser feitas com máquina PARADA
  - Ex.: Remover dado (matriz), colocar novo dado
  - Tempo: Máquina produz 0 unidades (custoso)
- **Operações Externas:** Podem ser feitas ENQUANTO máquina está rodando
  - Ex.: Preparar novo dado, buscar materiais, aquecer equipamento
  - Tempo: Máquina continua produzindo (eficiente!)
- **Objetivo:** Maximizar externas, minimizar internas

**Passo 2: Converter Internas → Externas** (30 min — aula)
- Ideia: Se operação pode ser feita antes da máquina parar, economiza tempo
- **Exemplo Real:**
  - ❌ Tradicional: Máquina para → Buscar novo dado (2 min) → Instalar (3 min) → Calibrar (5 min) = 10 min parado
  - ✅ SMED: Enquanto máquina roda, alguém prepara novo dado fora → Máquina para, dado já está pronto → Só instala (2 min)
- **Técnicas:**
  - Pré-preparação (dado aquecido, alinhado antes)
  - Ferramentas especiais (clampe rápido, em vez de parafusos)
  - Dois operários (um faz externo, outro faz interno)

**Passo 3: Otimizar Operações Internas** (20 min — aula)
- Mesmo as operações internas podem ser mais rápidas
- **Técnicas:**
  - Movimento paralelo: Ao invés de sequencial (passo 1 → passo 2 → passo 3), fazer 1 e 2 simultaneamente
  - Ferramentas rápidas: Chavetas rápidas em vez de parafusos e chaves inglesas
  - Procedimento simples: Eliminar calibragens desnecessárias
- **Exemplo:** Reduzir calibração de 5 pontos para 3 pontos (cliente não vê diferença)

**Passo 4: Otimizar Operações Externas** (10 min — aula)
- Eliminar desperdício nas atividades que acontecem fora
- Organizar local de preparação (5S)
- Treinamento (operário sabe exatamente o que fazer)
- **Resultado:** Ganho incremental

#### 2.3 — Exemplo Prático: Mudança de Molde em Injetora Plástica

**Cenário Inicial (Método Tradicional):**
```
Máquina para com produto X
01 min — Operário procura novo molde (X perdido onde?)
02 min — Busca ferramenta (chave inglesa, martelo)
03 min — Remove 8 parafusos de retenção (manual)
02 min — Limpa máquina de resíduos do produto anterior
05 min — Coloca novo molde
04 min — Alinha molde (testes, ajustes)
03 min — Aquece máquina e faz setup de temperatura/pressão
02 min — Testes (5 unidades) para validar
────────
22 min — TOTAL DE SETUP
```

**Cenário Otimizado (SMED):**
```
ENQUANTO máquina produz última série de X:
✅ Operário Y prepara molde novo em estação separada
✅ Prepara ferramenta rápida
✅ Aquece molde preventivamente

Máquina termina X:
01 min — Operário X remove 8 parafusos com ferramenta rápida (socket)
01 min — Limpa máquina
01 min — Coloca novo molde (já aquecido)
01 min — Alinha com posicionadores laser (automático)
01 min — Máquina tem temperatura/pressão já setadas (pré-configurado)
01 min — Testes rápidos
────────
6 min — TOTAL NOVO SETUP (economia: 73%!)
```

**Resultado:** De 22 min para 6 min = 16 min economizados por troca
- Se fábrica faz 10 trocas/dia = 160 min = 2,7 horas produção EXTRA por dia!

#### 2.4 — Ganhos com SMED

| Aspecto | Impacto |
|---------|---------|
| **Lead Time** | Reduz 30-50% |
| **Lotes Menores** | Possibilita produção Lean (one-piece-flow) |
| **Flexibilidade** | Consegue atender pedidos variados (não é preso em lotes) |
| **Qualidade** | Menos testes necessários (processo estável) |
| **Custo** | Reduz overhead, aumenta throughput |

---

## 🎬 Estratégias de Ensino

1. **Demonstração Prática:** Simulação de setup (lego, parafusos, etc.)
2. **Estudo de Caso:** Vídeo de fábrica real antes/depois SMED
3. **Cronometragem:** Medir tempo e validar redução
4. **Brainstorm:** Grupo propõe otimizações
5. **Simulação:** Jogo onde times competem (melhor SMED ganha)

---

## ✍️ Atividades Práticas

### **Atividade 1: 5S em Área Designada** (60 min)
**Objetivo:** Aplicar 5S real em sala/área

**Procedimento:**
1. Escolher área (cantina, sala de ferramentas, ou montar cenário)
2. Fotografar "ANTES"
3. Grupos fazem os 5 passos:
   - Seiri: Tiram o desnecessário
   - Seiton: Organizam logicamente (com fita branca, etiquetas)
   - Seiso: Limpam
   - Seiketsu: Padronizam (cores, fotos)
   - Shitsuke: Criação de audit checklist
4. Fotografar "DEPOIS"
5. Apresentar antes/depois (impacto visual)

---

### **Atividade 2: SMED Simulado** (60 min)
**Objetivo:** Otimizar setup usando os 4 passos

**Simulação:**
- **Setup Tradicional:** Trocar "molde" (representado por caixa com 8 parafusos)
  - Operário tem que remover, limpar, colocar novo, calibrar = cronometrar tempo
- **Rodada 1 (Baseline):** Fazer como sempre (esperado: 8-10 min)
- **Rodada 2 (Converter Externo):** Enquanto máquina "roda", preparar próximo molde fora
- **Rodada 3 (Otimizar Interno):** Usar ferramenta rápida (socket + chave de fenda)
- **Rodada 4 (Otimizar Externo):** Duas pessoas coordenadas
- **Cronometro cada rodada:** Mostrar progresso (meta: reduzir 50%)

---

## 📋 Avaliação Formativa

**Checklist:**
- [ ] Aluno lista os 5 S com definições
- [ ] Implementa 5S logicamente em espaço
- [ ] Compreende diferença entre operações internas/externas
- [ ] Propõe otimizações realistas de setup

---

## 🎒 Tarefa de Casa

1. **Análise:** Descrever um setup conhecido (casa, trabalho); cronometrar operações internas vs. externas
2. **Propostas:** Sugerir 3 melhorias para reduzir tempo
3. **Desenho:** Fazer mapa de layout 5S (antes e depois)

---

## 📚 Recursos Necessários

- Área para praticar 5S (cantina, sala, ou simulado)
- Materiais: caixas, parafusos, chaves, cronômetro
- Fita branca (demarcação 5S)
- Etiquetas, marcadores
- Câmera (fotos antes/depois)

---

## 📞 Referências

- ROTHER, Mike; SHOOK, John. *Learning to See*. Cap. "5S Foundation"
- LIKER, Jeffrey K. *The Toyota Way*. Cap. "5S and Standardized Work"

---

## 📍 Próxima Aula

**AULA 05 — Ferramentas: Fluxo Contínuo e Jidoka**
- Implementação de fluxo contínuo (one-piece-flow)
- Jidoka (automação com aspecto humano)
- Andon e parada de produção

---

**Preparado por:** [Nome do Docente]  
**Data:** 2026-09-08  
**Versão:** 1.0  
**Status:** ✅ Pronto para lecionar
