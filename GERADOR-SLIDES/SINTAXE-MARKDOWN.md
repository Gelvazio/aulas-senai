# SINTAXE MARKDOWN — Entrada do Gerador de Slides

**Versão:** 1.0.0
**Consumido por:** `scripts/gerar_slides.py`
**Padrão visual aplicado:** `PADRAO-DE-SLIDES.md`

Este documento descreve **exatamente** o que o parser reconhece. O que não estiver aqui
é tratado como parágrafo comum ou ignorado.

---

## 1. Esqueleto mínimo

```markdown
---
uc: Introdução à TIC
professor: Gelvazio Camargo
carga: 40 horas
data: ___/___/______
---

# Título da Apresentação

Subtítulo opcional

## Primeiro slide de conteúdo

- Bullet um
- Bullet dois
```

---

## 2. Front-matter

Bloco delimitado por `---` na **primeira linha** do arquivo. Pares `chave: valor`.

| Chave | Onde aparece |
|---|---|
| `uc` | Capa e rodapé de todos os slides |
| `professor` | Capa e rodapé |
| `carga` | Capa |
| `data` | Capa |
| `titulo` | Fallback do rodapé quando `uc` está ausente |

Qualquer chave extra é aceita e fica disponível, mas não é desenhada.

Todas podem ser sobrescritas na linha de comando (`--uc`, `--professor`, …), o que
permite gerar o mesmo Markdown para turmas ou professores diferentes.

---

## 3. Estrutura de slides

| Marcação | Resultado |
|---|---|
| `# Título` — **primeira ocorrência** | Slide de **capa** |
| `# Título` — demais ocorrências | Slide de **seção** (divisória colorida) |
| `## Título` | **Novo slide** de conteúdo |
| `### Título` | **Coluna** dentro do slide atual |

O primeiro `#` é sempre a capa. Todos os `#` seguintes viram divisórias de bloco, com a
cor girando na ordem `primaria → ciano → cinza_azul → ambar → grafite`.

Basta **um** `###` para o slide inteiro virar layout de colunas. Use dois ou mais.

---

## 4. Conteúdo

### 4.1 Bullets

Indentação de **2 espaços por nível**. Máximo 3 níveis.

```markdown
- Nível 1 — 20 pt, sem marcador
  - Nível 2 — 18 pt, marcador •
    - Nível 3 — 16 pt, marcador ◦
```

`-`, `*` e `+` são equivalentes.

### 4.2 Caixa de destaque

```markdown
> Errar no laboratório é barato. Errar na empresa custa caro.
```

Vira caixa arredondada, fundo `#EEEEEE`, borda âmbar, texto 19 pt bold.
Várias citações no mesmo slide geram várias caixas empilhadas.

### 4.3 Tabela

```markdown
| Ano | Marco | O que resolveu |
| --- | --- | --- |
| 1946 | ENIAC | Primeiro eletrônico de grande porte |
| 1971 | Intel 4004 | Microprocessador |
```

A linha de separação (`| --- |`) é obrigatória e não vira conteúdo.
Primeira linha = cabeçalho. Limites: 8 linhas de dados e 5 colunas — o excedente é
truncado silenciosamente.

### 4.4 Imagem

```markdown
![Legenda opcional](MATERIAIS/diagrama.png)
```

Caminho **relativo à pasta `GERADOR-SLIDES`** ou absoluto. A imagem é centralizada e
reduzida proporcionalmente para caber no espaço restante do corpo. Imagem inexistente
gera **ERRO** na validação e é ignorada na geração com `--forcar`.

### 4.5 Notas do apresentador

```markdown
::: notas
Fazer a demonstração no projetor antes de liberar a prática individual.
:::
```

Vai para o painel de notas do PowerPoint, não para o slide.

### 4.6 Diretiva de layout

```markdown
<!-- layout: livre -->
```

Força o layout do slide atual. Valores: `capa`, `secao`, `conteudo`, `colunas`, `livre`.
Raramente necessária — a estrutura do Markdown já decide.

---

## 5. Ordem de composição

Independente da ordem no Markdown, o slide é montado **sempre** assim:

```
título  →  bullets  →  destaques  →  tabela  →  imagens  →  rodapé
```

Escreva na ordem que for mais legível no `.md`. A saída é determinística.

---

## 6. Marcação inline

`**negrito**`, `__negrito__` e `` `código` `` têm os marcadores **removidos** — o texto
permanece, a formatação vem do padrão. Links `[texto](url)` viram apenas `texto`.

Isso é intencional: a tipografia do slide é do padrão, não do autor do Markdown.

---

## 7. Quebra automática

Slide com mais de 6 bullets é dividido automaticamente. O primeiro mantém o título
original; os seguintes recebem `(cont.)`. Destaques, tabela, imagens e notas ficam
no **último** pedaço.

Entrada com 14 bullets:

```
Slide "Componentes"            bullets 1-6
Slide "Componentes (cont.)"    bullets 7-12
Slide "Componentes (cont.)"    bullets 13-14  + destaque + tabela + notas
```

---

## 8. Erros mais comuns

| Sintoma | Causa | Correção |
|---|---|---|
| Tudo virou um slide só | Usou `#` no lugar de `##` | `##` abre slide |
| Colunas não apareceram | Só um `###` no slide | Use dois ou mais |
| Tabela virou texto | Faltou a linha `\| --- \|` | Inclua o separador |
| Bullet nível 2 não recuou | Indentou com 1 ou 3 espaços | Use múltiplos de 2 |
| Notas apareceram no slide | Faltou fechar com `:::` | Feche o bloco |
| `ERRO deck com N slides` | Menos de 15 slides | Divida o conteúdo |
| Imagem sumiu | Caminho relativo errado | Relativo a `GERADOR-SLIDES/` |

---

## 9. Referência rápida

```markdown
---
uc: Nome da UC
professor: Nome
carga: 40 horas
---

# Capa
Subtítulo da capa

## Slide comum
- bullet
  - sub-bullet
> destaque

# Divisória de Bloco

## Slide com colunas
### Coluna A
- item
### Coluna B
- item

## Slide com tabela
| A | B |
| --- | --- |
| 1 | 2 |

## Slide com imagem
![legenda](caminho/img.png)

::: notas
Nota do apresentador
:::
```
