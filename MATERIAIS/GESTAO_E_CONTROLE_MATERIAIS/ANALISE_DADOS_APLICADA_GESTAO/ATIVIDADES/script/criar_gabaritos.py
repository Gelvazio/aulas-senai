# -*- coding: utf-8 -*-
"""
Criar gabaritos a partir das avaliacoes
Copia layout e adiciona indicacao de GABARITO
"""

from docx import Document
from docx.shared import Pt, RGBColor, Inches
import os
import shutil

PASTA = os.path.dirname(os.path.abspath(__file__))

AVALIACOES = [
    {
        "original": "AVALIACAO-01-ESTATISTICA-E-PROGRESSOES.docx",
        "gabarito": "GABARITO-ATIVIDADE-01-ESTATISTICA-E-PROGRESSOES.docx",
        "titulo": "GABARITO - ESTATISTICA E PROGRESSOES"
    },
    {
        "original": "AVALIACAO-02-CONCEITOS-FUNDAMENTOS-EXCEL.docx",
        "gabarito": "GABARITO-ATIVIDADE-02-CONCEITOS-FUNDAMENTOS-EXCEL.docx",
        "titulo": "GABARITO - CONCEITOS E FUNDAMENTOS EXCEL"
    },
    {
        "original": "AVALIACAO-03-FUNCOES-DE-BUSCA-AVANCADAS.docx",
        "gabarito": "GABARITO-ATIVIDADE-03-FUNCOES-DE-BUSCA-AVANCADAS.docx",
        "titulo": "GABARITO - FUNCOES DE BUSCA AVANCADAS"
    },
    {
        "original": "AVALIACAO-04-DESIGN-DASHBOARD-E-KPIS.docx",
        "gabarito": "GABARITO-ATIVIDADE-04-DESIGN-DASHBOARD-E-KPIS.docx",
        "titulo": "GABARITO - DESIGN DE DASHBOARD E KPIS"
    },
]

def criar_gabarito(original_path, gabarito_path, titulo):
    """Cria gabarito a partir da avaliacao"""

    # Copiar arquivo
    shutil.copy(original_path, gabarito_path)

    # Abrir e modificar
    doc = Document(gabarito_path)

    # Modificar primeira tabela (cabecalho) para indicar GABARITO
    if len(doc.tables) > 0:
        tabela_header = doc.tables[0]
        if len(tabela_header.rows) > 0 and len(tabela_header.rows[0].cells) > 1:
            celula = tabela_header.rows[0].cells[1]

            # Encontrar e modificar paragrafo de AVALIACAO OBJETIVA
            for para in celula.paragraphs:
                if "AVALIACAO" in para.text.upper():
                    para.clear()
                    run = para.add_run(titulo)
                    run.bold = True
                    run.font.size = Pt(14)
                    run.font.color.rgb = RGBColor(0, 68, 132)  # Azul SENAI
                    break

    # Salvar
    doc.save(gabarito_path)
    print(f"OK - {os.path.basename(gabarito_path)}")

def main():
    print("CRIAR GABARITOS - AVALIACOES")
    print("-" * 60)

    for aval in AVALIACOES:
        orig_path = os.path.join(PASTA, aval["original"])
        gab_path = os.path.join(PASTA, aval["gabarito"])

        if os.path.exists(orig_path):
            try:
                criar_gabarito(orig_path, gab_path, aval["titulo"])
            except Exception as e:
                print(f"ERRO {aval['original']}: {e}")
        else:
            print(f"NAO ENCONTRADO: {aval['original']}")

    print("-" * 60)
    print("Concluido!")

if __name__ == "__main__":
    main()
