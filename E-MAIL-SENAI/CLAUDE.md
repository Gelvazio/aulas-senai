# E-MAIL-SENAI — Documentação do Projeto

Aplicação **standalone** de gestão de contatos e envio de e-mails para as turmas
do SENAI, com **login próprio**, banco no **Supabase** e envio via **Resend**.

> Projeto independente do restante de `professor-senai`.
> **Regras técnicas inegociáveis deste projeto:**
> - ✅ **Vanilla JS + HTML + CSS** — sem framework, sem bundler, sem `npm install`
> - ❌ **Sem Deno** — nada de Edge Functions
> - ❌ **Sem servidor Node** — nenhum processo backend próprio
> - ✅ **Só Supabase + Resend** — a ponte entre os dois vive dentro do Postgres

**Última atualização:** 03-09-2026

---

## 1. Arquitetura

```
┌──────────────────────────┐
│  Navegador               │
│  HTML + CSS + JS vanilla │
│  (só a anon key)         │
└───────────┬──────────────┘
            │  1. login  → /auth/v1/token
            │  2. CRUD   → /rest/v1/email_contato
            │  3. sync   → /rest/v1/rpc/sincronizar_resend
            ▼
┌──────────────────────────────────────────────┐
│  Supabase                                    │
│  ├─ Auth (auth.users) ....... login/cadastro │
│  ├─ Postgres + RLS .......... email_contato  │
│  ├─ Vault ................... RESEND_API_KEY │
│  └─ extensão `http` ......... chama o Resend │
└───────────┬──────────────────────────────────┘
            │  POST /audiences/{id}/contacts
            │  Authorization: Bearer <chave do Vault>
            ▼
┌──────────────────────────┐
│  API do Resend           │
└──────────────────────────┘
```

### Por que a sincronização roda no banco

A API do Resend **não pode ser chamada do navegador**, por dois motivos:

1. **Segurança** — a chave `re_...` ficaria visível no DevTools de qualquer aluno,
   permitindo enviar e-mail em nome do domínio da instituição.
2. **CORS** — a API do Resend não envia cabeçalhos CORS; a chamada seria bloqueada
   pelo navegador mesmo que a chave fosse pública.

As saídas possíveis eram: Edge Function (Deno — **descartado**), servidor Node
(**descartado**) ou chamar do próprio Postgres. Ficou a terceira: a extensão
`http` do Postgres faz a requisição HTTPS, e a chave é lida do **Vault**
(criptografada em repouso). O navegador nunca toca na chave.

---

## 2. Estrutura de arquivos

```
E-MAIL-SENAI/
├── index.html                      ← login e cadastro
├── dashboard.html                  ← dashboard de contatos
├── redefinir-senha.html            ← destino do link de redefinição
├── LISTAS-EMAIL.js                 ← base de alunos das listas de presença
├── servir.bat                      ← sobe servidor HTTP local
├── README.md                       ← guia rápido de uso
├── CLAUDE.md                       ← este arquivo
├── assets/
│   ├── css/app.css                 ← estilo (CSS puro, com variáveis)
│   └── js/
│       ├── config.js               ← URL, anon key, nome da RPC
│       ├── api.js                  ← Supabase Auth + REST em fetch puro
│       ├── login.js                ← lógica da tela de acesso
│       ├── redefinir-senha.js      ← grava a nova senha via token do e-mail
│       └── dashboard.js            ← CRUD, filtros, importação, sync
├── scripts/
│   ├── 001_criar_tabela_email_contato.sql
│   ├── 002_rls_login_supabase.sql
│   ├── 003_sincronizar_resend.sql
│   ├── 004_testar_resend.sql
│   └── 005_restricao_acesso_emailsenai.sql
├── .env                            ← cofre local, NÃO commitado (.gitignore)
├── .env.exemplo                    ← modelo dos campos
└── LISTAS/                         ← PDFs originais das listas de presença
    ├── README.md
    ├── MODELO-LISTA.csv
    └── *.pdf
```

Nenhum arquivo depende de build. Abrir por HTTP e usar.

