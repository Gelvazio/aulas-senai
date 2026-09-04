# Adicionar Correção Automática à Prova Simples de TIC

**Objetivo:** Implementar correção híbrida para a prova prática em equipes, com 7 pontos automáticos e 3 pontos atribuídos pelo docente.

**Tech Stack:** Google Apps Script, Google Forms, Google Drive, Google Docs, Google Sheets, Google Slides, Python, python-docx

---

## Status Geral

| Passo | Descrição | Status |
|-------|-----------|--------|
| 1 | Atualizar as regras da prova para arquivos nativos e entrega por formulário | ✅ Concluído |
| 2 | Criar o formulário e o corretor automático | ✅ Concluído |
| 3 | Criar gabarito técnico e instruções de instalação | ✅ Concluído |
| 4 | Registrar a restrição de testes e validações | ✅ Concluído |
| 5 | Commit e publicação | ✅ Concluído |

---

### Passo 1: Atualizar a prova

**Status:** ✅ Concluído

**Arquivos:** Modificar `C:\fontes\professor-senai\scripts\criar_prova_simples_uc1_tic_equipes.py` e gerar novamente `C:\fontes\professor-senai\sistema\INTRODUCAO_A_TECNOLOGIA_DA_INFORMACAO_E_COMUNICACAO\AVALIACOES_CRIADAS\PROVA_SIMPLES_UC1_TIC_EQUIPES_2H.docx`.

**Ação:** Exigir Google Docs, Sheets e Slides nativos, padronizar a planilha e explicar a divisão da nota.

---

### Passo 2: Criar o corretor

**Status:** ✅ Concluído

**Arquivo:** Criar `C:\fontes\professor-senai\sistema\INTRODUCAO_A_TECNOLOGIA_DA_INFORMACAO_E_COMUNICACAO\AVALIACOES_CRIADAS\CORRETOR_AUTOMATICO_PROVA_SIMPLES_UC1_TIC.gs`.

**Ação:** Criar formulário, planilha de resultados, gatilho de envio, verificações determinísticas e cálculo de nota.

---

### Passo 3: Documentar o uso

**Status:** ✅ Concluído

**Arquivos:** Criar instruções de instalação e gabarito técnico na pasta `AVALIACOES_CRIADAS`.

**Ação:** Explicar instalação, permissões, critérios automáticos, critérios docentes e interpretação do relatório.

---

### Passo 4: Respeitar a restrição de validação

**Status:** ✅ Concluído

**Verificação:** Não executar o Apps Script, não abrir ou renderizar o DOCX e não iniciar serviços, conforme proibição absoluta do projeto.

---

### Passo 5: Commit e publicação

**Status:** ✅ Concluído

**Ação:** Versionar somente os arquivos desta tarefa e publicar no branch `main`.
