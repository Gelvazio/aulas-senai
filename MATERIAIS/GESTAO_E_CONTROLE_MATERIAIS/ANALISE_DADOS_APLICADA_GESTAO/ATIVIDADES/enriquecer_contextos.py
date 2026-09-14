# -*- coding: utf-8 -*-
"""
Script para enriquecer contextos das AVALIACAO-03 e AVALIACAO-04
Mantém formatação e bordas, altera apenas os textos de contexto.
"""

from docx import Document
from docx.shared import Pt, RGBColor
import os

PASTA = os.path.dirname(os.path.abspath(__file__))

CONTEXTOS_NOVOS = {
    "AVALIACAO-03": {
        "titulo": "Relatorio de Comissoes - TechBrazil",
        "subtitulo": "Empresa: TechBrazil (E-commerce, Sao Paulo)",
        "contexto": """SITUACAO PROFISSIONAL:
Voce trabalha no departamento de RH da TechBrazil, empresa de e-commerce que vende
produtos de tecnologia. Precisa criar um relatorio mensal de comissoes para 5 vendedores
utilizando dados de: ID, nome, salario base, faturamento mensal e tabela de comissoes.

DADOS DISPONIBLES:
- Tabela Vendedores: ID, Nome, Salario Base, Departamento
- Tabela Faturamento: ID, Mes, Valor Faturado (janeiro a marco)
- Tabela Comissoes: Faixas de faturamento com taxas (3%, 5%, 8%)

OBJETIVO:
Criar relatorio que busque nome e salario de cada vendedor e calcule automaticamente
sua comissao baseada no faturamento mensal, usando PROCV, INDICE/CORRESPONDENCIA e SE aninhado."""
    },

    "AVALIACAO-04": {
        "titulo": "Dashboard KPIs - MegaStore Brasil",
        "subtitulo": "Empresa: MegaStore Brasil (Rede de Varejo, Santa Catarina)",
        "contexto": """SITUACAO PROFISSIONAL:
Voce e gerente operacional da MegaStore Brasil, rede de 5 lojas de varejo em SC.
Precisa criar dashboard executivo para monitorar KPIs de desempenho mensal comparando
metas vs realizado, com segmentacao por regiao (Norte, Nordeste, Sul, Centro) e categoria.

DADOS DISPONIBLES:
- 30 registros de vendas (5 lojas x 6 meses)
- KPIs: Faturamento, Margem Bruta, Pedidos Processados, Satisfacao Cliente
- Metas: Faturamento R$ 120.000, Margem 30%, Pedidos 150, Satisfacao 8,5/10
- Realizado: Faturamento R$ 125.500, Margem 32,5%, Pedidos 185, Satisfacao 8,7/10

OBJETIVO:
Criar dashboard profissional com tabelas dinamicas, cartoes de KPI com status visual,
graficos dinamicos (coluna e barras) e segmentadores interativos conectados para
analise rapida de desempenho por regiao e categoria de produto."""
    }
}

def enriquecer_documento(docx_path, contexto_novo):
    """Enriquece contexto do documento"""
    nome_arquivo = os.path.basename(docx_path)
    print(f"Processando: {nome_arquivo}")

    doc = Document(docx_path)

    # Encontrar e atualizar paragrafos de contexto
    for i, para in enumerate(doc.paragraphs):
        texto = para.text.strip()

        # Titulo
        if "Cenario" in texto or "Empresa" in texto or "Situacao" in texto:
            if len(para.runs) > 0:
                para.clear()
                run = para.add_run(contexto_novo["subtitulo"])
                run.bold = True
                run.font.size = Pt(12)

    # Atualizar tabelas se houver
    for table in doc.tables:
        for row in table.rows:
            for cell in row.cells:
                texto = cell.text.strip()
                if "Cenario" in texto or "Empresa" in texto:
                    cell.text = contexto_novo["subtitulo"]
                elif "Situacao" in texto or len(texto) > 100:
                    if any(palavra in texto for palavra in ["Voce trabalha", "Empresa de", "Rede de"]):
                        cell.text = contexto_novo["contexto"]

    doc.save(docx_path)
    print(f"   OK - Contexto enriquecido")

def main():
    print("ENRIQUECEDOR DE CONTEXTOS - DOCX")
    print("-" * 50)

    # AVALIACAO-03
    docx_03 = os.path.join(PASTA, "AVALIACAO-03-FUNCOES-DE-BUSCA-AVANCADAS.docx")
    if os.path.exists(docx_03):
        try:
            enriquecer_documento(docx_03, CONTEXTOS_NOVOS["AVALIACAO-03"])
        except Exception as e:
            print(f"   ERRO: {e}")

    # AVALIACAO-04
    docx_04 = os.path.join(PASTA, "AVALIACAO-04-DESIGN-DASHBOARD-E-KPIS.docx")
    if os.path.exists(docx_04):
        try:
            enriquecer_documento(docx_04, CONTEXTOS_NOVOS["AVALIACAO-04"])
        except Exception as e:
            print(f"   ERRO: {e}")

    print("-" * 50)
    print("Concluido!")

if __name__ == "__main__":
    main()