---

## 3. Como rodar

O app usa **ES modules** (`<script type="module">`), que não carregam por `file://`.
É obrigatório servir por HTTP:

```bash
cd C:\fontes\professor-senai\E-MAIL-SENAI && python -m http.server 5500
```

Ou duplo clique em `servir.bat`. Depois:

```
http://localhost:5500/index.html
```

Alternativa: extensão **Live Server** do VS Code.

---

## 4. Autenticação

O login usa **diretamente os usuários do Supabase** (`auth.users`).
**Não existe** tabela de perfil paralela no app.

### Formas de criar um usuário

| Forma | Como |
|---|---|
| **Pelo app** | `index.html` → aba **Criar conta** → nome, e-mail, senha |
| **Pelo painel** | Supabase → **Authentication → Users → Add user** |

O nome digitado no cadastro vai para `raw_user_meta_data.nome` e aparece no topo
do dashboard. Usuários criados pelo painel sem esse metadata mostram o e-mail.

### 🔒 Restrição de acesso — `usuario.emailsenai`

O projeto Supabase `jwasbzdbkbryncpvfujc` é **compartilhado com outros sistemas**
(ERP, gamificação, dashboard pedagógico) e tem **10 contas** em `auth.users`.
Estar autenticado, portanto, **não** basta para entrar neste app.

O acesso é controlado pela coluna **`public.usuario.emailsenai`**:

| Valor | Efeito |
|---|---|
| `1` | pode acessar o E-MAIL-SENAI |
| `0` | **não** pode (padrão de toda conta) |

O vínculo entre o login do Supabase e a tabela `usuario` é feito pelo **e-mail** —
`usuario` não tem FK para `auth.users`.

**Administrador único:** `gelvazio@gmail.com`. Duas travas independentes garantem
isso no próprio banco:

```sql
-- a) só esse e-mail pode receber a permissão
constraint usuario_emailsenai_somente_admin
  check (emailsenai = 0 or lower(email) = 'gelvazio@gmail.com')

-- b) no máximo uma linha com emailsenai = 1 em toda a tabela
create unique index usuario_emailsenai_unico_idx
  on public.usuario ((emailsenai)) where emailsenai = 1;
```

Nem um `UPDATE` manual libera outra conta — ambas as tentativas foram testadas e
recusadas pelo banco. Para trocar o administrador é preciso, de propósito,
derrubar e recriar a constraint com o novo e-mail.

> **Nota:** `gelvazio@gmail.com` não existia em `public.usuario` (só as 7 contas
> do ERP). A linha foi criada com uma senha aleatória **inutilizável** — ela não
> serve para login algum, porque a autenticação do app é feita pelo Supabase
> Auth, não por essa tabela. Existe apenas para satisfazer o `NOT NULL`.

**Onde a permissão é exigida:** todas as policies de `email_contato`, o `SELECT`
de `unidade`, e as funções `testar_resend()` e `sincronizar_resend()`.

#### Teste realizado em 03-09-2026

| Cenário | Contatos visíveis |
|---|---|
| `anon` (sem login) | 0 ✅ |
| `admin@email.com` autenticado, `emailsenai = 0` | 0 ✅ |
| `gelvazio@gmail.com` autenticado, `emailsenai = 1` | 1 ✅ |

Script: [`scripts/005_restricao_acesso_emailsenai.sql`](scripts/005_restricao_acesso_emailsenai.sql).

### Redefinição de senha pela tela

Senhas ficam no Supabase Auth como hash bcrypt — **não são recuperáveis, apenas
redefiníveis**. O fluxo implementado:

```
index.html                      redefinir-senha.html
"Esqueci minha senha"                   ▲
        │                               │ 3. abre com #access_token=…&type=recovery
        │ 1. POST /auth/v1/recover      │
        │    ?redirect_to=…             │
        ▼                               │
   Supabase Auth ──── 2. e-mail com o link ────┘
        ▲
        │ 4. PUT /auth/v1/user  { password }
        └──────────────────────────────────────
```

