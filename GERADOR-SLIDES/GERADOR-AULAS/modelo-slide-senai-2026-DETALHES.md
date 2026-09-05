# modelo-slide-senai-2026 — Especificação técnica para reprodução

**Arquivo analisado:** `sistema/GERADOR-AULAS/modelo-slide-senai-2026.pptx`
**Data da extração:** 04-09-2026
**Método:** descompactação do OOXML e leitura direta de `ppt/presentation.xml`,
`ppt/slideMasters/`, `ppt/slideLayouts/`, `ppt/slides/` e `ppt/theme/theme1.xml`

Este documento reúne **tudo o que é necessário para gerar um deck idêntico ao
modelo** — dimensões exatas, paleta, tipografia, layouts, coordenadas de cada
elemento e o conteúdo textual de cada slide. Complementa o
[modelo-slide-senai-2026.md](modelo-slide-senai-2026.md), que é a visão pedagógica
resumida; aqui estão os números.

---

## 1. Identidade do arquivo

| Propriedade | Valor |
|---|---|
| Autor / última modificação | Gelvazio Camargo |
| Revisão | 12 |
| Modificado em | 2026-09-02T16:42:43Z |
| Aplicação | Microsoft Office PowerPoint 16.0 |
| Origem real | **Google Slides**, exportado para .pptx |
| Slides | 9 |
| Notas | 8 (todas vazias — só o número do slide) |
| Palavras | 225 |
| Parágrafos | 38 |
| Tamanho do arquivo | 18,36 MB |

> **Origem Google Slides:** o XML carrega `GoogleSlidesCustomDataVersion2` e os
> shapes têm nomes `Google Shape;NN;pNN`. Isso explica as fontes embutidas, os
> layouts com nomes em MAIÚSCULAS (`TITLE_ONLY`) e os fundos como imagem PNG em
> vez de formas vetoriais.

---

## 2. Dimensões do palco

| Medida | EMU | Polegadas | Centímetros |
|---|---|---|---|
| Largura (`cx`) | 9.144.000 | **10,00"** | 25,40 cm |
| Altura (`cy`) | 5.143.500 | **5,625"** | 14,29 cm |
| Notas (largura × altura) | 6.858.000 × 9.144.000 | 7,5" × 10" | — |

- `type="screen16x9"` — proporção **16:9**
- Corresponde ao **`LAYOUT_16x9` padrão do pptxgenjs** — não é preciso mudar
  `pres.layout`, mas declare explicitamente para não depender do default.
- Fator de conversão: **1 polegada = 914.400 EMU**

---

## 3. Paleta de cores (tema "Simple Light")

| Papel OOXML | Hex | Amostra | Uso observado |
|---|---|---|---|
| `dk1` (texto escuro 1) | `000000` | preto | Texto padrão de corpo |
| `lt1` (claro 1) | `FFFFFF` | branco | Fundo base |
| `dk2` (texto escuro 2) | `595959` | cinza-escuro | Número do slide |
| `lt2` (claro 2) | `EEEEEE` | cinza-claro | Áreas de apoio |
| `accent1` | `4285F4` | **azul Google** | Cor de destaque principal |
| `accent2` | `212121` | quase-preto | Contraste forte |
| `accent3` | `78909C` | azul-acinzentado | Elementos neutros |
| `accent4` | `FFAB40` | âmbar | Alertas / realce |
| `accent5` | `0097A7` | ciano-escuro | Links |
| `accent6` | `EEFF41` | lima | Destaque raro |
| `hlink` / `folHlink` | `0097A7` | ciano-escuro | Hiperlinks |

**Cor de título efetiva:** `434343` (cinza-grafite) — definida nos placeholders
`ctrTitle` dos layouts, **não** no esquema de cores. É essa a cor que aparece nos
títulos dos slides.

```
Título ........ #434343   (cinza-grafite)
Corpo ......... #000000   (preto)
Nº do slide ... #595959   (cinza-escuro, via dk2)
Destaque ...... #4285F4   (azul)
```

---

