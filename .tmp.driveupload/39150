# -*- coding: utf-8 -*-
"""
Reduzir bordas para o MINIMO - praticamente invisivel
De: 6pt → 3pt (0.375 pontos - praticamente uma linha)
"""

from docx import Document
from docx.oxml.ns import qn
import os

PASTA = os.path.dirname(os.path.abspath(__file__))
ARQUIVOS = [
    "AVALIACAO-01-ESTATISTICA-E-PROGRESSOES.docx",
    "AVALIACAO-02-CONCEITOS-FUNDAMENTOS-EXCEL.docx",
    "AVALIACAO-03-FUNCOES-DE-BUSCA-AVANCADAS.docx",
    "AVALIACAO-04-DESIGN-DASHBOARD-E-KPIS.docx",
]

TAMANHO_NOVO = "3"  # 3pt = 0.375 pontos (praticamente invisivel)
NS = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'

def reduzir_bordas_minimas(docx_path):
    """Reduz bordas para minimo"""
    print(f"Processando: {os.path.basename(docx_path)}")

    doc = Document(docx_path)
    contador = 0

    # Processar TODAS as tabelas
    for table in doc.tables:
        for row in table.rows:
            for cell in row.cells:
                tcPr = cell._element.tcPr
                if tcPr is not None:
                    # Encontrar tcBorders
                    for elem in tcPr:
                        if 'tcBorders' in elem.tag:
                            # Reduzir TODAS as bordas
                            for border in elem:
                                sz_key = f'{{{NS}}}sz'
                                if sz_key in border.attrib:
                                    border.attrib[sz_key] = TAMANHO_NOVO
                                    contador += 1

    doc.save(docx_path)
    print(f"   OK - {contador} bordas reduzidas para 3pt")

def main():
    print("BORDAS MINIMAS - 6pt para 3pt")
    print("-" * 50)

    for arquivo in ARQUIVOS:
        caminho = os.path.join(PASTA, arquivo)
        if os.path.exists(caminho):
            try:
                reduzir_bordas_minimas(caminho)
            except Exception as e:
                print(f"   ERRO: {e}")

    print("-" * 50)
    print("Concluido!")

if __name__ == "__main__":
    main()
