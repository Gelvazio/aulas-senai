# -*- coding: utf-8 -*-
"""
Reduzir tblBorders (bordas de tabela dos ITENS) de 24pt para 3pt
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

TAMANHO_NOVO = "3"  # 3pt = 0.375 pontos
NS = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'

def reduzir_tbl_borders(docx_path):
    """Reduz tblBorders (bordas das tabelas dos ITENS)"""
    print(f"Processando: {os.path.basename(docx_path)}")

    doc = Document(docx_path)
    contador = 0

    # Processar TODAS as tabelas
    for t_idx, table in enumerate(doc.tables):
        tbl = table._element
        tblPr = tbl.tblPr

        if tblPr is not None:
            tblBorders = tblPr.find(qn('w:tblBorders'))

            if tblBorders is not None:
                # Reduzir TODAS as bordas da tabela
                for border in tblBorders:
                    sz_key = qn('w:sz')
                    if sz_key in border.attrib:
                        sz_old = border.attrib[sz_key]
                        border.attrib[sz_key] = TAMANHO_NOVO
                        contador += 1

    doc.save(docx_path)
    print(f"   OK - {contador} bordas de tabela reduzidas para 3pt")

def main():
    print("REDUZIR BORDAS DE TABELAS (ITENS) - tblBorders")
    print("De 24pt para 3pt (minimo)")
    print("-" * 50)

    for arquivo in ARQUIVOS:
        caminho = os.path.join(PASTA, arquivo)
        if os.path.exists(caminho):
            try:
                reduzir_tbl_borders(caminho)
            except Exception as e:
                print(f"   ERRO: {e}")

    print("-" * 50)
    print("Concluido!")

if __name__ == "__main__":
    main()
