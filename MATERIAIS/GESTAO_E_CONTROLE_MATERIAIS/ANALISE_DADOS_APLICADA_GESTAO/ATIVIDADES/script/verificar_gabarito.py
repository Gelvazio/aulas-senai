# -*- coding: utf-8 -*-
"""
Verificar o que realmente está nos gabaritos
Localizar TODAS as ocorrências de "RESPOSTA CORRETA"
"""

from docx import Document

PASTA = r"C:\fontes\aulas-senai\MATERIAIS\GESTAO_E_CONTROLE_MATERIAIS\ANALISE_DADOS_APLICADA_GESTAO\ATIVIDADES"

gabarito = "GABARITO-ATIVIDADE-01-ESTATISTICA-E-PROGRESSOES.docx"
docx_path = f"{PASTA}\\{gabarito}"

doc = Document(docx_path)

print(f"Verificando: {gabarito}")
print("=" * 80)
print()

encontradas = 0

for t_idx, table in enumerate(doc.tables):
    print(f"\n📋 TABELA {t_idx}")
    print("-" * 80)

    for r_idx, row in enumerate(table.rows):
        for c_idx, cell in enumerate(row.cells):
            texto = cell.text.strip()

            if "RESPOSTA CORRETA" in texto:
                encontradas += 1
                print(f"  LINHA {r_idx} COLUNA {c_idx}: {texto[:100]}...")

                # Mostrar cada parágrafo
                for p_idx, para in enumerate(cell.paragraphs):
                    if "RESPOSTA CORRETA" in para.text:
                        print(f"    → Parágrafo {p_idx}: {para.text[:80]}...")

                        # Mostrar cada run
                        for run_idx, run in enumerate(para.runs):
                            if "RESPOSTA CORRETA" in run.text or "✅" in run.text:
                                print(f"      • Run {run_idx}: '{run.text}'")

print()
print("=" * 80)
print(f"✅ Total de ocorrências de 'RESPOSTA CORRETA': {encontradas}")
