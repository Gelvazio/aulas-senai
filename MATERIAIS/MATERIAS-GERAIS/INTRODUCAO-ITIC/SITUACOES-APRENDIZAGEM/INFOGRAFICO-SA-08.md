# 📊 SA 08 — DADOS DE PRODUÇÃO EM PLANILHA

**Carga Horária:** 4h | **Capacidade:** C4, C5 | **Instrumento:** Planilha + Gráfico

---

## 🎯 OBJETIVO

> **"Organizar dados de produção em tabela, aplicar fórmulas e gerar gráficos para análise"**

---

## 📋 SITUAÇÃO

**Dados brutos sem estrutura:**
- ❌ Papéis com números de produção por dia
- ❌ Sem forma de calcular totais
- ❌ Impossível visualizar tendências
- ❌ Difícil comparar períodos

**RESULTADO:** Decisões baseadas em suposição, não dados.

---

## 3️⃣ ESTRUTURA BÁSICA

### 🔴 ESSENCIAL:

```
┌─────────────────────────────────────────┐
│  PRODUÇÃO — Janeiro 2026                │
├─────────────────────────────────────────┤
│ DIA  │ PRODUTOS │ HORAS │ EFICIÊNCIA %  │
│  1   │   250    │  8    │  31,25%       │
│  2   │   280    │  8    │  35,00%       │
│  ... │   ...    │  ... │   ...%        │
│ SUM  │  7.850   │ 244   │  32,13%       │
└─────────────────────────────────────────┘
```

---

## 4️⃣ FÓRMULAS ESSENCIAIS

### 🔴 ESSENCIAL — Domine:

1. **SOMA:** Total de coluna
   ```
   =SOMA(C2:C31)     → Soma C2 até C31
   ```

2. **MÉDIA:** Média aritmética
   ```
   =MÉDIA(D2:D31)    → Média de eficiência
   ```

3. **CONTAGEM:** Quantas células têm valor
   ```
   =CONTAGEM(A2:A31) → Quantos dias registrados
   ```

4. **SE (IF):** Condição simples
   ```
   =SE(C2>300,"Alto","Baixo")  → Se > 300, escreve "Alto"
   ```

### 🟡 IMPORTANTE:

5. **MÁXIMO e MÍNIMO:**
   ```
   =MÁXIMO(C2:C31)   → Maior valor
   =MÍNIMO(C2:C31)   → Menor valor
   ```

6. **Porcentagem:**
   ```
   =C2/SOMA($C$2:$C$31)*100    → % do total (fixar $ na soma)
   ```

---

## 5️⃣ GRÁFICOS

### 🔴 ESSENCIAL — 3 Tipos:

| Gráfico | Usa quando | Exemplo |
|---------|-----------|---------|
| **COLUNA** | Comparar valores | Produção por dia (agosto vs setembro) |
| **LINHA** | Ver tendência ao longo do tempo | Produção crescente/declinante |
| **PIZZA** | Mostrar % do todo | Produtos A/B/C (% da produção total) |

**Como criar em Excel:**
1. Selecione os dados
2. Menu: "Inserir" → "Gráfico"
3. Escolha tipo
4. Personalize título, eixos, cores

---

## 🔟 CHECKLIST

- ☐ Criei tabela com cabeçalhos claros?
- ☐ Dados estão bem organizados (sem linhas/colunas vazias)?
- ☐ Utilizei SOMA para totais?
- ☐ Utilizei MÉDIA para análise?
- ☐ Criei IF para categorizar resultados?
- ☐ Gráfico está legível (título, eixos, legendas)?
- ☐ Gráfico reflete os dados corretamente?

---

**Professor:** Gelvazio Camargo | **UC:** Introdução à TIC | **Bloco:** 8/10
