# AULA 12 — Fluxogramas e Representação Visual de Algoritmos

**Programa:** Rio do Sul Mais Tech  
**UC:** Fundamentos da Tecnologia e Programação  
**Duração:** 2 horas presenciais  

---

## Objetivos

- Dominar símbolos de fluxograma
- Desenhar fluxogramas corretos
- Converter algoritmo em fluxograma
- Ler e interpretar fluxogramas

---

## Conteúdo

### 1. Símbolos de Fluxograma (20 min)

| Símbolo | Nome | Função |
|---|---|---|
| ⭕ | Terminal | Início/Fim do algoritmo |
| ▭ | Processo | Executa ação/cálculo |
| ◇ | Decisão | Escolhe caminho (SE/ENTÃO) |
| ▭ | Entrada/Saída | Recebe ou imprime dados |
| → | Seta | Mostra fluxo/direção |
| ⭕ | Conector | Conecta diferentes partes |

### 2. Regras de Fluxograma (15 min)

- Sempre começar com Terminal (Início)
- Sempre terminar com Terminal (Fim)
- Setas indicam direção do fluxo
- Um caminho por seta
- Decisões têm 2+ caminhos
- Legível e organizado

### 3. Exemplos Práticos (30 min)

**Exemplo 1 — Verificar aprovação:**
```
INÍCIO
↓
[Entrada: Nota]
↓
{Nota >= 7?}
  Sim → [Saída: Aprovado] → FIM
  Não → [Saída: Reprovado] → FIM
```

**Exemplo 2 — Imprimir números de 1 a 5:**
```
INÍCIO
↓
[Contador = 1]
↓
{Contador <= 5?}
  Não → FIM
  Sim → [Imprimir Contador]
       ↓
       [Contador = Contador + 1]
       ↓ (volta para decisão)
```

---

## Atividades Práticas

### Atividade 1: Desenhar Fluxogramas (50 min)

Em duplas, criar fluxograma para:
1. Algoritmo do cafezinho (sequência)
2. Verificar maior entre 2 números (decisão)
3. Contar de 1 a 10 (repetição)
4. Login com usuário/senha (decisão complexa)

**Materiais:** Papel A3, símbolos impressos, marcadores

### Atividade 2: Interpretar Fluxograma (40 min)

Receber 3 fluxogramas prontos e:
1. Descrever o que faz
2. Traçar passo a passo
3. Identificar entrada/saída
4. Encontrar erros (se houver)

---

## Tarefa de Casa

**Projeto:** Criar fluxograma para processo do dia a dia
- Mínimo 5 passos
- Incluir 1 decisão
- Desenhar em papel ou digital
- Descrever com palavras

---

**Próxima aula:** AULA-13 — Introdução a Programação: Conceitos Básicos
