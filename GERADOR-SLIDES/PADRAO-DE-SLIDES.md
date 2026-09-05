# PADRÃO DE SLIDES — Projeto aulas-senai

**Versão:** 1.0.0
**Data:** 05-09-2026
**Fonte da verdade visual:** `SLIDE-BASE-EXEMPLO-GELVAZIO-CAMARGO-ITIC.pptx`
**Fonte da verdade técnica:** `padrao_slides.json`
**Aplicação:** obrigatória em toda apresentação `.pptx` produzida no projeto

---

## 1. Princípio

O padrão **não é opinião de design** — ele foi **medido** a partir da apresentação
institucional em uso. Todo número deste documento saiu da leitura do OOXML do arquivo
base (116 slides, 90 MB de mídia, tema *Educação Profissional*).

Consequência prática: slides novos não são desenhados do zero. Eles são **compostos
sobre o template institucional**, que carrega tema, master, layouts e fontes originais.

> Se o padrão mudar, muda-se o `padrao_slides.json`. Nunca o código do gerador.

---

## 2. Especificação técnica

| Propriedade | Valor | Origem |
|---|---|---|
| Formato | `.pptx` (Office Open XML) | — |
| Dimensão | 9.144.000 × 5.143.500 EMU | `ppt/presentation.xml` |
| Em polegadas | 10,000 × 5,625 pol | conversão EMU ÷ 914.400 |
| Em centímetros | 25,40 × 14,29 cm | conversão EMU ÷ 360.000 |
| Proporção | 16:9 (1,7778) | calculada |
| Tema | Educação Profissional | `ppt/theme/theme1.xml` |
| Fonte do tema | Arial | `majorFont` / `minorFont` |
| Fonte em uso | **Roboto** (762 ocorrências vs. 101 de Arial) | varredura dos 116 slides |

**Roboto é a fonte do padrão. Arial é o fallback** — se a máquina de apresentação não
tiver Roboto instalada, o PowerPoint cai no Arial do tema sem quebrar o layout.

---

## 3. Paleta

Extraída do tema. Os nomes lógicos são os que o gerador aceita.

| Nome lógico | Hex | Uso |
|---|---|---|
| `texto` | `#212121` | Corpo e títulos sobre fundo claro |
| `texto_suave` | `#595959` | Texto secundário, legendas, nível 3 |
| `fundo` | `#FFFFFF` | Fundo padrão do slide |
| `fundo_suave` | `#EEEEEE` | Interior das caixas de destaque |
| `primaria` | `#4285F4` | Faixa da capa, subtítulos, 1ª seção |
| `grafite` | `#212121` | Seções, contraste forte |
| `cinza_azul` | `#78909C` | Rodapé, seções |
| `ambar` | `#FFAB40` | Borda de destaque, alerta |
| `ciano` | `#0097A7` | Seções, links |
| `lima` | `#EEFF41` | Realce pontual — usar com parcimônia |

**Regra de contraste:** texto claro só sobre `primaria`, `grafite`, `cinza_azul` ou
`ciano`. Nunca texto branco sobre `ambar` ou `lima`.

---

## 4. Escala tipográfica

Derivada da distribuição real de tamanhos no arquivo base (20pt e 16pt dominam o corpo;
36pt domina os títulos).

| Elemento | Tamanho | Peso | Cor |
|---|---|---|---|
| Título de capa | 36 pt | Bold | `#212121` |
| Subtítulo de capa | 20 pt | Regular | `#595959` |
| Título de seção | 32 pt | Bold | `#FFFFFF` |
| Título de slide | 30 pt | Bold | `#212121` |
| Subtítulo / coluna | 22 pt | Bold | `#4285F4` |
| Bullet nível 1 | 20 pt | Regular | `#212121` |
| Bullet nível 2 | 18 pt | Regular | `#212121` |
| Bullet nível 3 | 16 pt | Regular | `#595959` |
| Caixa de destaque | 19 pt | Bold | `#212121` |
| Cabeçalho de tabela | 15 pt | Bold | `#FFFFFF` |
| Célula de tabela | 14 pt | Regular | `#212121` |
| Legenda de imagem | 12 pt | Regular | `#595959` |
| Rodapé | 10 pt | Regular | `#78909C` |

