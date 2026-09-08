<!-- converted from atividade_caca_aos_bugs.docx -->



MATERIAL DE APOIO ATIVIDADE “CAÇA AOS BUGS”
### O Contexto: O Programa de "Bug Bounty"
No mundo profissional, especialmente nas "Big Techs" (como Google, Apple, Microsoft, Meta), existe uma prática chamada "Bug Bounty" (Recompensa por Bugs). As empresas convidam ativamente a comunidade de desenvolvedores e "hackers éticos" para encontrar falhas em seus sistemas.
Por que elas fazem isso? É simples: é muito mais barato e seguro pagar uma recompensa a um profissional por encontrar uma falha de forma controlada, do que deixar essa falha ser explorada por um agente malicioso, causando prejuízos de milhões.
Hoje, vocês serão nossos "Caçadores de Recompensas". A empresa do nosso "Aplicativo de Transporte" 3 liberou o pseudocódigo do novo "Módulo de Precificação Dinâmica" para o ambiente de testes. Este módulo é crítico, pois lida diretamente com o dinheiro do cliente e da empresa.
A sua missão é "caçar" o máximo de bugs (erros) neste código, documentá-los corretamente 4 e ganhar pontos para sua equipe.
### A Atividade: "War Room - Caça aos Bugs"
Objetivo: Identificar, classificar e documentar o maior número de falhas no pseudocódigo fornecido.
Regras:
As equipes analisarão o pseudocódigo durante um tempo determinado (ex: 45 minutos).
Para cada bug encontrado, a equipe deve preencher um "Relatório de Bug" simplificado (usando o Trello, Jira ou mesmo um documento de texto).
O relatório deve conter:
Título: Curto e descritivo (Ex: "Cálculo de Preço Falha com Distância Zero").
Descrição/Impacto: O que acontece e qual o problema que isso causa para o usuário ou negócio.
Classificação (Severidade): Crítico, Alto, Médio ou Baixo.
A equipe que documentar o bug primeiro, ganha os pontos por ele. Não adianta encontrar e não documentar.

### Sistema de Pontuação (Bug Bounty)
A pontuação será baseada na sua capacidade de encontrar e documentar as falhas:
+10 Pontos (Bug Encontrado): Por cada bug válido e único encontrado e documentado.
+15 Pontos (Bônus de Criticidade): Para a equipe que encontrar o bug considerado "mais crítico" pelo docente (aquele que causa mais prejuízo).
+10 Pontos (Bônus de Documentação): Para a equipe que apresentar o relatório de bug mais bem escrito e claro (decisão do docente ao final).
-5 Pontos (Falso Positivo): Se a equipe reportar algo que não é um bug, perdendo tempo de análise (no mundo real, isso custa dinheiro).
Vitória: A equipe com a maior pontuação ao final da atividade vence a "Caça aos Bugs".

### O Pseudocódigo: Módulo de Precificação Dinâmica
Analisem o código abaixo. A empresa liberou este protótipo para testes. Boa caçada!
Snippet de código
// MÓDULO: Precificação Dinâmica
// OBJETIVO: Calcular o preço final da corrida, aplicando taxas de demanda.
// MÓDULOS EXTERNOS: GPS, Pagamento, Demanda

// -- Início do Código --

FUNÇÃO calcularPrecoFinal(id_corrida, id_usuario)

// 1. Busca a distância da corrida
// O Módulo GPS retorna a distância em metros (ex: 5300)
distancia_metros = Modulo_GPS.getDistancia(id_corrida)

// 2. Converte para KM para cálculo
distancia_km = distancia_metros / 1000

// 3. Define o preço base (R$ 2,10 por KM)
preco_base = distancia_km * 2.10

// 4. Verifica a demanda na região
// O Módulo Demanda retorna um nível (BAIXA, MEDIA, ALTA)
nivel_demanda = Modulo_Demanda.getNivel(id_corrida)

// 5. Aplica taxas de demanda
SE nivel_demanda = "ALTA" ENTÃO
preco_final = preco_base * 1.8
SENÃO SE nivel_demanda = "MEDIA" ENTÃO
preco_final = preco_base * 1.3
FIM_SE

// 6. Adiciona taxa fixa de serviço
taxa_fixa = 1.50
preco_final = preco_base + taxa_fixa

// 7. Envia para o módulo de pagamento
// O Módulo Pagamento espera um valor monetário (ex: 15.75)
status_pagamento = Modulo_Pagamento.processar(id_usuario, preco_final)

RETORNE status_pagamento

FIM_FUNÇÃO

// -- Fim do Código --


| Serviço Nacional de Aprendizagem Industrial

Santa Catarina | ATIVIDADE | Desempenho |
| --- | --- | --- |
| Serviço Nacional de Aprendizagem Industrial

Santa Catarina | Data: |  |
| Serviço Nacional de Aprendizagem Industrial

Santa Catarina | Docente: |  |
| Serviço Nacional de Aprendizagem Industrial

Santa Catarina | Curso Técnico em Desenvolvimento de Sistemas |  |
| Serviço Nacional de Aprendizagem Industrial

Santa Catarina | Unidade Curricular: Testes de Sistemas |  |
| Serviço Nacional de Aprendizagem Industrial

Santa Catarina | Turma: |  |
| Serviço Nacional de Aprendizagem Industrial

Santa Catarina | Estudante: |  |