from docx import Document
from docx.oxml.ns import qn
import shutil

arquivo = "AVALIACAO-01-ESTATISTICA-E-PROGRESSOES.docx"
temp = "TEMP_AVALIACAO-01.docx"

# Copiar para temp
shutil.copy(arquivo, temp)

# Processar
doc = Document(temp)
contador = 0
for table in doc.tables:
    tbl = table._element
    tblPr = tbl.tblPr
    if tblPr is not None:
        tblBorders = tblPr.find(qn('w:tblBorders'))
        if tblBorders is not None:
            for border in tblBorders:
                sz_key = qn('w:sz')
                if sz_key in border.attrib:
                    border.attrib[sz_key] = '3'
                    contador += 1

doc.save(temp)
print(f'OK - {contador} bordas reduzidas para 3pt')

# Copiar de volta
shutil.copy(temp, arquivo)
import os
os.remove(temp)
