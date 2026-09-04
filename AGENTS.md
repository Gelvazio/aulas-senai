# update branch
# professor-senai — Regras do Projeto

## Commit e Push obrigatórios

⚠️ **APÓS QUALQUER INTERAÇÃO NO CHAT que resulte em alteração de arquivo, faça commit e push IMEDIATAMENTE, sem perguntar e sem pedir confirmação.**

1. `git add` dos arquivos alterados
2. `git commit -m "mensagem descritiva"`
3. `git push origin main`

Isso vale para qualquer mudança, por menor que seja. Nunca questionar, nunca pedir aprovação — apenas executar.

## Graphify

Após commitar, executar:

```
C:\Python314\python.exe -m graphify update .
```

⚠️ **NUNCA perguntar se deve executar o graphify ou dar push — executar diretamente, sem confirmar, sem perguntar.**

## Nunca perguntar — sempre executar

⚠️ **NUNCA faça perguntas antes de executar uma tarefa.** Sempre execute diretamente, sem pedir confirmação, sem perguntar se deve prosseguir, sem listar opções e aguardar resposta.

Se houver ambiguidade, escolha a opção mais razoável e execute. Ajustes podem ser feitos depois.

## Slides

Todo arquivo de slide HTML deve ter **no mínimo 15 slides**.

## Estrutura de Unidades Curriculares

Cada subpasta dentro de `sistema/` representa uma **Unidade Curricular (UC)**. As pastas existentes são:

- `BANCO_DE_DADOS`
- `FUNDAMENTOS_DA_TECNOLOGIA_E_PROGRAMACAO`
- `INTRODUCAO_A_COMUNICACAO_ORAL_E_ESCRITA_PARA_O_MUNDO_DO_TRABALHO`
- `INTRODUCAO_A_TECNOLOGIA_DA_INFORMACAO_E_COMUNICACAO`
- `LOGICA-PROGRAMACAO`
- `TECNICO DE INFORMATICA PARA INTERNET`

## Pasta PROFESSOR

A pasta `PROFESSOR/` (dentro de `sistema/`) **NÃO é uma Unidade Curricular (matéria)**. Ela contém:
- Configurações e dados de aulas para edição pelo professor
- Trabalhos e arquivos de uso exclusivo do professor

Não aplicar a ela a estrutura obrigatória de UC (`AULAS/`, `MATERIAIS/`), nem listá-la como matéria no sistema.

### Estrutura obrigatória de cada UC

Toda UC **deve conter** as subpastas:
- `AULAS/` — aulas da unidade curricular
- `MATERIAIS/` — materiais de apoio

Se uma dessas pastas não existir ao tentar acessar a UC no sistema (`uc.html`), deve ser exibido um **alerta visual** informando quais pastas estão faltando.

Ao criar ou mencionar arquivos de uma UC, use sempre o caminho `sistema/<NOME_DA_PASTA_UC>/AULAS/` ou `sistema/<NOME_DA_PASTA_UC>/MATERIAIS/`.

## Tarefas Concluídas

- ✅ SQL executados no Supabase: `supabase-unidade.sql`, `supabase-curso-duplicar.sql`
