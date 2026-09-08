#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Gerador de slides HTML para aulas Markdown
Converte arquivos .md em apresentações Reveal.js
"""

import os
import re
import json
from pathlib import Path
from datetime import datetime

# Configuração
AULAS_DIR = Path(__file__).parent
MODULOS = {
    1: {"nome": "Fundamentos Matemáticos", "cor": "#2a78d6", "aulas": [1, 2, 3, 4, 5, 6]},
    2: {"nome": "Excel Básico", "cor": "#eb6834", "aulas": [7, 8, 9]},
    3: {"nome": "Excel Avançado", "cor": "#1baf7a", "aulas": [10, 11, 12, 13, 14]},
    4: {"nome": "Dashboards", "cor": "#eda100", "aulas": [15, 16]},
}

HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{titulo} - SENAI</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.5.0/reveal.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.5.0/theme/white.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/atom-one-light.min.css">
    <style>
        :root {{
            --r-main-font: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            --r-heading-font: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            --r-main-font-size: 32px;
            --r-main-color: #2C2C2A;
            --r-heading-color: #004384;
            --r-heading3-size: 1.3em;
            --r-link-color: #0055b3;
            --r-link-color-hover: #003d7f;
            --r-selection-background-color: #98bdef;
        }}

        .reveal {{
            background: linear-gradient(135deg, #f9f9f9 0%, #ffffff 100%);
        }}

        .reveal h1, .reveal h2, .reveal h3 {{
            text-transform: none;
            font-weight: 600;
        }}

        .reveal h1 {{
            font-size: 2.5em;
            color: #004384;
        }}

        .reveal h2 {{
            font-size: 2em;
            color: #0055b3;
            margin-bottom: 0.5em;
        }}

        .reveal h3 {{
            font-size: 1.5em;
            color: #004384;
        }}

        /* Slide de Capa */
        .slide-capa {{
            background: linear-gradient(135deg, #004384 0%, #0055b3 100%);
        }}

        .slide-capa h1 {{
            color: white;
            font-size: 3em;
            margin-bottom: 0.3em;
        }}

        .slide-capa .modulo {{
            color: #FF6B35;
            font-size: 1.5em;
            margin-bottom: 1em;
        }}

        .slide-capa .meta {{
            color: rgba(255, 255, 255, 0.8);
            font-size: 1.2em;
            margin-top: 2em;
        }}

        .slide-capa .logo {{
            position: absolute;
            bottom: 20px;
            right: 30px;
            font-weight: bold;
            color: white;
            font-size: 1.2em;
        }}

        /* Slides de Conteúdo */
        .reveal section {{
            padding: 40px 60px;
        }}

        .reveal ul {{
            margin: 0.5em 0;
        }}

        .reveal li {{
            margin: 0.3em 0;
            font-size: 0.9em;
        }}

        .reveal code {{
            background: #f5f5f5;
            padding: 2px 6px;
            border-radius: 4px;
            color: #d05;
            font-size: 0.85em;
        }}

        .reveal pre {{
            width: 100%;
            font-size: 0.55em;
            margin: 1em 0;
        }}

        .reveal pre code {{
            padding: 20px;
            background: #f5f5f5;
            max-height: 400px;
            border-radius: 8px;
        }}

        /* Boxes de Destaque */
        .box-destaque {{
            background: #E6F1FB;
            border-left: 5px solid #0055b3;
            padding: 15px 20px;
            margin: 1em 0;
            border-radius: 4px;
            font-size: 0.9em;
        }}

        .box-exemplo {{
            background: #EAF3DE;
            border-left: 5px solid #639922;
            padding: 15px 20px;
            margin: 1em 0;
            border-radius: 4px;
            font-size: 0.9em;
        }}

        .box-aviso {{
            background: #FAEEDA;
            border-left: 5px solid #BA7517;
            padding: 15px 20px;
            margin: 1em 0;
            border-radius: 4px;
            font-size: 0.9em;
        }}

        /* Footer */
        .reveal .footer {{
            position: absolute;
            bottom: 20px;
            width: 100%;
            text-align: center;
            font-size: 0.6em;
            color: #999;
            display: flex;
            justify-content: space-between;
            padding: 0 40px;
            box-sizing: border-box;
        }}

        .footer-left {{
            flex: 1;
            text-align: left;
        }}

        .footer-center {{
            flex: 1;
            text-align: center;
        }}

        .footer-right {{
            flex: 1;
            text-align: right;
        }}

        /* Tabelas */
        .reveal table {{
            font-size: 0.85em;
            margin: 1em auto;
        }}

        .reveal table th {{
            background: #004384;
            color: white;
        }}

        .reveal table td {{
            padding: 8px 12px;
            border-bottom: 1px solid #ddd;
        }}

        /* Modo apresentação */
        .reveal .slides {{
            text-align: left;
        }}

        @media print {{
            .reveal {{
                background: white;
            }}
        }}
    </style>
</head>
<body>
    <div class="reveal">
        <div class="slides">
            {slides}
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.5.0/reveal.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.5.0/plugin/highlight/highlight.min.js"></script>
    <script>
        Reveal.initialize({{
            hash: true,
            slideNumber: true,
            transition: 'slide',
            backgroundTransition: 'fade',
            plugins: [ RevealHighlight ],
            keyboard: true,
            center: true,
            help: true,
            width: 1000,
            height: 700,
        }});
    </script>
</body>
</html>
"""

