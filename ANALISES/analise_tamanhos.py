# -*- coding: utf-8 -*-
"""
analise_tamanhos.py — Analisador de tamanho de pastas e arquivos do projeto.

Percorre recursivamente a raiz do projeto e reporta, para cada pasta e arquivo:
    NOME  •  LOCAL (caminho relativo)  •  TAMANHO

Saidas geradas em ANALISES/relatorios/:
    - relatorio-tamanhos.md    (relatorio legivel)
    - pastas.csv               (todas as pastas: nome, local, tamanho, n de arquivos)
    - arquivos.csv             (todos os arquivos: nome, local, tamanho, extensao)
    - resumo.json              (dados agregados para uso por outras ferramentas)

Uso:
    C:\\Python314\\python.exe ANALISES/analise_tamanhos.py
    C:\\Python314\\python.exe ANALISES/analise_tamanhos.py --raiz . --top 40
    C:\\Python314\\python.exe ANALISES/analise_tamanhos.py --incluir-ocultas
    C:\\Python314\\python.exe ANALISES/analise_tamanhos.py --duplicados
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import json
import os
import sys
from collections import defaultdict
from datetime import datetime

# Pastas ignoradas por padrao (ruido: dependencias, temporarios, controle de versao)
IGNORAR_PADRAO = {
    ".git",
    ".tmp.driveupload",
    ".tmp.drivedownload",
    "node_modules",
    "__pycache__",
    ".venv",
    "venv",
    ".idea",
}


def formatar(tamanho):
    """Converte bytes em string legivel (B, KB, MB, GB)."""
    valor = float(tamanho)
    for unidade in ("B", "KB", "MB", "GB", "TB"):
        if valor < 1024 or unidade == "TB":
            return "%.2f %s" % (valor, unidade)
        valor /= 1024
    return "%.2f TB" % valor


def eh_oculta(nome):
    return nome.startswith(".")


def coletar(raiz, ignorar, incluir_ocultas):
    """Varre a arvore de diretorios e devolve (pastas, arquivos).

    pastas:   lista de dicts {nome, local, tamanho_proprio, tamanho_total, qtd_arquivos}
    arquivos: lista de dicts {nome, local, pasta, tamanho, extensao}
    """
    arquivos = []
    proprio = {}        # bytes dos arquivos diretamente na pasta
    qtd_direta = {}
    filhas = defaultdict(list)

    for atual, subpastas, nomes in os.walk(raiz):
        # poda: remove in-place as pastas que nao devem ser visitadas
        subpastas[:] = [
            s for s in subpastas
            if s not in ignorar and (incluir_ocultas or not eh_oculta(s))
        ]

        rel_atual = os.path.relpath(atual, raiz).replace("\\", "/")

        soma = 0
        conta = 0
        for nome in nomes:
            if not incluir_ocultas and eh_oculta(nome):
                continue
            caminho = os.path.join(atual, nome)
            try:
                tamanho = os.path.getsize(caminho)
            except OSError:
                continue  # arquivo removido/bloqueado durante a varredura
            soma += tamanho
            conta += 1
            ext = os.path.splitext(nome)[1]
            arquivos.append({
                "nome": nome,
                "local": os.path.relpath(caminho, raiz).replace("\\", "/"),
                "pasta": rel_atual,
                "tamanho": tamanho,
                "extensao": ext.lower() or "(sem extensao)",
            })

        proprio[rel_atual] = soma
        qtd_direta[rel_atual] = conta
        for sub in subpastas:
            rel_sub = os.path.relpath(os.path.join(atual, sub), raiz).replace("\\", "/")
            filhas[rel_atual].append(rel_sub)

    # tamanho total (pasta + descendentes), do mais profundo para o mais raso
    total = {}
    total_qtd = {}
    for rel in sorted(proprio, key=lambda p: p.count("/"), reverse=True):
        total[rel] = proprio[rel] + sum(total.get(f, 0) for f in filhas[rel])
        total_qtd[rel] = qtd_direta[rel] + sum(total_qtd.get(f, 0) for f in filhas[rel])

    pastas = []
    for rel in proprio:
        pastas.append({
            "nome": "." if rel == "." else rel.rsplit("/", 1)[-1],
            "local": rel,
            "nivel": 0 if rel == "." else rel.count("/") + 1,
            "tamanho_proprio": proprio[rel],
            "tamanho_total": total[rel],
            "qtd_arquivos_direta": qtd_direta[rel],
            "qtd_arquivos_total": total_qtd[rel],
        })

    return pastas, arquivos


def achar_duplicados(arquivos, raiz, minimo):
    """Agrupa arquivos identicos (mesmo tamanho + mesmo MD5) acima de `minimo` bytes."""
    por_tamanho = defaultdict(list)
    for a in arquivos:
        if a["tamanho"] >= minimo:
            por_tamanho[a["tamanho"]].append(a)

    grupos = []
    for tamanho, itens in por_tamanho.items():
        if len(itens) < 2:
            continue  # tamanho unico nao pode ter duplicata
        por_hash = defaultdict(list)
        for a in itens:
            try:
                h = hashlib.md5()
                with open(os.path.join(raiz, a["local"]), "rb") as fh:
                    for bloco in iter(lambda: fh.read(1 << 20), b""):
                        h.update(bloco)
                por_hash[h.hexdigest()].append(a)
            except OSError:
                continue
        for hash_, iguais in por_hash.items():
            if len(iguais) > 1:
                grupos.append({
                    "hash": hash_,
                    "tamanho": tamanho,
                    "copias": len(iguais),
                    "desperdicio": tamanho * (len(iguais) - 1),
                    "locais": [i["local"] for i in iguais],
                })
    grupos.sort(key=lambda g: g["desperdicio"], reverse=True)
    return grupos


def gravar_csv(caminho, linhas, colunas):
    with open(caminho, "w", newline="", encoding="utf-8-sig") as fh:
        escritor = csv.DictWriter(fh, fieldnames=colunas, extrasaction="ignore")
        escritor.writeheader()
        escritor.writerows(linhas)


def main():
    padrao_raiz = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    ap = argparse.ArgumentParser(
        description="Analisa tamanho, local e nome de pastas e arquivos.")
    ap.add_argument("--raiz", default=padrao_raiz,
                    help="Pasta raiz a analisar (padrao: raiz do projeto)")
    ap.add_argument("--top", type=int, default=30,
                    help="Quantidade de itens nos rankings (padrao: 30)")
    ap.add_argument("--nivel", type=int, default=2,
                    help="Profundidade da arvore de pastas no relatorio (padrao: 2)")
    ap.add_argument("--incluir-ocultas", action="store_true",
                    help="Inclui pastas e arquivos iniciados por ponto")
    ap.add_argument("--duplicados", action="store_true",
                    help="Procura arquivos identicos (mais lento)")
    ap.add_argument("--min-dup", type=int, default=1048576,
                    help="Tamanho minimo em bytes para duplicados (padrao: 1 MB)")
    ap.add_argument("--saida", default=None, help="Pasta de saida dos relatorios")
    args = ap.parse_args()

    raiz = os.path.abspath(args.raiz)
    if not os.path.isdir(raiz):
        sys.stderr.write("ERRO: pasta inexistente: %s\n" % raiz)
        return 1

    saida = args.saida or os.path.join(
        os.path.dirname(os.path.abspath(__file__)), "relatorios")
    os.makedirs(saida, exist_ok=True)

    print("Analisando: %s" % raiz)
    pastas, arquivos = coletar(raiz, IGNORAR_PADRAO, args.incluir_ocultas)

    total_bytes = sum(a["tamanho"] for a in arquivos)
    print("  %d pastas | %d arquivos | %s" % (len(pastas), len(arquivos), formatar(total_bytes)))

    duplicados = []
    if args.duplicados:
        print("Procurando duplicados...")
        duplicados = achar_duplicados(arquivos, raiz, args.min_dup)
        print("  %d grupos de arquivos identicos" % len(duplicados))

    # --- agregacoes ---
    por_ext = defaultdict(lambda: {"bytes": 0, "qtd": 0})
    for a in arquivos:
        por_ext[a["extensao"]]["bytes"] += a["tamanho"]
        por_ext[a["extensao"]]["qtd"] += 1
    ranking_ext = sorted(por_ext.items(), key=lambda kv: kv[1]["bytes"], reverse=True)

    maiores_arquivos = sorted(arquivos, key=lambda a: a["tamanho"], reverse=True)[:args.top]
    maiores_pastas = sorted(
        [p for p in pastas if p["local"] != "."],
        key=lambda p: p["tamanho_total"], reverse=True,
    )[:args.top]
    arvore = sorted(
        [p for p in pastas if p["local"] != "." and p["nivel"] <= args.nivel],
        key=lambda p: p["local"],
    )

    # --- CSVs ---
    gravar_csv(
        os.path.join(saida, "pastas.csv"),
        sorted(pastas, key=lambda p: p["tamanho_total"], reverse=True),
        ["nome", "local", "nivel", "tamanho_total", "tamanho_proprio",
         "qtd_arquivos_total", "qtd_arquivos_direta"],
    )
    gravar_csv(
        os.path.join(saida, "arquivos.csv"),
        sorted(arquivos, key=lambda a: a["tamanho"], reverse=True),
        ["nome", "local", "pasta", "tamanho", "extensao"],
    )

    # --- JSON ---
    with open(os.path.join(saida, "resumo.json"), "w", encoding="utf-8") as fh:
        json.dump({
            "gerado_em": datetime.now().isoformat(timespec="seconds"),
            "raiz": raiz,
            "total_bytes": total_bytes,
            "total_pastas": len(pastas),
            "total_arquivos": len(arquivos),
            "por_extensao": dict(ranking_ext),
            "maiores_pastas": maiores_pastas,
            "maiores_arquivos": maiores_arquivos,
            "duplicados": duplicados,
        }, fh, ensure_ascii=False, indent=2)

    # --- Markdown ---
    md = []
    md.append("# Analise de Tamanho - Pastas e Arquivos\n")
    md.append("**Raiz:** `%s`  " % raiz)
    md.append("**Gerado em:** %s  " % datetime.now().strftime("%d/%m/%Y %H:%M:%S"))
    md.append("**Total:** %s em %d arquivos e %d pastas  "
              % (formatar(total_bytes), len(arquivos), len(pastas)))
    md.append("**Ignorado:** %s\n" % ", ".join(sorted(IGNORAR_PADRAO)))

    md.append("\n## 1. Maiores pastas (top %d)\n" % args.top)
    md.append("| # | Nome | Local | Tamanho | Arquivos |")
    md.append("|---|------|-------|---------|----------|")
    for i, p in enumerate(maiores_pastas, 1):
        md.append("| %d | %s | `%s` | %s | %d |"
                  % (i, p["nome"], p["local"], formatar(p["tamanho_total"]), p["qtd_arquivos_total"]))

    md.append("\n## 2. Maiores arquivos (top %d)\n" % args.top)
    md.append("| # | Nome | Local | Tamanho |")
    md.append("|---|------|-------|---------|")
    for i, a in enumerate(maiores_arquivos, 1):
        md.append("| %d | %s | `%s` | %s |"
                  % (i, a["nome"], a["local"], formatar(a["tamanho"])))

    md.append("\n## 3. Peso por tipo de arquivo\n")
    md.append("| Extensao | Arquivos | Tamanho | % do total |")
    md.append("|----------|----------|---------|-----------|")
    for ext, v in ranking_ext[:args.top]:
        pct = (v["bytes"] * 100.0 / total_bytes) if total_bytes else 0
        md.append("| `%s` | %d | %s | %.1f%% |" % (ext, v["qtd"], formatar(v["bytes"]), pct))

    md.append("\n## 4. Arvore de pastas (ate nivel %d)\n" % args.nivel)
    md.append("| Pasta | Local | Tamanho | Arquivos |")
    md.append("|-------|-------|---------|----------|")
    for p in arvore:
        recuo = "&nbsp;&nbsp;&nbsp;&nbsp;" * (p["nivel"] - 1)
        md.append("| %s%s | `%s` | %s | %d |"
                  % (recuo, p["nome"], p["local"], formatar(p["tamanho_total"]), p["qtd_arquivos_total"]))

    if args.duplicados:
        desperdicio = sum(g["desperdicio"] for g in duplicados)
        md.append("\n## 5. Arquivos duplicados (>= %s)\n" % formatar(args.min_dup))
        md.append("**Espaco recuperavel:** %s em %d grupos\n" % (formatar(desperdicio), len(duplicados)))
        for g in duplicados[:args.top]:
            md.append("- **%s x %d copias** (desperdicio %s)"
                      % (formatar(g["tamanho"]), g["copias"], formatar(g["desperdicio"])))
            for local in g["locais"]:
                md.append("  - `%s`" % local)

    caminho_md = os.path.join(saida, "relatorio-tamanhos.md")
    with open(caminho_md, "w", encoding="utf-8") as fh:
        fh.write("\n".join(md) + "\n")

    print("\nRelatorios gerados:")
    for nome in ("relatorio-tamanhos.md", "pastas.csv", "arquivos.csv", "resumo.json"):
        print("  %s" % os.path.join(saida, nome))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
