//this for the excel to json
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

// Path to your Excel file
const excelFilePath = path.join(__dirname, './data.xlsx');

// Read the Excel file
const workbook = xlsx.readFile(excelFilePath);

// Initialize an object to hold all sheets' data
const allSheetsData = {};

// Loop through each sheet in the workbook
workbook.SheetNames.forEach((sheetName) => {
  const worksheet = workbook.Sheets[sheetName];

  // Convert the sheet to JSON format
  const jsonData = xlsx.utils.sheet_to_json(worksheet, {
    defval: '', // Use empty string for missing values
  });

  // Store the JSON data in the object with the sheet name as the key
  allSheetsData[sheetName] = jsonData;
});

// Define the path for the output JSON file
const jsonFilePath = path.join(__dirname, 'output.json');

// Write the JSON data to a file
fs.writeFileSync(jsonFilePath, JSON.stringify(allSheetsData, null, 2), 'utf-8');

console.log(`JSON file has been saved to ${jsonFilePath}`);
