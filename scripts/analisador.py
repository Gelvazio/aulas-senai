#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Analisador de Estrutura de Aulas e UCs

Lê a pasta sistema/ e gera relatório atualizado em geradoraulas.json
"""

import json
import os
from pathlib import Path
from datetime import datetime
from collections import defaultdict


def contar_palavras(texto):
    """Conta palavras em um texto"""
    if not texto:
        return 0
    return len(texto.split())


def calcular_tempo_leitura(num_palavras, velocidade=200):
    """Calcula tempo de leitura em minutos (padrão 200 palavras/min)"""
    if num_palavras == 0:
        return 0
    return max(1, round(num_palavras / velocidade))


def verificar_existencia(caminho):
    """Verifica se um arquivo/pasta existe"""
    return Path(caminho).exists()


def procurar_arquivo(diretorio, padrao):
    """Procura por arquivo com padrão no diretório"""
    dir_path = Path(diretorio)
    if not dir_path.exists():
        return None

    for arquivo in dir_path.glob(f"{padrao}*"):
        if arquivo.is_file():
            return arquivo
    return None


def contar_aulas(pasta_aulas):
    """Conta número de arquivos de aulas em AULAS/"""
    if not Path(pasta_aulas).exists():
        return 0

    # Conta arquivos .md que começam com AULA
    aulas = list(Path(pasta_aulas).glob("AULA-*.md"))
    return len(aulas)


def calcular_tempo_leitura_pasta(pasta_aulas):
    """Calcula tempo total de leitura de todas as aulas"""
    if not Path(pasta_aulas).exists():
        return 0

    tempo_total = 0
    for arquivo_aula in Path(pasta_aulas).glob("AULA-*.md"):
        try:
            with open(arquivo_aula, 'r', encoding='utf-8') as f:
                conteudo = f.read()
                num_palavras = contar_palavras(conteudo)
                tempo_aula = calcular_tempo_leitura(num_palavras)
                tempo_total += tempo_aula
        except Exception as e:
            print(f"Aviso: Erro ao ler {arquivo_aula}: {e}")

    return tempo_total


def analisar_uc(caminho_uc, nome_uc):
    """Analisa uma Unidade Curricular e retorna seus dados"""
    pasta_aulas = Path(caminho_uc) / "AULAS"
    pasta_materiais = Path(caminho_uc) / "MATERIAIS"
    ementa = procurar_arquivo(caminho_uc, "EMENTA-")

    num_aulas = contar_aulas(pasta_aulas)
    tempo_leitura = calcular_tempo_leitura_pasta(pasta_aulas)

    return {
        "nome": nome_uc,
        "ementa": 1 if ementa else 0,
        "aulasgeradas": 1 if num_aulas > 0 else 0,
        "aulas": num_aulas,
        "tempo_leitura": tempo_leitura
    }


def analisar_curso(caminho_curso, nome_curso):
    """Analisa um curso e suas matérias/UCs"""
    materias = []
    ementa_geral = 0
    aulas_geradas_geral = 0

    # Procura EMENTA na raiz do curso
    ementa_curso = procurar_arquivo(caminho_curso, "EMENTA-")
    if ementa_curso:
        ementa_geral = 1

    # Procura por subpastas (Matérias/UCs)
    # Estrutura: CURSO/MATERIA/AULAS/, CURSO/MATERIA/MATERIAIS/, etc.
    for item in sorted(Path(caminho_curso).iterdir()):
        if not item.is_dir():
            continue

        # Ignora pastas especiais
        if item.name in ['.claude', '.vscode', '.git', '__pycache__', 'assets', 'GERADOR-AULAS']:
            continue

        # Verifica se é uma pasta de Matéria (tem AULAS e/ou MATERIAIS e/ou EMENTA)
        tem_aulas = (item / "AULAS").exists()
        tem_materiais = (item / "MATERIAIS").exists()
        tem_ementa = list(item.glob("EMENTA-*"))

        # Uma matéria válida tem pelo menos uma dessas estruturas
        if tem_aulas or tem_materiais or tem_ementa:
            uc_data = analisar_uc(item, item.name)
            materias.append(uc_data)
            if uc_data["aulasgeradas"]:
                aulas_geradas_geral = 1

    return {
        "nome": nome_curso,
        "ementa": ementa_geral,
        "aulasgeradas": aulas_geradas_geral,
        "data_atualizacao": datetime.now().strftime("%Y-%m-%d"),
        "materias": materias
    }


def analisar_sistema():
    """Analisa toda a pasta sistema/ e retorna lista de cursos"""
    pasta_sistema = Path("sistema")

    if not pasta_sistema.exists():
        print("❌ Erro: Pasta 'sistema/' não encontrada!")
        return []

    cursos = []

    # Procura por pastas (cursos) em sistema/
    for item in sorted(pasta_sistema.iterdir()):
        if not item.is_dir():
            continue

        # Ignora pastas especiais
        if item.name in ['.claude', '.vscode', '.git', '__pycache__', 'assets', 'GERADOR-AULAS']:
            continue

        print(f"📚 Analisando curso: {item.name}")
        curso_data = analisar_curso(item, item.name)
        cursos.append(curso_data)

    return cursos


def salvar_json(dados, caminho="geradoraulas.json"):
    """Salva dados em arquivo JSON formatado"""
    caminho_json = Path(caminho)

    with open(caminho_json, 'w', encoding='utf-8') as f:
        json.dump(dados, f, ensure_ascii=False, indent=2)

    print(f"\n✅ Arquivo '{caminho}' salvo com sucesso!")


def exibir_relatorio(cursos):
    """Exibe relatório formatado dos cursos analisados"""
    print("\n" + "="*70)
    print("📊 RELATÓRIO DE ANÁLISE - SISTEMA DE AULAS")
    print("="*70)

    total_cursos = len(cursos)
    total_ucs = sum(len(c["materias"]) for c in cursos)
    total_aulas = sum(sum(m["aulas"] for m in c["materias"]) for c in cursos)
    total_tempo = sum(sum(m["tempo_leitura"] for m in c["materias"]) for c in cursos)

    print(f"\n📈 Estatísticas Gerais:")
    print(f"   • Total de Cursos: {total_cursos}")
    print(f"   • Total de UCs/Matérias: {total_ucs}")
    print(f"   • Total de Aulas: {total_aulas}")
    print(f"   • Tempo Total de Leitura: {total_tempo} minutos ({total_tempo//60}h {total_tempo%60}m)")

    print(f"\n📚 Cursos Analisados:")
    for curso in cursos:
        print(f"\n   {curso['nome']}:")
        print(f"      • Ementa Geral: {'✅ Sim' if curso['ementa'] else '❌ Não'}")
        print(f"      • Aulas Geradas: {'✅ Sim' if curso['aulasgeradas'] else '❌ Não'}")
        print(f"      • Matérias/UCs: {len(curso['materias'])}")

        if curso['materias']:
            for materia in curso['materias']:
                status_ementa = "✅" if materia['ementa'] else "❌"
                status_aulas = "✅" if materia['aulasgeradas'] else "❌"
                print(f"         • {materia['nome']}: {status_ementa} ementa | {status_aulas} aulas ({materia['aulas']} arquivos, {materia['tempo_leitura']}min)")

    print("\n" + "="*70)


def main():
    """Função principal"""
    print("🔍 Iniciando análise de sistema/...\n")

    # Analisar sistema
    cursos = analisar_sistema()

    if not cursos:
        print("⚠️ Nenhum curso foi encontrado!")
        return

    # Exibir relatório
    exibir_relatorio(cursos)

    # Salvar JSON
    salvar_json(cursos)

    print("\n✅ Análise concluída com sucesso!")


if __name__ == "__main__":
    main()
