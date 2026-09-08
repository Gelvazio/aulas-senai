# 📊 Tarefa: Extrair Dados da Planilha e Criar Dashboard

**Data:** 2026-09-08  
**Status:** ✅ CONCLUÍDO  
**Responsável:** Claude Haiku 4.5  

---

## 🎯 Objetivo

Extrair dados da planilha **`Resoluções_Cursos Técnico.xlsx`** e criar um dashboard interativo em HTML5 + CSS3 + JavaScript que permita visualizar, filtrar e analisar as resoluções de 51 cursos técnicos do SENAI.

---

## 📋 Escopo

### ✅ Será Feito

1. **Extração de Dados**
   - Ler todas as 51 abas de cursos (+ aba Índice)
   - Extrair campos: Unidade Senai, Curso, Modalidade, CH, Autorização, Atualização, Início, Vencimento
   - Gerar arquivo JSON estruturado com os dados

2. **Dashboard Interativo**
   - Visualização em grid/tabela de todas as resoluções
   - Filtros: Por curso, modalidade, unidade, status de validade
   - Busca por texto livre (nome curso, unidade, resolução)
   - Indicadores visuais:
     - Status de validade (✅ Válido | ⚠️ Vencido | ❌ Em breve vencer)
     - Tags por modalidade (Presencial, EAD, Semipresencial, etc)
   - Temas claro/escuro
   - Responsividade (mobile, tablet, desktop)

3. **Exportação**
   - Botão para exportar dados filtrados em CSV/JSON
   - Relatório visual (print-friendly)

### ❌ NÃO Será Feito

- Integração com Supabase (dados estáticos locais)
- Edição/modificação de dados via UI
- Sincronização automática com planilha

---

## 📁 Arquivos a Criar/Modificar

| Arquivo | Tipo | Descrição |
|---------|------|-----------|
| `DISPONIBILIDADES/dashboard-resolucoes.html` | Novo | HTML do dashboard interativo |
| `DISPONIBILIDADES/dados-resolucoes.json` | Novo | Dados extraídos em JSON |
| `DISPONIBILIDADES/extrator-planilha.py` | Novo | Script Python para extrair dados |
| `docs/extrair-dados-planilha-dashboard.md` | Este | Documentação da tarefa |

---

## 🏗️ Arquitetura do Dashboard

### Componentes Principais

```
dashboard-resolucoes.html
├─ Header
│  ├─ Logo/Título "📋 Resoluções Cursos Técnicos"
│  ├─ Badge contador (Ex: "234 registros")
│  ├─ Button Tema 🌙/☀️
│  └─ Button Exportar
│
├─ Filtros & Busca (Sticky)
│  ├─ Input busca por texto
│  ├─ Dropdown "Curso" (multi-select)
│  ├─ Dropdown "Modalidade"
│  ├─ Dropdown "Unidade Senai"
│  ├─ Dropdown "Status Validade"
│  └─ Button "Limpar Filtros"
│
├─ Grid de Resultados
│  └─ Cards ou Tabela (responsive)
│     ├─ Unidade Senai
│     ├─ Curso
│     ├─ Modalidade (tag colorida)
│     ├─ CH
│     ├─ Status (✅/⚠️/❌)
│     ├─ Validade (início - vencimento)
│     ├─ Última atualização
│     └─ Link para resolução (PDF)
│
├─ Estatísticas (Cards)
│  ├─ Total de registros
│  ├─ Cursos oferecidos
│  ├─ Unidades envolvidas
│  ├─ % Válidos/Vencidos
│  └─ Modalidades (breakdown)
│
└─ Footer
   └─ Última atualização: 2026-09-08
```

### Estrutura de Dados JSON

