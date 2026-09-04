# CLAUDE.md — Pasta REFORCO_LINGUAGENS

> Este arquivo documenta a estrutura, os arquivos e o funcionamento da pasta
> `sistema/FICHA-PRODUTO-MAIS-TECH/REFORCO_LINGUAGENS/`.

---

## 1. O que é esta pasta

Esta pasta centraliza todos os materiais pedagógicos da **Unidade Curricular (UC) — Reforço de Linguagens**, que faz parte do programa **Rio do Sul Mais Tech — SENAI**, voltado a estudantes do 8° e 9° anos do ensino fundamental (12–15 anos).

A UC tem **63 horas presenciais** de conteúdo, organizadas em **5 módulos temáticos** com **30 encontros de 2–3 horas cada**.

---

## 2. Arquivos na pasta

| Arquivo | Tipo | Tamanho | Descrição |
|---|---|---|---|
| `Ementa_Reforco_Linguagens.md` | Markdown | ~2 KB | Ementa oficial da UC (metadados, objetivo, capacidades, conhecimentos, estrutura de módulos) |
| `Apostila_Reforco_Linguagens.md` | Markdown | ~37 KB | Apostila didática completa para o aluno (30 encontros, atividades, glossário) |
| `Slides_Reforco_Linguagens.pptx` | PowerPoint | ~476 KB | Apresentação em slides PPTX para o professor (15+ slides com paleta verde-floresta) |
| `gerar_slides.js` | Node.js Script | ~90 KB | Script automatizado para gerar o PPTX usando `pptxgenjs` |
| `TEXTO-REFORCO-25-08-2026.docx` | Word Document | ~40 KB | Documento Word recente com material complementar ou revisão de conteúdo (data: 25/08/2026) |

---

## 3. Identificação da UC

| Campo | Valor |
|---|---|
| **UC** | Reforço de Linguagens |
| **Programa** | Rio do Sul Mais Tech — SENAI / Prefeitura Municipal de Rio do Sul |
| **Público-alvo** | Alunos do 8° e 9° ano do Ensino Fundamental (12–15 anos) |
| **Carga Horária Total** | 63 horas presenciais |
| **Modalidade** | Presencial |
| **Módulos** | 5 módulos temáticos |
| **Encontros** | 30 encontros (2–3 horas cada) |
| **Paleta de cores** | Verde-floresta (`1B4332`) + Laranja terra (`F4A261`) |

---

## 4. Objetivo da UC

Desenvolver e aprimorar as competências de **leitura, escrita, interpretação e comunicação oral**, fortalecendo a base linguística dos estudantes para sua vida acadêmica, profissional e social.

---

## 5. Estrutura de Módulos

| Módulo | Tema | Encontros | CH | Conteúdo |
|---|---|---|---|---|
| **1** | Leitura e Compreensão Textual | 1–7 | 15h | Tipos de texto, contexto, tema, ideia principal, intenção comunicativa, inferências |
| **2** | Produção Textual | 8–12 | 12h | Paragrafação, organização de ideias, coesão textual, conectivos, coerência |
| **3** | Gramática Aplicada | 13–17 | 12h | Pontuação, concordância verbal, concordância nominal |
| **4** | Comunicação Oral | 18–22 | 12h | Debate, argumentação, apresentação oral, escuta ativa, situações comunicativas |
| **5** | Autonomia e Estratégias de Estudo | 23–30 | 12h | Gêneros textuais, leitura crítica, análise de discurso, sínteses, mapas mentais, avaliação final |
| | **TOTAL** | | **63h** | |

---

## 6. Capacidades

### Básicas
1. Organizar informações de forma clara e coerente
2. Desenvolver autonomia de estudo, utilizando estratégias de leitura e escrita
3. Aplicar pensamento crítico na análise de textos e situações comunicativas
4. Trabalhar em grupo, colaborando em atividades de leitura, produção textual e debates
5. Comunicar-se de forma assertiva, respeitando diferentes opiniões e contextos
6. Cumprir prazos e entregar atividades dentro das orientações propostas

---

## 7. Conhecimentos

| # | Conhecimento |
|---|---|
| 1 | Compreensão global e detalhada de textos |
| 2 | Identificação de tema, ideia principal e intenção comunicativa |
| 3 | Coesão e coerência textual |
| 4 | Paragrafação e organização de ideias |
| 5 | Pontuação e seu uso comunicativo |
| 6 | Concordância verbal e nominal |

---

## 8. Sobre a Apostila (`Apostila_Reforco_Linguagens.md`)

### Estrutura
- **Apresentação ao aluno** — Conexão com realidade do adolescente
- **Tabela de encontros** — Percurso de 30 encontros (Encontro 1 até Encontro 30 / 29)
- **5 módulos temáticos** — Cada um subdivido em encontros
- **Por encontro:** Objetivos → Texto base → Conteúdo explicado → Atividades variadas → Síntese
- **Fechamento:** Glossário, gabarito, referências sugeridas

### Público-alvo
Adolescentes de 12–15 anos — linguagem acessível, exemplos cotidianos, abordagem interativa

---

