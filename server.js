


const path = require('path');
const express = require('express');
const fs = require('fs');
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

app.post('/get-result', (req, res) => {
    const { examName, password } = req.body;

    // Validate password
    if (password !== 'dcstudent') {
        return res.json({ success: false, message: 'Invalid password.' });
    }

    // Construct the file path based on the examName selected
    const resultFilePath = path.join(__dirname, 'result', `${examName}.html`);
    
    console.log(`Looking for result file at: ${resultFilePath}`); // Log for debugging

    // Check if the exam result file exists
    if (fs.existsSync(resultFilePath)) {
        // Read the file and send it as the response
        const resultHTML = fs.readFileSync(resultFilePath, 'utf-8');
        return res.json({ success: true, resultHTML: resultHTML });
    }

    // If file does not exist
    res.json({ success: false, message: 'Result file not found.' });
});

// Start server on port 3000 (or another port)
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
