#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ANALISADOR DE ESTRUTURA - Lê sistema/ e gera geradoraulas.json

ESTRUTURA SUPORTADA:
  SISTEMA/
  ├── CURSO-DIRETO/                    (contém matérias diretas)
  │   ├── MATERIA/
  │   │   ├── AULAS/                   (arquivos AULA-*.md)
  │   │   ├── AVALIACOES/
  │   │   └── EMENTA-*.md
  │   └── MATERIA-2/
  │       ├── AULAS/
  │       ├── AVALIACOES/
  │       └── EMENTA-*.md
  │
  └── CONTEINER/                       (contém subcursos com matérias)
      ├── SUBCURSO-1/
      │   ├── MATERIA/
      │   │   ├── AULAS/
      │   │   ├── AVALIACOES/
      │   │   └── EMENTA-*.md
      │   └── MATERIA-2/
      └── SUBCURSO-2/
          └── MATERIA/

ESTRUTURA DO JSON GERADO:
{
  "cursos": [
    {
      "nome": "CURSO-NAME",
      "ementa": 1,                      (0/1 = não tem / tem)
      "aulasgeradas": 1,                (0/1)
      "avaliacoesgeradas": 1,           (0/1)
      "data_atualizacao": "2026-09-07",
      "materias": [
        {
          "nome": "MATERIA-NAME",
          "ementa": 1,
          "aulasgeradas": 1,
          "avaliacoesgeradas": 1,
          "aulas": 10,                  (número de arquivos AULA-*.md)
          "tempo_leitura": 97           (minutos a 200 palavras/min)
        }
      ]
    }
  ],
  "conteineres": [
    {
      "tipo": "conteiner",
      "nome": "CONTEINER-NAME",
      "data_atualizacao": "2026-09-07",
      "subcursos": [
        {
          "nome": "SUBCURSO-NAME",
          "ementa": 1,
          "aulasgeradas": 1,
          "data_atualizacao": "2026-09-07",
          "materias": [...]
        }
      ]
    }
  ]
}

COMO USAR:
  python analisador.py                 # Analisa sistema/ e gera geradoraulas.json
