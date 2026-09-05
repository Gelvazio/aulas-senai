# GERADOR-SLIDES — Orientações para agentes

## Escopo e fontes

Este arquivo orienta o trabalho em `GERADOR-SLIDES/`, dentro do repositório
`C:\fontes\aulas-senai`. Leia também `CLAUDE.md` local e as instruções dos diretórios
ancestrais. Antes de alterar um subprojeto, leia seu próprio `CLAUDE.md`.
Use `AGENTS.md` como nome do arquivo de orientações, evitando uma cópia `AGENT.md`.

O CLAUDE.md contém requisitos, exemplos e planos futuros. Consulte os arquivos
de implementação antes de tratar uma funcionalidade descrita como concluída.
Este documento registra o contexto observado em 05-09-2026.

## Regras de trabalho

- Não executar nem criar testes. Não abrir navegador, iniciar servidores ou fazer
  validação visual. Isso inclui `manage.py test`, `manage.py check` e o subcomando
  `validar` do gerador, salvo autorização explícita posterior do usuário.
- Não usar git worktree. Trabalhar diretamente no branch principal.
- Documentar tarefas em `docs/` antes da implementação, com passos e status.
- Após alterações, fazer commit e `git push origin main` automaticamente, sem
  perguntar. Adicionar explicitamente os arquivos da tarefa; preservar alterações
  preexistentes de outros trabalhos e não incluir credenciais ou configurações pessoais.
- Tentar atualizar o Graphify uma única vez no início da conversa com
  `C:\Python314\python.exe -m graphify update .`. Não repetir a atualização no
  encerramento. Esta frequência segue a orientação explícita de execução por sessão.
- Ler o relatório do grafo disponível no projeto; o relatório do repositório fica
  em `../graphify-out/GRAPH_REPORT.md`. Não presumir que o caminho antigo
  `C:\fontes\professor-senai` seja a raiz deste projeto. Se o módulo ou relatório
  estiver ausente, registrar a limitação e continuar pela leitura dos arquivos.
- Ao concluir a tarefa, responder apenas: **TAREFA FINALIZADA!, AJUDO EM ALGO MAIS?**

## Objetivo e arquitetura

O projeto transforma Markdown em apresentações PowerPoint no padrão SENAI e
oferece um painel Django para autenticação, histórico, cursos, matérias e ementas.

| Área | Arquivos e responsabilidade |
|---|---|
| Configuração | `manage.py`, `gerador_config/settings.py`, `gerador_config/urls.py` |
| Painel e endpoints | `dashboard/views.py`, `dashboard/urls.py` |
| Autenticação | `dashboard/auth_views.py`, `dashboard/middleware.py` |
| Integração remota | `dashboard/services.py`, classe `SupabaseService` |
| Persistência local | `dashboard/models.py`, `dashboard/migrations/`, SQLite |
| Interface | `dashboard/templates/`, Django Templates e Bootstrap 5 |
| Geração PPTX | `scripts/gerar_slides.py`, usando python-pptx |
| Padrão institucional | `padrao_slides.json`, `PADRAO-DE-SLIDES.md`, `TEMPLATE-SENAI.pptx` |
| Sintaxe de entrada | `SINTAXE-MARKDOWN.md`, `EXEMPLOS/` |
| Entradas e saídas | `ENTRADAS-AULAS-MARKDOWN/`, `SAIDA/`, `TASKS/` |
| Subprojetos | `GERADOR-AULAS/`, `GERADOR-INFOGRAFICOS/`, `ESTRUTURA-PROVAS/` |

As versões declaradas estão em `requirements.txt`; não inferir a versão instalada
apenas pelo texto do CLAUDE.md. Usar `C:\Python314\python.exe` conforme convenção local.

## Fluxos e persistência

- Login, cadastro e logout usam Supabase Auth e sessão Django. Preservar o
  middleware de autenticação e a proteção CSRF dos formulários.
- `/` apresenta o dashboard; `/gerar/` aciona o gerador Python por subprocesso;
  `/detalhe/<pk>/` e `/download/<pk>/` consultam gerações locais.
- `/novo/` salva metadados e Markdown antes da geração do PPTX;
  `/slide/<slide_id>/` permite registrar a URL do arquivo.
