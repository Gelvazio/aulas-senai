<!-- converted from Avaliacao_Prática_1_ TESI Cronograma de Testes.docx -->

e













| Serviço Nacional de Aprendizagem Industrial

Santa Catarina | AVALIAÇÃO PRÁTICA | Desempenho |
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
| CAPACIDADES DA MATRIZ DE REFERÊNCIA |
| --- |
| C8 - Selecionar procedimentos de teste que assegurem a aderência aos requisitos. |
| CAPACIDADES DO ITINERÁRIO |
| --- |
| CT 2 - Identificar possível solução para correção de falhas de acordo metodologia de teste
CT 5 - Identificar tipos, função, ferramentas e plano de teste de acordo com a programação de sistemas
CT 6 - Reconhecer normas, métodos e técnicas de testes para correção de falhas de sistema
CT 7 - Organizar o ambiente para o desenvolvimento das rotinas de testes
CT 8 - Definir roteiro de teste para execução, conforme recomendações técnicas
CS 1 - Avaliar as oportunidades de crescimento e desenvolvimento profissional, considerando o próprio potencial, as mudanças no mercado de trabalho e as necessidades de investimento na própria formação |
| CONTEXTUALIZAÇÃO |
| --- |
| Vocês foram contratados como Analistas de Teste para uma empresa que mantém um "Aplicativo de Transporte" (semelhante ao sistema-modelo que usaremos nas Aulas 8 e 9 ). O aplicativo já está em produção e possui milhões de usuários.
O sistema atual possui dois módulos estáveis e bem definidos:
Módulo de Geolocalização (GPS): Responsável por calcular a distância da rota e o tempo estimado da viagem.
Módulo de Pagamento (Financeiro): Responsável por processar a cobrança no cartão de crédito do usuário após a corrida.
A empresa decidiu implementar uma nova funcionalidade crítica: "Precificação Dinâmica".
Descrição da Nova Funcionalidade (Precificação Dinâmica):
Um novo Módulo de Cálculo de Preço será criado. Ele deve funcionar da seguinte forma:
Regra de Negócio 1 (Preço Base): O módulo deve solicitar ao Módulo GPS a distância da rota e calcular um preço base (Ex: R$ 2,00 por km).
Regra de Negócio 2 (Multiplicador): O módulo deve verificar a demanda de corridas na região. Se a demanda for alta, ele deve aplicar um multiplicador ao preço base (Ex: Preço Base * 1.5). Esta é uma função isolada dentro do novo módulo.
Integração 1 (Envio para Pagamento): Após calcular o valor final (com ou sem multiplicador), o Módulo de Cálculo de Preço deve enviar esse valor final para o Módulo de Pagamento.
Integração 2 (Recebimento do GPS): O Módulo de Cálculo de Preço deve receber corretamente os dados de distância do Módulo GPS. |
| DESAFIO |
| --- |
| A sua squad de desenvolvimento não vai testar o aplicativo inteiro. A sua missão é focar exclusivamente em garantir que este novo Módulo de Cálculo de Preço funcione perfeitamente e, mais importante, que ele se comunique corretamente com os módulos antigos (GPS e Pagamento) sem quebrá-los. |
| RESULTADOS E ENTREGAS |
| --- |
| Um documento (pode ser uma planilha ou um documento de texto) contendo o "Cronograma de Testes para o Módulo de Precificação Dinâmica". |
| LISTA DE ANEXOS |
| --- |
|  |
| LISTA DE VERIFICAÇÃO | LISTA DE VERIFICAÇÃO | LISTA DE VERIFICAÇÃO | LISTA DE VERIFICAÇÃO | LISTA DE VERIFICAÇÃO | LISTA DE VERIFICAÇÃO |
| --- | --- | --- | --- | --- | --- |
| ATIVIDADE 01: Cronograma de testes | ATIVIDADE 01: Cronograma de testes | ATIVIDADE 01: Cronograma de testes | ATIVIDADE 01: Cronograma de testes | ATIVIDADE 01: Cronograma de testes | ATIVIDADE 01: Cronograma de testes |
| CRITÉRIOS DE AVALIAÇÃO | CAPACIDADE | PESO | Escala | Escala | JUSTIFICATIVA do Não |
| CRITÉRIOS DE AVALIAÇÃO | CAPACIDADE | PESO | SIM | NÃO | JUSTIFICATIVA do Não |
| Definiu o cronograma e especificou quais tipos de testes serão executados ? | CT 8 |  |  |  |  |
| Propôs testes de integração para validar a comunicação entre dois ou mais módulos ou componentes ? | CT 8 |  |  |  |  |
| Planejou testes unitários a regras de negócio ou funções pequenas e isoladas ? | CT 8 |  |  |  |  |
| Apontou a causa provável para falhas detectadas no cálculo do multiplicador de demanda? | CT 2 |  |  |  |  |
| Descreveu a solução de contorno para erros na integração do sinal de GPS com base na metodologia de teste adotada? |  |  |  |  |  |
|  |  |  |  |  |  |