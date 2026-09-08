<!-- converted from avaliacao_pratica_atividade_1.docx -->



### Atividade Prática: Planejamento de Testes para Módulo Crítico (Estudo de Caso)
Contexto (Situação-Problema):
Vocês foram contratados como Analistas de Teste para uma empresa que mantém um "Aplicativo de Transporte" (semelhante ao sistema-modelo que usaremos nas Aulas 8 e 9 ). O aplicativo já está em produção e possui milhões de usuários.
O sistema atual possui dois módulos estáveis e bem definidos:
Módulo de Geolocalização (GPS): Responsável por calcular a distância da rota e o tempo estimado da viagem.
Módulo de Pagamento (Financeiro): Responsável por processar a cobrança no cartão de crédito do usuário após a corrida.
A empresa decidiu implementar uma nova funcionalidade crítica: "Precificação Dinâmica".
Descrição da Nova Funcionalidade (Precificação Dinâmica):
Um novo Módulo de Cálculo de Preço será criado. Ele deve funcionar da seguinte forma:
Regra de Negócio 1 (Preço Base): O módulo deve solicitar ao Módulo GPS a distância da rota e calcular um preço base (Ex: R$ 2,00 por km).
Regra de Negócio 2 (Multiplicador): O módulo deve verificar a demanda de corridas na região. Se a demanda for alta, ele deve aplicar um multiplicador ao preço base (Ex: Preço Base * 1.5). Esta é uma função isolada dentro do novo módulo.
Integração 1 (Envio para Pagamento): Após calcular o valor final (com ou sem multiplicador), o Módulo de Cálculo de Preço deve enviar esse valor final para o Módulo de Pagamento.
Integração 2 (Recebimento do GPS): O Módulo de Cálculo de Preço deve receber corretamente os dados de distância do Módulo GPS.



Seu Desafio:
A sua squad de desenvolvimento não vai testar o aplicativo inteiro. A sua missão é focar exclusivamente em garantir que este novo Módulo de Cálculo de Preço funcione perfeitamente e, mais importante, que ele se comunique corretamente com os módulos antigos (GPS e Pagamento) sem quebrá-los.
Vocês devem criar um Cronograma de Testes focado nesta nova implementação.
Entregável:
Um documento (pode ser uma planilha, como fizemos na Aula 4, ou um documento de texto) contendo o "Cronograma de Testes para o Módulo de Precificação Dinâmica".

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