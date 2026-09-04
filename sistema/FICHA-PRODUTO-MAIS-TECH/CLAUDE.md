# CLAUDE.md — Pasta FICHA-PRODUTO-MAIS-TECH

> Este arquivo documenta toda a estrutura, os arquivos e o funcionamento da pasta
> `sistema/FICHA-PRODUTO-MAIS-TECH/` do repositório `professor-senai`.
> Use-o como ponto de entrada para entender o conteúdo e gerar novos materiais.

---

## 1. O que é esta pasta

Esta pasta centraliza todos os materiais pedagógicos do programa **Rio do Sul Mais Tech — SENAI**, um curso de Iniciação Profissional firmado entre a **Prefeitura Municipal de Rio do Sul** e o **SENAI**, voltado a estudantes do 8° e 9° anos do ensino fundamental (12–15 anos).

O programa é composto por **8 Unidades Curriculares (UCs)**, totalizando **336 horas presenciais por turma**, distribuídas em 5 turmas em 3 polos (LabTEC Ceplas, Roberto Machado e Aníbal de Barba).

---

## 2. Arquivos na raiz da pasta

| Arquivo | Tipo | Descrição |
|---|---|---|
| `FICHA PRODUTO MAISTECH ATUALIZADA.docx` | Word (6,4 MB) | Documento original da ficha de cadastro de produto customizado SENAI. Fonte primária de todos os dados do programa. |
| `FICHA PRODUTO MAISTECH ATUALIZADA.md` | Markdown (15 KB) | Versão convertida e expandida da ficha original em Markdown. Contém todas as 8 UCs com objetivos, capacidades e conhecimentos. **Use este arquivo como fonte de verdade ao gerar conteúdos.** |
| `MODELO_LAYOUT_APRESENTACAO.pptx` | PowerPoint (25 MB) | Modelo institucional de slides do SENAI com 15 slides padrão. Serve de referência visual para criar apresentações de UCs. |
| `.gitignore` | Git | Ignora `node_modules/` e `package-lock.json` gerados pelos scripts de criação de PPTX. |
| `CLAUDE.md` | Markdown | Este arquivo — documentação da estrutura da pasta. |

---

## 3. Estrutura do Modelo de Slides (`MODELO_LAYOUT_APRESENTACAO.pptx`)

O modelo contém **15 slides** nesta sequência obrigatória:

| Slide | Propósito |
|---|---|
| 1 | Capa com título da UC e identidade Rio do Sul Mais Tech / SENAI |
| 2 | Visual institucional decorativo |
| 3 | Identificação da UC (nome, CH, modalidade) |
| 4 | Apresentação do professor (placeholder) |
| 5 | Dinâmica de apresentação da turma (Avião de Papel) |
| 6 | Plano de Ensino (CH, encontros, dias, LabTEC) |
| 7 | Capacidades Técnicas |
| 8 | Capacidades Socioemocionais |
| 9–11 | Conhecimentos / Conteúdo Programático (3 slides) |
| 12 | Combinados e Regras da sala |
| 13 | Sistema de Avaliação (Notas 1–4) |
| 14 | Avaliação de Comportamento |
| 15 | Situação de Aprendizagem (projeto integrador) |

---

## 4. Unidades Curriculares — Subpastas

Cada subpasta representa uma UC e contém sempre 3 tipos de arquivo:
- `ementa_*.md` — dados completos da ementa
- `Apostila_*.md` — apostila didática completa para o aluno
- `Slides_*.pptx` — apresentação PPTX para o professor usar em aula

### 4.1 `CompetenciasSocioemocionaisEmpreendedorismo/`

| Campo | Valor |
|---|---|
| **UC** | Competências Socioemocionais e Empreendedorismo |
| **CH** | 36 horas presenciais |
| **Cor da paleta** | Verde escuro (`1A4731`) + amarelo dourado (`F5C518`) |

