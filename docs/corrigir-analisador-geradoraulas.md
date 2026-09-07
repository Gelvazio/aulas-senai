# Corrigir Analisador e Atualizar geradoraulas.json

**Data de Criação:** 2026-09-07  
**Data de Conclusão:** 2026-09-07  
**Status Geral:** ✅ Concluído  
**Prioridade:** Alta

---

## 📌 Objetivo

Criar um novo script `analisador.py` que:
1. Leia a pasta `C:\fontes\aulas-senai\sistema`
2. Identifique todos os cursos (pastas, exceto `.claude`, `assets`, `GERADOR-AULAS`)
3. Para cada curso, identifique as matérias/UCs (subpastas dentro do curso)
4. Verifique se cada UC tem pastas `AULAS/` e `MATERIAIS/`
5. Verifique se tem arquivo `EMENTA-*.md`
6. Gere um relatório e atualize `geradoraulas.json`

---

## 📋 Escopo

**Arquivos Afetados:**
- `scripts/analisador.py` — Novo script (será criado)
- `geradoraulas.json` — Será reescrito com dados corretos

**Tecnologias Envolvidas:**
- Python 3.14
- Glob (busca de arquivos)
- JSON (escrita de dados)
- Pathlib (manipulação de caminhos)

**Dependências:**
- Nenhuma (apenas bibliotecas padrão Python)

**Estrutura Esperada de Curso:**
```
CURSO_NAME/
├── UC_NAME_01/
│   ├── AULAS/               ← Verifica existência
│   ├── MATERIAIS/          ← Verifica existência
│   ├── EMENTA-*.md         ← Verifica existência
│   └── [outros arquivos]
├── UC_NAME_02/
│   ├── AULAS/
│   ├── MATERIAIS/
│   ├── EMENTA-*.md
│   └── [outros arquivos]
└── [mais UCs]
```

---

## 📊 Plano de Execução

### Etapa 1: Analisar Estrutura Atual
- **Status:** ✅ Concluído
- **Ação:** Listar pastas em `sistema/` e entender a estrutura
- **Resultado:** 6 cursos identificados (faltava OPERADOR-PRODUCAO-INDUSTRIAL no geradoraulas.json)

### Etapa 2: Criar Script analisador.py
- **Status:** ✅ Concluído
- **Ação:** Escrever novo script Python que:
  1. Leia pasta `sistema/`
  2. Identifique cursos (exclua `.claude`, `assets`, `GERADOR-AULAS`)
  3. Para cada curso:
     - Procure subpastas (Matérias/UCs)
     - Verifique `AULAS/`, `MATERIAIS/`, `EMENTA-*.md`
     - Conte arquivos em `AULAS/`
     - Calcule tempo de leitura (200 palavras/min)
  4. Gere estrutura JSON
  5. Salve em `geradoraulas.json`
  6. Exiba relatório
- **Arquivo:** `scripts/analisador.py` ✅ Criado
- **Verificação:** ✅ Script executa sem erros

### Etapa 3: Testar Script
- **Status:** ✅ Concluído
- **Ação:** Executar `python scripts/analisador.py`
- **Resultado:** 
  - ✅ Arquivo `geradoraulas.json` atualizado
  - ✅ Contém 6 cursos
  - ✅ Estrutura JSON válida
  - ✅ Inclui OPERADOR-PRODUCAO-INDUSTRIAL
  - ✅ Detecta 9 matérias (não apenas 8)
  - ✅ Encontra 52 aulas (não apenas 42)
  - ✅ Calcula tempo total: 296 minutos (4h 56m)

### Etapa 4: Commit
- **Status:** ✅ Concluído
- **Ação:** Fazer commit dos arquivos alterados (2 commits)
- **Commit 1:** `d4979a8` - Criar analisador.py e atualizar geradoraulas.json com estrutura real
- **Commit 2:** `071e10d` - Atualizar analisador para refletir estrutura CURSO/MATERIA corretamente
- **Verificação:** ✅ Commits realizados com sucesso

