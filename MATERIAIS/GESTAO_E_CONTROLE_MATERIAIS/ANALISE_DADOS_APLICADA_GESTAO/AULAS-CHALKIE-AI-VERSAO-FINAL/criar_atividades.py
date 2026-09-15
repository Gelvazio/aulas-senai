# -*- coding: utf-8 -*-
"""
Criar arquivo de atividades para cada aula baseado no conteúdo dos slides
"""

import os
import re

PASTA = r"C:\fontes\aulas-senai\MATERIAIS\GESTAO_E_CONTROLE_MATERIAIS\ANALISE_DADOS_APLICADA_GESTAO\AULAS-CHALKIE-AI-VERSAO-FINAL"

ATIVIDADES_POR_AULA = {
    "1-Matematica-Aplicada-a-Gestao.md": {
        "nome": "Matemática Aplicada à Gestão",
        "atividades": [
            "Identificar e classificar dados empresariais nos conjuntos numéricos (N, Z, Q, R)",
            "Calcular o balanço final de caixa com múltiplas entradas e saídas",
            "Determinar o estoque final utilizando a fórmula EF = EI + Compras - Vendas - Perdas",
            "Calcular razões de produtividade e ticket médio entre departamentos",
            "Aplicar proporções para escalar operações mantendo margens financeiras",
            "Resolver problemas de regra de três simples em contextos logísticos",
            "Utilizar regra de três composta em cenários de produção com múltiplas variáveis",
            "Interpretar dispersão de dados para avaliar confiabilidade de fornecedores",
            "Calcular média, mediana e moda em bases gerenciais",
            "Tomar decisões gerenciais baseadas em análise de tendências estatísticas",
            "Avaliar trade-offs financeiros entre preço e consistência operacional",
            "Analisar progresso aritmético e geométrico em projeções de demanda"
        ]
    },
    "2-Excel-Basico-e-Intermediario.md": {
        "nome": "Excel Básico e Intermediário para Gestão",
        "atividades": [
            "Navegar pela interface do Excel e identificar guias, faixa de opções e caixa de nome",
            "Criar e formatar planilhas com cabeçalhos em destaque e bordas estruturadas",
            "Executar operações matemáticas básicas (+, -, *, /, ^) em fórmulas",
            "Aplicar ordem de precedência matemática corretamente em expressões complexas",
            "Usar referências relativas (A1) e absolutas ($A$1) em fórmulas expansíveis",
            "Construir fórmulas SOMA para consolidar valores de vendas e receitas",
            "Implementar fórmula MÉDIA para calcular tickets médios de vendas",
            "Usar função SE para lógica condicional simples (verdadeiro/falso)",
            "Aplicar CONT.SE para contar células que atendem critérios específicos",
            "Implementar SOMASE para somar valores sob condições múltiplas",
            "Validar dados de entrada para evitar erros operacionais",
            "Congelar painéis para facilitar navegação em planilhas grandes",
            "Formatar células como moeda, percentual e data conforme o contexto",
            "Criar gráficos básicos (colunas e linhas) para visualizar tendências"
        ]
    },
    "3-Excel-Avancado-e-Visualizacao.md": {
        "nome": "Excel Avançado e Visualização de Dados",
        "atividades": [
            "Implementar PROCV para buscar valores em tabelas de referência",
            "Usar PROCV com referências absolutas para manter tabela de consulta estável",
            "Aplicar PROCH para buscas horizontais em bases estruturadas em linhas",
            "Combinar ÍNDICE e CORRESPONDÊNCIA para buscas flexíveis em qualquer direção",
            "Anular erros de busca utilizando função SEERRO",
            "Construir lógicas condicionais aninhadas com múltiplos SE",
            "Utilizar SOMASE para somar vendas por categoria específica",
            "Implementar CONT.SE para contar ocorrências em bases gerenciais",
            "Criar Tabelas Dinâmicas para resumir dados por múltiplas dimensões",
            "Aplicar segmentadores (slicers) para filtros visuais interativos",
            "Conectar gráficos dinâmicos às Tabelas Dinâmicas para atualização automática",
            "Estruturar relatórios de vendas consolidados por região e período",
            "Analisar KPIs (faturamento, margem, quantidade) em painéis estruturados",
            "Comparar períodos (YoY, MoM) para identificar tendências de performance"
        ]
    },
    "4-Dashboards-Executivos.md": {
        "nome": "Dashboards Executivos e Projeto Final Integrado",
        "atividades": [
            "Definir público-alvo (estratégico vs operacional) para determinar granulosidade do dashboard",
            "Aplicar hierarquia visual (padrão Z/F) posicionando métricas vitais no topo esquerdo",
            "Selecionar paleta de cores corporativa com neutras, primária e de alerta",
            "Eliminar poluição visual (chartjunk) mantendo gráficos 2D e fundos limpos",
            "Definir KPIs estruturados com valor realizado, meta e tendência",
            "Calcular variação percentual para avaliar desempenho contra metas",
            "Criar cartões de KPI (scorecards) com status visual imediato",
            "Escolher tipo de gráfico apropriado para cada métrica (barra, linha, pizza)",
            "Implementar segmentadores conectados em múltiplas visualizações",
            "Testar compreensão do dashboard em menos de 10 segundos",
            "Estruturar narrativa com dados (storytelling) para guiar interpretação",
            "Integrar dados de múltiplas fontes em dashboard unificado",
            "Preparar apresentação executiva defendendo insights e recomendações",
            "Validar dashboard com público-alvo para iterar melhorias",
            "Documentar processo e decisões analíticas do projeto final"
        ]
    }
}