1. Na tela de login, o professor informa o e-mail e clica em **Esqueci minha senha**.
2. O Supabase envia a mensagem com um link apontando para `redefinir-senha.html`.
3. A página lê o token do **fragmento** da URL (`#access_token=…`). Fragmento não
   trafega para servidor nenhum, então o token não entra em log de acesso. Ele é
   apagado da barra de endereços (`history.replaceState`) logo após a leitura.
4. A nova senha é gravada com `PUT /auth/v1/user`. A senha antiga **não** é pedida
   — quem prova a identidade é o token do e-mail, que é de uso único.

A página trata três estados: verificando o link, formulário de nova senha e
link inválido/expirado.

> ### ⚠️ Configuração obrigatória no Supabase
>
> O link só funciona se a URL de retorno estiver autorizada. Em
> **Authentication → URL Configuration → Redirect URLs**, adicionar:
>
> ```
> http://localhost:5500/redefinir-senha.html
> ```
>
> Acrescente também a URL de produção, quando houver. Sem isso o Supabase recusa
> o `redirect_to` e devolve o usuário para a Site URL padrão.
>
> **E-mail de saída:** se o SMTP não estiver configurado (Project Settings →
> Authentication → SMTP), o Supabase usa o servidor de cortesia, que tem limite
> baixo de envios por hora. Apontar para o Resend resolve — e é a mesma conta
> já usada pelo app.

### Fluxo de sessão (`assets/js/api.js`)

| Etapa | Endpoint |
|---|---|
| Cadastro | `POST /auth/v1/signup` |
| Login | `POST /auth/v1/token?grant_type=password` |
| Renovação | `POST /auth/v1/token?grant_type=refresh_token` |
| Recuperar senha | `POST /auth/v1/recover` |
| Dados do usuário | `GET /auth/v1/user` |
| Logout | `POST /auth/v1/logout` |

A sessão fica no `localStorage` sob a chave `emailsenai.session`, com `expira_em`
calculado. `Auth.token()` renova sozinho quando faltam menos de 60 s para expirar.
Toda página protegida chama `exigirLogin()`, que redireciona para `index.html`
se não houver sessão válida.

> **E-mails de autenticação:** se o Resend estiver configurado como SMTP do
> Supabase Auth (Project Settings → Authentication → SMTP), as mensagens de
> confirmação e recuperação já saem pelo Resend. Isso é independente da
> sincronização de contatos descrita na seção 6.

---

## 5. Banco de dados

Projeto Supabase: **`jwasbzdbkbryncpvfujc`**
Todas as migrations abaixo **já estão aplicadas**. Os arquivos em `scripts/`
servem como histórico e para recriar o schema em outro ambiente.

### Tabela `email_contato`

| Coluna | Tipo | Observação |
|---|---|---|
| `id` | bigserial | PK |
| `nome` | text | obrigatório |
| `email` | text | obrigatório, validado por `CHECK` |
| `first_name` / `last_name` | text | **derivados automaticamente** de `nome` |
| `unidade_id` | bigint | FK → `unidade(id)` |
| `unidade_descricao` | text | cópia textual, para histórico |
| `turno` | text | Matutino / Vespertino / Noturno |
| `turma` | text | ex.: `QA LBTSN 2026/1 M1` |
| `codigo_turma` | text | ex.: `124401` |
| `unidade_curricular` | text | nome da UC |
| `curso` | text | pasta do curso em `sistema/` |
| `materia_id` | bigint | FK → `materia(id)` |
| `origem` | text | de onde veio (PDF, CSV, cadastro manual) |
| `observacao` | text | anotações internas |
| `ativo` | boolean | default `true` |
| `unsubscribed` | boolean | espelha o descadastro no Resend |
| `status_sync` | text | `PENDENTE` \| `SINCRONIZADO` \| `ERRO` |
| `resend_contact_id` | text | id devolvido pelo Resend |
| `resend_audience_id` | text | audience usada |
| `sincronizado_em` | timestamptz | data do último envio bem-sucedido |
| `erro_sync` | text | mensagem do último erro |
| `created_at` / `updated_at` | timestamptz | `updated_at` mantido por trigger |