**Piso de legibilidade: 14 pt.** Nada abaixo disso em slide projetado. Se o texto não
couber em 14 pt, o problema é excesso de conteúdo — divida o slide.

---

## 5. Grade

Medidas em polegadas, sobre a área de 10 × 5,625.

| Região | Valor |
|---|---|
| Margem esquerda | 0,55 |
| Margem direita | 0,55 |
| Margem superior | 0,30 |
| Faixa de rodapé | 0,32 do fundo |
| Topo do corpo | 1,45 |
| Altura do corpo | 3,75 |
| Vão entre colunas | 0,35 |

Largura útil: **8,90 pol**. A faixa entre 0,30 e 1,45 é do título. Abaixo de 5,305 é
zona de rodapé — nenhum conteúdo entra ali.

---

## 6. Layouts do template

Seis layouts, preservados do arquivo base:

| Layout | Uso no arquivo base | Uso no padrão |
|---|---|---|
| `TITLE` | 1 slide | Capa |
| `TITLE_AND_BODY` | 2 slides | Reserva |
| `TITLE_AND_TWO_COLUMNS` | 22 slides | Comparações |
| `TITLE_ONLY` | **91 slides** | Conteúdo, seções, tudo o mais |
| `TITLE_ONLY_1_1_1_1` | — | Reserva |
| `TITLE_2` | — | Reserva |

`TITLE_ONLY` é o layout de trabalho: dá o título institucional e deixa o corpo livre
para composição controlada.

---

## 7. Tipos de slide

### 7.1 Capa
Faixa vertical `primaria` de 0,18 pol à esquerda. Título em 36 pt na altura 1,55.
Bloco de identificação (subtítulo, UC, professor, carga, data) a partir de 3,15.
**Sem rodapé** e sem numeração.

### 7.2 Seção (divisória)
Fundo chapado ocupando o slide inteiro, cor em rodízio na ordem
`primaria → ciano → cinza_azul → ambar → grafite`. Título branco 32 pt centrado
verticalmente. Sem bullets — a divisória anuncia, não explica.

### 7.3 Conteúdo
Título 30 pt no topo, corpo composto **nesta ordem fixa**:

```
bullets  →  caixas de destaque  →  tabela  →  imagens
```

A ordem é do compositor, não do Markdown. Escreva o Markdown na ordem que preferir;
a saída sai sempre nessa sequência.

### 7.4 Colunas
Duas ou mais colunas de largura igual, cada uma com subtítulo 22 pt em `primaria` e
seus próprios bullets. Uso natural: comparações (Hardware × Software, Entrada × Saída).

---

## 8. Regras de composição

| Regra | Limite | Comportamento |
|---|---|---|
| Slides por deck | **Sem limite** | Aceita qualquer quantidade no `.md` |
| Bullets por slide | máximo 6 | Aviso — quebra automática em `(cont.)` |
| Caracteres por bullet | máximo 110 | Aviso |
| Palavras por bullet | máximo 14 | Referência editorial |
| Níveis de indentação | máximo 3 | Truncado no nível 3 |
| Caracteres no título | máximo 60 | Aviso |
| Linhas de tabela | máximo 8 + cabeçalho | Truncado |
| Colunas de tabela | máximo 5 | Truncado |

**Flexibilidade de comprimento:** o gerador não impõe limite mínimo ou máximo de slides. A quantidade aceita é a quantidade que existir no arquivo markdown. Isso permite aulas curtas (ex: 5 slides) e longas (ex: 50+ slides) no mesmo padrão.

---

## 9. Estrutura obrigatória de um deck de UC

Ordem canônica para apresentação de abertura de Unidade Curricular:

