# -*- coding: utf-8 -*-
"""
Extrair conteúdo de todos os slides PPTX e consolidar em markdown
"""

from pptx import Presentation
import os
from pathlib import Path

PASTA = r"C:\fontes\aulas-senai\MATERIAIS\GESTAO_E_CONTROLE_MATERIAIS\ANALISE_DADOS_APLICADA_GESTAO\AULAS-CHALKIE-AI-VERSAO-FINAL"

# Listar arquivos PPTX
arquivos_pptx = [f for f in os.listdir(PASTA) if f.endswith('.pptx')]
arquivos_pptx.sort()

def extrair_texto_shape(shape):
    """Extrair texto de um shape (caixa de texto, título, etc)"""
    texto = []

    if hasattr(shape, "text_frame"):
        for paragrafo in shape.text_frame.paragraphs:
            texto.append(paragrafo.text)

    return "\n".join(texto)

def extrair_slides_pptx(caminho_pptx):
    """Extrair conteúdo de todos os slides de um PPTX"""

    try:
        prs = Presentation(caminho_pptx)
        slides_data = []

        for slide_idx, slide in enumerate(prs.slides, 1):
            conteudo = []

            # Extrair texto de todas as formas (shapes)
            for shape in slide.shapes:
                texto = extrair_texto_shape(shape)
                if texto.strip():
                    conteudo.append(texto)

            slides_data.append({
                'numero': slide_idx,
                'conteudo': "\n".join(conteudo)
            })

        return slides_data

    except Exception as e:
        print(f"  ❌ Erro ao ler {caminho_pptx}: {e}")
        return []

def main():
    print("EXTRAIR SLIDES E GERAR MARKDOWN")
    print("=" * 80)

    # Acumular todo o conteúdo
    markdown_completo = "# Conteúdo das Aulas - Análise de Dados Aplicada à Gestão\n\n"
    markdown_completo += "**Data de extração:** 15/09/2026\n\n"
    markdown_completo += "---\n\n"

    num_slides_total = 0
    num_arquivos = 0

    for arquivo in arquivos_pptx:
        if arquivo == "APRESENTACAO UNIDADE CURRICULAR.pptx":
            # Este arquivo é a apresentação da unidade, processar separadamente
            continue

        caminho = os.path.join(PASTA, arquivo)
        print(f"\n📄 {arquivo}")

        slides = extrair_slides_pptx(caminho)

        if slides:
            num_arquivos += 1
            num_slides_total += len(slides)

            # Adicionar título do arquivo
            markdown_completo += f"## {arquivo.replace('.pptx', '')}\n\n"

            for slide in slides:
                # Adicionar slide ao markdown
                markdown_completo += f"### Slide {slide['numero']}\n\n"

                if slide['conteudo'].strip():
                    markdown_completo += slide['conteudo'] + "\n\n"
                else:
                    markdown_completo += "*(Slide sem conteúdo de texto)*\n\n"

                markdown_completo += "---\n\n"

            print(f"  ✅ {len(slides)} slides extraídos")

    # Salvar markdown
    arquivo_saida = os.path.join(PASTA, "CONTEUDO_SLIDES_CONSOLIDADO.md")

    with open(arquivo_saida, 'w', encoding='utf-8') as f:
        f.write(markdown_completo)

    print("\n" + "=" * 80)
    print(f"✅ Markdown gerado com sucesso!")
    print(f"   Arquivos processados: {num_arquivos}")
    print(f"   Total de slides: {num_slides_total}")
    print(f"   Arquivo salvo: {arquivo_saida}")

if __name__ == "__main__":
    main()
