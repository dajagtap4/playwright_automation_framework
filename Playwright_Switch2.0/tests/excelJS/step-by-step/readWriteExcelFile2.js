// Insert "Deepak" at cell = Iphone (Dynamically).
// close excel file before excecute this code.
// run with command -> node readWriteExcelFile2.js
// ==========================================================

const ExcelJs = require('exceljs');

async function readExcelFileDemo(){
    let output = { row:-1,column:-1 }

    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile('C:/Users/Deepak/Downloads/excelDownloadTest.xlsx');
    const worksheet = workbook.getWorksheet('Sheet2');

    worksheet.eachRow((row,rowNumber)=>
    {    
        row.eachCell((cell,colNumber)=>
        {
            if(cell.value === "Deepak")
            {
                output.row=rowNumber;
                output.column=colNumber;
            }
        });
    });

    const cell = worksheet.getCell(output.row,output.column);
    cell.value = "Redmi";
    await workbook.xlsx.writeFile('C:/Users/Deepak/Downloads/excelDownloadTest.xlsx');
}
readExcelFileDemo();