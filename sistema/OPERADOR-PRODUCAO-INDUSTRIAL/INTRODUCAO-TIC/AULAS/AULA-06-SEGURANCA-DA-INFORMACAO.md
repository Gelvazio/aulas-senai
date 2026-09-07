# AULA 06 — Segurança da Informação

**Programa:** Educação para o Trabalho — SENAI
**UC:** Introdução à Tecnologia da Informação e Comunicação
**Duração:** 4 horas presenciais
**Ambiente:** Laboratório de informática
**Data:** ___/___/______

---

## Objetivos de Aprendizagem

Ao final desta aula, o aluno será capaz de:
- Explicar os pilares da segurança da informação e aplicá-los a situações de trabalho;
- Reconhecer a existência de legislação sobre proteção de dados e seus reflexos práticos;
- Identificar os principais golpes aplicados na internet e as pistas que os denunciam;
- Criar e gerenciar senhas fortes e ativar a verificação em duas etapas;
- Adotar práticas de navegação segura;
- Planejar e executar uma rotina de backup segundo a regra 3-2-1;
- Identificar tipos de códigos maliciosos (malware) e as medidas de prevenção e resposta.

> **Cobertura da ementa:** item 4.2 (pilares da segurança da informação, leis vigentes, tipos
> de golpes na internet, contas e senhas, navegação segura, backup e códigos maliciosos) e
> capacidade 3.2.
> Conforme orientação da ementa, a enumeração de pilares específicos e de diplomas legais é
> **detalhamento didático**; o professor deve **verificar a vigência** das normas citadas
> antes da aula.

---

## Conteúdo Programático

### 1. Abertura: "O que eu perderia hoje?" (20 min)

Cada aluno lista em um papel três informações digitais que, se fossem perdidas ou expostas
hoje, causariam maior prejuízo (fotos, documentos, senha do banco, dados de clientes,
conversas de trabalho). A turma agrupa as respostas em: **perder**, **vazar** e
**ficar sem acesso** — que são exatamente os três pilares a seguir.

### 2. Os Pilares da Segurança da Informação (40 min)

**Tríade clássica (CID):**

| Pilar | Significa | Exemplo de violação |
|---|---|---|
| **Confidencialidade** | Só quem tem direito acessa a informação | Lista de clientes enviada a terceiros |
| **Integridade** | A informação não é alterada indevidamente | Alteração de valores em uma planilha de estoque |
| **Disponibilidade** | A informação está acessível quando necessária | Sistema fora do ar durante o fechamento |

**Pilares complementares frequentemente citados:**
- **Autenticidade:** garantir que a informação vem de quem diz ter enviado.
- **Irretratabilidade (não repúdio):** o autor não pode negar que praticou o ato.
- **Legalidade:** conformidade com a legislação aplicável.

**Aplicação prática na indústria:**
> Um procedimento operacional alterado por alguém sem autorização fere a **integridade** e
> pode gerar acidente. Uma senha compartilhada fere a **confidencialidade** e destrói a
> **irretratabilidade** — não se sabe mais quem fez o quê.

### 3. Legislação Aplicável (25 min)

> ⚠️ **Verificação obrigatória:** o professor deve confirmar a vigência e a redação atual das
> normas antes de apresentá-las. A ementa cita "leis vigentes" sem enumerá-las.

Referências comumente tratadas no Brasil:

| Norma | Tema central | Reflexo no dia a dia |
|---|---|---|
| **LGPD — Lei 13.709/2018** | Proteção de dados pessoais | Só coletar o dado necessário; informar a finalidade; proteger o que se coleta |
| **Marco Civil da Internet — Lei 12.965/2014** | Direitos e deveres na internet | Privacidade das comunicações e guarda de registros |
| **Lei 12.737/2012** | Invasão de dispositivo informático | Acessar conta alheia é crime, mesmo "só para ver" |
| **Código Penal (arts. sobre estelionato eletrônico)** | Fraudes | Golpes financeiros aplicados por meio digital |

**Conceitos da LGPD úteis ao trabalhador:**
- **Dado pessoal:** qualquer informação que identifique alguém (nome, CPF, e-mail, foto).
- **Dado sensível:** saúde, biometria, religião, opinião política, origem racial.
- **Titular:** a pessoa a quem o dado se refere.
- **Finalidade:** o dado só pode ser usado para o fim informado.
- **Minimização:** coletar apenas o necessário.

**Situação típica:** enviar uma planilha com CPF de clientes para o e-mail pessoal
"para adiantar o trabalho em casa" é uma exposição indevida de dados — mesmo sem má-fé.

### 4. Tipos de Golpes na Internet (40 min)

