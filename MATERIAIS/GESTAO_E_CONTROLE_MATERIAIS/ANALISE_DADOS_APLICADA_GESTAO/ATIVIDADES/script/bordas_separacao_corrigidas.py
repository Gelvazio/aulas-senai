# -*- coding: utf-8 -*-
"""
Corrigir bordas - apenas linha fina horizontal entre CAPACIDADE e Contexto
Sem caixas vermelhas, apenas separacao limpa
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

def corrigir_bordas_separacao(docx_path):
    """Aplica apenas linha fina horizontal entre blocos"""
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
            # Remover tblBorders existente
            tblBorders = tblPr.find(qn('w:tblBorders'))
            if tblBorders is not None:
                tblPr.remove(tblBorders)

            # Criar NOVO tblBorders - apenas linha horizontal fina
            tblBorders = OxmlElement('w:tblBorders')

            # Bordas EXTERNAS - REMOVER (sem bordas externas)
            # Deixar apenas insideH

            # APENAS insideH - linha horizontal separadora FINA (3pt, preto)
            insideH = OxmlElement('w:insideH')
            insideH.set(qn('w:val'), 'single')
            insideH.set(qn('w:sz'), '3')       # 3pt = fino
            insideH.set(qn('w:space'), '0')    # sem espaco
            insideH.set(qn('w:color'), '000000')  # preto
            insideH.set(qn('w:shadow'), '0')   # sem sombra
            insideH.set(qn('w:frame'), '0')    # sem frame
            tblBorders.append(insideH)

            # NAO adicionar top, left, bottom, right (sem bordas externas)
            # NAO adicionar insideV (sem linhas verticais)

            tblPr.append(tblBorders)
            contador += 1

    doc.save(docx_path)
    print(f"   OK - {contador} tabelas com separacao corrigida")

def main():
    print("CORRIGIR BORDAS - SEPARACAO ENTRE BLOCOS")
    print("Apenas linha horizontal fina (3pt) entre CAPACIDADE e Contexto")
    print("-" * 60)

    for arquivo in ARQUIVOS:
        caminho = os.path.join(PASTA, arquivo)
        if os.path.exists(caminho):
            try:
                corrigir_bordas_separacao(caminho)
            except Exception as e:
                print(f"   ERRO: {e}")

    print("-" * 60)
    print("Concluido!")

if __name__ == "__main__":
    main()
