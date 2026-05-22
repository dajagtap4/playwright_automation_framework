
const fs = require('fs');
const path = require('path');


function loadJson(relativePath) {
 const fullPath = path.resolve(__dirname, '..', 'data', relativePath);
 if (!fs.existsSync(fullPath)) {
   throw new Error(`Test data file not found: ${fullPath}`);
 }
 const raw = fs.readFileSync(fullPath, 'utf-8');
 return JSON.parse(raw);
}


module.exports = { loadJson };




