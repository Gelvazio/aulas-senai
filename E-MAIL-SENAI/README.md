# E-MAIL SENAI

Aplicação **standalone** de gestão de contatos e envio de e-mails para as turmas,
com login próprio, banco no **Supabase** e envio via **Resend**.

> **Vanilla JS + HTML + CSS.** Sem framework, sem bundler, sem `npm install`,
> sem Deno, sem servidor Node. Só Supabase + Resend.

📖 Documentação completa da arquitetura: **[CLAUDE.md](CLAUDE.md)**

---

## 1. Como rodar

O app usa ES modules, que não carregam por `file://`. É preciso servir por HTTP:

```bash
cd C:\fontes\professor-senai\E-MAIL-SENAI && python -m http.server 5500
```

Ou duplo clique em `servir.bat`. Depois acesse:

```
http://localhost:5500/index.html
```

Alternativa: extensão **Live Server** do VS Code.

---

## 2. Primeiro acesso

1. Abra `index.html` → aba **Criar conta** → nome, e-mail e senha (mín. 6 caracteres).
2. Se a confirmação por e-mail estiver ativa no Supabase, confirme pelo link recebido.
3. Faça login.

O usuário é criado **direto no Supabase Auth** (`auth.users`). Também dá para
criar pelo painel: **Authentication → Users → Add user**.

---

## 3. Estrutura

```
E-MAIL-SENAI/
├── index.html                  ← login e cadastro
├── dashboard.html              ← dashboard de contatos
├── LISTAS-EMAIL.js             ← base de alunos das listas de presença
├── servir.bat                  ← servidor HTTP local
├── assets/
│   ├── css/app.css
│   └── js/{config,api,login,dashboard}.js
├── scripts/                    ← SQL já aplicado (histórico)
└── LISTAS/                     ← PDFs das listas de presença
```

---

## 4. Banco de dados

✅ **Já aplicado** no projeto Supabase `jwasbzdbkbryncpvfujc`:

| Item | Estado |
|---|---|
| Tabela `email_contato` (24 colunas) | ✅ criada |
| Trigger de normalização de nome/e-mail | ✅ ativo |
| Índice único (e-mail + turma) | ✅ criado |
| Policies RLS (4, só autenticados) | ✅ aplicadas |
| Extensão `http` 1.6 | ✅ habilitada |
| Função `sincronizar_resend()` | ✅ criada |
| Segredos no Vault | ⬜ **pendente** — ver passo 5 |

Os arquivos em `scripts/` são o histórico e servem para recriar o schema em
outro ambiente.

---

## 5. ⬜ Passo pendente: cadastrar a chave do Resend

Único passo manual. No **SQL Editor** do Supabase:

```sql
select vault.create_secret('re_SuaChaveAqui', 'RESEND_API_KEY', 'Chave da API do Resend');
```

```sql
select vault.create_secret('<id-da-audience>', 'RESEND_AUDIENCE_ID', 'Audience padrao do E-MAIL-SENAI');
```

O `RESEND_AUDIENCE_ID` vem de **Audiences → Create Audience** no dashboard do Resend.

Até fazer isso, todo o dashboard funciona normalmente — apenas o botão
**Sincronizar com o Resend** avisa que a chave não está cadastrada.

---

## 6. Funcionalidades

| Recurso | Descrição |
|---|---|
| **Novo contato** | Cadastro manual com unidade, turno, turma, código e UC |
| **Editar / Excluir** | Manutenção individual |
| **Importar das listas** | Lê `LISTAS-EMAIL.js` e insere quem já tem e-mail |
| **Importar CSV** | `email` obrigatório; demais colunas opcionais |
| **Exportar CSV** | Formato Resend, respeitando os filtros |
| **Sincronizar** | Envia os pendentes para a Audience do Resend |
| **Filtros** | Nome/e-mail, unidade, turma e status |
| **Métricas** | Total, sincronizados, pendentes, erros e turmas |

---

## 7. ⚠️ Atenção nos dados atuais

- **Os PDFs em `LISTAS/` não têm e-mail** — só Nome e CPF. Os 38 alunos em
  `LISTAS-EMAIL.js` estão com `email: ''` e precisam ser preenchidos.
- **As duas listas do CEPLAS são a mesma turma (124402), com os mesmos 15 alunos** —
  mudam só na UC.
- **CPF não foi replicado** para o banco nem para o JS, por LGPD. Não adicione.

---

**Última atualização:** 03-09-2026
