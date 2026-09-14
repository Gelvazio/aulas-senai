# 📋 Tarefa: Melhora de Contextos — Avaliações 03 e 04

**Data:** 2026-09-14  
**Responsável:** Claude Haiku 4.5  
**Objetivo:** Enriquecer contextos das AVALIACAO-03 e AVALIACAO-04 com situações profissionais realistas  
**Escopo:** 27 questões (13 + 14), 2 arquivos DOCX  

---

## 📊 Status Atual

| Avaliação | Status | Questões | Contexto | Paginação | Bordas |
|-----------|--------|----------|----------|-----------|--------|
| **01: Estatística** | ✅ Concluído | 12 ✅ | Distribuidora SC | ✅ OK | ✅ Visíveis |
| **02: Excel Básico** | ✅ Concluído | 12 ✅ | Loja Itajaí | ✅ OK | ✅ Visíveis |
| **03: Funções de Busca** | 🔄 Em andamento | 13 | ⏳ Simples | ✅ OK | ✅ Visíveis |
| **04: Dashboard KPIs** | 🔄 Em andamento | 14 | ⏳ Simples | ✅ OK | ✅ Visíveis |

---

## 🎯 Plano de Ação

### Passo 0: Ajustar Bordas ✅ CONCLUÍDO
✅ **Concluído** — Bordas reduzidas de 24pt para 12pt (1.5 pontos) em todos os 4 DOCX
- Commit: `a61bc4d` 
- Script: `ajustar_bordas.py`
- Status: Bordas agora mais discretas e profissionais

---

### Passo 1: Validar Contextos Propostos
🔄 **Confirmado pelo usuário** — Contextos aprovados:

**AVALIACAO-03 — Funções de Busca (PROCV, ÍNDICE, SE)**
```
Empresa: TechBrazil (e-commerce, São Paulo)
Situação: Gerente de RH precisa criar relatório de comissões mensal
Estrutura:
  - Tabela Vendedores: ID, Nome, Salário Base, Departamento
  - Tabela Faturamento: ID, Mês, Valor Faturado
  - Tabela Comissões: Faixa de Faturamento, Taxa de Comissão

Dados específicos: 5 vendedores, 3 meses de dados
Propósito: Calcular comissões com PROCV, ÍNDICE, SE aninhado
```

**AVALIACAO-04 — Dashboard KPIs (Tabelas Dinâmicas, Gráficos, Segmentadores)**
```
Empresa: MegaStore Brasil (varejo, 5 lojas em SC)
Situação: Monitorar KPIs de desempenho por mês
KPIs monitorados:
  - Faturamento (meta R$ 120.000, realizado R$ 125.500)
  - Margem bruta (meta 30%, realizado 32,5%)
  - Pedidos processados (meta 150, realizado 185)
  - Satisfação cliente (meta 8,5/10, realizado 8,7/10)

Dados: 5 regiões (Norte, Nordeste, Sul, Centro), 5 categorias produto
Propósito: Dashboard com tabelas dinâmicas + segmentadores + gráficos
```

---

### Passo 2: Localizar e Atualizar Arquivos
🔄 **Em progresso** — Quando aprovado:

| Arquivo | Ação | Status |
|---------|------|--------|
| `AVALIACAO-03.docx` | Regenerar com novo contexto | ⏳ Aguarda aprovação |
| `AVALIACAO-04.docx` | Regenerar com novo contexto | ⏳ Aguarda aprovação |
| Script Python (generator) | Atualizar contextos | ⏳ Aguarda aprovação |

---

### Passo 3: Verificação de Qualidade
⬜ **Pendente** — Após regeneração:

- [ ] Abrir cada DOCX e verificar visualmente
- [ ] Confirmar 51 questões totais (12 + 12 + 13 + 14)
- [ ] Verificar que nenhuma questão é cortada entre páginas
- [ ] Confirmar contextos fazem sentido profissional
- [ ] Validar formatação (bordas 24pt, paginação)
- [ ] Cabeçalho SENAI correto (Docente, Turma, Curso, UC)

---

### Passo 4: Commit e Finalização
⬜ **Pendente** — Último passo:

```bash
git add AVALIACAO-03.docx AVALIACAO-04.docx
git commit -m "refactor: enriquecer contextos das avaliações 03 e 04 com situações realistas"
```

---

## 📝 Próximas Ações

**Aguardando aprovação do usuário:**

1. ✅ Confirmar contextos propostos (TechBrazil + MegaStore Brasil)
2. 🤔 Sugerir contextos alternativos?
3. ⏳ Prosseguir com regeneração dos 2 últimos DOCX?

---

**Data de criação:** 2026-09-14 09:30  
**Última atualização:** 2026-09-14 09:30  
**Tempo decorrido:** —