## 4. Tipografia

### Fontes declaradas

| Fonte | Papel | Embutida? |
|---|---|---|
| **Roboto** | Títulos e textos em negrito | ✅ 4 variantes (regular, bold, italic, bold-italic) |
| **Roboto Light** | Variante leve | ✅ 4 variantes |
| **Arial** | Fallback do master e do `defaultTextStyle` | ❌ (fonte de sistema) |

As 8 variantes ocupam `ppt/fonts/font1..8.fntdata` (~60 KB cada, ~496 KB no total),
com `embedTrueTypeFonts="1"` e `saveSubsetFonts="1"` em `<p:presentation>`.

> ⚠️ **Ao gerar um novo deck:** Roboto não é fonte padrão do Office e não tem
> substituto métrico confiável em renderização headless. Ou você embute as fontes
> (como o modelo faz), ou usa **Calibri/Arial** e aceita o desvio visual. Para QA
> por conversão em imagem, Arial é a escolha segura.

### Escala de tamanhos observada

| Elemento | Tamanho | Estilo | Onde |
|---|---|---|---|
| Título de slide (layouts 1 e 2) | **30 pt** | negrito | `ctrTitle` |
| Título do layout 4 (capa) | **52 pt** | — | `ctrTitle` |
| Subtítulo do layout 4 | **28 pt** | — | `subTitle` |
| Bullets de capacidades | **20 pt** | — | Slide 3 |
| Blocos "Combinados!" | **25 pt** | — | Slide 6 |
| Corpo padrão | **16 pt** | normal / negrito | Slides 1, 4, 5, 7 |
| `defaultTextStyle` do arquivo | 14 pt | Arial | fallback |
| Número do slide | **10 pt** | — | `sldNum`, alinhado à direita |

### Alinhamento e espaçamento

- Todos os níveis de parágrafo: `algn="l"` (**esquerda**) — nada centralizado
- `lnSpc` = 100% · `spcBef` = 0 · `spcAft` = 0 (sem espaçamento extra entre parágrafos)
- Padding interno dos text boxes: `lIns`/`tIns`/`rIns`/`bIns` = **91.425 EMU ≈ 0,1"**
- Títulos ancorados na base (`anchor="b"`)

---

## 5. Layouts (4 no total)

Todos os layouts pertencem a um único `slideMaster1`. Os três primeiros usam
**imagem PNG como plano de fundo** (`<p:bg><p:bgPr><a:blipFill>`), não formas.

| # | Nome interno | `matchingName` | `type` | Fundo | Placeholders |
|---|---|---|---|---|---|
| 1 | `TITLE_AND_TWO_COLUMNS` | [AP] Slide de título | `twoColTx` | `image1.png` (61 KB) | `ctrTitle`, `subTitle`, `sldNum` |
| 2 | `TITLE_ONLY` | [AP] Slide de conteúdo | `titleOnly` | `image2.png` (44 KB) | `ctrTitle`, `subTitle`, `sldNum` |
| 3 | `TITLE_ONLY_1_1_1_1` | — | — | `image3.png` (2,1 MB) | `sldNum` |
| 4 | `TITLE_2` | — | — | nenhum (branco) | `ctrTitle`, `subTitle`, `sldNum` |

### Geometria dos placeholders

**Layouts 1 e 2** (idênticos na posição — mudam só o fundo e a semântica):

| Placeholder | Posição (x, y) | Tamanho (l × a) |
|---|---|---|
| `ctrTitle` | 1,31" · 0,79" | 3,55" × 1,65" |
| `subTitle` | 1,31" · 2,80" | 3,12" × 2,41" |
| `sldNum` | 9,27" · 5,10" | 0,60" × 0,43" |

**Layout 4** (capa de largura total):

| Placeholder | Posição (x, y) | Tamanho (l × a) |
|---|---|---|
| `ctrTitle` | 0,34" · 0,81" | 9,32" × 2,24" |
| `subTitle` | 0,34" · 3,10" | 9,32" × 0,87" |
| `sldNum` | 9,27" · 5,10" | 0,60" × 0,43" |

