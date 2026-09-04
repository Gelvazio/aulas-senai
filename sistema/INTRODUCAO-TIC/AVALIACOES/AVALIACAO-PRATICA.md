# AVALIAÇÃO PRÁTICA — Introdução à Tecnologia da Informação e Comunicação

**Programa:** Educação para o Trabalho — SENAI
**Unidade Curricular:** Introdução à Tecnologia da Informação e Comunicação (40h)
**Aplicação:** Aula 10
**Duração:** 100 minutos
**Valor:** 6,0 pontos
**Ambiente:** Laboratório de informática

**Aluno(a):** ______________________________________________ **Turma:** __________
**Data:** ______/______/__________ **Nota:** __________

---

## Instruções Gerais

1. **É permitido** consultar seus próprios arquivos, anotações e os materiais das aulas.
2. **Não é permitido** trocar informações com colegas nem usar mensageiros.
3. Todos os produtos devem ser salvos dentro da pasta `PROVA-PRATICA_<seunome>`,
   criada na **Área de Trabalho**.
4. Ao final, compacte a pasta em `PROVA-PRATICA_<seunome>.zip` e entregue no local indicado
   pelo professor.
5. Se o computador apresentar falha, **avise imediatamente** — o tempo perdido será reposto.
6. Salve o trabalho com frequência (Ctrl + S). Perda por falta de salvamento é de
   responsabilidade do aluno.

---

## CENÁRIO

> **Empresa:** Metalúrgica Vale Norte Ltda. — Setor de Embalagem
>
> No dia **05/10/2026**, às **10h15**, a **esteira transportadora ET-12** parou por
> superaquecimento do motor. A produção ficou parada por **1 hora e 25 minutos** e foram
> perdidas **410 embalagens**. O técnico responsável pelo atendimento foi **Marcos Vieira**,
> que constatou **acúmulo de resíduo no exaustor do motor** e ausência de registro de limpeza
> nos últimos 60 dias.
>
> Você trabalha no setor e foi designado para **documentar a ocorrência**, **analisar os dados
> de paradas do semestre**, **comunicar formalmente a coordenação** e **apresentar as
> recomendações** na reunião de segunda-feira.
>
> Os dados de paradas do semestre estão na pasta `DADOS-PROVA`, disponibilizada pelo professor.

---

## TAREFA 1 — Organização, Backup e Comunicação (1,5 ponto)

**Tempo sugerido:** 20 minutos

1. Criar na Área de Trabalho a pasta `PROVA-PRATICA_<seunome>` com as subpastas:
   `01_DOCUMENTO`, `02_PLANILHA`, `03_APRESENTACAO` e `04_BACKUP`.
2. Copiar os arquivos da pasta `DADOS-PROVA` para dentro de `02_PLANILHA` e **renomear**
   cada um seguindo o padrão profissional `AAAA-MM-DD_assunto_v01`.
3. Ao final da prova, compactar a pasta `PROVA-PRATICA_<seunome>` inteira e salvar o `.zip`
   também dentro de `04_BACKUP` (backup local) — este é o pacote de entrega.
4. Redigir um **e-mail profissional** endereçado ao professor (que atua como Coordenação de
   Manutenção), contendo obrigatoriamente:
   - **Assunto específico** (com equipamento e data);
   - Saudação formal;
   - Contexto com data, hora, equipamento, tempo de parada e perda registrada;
   - **Pedido claro com prazo**;
   - Fecho e assinatura completa (nome, função, setor, contato);
   - O relatório da Tarefa 2 **em anexo, no formato PDF**;
   - O professor em **Para** e um colega em **Cc**.
5. Enviar o e-mail somente **após concluir a Tarefa 2** (o anexo é o relatório em PDF).

> Se não houver acesso a e-mail no laboratório, redigir o e-mail em um arquivo
> `email-profissional.txt` dentro de `01_DOCUMENTO`, com todos os campos identificados.

---

## TAREFA 2 — Relatório Técnico no Editor de Textos (2,0 pontos)

**Tempo sugerido:** 30 minutos

Produzir o documento `2026-10-05_relatorio-ocorrencia_et12_<seunome>.docx`, salvo em
`01_DOCUMENTO`, com **estrutura completa de relatório** e as seguintes exigências:

### Conteúdo obrigatório
1. **Identificação:** título, empresa, setor, autor, data e número do documento;
2. **Objetivo:** por que o relatório foi elaborado;
3. **Descrição da ocorrência:** data, hora, equipamento, duração da parada e perdas, em
   linguagem **impessoal e objetiva**;
4. **Causa identificada;**
5. **Uma tabela** com, no mínimo, 4 linhas, contendo os dados da ocorrência
   (equipamento, data/hora, duração, perda, responsável pelo atendimento);
6. **Conclusão;**
7. **Recomendações:** no mínimo **três**, cada uma com **ação, responsável e prazo**;
8. **Referências:** ao menos uma fonte consultada, no padrão ABNT.

### Formatação obrigatória
- Página A4, margens 3 cm (superior e esquerda) e 2 cm (inferior e direita);
- Fonte Arial ou Calibri 12; títulos em 14, negrito;
- Parágrafos **justificados**, espaçamento entre linhas 1,5, recuo de primeira linha 1,25 cm;
- **Lista numerada** nas recomendações;
- **Lista com marcadores** em pelo menos um trecho;
- **Tabela** com linha de cabeçalho formatada (bordas e sombreamento) e **legenda numerada**;
- **Uma imagem ou esquema** com quebra de texto e **legenda**;
- **Caixa de destaque** com borda e sombreamento para a observação de segurança;
- **Cabeçalho** com o nome da empresa e do setor;
- **Rodapé** com numeração de páginas;
- Idioma **Português (Brasil)** e texto **revisado ortograficamente**;
- **Exportar em PDF** com o mesmo nome, na mesma pasta.

