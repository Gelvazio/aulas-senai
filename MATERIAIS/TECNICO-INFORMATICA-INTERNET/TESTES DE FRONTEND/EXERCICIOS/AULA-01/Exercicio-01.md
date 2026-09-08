# EXERCÍCIO 01 — Aula 01: Classificar Tipos de Testes

**Duração:** 15 minutos  
**Dificuldade:** ⭐ Fácil  
**Objetivo:** Aplicar conceitos de tipos de testes (unitário, integração, E2E)  

---

## 📋 INSTRUÇÃO

Classifique cada cenário de teste abaixo como:
- **U** = Unitário (teste de função isolada)
- **I** = Integração (múltiplas partes)
- **E** = E2E (fluxo completo do usuário)

**Tempo:** 15 minutos sem consultar material

---

## 🎯 CENÁRIOS

### 1️⃣ Botão "Enviar" abre modal de confirmação

**Contexto:** Teste para aplicação de formulário

**Teste:** Quando usuário clica botão "Enviar", uma modal aparece com "Tem certeza?"

**Classifique como:** `_____`

**Dica:** Envolve mais de uma parte trabalhando junto (evento + DOM + estado)

---

### 2️⃣ Função calcularImposto(100, 0.1) retorna 110

**Contexto:** Função JavaScript pura

```javascript
function calcularImposto(valor, aliquota) {
  return valor + (valor * aliquota);
}

// Teste: 
// Input: (100, 0.1)
// Expected: 110
```

**Classifique como:** `_____`

**Dica:** Está testando uma função isolada, sem UI

---

### 3️⃣ Usuário faz login → vê dashboard → clica "Vendas" → vê lista de vendas

**Contexto:** Fluxo completo de navegação

**Teste:** Simulação completa de usuário novo acessando sistema

**Classifique como:** `_____`

**Dica:** Começa do início até um objetivo final

---

### 4️⃣ Quando campo de email perde foco (blur), valida se é email válido

**Contexto:** Validação em componente de formulário

**Teste:** 
- Usuário digita "invalido@"
- Campo perde foco
- Mensagem de erro aparece

**Classifique como:** `_____`

**Dica:** Envolve input + evento + validação + UI

---

### 5️⃣ Array.sort() ordena números em ordem crescente

**Contexto:** Teste de função JavaScript nativa

```javascript
const numeros = [3, 1, 4, 1, 5];
const resultado = numeros.sort((a, b) => a - b);
// Expected: [1, 1, 3, 4, 5]
```

**Classifique como:** `_____`

**Dica:** Função isolada, nenhuma UI envolvida

---

### 6️⃣ Input de texto aceita máximo 50 caracteres

**Contexto:** Validação de comprimento de campo

**Teste:**
- Digita 60 caracteres
- Apenas 50 são aceitos
- 10 caracteres são ignorados

**Classifique como:** `_____`

**Dica:** Envolve componente (input) + lógica de validação + UI

---

### 7️⃣ Usuário faz upload de arquivo → vê preview → clica "Confirmar" → arquivo é salvo

**Contexto:** Fluxo completo de upload

**Teste:** Simular usuário do início (selecionar arquivo) até fim (salvo no servidor)

**Classifique como:** `_____`

**Dica:** Fluxo do usuário de ponta a ponta

---

### 8️⃣ Promise que busca dados resolve com objeto correto

**Contexto:** Teste de função assíncrona

```javascript
async function fetchUser(id) {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}

// Teste: fetchUser(1) resolve com { id: 1, name: "João" }
```

**Classifique como:** `_____`

**Dica:** Função isolada (mesmo sendo assíncrona)

---

### 9️⃣ Modal fecha quando usuário clica botão "X" ou fora da modal

**Contexto:** Interação de componente

**Teste:**
- Abre modal
- Clica X → modal fecha ✅
- Abre novamente
- Clica fora → modal fecha ✅

**Classifique como:** `_____`

**Dica:** Múltiplas interações de um componente

---

### 🔟 API GET /users retorna JSON com estrutura { id, name, email }

**Contexto:** Teste de endpoint de API

**Teste:** Fazer requisição GET, verificar se retorna estrutura correta

**Classifique como:** `_____`

**Dica:** Envolve backend + comunicação entre cliente/servidor

---

## 📝 GABARITO (Para Professor Apenas)

```
1. I (integração)    — evento + DOM + estado
2. U (unitário)      — função isolada
3. E (E2E)           — fluxo completo
4. I (integração)    — componente + validação + UI
5. U (unitário)      — função pura isolada
6. I (integração)    — componente + lógica
7. E (E2E)           — fluxo usuário completo
8. U (unitário)      — função isolada (mesmo assíncrona)
9. I (integração)    — interações de componente
10. I (integração)   — cliente + servidor
```

---

## ✅ GABARITO COMENTADO

### 1️⃣ INTEGRAÇÃO ✓

**Por quê?** Envolve:
- Evento de click (DOM)
- Mudança de estado (variável que controla visibilidade)
- Renderização de modal (UI)