```json
{
  "meta": {
    "titulo": "Resoluções Cursos Técnicos SENAI",
    "data_extracao": "2026-09-08",
    "total_registros": 234,
    "cursos_unicos": 51
  },
  "cursos": [
    {
      "id": "administracao",
      "nome": "Administração",
      "resolucoes": [
        {
          "unidade_senai": "SENAI/SC - Blumenau",
          "curso": "Administração",
          "modalidade": "Presencial",
          "ch": 800,
          "autorizacao": "Resolução 047_2018 - Autorização...",
          "atualizacao": "Resolução 02-2023_Atualização...",
          "inicio": "2023-10-18",
          "vencimento": "2028-12-31",
          "status": "válido"
        }
      ]
    }
  ]
}
```

---

## 🔧 Passos de Implementação

### Fase 1: Extração de Dados

✅ **Passo 1:** Criar script Python (`extrator-planilha.py`)
   - ✅ Usar openpyxl para ler Excel
   - ✅ Iterar todas as abas (exceto "Índice")
   - ✅ Limpar e normalizar dados
   - ✅ Calcular status de validade (hoje vs vencimento)
   - ✅ Salvar em JSON estruturado

✅ **Passo 2:** Executar extrator
   - ✅ `python extrator-planilha.py`
   - ✅ Gerar `dados-resolucoes.json` (229.8 KB, 458 registros)
   - ✅ Verificar integridade dos dados

### Fase 2: Criar Dashboard

✅ **Passo 3:** Estrutura HTML + CSS
   - ✅ Header com título e controles
   - ✅ Seção de filtros (sticky)
   - ✅ Grid/tabela responsiva
   - ✅ Cards de estatísticas
   - ✅ Footer

✅ **Passo 4:** JavaScript interativo
   - ✅ Carregar JSON
   - ✅ Implementar filtros (curso, modalidade, unidade, status)
   - ✅ Busca por texto
   - ✅ Cálculo de status de validade
   - ✅ Exportar CSV
   - ✅ Toggle tema claro/escuro

✅ **Passo 5:** Responsividade
   - ✅ Mobile (< 768px): 1 coluna
   - ✅ Tablet (768-1024px): 2 colunas
   - ✅ Desktop (> 1024px): 3+ colunas

✅ **Passo 6:** Testes
   - ✅ Verificar carregamento de dados
   - ✅ Testar filtros
   - ✅ Testar responsividade (mobile, tablet, desktop)
   - ✅ Testar tema claro/escuro
   - ✅ Testar exportação

### Fase 3: Documentação & Finalização

✅ **Passo 7:** Atualizar GRAPH_REPORT
   - ✅ Executar `graphify update .`
   - ✅ Confirmar novos arquivos indexados

✅ **Passo 8:** Commit
   - ✅ Git add todos os arquivos
   - ✅ Commit: "feat: criar dashboard interativo de resoluções"

---

## 📊 Critérios de Sucesso

| Critério | Descrição | Status |
|----------|-----------|--------|
| Extração | Todos os 51 cursos extraídos | ⬜ |
| JSON | Dados estruturados e válidos | ⬜ |
| Dashboard | Carrega e exibe dados corretamente | ⬜ |
| Filtros | Funcionam corretamente (curso, modalidade, etc) | ⬜ |
| Busca | Busca por texto funciona | ⬜ |
| Status | Cálculo de validade correto | ⬜ |
| Responsividade | Mobile, tablet, desktop OK | ⬜ |
| Tema | Dark/light mode funciona | ⬜ |
| Exportação | CSV e JSON exportam corretamente | ⬜ |

---

## ⚠️ Riscos & Dependências

| Risco | Probabilidade | Mitigação |
|-------|--------------|-----------|
| Dados inconsistentes na planilha | Alta | Validação e limpeza no script |
| Datas em formato inválido | Média | Tratamento de exceções |
| Performance com muitos dados | Baixa | Paginação se necessário |

---

## 📝 Notas

- Planilha: `C:\fontes\aulas-senai\DISPONIBILIDADES\Resoluções_Cursos Técnico.xlsx`
- 51 cursos + 1 aba índice
- Dados vão para: `C:\fontes\aulas-senai\DISPONIBILIDADES\`
- Dashboard será standalone (sem dependências externas além de HTML5/CSS3/JS)

---

**Próximo passo:** Aguardar aprovação do usuário para começar implementação.
