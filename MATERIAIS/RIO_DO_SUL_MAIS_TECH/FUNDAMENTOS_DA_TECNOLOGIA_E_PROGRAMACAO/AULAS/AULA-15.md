# AULA 15 — Scratch: Condições, Variáveis e Lógica

**Programa:** Rio do Sul Mais Tech  
**UC:** Fundamentos da Tecnologia e Programação  
**Duração:** 2 horas presenciais  

---

## Objetivos

- Criar variáveis em Scratch
- Usar condições (SE/ENTÃO)
- Implementar lógica complexa
- Criar mini-jogo simples

---

## Conteúdo

### 1. Variáveis em Scratch (20 min)

**O que são?** Espaços para guardar valores que mudam

**Tipos:**
- Números: 10, 3.14, -5
- Texto: "João", "Olá"
- Booleano: Verdadeiro/Falso

**Exemplo — Pontuação:**
```
Variável: Pontuação = 0
     ↓
QUANDO colidir com moeda
    Pontuação = Pontuação + 10
    MOSTRAR Pontuação na tela
```

---

### 2. Condições (SE/ENTÃO) (20 min)

**Estrutura:**
```
SE (condição)
    ENTÃO: fazer ação
SENÃO: fazer outra ação
```

**Exemplo em Scratch:**
```
SE Pontuação > 100
    ENTÃO DIZER "Você ganhou!"
    PARAR TODOS OS SCRIPTS
SENÃO
    DIZER "Continue jogando..."
```

---

### 3. Blocos Importantes (25 min)

| Bloco | Função |
|---|---|
| **Definir [var] como** | Atribuir valor |
| **Mudar [var] por** | Incrementar |
| **SE ... ENTÃO** | Condicional simples |
| **SE ... ENTÃO ... SENÃO** | Condicional dupla |
| **REPETIR até** | Loop com condição |
| **TOCAR som** | Reproduzir áudio |
| **DIZER** | Exibir mensagem |
| **ESPERAR** | Pausar execução |

---

### 4. Colisão e Detecção (15 min)

**Detectar colisão:**
```
SE <tocando [outro sprite]?>
    ENTÃO mudar pontuação
```

**Exemplo:**
```
QUANDO BANDEIRA VERDE
    SEMPRE
        SE tocando moeda?
            Pontos = Pontos + 1
            Desfazer moeda
```

---

## Atividades Práticas

### Atividade 1: Jogo de Caça (50 min)

Projeto: "Caça Moedas"
1. Sprite principal: você controla com setas
2. Moeda: aparece em lugar aleatório
3. Pontuação: incrementa ao pegar moeda
4. Som: toca quando pega

**Blocos necessários:**
- Movimento (setas)
- Variável (Pontos)
- Condição (tocando moeda)
- Som (ganhar ponto)

### Atividade 2: Desafio Criativo (30 min)

Estender o jogo:
1. Adicionar inimigo que se move
2. Perder vidas ao tocar inimigo
3. Mostrar pontuação final
4. Adicionar som de game over

---

## Tarefa de Casa

**Projeto:** Criar mini-jogo com:
- 1 personagem principal
- 1 objeto a coletar
- Pontuação que aumenta
- Mínimo 10 blocos
- Salvar e compartilhar

---

**Próxima aula:** AULA-16 — Scratch: Projetos Finais e Apresentação
