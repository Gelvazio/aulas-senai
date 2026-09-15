# Slide 16

**Origem:** 3-Excel-Avançado-e-Visualização-de-Dados.pptx

---

Tratamento de Erros com SEERRO

ESTRUTURAS CONDICIONAIS

Quando o PROCV não encontra uma correspondência, exibe erros desagradáveis como  ou .
A função SEERRO intercepta essas falhas e exibe uma mensagem amigável ou o número zero.

🔑

Ponto-chave
=SEERRO(PROCV(A2; D:E; 2; FALSO); "Não localizado")