> **Layouts 3 e 4 não são usados por nenhum slide** — ficaram do template
> original. Os 9 slides usam apenas o layout 1 (slides 1–2) e o layout 2 (slides 3–9).

---

## 6. Estrutura slide a slide

Coordenadas em polegadas, medidas do canto superior esquerdo do palco.

### Slide 1 — "Apresentação" · layout `TITLE_AND_TWO_COLUMNS`

| Elemento | Posição | Tamanho | Conteúdo / formato |
|---|---|---|---|
| Título (`ctrTitle`) | 0,84 · 0,11 | 3,55 × 0,79 | "Apresentação" — Roboto **bold** |
| Retângulo de texto | 0,12 · 0,86 | 4,82 × 4,68 | 9 linhas de trajetória profissional, **16 pt** |
| `image4.jpeg` | 5,57 · 2,31 | 1,13 × 1,13 | logo/foto |
| `image5.jpeg` | 5,50 · 0,90 | 1,13 × 1,13 | logo/foto |
| `image6.png` | 7,25 · 0,98 | 1,05 × 1,05 | ícone |
| `image7.png` | 7,14 · 2,31 | 1,43 × 1,28 | ícone |
| `image8.png` | 7,04 · 3,74 | 2,23 × 1,20 | logo |
| `image9.png` | 5,18 · 3,88 | 1,77 × 1,06 | logo |

**Padrão:** texto ocupa a metade esquerda (0,12"–4,94"); as 6 imagens formam uma
**grade 2×3 solta na metade direita** (x entre 5,18" e 9,27"). É o único slide com
esse arranjo.

Conteúdo de exemplo (linha do tempo do professor):
```
2006 — Formação do Ensino Médio
2007–2010 — Auxiliar de produção em várias empresas (PAM...)
2010 — Iniciou com TI no SESI como estagiário por um ano
2011–2015 — IBS Sistemas
2017 — Análise e Desenvolvimento de Sistemas — UNINTER
2016–2019 — IPM Sistemas — Programador PHP
2019–2026 — Tidas Tecnologia — Programador PHP e Node.js
2022–2023 — Professor de Desenvolvimento de Sistemas S...
2026–hoje — Professor de Desenvolvimento de Sistemas S...
```

### Slide 2 — "Plano de Ensino" · layout `TITLE_AND_TWO_COLUMNS`

| Elemento | Posição | Tamanho | Conteúdo |
|---|---|---|---|
| Título | 1,31 · 0,79 | 3,55 × 1,18 | "Plano de Ensino" — Roboto bold |
| Subtítulo | 0,73 · 2,08 | 4,36 × 2,41 | 3 linhas, Roboto **bold** |

```
U.C.: <nome da unidade curricular>
Carga Horária: <NN> horas
Nº de Aulas: <NN> encontros - <NN>
```

### Slide 3 — "Capacidades Socioemocionais" · layout `TITLE_ONLY`

| Elemento | Posição | Tamanho | Conteúdo |
|---|---|---|---|
| Título | 1,32 · 0,00 | 6,37 × 0,76 | "Capacidades Socioemocionais" |
| Corpo | 1,24 · 0,88 | 8,46 × 4,20 | bullets `●` a **20 pt** |

**Placeholder de conteúdo:** `● PEGAR DA UNIDADE CURRICULAR` — substituir pelas
capacidades socioemocionais da ementa da UC.

> O bullet é o caractere literal `●` (U+25CF) digitado no texto, não um
> `<a:buChar>` de lista. Ao reproduzir, prefira lista real com `bullet: true`.

### Slide 4 — "Conhecimentos (Literatura)" · layout `TITLE_ONLY`

| Elemento | Posição | Tamanho | Conteúdo |
|---|---|---|---|
| Título | 1,28 · −0,01 | 6,37 × 0,54 | "Conhecimentos (Literatura)" |
| Corpo | 1,28 · 0,44 | 4,13 × 4,34 | 16 pt, Roboto **bold** |