**Índice único:** `(lower(email), coalesce(codigo_turma,''))` — o mesmo e-mail não
entra duas vezes na mesma turma, mas pode estar em turmas diferentes.

**Trigger `email_contato_before_write`:** antes de inserir/atualizar, faz `trim` no
nome, `lower(trim(...))` no e-mail, deriva `first_name`/`last_name` quando vazios e
atualiza `updated_at`.

### Tabela `unidade` (já existia no projeto)

| id | descricao |
|---|---|
| 1 | CEPLAS BARRAGEM |
| 2 | UNIDAVI PG |
| 3 | CIVICO MILITAR ROBERTO MACHADO |
| 4 | SENAI MONARI |
| 5 | ROHDEN SALETE |

### RLS

Todas as operações em `email_contato` exigem `role = authenticated`.
A anon key sozinha **não lê nada** — sem login, nenhuma policy é satisfeita.
`unidade` tem policy de `SELECT` para autenticados, usada no seletor do formulário.

---

## 6. Sincronização com o Resend

### 6.1 Chaves no Vault — ✅ já cadastradas

| Segredo | Estado |
|---|---|
| `RESEND_API_KEY` | ✅ cadastrado em 03-09-2026 |
| `RESEND_AUDIENCE_ID` | ✅ cadastrado em 03-09-2026 — audience **"General"** |

**Onde obter, caso precise trocar:**

- `RESEND_API_KEY` → <https://resend.com/api-keys> → *Create API Key*, permissão
  **Full access**. Formato `re_...`. Aparece uma única vez.
- `RESEND_AUDIENCE_ID` → <https://resend.com/audiences>. **Não é uma chave**: é o
  UUID da lista de contatos.

Cadastrar (SQL Editor do Supabase):

```sql
select vault.create_secret('re_SuaChaveAqui', 'RESEND_API_KEY', 'Chave da API do Resend');
```

Trocar uma já cadastrada:

```sql
select vault.update_secret((select id from vault.secrets where name = 'RESEND_API_KEY'), 'nova_chave');
```

Conferir os nomes (nunca exponha o valor):

```sql
select name, description, created_at from vault.secrets;
```

### 6.2 Testar a integração

Função `testar_resend()` (script `004`), ligada ao botão **Testar conexão** do
dashboard. Faz um `GET /audiences` — somente leitura — e reporta por etapa,
sem nunca devolver a chave.

```sql
select * from public.testar_resend();
```

**Resultado da última execução — 03-09-2026:**

| Etapa | Resultado |
|---|---|
| 1. Segredos no Vault | ✅ ambos cadastrados |
| 2. Formato da chave | ✅ inicia com `re_` |
| 3. Conexão com a API | ✅ HTTP 200 |
| 4. Autenticação | ✅ chave aceita |
| 5. Audience configurada | ✅ encontrada: "General" |

A ponte Postgres → Resend está **operacional e verificada**.

### 6.3 A função `sincronizar_resend()`

```sql
select * from public.sincronizar_resend();                -- todos os pendentes
select * from public.sincronizar_resend(array[1,2,3]);    -- ids específicos
```

Retorna uma linha por contato: `contato_id`, `email`, `ok`, `mensagem`.

Características:

- `security definer` — precisa desse modo para ler o Vault, mas **aborta se
  `auth.uid()` for nulo**, então só roda para usuário logado.
- `grant execute` apenas para `authenticated`; revogado de `public` e `anon`.
- Timeout de 20 s por requisição (`CURLOPT_TIMEOUT_MS`).
- Cada contato é tratado em bloco `exception` próprio: um erro isolado **não**
  interrompe o lote — grava `status_sync = 'ERRO'` e `erro_sync`, e segue.
- Em caso de sucesso grava `resend_contact_id`, `resend_audience_id` e
  `sincronizado_em`, e limpa `erro_sync`.

### 6.4 Chamada a partir do front-end

`api.js` chama a RPC via PostgREST — não há endpoint intermediário:

```
POST /rest/v1/rpc/sincronizar_resend
Authorization: Bearer <access_token do usuário>
{ "p_ids": [1, 2, 3] }
```

---

## 7. Funcionalidades do dashboard

| Recurso | Descrição |
|---|---|
| **Novo contato** | Cadastro manual: nome, e-mail, unidade, turno, turma, código, UC, curso, observação |
| **Editar / Excluir** | Manutenção individual, com confirmação na exclusão |
| **Importar das listas de presença** | Lê `LISTAS-EMAIL.js` e insere quem já tem e-mail preenchido |
| **Importar CSV** | Coluna `email` obrigatória; `nome`, `unidade`, `turno`, `turma`, `codigo_turma`, `unidade_curricular`, `curso` são opcionais |
| **Exportar CSV** | Formato de importação do Resend, respeitando os filtros ativos, com BOM UTF-8 |
| **Sincronizar com o Resend** | Envia os pendentes via RPC e atualiza o status de cada um |
| **Testar conexão** | Roda `testar_resend()` e mostra o diagnóstico das 5 etapas |
| **Filtros** | Busca por nome/e-mail + unidade + turma + status |
| **Métricas** | Total, sincronizados, pendentes, com erro e nº de turmas |

O parser de CSV é próprio (`lerLinhaCsv`), trata aspas duplas e vírgulas dentro
de campos. Toda saída para o DOM passa por `escapar()` — proteção contra XSS.

---

## 8. Base de alunos — `LISTAS-EMAIL.js`

Extraída dos PDFs de lista de presença em `LISTAS/` (formulário padronizado
Sistema FIESC - SENAI).

| Lista | Unidade | Turma | UC | Alunos |
|---|---|---|---|---|
| `CEPLAS-MATUTINO-2026-02` | CEPLAS | QA LBTSN 2026/1 M2 (124402) | Introdução a comunicação oral e escrita para o mundo do trabalho | 15 |
| `CEPLAS-VESPERTINO-2026-02` | CEPLAS | QA LBTSN 2026/1 M2 (124402) | Competências Socioemocionais e Empreendedorismo | 15 |
| `ROBERTO-MACHADO-MATUTINO-2026-02` | Roberto Machado | QA LBTSN 2026/1 M1 (124401) | Fundamentos da Tecnologia e Programação | 8 |

### ⚠️ Dois pontos de atenção

1. **Não há e-mails nos PDFs.** As listas de presença trazem apenas **Nome e CPF**.
   Todos os 38 registros estão com `email: ''` e precisam ser preenchidos antes de
   qualquer importação ou envio.
2. **As duas listas do CEPLAS são a mesma turma (124402) com os mesmos 15 alunos** —
   mudam somente na Unidade Curricular. Se a intenção era registrar duas turmas
   distintas, um dos PDFs está com o código errado.

### Funções exportadas

| Função | Uso |
|---|---|
| `LISTAS_EMAIL` | array com as três listas |
| `todosOsContatos()` | achata tudo, já com o contexto da turma |
| `listaPorId(id)` | busca uma lista |
| `listasPorUnidade(nome)` | filtra por unidade |
| `separarNome(completo)` | devolve `{ first_name, last_name }` |
| `paraContatosResend(id)` | formato de contato do Resend (descarta sem e-mail) |
| `paraCSV(id)` | CSV de importação |
| `validarListas()` | diagnóstico: faltantes, inválidos, duplicados |
| `resumo()` | contagem geral |

---

## 9. MCP do Resend (referência)

O MCP permite operar o Resend por linguagem natural, sem escrever código.

**URL do servidor remoto:** `https://mcp.resend.com/mcp` (Streamable HTTP, OAuth)

### Instalação no Claude Code

```bash
claude plugin install resend@claude-plugins-official
```

Depois `/mcp` e selecione **resend**.

### Servidor local (alternativa, via Stdio)

```bash
claude mcp add resend -e RESEND_API_KEY=re_xxxxxxxxx -- npx -y resend-mcp
```

### Categorias de ferramentas disponíveis