1. **Capa** — UC, professor, carga horária
2. **Apresentação do professor** — formação e experiência
3. **Plano de ensino** — UC, carga horária, número de encontros
4. **Capacidades** — técnicas e socioemocionais, da ementa
5. **Conhecimentos** — domínios da ementa
6. **Combinados** — regras de convivência e de laboratório
7. **Avaliação** — o que vale nota e como
8. **Ambiente Virtual (AVA)** — onde postar
9. **Conteúdo** — os slides da matéria
10. **Encerramento** — síntese e próximo encontro

Decks de aula avulsa dispensam os itens 2 a 8, mas mantêm capa e encerramento.

---

## 10. Rodapé

Presente em todos os slides **exceto a capa**. Alinhado à direita, 10 pt, `cinza_azul`,
sobre a linha de 5,305 pol.

Formato: `{uc}  |  {professor}  |  {n}` — configurável em `padrao_slides.json`.

---

## 11. Checklist de conformidade

Antes de entregar qualquer deck:

- [ ] 16:9, 10 × 5,625 pol
- [ ] Gerado sobre `TEMPLATE-SENAI.pptx` (tema preservado)
- [ ] Roboto como fonte, Arial como fallback
- [ ] Quantidade de slides conforme o conteúdo (sem limite)
- [ ] Nenhum slide com mais de 6 bullets
- [ ] Nada abaixo de 14 pt
- [ ] Capa com UC, professor e carga horária
- [ ] Rodapé numerado em todos os slides menos a capa
- [ ] Divisória de seção a cada bloco de conteúdo
- [ ] Slide de encerramento com síntese
- [ ] `validar` executado sem ERRO

---

## 12. Erros comuns

| Erro | Por que é problema | Correção |
|---|---|---|
| Criar o PPTX do zero | Perde tema, master, layouts e identidade | Gerar sobre o template |
| Colar parágrafo inteiro como bullet | Ilegível projetado | Máximo 14 palavras |
| Usar 4 ou 5 níveis de indentação | Hierarquia deixa de ser lida | Máximo 3 níveis |
| Fonte 10 pt no corpo | Ninguém lê do fundo da sala | Piso de 14 pt |
| Deck com 6 slides | Viola a regra do projeto | Mínimo 15 |
| Texto branco sobre âmbar | Contraste insuficiente | Texto escuro |
| Editar cores no código do gerador | Padrão deixa de ser rastreável | Editar `padrao_slides.json` |
| Recriar em JavaScript | PptxGenJS não abre `.pptx` existente | Python + `python-pptx` |

---

## 13. Por que Python e não JavaScript

Decisão registrada, com base técnica:

| Critério | Python (`python-pptx`) | JavaScript (`PptxGenJS`) |
|---|---|---|
| Abrir `.pptx` existente | ✅ | ❌ |
| Preservar tema e layouts | ✅ | ❌ |
| Preservar mídia embutida | ✅ | ❌ |
| Criar do zero | ✅ | ✅ |
| Manipular OOXML direto | ✅ (`zipfile` + `lxml`) | 🟡 |

O template institucional só existe porque o gerador **abre** o arquivo base e remove os
slides preservando o resto. Isso é impossível em PptxGenJS.

Slides em **HTML** (regra de mínimo 15 slides para arquivos HTML) são outro produto e
seguem outra ferramenta — este padrão trata de `.pptx`.

---

## 14. Arquivos do padrão

| Arquivo | Papel |
|---|---|
| `padrao_slides.json` | O padrão em forma de dado — editável |
| `PADRAO-DE-SLIDES.md` | Este documento — o porquê de cada número |
| `SINTAXE-MARKDOWN.md` | Como escrever a entrada |
| `scripts/gerar_slides.py` | O motor |
| `SLIDE-BASE-EXEMPLO-GELVAZIO-CAMARGO-ITIC.pptx` | Referência visual original |
| `TEMPLATE-SENAI.pptx` | Template enxuto gerado a partir do base |
| `EXEMPLOS/exemplo-aula.md` | Entrada de demonstração |
