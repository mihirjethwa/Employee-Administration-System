import ExcelJS from "exceljs";
import { Response } from "express";

export class ExcelService {
  workBook: ExcelJS.Workbook;

  constructor() {
    this.workBook = new ExcelJS.Workbook();
  }

  public createExcel(sheetName: string, columns: any, rows: any) {
    let workSheet = this.workBook.addWorksheet(sheetName);
    workSheet.columns = columns;
    workSheet.columns.forEach((column: any) => {
      column.width = column.header?.length < 20 ? 20 : column.header?.length;
    });

    workSheet.addRows(rows);
    workSheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
      row.eachCell(function (cell, colNumber) {
        if (rowNumber === 1) {
          cell.font = {
            bold: true,
          };
          cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
        }
      });
    });
  }

  public async export(response: Response): Promise<void> {
    return await this.workBook.xlsx.write(response);
  }
}
