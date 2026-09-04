# -*- coding: utf-8 -*-
"""Gera as ilustracoes originais da Apostila de Exploracao de Carreiras."""
import os, math
from PIL import Image, ImageDraw, ImageFont

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "img")
os.makedirs(OUT, exist_ok=True)

# ---------------- paleta ----------------
BORDO   = (74, 14, 42)
BORDO2  = (122, 34, 71)
BORDO3  = (158, 62, 100)
AMBAR   = (255, 179, 0)
AMBAR_E = (179, 116, 0)
CREME   = (255, 248, 235)
AZUL    = (27, 108, 168)
AZUL_C  = (208, 231, 247)
VERDE   = (46, 158, 91)
VERDE_C = (214, 242, 226)
LARANJA = (230, 81, 0)
ROXO    = (106, 61, 154)
CINZA   = (110, 105, 108)
CINZA_C = (238, 234, 236)
BRANCO  = (255, 255, 255)
PRETO   = (26, 26, 26)

F = "C:/Windows/Fonts/segoeui.ttf"
FB = "C:/Windows/Fonts/segoeuib.ttf"
FSB = "C:/Windows/Fonts/seguisb.ttf"
FEMJ = "C:/Windows/Fonts/seguiemj.ttf"

def f(sz, bold=False, semi=False):
    p = FB if bold else (FSB if semi else F)
    return ImageFont.truetype(p, sz)

def emj(sz):
    return ImageFont.truetype(FEMJ, sz)

def novo(w=1600, h=900, bg=BRANCO):
    im = Image.new("RGB", (w, h), bg)
    return im, ImageDraw.Draw(im)

def rr(d, box, r, fill=None, outline=None, w=0):
    d.rounded_rectangle(box, radius=r, fill=fill, outline=outline, width=w)

def txt(d, xy, s, font, fill=PRETO, anchor="la"):
    d.text(xy, s, font=font, fill=fill, anchor=anchor)

def icone(im, xy, ch, sz, anchor="mm"):
    """Desenha um pictograma colorido (Segoe UI Emoji)."""
    d = ImageDraw.Draw(im)
    try:
        d.text(xy, ch, font=emj(sz), embedded_color=True, anchor=anchor)
    except Exception:
        d.text(xy, ch, font=f(sz), fill=BORDO, anchor=anchor)

def quebra(d, s, font, maxw):
    palavras, linhas, atual = s.split(), [], ""
    for p in palavras:
        teste = (atual + " " + p).strip()
        if d.textlength(teste, font=font) <= maxw:
            atual = teste
        else:
            if atual: linhas.append(atual)
            atual = p
    if atual: linhas.append(atual)
    return linhas

def bloco_texto(d, xy, s, font, fill, maxw, lh):
    x, y = xy
    for ln in quebra(d, s, font, maxw):
        d.text((x, y), ln, font=font, fill=fill)
        y += lh
    return y

