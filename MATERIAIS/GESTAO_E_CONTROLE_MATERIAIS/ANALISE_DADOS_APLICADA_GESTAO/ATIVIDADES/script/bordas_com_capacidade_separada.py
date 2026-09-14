# -*- coding: utf-8 -*-
"""
Bordas externas + linha horizontal separando CAPACIDADE
"""

from docx import Document
from docx.oxml.ns import qn
from docx.oxml import OxmlElement
import os

PASTA = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ARQUIVOS = [
    "AVALIACAO-01-ESTATISTICA-E-PROGRESSOES.docx",
    "AVALIACAO-02-CONCEITOS-FUNDAMENTOS-EXCEL.docx",
    "AVALIACAO-03-FUNCOES-DE-BUSCA-AVANCADAS.docx",
    "AVALIACAO-04-DESIGN-DASHBOARD-E-KPIS.docx",
]

NS = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'

def adicionar_bordas_capacidade(docx_path):
    """Bordas externas + insideH para separar CAPACIDADE"""
    print(f"Processando: {os.path.basename(docx_path)}")

    doc = Document(docx_path)
    contador = 0

    # Processar TODAS as tabelas (exceto cabecalho 0)
    for t_idx, table in enumerate(doc.tables):
        if t_idx == 0:
            continue

        tbl = table._element
        tblPr = tbl.tblPr

        if tblPr is not None:
            # Remover tblBorders existente
            tblBorders = tblPr.find(qn('w:tblBorders'))
            if tblBorders is not None:
                tblPr.remove(tblBorders)

            # Criar novo
            tblBorders = OxmlElement('w:tblBorders')

            # Bordas externas - 3pt
            for border_name in ['top', 'left', 'bottom', 'right']:
                border = OxmlElement(f'w:{border_name}')
                border.set(qn('w:val'), 'single')
                border.set(qn('w:sz'), '3')
                border.set(qn('w:space'), '0')
                border.set(qn('w:color'), '000000')
                tblBorders.append(border)

            # insideH - linha horizontal separando CAPACIDADE - 3pt
            insideH = OxmlElement('w:insideH')
            insideH.set(qn('w:val'), 'single')
            insideH.set(qn('w:sz'), '3')
            insideH.set(qn('w:space'), '0')
            insideH.set(qn('w:color'), '000000')
            tblBorders.append(insideH)

            tblPr.append(tblBorders)
            contador += 1

    doc.save(docx_path)
    print(f"   OK - {contador} tabelas com CAPACIDADE separada")

def main():
    print("BORDAS COM CAPACIDADE SEPARADA")
    print("Externas + linha horizontal separando CAPACIDADE")
    print("-" * 60)

    for arquivo in ARQUIVOS:
        caminho = os.path.join(PASTA, arquivo)
        if os.path.exists(caminho):
            try:
                adicionar_bordas_capacidade(caminho)
            except Exception as e:
                print(f"   ERRO: {e}")

    print("-" * 60)
    print("Concluido!")

if __name__ == "__main__":
    main()