def criar_arquivo_atividades(nome_markdown, atividades_data):
    """Criar arquivo ATIVIDADE-*.md com lista de atividades"""

    nome_atividade = nome_markdown.replace(".md", "")
    nome_arquivo_saida = f"ATIVIDADE-{nome_atividade}.md"

    # Preparar conteúdo
    markdown = f"# Atividades - {atividades_data['nome']}\n\n"
    markdown += f"**Baseado em:** {nome_markdown}\n\n"
    markdown += "---\n\n"
    markdown += "## Lista de Atividades\n\n"

    for idx, atividade in enumerate(atividades_data['atividades'], 1):
        markdown += f"{idx}. ⬜ {atividade}\n\n"

    markdown += "---\n\n"
    markdown += "## Instruções de Uso\n\n"
    markdown += "- **⬜ Pendente:** Atividade ainda não iniciada\n"
    markdown += "- **🔄 Em progresso:** Atividade sendo executada\n"
    markdown += "- **✅ Concluído:** Atividade concluída com sucesso\n"
    markdown += "- **⛔ Bloqueado:** Aguardando conclusão de outra atividade\n\n"

    markdown += "Edite este arquivo substituindo ⬜ pelos símbolos apropriados conforme progride nas atividades.\n"

    caminho_saida = os.path.join(PASTA, nome_arquivo_saida)

    with open(caminho_saida, 'w', encoding='utf-8') as f:
        f.write(markdown)

    return nome_arquivo_saida

def main():
    print("CRIAR ARQUIVOS DE ATIVIDADES")
    print("=" * 80)

    for nome_md, dados in ATIVIDADES_POR_AULA.items():
        print(f"\n📋 {nome_md}")

        nome_arquivo = criar_arquivo_atividades(nome_md, dados)
        num_atividades = len(dados['atividades'])

        print(f"  ✅ Arquivo criado: {nome_arquivo}")
        print(f"     Total de atividades: {num_atividades}")

    print("\n" + "=" * 80)
    print("✅ Conclusão!")
    print(f"   Total de arquivos de atividades criados: {len(ATIVIDADES_POR_AULA)}")

if __name__ == "__main__":
    main()