| Golpe | Como funciona | Pista que denuncia |
|---|---|---|
| **Phishing** | E-mail ou site falso que imita instituição conhecida | Endereço estranho, erro de português, urgência |
| **Smishing / Vishing** | Golpe por SMS ou ligação telefônica | Pedido de código, pressão para agir agora |
| **Engenharia social** | Manipulação da pessoa, não do sistema | Alguém "do TI" pedindo sua senha |
| **Falso suporte técnico** | Contato alegando problema no computador | Pedido de acesso remoto não solicitado |
| **Golpe do falso boleto/PIX** | Boleto ou chave alterada em documento | Dados divergentes do fornecedor habitual |
| **Perfil falso / clonagem** | Contato de conhecido pedindo dinheiro | Pedido inesperado; conferir por outro canal |
| **Golpe do emprego/curso falso** | Vaga que cobra taxa antecipada | Cobrança para "reservar a vaga" |
| **Falsa promoção** | Link com desconto irreal | Domínio parecido, mas diferente do oficial |

**Regra de ouro contra golpes:**
> **Urgência + pedido de dado ou dinheiro = pare.** Confirme por um canal que **você**
> procure (telefone do site oficial, presencialmente, ramal conhecido) — nunca pelo contato
> que veio na mensagem suspeita.

**Como examinar um link antes de clicar:**
1. Passar o mouse sobre ele e ler o endereço real que aparece;
2. Conferir o domínio completo (`banco.com.br` é diferente de `banco.seguro-app.net`);
3. Desconfiar de encurtadores em mensagens não solicitadas;
4. Na dúvida, digitar o endereço oficial manualmente no navegador.

### 5. Contas e Senhas (35 min)

**O que torna uma senha forte:**
- **Comprimento** acima de 12 caracteres (é o fator mais relevante);
- Combinação de letras maiúsculas, minúsculas, números e símbolos;
- Ausência de dados pessoais (nome, data de nascimento, placa, time);
- **Exclusividade:** uma senha diferente para cada serviço.

**Técnica da frase-senha:** pense em uma frase e derive dela.
`Meu primeiro emprego foi em 2019 na oficina!` → `Mpefe2019nO!`

**Práticas obrigatórias:**
- **Verificação em duas etapas (2FA):** senha + código do aplicativo autenticador ou SMS.
  É a proteção mais eficaz contra vazamento de senha.
- **Gerenciador de senhas:** guarda todas com segurança; você memoriza apenas a senha mestra.
- **Nunca compartilhar** a senha — nem com colega, nem com o "TI" por mensagem.
- **Trocar imediatamente** se houver suspeita de vazamento.
- **Sair da conta (logout)** em computador compartilhado.

**Alerta:**
> Nenhuma instituição séria pede senha, código de verificação ou dados completos de cartão
> por e-mail, telefone ou mensagem. Se pediram, é golpe.

### 6. Navegação Segura (25 min)

Checklist prático:
1. Verificar `https` e o domínio correto antes de digitar dados;
2. Manter navegador e sistema **atualizados** (as atualizações corrigem falhas);
3. Não instalar extensões desconhecidas;
4. Evitar dados sensíveis em **Wi-Fi público**; se necessário, usar VPN corporativa;
5. Não salvar senhas em computadores compartilhados;
6. Fechar sessões ao terminar;
7. Recusar cookies não essenciais quando houver a opção;
8. Desconfiar de downloads oferecidos por anúncios e pop-ups.

### 7. Backup (30 min)

**Definição:** cópia de segurança de dados, guardada em local distinto do original, que
permite restaurar a informação após perda, falha, roubo ou ataque.

**Regra 3-2-1:**
- **3** cópias dos dados (a original e mais duas);
- **2** tipos de mídia diferentes (ex.: disco interno + HD externo/nuvem);
- **1** cópia fora do local físico (nuvem ou mídia guardada em outro endereço).

**Tipos de backup:**

| Tipo | O que copia | Vantagem | Desvantagem |
|---|---|---|---|
| **Completo (full)** | Todos os dados | Restauração simples | Demora e ocupa mais espaço |
| **Incremental** | Só o que mudou desde o último backup | Rápido e econômico | Restauração depende de toda a sequência |
| **Diferencial** | Tudo o que mudou desde o último completo | Restauração mais simples | Cresce a cada dia |

**Regras práticas:**
- Definir **periodicidade** conforme a criticidade (diária, semanal, mensal);
- **Testar a restauração** — backup nunca testado não é backup;
- Manter uma cópia **desconectada** (proteção contra ransomware);
- Documentar o que é copiado, para onde e quem é o responsável.

### 8. Códigos Maliciosos (Malware) (30 min)

| Tipo | O que faz |
|---|---|
| **Vírus** | Infecta arquivos e se espalha quando o arquivo é executado |
| **Worm** | Propaga-se sozinho pela rede, sem ação do usuário |
| **Trojan (cavalo de troia)** | Disfarça-se de programa útil e abre acesso ao invasor |
| **Ransomware** | Criptografa os arquivos e exige resgate |
| **Spyware** | Espiona a atividade do usuário |
| **Keylogger** | Registra tudo o que é digitado, inclusive senhas |
| **Adware** | Exibe anúncios de forma abusiva |
| **Botnet** | Transforma o equipamento em "zumbi" controlado remotamente |

**Como o malware entra:** anexo de e-mail, pen drive infectado, download pirata,
site comprometido, software desatualizado, extensão maliciosa.

