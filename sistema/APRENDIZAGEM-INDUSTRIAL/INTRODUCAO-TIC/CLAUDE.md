# CLAUDE.md — UC Introdução à Tecnologia da Informação e Comunicação

**Data de Última Atualização:** 04-09-2026
**Curso:** SENAI — Módulo Educação para o Trabalho
**Carga horária:** 40h — 10 encontros de 4h
**Responsável:** Professor de Tecnologia (SENAI)
**Objetivo deste arquivo:** documentar a UC, a estrutura da pasta e as regras de trabalho
específicas de `sistema/INTRODUCAO-TIC/`

---

## 1. O que é esta pasta

`sistema/INTRODUCAO-TIC/` é uma **Unidade Curricular (UC)** — não é curso/contêiner.

Contém o **plano completo de 40h** da UC *Introdução à Tecnologia da Informação e
Comunicação*: 10 aulas em Markdown, dashboard navegável, avaliações com gabarito e
critérios de correção, além da ementa oficial que serve de fonte para todo o conteúdo.

**Objetivo geral da UC:** desenvolver capacidades básicas e socioemocionais de
comunicação profissional, interpretação de textos técnicos e uso seguro de ferramentas
de TIC no ambiente de trabalho.

---

## 2. Estrutura da pasta

| Pasta / Arquivo | Conteúdo |
|---|---|
| `AULAS/` | ✅ Obrigatória — 10 aulas `.md` + `index.html` (dashboard navegável) |
| `MATERIAIS/` | ✅ Obrigatória — recursos de apoio e insumos das atividades (ver `MATERIAIS/README.md`) |
| `AVALIACOES/` | Prova objetiva, gabarito comentado, prova prática e critérios de correção |
| `EMENTA-INTRODUCAO-TENOLOGIA-INFORMACAO.md` | Ementa oficial — **fonte da verdade** do conteúdo |
| `PLANO-DE-AULAS.md` | Plano de 40h: blocos, cobertura da ementa, avaliação e preparação prévia |
| `CLAUDE.md` | Este documento |

---

## 3. As 10 aulas

| # | Arquivo em `AULAS/` | Tema | Ambiente |
|---|---|---|---|
| 01 | `AULA-01-INTRODUCAO-COMPUTACAO-HARDWARE-SOFTWARE.md` | História, hardware × software, mouse, teclado, área de trabalho, pastas e arquivos | Laboratório |
| 02 | `AULA-02-SISTEMA-OPERACIONAL-E-ORGANIZACAO-DIGITAL.md` | Sistema operacional, periféricos, busca e compactação | Laboratório |
| 03 | `AULA-03-COMUNICACAO-PROFISSIONAL.md` | Elementos da comunicação, níveis de fala, trabalho em equipe | Sala de aula |
| 04 | `AULA-04-TEXTOS-TECNICOS.md` | Relatórios, atas, memorandos e resumos | Sala de aula |
| 05 | `AULA-05-INTERNET-E-WEB.md` | Navegação, pesquisa, e-mail e nuvem | Laboratório |
| 06 | `AULA-06-SEGURANCA-DA-INFORMACAO.md` | Pilares, legislação, golpes, senhas, backup e malware | Laboratório |
| 07 | `AULA-07-EDITOR-DE-TEXTOS.md` | Software de escritório — editor de textos | Laboratório |
| 08 | `AULA-08-PLANILHAS-ELETRONICAS.md` | Software de escritório — planilhas eletrônicas | Laboratório |
| 09 | `AULA-09-APRESENTACOES-E-PROJETO-INTEGRADOR.md` | Editor de apresentações + projeto integrador | Laboratório / Auditório |
| 10 | `AULA-10-AVALIACOES.md` | Aplicação da avaliação objetiva e da prática | Laboratório |

**Blocos:** A — Fundamentos Digitais (01–02) · B — Comunicação Profissional (03–04) ·
C — Web e Segurança (05–06) · D — Softwares de Escritório (07–09) · E — Avaliação (10).

✅ **Cobertura da ementa: 10/10 domínios de conhecimento e 5/5 capacidades básicas.**

---

## 4. Avaliação

| Instrumento | Arquivo | Aula | Valor |
|---|---|---|---|
| Avaliação Objetiva — 40 questões | `AVALIACOES/AVALIACAO-OBJETIVA.md` | 10 | 4,0 |
| Gabarito comentado | `AVALIACOES/GABARITO-AVALIACAO-OBJETIVA.md` | — | documento do professor |
| Avaliação Prática — 4 tarefas | `AVALIACOES/AVALIACAO-PRATICA.md` | 10 | 6,0 |
| Rubrica de correção | `AVALIACOES/CRITERIOS-CORRECAO-PRATICA.md` | — | documento do professor |
| Acompanhamento formativo | — | 01–09 | registro qualitativo |
| **Total** | | | **10,0** |