**Placeholder:** `PEGAR DA UNIDADE CURRICULAR` — domínios de conhecimento da ementa.

### Slide 5 — "Conteudo" · layout `TITLE_ONLY`

Geometria **idêntica ao slide 4** (é uma cópia dele).

**Placeholder:** `Pegar do arquivo de aula markdown` — máximo 5 tópicos.

### Slide 6 — "Combinados!" · layout `TITLE_ONLY`

O slide mais elaborado: **4 blocos regra + GIF**, distribuídos pelo palco inteiro.

| Elemento | Posição | Tamanho | Conteúdo |
|---|---|---|---|
| Título | 1,54 · 0,54 | 3,33 × 0,76 | "Combinados!" — Roboto bold |
| Texto 1 | 0,74 · 4,75 | 2,88 × 0,62 | "Uso indevido de celular:" (bold) + "apenas 15 minutos de intervalo" |
| `image10.gif` | 1,16 · 2,16 | 2,04 × 2,59 | **9,6 MB** — o maior arquivo do deck |
| Texto 2 | 3,79 · 4,91 | 2,88 × 0,69 | "Bonés!" / "Fone de Ouvido!" — **25 pt** |
| `image11.gif` | 4,21 · 2,35 | 2,04 × 2,59 | 650 KB |
| Texto 3 | 7,03 · 5,13 | 2,88 × 0,46 | "Evitar Saídas em excesso!" |
| `image12.gif` | 7,37 · 2,94 | 2,19 × 2,19 | 2,1 MB |
| Texto 4 | 5,38 · 1,98 | 3,86 × 0,62 | "Uso obrigatório do uniforme" (bold) |
| `image13.gif` | 5,38 · 0,08 | 3,86 × 2,01 | 2,0 MB |

⚠️ **Defeito herdado do modelo:** os textos 2 e 3 começam em y = 4,91" e y = 5,13",
mas o palco termina em **5,625"**. Com 0,62–0,69" de altura, esses blocos
**transbordam a borda inferior**. As imagens 10, 11 e 12 também ultrapassam (2,16 +
2,59 = 4,75"; 2,94 + 2,19 = 5,13" — essas cabem, mas por pouco). Ao reproduzir,
**suba esses blocos** para y ≤ 4,90" ou reduza a altura.

### Slide 7 — "Vale nota Professor?" · layout `TITLE_ONLY`

| Elemento | Posição | Tamanho | Conteúdo |
|---|---|---|---|
| Título | 1,31 · 0,79 | 6,37 × 0,76 | "Vale nota Professor?" |
| Corpo | 1,37 · 1,85 | 4,12 × 3,13 | 4 critérios, rótulos em Roboto **bold** |
| `image14.png` | 5,00 · 3,55 | 4,15 × 1,71 | tabela/print |
| `image15.gif` | 6,27 · 1,06 | 3,38 × 1,89 | animação |

```
Nota 1: Atividades realizadas em sala de aula (entregues pelo AVA).
Nota 2: 1 Prova Objetiva e 1 Prova Prática
Nota 3: Situação de Aprendizagem
Nota 4: Avaliação de Comportamento
```

**Padrão de formatação:** o rótulo `Nota N:` e o nome do critério vêm em **bold**;
a explicação entre parênteses vem em peso normal, como parágrafo seguinte.

### Slide 8 — "Avaliação de Comportamento" · layout `TITLE_ONLY`

| Elemento | Posição | Tamanho | Conteúdo |
|---|---|---|---|
| Título | 1,31 · 0,79 | 6,37 × 0,76 | "Avaliação de Comportamento" |
| `image16.png` | 1,13 · 1,69 | 8,70 × 2,84 | rubrica/escala (quase toda a largura) |
| `image17.gif` | 4,58 · 3,24 | 3,83 × 2,33 | animação **sobreposta** à rubrica |

