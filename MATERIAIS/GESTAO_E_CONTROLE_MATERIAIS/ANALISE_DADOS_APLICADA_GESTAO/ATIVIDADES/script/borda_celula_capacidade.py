# -*- coding: utf-8 -*-
"""
Adicionar borda BOTTOM na celula de CAPACIDADE
Linha separadora em nivel de celula, nao de tabela
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

def adicionar_borda_celula(docx_path):
    """Adiciona borda BOTTOM na celula de CAPACIDADE"""
    print(f"Processando: {os.path.basename(docx_path)}")

    doc = Document(docx_path)
    contador = 0

    # Processar TODAS as tabelas (exceto cabecalho 0)
    for t_idx, table in enumerate(doc.tables):
        if t_idx == 0:
            continue

        # Acessar primeira linha (CAPACIDADE)
        if len(table.rows) > 0:
            primeira_linha = table.rows[0]

            # Iterar celulas da primeira linha
            for cell in primeira_linha.cells:
                tcPr = cell._element.tcPr
                if tcPr is None:
                    tcPr = OxmlElement('w:tcPr')
                    cell._element.insert(0, tcPr)

                # Remover tcBorders existente
                tcBorders = tcPr.find(qn('w:tcBorders'))
                if tcBorders is not None:
                    tcPr.remove(tcBorders)

                # Criar novo tcBorders com apenas BOTTOM
                tcBorders = OxmlElement('w:tcBorders')

                # Adicionar APENAS bottom - linha separadora
                bottom = OxmlElement('w:bottom')
                bottom.set(qn('w:val'), 'single')
                bottom.set(qn('w:sz'), '3')       # 3pt
                bottom.set(qn('w:space'), '0')
                bottom.set(qn('w:color'), '000000')  # preto
                tcBorders.append(bottom)

                tcPr.append(tcBorders)
                contador += 1

    doc.save(docx_path)
    print(f"   OK - {contador} celulas com borda bottom adicionada")

def main():
    print("ADICIONAR BORDA BOTTOM EM CAPACIDADE")
    print("Linha separadora em nivel de celula")
    print("-" * 60)

    for arquivo in ARQUIVOS:
        caminho = os.path.join(PASTA, arquivo)
        if os.path.exists(caminho):
            try:
                adicionar_borda_celula(caminho)
            except Exception as e:
                print(f"   ERRO: {e}")

    print("-" * 60)
    print("Concluido!")

if __name__ == "__main__":
    main()
