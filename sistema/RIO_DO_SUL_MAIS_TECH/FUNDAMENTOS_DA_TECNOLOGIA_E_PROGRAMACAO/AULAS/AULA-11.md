# AULA 11 — Algoritmos: Sequência, Decisão e Repetição

**Programa:** Rio do Sul Mais Tech  
**UC:** Fundamentos da Tecnologia e Programação  
**Duração:** 2 horas presenciais  

---

## Objetivos

- Entender estruturas de algoritmos
- Aplicar sequência, decisão e repetição
- Criar fluxogramas simples
- Preparar para programação estruturada

---

## Conteúdo

### 1. O que é Algoritmo? (15 min)

**Definição:** Série de passos em ordem específica para resolver problema.

**Estrutura Básica:**
```
ENTRADA (dados)
  ↓
PROCESSAMENTO (cálculos/lógica)
  ↓
SAÍDA (resultado)
```

**Exemplo — Calcular média:**
```
ENTRADA: Nota 1, Nota 2, Nota 3
PROCESSAMENTO: Soma = N1 + N2 + N3; Média = Soma / 3
SAÍDA: Média
```

---

### 2. Sequência (20 min)

**O quê:** Passos na ordem específica, um após outro.

```
Passo 1: Acordar
Passo 2: Tomar banho
Passo 3: Tomar café
Passo 4: Ir para escola
```

**Se mudar ordem:**
- ❌ Ir para escola → Tomar banho (não funciona!)
- ✓ Tomar banho → Ir para escola (correto)

---

### 3. Decisão / Condicional (25 min)

**O quê:** Seguir diferentes caminhos baseado em condição (SE/ENTÃO).

**Estrutura:**
```
SE (condição é verdadeira)
   ENTÃO: executar ação A
SENÃO
   executar ação B
FIM SE
```

**Exemplos:**

```
SE (está chovendo)
   ENTÃO: levar guarda-chuva
SENÃO
   não leva
```

```
SE (nota >= 7)
   ENTÃO: passou
SENÃO
   recuperação
```

**Operadores de Comparação:**
- `>` maior que
- `<` menor que
- `>=` maior ou igual
- `<=` menor ou igual
- `==` igual a
- `!=` diferente de

---

### 4. Repetição / Laço (25 min)

**O quê:** Repetir mesmos passos enquanto condição for verdadeira.

**Estrutura 1 — Enquanto:**
```
ENQUANTO (condição)
   executar ação
FIM ENQUANTO
```

Exemplo:
```
contador = 1
ENQUANTO (contador <= 10)
   Imprimir contador
   contador = contador + 1
FIM
Resultado: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
```

**Estrutura 2 — Para:**
```
PARA (i = 1 até 10)
   executar ação
FIM PARA
```

Exemplo:
```
PARA (i = 1 até 5)
   Imprimir "Olá mundo"
FIM
Resultado: "Olá mundo" aparece 5 vezes
```

---

## Atividades Práticas

### Atividade 1: Fluxogramas (35 min)

Criar fluxograma para:
1. Verificar se número é par ou ímpar
2. Calcular tabuada
3. Descobrir maior número entre 3

**Símbolos:**
- Retângulo: Ação
- Losango: Decisão
- Oval: Início/Fim
- Setas: Fluxo

### Atividade 2: Pseudocódigo (35 min)

Escrever algoritmo em pseudocódigo:
1. Receber idade
2. Se idade >= 18, imprimir "Maior"
3. Senão, imprimir "Menor"

```
ALGORITMO Maioridade
ENTRADA idade
SE (idade >= 18)
   IMPRIMIR "Maior de idade"
SENÃO
   IMPRIMIR "Menor de idade"
FIM
```

---

## Tarefa de Casa

**Projeto:** Criar algoritmo para problema escolar
- Descrever problema
- Fazer entrada → processamento → saída
- Desenhar fluxograma
- Trazer na próxima aula

---

**Próxima aula:** AULA-12 — Fluxogramas e Representação Visual de Algoritmos
