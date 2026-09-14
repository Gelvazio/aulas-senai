# -*- coding: utf-8 -*-
"""
Remove TODAS as tabelas de gabarito DUPLICADAS
Mantém apenas UMA tabela de gabarito no final do documento
"""

from docx import Document
from docx.shared import Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH

PASTA = r"C:\fontes\aulas-senai\MATERIAIS\GESTAO_E_CONTROLE_MATERIAIS\ANALISE_DADOS_APLICADA_GESTAO\ATIVIDADES"

GABARITOS = {
    "GABARITO-ATIVIDADE-01-ESTATISTICA-E-PROGRESSOES.docx": "E A E E A A A A A A A A",
    "GABARITO-ATIVIDADE-02-CONCEITOS-FUNDAMENTOS-EXCEL.docx": "E A A A E A A A A A A A",
    "GABARITO-ATIVIDADE-03-FUNCOES-DE-BUSCA-AVANCADAS.docx": "A A A A A A A A A A A A A",
    "GABARITO-ATIVIDADE-04-DESIGN-DASHBOARD-E-KPIS.docx": "A A A A A A A A A A A A A A",
}

def manter_apenas_um_gabarito(docx_path, respostas_str):
    """Remove todas as tabelas/títulos de gabarito duplicados, mantém apenas 1 no final"""

    respostas = respostas_str.strip().split()
    doc = Document(docx_path)

    # 1. Remover TODOS os parágrafos que contêm "GABARITO COMPLETO"
    paragrafos_remover = []
    for idx, para in enumerate(doc.paragraphs):
        if "GABARITO COMPLETO" in para.text or "GABARITO" in para.text:
            paragrafos_remover.append(para)

    # Remover em ordem reversa para não quebrar índices
    for para in paragrafos_remover:
        p = para._element
        p.getparent().remove(p)

    # 2. Remover TODAS as tabelas (exceto as primeiras que são as questões)
    # Contar quantas tabelas de questões devem ser mantidas
    num_questoes = len(respostas)
    num_tabelas_questoes = num_questoes  # 1 tabela por questão, + 1 tabela de cabeçalho

    tabelas_remover = []
    for t_idx in range(len(doc.tables) - 1, num_tabelas_questoes, -1):
        tabelas_remover.append(doc.tables[t_idx])

    # Remover tabelas de gabarito duplicadas
    for table in tabelas_remover:
        tbl = table._element
        tbl.getparent().remove(tbl)

    # 3. Adicionar UMA tabela de gabarito no final
    doc.add_paragraph()
    doc.add_paragraph()

    # Título
    titulo = doc.add_paragraph("GABARITO COMPLETO")
    titulo.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
    titulo.runs[0].bold = True
    titulo.runs[0].font.size = Pt(14)

    # Tabela de gabarito
    tabela = doc.add_table(rows=2, cols=len(respostas))
    tabela.style = 'Light Grid Accent 1'

    # Header (Q1, Q2, Q3, etc)
    for i in range(len(respostas)):
        celula = tabela.rows[0].cells[i]
        celula.text = f"Q{i+1}"
        para = celula.paragraphs[0]
        para.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
        para.runs[0].bold = True

    # Respostas (A, B, C, E, etc)
    for i, resp in enumerate(respostas):
        celula = tabela.rows[1].cells[i]
        celula.text = f"✅ {resp.upper()}"
        para = celula.paragraphs[0]
        para.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
        para.runs[0].bold = True
        para.runs[0].font.color.rgb = RGBColor(0, 128, 0)

    doc.save(docx_path)

def main():
    print("MANTER APENAS UMA TABELA DE GABARITO POR ARQUIVO")
    print("=" * 70)

    for gabarito, respostas in GABARITOS.items():
        caminho = f"{PASTA}\\{gabarito}"
        print(f"\n{gabarito}")
        try:
            manter_apenas_um_gabarito(caminho, respostas)
            print(f"  ✅ Processado - mantida apenas 1 tabela de gabarito")
        except Exception as e:
            print(f"  ❌ ERRO: {e}")
            import traceback
            traceback.print_exc()

    print("\n" + "=" * 70)
    print("Concluído!")

if __name__ == "__main__":
    main()
