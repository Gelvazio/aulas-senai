#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Adiciona atividades em formato de oficina a cada 5 slides em aulas de TIC
"""

import re
from pathlib import Path

def contar_slides(conteudo_html):
    """Conta quantos toggle-items (slides) existem no conteúdo"""
    pattern = r'<div class="toggle-item'
    matches = re.findall(pattern, conteudo_html)
    return len(matches)

def gerar_atividade_oficina(numero_oficina, topicos):
    """Gera HTML de uma atividade em formato de oficina"""
    topicos_html = "\n".join([f"        <li>{topico}</li>" for topico in topicos])

    return f'''
  <div class="oficina-item bg-orange-50 border-l-4 border-orange-500 p-6 mb-6 rounded-lg">
    <h3 class="text-xl font-bold text-orange-900 mb-3">🏭 OFICINA {numero_oficina} — Atividade Prática</h3>
    <p class="text-gray-700 mb-4"><strong>Objetivo:</strong> Aplicar os conceitos aprendidos nos últimos slides através de uma atividade prática em grupo.</p>

    <p class="text-gray-700 mb-3"><strong>📋 Procedimento:</strong></p>
    <ul class="list-disc list-inside space-y-2 text-gray-700 mb-4">
{topicos_html}
    </ul>

    <p class="text-gray-700 mb-3"><strong>⏱️ Duração:</strong> 30 minutos</p>

    <p class="text-gray-700 mb-3"><strong>📝 Entrega:</strong> Registre os resultados em um documento e compartilhe com o professor.</p>

    <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4 rounded">
      <p class="text-sm text-yellow-800"><strong>💡 Dica:</strong> Trabalhe em grupo, discuta os resultados e tire dúvidas com o professor.</p>
    </div>
  </div>
'''

def adicionar_oficinas_tic(caminho_html):
    """Adiciona atividades de oficina a cada 5 slides em aulas de TIC"""

    with open(caminho_html, 'r', encoding='utf-8') as f:
        conteudo = f.read()

    # Verificar se já tem oficinas
    if 'class="oficina-item' in conteudo:
        return False, "Oficinas já existem"

    # Contar slides/toggle-items
    num_slides = contar_slides(conteudo)

    if num_slides == 0:
        return False, "Nenhum slide encontrado"

    # Calcular quantas oficinas adicionar
    num_oficinas = (num_slides + 4) // 5  # Arredonda para cima

    # Gerar oficinas
    oficinas_html = ""
    topicos_generi = [
        "Discuta em grupo os pontos principais deste bloco de aulas",
        "Crie um exemplo prático relacionado ao tema",
        "Identifique possíveis aplicações no dia a dia",
        "Compartilhe sua experiência com a turma"
    ]

    for i in range(1, num_oficinas + 1):
        oficinas_html += gerar_atividade_oficina(i, topicos_generi)

    # Encontrar a seção de atividades e substituir o conteúdo vazio
    padrao_atividades = r'(<!-- ABA 3: ATIVIDADES -->.*?<section id="atividades"[^>]*>.*?<h2[^>]*>.*?</h2>.*?<div class="prose[^>]*>)(.*?)(</div>\s*</section>)'

    def substituir_atividades(match):
        inicio = match.group(1)
        fim = match.group(3)
        return f'{inicio}\n{oficinas_html}\n        {fim}'

    conteudo_novo = re.sub(padrao_atividades, substituir_atividades, conteudo, count=1, flags=re.DOTALL)

    if conteudo_novo == conteudo:
        return False, "Padrão de atividades não encontrado"

    # Salvar arquivo atualizado
    with open(caminho_html, 'w', encoding='utf-8') as f:
        f.write(conteudo_novo)

    return True, f"{num_oficinas} oficina(s) adicionada(s) para {num_slides} slide(s)"

def main():
    """Processa todas as aulas de TIC"""

    base_dir = Path(r"C:\fontes\aulas-senai\sistema")

    # Encontrar aulas de TIC (INTRODUCAO-TIC e INTRODUCAO-TI-COMUNICACAO)
    padrao_tic = [
        "OPERADOR-PRODUCAO-INDUSTRIAL/INTRODUCAO-TIC/AULAS",
        "AUTOMACAO-INDUSTRIAL-1200-HORAS/MATERIAS/SEMESTRE_1º_PERIODO/MATERIA_INTRODUCAO-TI-COMUNICACAO/AULAS",
    ]

    arquivos_tic = []

    for padrao in padrao_tic:
        glob_pattern = str(base_dir / padrao / "AULA-*.html")
        arquivos_encontrados = list(base_dir.glob(padrao.replace("/", "\\") + "\\AULA-*.html"))
        arquivos_tic.extend(arquivos_encontrados)

    print(f"🔍 Encontradas {len(arquivos_tic)} aulas de TIC\n")

    sucesso = 0
    ja_existe = 0
    nao_encontrado = 0
    erro = 0

    for caminho in sorted(arquivos_tic):
        try:
            resultado, mensagem = adicionar_oficinas_tic(str(caminho))

            if resultado:
                print(f"✅ {caminho.name} — {mensagem}")
                sucesso += 1
            else:
                if "já existem" in mensagem:
                    print(f"⏭️  {caminho.name} (oficinas já existem)")
                    ja_existe += 1
                elif "Nenhum" in mensagem or "não encontrado" in mensagem:
                    print(f"⚠️  {caminho.name} ({mensagem})")
                    nao_encontrado += 1
                else:
                    print(f"⚠️  {caminho.name} ({mensagem})")
                    erro += 1
        except Exception as e:
            print(f"❌ {caminho.name} — Erro: {e}")
            erro += 1

    print(f"\n📊 Resumo:")
    print(f"   ✅ Aulas atualizadas: {sucesso}")
    print(f"   ⏭️  Com oficinas: {ja_existe}")
    print(f"   ⚠️  Sem conteúdo/padrão: {nao_encontrado}")
    print(f"   ❌ Erros: {erro}")
    print(f"   📈 Total: {sucesso + ja_existe + nao_encontrado + erro}/{len(arquivos_tic)}")

if __name__ == '__main__':
    main()
