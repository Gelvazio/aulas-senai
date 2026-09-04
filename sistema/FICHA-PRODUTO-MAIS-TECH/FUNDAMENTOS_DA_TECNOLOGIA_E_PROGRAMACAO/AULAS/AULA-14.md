# AULA 14 — Scratch: Primeiros Projetos e Movimentação

**Programa:** Rio do Sul Mais Tech  
**UC:** Fundamentos da Tecnologia e Programação  
**Duração:** 2 horas presenciais  

---

## Objetivos

- Dominar interface do Scratch
- Criar primeiro projeto funcional
- Aprender blocos de movimento
- Entender coordenadas (x, y)

---

## Conteúdo

### 1. Introdução ao Scratch (15 min)

**O que é Scratch?**
- Software de programação visual
- Código em forma de blocos coloridos
- Criar jogos, animações, histórias
- Grátis, online, não requer instalação
- Usado em escolas do mundo todo

**Interface:**
- Painel esquerdo: Blocos de código
- Centro: Área de trabalho
- Direita: Palco (Stage) — onde projeto executa

---

### 2. Sprites e Palco (20 min)

**Sprite:** Personagem ou objeto no Scratch

**Características:**
- Posição (x, y)
- Tamanho (escala)
- Direção (ângulo)
- Aparência (fantasia/costume)

**Palco:**
- 480 × 360 pixels
- Centro: (0, 0)
- Direita: x positivo
- Esquerda: x negativo
- Cima: y positivo
- Baixo: y negativo

---

### 3. Blocos de Movimento (25 min)

| Bloco | Função | Exemplo |
|---|---|---|
| **Mover** | Andar para frente | Mover 10 passos |
| **Virar** | Girar | Virar 15 graus |
| **Ir para** | Teletransportar | Ir para x:0 y:0 |
| **Deslizar** | Movimento suave | Deslizar 1 segundo para x:100 y:50 |
| **Se tocar borda, voltar** | Bater na parede | Evitar sair da tela |

**Código básico para movimentação:**
```
QUANDO BANDEIRA VERDE CLICADA
    SEMPRE
        SE tecla SETA DIREITA pressionada?
            VIRAR 15 graus
            MOVER 10 passos
```

---

### 4. Blocos de Evento (15 min)

| Bloco | Ativa quando... |
|---|---|
| **Bandeira Verde Clicada** | Projeto começa |
| **Tecla pressionada** | Usuário pressiona tecla |
| **Clique no sprite** | Usuário clica no objeto |
| **Mensagem recebida** | Outro sprite envia mensagem |

---

## Atividades Práticas

### Atividade 1: Animar Sprite (40 min)

Projeto: "Gato Dançante"
1. Criar novo projeto
2. Manter sprite padrão (gato)
3. Adicionar 4 blocos de movimento
4. Conectar blocos em sequência
5. Clicar bandeira verde para testar

Código sugerido:
```
QUANDO BANDEIRA VERDE CLICADA
    MOVER 10 passos
    VIRAR 90 graus
    MOVER 10 passos
    VIRAR 90 graus
    (repetir até voltar ao começo)
```

### Atividade 2: Controlar Sprite com Teclado (40 min)

Projeto: "Meu Personagem"
1. Mover com setas do teclado
2. Sprite virado para direção do movimento
3. Parar quando soltar tecla

Código:
```
QUANDO BANDEIRA VERDE CLICADA
    SEMPRE
        SE tecla SETA DIREITA?
            VIRAR 90 graus
            MOVER 5 passos
        SE tecla SETA ESQUERDA?
            VIRAR -90 graus
            MOVER 5 passos
```

---

## Tarefa de Casa

**Projeto pessoal:** Criar animação simples
- Sprite se movendo de forma criativa
- Mínimo 5 blocos diferentes
- Salvar com nome descritivo
- Compartilhar link no GitHub/Google Classroom

---

**Próxima aula:** AULA-15 — Scratch: Condições, Eventos e Interação
