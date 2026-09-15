# -*- coding: utf-8 -*-
"""
Criar arquivos de atividades práticas seguindo padrão CONTEXTO + COMANDO
Sem alternativas - aluno executa no caderno
"""

import os

PASTA = r"C:\fontes\aulas-senai\MATERIAIS\GESTAO_E_CONTROLE_MATERIAIS\ANALISE_DADOS_APLICADA_GESTAO\AULAS-CHALKIE-AI-VERSAO-FINAL"

ATIVIDADES_PRATICAS = {
    "1-Matematica-Aplicada-a-Gestao.md": {
        "nome": "Matemática Aplicada à Gestão",
        "atividades": [
            {
                "numero": 1,
                "contexto": "Uma distribuidora de alimentos iniciou a semana com 320 unidades de um produto em estoque. Recebeu 150 unidades novas e vendeu 290 unidades durante a semana.",
                "comando": "Calcule o estoque final da semana utilizando a fórmula: Estoque Final = Estoque Inicial + Compras - Vendas"
            },
            {
                "numero": 2,
                "contexto": "Uma empresa tem saldo inicial de caixa de R$ 5.000. Durante o dia recebeu R$ 3.200 de clientes e pagou R$ 1.800 em despesas operacionais.",
                "comando": "Determine o saldo final do caixa do dia aplicando: Saldo Final = Saldo Inicial + Entradas - Saídas"
            },
            {
                "numero": 3,
                "contexto": "Um departamento de produção tem 5 operários que montam 200 unidades em um turno de 8 horas.",
                "comando": "Calcule a razão de produtividade (unidades por operário) e interprete o resultado"
            },
            {
                "numero": 4,
                "contexto": "Um produto custava R$ 200,00 e sofreu um desconto de 15% para uma promoção especial.",
                "comando": "Calcule o preço final do produto após o desconto percentual aplicado"
            },
            {
                "numero": 5,
                "contexto": "Uma empresa precisa escalar uma receita de 2 litros de suco para produzir 50 litros, mantendo as mesmas proporções de ingredientes.",
                "comando": "Use proporção (regra de três simples) para calcular quanto de cada ingrediente será necessário"
            },
            {
                "numero": 6,
                "contexto": "Um fornecedor A entrega com variação de 9 a 11 dias e outro fornecedor B entrega com variação de 3 a 19 dias.",
                "comando": "Calcule a amplitude (variação) de cada fornecedor e analise qual é mais confiável para planejamento"
            }
        ]
    },
    "2-Excel-Basico-e-Intermediario.md": {
        "nome": "Excel Básico e Intermediário para Gestão",
        "atividades": [
            {
                "numero": 1,
                "contexto": "Você precisa criar uma planilha de vendas mensais com colunas: Produto, Quantidade, Preço Unitário e Total.",
                "comando": "Abra o Excel e estruture a planilha com cabeçalhos formatados em negrito, com bordas e fundo destacado"
            },
            {
                "numero": 2,
                "contexto": "Uma loja vendeu: 10 unidades de produto A (R$ 50 cada), 5 unidades de produto B (R$ 80 cada) e 8 unidades de produto C (R$ 30 cada).",
                "comando": "Crie fórmulas para calcular o total de cada produto (Qtd × Preço) e o faturamento total com função SOMA"
            },
            {
                "numero": 3,
                "contexto": "Você tem uma lista de preços originais e precisa calcular o preço com desconto de 10% para uma promoção.",
                "comando": "Use referência absoluta ($) para manter fixa a célula de percentual enquanto copia a fórmula para toda coluna"
            },
            {
                "numero": 4,
                "contexto": "Uma empresa quer calcular bônus para vendedores: se vendeu menos de R$ 1.000, não recebe bônus; acima disso, recebe 5%.",
                "comando": "Implemente função SE para avaliar a condição e calcular o bônus de forma automática"
            },
            {
                "numero": 5,
                "contexto": "Você tem uma lista de 50 clientes com seus status (Ativo, Inativo) e quer contar quantos clientes ativos existem.",
                "comando": "Use função CONT.SE para contar células que atendem ao critério 'Ativo' na coluna de status"
            },
            {
                "numero": 6,
                "contexto": "Você precisa somar as vendas apenas dos produtos da categoria 'Eletrônicos' em uma planilha com muitos produtos.",
                "comando": "Aplique função SOMASE para somar valores onde a coluna categoria seja igual a 'Eletrônicos'"
            }
        ]
    },
    "3-Excel-Avancado-e-Visualizacao.md": {
        "nome": "Excel Avançado e Visualização de Dados",
        "atividades": [
            {
                "numero": 1,
                "contexto": "Você tem uma tabela de produtos com código, nome e preço. Precisa buscar o preço de um produto específico pelo código.",
                "comando": "Implemente função PROCV para buscar o preço baseado no código do produto"
            },
            {
                "numero": 2,
                "contexto": "Você tem duas tabelas: uma com códigos de clientes e nomes, outra com códigos de clientes e valores de compras.",
                "comando": "Use PROCV com referência absoluta para vincular os dados de ambas as tabelas mantendo a estabilidade"
            },
            {
                "numero": 3,
                "contexto": "Você tem um relatório de vendas com dados em linhas (vendedores como cabeçalhos horizontais) e precisa extrair informações.",
                "comando": "Aplique função PROCH para buscar valores em estrutura horizontal de dados"
            },
            {
                "numero": 4,
                "contexto": "Você precisa buscar um valor que está à ESQUERDA da chave (impossível com PROCV tradicional).",
                "comando": "Combine ÍNDICE e CORRESPONDÊNCIA para fazer buscas flexíveis em qualquer direção"
            },
            {
                "numero": 5,
                "contexto": "Você tem vendas de múltiplas regiões e precisa resumir por região, período e categoria de produto simultaneamente.",
                "comando": "Crie uma Tabela Dinâmica para sumarizar os dados em múltiplas dimensões e filtrar conforme necessário"
            },
            {
                "numero": 6,
                "contexto": "Você quer permitir que usuários filtrem um dashboard dinamicamente por período, região e categoria com cliques.",
                "comando": "Adicione Segmentadores (Slicers) conectados às Tabelas Dinâmicas para criar filtros visuais interativos"
            }
        ]
    },
    "4-Dashboards-Executivos.md": {
        "nome": "Dashboards Executivos e Projeto Final Integrado",
        "atividades": [
            {
                "numero": 1,
                "contexto": "Uma empresa quer criar um dashboard executivo para a diretoria que resume performance em 10 segundos.",
                "comando": "Defina quais 5 KPIs são críticos para executivos e organize-os no padrão Z (top-left = mais importante)"
            },
            {
                "numero": 2,
                "contexto": "Você está montando um dashboard com faturamento, margem, quantidade e satisfação de cliente.",
                "comando": "Escolha cores: neutra para fundo, uma cor primária para dados normais, e vermelha APENAS para metas não atingidas"
            },
            {
                "numero": 3,
                "contexto": "Seu dashboard atual tem 15 linhas de grade, sombras 3D, rótulos minúsculos e cores em arco-íris.",
                "comando": "Limpe a poluição visual: remova grades, use gráficos 2D planos, aumente fontes e reduza paleta a 3-4 cores"
            },
            {
                "numero": 4,
                "contexto": "Você tem faturamento realizado (R$ 125.500) e meta (R$ 120.000) mas o dashboard apenas mostra o número.",
                "comando": "Estruture o KPI com valor realizado, meta e variação percentual (%), adicionando status visual (✅ ou ⚠️)"
            },
            {
                "numero": 5,
                "contexto": "Você quer comparar desempenho de vendas com o mesmo período do ano passado.",
                "comando": "Calcule variação percentual: [(Valor Atual - Valor Anterior) / Valor Anterior] × 100"
            },
            {
                "numero": 6,
                "contexto": "Sua equipe tem dificuldade interpretar um dashboard com 8 gráficos diferentes sem contexto de negócio.",
                "comando": "Estruture uma narrativa com dados (storytelling) que explique o problema, a causa e a ação recomendada"
            }
        ]
    }
}

