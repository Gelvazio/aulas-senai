# Pesquisa — Planilha Excel de Controle de Abate de Suínos
**Pamplona — Presidente Getúlio / SC**
Data: 2026-08-13

---

## Contexto

A **Pamplona Alimentos** possui unidade frigorífica em **Presidente Getúlio (SC)**. O fluxo de suínos envolve:

1. **Colonos** (produtores rurais integrados) criam os lotes nas propriedades.
2. Agendam a entrega com a Pamplona.
3. O caminhão coleta os animais e transporta até a planta.
4. Os animais chegam, são recebidos, pesados e entram em descanso.
5. Passam pelo processo de abate e inspeção do SIF (Serviço de Inspeção Federal).
6. As carcaças são processadas e destinadas.

---

## Estrutura da Planilha Proposta

### Abas criadas

| Aba | Finalidade |
|-----|------------|
| **DASHBOARD** | Painel geral com KPIs — totais por status, abatidos hoje/mês, peso total |
| **COLONOS** | Cadastro dos produtores/fornecedores (nome, município, localidade, contrato) |
| **AGENDAMENTOS** | Lotes agendados para chegar — data prevista, quantidade, status |
| **RECEBIMENTO** | Registro de chegada — pesagem, condição dos animais, motorista, placa |
| **ABATE** | Registro do abate — quantidade, peso carcaça, rendimento, inspeção SIF |
| **RELATORIO_DIARIO** | Resumo filtrado por data de referência |
| **LEGENDA** | Instruções de uso e significado das cores e status |

---

## Campos Principais

### COLONOS
- ID Colono, Nome, Município, Localidade/Linha, Telefone, CPF/CNPJ, Inscrição Estadual, Contrato Nº, Raça Principal, Capacidade média (cab/lote)

### AGENDAMENTOS (Porcos a chegar)
- ID Lote, ID Colono, Nome Colono, Município
- Data/Hora prevista de chegada
- Quantidade prevista, Peso médio previsto, Peso total estimado (calculado)
- **Status**: AGENDADO | EM TRÂNSITO | RECEBIDO | CANCELADO
- Motorista, Placa do veículo, Observações/Rota

### RECEBIMENTO
- ID Lote, ID Colono, Nome Colono
- Data/Hora real de chegada
- Quantidade recebida, Peso total recebido (kg), Peso médio (calculado)
- Motorista, Placa
- Temperatura de transporte (°C), Condição dos animais (escala 1-5)
- Data prevista de abate
- **Status**: RECEBIDO | EM DESCANSO | EM ABATE | ABATIDO | CONDENADO
- Responsável pelo recebimento, Observações/Pendências

### ABATE
- ID Abate, ID Lote, Nome Colono
- Data do abate, Hora início, Hora fim
- Quantidade abatida, Peso total carcaça (kg)
- Rendimento carcaça % (calculado)
- Inspeção SIF (APROVADO / CONDENADO PARCIAL / CONDENADO TOTAL)
- **Status do lote**: ABATIDO | CONDENADO
- Quantidade condenada, Motivo da condenação
- Destino da carcaça, Responsável pelo abate

---

## Status dos Porcos — Fluxo Completo

```
AGENDADO → EM TRÂNSITO → RECEBIDO → EM DESCANSO → EM ABATE → ABATIDO
                                                                    ↘ CONDENADO (total ou parcial)
```

| Status | Cor | Significado |
|--------|-----|-------------|
| AGENDADO | Azul | Lote agendado, aguardando chegada |
| EM TRÂNSITO | Laranja | Caminhão a caminho |
| RECEBIDO | Verde | Animais chegaram, pesados e conferidos |
| EM DESCANSO | Roxo | Descanso pré-abate (dieta hídrica obrigatória) |
| EM ABATE | Vermelho | Processo de abate em andamento |
| ABATIDO | Preto/grafite | Abate concluído, carcaças processadas |
| CONDENADO | Vermelho intenso | Reprovado na inspeção SIF |

---

## KPIs do Dashboard

- **Colonos cadastrados** — total de produtores no sistema
- **Agendamentos ativos** — lotes com status AGENDADO
- **Recebidos / Em descanso** — animais na unidade aguardando abate
- **Abatidos hoje** — soma da coluna "Qtd Abatida" com data = hoje
- **Abatidos no mês** — soma mensal
- **Peso total abatido no mês (kg)** — total de carcaças do mês

---

## Boas Práticas Operacionais

### Descanso pré-abate
- Mínimo de **3 horas** de descanso após chegada (Instrução Normativa MAPA)
- Dieta hídrica — acesso à água, sem ração
- Monitoramento de temperatura e bem-estar animal

### Rendimento de carcaça esperado
- Suínos comerciais: **72% a 78%** do peso vivo
- Peso vivo médio: **100–130 kg**
- Peso carcaça médio: **75–95 kg**

### Inspeção SIF
- Inspeção ante-mortem (antes do abate)
- Inspeção post-mortem (carcaça e vísceras)
- Motivos comuns de condenação: pneumonia, artrite, abscesso, PSE (carne pálida), hepatite

---

## Arquivo Excel Gerado

**Nome:** `Controle_Abate_Pamplona.xlsx`  
**Local:** diretório de trabalho  
**Abas:** 7 (Dashboard, Colonos, Agendamentos, Recebimento, Abate, Relatório Diário, Legenda)  
**Capacidade:** até ~300 lotes por aba (expansível)  
**Fórmulas:** automáticas (peso médio, peso total, KPIs, rendimento)  
**Cores:** amarelo = entrada manual · verde = calculado · cores por status

---

## Referências

- MAPA — Instrução Normativa SDA Nº 3/2000 (bem-estar animal no transporte e abate)
- SIF — Serviço de Inspeção Federal (MAPA) — inspeção post-mortem de suínos
- Pamplona Alimentos — Unidade Presidente Getúlio / SC
- ABCS — Associação Brasileira de Criadores de Suínos
