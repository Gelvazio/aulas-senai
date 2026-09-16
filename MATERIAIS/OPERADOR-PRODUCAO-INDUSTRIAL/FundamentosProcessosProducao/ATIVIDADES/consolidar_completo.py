#!/usr/bin/env python
# -*- coding: utf-8 -*-

from zipfile import ZipFile
import xml.etree.ElementTree as ET
from copy import deepcopy
import os

os.chdir(r"C:\fontes\aulas-senai\MATERIAIS\OPERADOR-PRODUCAO-INDUSTRIAL\Fundamentos dos Processos de Produção\ATIVIDADES")

files = [
    "ATIVIDADE-01-CHECKLIST-DE-QUALIDADE.docx",
    "ATIVIDADE-02-PLANEJAMENTO-DA-QUALIDADE.docx",
    "ATIVIDADE-03-FERRAMENTAS-DE-QUALIDADE.docx"
]

# Extrair document.xml de cada arquivo
docs_content = []

for filename in files:
    try:
        with ZipFile(filename, 'r') as z:
            with z.open('word/document.xml') as xml_file:
                root = ET.fromstring(xml_file.read())
                docs_content.append((filename, root))
                print(f"✅ {filename} - extraído")
    except Exception as e:
        print(f"❌ Erro em {filename}: {e}")

# Usar primeiro arquivo como base
if docs_content:
    base_file, base_root = docs_content[0]

    # Registrar namespaces
    namespaces = {
        'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main',
        'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'
    }

    for prefix, uri in namespaces.items():
        ET.register_namespace(prefix, uri)

    # Extrair body do primeiro documento
    body = base_root.find('.//w:body', namespaces)

    if body is not None:
        # Adicionar conteúdo dos outros documentos
        for i, (filename, doc_root) in enumerate(docs_content[1:], 1):
            # Adicionar quebra de página
            page_break_para = ET.Element('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p')
            page_break_run = ET.SubElement(page_break_para, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}r')
            br = ET.SubElement(page_break_run, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}br')
            br.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}type', 'page')
            body.append(page_break_para)

            # Adicionar parágrafo com nome do arquivo
            title_para = ET.Element('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p')
            title_run = ET.SubElement(title_para, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}r')
            title_text = ET.SubElement(title_run, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t')
            title_text.text = f"===== {filename} ====="
            body.append(title_para)

            # Adicionar todos os parágrafos do documento
            other_body = doc_root.find('.//w:body', namespaces)
            if other_body is not None:
                for elem in other_body:
                    # Copiar elemento
                    new_elem = deepcopy(elem)
                    body.append(new_elem)
                    print(f"   + Parágrafo adicionado de {filename}")

    # Salvar base original para reutilizar a estrutura
    with ZipFile(files[0], 'r') as z_src:
        # Copiar estrutura
        with ZipFile("ATIVIDADE-FERRAMENTAS-DE-QUALIDADE.docx", 'w') as z_dst:
            # Copiar todos os arquivos
            for item in z_src.infolist():
                if item.filename != 'word/document.xml':
                    z_dst.writestr(item, z_src.read(item.filename))

            # Escrever document.xml modificado
            z_dst.writestr('word/document.xml', ET.tostring(base_root, encoding='utf-8'))

    print("\n✅✅✅ DOCUMENTO CONSOLIDADO CRIADO: ATIVIDADE-FERRAMENTAS-DE-QUALIDADE.docx")

