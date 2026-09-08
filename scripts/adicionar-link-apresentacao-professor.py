#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Adiciona link para apresentacao-professor.html em todos os index.html de AULAS
"""

import re
from pathlib import Path

def adicionar_link_apresentacao(caminho_html):
    """Adiciona link para apresentacao-professor.html no header"""

    with open(caminho_html, 'r', encoding='utf-8') as f:
        conteudo = f.read()

    # Verificar se o link já existe
    if 'apresentacao-professor.html' in conteudo:
        return False, "Link já existe"

    # Estratégia 1: Procurar pelo div com class="mt-4 pt-4 border-t" e adicionar antes de </div>
    padrao1 = r'(<div class="mt-4 pt-4 border-t"[^>]*>)(.*?)(</div>)'

    def substituir1(match):
        abertura = match.group(1)
        conteudo_interno = match.group(2)
        fechamento = match.group(3)
        novo_link = f'''
        <a href="apresentacao-professor.html" target="_blank" class="inline-flex bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition items-center gap-2 mt-2">
          👨‍💼 Apresentação do Professor
        </a>'''
        return f"{abertura}{conteudo_interno}{novo_link}\n      {fechamento}"

    # Estratégia 2: Adicionar depois do header
    padrao2 = r'(</header>)'

    def substituir2(match):
        return f'''
    <div class="mt-6 flex gap-2">
      <a href="apresentacao-professor.html" target="_blank" class="inline-flex bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition items-center gap-2">
        👨‍💼 Apresentação do Professor
      </a>
    </div>
{match.group(1)}'''

    # Tentar primeira estratégia
    conteudo_novo = re.sub(padrao1, substituir1, conteudo, count=1, flags=re.DOTALL)

    if conteudo_novo == conteudo:
        # Se não funcionou, tentar segunda estratégia
        conteudo_novo = re.sub(padrao2, substituir2, conteudo, count=1, flags=re.DOTALL)

    # Se o conteúdo mudou, salvar
    if conteudo_novo != conteudo:
        with open(caminho_html, 'w', encoding='utf-8') as f:
            f.write(conteudo_novo)
        return True, "Link adicionado"
    else:
        return False, "Nenhuma alteração"

def main():
    """Processa todos os index.html em pastas AULAS"""

    base_dir = Path(r"C:\fontes\aulas-senai\sistema")

    # Encontrar todos os index.html em pastas AULAS
    index_files = list(base_dir.glob("**/AULAS/index.html"))

    print(f"🔍 Encontrados {len(index_files)} arquivos index.html\n")

    sucesso = 0
    ja_existe = 0
    erro = 0

    for caminho in sorted(index_files):
        try:
            resultado, mensagem = adicionar_link_apresentacao(str(caminho))

            if resultado:
                print(f"✅ {caminho.parent.parent.name}")
                sucesso += 1
            else:
                if "já existe" in mensagem:
                    print(f"⏭️  {caminho.parent.parent.name} (link já existe)")
                    ja_existe += 1
                else:
                    print(f"⚠️  {caminho.parent.parent.name} ({mensagem})")
                    erro += 1
        except Exception as e:
            print(f"❌ {caminho.parent.parent.name} — Erro: {e}")
            erro += 1

    print(f"\n📊 Resumo:")
    print(f"   ✅ Adicionados: {sucesso}")
    print(f"   ⏭️  Já existentes: {ja_existe}")
    print(f"   ⚠️  Erros: {erro}")
    print(f"   📈 Total: {sucesso + ja_existe + erro}/{len(index_files)}")

if __name__ == '__main__':
    main()