- `/cursos/`, `/cursos/novo/` e `/materias/nova/` lidam com cursos e matérias.
  O serviço consulta as tabelas `curso`, `materia` e a associação `cursomateria`;
  não assumir que o exemplo simplificado de schema do CLAUDE.md é o schema remoto.
- `/cadastro-ementa/` e `/ementa/<ementa_id>/editar/` usam o modelo local `Ementa`.
  Seu conteúdo guarda `markdown`, `versao` e `data_salva`; há unicidade por curso e matéria.
- Os modelos locais são `UsuarioSupabase`, `GeracaoSlide`, `Slide` e `Ementa`.
  SQLite e Supabase são persistências distintas; não presumir sincronização automática
  de todos os modelos locais com as tabelas remotas.

## Supabase

- Projeto documentado: `jwasbzdbkbryncpvfujc`.
- Para operações administrativas, usar o conector Supabase: `apply_migration`
  para migrations, `execute_sql` para SQL e `list_tables` para consultar schema.
  Essa orientação prevalece sobre os exemplos de acesso manual ao SQL Editor.
- No código da aplicação, centralizar a integração em `SupabaseService`.
- Configuração via `.env`: `SECRET_KEY`, `DEBUG`, `SUPABASE_URL`, `SUPABASE_KEY`
  e `SUPABASE_SERVICE_ROLE_KEY`. Nunca versionar ou expor os valores secretos.
- A tabela `slides` deve preservar o Markdown original no campo `conteudo` para
  auditoria e regeneração. Não substituir esse conteúdo apenas pela URL do PPTX.
- Estados de slides: `criado`, `processando`, `ativo`, `arquivado`, `excluido`.
- O serviço usa o bucket `slides`, nome `{slide_id}.pptx` e URL pública.
  A configuração efetiva das políticas depende do Supabase; não presumir privacidade.
- O cálculo de armazenamento usa 5000 MB fixos no código. Esse valor não comprova
  a quota atual do plano contratado.

## Gerador de aulas: estado atual e requisitos

`/gerador-aulas/` lista matérias com filtros baseados em
`materia.conteudo_aulas.status_geracao`: `pendente`, `processando`, `concluido`, `erro`.
O filtro `parcial` corresponde a `erro` na implementação atual.
`/gerador-aulas/nova/` apresenta o formulário e envia para `/api/gerador-aulas/`.

**Limitação atual:** `api_gerador_aulas` lê o upload como UTF-8 e retorna metadados.
Ainda há um TODO para a API Claude; esse endpoint não gera aulas, não produz
artefatos e não persiste o controle de geração descrito no plano. Não tratar sua
resposta de sucesso como geração concluída. A aceitação de PDF na documentação
não significa que haja extração de texto de PDF implementada nesse endpoint.

Ao implementar a geração planejada:

1. Ler as orientações e o estado em `materia.conteudo_aulas` antes de gerar.
2. Evitar duplicação quando o estado for `processando`; mostrar opção de regenerar
   quando já estiver `concluido`.
3. Registrar configurações, timestamps, contagens, caminhos, erros e versão no JSON.
4. Marcar `concluido` apenas depois de produzir os arquivos; registrar falhas como `erro`.
5. Preservar a relação entre curso, matéria, ementa original e conteúdo produzido.

## Conteúdo pedagógico e padrão visual

- Preservar o template institucional e concentrar parâmetros em `padrao_slides.json`.
- Ler `PADRAO-DE-SLIDES.md` e `SINTAXE-MARKDOWN.md` antes de alterar o compositor.
- Manter no mínimo 15 slides por apresentação, inclusive slides HTML.
- A sintaxe usa a primeira ocorrência de `#` como capa, as seguintes como divisórias,
  `##` para slides, `###` para colunas e `::: notas` para notas do apresentador.
- Para conteúdos destinados ao sistema principal, usar `sistema/<UC>/AULAS/` e
  `sistema/<UC>/MATERIAIS/`, respeitando eventuais contêineres de curso e turma.
  Esse `sistema/` fica na raiz do repositório, não dentro de `GERADOR-SLIDES/`.
- Pastas de curso e `PROFESSOR/` não são UCs. Aplicar as regras de estrutura às
  matérias e consultar as orientações específicas para avaliações e infográficos.
