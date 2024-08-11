const fs = require('fs');

// Function to clean the JSON object and remove extra spaces from keys
function cleanJsonObject(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            const trimmedKey = key.trim();  // Trim any extra spaces from the key
            
            // Rename the key if it has spaces
            if (trimmedKey !== key) {
                obj[trimmedKey] = obj[key];
                delete obj[key];
            }
            
            // Check if the key starts with "__EMPTY" and the value is an empty string
            if (trimmedKey.startsWith('__EMPTY') && obj[trimmedKey] === '') {
                delete obj[trimmedKey];
            } else if (typeof obj[trimmedKey] === 'object' && obj[trimmedKey] !== null) {
                // Recursively clean nested objects
                cleanJsonObject(obj[trimmedKey]);
            }
        }
    }
}

// Function to read, clean, and write the JSON file
function cleanJsonFile(inputFilePath, outputFilePath) {
    fs.readFile(inputFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }
        
        let jsonObj;
        try {
            jsonObj = JSON.parse(data);
        } catch (err) {
            console.error('Error parsing JSON:', err);
            return;
        }
        
        // Clean the JSON object
        cleanJsonObject(jsonObj);
        
        // Write the cleaned JSON to a new file
        fs.writeFile(outputFilePath, JSON.stringify(jsonObj, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Error writing the file:', err);
                return;
            }
            console.log('Cleaned JSON file has been saved to', outputFilePath);
        });
    });
}

// Specify the input and output file paths
const inputFilePath = 'output.json';  // Replace with your input JSON file path
const outputFilePath = 'without_empty.json';  // Replace with your desired output JSON file path

// Run the function
cleanJsonFile(inputFilePath, outputFilePath);