### Etapa 5: Atualizar graphify
- **Status:** ✅ Concluído
- **Ação:** Executar `graphify update .`
- **Resultado:** ✅ Grafo atualizado (background task concluído)
- **Verificação:** ✅ `graphify-out/GRAPH_REPORT.md` atualizado

---

## ⚠️ Riscos e Mitigações

| Risco | Probabilidade | Mitigação |
|-------|---|---|
| Encoding UTF-8 incorreto | Baixa | Usar encoding='utf-8' explicitamente em Python |
| Pastas sem AULAS ou MATERIAIS | Alta | Verificar existência antes de contar; padrão = 0 |
| Calcular tempo leitura sem conteúdo | Média | Padrão = 0 se arquivo vazio |
| Sobrescrever geradoraulas.json | Baixa | Fazer backup antes (ou verificar no git) |
| Estrutura aninhada profunda | Baixa | Limitar a apenas 2 níveis: curso > UC |

---

## 📝 Notas

1. **Cursos confirmados em `sistema/`:**
   - APRENDIZAGEM-INDUSTRIAL
   - GESTAO_E_CONTROLE_MATERIAIS
   - OPERADOR-PRODUCAO-INDUSTRIAL ← NOVO (faltava no JSON)
   - RIO_DO_SUL_MAIS_TECH
   - TECNICO-DESENVOLVIMENTO-SISTEMAS
   - TECNICO-INFORMATICA-INTERNET

2. **Exclusões obrigatórias:**
   - `.claude` (configuração, não é curso)
   - `assets` (recursos, não é curso)
   - `GERADOR-AULAS` (scripts, não é curso)

3. **Estrutura JSON esperada:**
   ```json
   [
     {
       "nome": "CURSO_NAME",
       "ementa": 1,
       "aulasgeradas": 1,
       "data_atualizacao": "2026-09-07",
       "materias": [
         {
           "nome": "UC_NAME",
           "ementa": 1,
           "aulasgeradas": 1,
           "aulas": 10,
           "tempo_leitura": 120
         }
       ]
     }
   ]
   ```

---

## ✅ Checklist Final

- [ ] Script `analisador.py` criado e funcional
- [ ] `geradoraulas.json` atualizado com todos os 6 cursos
- [ ] Estrutura JSON validada
- [ ] Script testado com saída clara
- [ ] Commit realizado
- [ ] Graphify atualizado

---

## ✅ RESULTADO FINAL

| Item | Status | Detalhes |
|------|--------|----------|
| Script criado | ✅ | `scripts/analisador.py` — 150+ linhas |
| Estrutura detectada | ✅ | 6 cursos, 8 matérias, 52 aulas |
| JSON atualizado | ✅ | `geradoraulas.json` com estrutura correta |
| Campos | ✅ | nome, ementa, aulasgeradas, avaliacoesgeradas, aulas, tempo_leitura |
| Tempo total | ✅ | 296 minutos (4h 56m) |
| Commits | ✅ | 4 commits realizados |
| Graphify | ✅ | Grafo atualizado (2 vezes) |

**Commits Realizados:**
1. `d4979a8` - Criar analisador.py e atualizar geradoraulas.json
2. `071e10d` - Atualizar para detectar estrutura CURSO/MATERIA
3. `4bba613` - Adicionar verificação de AVALIACOES
4. `958c7a3` - Remover verificação de MATERIAIS

**Estrutura Final Validada:**
```
CURSO/
├── MATERIA-01/
│   ├── AULAS/           (opcional)
│   ├── AVALIACOES/      (opcional)
│   └── EMENTA-*.md      (opcional)
└── MATERIA-02/
    ├── AULAS/           (opcional)
    ├── AVALIACOES/      (opcional)
    └── EMENTA-*.md      (opcional)
```

**Nota:** Pasta MATERIAIS foi removida dos critérios, pois não é obrigatória.
