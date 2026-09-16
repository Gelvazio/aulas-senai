# ⚡ Sistema de Pontuação com Cronômetro Dinâmico — Quiz Qualidade

**Data:** 2026-09-16  
**Status:** ⬜ Pendente  
**Arquivos Afetados:**
- `quiz-qualidade-por-aluno.html`

---

## 📋 Objetivo

Implementar sistema de pontuação **dinâmica em tempo real**:
- **Tempo total por questão:** 20 segundos
- **Pontos diminuem conforme o tempo passa** (mostrado ao vivo)
- **Cronômetro exibe a pontuação atualizada a cada segundo**
- Quanto mais rápido responder, mais pontos ganha

---

## 🧮 Fórmula de Cálculo

```javascript
// baseado no tempo RESTANTE (não gasto)
pontos = Math.max(0, Math.ceil((timeLeft / 20) * 150))
```

**Visualização com 20s de limite:**
- **20s restante** → 0 pontos (não vale nada esperar)
- **19s restante** → ~11 pontos
- **15s restante** → ~112 pontos
- **10s restante** → ~75 pontos
- **5s restante** → ~37 pontos
- **1s restante** → ~7 pontos
- **0s restante** → 0 pontos (tempo esgotado, auto-reinicia)

**Progressão inversa:** quanto mais tempo passa, menos pontos vale

---

## 📝 Passos Implementação

| # | Ação | Detalhe |
|---|------|--------|
| 1️⃣ | Mudar tempo máximo por questão | De 45-60s para **20 segundos** |
| 2️⃣ | Criar função `calcularPontosPorTempo(timeLeft)` | Retorna 0-150 baseado em tempo restante |
| 3️⃣ | Atualizar display do cronômetro | Mostrar "⏱️ 15s — 💰 112 pontos" ao vivo |
| 4️⃣ | Atualizar `updateTimerDisplay()` | Recalcular pontos a cada segundo |
| 5️⃣ | Modificar `submitAnswer()` | Calcular pontos e aplicar ao score |
| 6️⃣ | Mostrar feedback com pontos | "✅ Resposta correta! +112 pontos" |
| 7️⃣ | Auto-reiniciar se tempo esgotado | Ao atingir 0s, reinicia quiz |

---

## 🔄 Visualização da Tela

```
┌─────────────────────────────────────┐
│  Pergunta 5 de 20   ⏱️ 15s — 💰 112 pts   100/20 │
├─────────────────────────────────────┤
│                                     │
│  Qual é a definição de...?         │
│                                     │
│  ○ Opção A                          │
│  ○ Opção B                          │
│  ○ Opção C  ← SELECIONADA          │
│                                     │
│  [Responder]                        │
│                                     │
└─────────────────────────────────────┘

Legenda:
- ⏱️ 15s = Tempo restante em tempo real
- 💰 112 pts = Pontos que ganhará SE acertar NESTE momento
- Atualiza a cada 1 segundo que passa
```

---

## 🔧 Mudanças no Código

### 1. Constante de Tempo
```javascript
const TEMPO_POR_QUESTAO = 20; // segundos (era 45-60)
```

### 2. Função de Cálculo
```javascript
function calcularPontosPorTempo(timeLeft) {
  return Math.max(0, Math.ceil((timeLeft / TEMPO_POR_QUESTAO) * 150));
}
```

### 3. Atualização do Timer Display
```javascript
function updateTimerDisplay() {
  const timerEl = document.getElementById('timer');
  const pontos = calcularPontosPorTempo(timeLeft);
  timerEl.textContent = `⏱️ ${timeLeft}s — 💰 ${pontos} pts`;
  // ... resto do código
}
```

### 4. Resposta Correta
```javascript
} else if (selectedAnswer === q.correct) {
  const pontos = calcularPontosPorTempo(timeLeft);
  score += pontos;
  acertou = true;
  feedback.textContent = `✅ Resposta correta! +${pontos} pontos`;
  // ...
}
```

---

## ⚠️ Notas Importantes

- ✅ **Tempo máximo:** 20 segundos (antes era 45-60)
- ✅ **Pontos máximos por questão:** 150 (respondendo em 1s)
- ✅ **Pontos mínimos:** 0 (respondendo em 20s ou não respondendo)
- ✅ **Display dinâmico:** Atualiza a cada segundo
- ✅ **Score máximo total:** 20 perguntas × 150 = **3.000 pontos**
- ✅ **Respostas incorretas:** 0 pontos (reinicia quiz)

---

## 📊 Status

| Item | Status | Detalhes |
|------|--------|----------|
| Análise | ✅ Concluído | Fórmula dinâmica definida |
| Plano | ✅ Concluído | Passos e visualização acima |
| Aprovação | ⬜ Pendente | Aguardando confirmação do usuário |
| Implementação | ⬜ Pendente | Será iniciada após aprovação |
| Testes | ⬜ Pendente | Validar display dinâmico |

---

## 🎯 Resultado Final Esperado

**Antes:** Quiz com 45-60s, score incrementado em +1  
**Depois:** Quiz com 20s, cronômetro dinâmico mostrando pontos diminuindo

