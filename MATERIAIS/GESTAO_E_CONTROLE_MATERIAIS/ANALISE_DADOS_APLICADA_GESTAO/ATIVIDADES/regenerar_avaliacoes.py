# -*- coding: utf-8 -*-
"""
Script para regenerar AVALIACAO-03 e AVALIACAO-04 com contextos enriquecidos.
Copia estrutura de AVALIACAO-01/02 e substitui apenas textos chave.
"""

from docx import Document
from docx.shared import Pt, RGBColor, Inches
from copy import deepcopy
import os

PASTA = os.path.dirname(os.path.abspath(__file__))

# Contextos enriquecidos
CONTEXTOS = {
    "03": {
        "empresa": "TechBrazil",
        "localizacao": "Sao Paulo",
        "situacao": "E-commerce de Tecnologia",
        "objetivo": "Relatorio de Comissoes de Vendedores",
        "descricao": """Voce trabalha no RH da TechBrazil, empresa de e-commerce em SP.
Precisa criar relatorio mensal de comissoes cruzando dados de:
- Vendedores: ID, Nome, Salario Base, Departamento
- Faturamento: ID, Mes, Valor Faturado
- Comissoes: Faixas de faturamento com taxas (3%, 5%, 8%)

Use PROCV, INDICE/CORRESPONDENCIA e SE aninhado para calcular comissoes."""
    },

    "04": {
        "empresa": "MegaStore Brasil",
        "localizacao": "Santa Catarina",
        "situacao": "Rede de Varejo",
        "objetivo": "Dashboard Executivo de KPIs",
        "descricao": """Voce e gerente operacional da MegaStore Brasil, rede de 5 lojas em SC.
Precisa criar dashboard para monitorar KPIs mensalmente:
- Faturamento: meta R$ 120.000, realizado R$ 125.500
- Margem Bruta: meta 30%, realizado 32,5%
- Pedidos: meta 150, realizado 185
- Satisfacao: meta 8,5/10, realizado 8,7/10

Segmente por regiao (Norte, Nordeste, Sul, Centro) com tabelas dinamicas."""
    }
}

def atualizar_cabecalho(doc, numero):
    """Atualiza cabecalho da avaliacao"""
    ctx = CONTEXTOS[numero]

    # Procurar celula de titulo/empresa
    if len(doc.tables) > 0:
        primeira_tabela = doc.tables[0]
        if len(primeira_tabela.rows) > 0:
            # Segunda coluna geralmente tem dados
            if len(primeira_tabela.rows[0].cells) > 1:
                celula = primeira_tabela.rows[0].cells[1]

                # Limpar e re-escrever
                for para in celula.paragraphs:
                    para.clear()

                # Adicionar novo cabecalho
                p = celula.paragraphs[0]
                run = p.add_run(f"AVALIACAO-{numero}")
                run.bold = True
                run.font.size = Pt(13)

                p2 = celula.add_paragraph()
                run2 = p2.add_run(f"{ctx['empresa']} - {ctx['localizacao']}")
                run2.font.size = Pt(11)

                p3 = celula.add_paragraph()
                run3 = p3.add_run(ctx['descricao'])
                run3.font.size = Pt(10)

def main():
    print("REGENERADOR DE AVALIACOES COM CONTEXTOS ENRIQUECIDOS")
    print("-" * 50)

    print("Atualizando AVALIACAO-03 e AVALIACAO-04...")

    # AVALIACAO-03
    docx_03 = os.path.join(PASTA, "AVALIACAO-03-FUNCOES-DE-BUSCA-AVANCADAS.docx")
    if os.path.exists(docx_03):
        try:
            doc = Document(docx_03)
            atualizar_cabecalho(doc, "03")
            doc.save(docx_03)
            print("  OK - AVALIACAO-03 atualizada")
        except Exception as e:
            print(f"  ERRO AVALIACAO-03: {e}")

    # AVALIACAO-04
    docx_04 = os.path.join(PASTA, "AVALIACAO-04-DESIGN-DASHBOARD-E-KPIS.docx")
    if os.path.exists(docx_04):
        try:
            doc = Document(docx_04)
            atualizar_cabecalho(doc, "04")
            doc.save(docx_04)
            print("  OK - AVALIACAO-04 atualizada")
        except Exception as e:
            print(f"  ERRO AVALIACAO-04: {e}")

    print("-" * 50)
    print("Concluido!")

if __name__ == "__main__":
    main()
