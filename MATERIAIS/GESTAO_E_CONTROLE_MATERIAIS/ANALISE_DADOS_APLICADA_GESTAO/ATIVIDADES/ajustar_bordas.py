# -*- coding: utf-8 -*-
from docx import Document
import os
import sys

PASTA = os.path.dirname(os.path.abspath(__file__))
ARQUIVOS = [
    "AVALIACAO-01-ESTATISTICA-E-PROGRESSOES.docx",
    "AVALIACAO-02-CONCEITOS-FUNDAMENTOS-EXCEL.docx",
    "AVALIACAO-03-FUNCOES-DE-BUSCA-AVANCADAS.docx",
    "AVALIACAO-04-DESIGN-DASHBOARD-E-KPIS.docx",
]

TAMANHO_NOVO = "12"
NS = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'

def ajustar_bordas(docx_path):
    print("Processando:", os.path.basename(docx_path))
    doc = Document(docx_path)
    contador = 0

    for table in doc.tables:
        for row in table.rows:
            for cell in row.cells:
                tcPr = cell._element.tcPr
                if tcPr is not None:
                    for elem in tcPr:
                        if 'tcBorders' in elem.tag:
                            for border in elem:
                                sz_key = f'{{{NS}}}sz'
                                if sz_key in border.attrib:
                                    border.attrib[sz_key] = TAMANHO_NOVO
                                    contador += 1

    doc.save(docx_path)
    print(f"   OK - {contador} bordas ajustadas")

def main():
    print("AJUSTADOR DE BORDAS - DOCX")
    print("De 24pt para 12pt (1.5 pontos)")
    print("-" * 40)

    for arquivo in ARQUIVOS:
        caminho = os.path.join(PASTA, arquivo)
        if os.path.exists(caminho):
            try:
                ajustar_bordas(caminho)
            except Exception as e:
                print(f"   ERRO: {e}")
        else:
            print(f"   AVISO: Nao encontrado {arquivo}")

    print("-" * 40)
    print("Concluido!")

if __name__ == "__main__":
    main()
