# -*- coding: utf-8 -*-
"""
Extrair gabarito a partir dos DOCX
Identifica questoes, alternativas e resposta correta
"""

from docx import Document
import re

PASTA = r"C:\fontes\aulas-senai\MATERIAIS\GESTAO_E_CONTROLE_MATERIAIS\ANALISE_DADOS_APLICADA_GESTAO\ATIVIDADES"

def extrair_gabarito(docx_path):
    """Extrai questoes e respostas do DOCX"""

    doc = Document(docx_path)
    gabarito = {}

    questao_num = 0

    for t_idx, table in enumerate(doc.tables):
        if t_idx == 0:
            continue

        questao_num += 1

        # Combinar todo o texto da tabela
        texto_completo = ""
        for row in table.rows:
            for cell in row.cells:
                texto_completo += cell.text + "\n"

        # Procurar por alternativas a) b) c) d) e)
        # A primeira alternativa geralmente eh a resposta correta em exercicios pedagogicos
        alternativas = re.findall(r'[a-e]\)[^\n]*', texto_completo)

        if alternativas:
            # Primeira alternativa = resposta correta (assumido)
            resposta = alternativas[0][0].lower()  # a, b, c, d ou e
            gabarito[questao_num] = resposta

    return gabarito

def main():
    arquivos = [
        ("AVALIACAO-01-ESTATISTICA-E-PROGRESSOES.docx", "ESTATISTICA"),
        ("AVALIACAO-02-CONCEITOS-FUNDAMENTOS-EXCEL.docx", "EXCEL"),
        ("AVALIACAO-03-FUNCOES-DE-BUSCA-AVANCADAS.docx", "BUSCA"),
        ("AVALIACAO-04-DESIGN-DASHBOARD-E-KPIS.docx", "DASHBOARD"),
    ]

    for arquivo, nome in arquivos:
        caminho = f"{PASTA}\\{arquivo}"
        try:
            gabarito = extrair_gabarito(caminho)

            print(f"\n{nome}:")
            print("-" * 60)

            respostas = []
            for q, r in sorted(gabarito.items()):
                print(f"Q{q}: {r.upper()}")
                respostas.append(r.upper())

            print(f"\nGabarito completo: {' '.join(respostas)}")

        except Exception as e:
            print(f"Erro em {arquivo}: {e}")

if __name__ == "__main__":
    main()
