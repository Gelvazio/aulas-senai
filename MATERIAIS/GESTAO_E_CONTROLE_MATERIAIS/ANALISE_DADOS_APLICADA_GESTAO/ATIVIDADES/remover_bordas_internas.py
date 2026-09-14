# -*- coding: utf-8 -*-
"""
Remover bordas INTERNAS (insideH, insideV) das tabelas dos ITENS
Manter apenas bordas EXTERNAS muito finas (3pt)
"""

from docx import Document
from docx.oxml.ns import qn
from docx.oxml import OxmlElement
import os

PASTA = os.path.dirname(os.path.abspath(__file__))
ARQUIVOS = [
    "AVALIACAO-01-ESTATISTICA-E-PROGRESSOES.docx",
    "AVALIACAO-02-CONCEITOS-FUNDAMENTOS-EXCEL.docx",
    "AVALIACAO-03-FUNCOES-DE-BUSCA-AVANCADAS.docx",
    "AVALIACAO-04-DESIGN-DASHBOARD-E-KPIS.docx",
]

NS = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'

def remover_bordas_internas(docx_path):
    """Remove bordas internas, mantém externas"""
    print(f"Processando: {os.path.basename(docx_path)}")

    doc = Document(docx_path)
    contador_removidas = 0

    # Processar TODAS as tabelas
    for t_idx, table in enumerate(doc.tables):
        tbl = table._element
        tblPr = tbl.tblPr

        if tblPr is not None:
            tblBorders = tblPr.find(qn('w:tblBorders'))

            if tblBorders is not None:
                # REMOVER bordas internas (insideH, insideV)
                for border in list(tblBorders):
                    tag = border.tag.split('}')[-1]

                    # Se eh borda interna, remover
                    if tag in ['insideH', 'insideV']:
                        tblBorders.remove(border)
                        contador_removidas += 1
                    # Se eh borda externa, deixar fina (3pt)
                    elif tag in ['top', 'left', 'bottom', 'right']:
                        sz_key = qn('w:sz')
                        if sz_key in border.attrib:
                            border.attrib[sz_key] = '3'

    doc.save(docx_path)
    print(f"   OK - {contador_removidas} bordas internas removidas")

def main():
    print("REMOVER BORDAS INTERNAS - tblBorders")
    print("Mantém externas finas, remove insideH e insideV")
    print("-" * 50)

    for arquivo in ARQUIVOS:
        caminho = os.path.join(PASTA, arquivo)
        if os.path.exists(caminho):
            try:
                remover_bordas_internas(caminho)
            except Exception as e:
                print(f"   ERRO: {e}")

    print("-" * 50)
    print("Concluido!")

if __name__ == "__main__":
    main()