## 9. Sobre os Slides (`Slides_Reforco_Linguagens.pptx`)

### Geração Automática
O arquivo PPTX é gerado automaticamente pelo script `gerar_slides.js` usando a biblioteca **pptxgenjs** (Node.js).

**Para regenerar os slides:**
```bash
npm install  # instala dependências (pptxgenjs)
node gerar_slides.js  # regenera o arquivo PPTX
```

### Estrutura de Slides
- **Slide 1:** Capa com título, identidade do programa e nome da UC
- **Slides 2–5:** Apresentação institucional (visual SENAI, identificação da UC, apresentação do professor)
- **Slides 6–8:** Estrutura pedagógica (plano de ensino, capacidades técnicas e socioemocionais)
- **Slides 9–11:** Conteúdo programático (conhecimentos e tópicos)
- **Slide 12:** Combinados e regras da sala
- **Slide 13:** Sistema de avaliação
- **Slide 14:** Avaliação de comportamento
- **Slide 15:** Situação de aprendizagem / projeto integrador

### Paleta de Cores
```javascript
PRIMARY:   #1B4332   (Verde-floresta escuro)
SECONDARY: #2D6A4F   (Verde secundário)
ACCENT:    #F4A261   (Laranja terra)
LIGHT:     #F0FFF4   (Branco com tons verdes)
DARK:      #0A1F14   (Preto verde)
WHITE:     #FFFFFF   (Branco puro)
MUTED:     #A8D5B5   (Verde pastel)
CARD:      #234D3C   (Verde card)
```

---

## 10. Arquivo Word (`TEXTO-REFORCO-25-08-2026.docx`)

Este é um arquivo complementar criado em **25 de agosto de 2026**. Contém:
- Material adicional ou revisão de conteúdo
- Possível versão em preparação de material didático
- Referência para atualizações futuras

**Nota:** Verifique o conteúdo deste arquivo para determinar se precisa ser integrado à apostila ou ao PPTX.

---

## 11. Script de Geração (`gerar_slides.js`)

### Objetivo
Automatizar a criação do arquivo PPTX a partir de dados estruturados, mantendo consistência visual e facilitando atualizações.

### Dependências
- `pptxgenjs` (Node.js library para PowerPoint)

### Uso
```bash
# 1. Instalar dependências (primeira vez)
npm install

# 2. Gerar/regenerar os slides
node gerar_slides.js

# 3. Resultado
# → Slides_Reforco_Linguagens.pptx (atualizado)
```

### Funcionalidades principais
- Criação de backgrounds e títulos
- Adição de cards com bordas coloridas
- Footer com identidade do programa
- Paleta de cores consistente
- Layout 16:9

---

## 12. Como trabalhar com esta pasta

### Adicionar um novo encontro à apostila
1. Abra `Apostila_Reforco_Linguagens.md`
2. Localize o módulo correspondente
3. Siga o padrão: **Objetivos → Texto base → Conteúdo → Atividades → Síntese**
4. Mantenha consistência de linguagem e tom (dirigido ao adolescente)

### Atualizar a ementa
1. Edite `Ementa_Reforco_Linguagens.md`
2. Mantenha a estrutura de tabelas e seções
3. **Não** mude a CH total (63h)

### Regenerar os slides
1. Edite `gerar_slides.js` com novos conteúdos
2. Execute: `node gerar_slides.js`
3. Valide o arquivo PPTX gerado

### Adicionar material complementar
- Crie novos arquivos `.md` ou `.docx` nesta pasta
- Use prefixo descritivo: `TEXTO-`, `ATIVIDADE-`, etc.
- Registre a data no nome do arquivo

---

## 13. Textos de Reforço — Regra Obrigatória

### 📝 Definição

Textos de reforço são materiais complementares em **PDF**, baseados nos temas da **ementa**, com linguagem adaptada para adolescentes de **12–16 anos** (máximo 14 anos). Servem para:
- Reforçar aprendizagem entre encontros
- Oferecer leitura independente com compreensão assegurada
- Diversificar contextos de aplicação dos conhecimentos

### ✅ Quantidade Obrigatória

Mínimo **5 textos de reforço**, um para cada módulo da UC:

| Arquivo | Módulo | Tema | CH Estimada |
|---|---|---|---|
| `TEXTO-REFORCO-MODELO-01.pdf` | 1 | Leitura e Compreensão Textual | 2–3h |
| `TEXTO-REFORCO-MODELO-02.pdf` | 2 | Produção Textual | 2–3h |
| `TEXTO-REFORCO-MODELO-03.pdf` | 3 | Gramática Aplicada | 2–3h |
| `TEXTO-REFORCO-MODELO-04.pdf` | 4 | Comunicação Oral | 2–3h |
| `TEXTO-REFORCO-MODELO-05.pdf` | 5 | Autonomia e Estratégias de Estudo | 2–3h |

### 🎯 Critérios de Conformidade

Cada texto deve atender:

1. **Formato:** PDF (gerado de Markdown → DOCX → PDF ou direto)
2. **Estrutura:**
   - Cabeçalho com identidade do programa (RIO DO SUL MAIS TECH · SENAI)
   - Título do texto e módulo associado
   - Identificação do aluno (seção para preenchimento: nome, turma, data)
   - Texto principal (600–1000 palavras)
   - Glossário de termos desconhecidos
   - 3–5 atividades de compreensão (resposta breve, múltipla escolha, verdadeiro/falso)
   - Gabarito (com comentários pedagógicos)

3. **Linguagem:**
   - Simples e clara, sem jargão técnico desnecessário
   - Conectada à realidade de adolescentes (12–16 anos)
   - Exemplos cotidianos e relevantes
   - Parágrafos curtos (máx. 4–5 linhas)

4. **Conteúdo:**
   - Alinhado aos conhecimentos de seu módulo
   - Diferentes temas em cada texto (não repetir contextos)
   - Possibilidade de uso independente (aluno estuda sozinho)

### 📋 Temas Sugeridos por Módulo

#### Módulo 1 — Leitura e Compreensão Textual
- **Tema:** "Redes Sociais e Leitura Crítica" ou "Notícias Falsas: Como Identificar"
- **Objetivo:** Ler com crítica, entender intenção comunicativa

#### Módulo 2 — Produção Textual
- **Tema:** "Escrevendo um Email Profissional" ou "Como Escrever um Resumo"
- **Objetivo:** Estruturar ideias, produzir texto coerente

#### Módulo 3 — Gramática Aplicada
- **Tema:** "Erros Comuns que Até YouTubers Cometem" ou "Pontuação que Muda o Significado"
- **Objetivo:** Entender uso prático de regras gramaticais

#### Módulo 4 — Comunicação Oral
- **Tema:** "Apresentações e Nervosismo" ou "Ouvir com Atenção: A Arte de Entender"
- **Objetivo:** Desenvolver segurança e clareza ao falar

#### Módulo 5 — Autonomia e Estratégias de Estudo
- **Tema:** "Organizando Seu Tempo de Estudo" ou "Técnicas de Memorização que Funcionam"
- **Objetivo:** Empoderar autonomia de aprendizagem

### 🔄 Fluxo de Criação

1. **Escrever em Markdown** (`TEXTO-REFORCO-MODELO-0X.md`)
2. **Converter para DOCX** (usando `python-docx` ou manualmente)
3. **Exportar para PDF** (do Word ou via script Python/LibreOffice)
4. **Validar:** ✓ Estrutura | ✓ Linguagem | ✓ Conformidade | ✓ Arquivo PDF válido

### ⚠️ Status de Implementação

- [ ] `TEXTO-REFORCO-MODELO-01.pdf` — Módulo 1
- [ ] `TEXTO-REFORCO-MODELO-02.pdf` — Módulo 2
- [ ] `TEXTO-REFORCO-MODELO-03.pdf` — Módulo 3
- [ ] `TEXTO-REFORCO-MODELO-04.pdf` — Módulo 4
- [ ] `TEXTO-REFORCO-MODELO-05.pdf` — Módulo 5

---

## 14. Checklist de Conformidade

### ✅ Obrigatório
- [x] Ementa em Markdown (`Ementa_Reforco_Linguagens.md`)
- [x] Apostila completa (`Apostila_Reforco_Linguagens.md`) — 63h
- [x] Slides PPTX (`Slides_Reforco_Linguagens.pptx`) — 15+ slides
- [x] Script de geração (`gerar_slides.js`)
- [x] Mínimo 15 slides no PPTX
- [ ] Mínimo 5 Textos de Reforço em PDF (um por módulo) — `TEXTO-REFORCO-MODELO-0X.pdf`

### ⚠️ Para Validação
- [ ] Material Word recente (`TEXTO-REFORCO-25-08-2026.docx`) — usar ou remover?
- [ ] Integração com `dashboard.html` do programa

---

## 14. Informações do Programa

| Campo | Valor |
|---|---|
| **Nome** | Rio do Sul Mais Tech — SENAI |
| **Público-alvo** | Alunos do 8° e 9° anos do Ensino Fundamental |
| **CH por turma** | 336 horas (8 UCs de 33–63h cada) |
| **Forma de avaliação** | 75% de frequência + Nota ≥ 7 |
| **Início** | 19/02/2026 |
| **Dias** | Segunda a sexta-feira |
| **Turnos** | Matutino e Vespertino |
| **Polos** | CEPLAS, Roberto Machado, Aníbal de Barba |

---

## 15. Referências Rápidas

### Arquivos relacionados (fora desta pasta)
- Ementa mestre do programa: `FICHA PRODUTO MAISTECH ATUALIZADA.md` (na raiz de `FICHA-PRODUTO-MAIS-TECH/`)
- Dashboard do programa: `../../dashboard.html`
- Instruções globais: `../../../CLAUDE.md` (projeto)

### Contato / Suporte
- Email: gelvazio@gmail.com
- Programa: Rio do Sul Mais Tech
- Instituição: SENAI — Prefeitura Municipal de Rio do Sul

---

*Última atualização: 28 de agosto de 2026*
*Documentação gerada automaticamente*
