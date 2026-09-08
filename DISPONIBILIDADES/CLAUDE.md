# 📋 CLAUDE.md — Dashboard de Resoluções SENAI

---

## 🎯 Preferências do Usuário

### ✅ Testes Manuais
- **O usuário testa as mudanças por conta própria**
- ❌ **NÃO abra o navegador automaticamente** após implementar features
- ✅ **Apenas forneça o caminho/URL** para o usuário abrir manualmente

### 🔧 Configurações Padrão do Dashboard
- **Unidade Padrão:** `SENAI/SC - Rio do Sul` (sempre selecionada)
- **Filtro Padrão:** Aplicado automaticamente ao carregar
- **Competências:** Mapeadas automaticamente para 8 cursos

---

## 📁 Arquivos Principais

| Arquivo | Descrição |
|---------|-----------|
| `dashboard-resolucoes.html` | Dashboard interativo principal |
| `dados-resolucoes.json` | Dados de resoluções (458 registros) |
| `competencias-professor.json` | Competências de Gelvazio Camargo |
| `extrator-planilha.py` | Script Python de extração de dados |

---

## 🚀 Workflow

1. **Modificar código** → editar arquivos `.html`, `.json`, `.py`
2. **Fazer commit** → `git add . && git commit -m "..."`
3. **Avisar o usuário** → fornecer caminho do arquivo
4. **Usuário testa** → abre no navegador dele e verifica

**Resumo:** Entregar, não testar.

---

## 📝 Notas Técnicas

### Dashboard Features
- ✅ Filtros: Curso, Modalidade, Unidade, Status, Competências
- ✅ Visualizações: Tabela e Cards responsivos
- ✅ Tema: Claro/Escuro com localStorage
- ✅ Indicadores: ✅ com competência, 🔍 sem competência
- ✅ Exportação: CSV com dados filtrados

### Competências Mapeadas (8 cursos)
1. `DESENVOLVIMENTO DE SISTEMAS` — Full Stack
2. `INFORMÁTICA PARA INTERNET` — Frontend
3. `PROGRAMAÇÃO DE JOGOS DIGITAIS` — Python, Java
4. `REDES DE COMPUTADORES` — APIs REST
5. `INTELIGÊNCIA ARTIFICIAL` — Python, Django
6. `PLANEJAMENTO E CONTROLE DA PRODUÇÃO` — Ágil
7. `QUALIDADE` — QA, Boas Práticas
8. `CIBERSEGURANÇA` — Segurança

---

## 🔗 Caminho para Testes

```
C:\fontes\aulas-senai\DISPONIBILIDADES\dashboard-resolucoes.html
```

Abra este arquivo no navegador para ver o dashboard.

---

**Versão:** 1.0  
**Data:** 2026-09-08  
**Status:** ✅ Ativo