SLIDE_TEMPLATE = """<section>
    {conteudo}
</section>"""

def determinar_modulo(numero_aula):
    """Determina o módulo de uma aula"""
    for modulo_num, info in MODULOS.items():
        if numero_aula in info["aulas"]:
            return modulo_num, info
    return None, None

def extrair_info_aula(conteudo):
    """Extrai informações da aula do markdown"""
    linhas = conteudo.split('\n')
    titulo = linhas[0].replace('# AULA', 'AULA').replace(':', '').strip()

    # Extrair data, duração e módulo
    data = modulo = duracao = ""
    for linha in linhas[1:10]:
        if "**Data:**" in linha:
            data = linha.split("**Data:**")[1].strip()
        elif "**Duração:**" in linha:
            duracao = linha.split("**Duração:**")[1].strip()
        elif "**Módulo:**" in linha:
            modulo = linha.split("**Módulo:**")[1].strip()

    return {"titulo": titulo, "data": data, "duracao": duracao, "modulo": modulo}

def gerar_slides_html(numero_aula, titulo_aula, conteudo_md):
    """Gera HTML com slides a partir do markdown"""

    modulo_num, modulo_info = determinar_modulo(numero_aula)

    slides = []

    # Slide de Capa
    slide_capa = f"""<section class="slide-capa">
        <h1>AULA {numero_aula:02d}</h1>
        <div class="modulo">Módulo {modulo_num}: {modulo_info['nome']}</div>
        <h2 style="color: white; font-size: 2em;">{titulo_aula}</h2>
        <div class="meta">
            <p>2 horas | Análise de Dados Aplicada à Gestão</p>
        </div>
        <div class="logo">SENAI</div>
    </section>"""
    slides.append(slide_capa)

    # Slide de Objetivos
    slide_objetivos = """<section>
        <h2>📚 Objetivos da Aula</h2>
        <ul>
            <li>Compreender os conceitos apresentados</li>
            <li>Aplicar conhecimentos em contextos práticos</li>
            <li>Realizar atividades de forma independente</li>
            <li>Refletir sobre aplicações profissionais</li>
        </ul>
    </section>"""
    slides.append(slide_objetivos)

    # Processar seções de conteúdo
    secoes = re.split(r'##+ ', conteudo_md)

    for secao in secoes[1:]:  # Pular cabeçalho
        linhas = secao.split('\n')
        titulo_secao = linhas[0].strip()

        if "CONTEÚDO" in titulo_secao.upper() or "OPERAÇÕES" in titulo_secao.upper():
            # Dividir conteúdo em slides menores
            conteudo_secao = '\n'.join(linhas[1:])

            # Split por subsecções (###)
            subsecoes = re.split(r'###+ ', conteudo_secao)

            for subsecao in subsecoes:
                if subsecao.strip():
                    titulo_sub = subsecao.split('\n')[0].strip()
                    corpo = '\n'.join(subsecao.split('\n')[1:]).strip()

                    # Converter markdown básico para HTML
                    corpo_html = converter_md_para_html(corpo)

                    if titulo_sub and corpo_html:
                        slide = f"""<section>
                            <h3>{titulo_sub}</h3>
                            {corpo_html}
                        </section>"""
                        slides.append(slide)

        elif "ATIVIDADES" in titulo_secao.upper():
            slide = f"""<section>
                <h2>💻 Atividades Práticas</h2>
                {converter_md_para_html('\n'.join(linhas[1:]))}
            </section>"""
            slides.append(slide)

    # Slide de Resumo
    slide_resumo = """<section>
        <h2>📝 Resumo da Aula</h2>
        <ul>
            <li>Reforçamos os conceitos principais</li>
            <li>Praticamos com exemplos reais</li>
            <li>Desenvolvemos habilidades práticas</li>
            <li>Identificamos aplicações profissionais</li>
        </ul>
        <p style="margin-top: 2em; color: #0055b3; font-weight: bold;">Próxima Aula: Veja o plano de aulas para o próximo tópico</p>
    </section>"""
    slides.append(slide_resumo)

    # Slide de Referências
    slide_refs = """<section>
        <h2>📚 Referências e Recursos</h2>
        <ul>
            <li>SENAI. Departamento Nacional. Raciocínio Lógico e Análise de Dados.</li>
            <li>SENAI. Departamento Nacional. Planilha Eletrônica.</li>
            <li>Materiais complementares disponíveis na pasta MATERIAIS/</li>
            <li>Exercícios práticos em arquivos Excel fornecidos</li>
        </ul>
        <p style="margin-top: 2em; text-align: center; color: #666;">
            <strong>Dúvidas?</strong> Consulte seu professor ou os materiais de apoio.
        </p>
    </section>"""
    slides.append(slide_refs)

    conteudo_slides = '\n'.join(slides)

    return HTML_TEMPLATE.format(
        titulo=titulo_aula,
        slides=conteudo_slides
    )

