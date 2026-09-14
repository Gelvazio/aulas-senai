# -*- coding: utf-8 -*-
"""
Script para ajustar bordas MUITO FINAS e remover padding das células
De: 24pt (3 pontos) → Para: 6pt (0.75 ponto) + sem espaçamento interno
"""

from docx import Document
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
import os

PASTA = os.path.dirname(os.path.abspath(__file__))
ARQUIVOS = [
    "AVALIACAO-01-ESTATISTICA-E-PROGRESSOES.docx",
    "AVALIACAO-02-CONCEITOS-FUNDAMENTOS-EXCEL.docx",
    "AVALIACAO-03-FUNCOES-DE-BUSCA-AVANCADAS.docx",
    "AVALIACAO-04-DESIGN-DASHBOARD-E-KPIS.docx",
]

TAMANHO_NOVA = "6"  # 0.75 pontos (muito fino)
NS = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'

def ajustar_bordas_e_padding(docx_path):
    """Ajusta bordas MUITO finas e remove padding das células"""
    print(f"Processando: {os.path.basename(docx_path)}")

    doc = Document(docx_path)
    contador_bordas = 0
    contador_padding = 0

    # Processar todas as tabelas
    for table in doc.tables:
        for row in table.rows:
            for cell in row.cells:
                tcPr = cell._element.tcPr
                if tcPr is None:
                    tcPr = OxmlElement('w:tcPr')
                    cell._element.insert(0, tcPr)

                # === AJUSTAR BORDAS ===
                for elem in tcPr:
                    if 'tcBorders' in elem.tag:
                        for border in elem:
                            sz_key = f'{{{NS}}}sz'
                            if sz_key in border.attrib:
                                border.attrib[sz_key] = TAMANHO_NOVA
                                contador_bordas += 1

                # === REMOVER PADDING (Margens internas) ===
                # Procurar tcMar (cell margins)
                tcMar = tcPr.find(qn('w:tcMar'))
                if tcMar is not None:
                    tcPr.remove(tcMar)

                # Criar novo tcMar com margens ZERO
                tcMar = OxmlElement('w:tcMar')

                # Adicionar margens top, left, bottom, right = 0
                for margem in ['top', 'left', 'bottom', 'right']:
                    elem_mar = OxmlElement(f'w:{margem}')
                    elem_mar.set(qn('w:w'), '0')
                    elem_mar.set(qn('w:type'), 'dxa')
                    tcMar.append(elem_mar)

                tcPr.append(tcMar)
                contador_padding += 1

    # Salvar documento
    doc.save(docx_path)
    print(f"   OK - {contador_bordas} bordas finas + {contador_padding} células sem padding")

def main():
    print("AJUSTADOR DE BORDAS FINAS - DOCX")
    print("Bordas: 24pt para 6pt (muito fino)")
    print("Padding: Remove espacamento interno")
    print("-" * 50)

    for arquivo in ARQUIVOS:
        caminho = os.path.join(PASTA, arquivo)
        if os.path.exists(caminho):
            try:
                ajustar_bordas_e_padding(caminho)
            except Exception as e:
                print(f"   ERRO: {e}")
        else:
            print(f"   AVISO: Nao encontrado {arquivo}")

    print("-" * 50)
    print("Concluido!")

if __name__ == "__main__":
    main()
