const express = require('express');
const bodyParser = require('body-parser');
const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Middleware to parse JSON data
app.use(bodyParser.json());
app.use(express.static('docs'));  // Serve static files (HTML, CSS, JS) from 'docs' folder

// Endpoint to get result based on class and exam
app.post('/get-result', (req, res) => {
    const { class: className, exam } = req.body;

    // Construct the file name based on class and exam
    const fileName = `${className}-${exam}.xlsx`;
    const filePath = path.join(__dirname, 'uploads', fileName);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ success: false, message: 'File not found' });
    }

    // Read the Excel file
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];  // Get the first sheet
    const sheet = workbook.Sheets[sheetName];

    // Convert the sheet to JSON
    const resultData = xlsx.utils.sheet_to_json(sheet);

    // Generate the HTML table
    let tableHtml = '<thead><tr>';
    if (resultData.length > 0) {
        // Create table headers
        Object.keys(resultData[0]).forEach(key => {
            tableHtml += `<th>${key}</th>`;
        });
        tableHtml += '</tr></thead><tbody>';

        // Add rows to the table
        resultData.forEach(row => {
            tableHtml += '<tr>';
            Object.values(row).forEach(value => {
                tableHtml += `<td>${value}</td>`;
            });
            tableHtml += '</tr>';
        });

        tableHtml += '</tbody>';
    } else {
        tableHtml = '<tr><td colspan="100%">No data available</td></tr>';
    }

    // Send back the HTML table
    res.json({ success: true, tableData: tableHtml });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