| Categoria | Capacidades |
|---|---|
| **Emails** | Enviar, listar, obter, cancelar, atualizar e envio em lote (até 100 por chamada) |
| **Received Emails** | Listar e ler e-mails recebidos; baixar anexos |
| **Templates** | CRUD, publicar, duplicar (variáveis `{{{VARIABLE}}}`) |
| **Contacts** | CRUD, segmentos, tópicos, importação CSV (até 200 MB) |
| **Broadcasts** | CRUD de campanhas, agendamento, personalização |
| **Automations** | CRUD e revisão de execuções |
| **Events** | Disparar eventos que acionam automações |
| **Domains** | CRUD, verificação, tracking e TLS |
| **Segments** | CRUD de segmentos de audiência |
| **Topics** | CRUD de tópicos de inscrição |
| **Contact Properties** | CRUD de atributos customizados |
| **API Keys** | Criar, listar, remover |
| **Webhooks** | CRUD de webhooks de eventos |
| **Logs** | Inspecionar requisições, com request e response completos |
| **Editor** | Conectar ao editor visual do dashboard |

### Limites relevantes

- **Batch:** até **100 e-mails por chamada**; o campo `attachments` **não é suportado** —
  para anexo, usar o endpoint de envio individual.
- **Campo `to`:** máximo **50 endereços**, mas todos se veem — inadequado para alunos.
- **Pré-requisitos:** API key criada e **domínio verificado**.
- Sem `from` definido, o MCP pergunta o remetente a cada chamada.

Fonte: <https://resend.com/docs/mcp-server>

---

## 10. Qual recurso do Resend usar em cada caso

| Necessidade | Recurso | Motivo |
|---|---|---|
| Comunicado geral para a turma | **Audience + Broadcast** | Personalização e descadastro automático |
| Nota / feedback individual | **Batch Send** | Cada aluno recebe mensagem própria e não vê os demais |
| Material com anexo | **Envio individual** | Batch não aceita `attachments` |
| Só quem tem pendência | **Segment** dentro da Audience | Filtro sem duplicar a lista |

❌ **Nunca** colocar vários alunos no campo `to` — expõe os endereços entre eles.

---

## 11. ⚠️ LGPD e segurança

- A base contém **dados pessoais de alunos**. Acesso restrito a contas autenticadas.
- Os PDFs em `LISTAS/` contêm **CPF**. Esse dado **não** foi replicado no banco nem
  em `LISTAS-EMAIL.js` — e **não deve ser adicionado**.
- A chave do Resend fica **apenas no Vault**. Nunca em `config.js`, nunca no HTML,
  nunca commitada.
- Se este repositório se tornar público, adicionar ao `.gitignore`:
  ```
  E-MAIL-SENAI/LISTAS/*.pdf
  E-MAIL-SENAI/LISTAS/*.csv
  ```
- Envio sempre por **Broadcast** ou **Batch Send** individualizado.

### Pendência de segurança fora deste app

A tabela `public.pendencias` (usada pelo dashboard principal do projeto, em
`sistema/`) está com **RLS desabilitada** — 21 registros expostos a quem tiver a
anon key. Corrigir exige ligar RLS **e** criar policies, senão o dashboard atual
para de funcionar. Decisão pendente do professor.

---

## 12. Histórico de decisões

| Data | Decisão |
|---|---|
| 03-09-2026 | Projeto criado como app standalone, separado de `professor-senai` |
| 03-09-2026 | Stack fixada em vanilla JS/HTML/CSS — sem framework nem build |
| 03-09-2026 | Descartada Edge Function em Deno |
| 03-09-2026 | Descartado servidor Node — nenhum backend próprio |
| 03-09-2026 | Sincronização movida para dentro do Postgres (extensão `http` + Vault) |
| 03-09-2026 | Login passa a usar `auth.users` direto; removida tabela de perfil do app |
| 03-09-2026 | Chaves do Resend cadastradas no Vault e conexão validada (audience "General") |
| 03-09-2026 | `.env` criado como cofre local e protegido pelo `.gitignore` |

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