⚠️ O GIF cobre parte da rubrica (a imagem 16 vai até y = 4,53", o GIF começa em
3,24") e ultrapassa a borda inferior (3,24 + 2,33 = **5,57"**, no limite de 5,625").
**Slide sem nenhum texto além do título.**

### Slide 9 — "Ambiente Virtual de Aprendizagem (AVA)" · layout `TITLE_ONLY`

| Elemento | Posição | Tamanho | Conteúdo |
|---|---|---|---|
| Título | 1,37 · 0,28 | 7,37 × 0,76 | "Ambiente Virtual de Aprendizagem (AVA)" |
| `image18.png` | 1,51 · 1,04 | 6,21 × 1,97 | print da plataforma |
| `image19.png` | 1,58 · 3,27 | 5,78 × 1,80 | print da plataforma |

Duas imagens empilhadas, alinhadas à esquerda, com 0,26" de respiro entre elas.
**Slide sem texto além do título.**

---

## 7. Inventário de mídia

19 arquivos em `ppt/media/`, **18,1 MB no total** — praticamente todo o peso do deck.

| Arquivo | Tamanho | Uso |
|---|---|---|
| `image10.gif` | **9,60 MB** | Slide 6 — celular |
| `image3.png` | 2,23 MB | Fundo do layout 3 (não usado) |
| `image12.gif` | 2,14 MB | Slide 6 — saídas |
| `image13.gif` | 2,01 MB | Slide 6 — uniforme |
| `image15.gif` | 729 KB | Slide 7 |
| `image11.gif` | 651 KB | Slide 6 — bonés |
| `image17.gif` | 384 KB | Slide 8 |
| `image18.png` | 272 KB | Slide 9 |
| `image19.png` | 222 KB | Slide 9 |
| `image14.png` | 107 KB | Slide 7 |
| `image16.png` | 104 KB | Slide 8 |
| `image1.png` | 61 KB | Fundo do layout 1 |
| `image2.png` | 44 KB | Fundo do layout 2 |
| `image8.png` | 34 KB | Slide 1 |
| `image9.png` | 56 KB | Slide 1 |
| `image5.jpeg` | 15 KB | Slide 1 |
| `image4.jpeg` | 13 KB | Slide 1 |
| `image6.png` | 12 KB | Slide 1 |
| `image7.png` | 3 KB | Slide 1 |

> 💡 **Oportunidade de otimização:** `image10.gif` sozinho é **52% do arquivo**.
> Trocar os 5 GIFs por PNG estático, ou recomprimi-los, derrubaria o deck de
> 18,4 MB para menos de 3 MB. O modelo é copiado em 3 lugares do projeto — a
> economia se multiplica.

---

## 8. Receita de reprodução com pptxgenjs

```js
const pptxgen = require('pptxgenjs');
const pres = new pptxgen();

// 1. Palco — 10" x 5.625" (16:9). É o default, mas declare.
pres.layout = 'LAYOUT_16x9';

// 2. Paleta do modelo
const COR = {
  titulo:   '434343',   // cinza-grafite dos títulos
  corpo:    '000000',
  numero:   '595959',
  destaque: '4285F4',   // azul
  ambar:    'FFAB40',
  fundo:    'FFFFFF',
};

// 3. Tipografia — Arial para QA confiável; troque por 'Roboto' se embutir a fonte
const FONTE = 'Arial';
const TAM = { titulo: 30, capa: 52, bullet: 20, bloco: 25, corpo: 16, numero: 10 };

// 4. Geometria dos placeholders (polegadas)
const GEO = {
  titulo:   { x: 1.31, y: 0.79, w: 3.55, h: 1.65 },
  subtitulo:{ x: 1.31, y: 2.80, w: 3.12, h: 2.41 },
  numero:   { x: 9.27, y: 5.10, w: 0.60, h: 0.43 },
};

// 5. Slide de conteúdo (padrão TITLE_ONLY)
const s = pres.addSlide();
s.addText('Plano de Ensino', {
  ...GEO.titulo, isTextBox: true, margin: 0,
  fontFace: FONTE, fontSize: TAM.titulo, bold: true,
  color: COR.titulo, valign: 'bottom', align: 'left',
});
s.addText(
  [
    { text: 'U.C.: ', options: { bold: true, breakLine: false } },
    { text: 'Introdução a Tecnologia da Informação', options: { breakLine: true } },
    { text: 'Carga Horária: 40 horas', options: { bold: true, breakLine: true } },
    { text: 'Nº de Aulas: 10 encontros', options: { bold: true } },
  ],
  { x: 0.73, y: 2.08, w: 4.36, h: 2.41, isTextBox: true, margin: 0,
    fontFace: FONTE, fontSize: TAM.corpo, color: COR.corpo, align: 'left' }
);

pres.writeFile({ fileName: 'aula.pptx' });
```

**Depois de gerar, sempre validar:**

```bash
python scripts/office/validate.py aula.pptx
```

### Regras de ouro extraídas do modelo

1. **Palco 10" × 5,625"** — coordenadas fora disso não são cortadas, simplesmente
   não aparecem.
2. **Margem útil:** conteúdo entre x = 0,73" e x = 9,27"; y entre 0,00" e 5,10".
3. **Tudo alinhado à esquerda** — nenhum parágrafo centralizado no modelo inteiro.
4. **Título 30 pt bold em `#434343`**, ancorado na base do seu box.
5. **Corpo 16 pt**, com rótulos em **bold** e explicações em peso normal.
6. **Hex sem `#`** no pptxgenjs — `'434343'`, nunca `'#434343'`.
7. **`isTextBox: true` e `margin: 0`** em todo `addText` que precise alinhar com
   imagens ou outros blocos.
8. **Não repita o slide 4 e o slide 5** — no modelo eles são cópias literais;
   varie o layout do conteúdo.

---

## 9. Checklist de conformidade

Ao gerar um deck a partir deste modelo, confira:

- [ ] Proporção 16:9 em 10" × 5,625"
- [ ] Títulos 30 pt, bold, `#434343`, alinhados à esquerda
- [ ] Corpo 16 pt; bullets 20 pt; blocos de destaque 25 pt
- [ ] Nenhum elemento além de y = 5,625" (corrigir o vício dos slides 6 e 8)
- [ ] Nenhum GIF acima de 1 MB — preferir PNG estático
- [ ] Placeholders substituídos: `PEGAR DA UNIDADE CURRICULAR`,
      `Pegar do arquivo de aula markdown`
- [ ] Slides 4 e 5 com layouts distintos, não cópias
- [ ] Fonte embutida (Roboto) **ou** trocada por Arial/Calibri
- [ ] Sem sobreposição de imagem sobre tabela (vício do slide 8)
- [ ] `validate.py` sem erros

### Grep para achar placeholders esquecidos

```bash
markitdown deck.pptx | grep -iE "PEGAR DA|Pegar do arquivo|lorem|ipsum|TODO"
```

---

## 10. Mapa de substituição de conteúdo

| Slide | Placeholder do modelo | Fonte do conteúdo real |
|---|---|---|
| 1 | Linha do tempo profissional | Currículo do professor |
| 2 | `U.C.` / `Carga Horária` / `Nº de Aulas` | Ementa da UC |
| 3 | `● PEGAR DA UNIDADE CURRICULAR` | Capacidades socioemocionais da ementa |
| 4 | `PEGAR DA UNIDADE CURRICULAR` | Domínios de conhecimento da ementa |
| 5 | `Pegar do arquivo de aula markdown` | `AULAS/AULA-NN-*.md` da UC (máx. 5 tópicos) |
| 6 | 4 regras de convivência | Fixo — regras da instituição |
| 7 | Notas 1 a 4 | Fixo — critérios de avaliação SENAI |
| 8 | Rubrica de comportamento | `Avaliação de Comportamento.xlsx` da UC |
| 9 | Prints do AVA | Fixo — plataforma institucional |

---

**Fonte:** extração direta do OOXML em 04-09-2026.
**Documento irmão:** [modelo-slide-senai-2026.md](modelo-slide-senai-2026.md) (visão pedagógica).
