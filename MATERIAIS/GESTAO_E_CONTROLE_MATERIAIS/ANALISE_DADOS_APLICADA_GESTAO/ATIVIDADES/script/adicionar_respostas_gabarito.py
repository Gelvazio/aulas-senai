# -*- coding: utf-8 -*-
"""
Adicionar respostas aos gabaritos
- Marca cada resposta correta com ✅
- Adiciona tabela de gabarito no final
"""

from docx import Document
from docx.shared import Pt, RGBColor, Inches
from docx.enum.text import WD_ALIGN_PARAGRAPH
import re

PASTA = r"C:\fontes\aulas-senai\MATERIAIS\GESTAO_E_CONTROLE_MATERIAIS\ANALISE_DADOS_APLICADA_GESTAO\ATIVIDADES"

# Gabaritos extraidos
GABARITOS = {
    "GABARITO-ATIVIDADE-01-ESTATISTICA-E-PROGRESSOES.docx": "E A E E A A A A A A A A",
    "GABARITO-ATIVIDADE-02-CONCEITOS-FUNDAMENTOS-EXCEL.docx": "E A A A E A A A A A A A",
    "GABARITO-ATIVIDADE-03-FUNCOES-DE-BUSCA-AVANCADAS.docx": "A A A A A A A A A A A A A",
    "GABARITO-ATIVIDADE-04-DESIGN-DASHBOARD-E-KPIS.docx": "A A A A A A A A A A A A A A",
}

def adicionar_respostas(docx_path, respostas_str):
    """Adiciona respostas aos gabaritos"""

    respostas = respostas_str.strip().split()
    doc = Document(docx_path)

    questao_num = 0

    # Processar cada tabela (questao)
    for t_idx, table in enumerate(doc.tables):
        if t_idx == 0:
            continue

        questao_num += 1

        if questao_num <= len(respostas):
            resposta_correta = respostas[questao_num - 1]

            # Procurar na tabela por "Alternativas:" ou "a)"
            for row in table.rows:
                for cell in row.cells:
                    texto = cell.text

                    # Se encontrou alternativas, adicionar marca
                    if "Alternativas:" in texto or "a)" in texto:
                        # Adicionar marca de resposta correta
                        for para in cell.paragraphs:
                            if resposta_correta.lower() in para.text.lower():
                                # Adicionar apenas checkmark (sem texto extra)
                                run = para.add_run(f"  ✅")
                                run.font.color.rgb = RGBColor(0, 128, 0)  # Verde
                                run.bold = True

    # Adicionar tabela de gabarito no final
    doc.add_paragraph()  # Espacamento

    # Titulo
    titulo = doc.add_paragraph("GABARITO COMPLETO")
    titulo.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
    titulo_run = titulo.runs[0]
    titulo_run.bold = True
    titulo_run.font.size = Pt(14)

    # Tabela de gabarito
    tabela_gab = doc.add_table(rows=2, cols=len(respostas))
    tabela_gab.style = 'Light Grid Accent 1'

    # Header
    for i, resp in enumerate(respostas):
        celula = tabela_gab.rows[0].cells[i]
        celula.text = f"Q{i+1}"
        for para in celula.paragraphs:
            para.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER

    # Respostas
    for i, resp in enumerate(respostas):
        celula = tabela_gab.rows[1].cells[i]
        celula.text = resp.upper()
        for para in celula.paragraphs:
            para.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
            para.runs[0].bold = True
            para.runs[0].font.color.rgb = RGBColor(0, 128, 0)  # Verde

    doc.save(docx_path)
    print(f"  OK - Respostas adicionadas")

def main():
    print("ADICIONAR RESPOSTAS AOS GABARITOS")
    print("=" * 60)

    for gabarito_path, respostas in GABARITOS.items():
        caminho = f"{PASTA}\\{gabarito_path}"
        try:
            print(f"\n{gabarito_path}")
            adicionar_respostas(caminho, respostas)
        except Exception as e:
            print(f"  ERRO: {e}")

    print("\n" + "=" * 60)
    print("Concluido!")

if __name__ == "__main__":
    main()