def faixa_titulo(im, d, titulo, sub="", h=120, cor=BORDO):
    W = im.size[0]
    d.rectangle([0, 0, W, h], fill=cor)
    d.rectangle([0, h, W, h + 7], fill=AMBAR)
    txt(d, (56, h // 2 - (16 if sub else 0)), titulo, f(42, bold=True), BRANCO, "lm")
    if sub:
        txt(d, (56, h // 2 + 24), sub, f(24), (235, 214, 224), "lm")

def salvar(im, nome):
    p = os.path.join(OUT, nome)
    im.save(p, "PNG", optimize=True)
    print("  ok:", nome, im.size)

# =======================================================================
# 01 - CAPA
# =======================================================================
def img_capa():
    W, H = 1600, 950
    im, d = novo(W, H, BORDO)
    # malha de circuito de fundo
    for i in range(0, W + 200, 90):
        d.line([(i, 0), (i - 260, H)], fill=(92, 26, 58), width=2)
    for j in range(0, H, 90):
        d.line([(0, j), (W, j)], fill=(88, 24, 55), width=1)
    for i in range(0, W, 180):
        for j in range(0, H, 180):
            d.ellipse([i - 5, j - 5, i + 5, j + 5], fill=(120, 40, 76))
    # halo
    d.ellipse([1080, -180, 1780, 520], outline=(150, 60, 96), width=3)
    d.ellipse([1160, -100, 1700, 440], outline=(130, 46, 82), width=2)

    txt(d, (90, 110), "RIO DO SUL MAIS TECH", f(30, bold=True), AMBAR)
    txt(d, (90, 156), "SENAI  |  PREFEITURA MUNICIPAL DE RIO DO SUL", f(22), (219, 190, 205))
    d.rectangle([90, 210, 330, 216], fill=AMBAR)

    txt(d, (90, 300), "EXPLORAÇÃO DE", f(78, bold=True), BRANCO)
    txt(d, (90, 392), "CARREIRAS", f(78, bold=True), AMBAR)
    txt(d, (90, 484), "INDUSTRIAIS E", f(78, bold=True), BRANCO)
    txt(d, (90, 576), "TECNOLÓGICAS", f(78, bold=True), BRANCO)

    d.rectangle([90, 700, 700, 704], fill=(150, 60, 96))
    txt(d, (90, 730), "APOSTILA DO ALUNO  ·  36 HORAS  ·  18 ENCONTROS", f(27, semi=True), (232, 208, 220))
    txt(d, (90, 778), "Alunos do 8º e 9º ano do Ensino Fundamental", f(23), (196, 165, 182))

    for k, ch in enumerate(["⚙️", "🤖", "💻", "🔌", "🏭", "🚀"]):
        icone(im, (1180 + (k % 3) * 150, 300 + (k // 3) * 160), ch, 108)
    salvar(im, "01_capa.png")

# =======================================================================
# 02 - VENN AUTOCONHECIMENTO
# =======================================================================
def img_venn():
    im, d = novo(1600, 980, CREME)
    faixa_titulo(im, d, "QUEM SOU EU EM 3 CÍRCULOS", "A interseção revela a sua vocação")
    cx, cy, r = 800, 560, 250
    centros = [(cx, cy - 150), (cx - 210, cy + 130), (cx + 210, cy + 130)]
    cores = [(AZUL, AZUL_C), (VERDE, VERDE_C), (AMBAR_E, (255, 236, 196))]
    for (x, y), (borda, _) in zip(centros, cores):
        d.ellipse([x - r, y - r, x + r, y + r], outline=borda, width=6)
    rotulos = [
        ("O QUE EU SEI FAZER BEM", "montar · programar · desenhar · organizar", (cx, cy - 330), AZUL),
        ("O QUE EU GOSTO DE FAZER", "jogar · criar · ajudar pessoas", (cx - 400, cy + 400), VERDE),
        ("O QUE O MUNDO PRECISA", "tecnologia · saúde · indústria · segurança", (cx + 400, cy + 400), AMBAR_E),
    ]
    for tit, sub, (x, y), cor in rotulos:
        txt(d, (x, y), tit, f(27, bold=True), cor, "mm")
        txt(d, (x, y + 34), sub, f(20), CINZA, "mm")
    icone(im, (cx, cy + 30), "🎯", 88)
    txt(d, (cx, cy + 120), "VOCAÇÃO", f(26, bold=True), BORDO, "mm")
    salvar(im, "02_venn_autoconhecimento.png")

# =======================================================================
# 03 - LINHA DO TEMPO DAS REVOLUCOES
# =======================================================================
def img_revolucoes():
    im, d = novo(1600, 760, BRANCO)
    faixa_titulo(im, d, "AS QUATRO REVOLUÇÕES INDUSTRIAIS", "De 1760 até agora — e você está bem aqui")
    y = 400
    d.rectangle([90, y - 4, 1510, y + 4], fill=CINZA_C)
    etapas = [
        ("1.0", "1760", "Vapor e\nmecanização", "🏭", AZUL),
        ("2.0", "1870", "Eletricidade e\nprodução em massa", "💡", VERDE),
        ("3.0", "1969", "Computadores e\nautomação", "🖥️", LARANJA),
        ("4.0", "2011", "IoT, IA e\nfábricas conectadas", "🤖", BORDO2),
    ]
    xs = [270, 640, 1010, 1380]
    for (n, ano, desc, ch, cor), x in zip(etapas, xs):
        d.ellipse([x - 58, y - 58, x + 58, y + 58], fill=cor)
        txt(d, (x, y), n, f(38, bold=True), BRANCO, "mm")
        icone(im, (x, y - 145), ch, 86)
        txt(d, (x, y + 90), ano, f(30, bold=True), cor, "mm")
        for i, ln in enumerate(desc.split("\n")):
            txt(d, (x, y + 132 + i * 30), ln, f(21), CINZA, "mm")
    d.polygon([(1470, y), (1440, y - 18), (1440, y + 18)], fill=BORDO)
    rr(d, [1120, 640, 1520, 720], 14, fill=(255, 244, 220), outline=AMBAR, w=3)
    txt(d, (1320, 680), "VOCÊ ESTÁ AQUI  ⬆", f(24, bold=True), BORDO, "mm")
    salvar(im, "03_revolucoes_industriais.png")

# =======================================================================
# 04 - PILARES DA INDUSTRIA 4.0
# =======================================================================
def img_pilares():
    im, d = novo(1600, 1000, CREME)
    faixa_titulo(im, d, "OS 8 PILARES DA INDÚSTRIA 4.0", "As tecnologias que estão mudando as fábricas")
    itens = [
        ("IoT", "Máquinas conectadas\ntrocando dados", "📡", AZUL),
        ("Big Data", "Análise de enormes\nvolumes de dados", "📊", VERDE),
        ("Inteligência\nArtificial", "Sistemas que\naprendem sozinhos", "🧠", ROXO),
        ("Impressão 3D", "Objetos criados a\npartir de modelos", "🖨️", LARANJA),
        ("Nuvem", "Dados processados\npela internet", "☁️", AZUL),
        ("Robótica", "Cobots trabalham\nao lado de humanos", "🦾", BORDO2),
        ("Realidade\nAumentada", "Simulação para\ntreinar e projetar", "🥽", ROXO),
        ("Cibersegurança", "Proteção digital\nda fábrica", "🔒", VERDE),
    ]
    x0, y0, cw, ch_, gx, gy = 80, 200, 350, 350, 20, 20
    for k, (tit, desc, ico, cor) in enumerate(itens):
        cx = x0 + (k % 4) * (cw + gx)
        cy = y0 + (k // 4) * (ch_ + gy)
        rr(d, [cx, cy, cx + cw, cy + ch_], 22, fill=BRANCO, outline=CINZA_C, w=2)
        d.rectangle([cx, cy, cx + cw, cy + 8], fill=cor)
        icone(im, (cx + cw // 2, cy + 88), ico, 78)
        yy = cy + 145
        for ln in tit.split("\n"):
            txt(d, (cx + cw // 2, yy), ln, f(28, bold=True), cor, "mm"); yy += 34
        yy += 8
        for ln in desc.split("\n"):
            txt(d, (cx + cw // 2, yy), ln, f(20), CINZA, "mm"); yy += 28
    salvar(im, "04_pilares_industria40.png")

# =======================================================================
# 05 - EMPREGOS: AUTOMACAO
# =======================================================================
def img_empregos():
    im, d = novo(1600, 820, BRANCO)
    faixa_titulo(im, d, "AUTOMAÇÃO ATÉ 2027: O QUE ACONTECE COM OS EMPREGOS?",
                 "Fórum Econômico Mundial (2023) — Future of Jobs Report")
    base = 700
    barras = [("EMPREGOS\nELIMINADOS", 83, LARANJA, 430), ("EMPREGOS\nCRIADOS", 69, VERDE, 900)]
    escala = 4.6
    for nome, val, cor, x in barras:
        alt = int(val * escala)
        rr(d, [x - 110, base - alt, x + 110, base], 12, fill=cor)
        txt(d, (x, base - alt - 42), f"{val} milhões", f(38, bold=True), cor, "mm")
        yy = base + 26
        for ln in nome.split("\n"):
            txt(d, (x, yy), ln, f(24, bold=True), PRETO, "mm"); yy += 30
    d.line([(150, base), (1450, base)], fill=CINZA_C, width=4)
    rr(d, [1080, 300, 1500, 620], 20, fill=(255, 244, 220), outline=AMBAR, w=3)
    icone(im, (1290, 372), "💡", 62)
    txt(d, (1290, 440), "O QUE ISSO SIGNIFICA", f(25, bold=True), BORDO, "mm")
    d2 = ImageDraw.Draw(im)
    y = 480
    for ln in ["As novas vagas exigem mais", "qualificação — e pagam melhor.", "Quem se prepara, ganha a vaga."]:
        txt(d2, (1290, y), ln, f(21), (90, 70, 80), "mm"); y += 32
    icone(im, (300, 250), "🤖", 92)
    icone(im, (1000, 250), "🧑‍🔧", 92)
    salvar(im, "05_automacao_empregos.png")

# =======================================================================
# 06 - CARREIRAS INDUSTRIAIS (mecanica / eletrotecnica)
# =======================================================================
def card_carreira(im, d, box, ico, titulo, itens, faixa, cor):
    x0, y0, x1, y1 = box
    rr(d, box, 24, fill=BRANCO, outline=CINZA_C, w=2)
    d.rectangle([x0, y0, x1, y0 + 10], fill=cor)
    icone(im, (x0 + 78, y0 + 92), ico, 76)
    txt(d, (x0 + 140, y0 + 66), titulo, f(31, bold=True), cor)
    txt(d, (x0 + 140, y0 + 108), faixa, f(23, bold=True), AMBAR_E)
    y = y0 + 170
    for it in itens:
        d.ellipse([x0 + 44, y + 8, x0 + 56, y + 20], fill=AMBAR)
        y = bloco_texto(d, (x0 + 74, y), it, f(21), (70, 60, 66), x1 - x0 - 120, 28) + 10

def img_indust1():
    im, d = novo(1600, 900, CREME)
    faixa_titulo(im, d, "CARREIRAS INDUSTRIAIS I", "Mecânica Industrial e Eletrotécnica")
    card_carreira(im, d, [70, 200, 780, 840], "🔧", "Técnico em Mecânica Industrial",
                  ["Monta, ajusta e calibra máquinas e equipamentos",
                   "Faz manutenção preventiva e corretiva",
                   "Interpreta desenhos técnicos e manuais",
                   "Trabalha em metalúrgicas, alimentícias, têxteis e automotivas",
                   "Formação: técnico SENAI (2 anos) → engenharia mecânica"],
                  "R$ 2.500 a R$ 4.500", AZUL)
    card_carreira(im, d, [820, 200, 1530, 840], "⚡", "Técnico em Eletrotécnica",
                  ["Instala e mantém sistemas elétricos industriais",
                   "Lê e interpreta projetos elétricos",
                   "Faz medições e testes em equipamentos",
                   "Garante conformidade com a norma NR-10",
                   "Trabalha em indústrias, construtoras, energia e data centers"],
                  "R$ 2.800 a R$ 5.000", LARANJA)
    salvar(im, "06_carreiras_industriais_1.png")

# =======================================================================
# 07 - CLP: sensor -> CLP -> atuador
# =======================================================================
def img_clp():
    im, d = novo(1600, 700, BRANCO)
    faixa_titulo(im, d, "COMO FUNCIONA UM CLP", "O “cérebro” que comanda as máquinas da fábrica")
    caixas = [
        (150, "ENTRADA", "Sensores\n(botão, temperatura,\npresença)", "🔘", AZUL),
        (640, "CLP", "Processa a lógica\nprogramada", "🧠", BORDO2),
        (1130, "SAÍDA", "Atuadores\n(motor, válvula,\nlâmpada)", "⚙️", VERDE),
    ]
    for x, tit, desc, ico, cor in caixas:
        rr(d, [x, 230, x + 330, 560], 22, fill=BRANCO, outline=cor, w=4)
        d.rectangle([x, 230, x + 330, 240], fill=cor)
        icone(im, (x + 165, 310), ico, 70)
        txt(d, (x + 165, 380), tit, f(30, bold=True), cor, "mm")
        yy = 420
        for ln in desc.split("\n"):
            txt(d, (x + 165, yy), ln, f(21), CINZA, "mm"); yy += 30
    for x in (500, 990):
        d.line([(x, 395), (x + 110, 395)], fill=AMBAR, width=8)
        d.polygon([(x + 140, 395), (x + 105, 375), (x + 105, 415)], fill=AMBAR)
    txt(d, (800, 620), "Exemplo: o sensor detecta a peça  →  o CLP decide  →  o motor empurra a peça para a caixa",
        f(23, semi=True), BORDO, "mm")
    salvar(im, "07_clp_fluxo.png")

# =======================================================================
# 08 - FRONT-END x BACK-END
# =======================================================================
def img_front_back():
    im, d = novo(1600, 880, CREME)
    faixa_titulo(im, d, "FRONT-END, BACK-END E FULL STACK", "Quem constrói o que você usa no celular")
    # navegador
    rr(d, [90, 210, 740, 780], 20, fill=BRANCO, outline=AZUL, w=4)
    d.rectangle([90, 210, 740, 268], fill=AZUL)
    for i, c in enumerate([(255, 95, 86), (255, 189, 46), (39, 201, 63)]):
        d.ellipse([120 + i * 34, 230, 140 + i * 34, 250], fill=c)
    txt(d, (415, 310), "FRONT-END", f(34, bold=True), AZUL, "mm")
    txt(d, (415, 352), "o que o usuário VÊ e CLICA", f(22), CINZA, "mm")
    icone(im, (415, 440), "🎨", 74)
    for i, s in enumerate(["Telas, botões e cores", "HTML · CSS · JavaScript", "React, Vue, Angular"]):
        txt(d, (415, 530 + i * 44), s, f(22), (70, 60, 66), "mm")
    rr(d, [230, 690, 600, 750], 14, fill=AZUL_C)
    txt(d, (415, 720), "Ex.: a tela de login do banco", f(21, semi=True), AZUL, "mm")
    # servidor
    rr(d, [860, 210, 1510, 780], 20, fill=BRANCO, outline=ROXO, w=4)
    d.rectangle([860, 210, 1510, 268], fill=ROXO)
    txt(d, (1185, 239), "SERVIDOR", f(22, bold=True), BRANCO, "mm")
    txt(d, (1185, 310), "BACK-END", f(34, bold=True), ROXO, "mm")
    txt(d, (1185, 352), "a lógica que ninguém vê", f(22), CINZA, "mm")
    icone(im, (1185, 440), "🗄️", 74)
    for i, s in enumerate(["Regras, cálculos e segurança", "Python · Java · C# · Node", "Banco de dados e APIs"]):
        txt(d, (1185, 530 + i * 44), s, f(22), (70, 60, 66), "mm")
    rr(d, [1000, 690, 1370, 750], 14, fill=(235, 225, 245))
    txt(d, (1185, 720), "Ex.: conferir a senha e o saldo", f(21, semi=True), ROXO, "mm")
    # seta full stack
    d.line([(760, 480), (840, 480)], fill=AMBAR, width=8)
    d.polygon([(760, 480), (790, 462), (790, 498)], fill=AMBAR)
    d.polygon([(840, 480), (810, 462), (810, 498)], fill=AMBAR)
    rr(d, [640, 800, 960, 860], 16, fill=AMBAR)
    txt(d, (800, 830), "FULL STACK = os dois", f(24, bold=True), BORDO, "mm")
    salvar(im, "08_front_back.png")

# =======================================================================
# 09 - SALARIOS TI (barras horizontais)
# =======================================================================
def img_salarios_ti():
    im, d = novo(1600, 820, BRANCO)
    faixa_titulo(im, d, "FAIXAS SALARIAIS EM TECNOLOGIA", "Valores médios de mercado — variam por empresa e região")
    dados = [
        ("Desenvolvedor júnior", 4, 8, AZUL),
        ("Analista de segurança", 6, 18, VERDE),
        ("Cientista de dados", 8, 20, ROXO),
        ("Analista de IA", 10, 25, BORDO2),
        ("Desenvolvedor sênior", 12, 25, LARANJA),
    ]
    x0, esc, y = 520, 38, 240
    for i in range(0, 30, 5):
        gx = x0 + i * esc
        d.line([(gx, 210), (gx, 720)], fill=CINZA_C, width=2)
        txt(d, (gx, 745), f"R$ {i} mil", f(19), CINZA, "mm")
    for nome, mn, mx, cor in dados:
        txt(d, (490, y + 26), nome, f(24, semi=True), PRETO, "ra")
        rr(d, [x0 + mn * esc, y, x0 + mx * esc, y + 52], 12, fill=cor)
        txt(d, (x0 + mn * esc + 14, y + 26), f"{mn}k", f(21, bold=True), BRANCO, "lm")
        txt(d, (x0 + mx * esc - 14, y + 26), f"{mx}k", f(21, bold=True), BRANCO, "rm")
        y += 96
    salvar(im, "09_salarios_ti.png")

# =======================================================================
# 10 - PROFISSOES DO FUTURO
# =======================================================================
def img_futuro():
    im, d = novo(1600, 900, CREME)
    faixa_titulo(im, d, "PROFISSÕES DO FUTURO", "Carreiras que seus pais nunca imaginaram")
    itens = [
        ("Engenheiro de IA Ética", "Garante que a IA seja justa e transparente", "⚖️", ROXO),
        ("Designer de Realidade Aumentada", "Cria ambientes imersivos para ensinar e curar", "🥽", AZUL),
        ("Especialista em Fazendas Verticais", "Cultiva alimentos em prédios urbanos", "🌱", VERDE),
        ("Técnico em Biofabricação", "Imprime tecidos e órgãos em 3D", "🧬", BORDO2),
        ("Gestor de Bem-Estar Digital", "Equilibra vida digital e vida real", "🧘", LARANJA),
        ("Especialista em Energia Renovável", "Projeta sistemas solares e eólicos", "☀️", AMBAR_E),
    ]
    x0, y0, cw, ch_, g = 80, 210, 470, 300, 24
    for k, (tit, desc, ico, cor) in enumerate(itens):
        cx = x0 + (k % 3) * (cw + g); cy = y0 + (k // 3) * (ch_ + g)
        rr(d, [cx, cy, cx + cw, cy + ch_], 22, fill=BRANCO, outline=CINZA_C, w=2)
        d.rectangle([cx, cy, cx + 10, cy + ch_], fill=cor)
        icone(im, (cx + 78, cy + 84), ico, 62)
        yy = cy + 54
        for ln in quebra(d, tit, f(26, bold=True), cw - 170):
            txt(d, (cx + 132, yy), ln, f(26, bold=True), cor); yy += 34
        bloco_texto(d, (cx + 44, cy + 168), desc, f(21), (80, 70, 76), cw - 90, 30)
    salvar(im, "10_profissoes_futuro.png")

# =======================================================================
# 11 - HARD x SOFT SKILLS
# =======================================================================
def img_skills():
    im, d = novo(1600, 860, BRANCO)
    faixa_titulo(im, d, "HARD SKILLS × SOFT SKILLS", "O mercado quer as duas — e as soft são as mais raras")
    for x0, tit, ico, cor, itens in [
        (90, "HARD SKILLS", "🛠️", AZUL, ["Programar em Python", "Soldar componentes", "Ler desenho técnico",
                                          "Operar um CLP", "Falar inglês", "Usar Excel e Word"]),
        (830, "SOFT SKILLS", "💬", VERDE, ["Trabalhar em equipe", "Comunicar com clareza", "Resolver problemas",
                                            "Ser resiliente", "Gerenciar o tempo", "Ter iniciativa"]),
    ]:
        rr(d, [x0, 200, x0 + 680, 700], 24, fill=BRANCO, outline=cor, w=4)
        d.rectangle([x0, 200, x0 + 680, 212], fill=cor)
        icone(im, (x0 + 90, 282), ico, 66)
        txt(d, (x0 + 155, 262), tit, f(34, bold=True), cor)
        txt(d, (x0 + 155, 306), "técnicas, se medem" if cor == AZUL else "comportamentais, se percebem",
            f(21), CINZA)
        y = 380
        for it in itens:
            d.ellipse([x0 + 50, y + 8, x0 + 62, y + 20], fill=AMBAR)
            txt(d, (x0 + 82, y), it, f(23), (66, 58, 62)); y += 48
    rr(d, [300, 740, 1300, 820], 18, fill=(255, 244, 220), outline=AMBAR, w=3)
    txt(d, (800, 780), "92% dos recrutadores dizem que as soft skills pesam tanto quanto as técnicas (LinkedIn)",
        f(23, semi=True), BORDO, "mm")
    salvar(im, "11_hard_soft_skills.png")

# =======================================================================
# 12 - ITINERARIOS FORMATIVOS
# =======================================================================
def img_itinerarios():
    im, d = novo(1600, 880, CREME)
    faixa_titulo(im, d, "DEPOIS DO 9º ANO: QUAIS SÃO OS CAMINHOS?", "Quatro itinerários formativos possíveis")
    rr(d, [640, 190, 960, 268], 18, fill=BORDO)
    txt(d, (800, 229), "VOCÊ, HOJE — 9º ANO", f(26, bold=True), BRANCO, "mm")
    caminhos = [
        ("Ensino Médio\nregular", "Formação geral\npara o vestibular", "3 anos", "📚", AZUL, 90),
        ("Ensino Médio\ntécnico integrado", "Formação geral\n+ técnica (SENAI/SESI)", "3 anos", "🏫", VERDE, 460),
        ("Curso técnico\nconcomitante", "Técnico junto com\no Ensino Médio", "1,5 a 2 anos", "🔧", LARANJA, 830),
        ("Jovem\nAprendiz", "Trabalha e aprende,\ncom carteira assinada", "14 a 24 anos", "💼", ROXO, 1200),
    ]
    for tit, desc, dur, ico, cor, x in caminhos:
        d.line([(800, 268), (x + 155, 330)], fill=CINZA_C, width=3)
        rr(d, [x, 330, x + 310, 780], 22, fill=BRANCO, outline=cor, w=3)
        d.rectangle([x, 330, x + 310, 340], fill=cor)
        icone(im, (x + 155, 410), ico, 64)
        yy = 470
        for ln in tit.split("\n"):
            txt(d, (x + 155, yy), ln, f(26, bold=True), cor, "mm"); yy += 34
        yy += 14
        for ln in desc.split("\n"):
            txt(d, (x + 155, yy), ln, f(20), CINZA, "mm"); yy += 28
        rr(d, [x + 70, 700, x + 240, 752], 14, fill=(255, 244, 220))
        txt(d, (x + 155, 726), dur, f(22, bold=True), AMBAR_E, "mm")
    txt(d, (800, 830), "Nenhum caminho fecha portas — todos levam ao ensino superior mais tarde.",
        f(23, semi=True), BORDO, "mm")
    salvar(im, "12_itinerarios.png")

# =======================================================================
# 13 - ANATOMIA DO CURRICULO
# =======================================================================
def img_curriculo():
    im, d = novo(1600, 1010, BRANCO)
    faixa_titulo(im, d, "ANATOMIA DE UM CURRÍCULO PARA JOVENS", "Uma página, seis blocos, zero enrolação")
    px, py, pw, ph = 120, 200, 660, 730
    rr(d, [px, py, px + pw, py + ph], 12, fill=(252, 252, 252), outline=CINZA_C, w=3)
    blocos = [
        ("1", "DADOS DE CONTATO", "Nome · telefone · e-mail sério · cidade", 24, 96, AZUL),
        ("2", "OBJETIVO PROFISSIONAL", "Uma frase: o que você busca agora", 130, 78, VERDE),
        ("3", "FORMAÇÃO", "Escola, ano e cursos como o Mais Tech", 218, 96, LARANJA),
        ("4", "HABILIDADES", "Hard skills e soft skills, sem exagero", 324, 108, ROXO),
        ("5", "EXPERIÊNCIAS", "Projetos, voluntariado, competições", 442, 108, BORDO2),
        ("6", "INFORMAÇÕES ADICIONAIS", "Idiomas e hobbies ligados à área", 560, 96, AMBAR_E),
    ]
    for num, tit, desc, dy, alt, cor in blocos:
        by = py + dy
        rr(d, [px + 22, by, px + pw - 22, by + alt], 10, fill=BRANCO, outline=cor, w=2)
        d.rectangle([px + 22, by, px + 32, by + alt], fill=cor)
        d.ellipse([px + 46, by + 14, px + 82, by + 50], fill=cor)
        txt(d, (px + 64, by + 32), num, f(22, bold=True), BRANCO, "mm")
        txt(d, (px + 98, by + 16), tit, f(23, bold=True), cor)
        txt(d, (px + 98, by + 48), desc, f(19), CINZA)
    # coluna do "nao faca"
    rr(d, [850, 200, 1520, 620], 22, fill=(253, 236, 239), outline=(179, 0, 60), w=3)
    icone(im, (910, 262), "🚫", 56)
    txt(d, (965, 240), "O QUE NÃO COLOCAR", f(30, bold=True), (150, 0, 50))
    y = 320
    for s in ["Signo, time de futebol, religião", "E-mail como “gatinhofofo@…”",
              "Foto, se a vaga não pedir", "Erros de português", "Mentiras e exageros"]:
        txt(d, (900, y), "×", f(30, bold=True), (179, 0, 60))
        txt(d, (940, y), s, f(23), (100, 40, 60)); y += 54
    rr(d, [850, 660, 1520, 975], 22, fill=VERDE_C, outline=VERDE, w=3)
    icone(im, (910, 722), "✅", 56)
    txt(d, (965, 700), "TUDO CONTA COMO EXPERIÊNCIA", f(26, bold=True), (20, 100, 60))
    y = 786
    for s in ["Projetos da escola e feiras de ciências", "Trabalho voluntário na comunidade",
              "Competições, olimpíadas e maratonas", "Cursos online, mesmo os gratuitos"]:
        txt(d, (900, y), "•", f(24, bold=True), VERDE)
        txt(d, (930, y), s, f(22), (40, 90, 66)); y += 44
    salvar(im, "13_curriculo.png")

# =======================================================================
# 14 - PERFIL LINKEDIN
# =======================================================================
def img_linkedin():
    im, d = novo(1600, 900, CREME)
    faixa_titulo(im, d, "COMO MONTAR UM BOM PERFIL PROFISSIONAL", "O modelo do LinkedIn, campo por campo")
    px, py, pw = 110, 210, 780
    rr(d, [px, py, px + pw, py + 640], 18, fill=BRANCO, outline=CINZA_C, w=3)
    d.rectangle([px, py, px + pw, py + 130], fill=(10, 102, 194))
    d.ellipse([px + 50, py + 70, px + 210, py + 230], fill=CREME, outline=BRANCO, width=8)
    icone(im, (px + 130, py + 150), "🧑‍🎓", 96)
    txt(d, (px + 240, py + 160), "Seu Nome Completo", f(34, bold=True), PRETO)
    txt(d, (px + 240, py + 208), "Estudante de TI | Entusiasta de tecnologia |", f(22, semi=True), (10, 102, 194))
    txt(d, (px + 240, py + 240), "Rio do Sul Mais Tech", f(22, semi=True), (10, 102, 194))
    txt(d, (px + 50, py + 300), "SOBRE", f(22, bold=True), BORDO)
    bloco_texto(d, (px + 50, py + 336),
                "Tenho 14 anos, estudo no 9º ano e participo do programa Rio do Sul Mais Tech. "
                "Descobri interesse por automação industrial e programação. Busco um programa de "
                "Jovem Aprendiz para começar na prática.", f(21), (70, 62, 68), pw - 100, 30)
    txt(d, (px + 50, py + 470), "FORMAÇÃO", f(22, bold=True), BORDO)
    txt(d, (px + 50, py + 506), "Ensino Fundamental — 9º ano", f(21), (70, 62, 68))
    txt(d, (px + 50, py + 540), "Rio do Sul Mais Tech — SENAI (36h)", f(21), (70, 62, 68))
    txt(d, (px + 50, py + 586), "HABILIDADES", f(22, bold=True), BORDO)
    tags = ["Lógica de programação", "Trabalho em equipe", "Python básico", "Comunicação"]
    tx = px + 50
    for t in tags:
        w = int(d.textlength(t, font=f(19))) + 34
        if tx + w > px + pw - 50: tx = px + 50
        rr(d, [tx, py + 620, tx + w, py + 660], 20, fill=(224, 238, 250))
        txt(d, (tx + w // 2, py + 640), t, f(19), (10, 102, 194), "mm")
        tx += w + 12
    # dicas
    rr(d, [950, 210, 1520, 850], 22, fill=BRANCO, outline=AMBAR, w=3)
    d.rectangle([950, 210, 1520, 222], fill=AMBAR)
    icone(im, (1010, 285), "💡", 54)
    txt(d, (1060, 262), "DICAS DE OURO", f(30, bold=True), BORDO)
    y = 350
    dicas = [("Foto", "rosto visível, fundo neutro, sorriso"),
             ("Headline", "diga o que você é e o que busca"),
             ("Sobre", "3 a 5 linhas, na primeira pessoa"),
             ("Conexões", "colegas, professores, profissionais"),
             ("Postura", "o que você posta te representa"),
             ("Idade", "perfil permitido a partir dos 16 anos")]
    for tit, desc in dicas:
        d.ellipse([980, y + 6, 998, y + 24], fill=AMBAR)
        txt(d, (1016, y), tit, f(23, bold=True), BORDO2)
        txt(d, (1016, y + 32), desc, f(20), CINZA); y += 82
    salvar(im, "14_linkedin.png")

# =======================================================================
# 15 - NETWORKING
# =======================================================================
def img_networking():
    im, d = novo(1600, 890, BRANCO)
    faixa_titulo(im, d, "SUA REDE DE CONTATOS VALE OURO", "Cerca de 70% das vagas são preenchidas por indicação")
    cx, cy = 640, 500
    nos = [("Família", -1.9), ("Professores", -1.25), ("Colegas", -0.6),
           ("Vizinhos", 0.05), ("Ex-alunos", 0.7), ("Palestrantes", 1.35), ("Empresas", 2.0)]
    pontos = []
    for nome, ang in nos:
        x = cx + int(320 * math.cos(ang)); y = cy + int(238 * math.sin(ang))
        pontos.append((x, y, nome))
    for x, y, _ in pontos:
        d.line([(cx, cy), (x, y)], fill=(226, 218, 222), width=3)
    for i in range(len(pontos) - 1):
        x1, y1, _ = pontos[i]; x2, y2, _ = pontos[i + 1]
        d.line([(x1, y1), (x2, y2)], fill=(240, 234, 237), width=2)
    for x, y, nome in pontos:
        d.ellipse([x - 46, y - 46, x + 46, y + 46], fill=CREME, outline=AMBAR, width=4)
        icone(im, (x, y), "👤", 46)
        txt(d, (x, y + 70), nome, f(21, semi=True), BORDO2, "mm")
    d.ellipse([cx - 70, cy - 70, cx + 70, cy + 70], fill=BORDO)
    txt(d, (cx, cy), "VOCÊ", f(26, bold=True), BRANCO, "mm")
    # pitch
    rr(d, [1110, 230, 1520, 800], 22, fill=(255, 244, 220), outline=AMBAR, w=3)
    icone(im, (1315, 305), "🗣️", 60)
    txt(d, (1315, 378), "ELEVATOR PITCH", f(28, bold=True), BORDO, "mm")
    txt(d, (1315, 416), "30 a 60 segundos", f(21), CINZA, "mm")
    y = bloco_texto(d, (1150, 470),
        "“Olá, me chamo Ana, tenho 14 anos e estou no 9º ano. Participo do Rio do Sul Mais Tech "
        "e estou me descobrindo em automação. Posso ouvir sobre a sua experiência na área?”",
        f(20, semi=True), (90, 70, 80), 330, 32)
    salvar(im, "15_networking.png")

# =======================================================================
# 16 - ENTREVISTA
# =======================================================================
def img_entrevista():
    im, d = novo(1600, 780, CREME)
    faixa_titulo(im, d, "A ENTREVISTA COMEÇA ANTES DE ENTRAR NA SALA", "Antes · Durante · Depois")
    fases = [
        ("ANTES", "🔎", AZUL, ["Pesquise a empresa", "Releia seu currículo",
                               "Ensaie as perguntas comuns", "Separe a roupa na véspera"]),
        ("DURANTE", "🤝", VERDE, ["Chegue 10 minutos antes", "Olhe nos olhos e fale claro",
                                   "Seja honesto sempre", "Faça perguntas ao final"]),
        ("DEPOIS", "✉️", LARANJA, ["Agradeça por e-mail em 24h", "Anote o que foi perguntado",
                                    "Reflita sobre o que melhorar", "Siga se candidatando"]),
    ]
    x = 80
    for tit, ico, cor, itens in fases:
        rr(d, [x, 200, x + 460, 700], 22, fill=BRANCO, outline=cor, w=3)
        d.rectangle([x, 200, x + 460, 212], fill=cor)
        icone(im, (x + 230, 288), ico, 66)
        txt(d, (x + 230, 358), tit, f(32, bold=True), cor, "mm")
        y = 420
        for it in itens:
            d.ellipse([x + 46, y + 8, x + 60, y + 22], fill=AMBAR)
            y = bloco_texto(d, (x + 78, y), it, f(22), (70, 60, 66), 340, 30) + 12
        x += 490
    for gx in (555, 1045):
        d.polygon([(gx + 15, 450), (gx - 10, 432), (gx - 10, 468)], fill=AMBAR)
    salvar(im, "16_entrevista.png")

# =======================================================================
# 17 - CURSOS SENAI
# =======================================================================
def img_senai():
    im, d = novo(1600, 900, BRANCO)
    faixa_titulo(im, d, "CURSOS TÉCNICOS DO SENAI", "Exemplos de formação após o 9º ano")
    cursos = [
        ("Eletrotécnica", "Industrial · 2 anos", "⚡", LARANJA),
        ("Mecânica", "Industrial · 2 anos", "🔧", AZUL),
        ("Automação Industrial", "Industrial · 2 anos", "🎛️", BORDO2),
        ("Mecatrônica", "Industrial · 2 anos", "🦾", ROXO),
        ("Informática", "TI · 1,5 ano", "💻", VERDE),
        ("Desenvolvimento de Sistemas", "TI · 2 anos", "⌨️", AZUL),
        ("Segurança do Trabalho", "Industrial · 2 anos", "🦺", AMBAR_E),
        ("Jovem Aprendiz", "14 a 24 anos · com carteira", "💼", BORDO),
    ]
    x0, y0, cw, ch_, g = 80, 200, 350, 300, 22
    for k, (tit, sub, ico, cor) in enumerate(cursos):
        cx = x0 + (k % 4) * (cw + g); cy = y0 + (k // 4) * (ch_ + g)
        rr(d, [cx, cy, cx + cw, cy + ch_], 20, fill=BRANCO, outline=CINZA_C, w=2)
        d.rectangle([cx, cy, cx + cw, cy + 8], fill=cor)
        icone(im, (cx + cw // 2, cy + 88), ico, 70)
        yy = cy + 152
        for ln in quebra(d, tit, f(25, bold=True), cw - 50):
            txt(d, (cx + cw // 2, yy), ln, f(25, bold=True), cor, "mm"); yy += 32
        txt(d, (cx + cw // 2, yy + 14), sub, f(20), CINZA, "mm")
    rr(d, [300, 810, 1300, 880], 16, fill=(255, 244, 220), outline=AMBAR, w=3)
    txt(d, (800, 845), "Mais de 70% dos alunos do SENAI são contratados durante ou logo após o curso",
        f(23, semi=True), BORDO, "mm")
    salvar(im, "17_cursos_senai.png")

# =======================================================================
# 18 - MAPA DE CARREIRA
# =======================================================================
def img_mapa_carreira():
    im, d = novo(1600, 900, CREME)
    faixa_titulo(im, d, "O MAPA DE CARREIRA", "O projeto final da UC, em quatro perguntas")
    quads = [
        ("1", "QUEM EU SOU HOJE", "Habilidades, interesses,\nvalores e ponto de partida", "🪞", AZUL),
        ("2", "PARA ONDE QUERO IR", "As carreiras que mais me\ninteressam — e por quê", "🎯", VERDE),
        ("3", "COMO CHEGAR LÁ", "Curto, médio e longo prazo:\nos passos concretos", "🗺️", LARANJA),
        ("4", "MEUS PRÓXIMOS PASSOS", "Três ações que eu posso\ncomeçar esta semana", "🚀", BORDO2),
    ]
    x0, y0, cw, ch_, g = 130, 210, 640, 320, 24
    for k, (num, tit, desc, ico, cor) in enumerate(quads):
        cx = x0 + (k % 2) * (cw + g); cy = y0 + (k // 2) * (ch_ + g)
        rr(d, [cx, cy, cx + cw, cy + ch_], 24, fill=BRANCO, outline=cor, w=3)
        d.ellipse([cx + 34, cy + 34, cx + 100, cy + 100], fill=cor)
        txt(d, (cx + 67, cy + 67), num, f(34, bold=True), BRANCO, "mm")
        icone(im, (cx + cw - 80, cy + 76), ico, 62)
        txt(d, (cx + 124, cy + 52), tit, f(29, bold=True), cor)
        yy = cy + 140
        for ln in desc.split("\n"):
            txt(d, (cx + 40, yy), ln, f(23), (72, 62, 68)); yy += 34
        rr(d, [cx + 40, cy + 236, cx + cw - 40, cy + 288], 12, fill=(248, 244, 246))
        txt(d, (cx + cw // 2, cy + 262),
            ["Ex.: “sou organizado e gosto de montar coisas”",
             "Ex.: “técnico em mecatrônica”",
             "Ex.: “curso técnico no SENAI em 2029”",
             "Ex.: “fazer um curso online de lógica”"][k],
            f(20, semi=True), CINZA, "mm")
    salvar(im, "18_mapa_carreira.png")

# =======================================================================
# 19 - TRILHA DOS 18 ENCONTROS
# =======================================================================
def img_trilha():
    im, d = novo(1600, 700, BRANCO)
    faixa_titulo(im, d, "A SUA TRILHA — 18 ENCONTROS, 36 HORAS", "Quatro etapas até o seu Mapa de Carreira")
    etapas = [
        ("1 a 4", "DESCOBRIR", "Quem sou eu e como\no mundo do trabalho mudou", "🧭", AZUL),
        ("5 a 9", "EXPLORAR", "Carreiras industriais, de TI\ne as profissões do futuro", "🔭", VERDE),
        ("10 a 12", "PLANEJAR", "Habilidades, itinerário\nformativo e currículo", "🗂️", LARANJA),
        ("13 a 18", "CONECTAR", "LinkedIn, networking,\nentrevista e projeto final", "🤝", BORDO2),
    ]
    y = 400
    d.line([(160, y), (1440, y)], fill=CINZA_C, width=10)
    xs = [230, 620, 1010, 1390]
    for (faixa, tit, desc, ico, cor), x in zip(etapas, xs):
        d.ellipse([x - 52, y - 52, x + 52, y + 52], fill=cor)
        icone(im, (x, y), ico, 52)
        txt(d, (x, y - 130), tit, f(30, bold=True), cor, "mm")
        txt(d, (x, y - 92), f"Encontros {faixa}", f(21, semi=True), CINZA, "mm")
        yy = y + 84
        for ln in desc.split("\n"):
            txt(d, (x, yy), ln, f(20), (80, 70, 76), "mm"); yy += 28
    salvar(im, "19_trilha.png")

# =======================================================================
# 20 - COMPARATIVO SALARIAL INDUSTRIA
# =======================================================================
def img_salarios_ind():
    im, d = novo(1600, 760, CREME)
    faixa_titulo(im, d, "FAIXAS SALARIAIS NA INDÚSTRIA", "Técnicos de nível médio — valores médios de mercado")
    dados = [("Mecânica Industrial", 2.5, 4.5, AZUL), ("Eletrotécnica", 2.8, 5.0, LARANJA),
             ("Automação Industrial", 3.0, 6.0, BORDO2), ("Mecatrônica", 3.5, 7.0, ROXO)]
    x0, esc, y = 560, 128, 250
    for i in range(0, 9, 2):
        gx = x0 + int(i * esc)
        d.line([(gx, 215), (gx, 640)], fill=(228, 222, 225), width=2)
        txt(d, (gx, 668), f"R$ {i} mil", f(19), CINZA, "mm")
    for nome, mn, mx, cor in dados:
        txt(d, (530, y + 28), nome, f(24, semi=True), PRETO, "ra")
        rr(d, [x0 + int(mn * esc), y, x0 + int(mx * esc), y + 56], 12, fill=cor)
        txt(d, (x0 + int(mn * esc) + 16, y + 28), f"{mn:.1f}k".replace(".", ","), f(21, bold=True), BRANCO, "lm")
        txt(d, (x0 + int(mx * esc) - 16, y + 28), f"{mx:.1f}k".replace(".", ","), f(21, bold=True), BRANCO, "rm")
        y += 100
    salvar(im, "20_salarios_industria.png")

# =======================================================================
# 21 - DADOS, IA E CIBERSEGURANCA
# =======================================================================
def img_dados():
    im, d = novo(1600, 820, BRANCO)
    faixa_titulo(im, d, "DO DADO À DECISÃO", "Como três carreiras de TI se conectam")
    passos = [("Você usa o app", "curtidas, buscas,\ncompras", "📱", AZUL),
              ("Os dados são\narmazenados", "servidores e\nnuvem", "🗄️", ROXO),
              ("O cientista de dados\nanalisa", "estatística e\nprogramação", "📊", VERDE),
              ("A IA aprende e\nsugere", "recomendações e\nprevisões", "🧠", BORDO2),
              ("A cibersegurança\nprotege tudo", "monitora, testa e\nresponde a ataques", "🛡️", LARANJA)]
    x = 60
    for tit, desc, ico, cor in passos:
        rr(d, [x, 210, x + 270, 640], 20, fill=BRANCO, outline=cor, w=3)
        d.rectangle([x, 210, x + 270, 220], fill=cor)
        icone(im, (x + 135, 296), ico, 62)
        yy = 366
        for ln in tit.split("\n"):
            txt(d, (x + 135, yy), ln, f(23, bold=True), cor, "mm"); yy += 30
        yy += 14
        for ln in desc.split("\n"):
            txt(d, (x + 135, yy), ln, f(20), CINZA, "mm"); yy += 28
        if x < 1300:
            d.polygon([(x + 300, 425), (x + 275, 407), (x + 275, 443)], fill=AMBAR)
        x += 305
    rr(d, [300, 690, 1300, 770], 18, fill=(255, 244, 220), outline=AMBAR, w=3)
    txt(d, (800, 730), "“Dados são o novo petróleo” — mas só valem quando alguém sabe refiná-los.",
        f(24, semi=True), BORDO, "mm")
    salvar(im, "21_dados_ia_seguranca.png")

# =======================================================================
if __name__ == "__main__":
    print("Gerando ilustracoes...")
    img_capa(); img_venn(); img_revolucoes(); img_pilares(); img_empregos()
    img_indust1(); img_clp(); img_front_back(); img_salarios_ti(); img_futuro()
    img_skills(); img_itinerarios(); img_curriculo(); img_linkedin(); img_networking()
    img_entrevista(); img_senai(); img_mapa_carreira(); img_trilha(); img_salarios_ind()
    img_dados()
    print("Concluido em", OUT)
