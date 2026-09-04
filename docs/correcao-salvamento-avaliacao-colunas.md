# Correção do salvamento de avaliações

**Objetivo:** Evitar erro HTTP 400 ao salvar avaliações quando o banco ainda não possui uma das novas colunas de acompanhamento.

**Tech Stack:** JavaScript, Supabase REST e PostgreSQL

## Status Geral

| Passo | Descrição | Status |
|---|---|---|
| 1 | Identificar a causa no fluxo de dados | ✅ Concluído |
| 2 | Implementar gravação compatível | ✅ Concluído |
| 3 | Melhorar a mensagem de erro | ✅ Concluído |
| 4 | Revisar sem executar testes | ✅ Concluído |
| 5 | Commit e push | ✅ Concluído |

### Passo 1: Identificar a causa

**Status:** ✅ Concluído

O `PATCH /avaliacao` retorna HTTP 400 depois que o formulário passou a enviar `status_plano_aula` e `status_plano_ensino`. A leitura com `select=*` não exige essas colunas, mas a gravação rejeita campos ausentes no schema exposto pelo PostgREST.

### Passo 2: Implementar gravação compatível

**Status:** ✅ Concluído

**Arquivo:** `C:\fontes\professor-senai\sistema\dashboard.html`

**Ação:** Repetir a gravação somente quando a resposta indicar explicitamente uma coluna de acompanhamento ausente, removendo apenas esse campo do objeto compatível.

**Verificação:** Revisão estática do fluxo, sem testes, navegador ou servidor.

### Passo 3: Melhorar a mensagem

**Status:** ✅ Concluído

**Ação:** Mostrar o erro detalhado no console e orientar a execução de `supabase-avaliacoes.sql` quando houver coluna pendente.

### Passo 4: Revisar

**Status:** ✅ Concluído

**Verificação:** Inspeção do diff sem executar testes.

### Passo 5: Commit e push

**Status:** ✅ Concluído

**Verificação:** Versionar somente os arquivos desta correção e enviar para `main`.