def criar_arquivo_atividades_praticas(nome_markdown, atividades_data):
    """Criar arquivo ATIVIDADE-*.md com atividades práticas em formato Contexto + Comando"""

    nome_atividade = nome_markdown.replace(".md", "")
    nome_arquivo_saida = f"ATIVIDADE-{nome_atividade}.md"

    # Preparar conteúdo
    markdown = f"# Atividades Práticas - {atividades_data['nome']}\n\n"
    markdown += f"**Baseado em:** {nome_markdown}\n\n"
    markdown += "**Formato:** Contexto + Comando (Ressolva no caderno)\n\n"
    markdown += "---\n\n"

    for atividade in atividades_data['atividades']:
        markdown += f"## Atividade {atividade['numero']}\n\n"
        markdown += f"**Contexto:** {atividade['contexto']}\n\n"
        markdown += f"**Comando:** {atividade['comando']}\n\n"
        markdown += "---\n\n"

    markdown += "## Instruções\n\n"
    markdown += "1. Leia o contexto com atenção\n"
    markdown += "2. Execute o comando de forma prática em seu caderno ou planilha\n"
    markdown += "3. Não há alternativas - você deve resolver o problema apresentado\n"
    markdown += "4. Mostre todas as etapas do seu raciocínio e cálculos\n"

    caminho_saida = os.path.join(PASTA, nome_arquivo_saida)

    with open(caminho_saida, 'w', encoding='utf-8') as f:
        f.write(markdown)

    return nome_arquivo_saida

def main():
    print("CRIAR ARQUIVOS DE ATIVIDADES PRÁTICAS (CONTEXTO + COMANDO)")
    print("=" * 80)

    for nome_md, dados in ATIVIDADES_PRATICAS.items():
        print(f"\n📋 {nome_md}")

        nome_arquivo = criar_arquivo_atividades_praticas(nome_md, dados)
        num_atividades = len(dados['atividades'])

        print(f"  ✅ Arquivo criado: {nome_arquivo}")
        print(f"     Total de atividades: {num_atividades}")

    print("\n" + "=" * 80)
    print("✅ Conclusão!")
    print(f"   Total de arquivos criados: {len(ATIVIDADES_PRATICAS)}")
    print("   Formato: Contexto + Comando (prático, sem alternativas)")

if __name__ == "__main__":
    main()
