# Corrigir Rota /novo/ — Formulário NovoSlideForm Faltante

**Data de Criação:** 05/09/2026 19:10:00  
**Status Geral:** ⬜ Planejado  
**Prioridade:** Alta — Bloqueando funcionalidade

---

## 📌 Objetivo

Corrigir o erro na rota `/novo/` que falha porque `NovoSlideForm` não existe em `forms.py`.

**Erro:**
```
Exception Value: cannot import name 'NovoSlideForm' from 'dashboard.forms'
Exception Location: dashboard/views.py, line 198, in novo_slide
```

---

## 📋 Escopo

- **Arquivos afetados:**
  - `C:\fontes\aulas-senai\GERADOR-SLIDES\dashboard\forms.py` — Criar formulário faltante
  - `C:\fontes\aulas-senai\GERADOR-SLIDES\dashboard\views.py` — Verificar e corrigir uso (linha 198)

- **Tecnologias:** Django Forms
- **Dependências:** Django 6.1
- **Objetivo:** Fazer rota `/novo/` funcionar corretamente

---

## 📊 Plano de Execução

### Etapa 1: Verificar views.py linha 198
- **Status:** ⬜ Pendente
- **Ação:** Ler `dashboard/views.py` linha 198 para ver como `NovoSlideForm` está sendo usado
- **Arquivo:** `C:\fontes\aulas-senai\GERADOR-SLIDES\dashboard\views.py`
- **Verificação:** Entender a estrutura esperada do formulário

### Etapa 2: Criar formulário NovoSlideForm
- **Status:** ⬜ Pendente
- **Ação:** Adicionar em `dashboard/forms.py` a classe `NovoSlideForm` com campos:
  - `arquivo_ementa` (FileField) — Arquivo .md, .pdf, .txt
  - `nome_uc` (CharField) — Nome da unidade curricular
  - `carga_horaria` (IntegerField) — Carga horária padrão 40h
  - `gerar_slides` (BooleanField) — Checkbox (default True)
  - `gerar_apostilas` (BooleanField) — Checkbox (default True)
  - `gerar_avaliacoes` (BooleanField) — Checkbox (default True)
  - `descricao` (CharField) — Notas adicionais (opcional)
- **Arquivo:** `C:\fontes\aulas-senai\GERADOR-SLIDES\dashboard\forms.py`
- **Verificação:** Validar que formulário está completo e sem erros de sintaxe

### Etapa 3: Corrigir import em views.py
- **Status:** ⬜ Pendente
- **Ação:** Verificar que import está correto no topo do arquivo:
  ```python
  from dashboard.forms import NovoSlideForm
  ```
- **Arquivo:** `C:\fontes\aulas-senai\GERADOR-SLIDES\dashboard\views.py`
- **Verificação:** Import existe e está visível

### Etapa 4: Testar rota
- **Status:** ⬜ Pendente
- **Ação:** Iniciar servidor Django e acessar `http://localhost:8000/gerador-aulas/nova/`
- **Verificação:** Página carrega sem erro 500

### Etapa 5: Fazer commit
- **Status:** ⬜ Pendente
- **Ação:** Commit com mensagem clara
- **Mensagem:** "Criar formulário NovoSlideForm faltante para corrigir rota /novo/"
- **Verificação:** Commit realizado com sucesso

---

## ⚠️ Riscos e Mitigações

| Risco | Probabilidade | Mitigação |
|-------|---|---|
| Campos do formulário não coincidem com views.py | Média | Ler views.py antes de criar form |
| Validação de arquivo faltando | Baixa | Adicionar validações de tipo de arquivo |
| Import circular | Baixa | Verificar imports existentes |

---

## 📝 Notas Adicionais

- O formulário deve validar: arquivo obrigatório, tamanho máximo 5MB, formatos .md/.pdf/.txt
- `carga_horaria` deve ter min=1, max=500, default=40
- Todos os checkboxes devem ter default=True
- `descricao` deve ser optional (required=False)

---

## ✅ Checklist Final

- [ ] Analisar `views.py` linha 198
- [ ] Criar `NovoSlideForm` em `forms.py`
- [ ] Verificar import em `views.py`
- [ ] Testar rota GET `/gerador-aulas/nova/`
- [ ] Commit realizado
- [ ] Rota funcionando sem erro 500

---

**Próximo passo:** Aguardar aprovação do usuário

---
