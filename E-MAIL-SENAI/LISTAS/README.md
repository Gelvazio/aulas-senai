# LISTAS — Contatos para importação no Resend

Pasta destinada aos arquivos de listas de e-mail dos alunos, prontos para virarem
**Audiences** no Resend (ver [../CLAUDE.md](../CLAUDE.md)).

---

## 1. Formato esperado

Arquivos **CSV com cabeçalho**, codificação **UTF-8**, separador **vírgula**.
Use [MODELO-LISTA.csv](MODELO-LISTA.csv) como base.

### Colunas padrão do Resend (obrigatórias)

| Coluna | Obrigatória | Descrição |
|---|---|---|
| `email` | ✅ Sim | Endereço do aluno — única coluna realmente indispensável |
| `first_name` | Recomendada | Primeiro nome (usado na personalização `{{{FIRST_NAME}}}`) |
| `last_name` | Recomendada | Sobrenome |

### Colunas customizadas (viram *Contact Properties*)

| Coluna | Descrição |
|---|---|
| `turma` | Identificador da turma — base para criar os **Segments** |
| `curso` | Nome da pasta do curso em `sistema/` |
| `uc` | Unidade Curricular |
| `matricula` | Matrícula do aluno |

> Colunas extras podem ser incluídas; cada uma vira uma propriedade customizada
> no Resend e pode ser usada para personalizar broadcasts.

---

## 2. Nomenclatura dos arquivos

```
LISTA-<CURSO>-<TURMA>.csv
```

Exemplos:

```
LISTA-FICHA-PRODUTO-MAIS-TECH-TURMA_SALETE_2026_02.csv
LISTA-GESTAO_E_CONTROLE_MATERIAIS-TURMA_SALETE_2026_02.csv
```

Uma lista por turma facilita criar **uma Audience por turma** no Resend.

---

## 3. Como entregar as listas

Qualquer uma destas formas funciona:

1. **Salvar o CSV nesta pasta** — o formato acima já é o ideal.
2. **Colar a lista no chat** (texto simples, planilha copiada, e-mails separados por vírgula ou quebra de linha) — eu converto para o CSV padrão.
3. **Apontar um arquivo existente** (XLSX, TXT, PDF de lista de chamada) — eu extraio e normalizo.

---

## 4. O que será feito depois

1. Normalização e validação dos e-mails (duplicados, formato inválido, domínios com erro de digitação).
2. Criação de uma **Audience por turma** no Resend.
3. Importação dos contatos com as propriedades customizadas.
4. Criação de **Segments** (ex.: alunos com pendência, alunos por UC).
5. Modelos de **Broadcast** para avisos de aula e entrega de materiais.

---

## 5. ⚠️ Privacidade e segurança

- Estes arquivos contêm **dados pessoais de alunos** (LGPD).
- **Não publicar** em repositório público nem compartilhar fora do contexto institucional.
- Se o repositório for público, adicionar `E-MAIL-SENAI/LISTAS/*.csv` ao `.gitignore`
  (mantendo apenas `MODELO-LISTA.csv` versionado).
- Nunca usar o campo `to` com múltiplos alunos — isso expõe os endereços entre eles.
  O envio deve ser sempre via **Broadcast** ou **Batch Send** individualizado.

---

**Última atualização:** 03-09-2026