Múltiplas partes trabalhando juntas = **Integração**

**Não é E2E porque:** Não é fluxo do usuário do início ao fim, só uma ação

---

### 2️⃣ UNITÁRIO ✓

**Por quê?** 
- Testando UMA função isolada
- Sem dependências externas
- Sem UI

Função isolada = **Unitário**

---

### 3️⃣ E2E ✓

**Por quê?** Fluxo completo:
1. Login (tela 1)
2. Dashboard (tela 2)
3. Vendas (tela 3)
4. Lista (tela 4)

Começando do primeiro passo até objetivo final = **E2E**

---

### 4️⃣ INTEGRAÇÃO ✓

**Por quê?** Envolve:
- Componente input (DOM)
- Evento blur (interação)
- Função de validação (lógica)
- Mensagem de erro (UI)

Múltiplas partes = **Integração**

**Não é E2E porque:** Só testa uma ação, não fluxo completo

---

### 5️⃣ UNITÁRIO ✓

**Por quê?**
- Função isolada
- Sem UI
- Sem dependências

Mesmo que seja método nativo = **Unitário**

---

### 6️⃣ INTEGRAÇÃO ✓

**Por quê?** Envolve:
- Componente input (DOM)
- Limite de caracteres (lógica)
- Input não aceita mais (UI feedback)

**Não é unitário porque:** Envolve UI/DOM

**Não é E2E porque:** Só testa uma ação

= **Integração**

---

### 7️⃣ E2E ✓

**Por quê?** Fluxo completo:
1. Selecionar arquivo (ação 1)
2. Ver preview (feedback)
3. Clicar confirmar (ação 2)
4. Arquivo salvo (resultado final)

Começo até fim = **E2E**

---

### 8️⃣ UNITÁRIO ✓

**Por quê?**
- Função isolada (mesmo assíncrona)
- Pode ser testada com mock/stub
- Sem UI

Função isolada = **Unitário**

> **Nota importante:** Testes assíncrono ainda são **unitários** se a função é isolada!

---

### 9️⃣ INTEGRAÇÃO ✓

**Por quê?** Envolve:
- Múltiplas interações (click X, click fora)
- Componente modal (DOM)
- Mudança de estado (visível ↔ invisível)

**Não é E2E porque:** Só testa um componente isolado, não fluxo do usuário

= **Integração**

---

### 🔟 INTEGRAÇÃO ✓

**Por quê?** Envolve:
- Cliente (seu código JavaScript)
- Servidor (API)
- Comunicação entre eles

**Não é unitário porque:** Depende de backend

**Não é E2E porque:** Só testa 1 endpoint, não fluxo completo do usuário

= **Integração**

---

## 🎯 RESPOSTA ESPERADA

**Resultado ideal:**
- Acertar 8-10: ✅ Domina conceitos
- Acertar 6-7: 🟡 Bom entendimento
- Acertar 4-5: ⚠️ Revisar conteúdo
- Acertar <4: ❌ Reforço necessário

---

## 💡 INSIGHTS COMUNS

### Erro Frequente #1
**Confundir "com UI" com "E2E"**

❌ Errado: "Se testa UI, é E2E"
✅ Certo: "E2E testa UI + fluxo completo do usuário"

**Exemplo:**
- Teste que modal fecha = **Integração** (só 1 componente)
- Teste login → vê modal = **E2E** (fluxo completo)

---

### Erro Frequente #2
**Confundir "assíncrono" com "integração"**

❌ Errado: "Promise é integração porque é complexa"
✅ Certo: "Função assíncrona isolada é unitário"

**Diferença:**
- `fetchUser()` sozinha = **Unitário**
- `fetchUser()` + usar resultado em UI = **Integração**

---

### Erro Frequente #3
**Classificar por "quantidade de código" em vez de "escopo"**

❌ Errado: "100 linhas = Integração"
✅ Certo: "Função isolada = Unitário, mesmo com 100 linhas"

---

## 📚 REFERÊNCIA RÁPIDA

| Pergunta | Resposta | Tipo |
|----------|----------|------|
| "Testa UMA função isolada?" | SIM | ✅ UNITÁRIO |
| "Envolve múltiplas partes (UI + lógica)?" | SIM | ✅ INTEGRAÇÃO |
| "Fluxo completo do usuário?" | SIM | ✅ E2E |
| "Sem UI?" | SIM | → Probablemente UNITÁRIO |
| "Com UI?" | SIM | → Probablemente INTEGRAÇÃO ou E2E |

---

## 🏆 DICA DE SUCESSO

**Quando em dúvida, pergunte-se:**

> "Quantas partes diferentes estou testando ao mesmo tempo?"

- **1 parte** (função) = **UNITÁRIO**
- **2-3 partes** (componente + lógica) = **INTEGRAÇÃO**
- **Todas as partes** (fluxo do usuário) = **E2E**

---

**Fim do Exercício 01**

*Dificuldade: Fácil*  
*Tempo: 15 min*  
*Conceito: Tipos de Testes*
