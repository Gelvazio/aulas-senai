# Criar Apostila de Comunicação Oral e Escrita - Versão Codex

**Objetivo:** Criar uma apostila didática em Word baseada integralmente na ementa da UC Introdução à Comunicação Oral e Escrita para o Mundo do Trabalho.

**Tech Stack:** Markdown, Python, python-docx e OOXML

---

## Status Geral

| Passo | Descrição | Status |
|-------|-----------|--------|
| 1 | Interpretar a ementa e definir a estrutura | ✅ Concluído |
| 2 | Criar o conteúdo didático dos 16 encontros | ✅ Concluído |
| 3 | Gerar a apostila DOCX | ✅ Concluído |
| 4 | Commit e publicação | ✅ Concluído |

---

### Passo 1: Interpretar a ementa

**Status:** ✅ Concluído

**Arquivo:** Ler `sistema/FICHA-PRODUTO-MAIS-TECH/INTRODUCAO_COMUNICACAO_ORAL_ESCRITA/Ementa_Introducao_Comunicacao_Oral_Escrita.md`

**Ação:** Preservar objetivo, capacidades, conhecimentos, percurso formativo, avaliação e referências.

```markdown
Carga horária: 33 horas; percurso: 16 encontros.
```

**Verificação:** Revisão textual estática da ementa, sem execução de testes.

---

### Passo 2: Criar o conteúdo didático

**Status:** ✅ Concluído

**Arquivo:** Criar `tmp/documentos/gerar_apostila_comunicacao.py`

**Ação:** Organizar os conteúdos em apresentação, percurso, 16 encontros, atividades, sínteses, avaliação e referências.

```python
encontros = [
    {"numero": 1, "tema": "O que é comunicação?", "ch": "2h"},
    {"numero": 16, "tema": "Revisão e apresentações finais", "ch": "3h"},
]
```

**Verificação:** Não executar testes; conferir somente a geração do arquivo solicitado.

---

### Passo 3: Gerar a apostila DOCX

**Status:** ✅ Concluído

**Arquivo:** Criar `sistema/FICHA-PRODUTO-MAIS-TECH/INTRODUCAO_COMUNICACAO_ORAL_ESCRITA/APOSTILA_Introducao_Comunicacao_Oral_Escrita_Versao_Codex.docx`

**Ação:** Aplicar o preset `compact_reference_guide`, capa `editorial_cover`, estilos Word, listas reais, tabelas com geometria fixa, cabeçalho e rodapé.

```python
doc.save(output_path)
```

**Verificação:** A validação visual e os testes não serão executados, conforme regra absoluta do projeto.

---

### Passo 4: Commit e publicação

**Status:** ✅ Concluído

**Arquivos:** documentação da tarefa e apostila DOCX.

**Ação:** Versionar e publicar no branch principal.

```powershell
git add docs/criar-apostila-comunicacao-oral-escrita-codex.md sistema/FICHA-PRODUTO-MAIS-TECH/INTRODUCAO_COMUNICACAO_ORAL_ESCRITA/APOSTILA_Introducao_Comunicacao_Oral_Escrita_Versao_Codex.docx
git commit -m "docs: criar apostila de comunicacao oral e escrita"
git push origin main
```

**Verificação:** Confirmar apenas o resultado do versionamento, sem testes.
