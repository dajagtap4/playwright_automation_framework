// read data from excel file and print all cell values
// download excel file from below link and rename it to "excelDownloadTest.xlsx"
// https://rahulshettyacademy.com/upload-download-test/index.html
// run this js file with command -> node readExcelFile.js
// ==========================================================


const ExcelJs = require('exceljs');

async function readExcelFileDemo(){
    
    // ExcelJs → It is library which helps to work with Excel files (.xlsx).
    // Workbook → whole Excel file (it can have many sheets inside).
    // new ExcelJs.Workbook() → creates new empty Excel file in memory.
    
    const workbook = new ExcelJs.Workbook();

    //workbook.xlsx.readFile(...) → This tells ExcelJs to open an existing Excel file.
    
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