---

## TAREFA 3 — Planilha de Análise de Paradas (1,5 ponto)

**Tempo sugerido:** 30 minutos

Produzir o arquivo `2026-10-05_analise-paradas_<seunome>.xlsx`, salvo em `02_PLANILHA`,
a partir dos dados fornecidos em `DADOS-PROVA`.

### Aba `BASE`
Colunas: `Data | Equipamento | Setor | Motivo | Duração (min) | Peças Perdidas | Custo Unit. (R$) | Custo Total (R$) | Criticidade`

1. Formatar o cabeçalho (negrito e preenchimento) e **congelar a linha 1**;
2. Formatar `Data` como data, `Custo Unit.` e `Custo Total` como **moeda**, e
   `Duração` e `Peças Perdidas` como número inteiro;
3. **Fórmulas obrigatórias:**
   - `Custo Total` = `Peças Perdidas × Custo Unit.`
   - `Criticidade` = usar **SE**: parada com duração **maior que 60 minutos** → `"CRÍTICA"`;
     caso contrário → `"NORMAL"`;
4. **Formatação condicional:** destacar em vermelho as linhas com criticidade `"CRÍTICA"`.

### Aba `RESUMO`
5. Uma célula de parâmetro com o **custo-hora de parada da linha** (fornecido pelo professor),
   usada em fórmula com **referência absoluta**;
6. `=SOMA()` do custo total do semestre;
7. `=MÉDIA()` da duração das paradas;
8. `=MÁXIMO()` e `=MÍNIMO()` da duração;
9. `=CONT.SE()` do número de paradas classificadas como `"CRÍTICA"`;
10. `=SOMASE()` do custo total **por equipamento** (um por equipamento).

### Análise e gráfico
11. **Classificar** a base por Equipamento (A→Z) e, dentro dele, por Duração (maior → menor);
12. **Filtrar** e responder, em uma caixa de texto na aba `RESUMO`:
    a. Qual equipamento acumulou a maior duração total de paradas?
    b. Quantas paradas foram classificadas como críticas?
    c. Qual o motivo de parada mais frequente?
13. **Gráfico de colunas** com o custo total por equipamento, contendo **título**,
    **rótulo dos eixos com unidade** e **fonte dos dados**;
14. **Configurar impressão:** orientação paisagem, ajustar em uma página, repetir a linha de
    título, rodapé com nome do aluno e número da página. **Exportar em PDF.**

---

## TAREFA 4 — Apresentação para a Reunião (1,0 ponto)

**Tempo sugerido:** 20 minutos

Produzir o arquivo `2026-10-05_apresentacao-et12_<seunome>.pptx`, salvo em `03_APRESENTACAO`,
com **exatamente 5 slides**:

| Slide | Conteúdo |
|---|---|
| 1 | **Capa:** título, autor, setor, data |
| 2 | **Contexto e ocorrência:** dados objetivos da parada da ET-12 |
| 3 | **Análise:** o **gráfico importado da Tarefa 3**, com título, unidade e fonte |
| 4 | **Recomendações:** as três ações, com responsável e prazo |
| 5 | **Conclusão e referências** |

### Exigências
- Proporção **16:9**, com **numeração de slides** e rodapé (usar o **slide mestre**);
- Fonte mínima de **24 pt** no corpo e **32 pt** nos títulos;
- Títulos que expressem a **conclusão** do slide, e não apenas o assunto;
- **Uma única transição** aplicada a toda a apresentação;
- Ao menos uma **imagem ou esquema** com fonte citada;
- **Anotações do orador** preenchidas em pelo menos três slides;
- **Exportar em PDF** na mesma pasta.

---

## ENTREGA

Ao término, verifique a lista abaixo antes de entregar:

- [ ] Pasta `PROVA-PRATICA_<seunome>` com as 4 subpastas
- [ ] `01_DOCUMENTO`: relatório `.docx` **e** `.pdf` (+ `email-profissional.txt`, se aplicável)
- [ ] `02_PLANILHA`: planilha `.xlsx` **e** `.pdf`, mais os arquivos de origem renomeados
- [ ] `03_APRESENTACAO`: apresentação `.pptx` **e** `.pdf`
- [ ] `04_BACKUP`: o arquivo `PROVA-PRATICA_<seunome>.zip`
- [ ] E-mail enviado com o PDF do relatório em anexo, professor em **Para** e colega em **Cc**
- [ ] O `.zip` foi testado e abre corretamente

**Assinatura do aluno:** _______________________________________

**Recebido pelo professor em:** ______/______/________ às ______:______

---

## Distribuição dos Pontos

| Tarefa | Produto | Pontos |
|---|---|---|
| 1 | Organização, backup e e-mail profissional | 1,5 |
| 2 | Relatório técnico formatado + PDF | 2,0 |
| 3 | Planilha com fórmulas, filtro e gráfico + PDF | 1,5 |
| 4 | Apresentação de 5 slides + PDF | 1,0 |
| | **Total** | **6,0** |

> Os critérios detalhados de correção estão em `CRITERIOS-CORRECAO-PRATICA.md` e são
> apresentados aos alunos **antes** da avaliação.

---

**Boa prova!**
