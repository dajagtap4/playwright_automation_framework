// verify text "banana" is present and print its co-ordinates
// run with command -> node readExcelFile2.js
// ==========================================================

const ExcelJs = require('exceljs');

async function readExcelFileDemo(){
    
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile('C:/Users/Deepak/Downloads/excelDownloadTest.xlsx');
    const worksheet = workbook.getWorksheet('Sheet2');

    worksheet.eachRow((row,rowNumber)=>
    {    
        row.eachCell((cell,colNumber)=>
        {
            if(cell.value === "deepak")
            {
                console.log(rowNumber);
                console.log(colNumber);
            }
        });
    });
}
readExcelFileDemo();