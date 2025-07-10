const { test, expect } = require('@playwright/test');
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
    return output;
}

test('Upload download excel validation', async ({ page }) => {
  const textSearch = 'Mango';
  const updateValue = '1765';

  await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");

  // Download file and get actual path
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.getByRole('button', { name: 'Download' }).click()
  ]);
  const downloadPath = await download.path();
  console.log(downloadPath);
  
  // Update Excel file at downloaded path
  await writeExcel(textSearch, updateValue, { rowChange: 0, colChange: 2 }, downloadPath);

  // Upload updated file
  await page.locator("#fileinput").click();
  await page.locator("#fileinput").setInputFiles(downloadPath);

  // Validate updated value on page
  const textlocator = page.getByText(textSearch);
  const desiredRow = await page.getByRole('row').filter({ has: textlocator });
  await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);
});
