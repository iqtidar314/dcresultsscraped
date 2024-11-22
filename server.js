const express = require('express');
const bodyParser = require('body-parser');
const xlsx = require('xlsx');
const path = require('path');

const app = express();
const port = 3000;

// Middleware for parsing JSON data
app.use(bodyParser.json());
app.use(express.static('docs'));  // To serve your HTML file and other assets

// Endpoint to get result based on class and exam selection
app.post('/get-result', (req, res) => {
    const { class: className, exam } = req.body;

    // Determine the file based on class and exam
    const fileName = `${className}-${exam}.xlsx`; // You may need to adjust this logic
    const filePath = path.join(__dirname, 'uploads', fileName); // Assuming uploaded files are stored in 'uploads' directory

    // Check if the file exists
    if (!filePath || !require('fs').existsSync(filePath)) {
        return res.status(404).json({ success: false, message: 'File not found' });
    }

    // Read the Excel file
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Convert the sheet data to JSON
    const resultData = xlsx.utils.sheet_to_json(sheet);

    // Generate HTML table for displaying the results
    let tableHtml = '<thead><tr>';
    if (resultData.length > 0) {
        // Create table headers
        Object.keys(resultData[0]).forEach(key => {
            tableHtml += `<th>${key}</th>`;
        });
        tableHtml += '</tr></thead><tbody>';

        // Create table rows
        resultData.forEach(row => {
            tableHtml += '<tr>';
            Object.values(row).forEach(value => {
                tableHtml += `<td>${value}</td>`;
            });
            tableHtml += '</tr>';
        });

        tableHtml += '</tbody>';
    }

    // Send back the table HTML
    res.json({ success: true, tableData: tableHtml });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
