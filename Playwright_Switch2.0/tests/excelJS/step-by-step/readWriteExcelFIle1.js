// Insert "Iphone" at row 2 col 2 (Hard coaded).
// close excel file before excecute this code.
// run with command -> node readWriteExcelFile1.js
// ==========================================================

const ExcelJs = require('exceljs');

async function readExcelFileDemo(){
    
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile('C:/Users/Deepak/Downloads/excelDownloadTest.xlsx');
    const worksheet = workbook.getWorksheet('Sheet2');

    const cell = worksheet.getCell(2,2);
    cell.value = "Deepak";
    await workbook.xlsx.writeFile('C:/Users/Deepak/Downloads/excelDownloadTest.xlsx');
}
readExcelFileDemo();