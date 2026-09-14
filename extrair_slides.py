#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from pptx import Presentation
import os

# Pasta com as apresentações
pasta = r"MATERIAIS\GESTAO_E_CONTROLE_MATERIAIS\ANALISE_DADOS_APLICADA_GESTAO\AULAS-CHALKIE-AI-VERSAO-FINAL"

# Lista de arquivos PPTX
arquivos = [
    "1-Matemática-Aplicada-à-Gestão.pptx",
    "2-Excel-Básico-e-Intermediário-para-Gestão.pptx",
    "3-Excel-Avançado-e-Visualização-de-Dados.pptx",
    "4-Dashboards-Executivos-e-Projeto-Final-Integrado.pptx"
]

# Dicionário para armazenar o conteúdo
conteudo_aulas = {}

for arquivo in arquivos:
    caminho_completo = os.path.join(pasta, arquivo)
    print(f"Lendo {arquivo}...")

    try:
        prs = Presentation(caminho_completo)
        aula_slides = []

        for idx, slide in enumerate(prs.slides, 1):
            slide_info = {
                "numero": idx,
                "titulo": "",
                "conteudo": []
            }

            # Extrair texto de cada forma no slide
            for shape in slide.shapes:
                if hasattr(shape, "text") and shape.text.strip():
                    texto = shape.text.strip()

                    # Primeiro texto é geralmente o título
                    if not slide_info["titulo"] and len(texto) < 100:
                        slide_info["titulo"] = texto
                    else:
                        slide_info["conteudo"].append(texto)

            aula_slides.append(slide_info)

        conteudo_aulas[arquivo] = aula_slides
        print(f"  ✅ {len(aula_slides)} slides extraídos")

    except Exception as e:
        print(f"  ❌ Erro ao ler {arquivo}: {e}")

# Gerar relatório em Markdown
relatorio = "# RELATÓRIO DE CONTEÚDO DAS AULAS - ANÁLISE DE DADOS APLICADA À GESTÃO\n\n"
relatorio += "**Data de Geração:** 2026-09-14\n"
relatorio += "**Curso:** Análise de Dados Aplicada à Gestão\n"
relatorio += "**Carga Horária:** 32 horas\n\n"

relatorio += "---\n\n"

for arquivo, slides in conteudo_aulas.items():
    # Extrair número da aula do nome do arquivo
    num_aula = arquivo[0]
    titulo_arquivo = arquivo.split("-", 1)[1].replace(".pptx", "")

    relatorio += f"## AULA {num_aula}: {titulo_arquivo}\n\n"
    relatorio += f"**Total de Slides:** {len(slides)}\n\n"

    for slide in slides:
        if slide["titulo"]:
            relatorio += f"### Slide {slide['numero']}: {slide['titulo']}\n\n"

            if slide["conteudo"]:
                for linha in slide["conteudo"]:
                    # Limpar linhas muito longas
                    if len(linha) > 3:
                        relatorio += f"- {linha}\n"
                relatorio += "\n"

    relatorio += "---\n\n"

# Salvar relatório
caminho_relatorio = os.path.join(pasta, "RELATORIO-AULAS-CHALKIE-AI-VERSAO.md")
with open(caminho_relatorio, "w", encoding="utf-8") as f:
    f.write(relatorio)

print(f"\n✅ Relatório salvo em: {caminho_relatorio}")
print(f"Total de aulas processadas: {len(conteudo_aulas)}")