"""

import json
from pathlib import Path
from datetime import datetime


def contar_palavras(texto):
    if not texto:
        return 0
    return len(texto.split())


def calcular_tempo_leitura(num_palavras, velocidade=200):
    if num_palavras == 0:
        return 0
    return max(1, round(num_palavras / velocidade))


def contar_aulas(pasta_aulas):
    if not Path(pasta_aulas).exists():
        return 0
    return len(list(Path(pasta_aulas).glob("AULA-*.md")))


def calcular_tempo_pasta_aulas(pasta_aulas):
    if not Path(pasta_aulas).exists():
        return 0
    tempo_total = 0
    for arquivo in Path(pasta_aulas).glob("AULA-*.md"):
        try:
            with open(arquivo, 'r', encoding='utf-8') as f:
                tempo_total += calcular_tempo_leitura(contar_palavras(f.read()))
        except:
            pass
    return tempo_total


def tem_ementa(caminho):
    ementa = list(Path(caminho).glob("EMENTA-*.md"))
    if not ementa:
        ementa = list(Path(caminho).glob("EMENTA-PRINCIPAL-*.md"))
    return 1 if ementa else 0


def analisar_materia(caminho, nome):
    aulas = Path(caminho) / "AULAS"
    avaliacoes = Path(caminho) / "AVALIACOES"
    return {
        "nome": nome,
        "ementa": tem_ementa(caminho),
        "aulasgeradas": 1 if contar_aulas(aulas) > 0 else 0,
        "avaliacoesgeradas": 1 if avaliacoes.exists() else 0,
        "aulas": contar_aulas(aulas),
        "tempo_leitura": calcular_tempo_pasta_aulas(aulas)
    }


def eh_materia(caminho):
    aulas = (Path(caminho) / "AULAS").exists()
    avaliacoes = (Path(caminho) / "AVALIACOES").exists()
    ementa = tem_ementa(caminho)
    return aulas or avaliacoes or ementa


def eh_curso(caminho):
    excluir = {'.claude', '.vscode', '.git', '__pycache__', 'assets', 'GERADOR-AULAS'}
    for item in Path(caminho).iterdir():
        if item.is_dir() and item.name not in excluir and eh_materia(item):
            return True
    return False


def eh_conteiner(caminho):
    excluir = {'.claude', '.vscode', '.git', '__pycache__', 'assets', 'GERADOR-AULAS'}
    for item in Path(caminho).iterdir():
        if item.is_dir() and item.name not in excluir and eh_curso(item):
            return True
    return False


def analisar_curso(caminho, nome):
    materias = []
    aulas_geral = 0
    excluir = {'.claude', '.vscode', '.git', '__pycache__', 'assets', 'GERADOR-AULAS'}

    for item in sorted(Path(caminho).iterdir()):
        if item.is_dir() and item.name not in excluir and eh_materia(item):
            mat = analisar_materia(item, item.name)
            materias.append(mat)
            if mat["aulasgeradas"]:
                aulas_geral = 1

    return {
        "nome": nome,
        "ementa": tem_ementa(caminho),
        "aulasgeradas": aulas_geral,
        "data_atualizacao": datetime.now().strftime("%Y-%m-%d"),
        "materias": materias
    }


def analisar_conteiner(caminho, nome):
    subcursos = []
    excluir = {'.claude', '.vscode', '.git', '__pycache__', 'assets', 'GERADOR-AULAS'}

    for item in sorted(Path(caminho).iterdir()):
        if item.is_dir() and item.name not in excluir and eh_curso(item):
            subcursos.append(analisar_curso(item, item.name))

    return {
        "tipo": "conteiner",
        "nome": nome,
        "data_atualizacao": datetime.now().strftime("%Y-%m-%d"),
        "subcursos": subcursos
    }


def main():
    # Usar caminho relativo correto (sobe um nível de scripts/ para aulas-senai/)
    pasta_sistema = Path(__file__).parent.parent / "sistema"
    excluir = {'.claude', 'assets', 'GERADOR-AULAS', '.vscode', '.git', '__pycache__'}

    print(f"🔍 Analisando {pasta_sistema}...\n")

    resultado = {"cursos": [], "conteineres": []}

    for item in sorted(pasta_sistema.iterdir()):
        if not item.is_dir() or item.name in excluir:
            continue

        print(f"  {item.name}...", end=" ")
        if eh_conteiner(item):
            print("(CONTÊINER)")
            resultado["conteineres"].append(analisar_conteiner(item, item.name))
        elif eh_curso(item):
            print("(CURSO)")
            resultado["cursos"].append(analisar_curso(item, item.name))
        else:
            print("(ignorado)")

    # Gerar relatório
    total_cursos = len(resultado["cursos"])
    total_conteineres = len(resultado["conteineres"])
    total_ucs = sum(len(c["materias"]) for c in resultado["cursos"])
    total_ucs += sum(sum(len(sc["materias"]) for sc in c["subcursos"]) for c in resultado["conteineres"])
    total_aulas = sum(sum(m["aulas"] for m in c["materias"]) for c in resultado["cursos"])
    total_aulas += sum(sum(sum(m["aulas"] for m in sc["materias"]) for sc in c["subcursos"]) for c in resultado["conteineres"])

    print("\n" + "="*70)
    print(f"📊 Cursos: {total_cursos} | Contêineres: {total_conteineres}")
    print(f"📚 UCs: {total_ucs} | Aulas: {total_aulas}")
    print("="*70)

    # Salvar JSON na pasta raiz do projeto
    json_path = Path(__file__).parent.parent / "geradoraulas.json"
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(resultado["cursos"] + resultado["conteineres"], f, ensure_ascii=False, indent=2)

    print(f"✅ {json_path} atualizado!")


if __name__ == "__main__":
    main()
