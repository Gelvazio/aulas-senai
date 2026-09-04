<!-- converted from Controle_Abate_Pamplona.xlsx -->

## Sheet: DASHBOARD
| CONTROLE DE ABATE DE SUÍNOS — PAMPLONA |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Presidente Getúlio / SC  |  Atualizado em: 13/08/2026 |  |  |  |  |  |  |  |  |  |  |  |
| COLONOS CADASTRADOS |  | AGENDAMENTOS ATIVOS |  | RECEBIDOS / AGUARDANDO |  | ABATIDOS HOJE |  | ABATIDOS NO MÊS |  | PESO TOTAL MÊS (kg) |  |
| SITUAÇÃO DOS LOTES — TODOS OS STATUS |  |  |  |  |  |  |  |  |  |  |  |
| STATUS |  | QTD LOTES |  | QTD ANIMAIS |  | PESO TOTAL (kg) |  |  |  |  |  |
| AGENDADO |  |  |  |  |  |  |  |  |  |  |  |
| EM TRÂNSITO |  |  |  |  |  |  |  |  |  |  |  |
| RECEBIDO |  |  |  |  |  |  |  |  |  |  |  |
| EM DESCANSO |  |  |  |  |  |  |  |  |  |  |  |
| EM ABATE |  |  |  |  |  |  |  |  |  |  |  |
| ABATIDO |  |  |  |  |  |  |  |  |  |  |  |
| CONDENADO |  |  |  |  |  |  |  |  |  |  |  |
| ⚠  Células em AMARELO são de entrada manual · Células em VERDE são calculadas automaticamente · Use as abas abaixo para registrar cada etapa |  |  |  |  |  |  |  |  |  |  |  |
## Sheet: COLONOS
| CADASTRO DE COLONOS / FORNECEDORES |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Registro de todos os produtores que fornecem suínos à unidade |  |  |  |  |  |  |  |  |  |  |  |
| ID
COLONO | NOME DO COLONO / PRODUTOR | MUNICÍPIO | LOCALIDADE / LINHA | TELEFONE | CPF / CNPJ | INSCRIÇÃO ESTADUAL | CONTRATO Nº | RAÇA PRINCIPAL | CAPACIDADE
MÉDIA (cab/lote) | OBS / CONVÊNIO |  |
| COL-001 | João Antônio Beber | Presidente Getúlio | Linha Sete | (47) 99123-4567 | 012.345.678-90 | 1234567-8 | CONT-2024-001 | Landrace/Large White | 80 | Integrado Pamplona |  |
| COL-002 | Maria dos Santos Fontana | Ibicaré | Linha Santa Maria | (49) 99876-5432 | 987.654.321-00 | 8765432-1 | CONT-2024-002 | Duroc | 120 | Integrado — parceria 5 anos |  |
| COL-003 | Pedro Grando | Presidente Getúlio | Serraria Bela | (47) 99222-1111 | 111.222.333-44 | 3334444-5 | CONT-2024-003 | PIC 337 x C22 | 60 |  |  |
## Sheet: AGENDAMENTOS
| AGENDAMENTOS — PORCOS A CHEGAR |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Registro de lotes agendados pelos colonos · Status: AGENDADO | EM TRÂNSITO | RECEBIDO | CANCELADO |  |  |  |  |  |  |  |  |  |  |  |  |
| ID
LOTE | ID
COLONO | NOME DO COLONO | MUNICÍPIO | DATA PREVISTA
CHEGADA | HORA
PREVISTA | QTD
PREVISTA | PESO MÉDIO
PREVISTO (kg) | PESO TOTAL
ESTIMADO (kg) | STATUS | MOTORISTA | PLACA
VEÍCULO | OBS / ROTA |
| LOT-2024-001 | COL-001 | João Antônio Beber | Presidente Getúlio | 2024-08-15 00:00:00 | 06:00 | 80 | 110 |  | AGENDADO | Carlos Mota | SCP-1234 | Via BR-470 · estimativa 45 min |
| LOT-2024-002 | COL-002 | Maria dos Santos Fontana | Ibicaré | 2024-08-15 00:00:00 | 08:30 | 120 | 105.5 |  | EM TRÂNSITO | Roberto Leal | SCQ-5678 | Saiu às 07:15 — rodovia liberada |
| LOT-2024-003 | COL-003 | Pedro Grando | Presidente Getúlio | 2024-08-16 00:00:00 | 07:00 | 60 | 115 |  | AGENDADO |  |  | Confirmar na véspera |
## Sheet: RECEBIMENTO
| RECEBIMENTO — PORCOS CHEGADOS NA UNIDADE |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Registro de entrada, pesagem e condições na chegada · Status: RECEBIDO | EM DESCANSO | EM ABATE | ABATIDO |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| ID
LOTE | ID
COLONO | NOME DO COLONO | DATA
CHEGADA | HORA
CHEGADA | QTD
RECEBIDA | PESO TOTAL
RECEBIDO (kg) | PESO MÉDIO
RECEB. (kg) | MOTORISTA | PLACA
VEÍCULO | TEMP.
TRANSPORTE (°C) | CONDIÇÃO
ANIMAIS (1-5) | DATA PREV.
ABATE | STATUS
ATUAL | RESP.
RECEB. | OBS / PENDÊNCIAS |
| LOT-2024-002 | COL-002 | Maria dos Santos Fontana | 2024-08-15 00:00:00 | 08:52 | 118 | 12459 |  | Roberto Leal | SCQ-5678 | 18.5 | 4 | 2024-08-15 00:00:00 | EM DESCANSO | Ana Paula | 2 animais machucados no transporte — verificar |
## Sheet: ABATE
| REGISTRO DE ABATE |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Controle diário de abate, rendimento e inspeção sanitária |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| ID
ABATE | ID
LOTE | NOME DO COLONO | DATA
ABATE | HORA
INÍCIO | HORA
FIM | QTD
ABATIDA | PESO TOTAL
CARCAÇA (kg) | REND.
CARCAÇA (%) | INSP.
SIF | STATUS
LOTE | QTD
CONDENADA | MOTIVO
CONDENAÇÃO | DESTINO
CARCAÇA | RESPONSÁVEL
ABATE | OBS |
| ABA-2024-001 | LOT-2024-001 | João Antônio Beber | 2024-08-15 00:00:00 | 13:00 | 17:30 | 78 | 8580 |  | APROVADO | ABATIDO | 2 | Lesão pulmonar | Frigorífico PG | Marcos Silva |  |
## Sheet: RELATORIO_DIARIO
| RELATÓRIO DIÁRIO DE ABATE |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Resumo automático por data — altere apenas a célula de data de referência (B5) |  |  |  |  |  |  |  |  |  |  |  |
| DATA DE REFERÊNCIA: |  |  | 2026-08-13 00:00:00 |  |  |  |  |  |  |  |  |
| ⚙  Esta aba usa a data em D4 como filtro. Altere D4 para consultar qualquer data. |  |  |  |  |  |  |  |  |  |  |  |
| 📋  Os dados são puxados automaticamente das abas AGENDAMENTOS, RECEBIMENTO e ABATE. |  |  |  |  |  |  |  |  |  |  |  |
| LOTES AGENDADOS PARA ESTA DATA |  |  |  |  |  |  |  |  |  |  |  |
| ID LOTE | COLONO | MUNICÍPIO | HORA PREV. | QTD PREV. | PESO EST. (kg) | STATUS |  |  |  |  |  |
| [Os lotes agendados para a data em D4 serão exibidos aqui automaticamente via filtro manual ou VBA] |  |  |  |  |  |  |  |  |  |  |  |
## Sheet: LEGENDA
| LEGENDA E INSTRUÇÕES DE USO |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Como preencher e interpretar cada aba da planilha |  |  |  |  |  |  |  |  |  |  |  |
| ABA | FINALIDADE | COMO USAR |  |  |  |  |  |  |  |  |  |
| DASHBOARD | Painel geral com KPIs e situação dos lotes. | Somente leitura — atualiza automaticamente. |  |  |  |  |  |  |  |  |  |
| COLONOS | Cadastro dos produtores/fornecedores. | Preencha um colono por linha. O ID (COL-XXX) será usado nas outras abas. |  |  |  |  |  |  |  |  |  |
| AGENDAMENTOS | Registro de lotes agendados para chegar. | Preencha ao agendar o colono. Atualize o STATUS conforme o lote avança. |  |  |  |  |  |  |  |  |  |
| RECEBIMENTO | Registro de lotes que chegaram na unidade. | Preencha ao receber o caminhão. Inclua pesagem e condição dos animais. |  |  |  |  |  |  |  |  |  |
| ABATE | Registro do abate e inspeção sanitária. | Preencha após o abate. Registre rendimento de carcaça e condenações. |  |  |  |  |  |  |  |  |  |
| RELATORIO_DIARIO | Resumo do dia filtrado por data. | Altere a célula D4 para consultar qualquer data. |  |  |  |  |  |  |  |  |  |
| TABELA DE STATUS — SIGNIFICADO E COR |  |  |  |  |  |  |  |  |  |  |  |
| AGENDADO | Lote agendado pelo colono, aguardando chegada. |  |  |  |  |  |  |  |  |  |  |
| EM TRÂNSITO | Caminhão a caminho da unidade. |  |  |  |  |  |  |  |  |  |  |
| RECEBIDO | Animais chegaram e foram pesados/conferidos. |  |  |  |  |  |  |  |  |  |  |
| EM DESCANSO | Animais em descanso pré-abate (dieta hídrica). |  |  |  |  |  |  |  |  |  |  |
| EM ABATE | Lote em processo de abate. |  |  |  |  |  |  |  |  |  |  |
| ABATIDO | Abate concluído, carcaças processadas. |  |  |  |  |  |  |  |  |  |  |
| CONDENADO | Animal(is) reprovado(s) na inspeção SIF. |  |  |  |  |  |  |  |  |  |  |
| SIGNIFICADO DAS CORES DE CÉLULA |  |  |  |  |  |  |  |  |  |  |  |
|      EXEMPLO | Célula de entrada manual — preencha aqui |  |  |  |  |  |  |  |  |  |  |
|      EXEMPLO | Célula calculada automaticamente — não altere |  |  |  |  |  |  |  |  |  |  |
|      EXEMPLO | Referência cruzada entre abas |  |  |  |  |  |  |  |  |  |  |