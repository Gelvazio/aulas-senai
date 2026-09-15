# -*- coding: utf-8 -*-
"""
Extrair conteúdo completo de cada PPTX e criar 1 arquivo markdown por apresentação
"""

from pptx import Presentation
import os

PASTA = r"C:\fontes\aulas-senai\MATERIAIS\GESTAO_E_CONTROLE_MATERIAIS\ANALISE_DADOS_APLICADA_GESTAO\AULAS-CHALKIE-AI-VERSAO-FINAL"

# Listar arquivos PPTX (excluindo a apresentação da unidade)
ARQUIVOS_PPTX = [
    "1-Matemática-Aplicada-à-Gestão.pptx",
    "2-Excel-Básico-e-Intermediário-para-Gestão.pptx",
    "3-Excel-Avançado-e-Visualização-de-Dados.pptx",
    "4-Dashboards-Executivos-e-Projeto-Final-Integrado.pptx",
]

# Mapping de PPTX para nome do arquivo markdown
NOMES_SAIDA = {
    "1-Matemática-Aplicada-à-Gestão.pptx": "1-Matematica-Aplicada-a-Gestao.md",
    "2-Excel-Básico-e-Intermediário-para-Gestão.pptx": "2-Excel-Basico-e-Intermediario.md",
    "3-Excel-Avançado-e-Visualização-de-Dados.pptx": "3-Excel-Avancado-e-Visualizacao.md",
    "4-Dashboards-Executivos-e-Projeto-Final-Integrado.pptx": "4-Dashboards-Executivos.md",
}

def extrair_texto_shape(shape):
    """Extrair texto de um shape"""
    texto = []

    if hasattr(shape, "text_frame"):
        for paragrafo in shape.text_frame.paragraphs:
            if paragrafo.text.strip():
                texto.append(paragrafo.text)

    return "\n".join(texto)

def extrair_pptx_completo(caminho_pptx):
    """Extrair conteúdo completo do PPTX"""

    try:
        prs = Presentation(caminho_pptx)
        markdown = ""

        for slide_idx, slide in enumerate(prs.slides, 1):
            conteudo = []

            # Extrair texto de todas as formas
            for shape in slide.shapes:
                texto = extrair_texto_shape(shape)
                if texto.strip():
                    conteudo.append(texto)

            # Adicionar slide ao markdown
            markdown += f"## Slide {slide_idx}\n\n"

            if conteudo:
                markdown += "\n\n".join(conteudo)
            else:
                markdown += "*(Slide sem conteúdo de texto)*"

            markdown += "\n\n---\n\n"

        return markdown

    except Exception as e:
        print(f"  ❌ Erro ao ler {caminho_pptx}: {e}")
        return ""

def main():
    print("CRIAR 1 ARQUIVO MARKDOWN POR APRESENTAÇÃO")
    print("=" * 80)

    for arquivo_pptx in ARQUIVOS_PPTX:
        caminho_pptx = os.path.join(PASTA, arquivo_pptx)

        if not os.path.exists(caminho_pptx):
            print(f"\n⚠️  {arquivo_pptx} - ARQUIVO NÃO ENCONTRADO")
            continue

        print(f"\n📄 {arquivo_pptx}")

        # Extrair conteúdo completo
        conteudo_md = extrair_pptx_completo(caminho_pptx)

        if conteudo_md:
            # Preparar header
            titulo = arquivo_pptx.replace(".pptx", "").replace("-", " ")
            header = f"# {titulo}\n\n"
            header += f"**Origem:** {arquivo_pptx}\n\n"
            header += "---\n\n"

            conteudo_completo = header + conteudo_md

            # Salvar arquivo markdown
            nome_saida = NOMES_SAIDA.get(arquivo_pptx, arquivo_pptx.replace(".pptx", ".md"))
            caminho_saida = os.path.join(PASTA, nome_saida)

            with open(caminho_saida, 'w', encoding='utf-8') as f:
                f.write(conteudo_completo)

            print(f"  ✅ Arquivo criado: {nome_saida}")
        else:
            print(f"  ❌ Falha ao extrair conteúdo")

    print("\n" + "=" * 80)
    print("✅ Conclusão!")
    print(f"   Total de arquivos markdown criados: {len(ARQUIVOS_PPTX)}")
    print(f"   Localização: {PASTA}")

if __name__ == "__main__":
    main()