| Arquivo | Descrição |
|---|---|
| `ementa_Competencias_Socioemocionais_Empreendedorismo.md` | Ementa completa: objetivo, capacidades técnicas/socioemocionais, conhecimentos (5R's, sustentabilidade, empreendedorismo, plano de negócios, micro e pequenas empresas, intraempreendedorismo) |
| `Apostila_Competencias_Socioemocionais_Empreendedorismo.md` | Apostila completa para 36h (52 KB), com 18 encontros de 2h, atividades práticas, exemplos e glossário |
| `Slides_Competencias_Socioemocionais_Empreendedorismo.pptx` | Apresentação de 15+ slides (303 KB) com paleta verde |

---

### 4.2 `FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO/`

| Campo | Valor |
|---|---|
| **UC** | Fundamentos da Tecnologia e Programação |
| **CH** | 33 horas presenciais |
| **Cor da paleta** | Azul tecnologia (`0B3D91`) + ciano elétrico (`00E5FF`) |

| Arquivo | Descrição |
|---|---|
| `ementa_Fundamentos_Tecnologia_Programacao.md` | Ementa com capacidades e conhecimentos: hardware/software, SO, ferramentas Google/Office, internet segura, cidadania digital, pensamento computacional, algoritmos, Scratch |
| `Apostila_Fundamentos_Tecnologia_Programacao.md` | Apostila completa para 33h (50 KB) |
| `Slides_Fundamentos_Tecnologia_Programacao.pptx` | Apresentação PPTX (377 KB) |

---

### 4.3 `NocoesEletricidadeCircuitosBasicos/`

| Campo | Valor |
|---|---|
| **UC** | Noções de Eletricidade e Circuitos Básicos |
| **CH** | 36 horas presenciais |
| **Cor da paleta** | Laranja elétrico (`E65100`) + amarelo raio (`FFD600`) |

| Arquivo | Descrição |
|---|---|
| `ementa_Nocoes_Eletricidade_Circuitos_Basicos.md` | Ementa com capacidades e conhecimentos: grandezas elétricas, instrumentos de medida, instalações prediais, lâmpadas, disjuntores, NR 10, EPI, segurança elétrica |
| `Apostila_Nocoes_Eletricidade_Circuitos_Basicos.md` | Apostila completa para 36h (63 KB) |
| `Slides_Nocoes_Eletricidade_Circuitos_Basicos.pptx` | Apresentação PPTX (377 KB) com alertas de segurança |

---

### 4.4 `OFICINAS_IMPRESSAO_3D_ROBOTICA/`

| Campo | Valor |
|---|---|
| **UC** | Oficinas de Impressão 3D e Robótica |
| **CH** | 36 horas presenciais |
| **Cor da paleta** | Roxo profundo (`1A0033`) + verde neon (`00FF88`) |

| Arquivo | Descrição |
|---|---|
| `ementa_Oficinas_Impressao_3D_Robotica.md` | Ementa: FDM/SLA/SLS, Tinkercad, modelagem 3D, robótica, sensores, atuadores, classificação de robôs |
| `Apostila_Oficinas_Impressao_3D_Robotica.md` | Apostila completa para 36h (64 KB) |
| `Slides_Oficinas_Impressao_3D_Robotica.pptx` | Apresentação PPTX (381 KB) |

---

### 4.5 `INTRODUCAO_COMUNICACAO_ORAL_ESCRITA/`

| Campo | Valor |
|---|---|
| **UC** | Introdução à Comunicação Oral e Escrita para o Mundo do Trabalho |
| **CH** | 33 horas presenciais |
| **Cor da paleta** | Azul-petróleo (`004D5C`) + laranja (`FF6B35`) |

| Arquivo | Descrição |
|---|---|
| `ementa_Introducao_Comunicacao_Oral_Escrita.md` | Ementa completa da UC |
| `Apostila_Comunicacao_Oral_Escrita_33h.md` | Apostila completa para **33h** (versão integral, 48 KB) |
| `Apostila_Comunicacao_Oral_e_Escrita15h.md` | Apostila parcial de **15h** (versão anterior, 35 KB) — recorte dos primeiros 8 encontros |
| `Slides_Introducao_Comunicacao_Oral_Escrita.pptx` | Apresentação PPTX (370 KB) |
| `AULAS/Apostila_Comunicacao_Oral_e_Escrita15h.pdf` | PDF da apostila de 15h (271 KB) |
| `AULAS/AULA-18-08-2026.txt` | Registro de dados da aula do dia 18/08/2026 |

> **Nota:** Esta UC tem duas versões de apostila. A versão de 33h é a completa e definitiva.

---

### 4.6 `EXPLORACAO_CARREIRAS_INDUSTRIAIS_TECNOLOGICAS/`

| Campo | Valor |
|---|---|
| **UC** | Exploração de Carreiras Industriais e Tecnológicas |
| **CH** | 36 horas presenciais |
| **Cor da paleta** | Bordô (`4A0E2A`) + âmbar dourado (`FFB300`) |

| Arquivo | Descrição |
|---|---|
| `ementa_Exploracao_Carreiras_Industriais_Tecnologicas.md` | Ementa: Indústria 4.0, carreiras industriais e de TI, planejamento de carreira, networking, currículo, LinkedIn |
| `Apostila_Exploracao_Carreiras_Industriais_Tecnologicas.md` | Apostila completa para 36h (43 KB) |
| `Slides_Exploracao_Carreiras_Industriais_Tecnologicas.pptx` | Apresentação PPTX (299 KB) |

---

### 4.7 `REFORCO_LINGUAGENS/`

| Campo | Valor |
|---|---|
| **UC** | Reforço de Linguagens |
| **CH** | 63 horas presenciais |
| **Cor da paleta** | Verde-floresta (`1B4332`) + laranja terra (`F4A261`) |

| Arquivo | Descrição |
|---|---|
| `ementa_Reforco_Linguagens.md` | Ementa: leitura e interpretação, produção textual, coesão/coerência, pontuação, concordância, comunicação oral |
| `Apostila_Reforco_Linguagens.md` | Apostila completa para 63h (36 KB), organizada em 5 módulos temáticos |
| `Slides_Reforco_Linguagens.pptx` | Apresentação PPTX (319 KB) |
| `gerar_slides.js` | Script Node.js usado para gerar o PPTX (artefato de geração — não é material didático) |

---

### 4.8 `ReforcoMatematicaRaciocinioLogico/`

| Campo | Valor |
|---|---|
| **UC** | Reforço Matemática e Raciocínio Lógico |
| **CH** | 63 horas presenciais |
| **Cor da paleta** | Azul royal (`0D1B4B`) + vermelho vivo (`E53935`) |

| Arquivo | Descrição |
|---|---|
| `ementa_Reforco_Matematica_Raciocinio_Logico.md` | Ementa completa com 7 tópicos de conhecimento |
| `EMENTA-RACIOCINIO-LOGICO-E-MATEMATICA.txt` | Versão original da ementa em texto simples (arquivo legado) |
| `Apostila_Reforco_Matematica_Raciocinio_Logico.md` | Apostila completa para 63h (45 KB), organizada em 7 módulos |
| `Slides_Reforco_Matematica_Raciocinio_Logico.pptx` | Apresentação PPTX (330 KB) |
| `ReforcoMatematicaRaciocinioLogico01.html` | Atividade HTML — Aula 01: Operações e Raciocínio Lógico (24 KB) |
| `ReforcoMatematicaRaciocinioLogico02.html` | Atividade HTML — Aula 02 (25 KB) |
| `ReforcoMatematicaRaciocinioLogico03.html` | Atividade HTML — Aula 03 (33 KB) |
| `ReforcoMatematicaRaciocinioLogico04.html` | Atividade HTML — Aula 04 (38 KB) |
| `AULAS/Slide-Aula02-Fracoes-Proporcao-Logica.html` | Slide interativo da Aula 02 — Frações, Proporção e Lógica (31 KB) |
| `DADOS-AULA-18-08-2026.txt` | Dados de chamada/registro da aula do dia 18/08/2026 |
| `DUVIDAS-CEPLAS-18-08-2026.txt` | Dúvidas dos alunos do LabTEC Ceplas registradas em 18/08/2026 |
| `SLIDE-Matematica-Raciocínio-Logico.md` | Esboço/rascunho de slides em Markdown (legado) |
| `criar_formulario_google.gs` | Script Google Apps Script para criar formulário de avaliação no Google Forms |

---

## 5. Padrão de arquivos por UC

Toda UC deve conter exatamente:

```
<PASTA_DA_UC>/
├── ementa_<Nome_UC>.md          ← dados completos da ementa (fonte de verdade)
├── Apostila_<Nome_UC>.md        ← apostila didática completa para o aluno
└── Slides_<Nome_UC>.pptx        ← apresentação PPTX para o professor
```

---

## 6. Resumo das 8 UCs

| # | UC | Pasta | CH | Slides | Apostila |
|---|---|---|---|---|---|
| 1 | Competências Socioemocionais e Empreendedorismo | `CompetenciasSocioemocionaisEmpreendedorismo/` | 36h | ✅ | ✅ |
| 2 | Fundamentos da Tecnologia e Programação | `FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO/` | 33h | ✅ | ✅ |
| 3 | Noções de Eletricidade e Circuitos Básicos | `NocoesEletricidadeCircuitosBasicos/` | 36h | ✅ | ✅ |
| 4 | Oficinas de Impressão 3D e Robótica | `OFICINAS_IMPRESSAO_3D_ROBOTICA/` | 36h | ✅ | ✅ |
| 5 | Introdução à Comunicação Oral e Escrita | `INTRODUCAO_COMUNICACAO_ORAL_ESCRITA/` | 33h | ✅ | ✅ |
| 6 | Exploração de Carreiras Industriais e Tecnológicas | `EXPLORACAO_CARREIRAS_INDUSTRIAIS_TECNOLOGICAS/` | 36h | ✅ | ✅ |
| 7 | Reforço de Linguagens | `REFORCO_LINGUAGENS/` | 63h | ✅ | ✅ |
| 8 | Reforço Matemática e Raciocínio Lógico | `ReforcoMatematicaRaciocinioLogico/` | 63h | ✅ | ✅ |
| | **TOTAL** | | **336h/turma** | | |

---

## 7. Informações do Programa

| Campo | Valor |
|---|---|
| **Nome do programa** | Rio do Sul Mais Tech — SENAI |
| **Cliente** | Prefeitura Municipal de Rio do Sul |
| **Natureza** | Iniciação Profissional |
| **Público-alvo** | Alunos do 8° e 9° anos do ensino fundamental (12–15 anos) |
| **CH total do programa** | 2016 horas |
| **CH contratada (atendimento escolar)** | 1.680 horas |
| **CH por turma** | 336 horas |
| **Turmas** | 5 turmas em 3 polos |
| **Forma de avaliação** | 75% de frequência do PL + Nota ≥ 7 |
| **Início** | 19/02/2026 |
| **Dias** | Segunda a sexta-feira |

### Polos

| Polo (LabTEC) | Turmas | Turnos | CH total |
|---|---|---|---|
| CEPLAS | 2 turmas | Matutino + Vespertino | 672h |
| Roberto Machado | 2 turmas | Matutino + Vespertino | 672h |
| Aníbal de Barba | 1 turma | Vespertino | 336h |

---

## 8. Como gerar novos materiais para este programa

### Criar atividade HTML para uma aula
- Siga o padrão visual dos arquivos `ReforcoMatematicaRaciocinioLogico0N.html`
- Estrutura: cabeçalho (programa + aula), bloco de identificação do aluno, instruções, partes temáticas com exercícios, rodapé
- Use as variáveis CSS `--bg`, `--accent`, `--text`, `--surface` para temas claro/escuro

### Criar slides PPTX para uma aula específica
- Use `pptxgenjs` (pré-instalado via `npm`)
- Siga a sequência de 15 slides do `MODELO_LAYOUT_APRESENTACAO.pptx`
- Use a paleta de cores definida para cada UC (seção 4 deste arquivo)
- Adicione `.gitignore` na pasta antes de rodar `npm install`

### Criar avaliação / formulário Google
- Veja `ReforcoMatematicaRaciocinioLogico/criar_formulario_google.gs` como referência
- Script para Google Apps Script — execute pelo Google Drive

### Expandir uma apostila
- Leia a ementa da UC (`ementa_*.md`) como fonte primária
- Mantenha o padrão: cabeçalho SENAI, apresentação ao aluno, percurso de encontros, conteúdo por encontro (objetivo → teoria → atividade → síntese), glossário

---

## 9. Contexto para IA

Ao gerar qualquer material para este programa:
- **Público:** adolescentes de 12–15 anos, linguagem acessível, exemplos cotidianos, abordagem lúdica
- **Programa:** Rio do Sul Mais Tech — SENAI — Iniciação Profissional
- **Cabeçalho padrão:** "RIO DO SUL MAIS TECH · SENAI · Prefeitura Municipal de Rio do Sul"
- **Avaliação:** 75% de frequência + Nota ≥ 7
- **Integração entre UCs:** sempre que possível, conecte os conteúdos das diferentes UCs
- **Fonte de verdade:** `FICHA PRODUTO MAISTECH ATUALIZADA.md` (raiz desta pasta)
