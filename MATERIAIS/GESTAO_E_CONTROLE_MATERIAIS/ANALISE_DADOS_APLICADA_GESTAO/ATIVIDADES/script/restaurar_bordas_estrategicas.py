# -*- coding: utf-8 -*-
"""
Restaurar bordas HORIZONTAIS estrategicas entre CAPACIDADE e Contexto
Bordas: 3pt (finas) apenas para separacao entre blocos
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

def restaurar_bordas_estrategicas(docx_path):
    """Restaura bordas horizontais entre blocos de conteudo"""
    print(f"Processando: {os.path.basename(docx_path)}")

    doc = Document(docx_path)
    contador = 0

    # Processar TODAS as tabelas (exceto cabecalho 0)
    for t_idx, table in enumerate(doc.tables):
        if t_idx == 0:
            continue  # Pular cabecalho

        tbl = table._element
        tblPr = tbl.tblPr

        if tblPr is not None:
            tblBorders = tblPr.find(qn('w:tblBorders'))

            if tblBorders is not None:
                # Remover e recriar com apenas bordas horizontais
                tblPr.remove(tblBorders)

                # Criar novo tblBorders com apenas TOP, BOTTOM e insideH
                tblBorders = OxmlElement('w:tblBorders')

                # Borders externas - finas (3pt)
                for border_name in ['top', 'left', 'bottom', 'right']:
                    border = OxmlElement(f'w:{border_name}')
                    border.set(qn('w:val'), 'single')
                    border.set(qn('w:sz'), '3')
                    border.set(qn('w:space'), '0')
                    border.set(qn('w:color'), '000000')
                    tblBorders.append(border)

                # insideH - linha horizontal separadora FINA (3pt)
                insideH = OxmlElement('w:insideH')
                insideH.set(qn('w:val'), 'single')
                insideH.set(qn('w:sz'), '3')
                insideH.set(qn('w:space'), '0')
                insideH.set(qn('w:color'), '000000')
                tblBorders.append(insideH)

                # insideV - REMOVER (sem linhas verticais)
                # (nao adicionar insideV ao tblBorders)

                tblPr.append(tblBorders)
                contador += 1

    doc.save(docx_path)
    print(f"   OK - {contador} tabelas com bordas estrategicas restauradas")

def main():
    print("RESTAURAR BORDAS ESTRATEGICAS")
    print("Bordas horizontais entre blocos (CAPACIDADE | Contexto)")
    print("-" * 60)

    for arquivo in ARQUIVOS:
        caminho = os.path.join(PASTA, arquivo)
        if os.path.exists(caminho):
            try:
                restaurar_bordas_estrategicas(caminho)
            except Exception as e:
                print(f"   ERRO: {e}")

    print("-" * 60)
    print("Concluido!")

if __name__ == "__main__":
    main()
