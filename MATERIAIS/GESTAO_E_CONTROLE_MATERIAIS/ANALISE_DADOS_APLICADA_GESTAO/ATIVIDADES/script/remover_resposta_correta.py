# -*- coding: utf-8 -*-
"""
Remove COMPLETAMENTE o texto 'RESPOSTA CORRETA' de TODOS os gabaritos
Deixa apenas o checkmark (✅) na alternativa correta
"""

from docx import Document

PASTA = r"C:\fontes\aulas-senai\MATERIAIS\GESTAO_E_CONTROLE_MATERIAIS\ANALISE_DADOS_APLICADA_GESTAO\ATIVIDADES"

GABARITOS = [
    "GABARITO-ATIVIDADE-01-ESTATISTICA-E-PROGRESSOES.docx",
    "GABARITO-ATIVIDADE-02-CONCEITOS-FUNDAMENTOS-EXCEL.docx",
    "GABARITO-ATIVIDADE-03-FUNCOES-DE-BUSCA-AVANCADAS.docx",
    "GABARITO-ATIVIDADE-04-DESIGN-DASHBOARD-E-KPIS.docx",
]

def remover_resposta_correta(docx_path):
    """Remove COMPLETAMENTE 'RESPOSTA CORRETA' de todos os parágrafos"""

    doc = Document(docx_path)

    removidas = 0

    # Percorrer TODAS as tabelas e TODOS os parágrafos
    for table in doc.tables:
        for row in table.rows:
            for cell in row.cells:
                for para in cell.paragraphs:
                    # Para cada run no parágrafo
                    for run in para.runs:
                        if "RESPOSTA CORRETA" in run.text:
                            # Opção 1: Remover completamente o run
                            if run.text.strip() == "✅ RESPOSTA CORRETA":
                                # Remover run inteiro
                                r = run._element
                                r.getparent().remove(r)
                                removidas += 1
                            else:
                                # Opção 2: Substituir apenas "  ✅ RESPOSTA CORRETA" por vazio
                                run.text = run.text.replace("  ✅ RESPOSTA CORRETA", "")
                                run.text = run.text.replace("✅ RESPOSTA CORRETA", "")
                                removidas += 1

    doc.save(docx_path)
    return removidas

def main():
    print("REMOVER 'RESPOSTA CORRETA' DE TODOS OS GABARITOS")
    print("=" * 70)

    for gabarito in GABARITOS:
        caminho = f"{PASTA}\\{gabarito}"
        print(f"\n{gabarito}")
        try:
            removidas = remover_resposta_correta(caminho)
            print(f"  ✅ Removidas {removidas} ocorrências")
        except Exception as e:
            print(f"  ❌ ERRO: {e}")

    print("\n" + "=" * 70)
    print("Concluído!")

if __name__ == "__main__":
    main()
