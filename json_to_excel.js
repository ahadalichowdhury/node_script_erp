const xlsx = require("xlsx");
const fs = require("fs");

// Load JSON data
const jsonData = JSON.parse(fs.readFileSync("./without_empty.json", "utf-8"));
// Define the Excel headers
const headers = [
  "Commodity Code",
  "Commodity Name",
  "Commodity Barcode",
  "Sku Code",
  "Sku Name",
  "Tags",
  "Description",
  "Commodity Type",
  "Unit",
  "Commodity Group",
  "Sub group",
  "Profit rate(%)",
  "Purchase Price",
  "Sale price",
  "Tax1",
  "Tax2",
  "Origin",
  "Style",
  "Model",
  "Size",
  "Color",
  "Warranty (month)",
  "Minimum inventory",
];

// Initialize an array to hold the rows for the Excel file
const excelData = [];

// Map the JSON data to the Excel format

Object.keys(jsonData).forEach((category) => {
  console.log(`Processing category: ${category}`);
  jsonData[category].map((item) => {
    // Combine NAME and الاسم fields into Commodity Name
    const commodityName =
      item["NAME"] && item["الاسم"]
        ? `${item["NAME"].trim()} (${item["الاسم"].trim()})`
        : (item["NAME"] || item["الاسم"])?.trim();

    // Combine WIDTH, THIKNESS, and PIECES PER KILO into Size
    const size =
      item["WIDTH"] && item["THIKNESS"] && item["PIECES PER KILO"]
        ? `${item["WIDTH"]}x${item["THIKNESS"]}x${item["PIECES PER KILO"]}`
        : "";

    // Combine INGREDIENTS and المكونات into Description
    const description =
      item["INGREDIENTS"] && item["المكونات"]
        ? `${item["INGREDIENTS"].trim()} (${item["المكونات"].trim()})`
        : (item["INGREDIENTS"] || item["المكونات"])?.trim();

    const commodityType =
      item["CATEGORY"] === "EXTRA"
        ? "E"
        : item["CATEGORY"] === "SPECIAL"
        ? "SP"
        : item["CATEGORY"] === "SUPER"
        ? "S"
        : item["CATEGORY"] || "";

    const rowData = {
      "Commodity Code": item["CODE"] || "",
      // 'Commodity Code': item['CODE'] ? item['CODE'].substring(0, 2) : '',
      "Commodity Name": commodityName,
      "Commodity Barcode": "", // Assuming not provided
      "Sku Code": "", // Assuming not provided
      "Sku Name": "", // Assuming not provided
      Tags: "", // Assuming not provided
      Description: `${description} | Size: ${size}`,
      // 'Commodity Type': item['CATEGORY'] || '', // Assuming not provided
      "Commodity Type": commodityType,
      Unit: "", // Assuming not provided
      // 'Commodity Group': category || '',
      "Commodity Group": item["CODE"] ? item["CODE"].substring(0, 2) : "",
      "Sub group": "", // Assuming not provided
      "Profit rate(%)": "", // Assuming not provided
      "Purchase Price": item["WHOLESALE PRICE"] || "",
      "Sale price": item["RETAIL PRICE"] || "",
      Tax1: "", // Assuming not provided
      Tax2: "", // Assuming not provided
      Origin: "", // Assuming not provided
      Style: "", // Assuming not provided
      Model: "", // Assuming not provided
      // Size: size,
      Size: "",
      Color: "", // Assuming not provided
      "Warranty (month)": 0, // Assuming not provided
      "Minimum inventory": "", // Assuming not provided
    };

    // Add the row to the Excel data array
    excelData.push(rowData);
  });
});

// Create a new workbook and worksheet
const workbook = xlsx.utils.book_new();
const worksheet = xlsx.utils.json_to_sheet(excelData, { header: headers });

// Append the worksheet to the workbook
xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");

// Write the workbook to an Excel file
xlsx.writeFile(workbook, "output2.xlsx");

console.log("Excel file created successfully!");
