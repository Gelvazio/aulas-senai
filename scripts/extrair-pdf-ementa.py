#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
EXTRATOR DE PDF PARA EMENTA - Extrai texto limpo de PDFs

Resolve problema: PDFs convertidos com texto colado
Solução: Usar pdfplumber para extração mais inteligente

USO:
  python extrair-pdf-ementa.py --pdf "caminho/arquivo.pdf" --saida "EMENTA-PRINCIPAL.md"
"""

import sys
import re
from pathlib import Path

try:
    import pdfplumber
except ImportError:
    print("❌ pdfplumber não instalado!")
    print("   Execute: pip install pdfplumber")
    sys.exit(1)


def extrair_pdf_limpo(caminho_pdf):
    """Extrair texto limpo de PDF."""

    print(f"📄 Lendo PDF: {Path(caminho_pdf).name}")

    try:
        with pdfplumber.open(caminho_pdf) as pdf:
            texto_completo = ""

            for i, page in enumerate(pdf.pages, 1):
                print(f"   Página {i}/{len(pdf.pages)}...", end=" ")

                # Extrair texto da página
                texto = page.extract_text()

                if texto:
                    texto_completo += texto + "\n\n"

                print("✓")

        print(f"\n✅ Texto extraído: {len(texto_completo):,} caracteres")
        return texto_completo

    except Exception as e:
        print(f"❌ Erro ao ler PDF: {e}")
        return None


def limpar_texto_extraido(texto):
    """Limpar texto extraído: adicionar espaços, quebras de linha."""

    # Adicionar espaços após pontos seguidos de letra
    texto = re.sub(r'\.([A-Z])', r'. \1', texto)

    # Adicionar espaços após números seguidos de letra
    texto = re.sub(r'(\d)([A-Z][a-z])', r'\1 \2', texto)

    # Adicionar quebras de linha após títulos (linhas em maiúsculas)
    linhas = texto.split('\n')
    linhas_limpas = []

    for linha in linhas:
        linha = linha.strip()
        if linha:
            linhas_limpas.append(linha)

    return '\n\n'.join(linhas_limpas)


def main():
    import argparse

    parser = argparse.ArgumentParser(description='Extrair PDF para Ementa Markdown')
    parser.add_argument('--pdf', required=True, help='Caminho do arquivo PDF')
    parser.add_argument('--saida', required=True, help='Arquivo de saída (EMENTA-*.md)')

    args = parser.parse_args()

    caminho_pdf = Path(args.pdf)
    caminho_saida = Path(args.saida)

    if not caminho_pdf.exists():
        print(f"❌ PDF não encontrado: {caminho_pdf}")
        return 1

    print("\n" + "="*70)
    print("EXTRATOR DE PDF PARA EMENTA")
    print("="*70 + "\n")

    # Extrair texto
    texto = extrair_pdf_limpo(caminho_pdf)

    if not texto:
        print("❌ Falha ao extrair texto do PDF")
        return 1

    # Limpar texto
    print("\n🧹 Limpando texto...")
    texto_limpo = limpar_texto_extraido(texto)

    # Criar Markdown
    print("📝 Gerando Markdown...")
    ementa_md = f"""# EMENTA PRINCIPAL: {caminho_saida.stem}

**Data de Criação:** {__import__('datetime').datetime.now().strftime('%Y-%m-%d')}
**Status:** Extraído de PDF
**Fonte:** {caminho_pdf.name}

---

{texto_limpo}
"""

    # Salvar
    try:
        caminho_saida.write_text(ementa_md, encoding='utf-8')
        print(f"\n✅ Ementa salva: {caminho_saida}")
        print(f"   Tamanho: {len(ementa_md):,} caracteres")
        return 0

    except Exception as e:
        print(f"❌ Erro ao salvar: {e}")
        return 1


if __name__ == "__main__":
    sys.exit(main())
