# -*- coding: utf-8 -*-
"""
Verificar quantas tabelas de gabarito existem em cada arquivo
"""

from docx import Document

PASTA = r"C:\fontes\aulas-senai\MATERIAIS\GESTAO_E_CONTROLE_MATERIAIS\ANALISE_DADOS_APLICADA_GESTAO\ATIVIDADES"

GABARITOS = [
    "GABARITO-ATIVIDADE-01-ESTATISTICA-E-PROGRESSOES.docx",
    "GABARITO-ATIVIDADE-02-CONCEITOS-FUNDAMENTOS-EXCEL.docx",
    "GABARITO-ATIVIDADE-03-FUNCOES-DE-BUSCA-AVANCADAS.docx",
    "GABARITO-ATIVIDADE-04-DESIGN-DASHBOARD-E-KPIS.docx",
]

def contar_gabaritos(docx_path):
    """Contar quantas vezes 'GABARITO COMPLETO' aparece"""

    doc = Document(docx_path)

    contador = 0

    # Procurar em todos os parágrafos
    for para in doc.paragraphs:
        if "GABARITO COMPLETO" in para.text or "GABARITO" in para.text:
            contador += 1
            print(f"  Found: {para.text[:60]}")

    return contador

def main():
    print("CONTAR TABELAS DE GABARITO")
    print("=" * 70)

    for gabarito in GABARITOS:
        caminho = f"{PASTA}\\{gabarito}"
        print(f"\n{gabarito}")
        try:
            total = contar_gabaritos(caminho)
            print(f"  Total de 'GABARITO COMPLETO': {total}")
        except Exception as e:
            print(f"  ERRO: {e}")

    print("\n" + "=" * 70)

if __name__ == "__main__":
    main()