**Prevenção:**
- Antivírus ativo e atualizado;
- Sistema e programas atualizados;
- Não executar anexos e instaladores de origem duvidosa;
- Verificar pen drives antes de abrir;
- Backup em dia (é a única defesa real contra ransomware);
- Não usar conta de administrador para tarefas do dia a dia.

**Se houver suspeita de infecção no trabalho:**
1. Desconectar o equipamento da rede (cabo e Wi-Fi);
2. **Não** desligar sem orientação (pode apagar evidências);
3. Comunicar imediatamente o responsável de TI e a chefia;
4. Não pagar resgate;
5. Registrar o ocorrido (aqui entra o relatório da Aula 04).

---

## Estratégias de Ensino

1. **Partir do prejuízo pessoal** para chegar ao conceito de pilar.
2. **Análise forense de e-mails falsos** projetados na tela.
3. **Demonstração ao vivo** de configuração de 2FA e de teste de força de senha.
4. **Simulação de incidente** com tomada de decisão em grupo.

---

## Atividades Práticas

### Atividade 1 (desplugada): "Caça ao Golpe" (40 min)

**Objetivo:** identificar indícios de fraude em mensagens reais.

**Procedimento:**
1. Cada grupo de 4 recebe 6 mensagens impressas (e-mails, SMS e prints de mensagens),
   sendo algumas legítimas e outras fraudulentas.
2. Para cada mensagem, o grupo preenche a ficha: **legítima ou golpe?**, quais indícios
   sustentam a conclusão, qual seria a ação correta.
3. Cada grupo apresenta a mensagem que considerou mais perigosa e explica o motivo.
4. O professor revela o gabarito e discute os casos em que a turma se dividiu.
5. Fechamento: a turma constrói coletivamente um cartaz com **10 sinais de alerta**.

**Materiais:** conjunto de mensagens impressas, ficha de análise, cartolina.

### Atividade 2 (prática): "Blindando Minha Conta e Meus Dados" (50 min)

**Objetivo:** aplicar senhas fortes, 2FA e rotina de backup.

**Procedimento — cada aluno no seu computador:**
1. Criar três senhas fortes pela técnica da frase-senha e testá-las em um verificador de
   força de senha (sem usar senhas reais no teste);
2. Ativar a **verificação em duas etapas** na conta de e-mail usada em aula
   (ou simular o processo com o professor, se a conta for institucional);
3. Revisar as permissões dos arquivos compartilhados na Aula 05 e **remover** os
   compartilhamentos abertos que não forem necessários;
4. Montar um **plano de backup pessoal 3-2-1** em uma ficha: o que copiar, para onde,
   com que frequência, e quem é o responsável;
5. Executar o backup da pasta `SENAI-TIC`: compactar (técnica da Aula 02), copiar para o
   pen drive e enviar uma cópia para a nuvem;
6. **Testar a restauração:** extrair o backup em uma pasta `TESTE-RESTAURACAO` e conferir
   se todos os arquivos estão íntegros;
7. Registrar em uma linha o resultado do teste: data, o que foi restaurado, se funcionou.

**Entrega:** ficha do plano de backup preenchida e comprovação do teste de restauração.

**Materiais:** computador com internet, pen drive, ficha do plano de backup.

---

## Recursos Necessários

- Laboratório com internet e um computador por aluno;
- Conjunto impresso de mensagens legítimas e fraudulentas;
- Pen drives;
- Projetor multimídia, cartolina e canetões;
- Ficha do plano de backup 3-2-1.

---

## Avaliação Formativa

**Observação durante as atividades:**
- O aluno relaciona um incidente ao pilar violado?
- Identifica indícios de golpe sem depender do gabarito?
- Constrói senha forte sem usar dado pessoal?
- Elabora um plano de backup coerente e executável?
- Testa a restauração em vez de apenas copiar os arquivos?

**Perguntas de verificação:**
1. Cite os três pilares clássicos e dê um exemplo de violação de cada um.
2. O que a LGPD entende por dado pessoal e por dado sensível?
3. Quais três indícios mais comuns denunciam um phishing?
4. O que é verificação em duas etapas e por que ela protege mesmo se a senha vazar?
5. Explique a regra 3-2-1 de backup.
6. Qual a diferença entre vírus, worm e ransomware?
7. O que fazer, na ordem correta, ao suspeitar de infecção no computador do trabalho?

---

## Tarefa de Casa

**Projeto:** "Diagnóstico de segurança pessoal"
- Listar as 5 contas digitais mais importantes que você possui;
- Para cada uma, indicar: a senha é exclusiva? tem 2FA ativado? há backup dos dados?
- Definir **duas ações** de melhoria com prazo para as próximas duas semanas;
- Registrar em documento de texto (será formatado na Aula 07).

**Tempo estimado:** 30 min

---

## Observações do Professor

_Espaço para anotações: relatos de golpes trazidos pelos alunos, dificuldades na ativação do
2FA, casos que merecem retomada nas próximas aulas._

---

**Próxima aula:** AULA 07 — Editor de Textos: formatação, tabelas, imagens e impressão