> ⚠️ Os pesos são **decisão de planejamento** deste projeto. A ementa declara apenas as
> 40h totais e **não fixa** quantidade de aulas, pesos ou critérios de avaliação.
> Não apresentar esses números como exigência da ementa.

---

## 5. Encadeamento dos produtos do aluno

```
Aula 04  →  Relatório de ocorrência (manuscrito)
              ↓
Aula 07  →  Relatório formatado no editor de textos + PDF
              ↓
Aula 08  →  Planilha de dados + gráfico
              ↓
Aula 09  →  Apresentação com o gráfico e as recomendações
              ↓
Aula 10  →  Avaliação prática: mesmo encadeamento, cenário novo
```

Os artefatos se acumulam. Ao alterar uma aula deste encadeamento, **verificar o impacto
nas seguintes** — um produto quebrado inviabiliza o projeto integrador.

---

## 6. Como trabalhar com esta pasta

| Tarefa | Onde / Como |
|---|---|
| Editar uma aula | `AULAS/AULA-NN-*.md`, seguindo o template de `sistema/CLAUDE.md` |
| Criar nova aula | Mesmo template + registrar no `PLANO-DE-AULAS.md` **e** no `AULAS/index.html` |
| Alterar avaliação | `AVALIACOES/` — atualizar **sempre em par** prova + gabarito/critérios |
| Adicionar material de apoio | `MATERIAIS/` (ver convenção de nomes no `README.md`) |
| Criar slides HTML | Mínimo **15 slides** por arquivo |
| Criar infográfico | Base obrigatória: `sistema/GERADOR-INFOGRAFICOS/infografico.css` |
| Consultar o grafo | Sempre a partir de `graphify-out/` na **raiz** (ver bloco final) |

### Regras de consistência

1. A **ementa é a fonte da verdade**. Conteúdo além dela deve ser marcado como
   *aprofundamento didático* — como já é feito com a história da computação na Aula 01.
2. Toda aula mantém as seções do template: objetivos, conteúdo programático com tempos,
   estratégias, atividades práticas, recursos, avaliação formativa e observações.
3. Ao mexer em qualquer aula, conferir se `AULAS/index.html` e `PLANO-DE-AULAS.md`
   continuam refletindo o conteúdo.

---

## 7. Checklist de Conformidade

- [x] Pasta `AULAS/` com as 10 aulas em `.md`
- [x] Dashboard navegável `AULAS/index.html`
- [x] Pasta `MATERIAIS/` com `README.md` de organização
- [x] Pasta `AVALIACOES/` com prova objetiva, gabarito, prova prática e rubrica
- [x] Ementa oficial presente
- [x] `PLANO-DE-AULAS.md` com cobertura da ementa
- [x] `CLAUDE.md` com cabeçalho, estrutura da pasta e regras de trabalho
- [ ] Insumos físicos/digitais das atividades depositados em `MATERIAIS/` — **em aberto**
- [ ] Datas dos 10 encontros preenchidas (hoje `___/___/____`) — **em aberto**

---

**Referências de padrão:** `CLAUDE.md` (raiz) · `sistema/CLAUDE.md` (template pedagógico e
estrutura obrigatória de UC).

---

<!-- GRAPHIFY-RAIZ:INICIO -->
## 🔗 Grafo de conhecimento — SEMPRE na raiz do projeto

⚠️ **Esta pasta NÃO tem, e não deve ter, uma pasta `graphify-out/` própria.**

O grafo de conhecimento do projeto existe em **um único lugar**:

```
C:\fontes\aulas-senai/graphify-out/
```

### Onde buscar as informações

Ao precisar de contexto do grafo (relatório, nós, comunidades, arquivos
relacionados), leia **sempre** a partir da raiz — nunca de uma cópia local:

| Arquivo | Caminho a partir da raiz |
|---|---|
| Relatório legível | `graphify-out/GRAPH_REPORT.md` |
| Grafo completo (JSON) | `graphify-out/graph.json` |
| Visualização | `graphify-out/graph.html` |

### Onde atualizar o grafo

A atualização **também acontece apenas na raiz**. Rodar o graphify dentro de
uma subpasta cria um segundo grafo, parcial e desatualizado:

```bash
cd C:\fontes\aulas-senai
C:\Users\gelva\.local\bin\graphify.exe update .
```

❌ **Nunca** executar `graphify update` a partir desta pasta.
❌ **Nunca** criar `graphify-out/` aqui — o `.gitignore` já bloqueia essa pasta
fora da raiz.
<!-- GRAPHIFY-RAIZ:FIM -->
