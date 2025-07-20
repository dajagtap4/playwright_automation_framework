// read data from excel file and print all cell values
// run with command -> node readExcelFile.js
// ==========================================================

const ExcelJs = require('exceljs');

async function readExcelFileDemo(){
    
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile('C:/Users/Deepak/Downloads/excelDownloadTest.xlsx');
    const worksheet = workbook.getWorksheet('Sheet2');

    worksheet.eachRow((row)=>{
        
        row.eachCell((cell)=>{
            //each cell value
            console.log(cell.value);
        });
    });
}
readExcelFileDemo();