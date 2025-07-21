const ExcelJS = require('exceljs');

console.log("✅ Script started");

async function writeExcel(searchText,replaceText,change,filePath)
{
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await readExcel(worksheet,searchText);

    const cell = worksheet.getCell(output.row,output.column+change.colChange);
    console.log(`🔁 Replacing value at Row ${output.row}, Column ${output.column + change.colChange} with "${replaceText}"`);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);
    console.log("💾 File updated successfully.");
    await readExcelFile(filePath); // Show the updated content
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

async function readExcelFile(filePath) 
    {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);
        const worksheet = workbook.getWorksheet('Sheet1');
        console.log("📄 Reading from sheet:", worksheet.name);

        worksheet.eachRow((row, rowNumber) => 
        {
             const rowValues = row.values.slice(1); // Skip first undefined index
             console.log(`Row ${rowNumber}:`, rowValues);
        });
    }

// https://rahulshettyacademy.com/upload-download-test/index.html
// goto above link and download excel file and rename file to "excelDownloadTest"
// then update path as per system(laptop).
// GL laptop path -/Users/deepak.jagtap/Downloads/excelDownloadTest.xlsx
// Personal laptop path - C:/Users/Deepak/Downloads/excelDownloadTest.xlsx

writeExcel("Apple",12,{rowChange:0,colChange:2},'/Users/deepak.jagtap/Downloads/excelDownloadTest.xlsx');