#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
CONVERSOR DE EMENTAS - Extrai ementas de TXT/DOCX/PDF para Markdown

FORMATOS SUPORTADOS:
  • TXT:  Arquivo de texto puro
  • DOCX: Documento Microsoft Word
  • PDF:  Arquivo PDF (requer pypdf)

BUSCA POR:
  Procura automaticamente por arquivos com palavras-chave:
  - "ementa", "plano", "apostila", "curso", "ct-", "ct "

  Ignora arquivos com:
  - "aula", "atividade", "exercicio", "prova", "avaliacao", "teste"

SAÍDA:
  Cria EMENTA-PRINCIPAL-{CURSO}.md em cada pasta de curso

  Exemplo:
  sistema/MECANICA/EMENTA-PRINCIPAL-MECANICA.md

COMO USAR:
  python converter-ementa.py                 # Converte todas as ementas
  python converter-ementa.py --pasta MECANICA  # Converte pasta específica (TODO)

DEPENDÊNCIAS OPCIONAIS:
  - pypdf: para ler PDFs (pip install pypdf)
  - python-docx: para ler DOCX (pip install python-docx)
"""

import os
from pathlib import Path
from datetime import datetime


def ler_txt(caminho):
    try:
        with open(caminho, 'r', encoding='utf-8') as f:
            return f.read()
    except:
        return None


def ler_docx(caminho):
    try:
        from docx import Document
        doc = Document(caminho)
        linhas = [p.text for p in doc.paragraphs if p.text.strip()]
        return "\n".join(linhas)
    except ImportError:
        return None
    except:
        return None


def ler_pdf(caminho):
    try:
        from pypdf import PdfReader
        reader = PdfReader(caminho)
        texto = []
        for pagina in reader.pages:
            t = pagina.extract_text()
            if t.strip():
                texto.append(t)
        return "\n".join(texto)
    except ImportError:
        return None
    except:
        return None


def buscar_arquivo_ementa(pasta):
    """Busca por arquivo de ementa: ordem de prioridade DOCX > PDF > TXT"""
    excluir = {'aula', 'atividade', 'exercicio', 'prova', 'avaliacao', 'teste', 'questao'}
    procurar = {'ementa', 'plano', 'apostila', 'curso', 'ct-', 'ct '}

    for ext in ['.docx', '.pdf', '.txt']:
        for arquivo in Path(pasta).glob(f"*{ext}"):
            nome_lower = arquivo.name.lower()
            if any(p in nome_lower for p in procurar) and not any(e in nome_lower for e in excluir):
                return arquivo

    return None


def formato_markdown(conteudo, nome_curso):
    """Converte conteúdo para Markdown estruturado"""
    if not conteudo:
        return ""

    linhas = [
        f"# EMENTA PRINCIPAL: {nome_curso}",
        "",
        f"**Data:** {datetime.now().strftime('%Y-%m-%d')}",
        f"**Status:** Importado de documento original",
        "",
        "---",
        ""
    ]

    for linha in conteudo.split('\n'):
        linha_strip = linha.strip()
        if not linha_strip:
            linhas.append("")
        elif linha_strip.isupper() and 3 < len(linha_strip) < 100:
            linhas.append(f"## {linha_strip}")
            linhas.append("")
        elif linha_strip.startswith(('-', '•')):
            linhas.append(f"- {linha_strip.lstrip('-•').strip()}")
        elif ':' in linha_strip and len(linha_strip.split(':')[0]) < 30:
            chave, valor = linha_strip.split(':', 1)
            linhas.append(f"**{chave.strip()}:** {valor.strip()}")
        else:
            linhas.append(linha_strip)

    linhas.extend(["", "---", "", "*Gerado automaticamente por converter-ementa.py*"])
    return "\n".join(linhas)


def gerar_ementa_conteiner(pasta, nome):
    """Gera ementa agregada para contêineres listando subcursos"""
    linhas = [
        f"# EMENTA PRINCIPAL: {nome}",
        "",
        f"**Data:** {datetime.now().strftime('%Y-%m-%d')}",
        f"**Tipo:** Contêiner de Cursos",
        "",
        "---",
        "",
        "## Cursos Inclusos",
        ""
    ]

    for subpasta in sorted(Path(pasta).iterdir()):
        if subpasta.is_dir() and not subpasta.name.startswith('.'):
            linhas.append(f"### {subpasta.name}")
            arquivo = buscar_arquivo_ementa(subpasta)
            if arquivo:
                linhas.append(f"📄 {arquivo.name}")
            linhas.append("")

    linhas.extend(["---", "", "*Gerado automaticamente por converter-ementa.py*"])
    return "\n".join(linhas)


def processar_curso(pasta, nome):
    """Processa uma pasta de curso/contêiner"""
    # Verifica se já tem ementa
    if list(pasta.glob("EMENTA-*.md")) or list(pasta.glob("EMENTA-PRINCIPAL-*.md")):
        return None, "já tem"

    # Verifica se é contêiner
    tem_subcursos = any(
        (d.is_dir() and not d.name.startswith('.') and
         (list(d.glob("*/AULAS")) or list(d.glob("*/AVALIACOES")) or list(d.glob("*/EMENTA-*"))))
        for d in pasta.iterdir() if d.is_dir()
    )

    if tem_subcursos:
        # É contêiner: procura ementa nos subcursos ou gera agregada
        arquivo = None
        for d in pasta.iterdir():
            if d.is_dir() and not d.name.startswith('.'):
                arquivo = buscar_arquivo_ementa(d)
                if arquivo:
                    break

        if arquivo:
            if arquivo.suffix.lower() == '.txt':
                conteudo = ler_txt(arquivo)
            elif arquivo.suffix.lower() == '.docx':
                conteudo = ler_docx(arquivo)
            elif arquivo.suffix.lower() == '.pdf':
                conteudo = ler_pdf(arquivo)
            else:
                return None, "formato não suportado"

            if not conteudo:
                return None, "erro ao ler"
            return formato_markdown(conteudo, nome), "convertido"
        else:
            return gerar_ementa_conteiner(pasta, nome), "agregada"

    # Não é contêiner: procura arquivo normal
    arquivo = buscar_arquivo_ementa(pasta)
    if not arquivo:
        return None, "não encontrado"

    # Lê arquivo
    if arquivo.suffix.lower() == '.txt':
        conteudo = ler_txt(arquivo)
    elif arquivo.suffix.lower() == '.docx':
        conteudo = ler_docx(arquivo)
    elif arquivo.suffix.lower() == '.pdf':
        conteudo = ler_pdf(arquivo)
    else:
        return None, "formato não suportado"

    if not conteudo:
        return None, "erro ao ler"

    return formato_markdown(conteudo, nome), "convertido"


def main():
    # Usar caminho relativo correto (sobe um nível de scripts/ para aulas-senai/)
    pasta_sistema = Path(__file__).parent.parent / "sistema"
    excluir = {'.claude', 'assets', 'GERADOR-AULAS', '.vscode', '.git', '__pycache__'}

    print(f"📖 Convertendo ementas para Markdown...\n  Pasta: {pasta_sistema}\n")

    criados = 0
    pulados = 0
    erros = 0

    for curso in sorted(pasta_sistema.iterdir()):
        if not curso.is_dir() or curso.name in excluir:
            continue

        print(f"  {curso.name}...", end=" ")
        conteudo, status = processar_curso(curso, curso.name)

        if status == "já tem":
            print("✅ (já tem)")
            pulados += 1
        elif status == "não encontrado":
            print("⚠️ (não encontrado)")
            pulados += 1
        elif status == "erro ao ler":
            print("❌ (erro ao ler)")
            erros += 1
        elif not conteudo:
            print("❌ (erro desconhecido)")
            erros += 1
        else:
            # Salva arquivo
            nome_arquivo = f"EMENTA-PRINCIPAL-{curso.name.replace('_', '-').replace('  ', '-')}.md"
            caminho_saida = curso / nome_arquivo

            try:
                with open(caminho_saida, 'w', encoding='utf-8') as f:
                    f.write(conteudo)
                print(f"✅ ({status})")
                criados += 1
            except Exception as e:
                print(f"❌ (erro ao salvar)")
                erros += 1

    print("\n" + "="*70)
    print(f"✅ Criados: {criados} | ⏭️  Pulados: {pulados} | ❌ Erros: {erros}")
    print("="*70)


if __name__ == "__main__":
    main()