def converter_md_para_html(markdown):
    """Converte markdown simples para HTML"""
    html = markdown

    # Negrito
    html = re.sub(r'\*\*([^*]+)\*\*', r'<strong>\1</strong>', html)

    # Itálico
    html = re.sub(r'\*([^*]+)\*', r'<em>\1</em>', html)

    # Listas (simples)
    html = re.sub(r'^\s*[-•]\s+(.+)$', r'<li>\1</li>', html, flags=re.MULTILINE)
    html = re.sub(r'(<li>.*?</li>)', r'<ul>\1</ul>', html, flags=re.DOTALL)

    # Código inline
    html = re.sub(r'`([^`]+)`', r'<code>\1</code>', html)

    # Parágrafos
    linhas = html.split('\n')
    html_lines = []
    para_aberto = False

    for linha in linhas:
        if linha.strip().startswith('<'):
            if para_aberto:
                html_lines.append('</p>')
                para_aberto = False
            html_lines.append(linha)
        elif linha.strip():
            if not para_aberto:
                html_lines.append('<p>')
                para_aberto = True
            html_lines.append(linha)
        else:
            if para_aberto:
                html_lines.append('</p>')
                para_aberto = False

    if para_aberto:
        html_lines.append('</p>')

    return '\n'.join(html_lines)

def processar_aulas():
    """Processa todas as aulas e gera slides HTML"""
    arquivos_md = sorted(AULAS_DIR.glob("AULA-*.md"))

    print(f"✨ Encontradas {len(arquivos_md)} aulas para processar\n")

    for idx, arquivo_md in enumerate(arquivos_md, 1):
        # Extrair número da aula
        match = re.search(r'AULA-(\d+)', arquivo_md.name)
        if not match:
            continue

        numero = int(match.group(1))

        # Ler conteúdo
        with open(arquivo_md, 'r', encoding='utf-8') as f:
            conteudo = f.read()

        # Extrair informações
        info = extrair_info_aula(conteudo)

        # Gerar HTML
        html = gerar_slides_html(numero, info['titulo'], conteudo)

        # Salvar arquivo
        nome_arquivo = f"AULA-{numero:03d}-{info['titulo'].replace(':', '').replace('/', '-')[:50]}.html"
        caminho_saida = AULAS_DIR / nome_arquivo

        with open(caminho_saida, 'w', encoding='utf-8') as f:
            f.write(html)

        print(f"✅ [{idx}/16] Gerado: {nome_arquivo}")

    print(f"\n✨ Processamento concluído! 16 slides HTML gerados.")

if __name__ == "__main__":
    processar_aulas()
