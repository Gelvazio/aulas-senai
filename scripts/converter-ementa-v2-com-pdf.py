#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Converter v2 - Extrai ementas de TXT, DOCX e PDF para Markdown
Cria EMENTA-PRINCIPAL-{NOME-CURSO}.md
"""

import os
from pathlib import Path
from datetime import datetime

def normalizar_nome_curso(nome):
    """Converte nome da pasta para nome do arquivo"""
    nome = nome.replace("_", "-").replace("  ", "-")
    return nome

def ler_arquivo_txt(caminho):
    """Lê arquivo TXT"""
    try:
        with open(caminho, 'r', encoding='utf-8') as f:
            return f.read()
    except Exception as e:
        print(f"Erro ao ler TXT {caminho}: {e}")
        return None

def ler_arquivo_docx(caminho):
    """Lê arquivo DOCX"""
    try:
        from docx import Document
        doc = Document(caminho)
        linhas = []
        for para in doc.paragraphs:
            if para.text.strip():
                linhas.append(para.text)
        return "\n".join(linhas)
    except ImportError:
        return None
    except Exception as e:
        print(f"Erro ao ler DOCX {caminho}: {e}")
        return None

def ler_arquivo_pdf(caminho):
    """Lê arquivo PDF"""
    try:
        from pypdf import PdfReader
        reader = PdfReader(caminho)
        texto = []

        for pagina in reader.pages:
            texto_pagina = pagina.extract_text()
            if texto_pagina.strip():
                texto.append(texto_pagina)

        return "\n".join(texto)
    except ImportError:
        print(f"⚠️ pypdf não está instalado. Instale com: pip install pypdf")
        return None
    except Exception as e:
        print(f"Erro ao ler PDF {caminho}: {e}")
        return None

def encontrar_arquivo_ementa(pasta_curso):
    """Procura por arquivo de ementa em ordem de prioridade"""
    excluir_palavras = ['aula', 'atividade', 'exercicio', 'prova', 'avaliacao', 'teste', 'questao']

    # Prioridade: DOCX > PDF > TXT
    extensoes = ['.docx', '.pdf', '.txt']

    for ext in extensoes:
        for arquivo in Path(pasta_curso).glob(f"*{ext}"):
            nome_lower = arquivo.name.lower()

            # Procura por palavras-chave
            tem_palavra_chave = any(palavra in nome_lower for palavra in ['ementa', 'plano', 'apostila', 'curso', 'ct '])

            # Ignora arquivos específicos
            tem_palavra_exclusao = any(palavra in nome_lower for palavra in excluir_palavras)

            if tem_palavra_chave and not tem_palavra_exclusao:
                return arquivo

    return None

def converter_para_markdown(conteudo, nome_curso):
    """Converte conteúdo para Markdown formatado"""
    linhas = []

    # Cabeçalho
    linhas.append(f"# EMENTA PRINCIPAL: {nome_curso}")
    linhas.append("")
    linhas.append(f"**Data de Criação:** {datetime.now().strftime('%Y-%m-%d')}")
    linhas.append(f"**Status:** Importado de documento original")
    linhas.append("")
    linhas.append("---")
    linhas.append("")

    # Conteúdo
    if conteudo:
        conteudo_linhas = conteudo.split('\n')

        for linha in conteudo_linhas:
            linha_strip = linha.strip()

            if not linha_strip:
                linhas.append("")
            elif linha_strip.isupper() and len(linha_strip) > 3 and len(linha_strip) < 100:
                # Títulos em maiúsculo viram headings
                linhas.append(f"## {linha_strip}")
                linhas.append("")
            elif linha_strip.startswith('-') or linha_strip.startswith('•'):
                # Já é item de lista
                linhas.append(f"- {linha_strip.lstrip('-•').strip()}")
            elif ':' in linha_strip and len(linha_strip.split(':')[0]) < 30:
                # Parece ser um campo: valor
                chave, valor = linha_strip.split(':', 1)
                linhas.append(f"**{chave.strip()}:** {valor.strip()}")
            else:
                # Texto normal
                linhas.append(linha_strip)

    linhas.append("")
    linhas.append("---")
    linhas.append("")
    linhas.append("*Arquivo gerado automaticamente por converter-ementa-v2-com-pdf.py*")

    return "\n".join(linhas)

def processar_cursos():
    """Processa todos os cursos e cria ementas em Markdown"""
    pasta_sistema = Path("sistema")
    excluir = {'.claude', 'assets', 'GERADOR-AULAS', '.vscode', '.git', '__pycache__'}

    cursos = sorted([d for d in pasta_sistema.iterdir()
                    if d.is_dir() and d.name not in excluir])

    criados = 0
    pulados = 0
    erros = 0

    for curso in cursos:
        # Verifica se já tem EMENTA-*.md
        ementa_md = list(curso.glob("EMENTA-*.md"))
        ementa_principal_md = list(curso.glob("EMENTA-PRINCIPAL-*.md"))

        if ementa_md or ementa_principal_md:
            print(f"✅ {curso.name}: Já tem EMENTA em Markdown")
            pulados += 1
            continue

        # Procura por arquivo de ementa
        arquivo = encontrar_arquivo_ementa(curso)

        if not arquivo:
            print(f"⚠️ {curso.name}: Nenhum arquivo encontrado")
            pulados += 1
            continue

        print(f"📖 {curso.name}: Lendo {arquivo.name} ({arquivo.suffix})...", end=" ")

        # Lê arquivo
        if arquivo.suffix.lower() == '.txt':
            conteudo = ler_arquivo_txt(arquivo)
        elif arquivo.suffix.lower() == '.docx':
            conteudo = ler_arquivo_docx(arquivo)
        elif arquivo.suffix.lower() == '.pdf':
            conteudo = ler_arquivo_pdf(arquivo)
        else:
            print("❌ Formato não suportado")
            erros += 1
            continue

        if not conteudo:
            print("❌ Erro ao ler arquivo")
            erros += 1
            continue

        # Converte para Markdown
        markdown = converter_para_markdown(conteudo, curso.name)

        # Salva arquivo
        nome_saida = f"EMENTA-PRINCIPAL-{normalizar_nome_curso(curso.name)}.md"
        caminho_saida = curso / nome_saida

        try:
            with open(caminho_saida, 'w', encoding='utf-8') as f:
                f.write(markdown)
            print(f"✅ Criado {nome_saida}")
            criados += 1
        except Exception as e:
            print(f"❌ Erro ao salvar: {e}")
            erros += 1

    print("\n" + "="*70)
    print(f"📊 RELATÓRIO:")
    print(f"   ✅ Criados: {criados}")
    print(f"   ⏭️  Pulados (já tem): {pulados}")
    print(f"   ❌ Erros: {erros}")
    print("="*70)

if __name__ == "__main__":
    print("🔄 Iniciando conversão de ementas para Markdown (v2 com PDF)...\n")
    processar_cursos()
    print("\n✅ Processo concluído!")
