#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ANALISADOR FINAL - Versão Consolidada v4
Detecta automaticamente estrutura REAL de cursos, matérias, aulas e ementas

Estrutura Suportada:
  SISTEMA/
  ├── CURSO-DIRETO/              (tem matérias diretas)
  │   ├── MATERIA-01/
  │   │   ├── AULAS/
  │   │   ├── AVALIACOES/
  │   │   └── EMENTA-*.md
  │   └── MATERIA-02/
  │       ├── AULAS/
  │       ├── AVALIACOES/
  │       └── EMENTA-*.md
  │
  └── CONTEINER/                 (contém subcursos)
      ├── SUBCURSO-01/           (cada um com matérias)
      │   └── MATERIA-A/
      │       ├── AULAS/
      │       ├── AVALIACOES/
      │       └── EMENTA-*.md
      └── SUBCURSO-02/
          └── MATERIA-B/
"""

import json
import os
from pathlib import Path
from datetime import datetime


def contar_palavras(texto):
    """Conta palavras em um texto"""
    if not texto:
        return 0
    return len(texto.split())


def calcular_tempo_leitura(num_palavras, velocidade=200):
    """Calcula tempo de leitura em minutos"""
    if num_palavras == 0:
        return 0
    return max(1, round(num_palavras / velocidade))


def contar_aulas(pasta_aulas):
    """Conta arquivos de aulas"""
    if not Path(pasta_aulas).exists():
        return 0
    aulas = list(Path(pasta_aulas).glob("AULA-*.md"))
    return len(aulas)


def calcular_tempo_leitura_pasta(pasta_aulas):
    """Calcula tempo total de leitura de aulas"""
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
        except:
            pass

    return tempo_total


def procurar_ementa(caminho):
    """Procura por EMENTA-*.md ou EMENTA-PRINCIPAL-*.md"""
    ementa = list(Path(caminho).glob("EMENTA-*.md"))
    if not ementa:
        ementa = list(Path(caminho).glob("EMENTA-PRINCIPAL-*.md"))
    return 1 if ementa else 0


def analisar_materia(caminho_materia, nome_materia):
    """Analisa uma matéria/UC"""
    pasta_aulas = Path(caminho_materia) / "AULAS"
    pasta_avaliacoes = Path(caminho_materia) / "AVALIACOES"

    num_aulas = contar_aulas(pasta_aulas)
    tempo_leitura = calcular_tempo_leitura_pasta(pasta_aulas)
    ementa = procurar_ementa(caminho_materia)
    avaliacoes = 1 if pasta_avaliacoes.exists() else 0

    return {
        "nome": nome_materia,
        "ementa": ementa,
        "aulasgeradas": 1 if num_aulas > 0 else 0,
        "avaliacoesgeradas": avaliacoes,
        "aulas": num_aulas,
        "tempo_leitura": tempo_leitura
    }


def eh_materia_valida(caminho):
    """Verifica se é uma pasta de matéria válida"""
    tem_aulas = (Path(caminho) / "AULAS").exists()
    tem_avaliacoes = (Path(caminho) / "AVALIACOES").exists()
    tem_ementa = procurar_ementa(caminho)

    return tem_aulas or tem_avaliacoes or tem_ementa


def eh_curso_valido(caminho):
    """Verifica se uma pasta é um curso (tem matérias diretas)"""
    excluir = {'.claude', '.vscode', '.git', '__pycache__', 'assets', 'GERADOR-AULAS'}

    for item in Path(caminho).iterdir():
        if not item.is_dir() or item.name in excluir:
            continue

        if eh_materia_valida(item):
            return True

    return False


def eh_conteiner_valido(caminho):
    """Verifica se é um contêiner de cursos (tem subcursos)"""
    excluir = {'.claude', '.vscode', '.git', '__pycache__', 'assets', 'GERADOR-AULAS'}

    for item in Path(caminho).iterdir():
        if not item.is_dir() or item.name in excluir:
            continue

        if eh_curso_valido(item):
            return True

    return False


def analisar_curso(caminho_curso, nome_curso):
    """Analisa um curso e suas matérias"""
    materias = []
    aulas_geradas_geral = 0
    ementa_geral = procurar_ementa(caminho_curso)

    excluir = {'.claude', '.vscode', '.git', '__pycache__', 'assets', 'GERADOR-AULAS'}

    for item in sorted(Path(caminho_curso).iterdir()):
        if not item.is_dir() or item.name in excluir:
            continue

        if eh_materia_valida(item):
            materia_data = analisar_materia(item, item.name)
            materias.append(materia_data)
            if materia_data["aulasgeradas"]:
                aulas_geradas_geral = 1

    return {
        "nome": nome_curso,
        "ementa": ementa_geral,
        "aulasgeradas": aulas_geradas_geral,
        "data_atualizacao": datetime.now().strftime("%Y-%m-%d"),
        "materias": materias
    }


def analisar_conteiner(caminho_conteiner, nome_conteiner):
    """Analisa um contêiner de cursos"""
    subcursos = []
    excluir = {'.claude', '.vscode', '.git', '__pycache__', 'assets', 'GERADOR-AULAS'}

    for item in sorted(Path(caminho_conteiner).iterdir()):
        if not item.is_dir() or item.name in excluir:
            continue

        if eh_curso_valido(item):
            subcurso_data = analisar_curso(item, item.name)
            subcursos.append(subcurso_data)

    return {
        "tipo": "conteiner",
        "nome": nome_conteiner,
        "data_atualizacao": datetime.now().strftime("%Y-%m-%d"),
        "subcursos": subcursos
    }


def analisar_sistema():
    """Analisa toda a pasta sistema/ diferenciando cursos e contêineres"""
    pasta_sistema = Path("sistema")
    excluir = {'.claude', 'assets', 'GERADOR-AULAS', '.vscode', '.git', '__pycache__'}

    resultado = {
        "tipo": "analise_completa",
        "data_analise": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "cursos": [],
        "conteineres": []
    }

    for item in sorted(pasta_sistema.iterdir()):
        if not item.is_dir() or item.name in excluir:
            continue

        print(f"🔍 {item.name}...", end=" ")

        if eh_conteiner_valido(item):
            print("(CONTÊINER)")
            conteiner_data = analisar_conteiner(item, item.name)
            resultado["conteineres"].append(conteiner_data)
        elif eh_curso_valido(item):
            print("(CURSO)")
            curso_data = analisar_curso(item, item.name)
            resultado["cursos"].append(curso_data)
        else:
            print("(IGNORADO)")

    return resultado


def salvar_json(dados, caminho="geradoraulas.json"):
    """Salva dados em JSON"""
    with open(caminho, 'w', encoding='utf-8') as f:
        json.dump(dados, f, ensure_ascii=False, indent=2)
    print(f"\n✅ Arquivo '{caminho}' salvo!")


def exibir_relatorio(dados):
    """Exibe relatório formatado"""
    print("\n" + "="*70)
    print("📊 RELATÓRIO FINAL - ANÁLISE COMPLETA")
    print("="*70)

    # Contar totais
    total_cursos = len(dados["cursos"])
    total_conteineres = len(dados["conteineres"])
    total_ucs = sum(len(c["materias"]) for c in dados["cursos"])

    for cont in dados["conteineres"]:
        for sc in cont["subcursos"]:
            total_ucs += len(sc["materias"])

    total_aulas = 0
    for c in dados["cursos"]:
        total_aulas += sum(m["aulas"] for m in c["materias"])
    for cont in dados["conteineres"]:
        for sc in cont["subcursos"]:
            total_aulas += sum(m["aulas"] for m in sc["materias"])

    total_tempo = 0
    for c in dados["cursos"]:
        total_tempo += sum(m["tempo_leitura"] for m in c["materias"])
    for cont in dados["conteineres"]:
        for sc in cont["subcursos"]:
            total_tempo += sum(m["tempo_leitura"] for m in sc["materias"])

    print(f"\n📈 Estatísticas Totais:")
    print(f"   • Cursos Diretos: {total_cursos}")
    print(f"   • Contêineres: {total_conteineres}")
    print(f"   • Total UCs/Matérias: {total_ucs}")
    print(f"   • Total Aulas: {total_aulas}")
    print(f"   • Tempo Total: {total_tempo} min ({total_tempo//60}h {total_tempo%60}m)")

    print(f"\n📚 Cursos Diretos:")
    for curso in dados["cursos"]:
        print(f"   {curso['nome']}: {len(curso['materias'])} matérias")

    print(f"\n📦 Contêineres:")
    for cont in dados["conteineres"]:
        print(f"   {cont['nome']}:")
        for sc in cont["subcursos"]:
            print(f"      • {sc['nome']}: {len(sc['materias'])} matérias")

    print("\n" + "="*70)


def main():
    print("🔍 Iniciando análise FINAL v4...\n")
    dados = analisar_sistema()
    exibir_relatorio(dados)
    salvar_json(dados)
    print("✅ Análise finalizada!")


if __name__ == "__main__":
    main()
