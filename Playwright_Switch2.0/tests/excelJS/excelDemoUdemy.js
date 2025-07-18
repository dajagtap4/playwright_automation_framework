const ExcelJS = require('exceljs');
async function writeExcel(searchText,replaceText,change,filePath)
{
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await readExcel(worksheet,searchText);

    const cell = worksheet.getCell(output.row,output.column+change.colChange);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);
} 

async function readExcel(worksheet,searchText) {
    let output = {row:-1,column:-1};
    worksheet.eachRow(  (row,rowNumber) =>
    {
        row.eachCell((cell,colNumber) => 
        {
            if(cell.value === searchText){
              output.row = rowNumber;
              output.column = colNumber;
            }
        })
    })
    //
    return output;
}

// https://rahulshettyacademy.com/upload-download-test/index.html
// goto above link and download excel file and rename file to "excelDownloadTest"
// then update path as per system(laptop).
// GL laptop path -/Users/deepak.jagtap/Downloads/excelDownloadTest.xlsx
// Personal laptop path - C:/Users/Deepak/Downloads/excelDownloadTest.xlsx

writeExcel("Kivi",1000,{rowChange:0,colChange:2},'C:/Users/Deepak/Downloads/excelDownloadTest.xlsx');


