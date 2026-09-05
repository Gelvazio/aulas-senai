# Instruções — Corretor híbrido da Prova Simples UC1 TIC

## O que o sistema cria

Ao executar a função `criarSistemaCorrecaoProvaTIC()`, o Google Apps Script cria automaticamente:

1. um Google Form para as equipes entregarem os links;
2. uma planilha de resultados;
3. a aba `CORRECAO_AUTOMATICA`, com os 7 pontos objetivos;
4. a aba `RUBRICA_DOCENTE`, com os 3 pontos qualitativos;
5. a aba `CONFIGURACAO`;
6. um gatilho que corrige cada resposta enviada.

## Instalação

1. Acesse [Google Apps Script](https://script.google.com/) com a conta do docente.
2. Crie um projeto em branco.
3. Apague o conteúdo de `Código.gs`.
4. Copie todo o conteúdo de `CORRETOR_AUTOMATICO_PROVA_SIMPLES_UC1_TIC.gs`.
5. Salve o projeto com o nome `Corretor Prova UC1 TIC`.
6. Selecione a função `criarSistemaCorrecaoProvaTIC`.
7. Clique em **Executar**.
8. Autorize o acesso solicitado ao Forms, Drive, Docs, Sheets e Slides.
9. Abra o registro de execução para copiar:
   - o link do formulário para as equipes;
   - o link de edição do formulário;
   - o link da planilha de resultados.

Não execute a função de criação novamente para a mesma turma, pois ela produzirá outro formulário e outra planilha.

## Aplicação com os estudantes

- As equipes devem utilizar arquivos nativos do Google Docs, Google Sheets e Google Slides.
- Os arquivos precisam ser compartilhados com a conta que executou o script.
- Cada equipe deve enviar o formulário somente depois de concluir os três arquivos.
- Se o script não conseguir abrir um arquivo, o relatório registrará que o docente não possui acesso.

## Como a nota é calculada

### Correção automática — 7,0 pontos

| Parte | Valor |
|---|---:|
| Organização e entrega | 1,0 |
| Google Docs | 2,0 |
| Google Sheets | 2,0 |
| Google Slides | 1,5 |
| Segurança e interpretação | 0,5 |

### Avaliação docente — 3,0 pontos

Na aba `RUBRICA_DOCENTE`, preencha valores de `0` a `1` nas três colunas:

- clareza e linguagem;
- correção técnica;
- apresentação e cooperação.

As colunas `Total docente` e `Nota final` possuem fórmulas automáticas.

## Leitura do feedback

O relatório usa os indicadores:

- `✅`: requisito automático atendido;
- `⚠️`: arquivo acessível, porém com formato, nome ou conteúdo parcialmente divergente;
- `❌`: requisito não encontrado ou arquivo inacessível.

As verificações de palavras e estrutura não substituem o julgamento pedagógico. Um texto pode mencionar um termo sem explicá-lo corretamente; por isso, a correção técnica permanece na rubrica docente.

## Estrutura obrigatória da planilha dos estudantes

- Cabeçalhos na linha 1: `Código`, `Item`, `Tipo`, `Qtd.`, `Estado`, `Ação necessária`.
- Pelo menos seis registros.
- Célula `G2`: `TOTAL DE ITENS`.
- Célula `H2`: fórmula que some as quantidades da coluna D.
- Filtro aplicado à tabela.
- Cabeçalhos com uma cor de fundo.

## Limitações importantes

- O corretor aceita apenas arquivos nativos Google.
- O script precisa ter permissão para abrir os três arquivos.
- Imagens são contadas, mas sua qualidade ou pertinência é avaliada pelo docente.
- A clareza do texto, a exatidão conceitual e a apresentação oral não são decididas automaticamente.
- Alterar os títulos das perguntas do formulário exige atualizar também `CONFIG_TIC.campos` no script.
