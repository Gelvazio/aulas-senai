import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputPath = "sistema/FICHA-PRODUTO-MAIS-TECH/INTRODUCAO_COMUNICACAO_ORAL_ESCRITA/LISTA-PRESENCA-CEPLAS-BARRAGEM-2026.xlsx";

const participantes = [
  [1, "Bianca Laiza Prado dos Santos", "118.263.469-96", ""],
  [2, "Bianca Pamela Coa Diaz", "112.636.482-74", ""],
  [3, "Cesar David Perez Gutierrez", "110.300.062-45", ""],
  [4, "Christell Alexandra Salazar Ortiz", "118.338.442-46", ""],
  [5, "Heloise Felipe Laurentino", "106.817.349-14", ""],
  [6, "Israel Gelzleichter Pimentel", "115.734.129-29", ""],
  [7, "Izabelly Cristinne dos Santos Lima", "113.458.649-30", ""],
  [8, "Jesus David Paraguan Velasquez", "119.598.292-54", ""],
  [9, "Jhomar de Jesus Alexander Leon Penaloza", "008.560.452-68", ""],
  [10, "Kamilly Iasmim Ribeiro de Oliveira", "130.984.049-06", ""],
  [11, "Kauan Victor da Cunha Costa", "162.303.429-95", ""],
  [12, "Leandro Jorel Rodrigues Borges", "129.796.929-48", ""],
  [13, "Leticia Lehnert Rodrigues", "142.672.379-21", ""],
  [14, "Lohan Steinbach da Cruz", "133.371.949-31", ""],
  [15, "Yeismir Abraham Munoz Vina", "002.514.659-93", ""],
];

const workbook = Workbook.create();
const sheet = workbook.worksheets.add("Lista de Presença");
sheet.showGridLines = false;

sheet.getRange("A1:D1").merge();
sheet.getRange("A1").values = [["LISTA DE PRESENÇA"]];
sheet.getRange("A1:D1").format = {
  fill: "#0B4F9C",
  font: { bold: true, color: "#FFFFFF", size: 18 },
  horizontalAlignment: "center",
  verticalAlignment: "center",
};
sheet.getRange("A1:D1").format.rowHeight = 34;

sheet.getRange("A3:D4").values = [
  ["Nome/Código da Turma", "QA LBTSN 2026/1 M2 (124402)", null, null],
  ["Nome da UC", "Competências Socioemocionais e Empreendedorismo", null, null],
];
sheet.getRange("B3:D3").merge();
sheet.getRange("B4:D4").merge();
sheet.getRange("A3:A4").format = { font: { bold: true, color: "#0B4F9C" }, fill: "#EAF2FB" };
sheet.getRange("A3:D4").format.borders = { preset: "outside", style: "thin", color: "#7A8CA3" };

sheet.getRange("A6:D6").values = [["Data", "", "Horário", "Local"]];
sheet.getRange("A6:D6").format = { fill: "#DCE8F5", font: { bold: true, color: "#17365D" } };

sheet.getRange("A8:D8").values = [["Nº", "Nome", "CPF", "Assinatura"]];
sheet.getRange("A8:D8").format = {
  fill: "#0B4F9C",
  font: { bold: true, color: "#FFFFFF" },
  horizontalAlignment: "center",
  verticalAlignment: "center",
  borders: { preset: "all", style: "thin", color: "#7A8CA3" },
};
sheet.getRange("A9:D23").values = participantes;
sheet.getRange("A9:D23").format.borders = { preset: "all", style: "thin", color: "#C3CEDA" };
sheet.getRange("A9:A23").format.horizontalAlignment = "center";
sheet.getRange("C9:C23").format.horizontalAlignment = "center";
sheet.getRange("C9:C23").format.numberFormat = "@";
sheet.getRange("A8:D23").format.rowHeight = 24;

sheet.getRange("A25:D25").merge();
sheet.getRange("A25").values = [["Ocorrências"]];
sheet.getRange("A25:D25").format = { fill: "#DCE8F5", font: { bold: true, color: "#17365D" } };
sheet.getRange("A26:D30").merge(true);
sheet.getRange("A26:D30").format.borders = { preset: "all", style: "thin", color: "#C3CEDA" };
sheet.getRange("A32:D32").merge();
sheet.getRange("A32").values = [["Assinatura do aplicador"]];
sheet.getRange("A32:D32").format = { font: { bold: true }, horizontalAlignment: "center", borders: { top: { style: "thin", color: "#333333" } } };

sheet.getRange("A1:D32").format.font = { name: "Arial", size: 11 };
sheet.getRange("A1:D32").format.verticalAlignment = "center";
sheet.getRange("B3:D4").format.wrapText = true;
sheet.getRange("A:A").format.columnWidth = 7;
sheet.getRange("B:B").format.columnWidth = 44;
sheet.getRange("C:C").format.columnWidth = 19;
sheet.getRange("D:D").format.columnWidth = 34;
sheet.freezePanes.freezeRows(8);
sheet.tables.add("A8:D23", true, "ListaPresencaTable").style = "TableStyleMedium2";

await fs.mkdir(outputPath.substring(0, outputPath.lastIndexOf("/")), { recursive: true });
const xlsx = await SpreadsheetFile.exportXlsx(workbook);
await xlsx.save(outputPath);
