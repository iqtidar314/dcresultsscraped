@@ -1,14 +1,14 @@
const express = require('express');
const path = require('path');
const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware to parse incoming JSON requests
// Middleware to parse JSON request bodies
app.use(express.json());
app.use(express.static('public')); // Serve static files like CSS, JS, etc.
app.use(express.static('results')); // Serve result files from the 'result' directory

// Handle POST request to '/get-result'
app.post('/get-result', (req, res) => {
    const { examName, password } = req.body;

@@ -17,20 +17,24 @@ app.post('/get-result', (req, res) => {
        return res.json({ success: false, message: 'Invalid password.' });
    }

    // Check if the exam file exists in the result folder
    // Construct the file path based on the examName selected
    const resultFilePath = path.join(__dirname, 'results', `${examName}.html`);
    
    console.log(`Looking for result file at: ${resultFilePath}`); // Log for debugging

    // If the file exists, send it back to the frontend
    if (require('fs').existsSync(resultFilePath)) {
        const resultHTML = require('fs').readFileSync(resultFilePath, 'utf-8');
    // Check if the exam result file exists
    if (fs.existsSync(resultFilePath)) {
        // Read the file and send it as the response
        const resultHTML = fs.readFileSync(resultFilePath, 'utf-8');
        return res.json({ success: true, resultHTML: resultHTML });
    }

    // If the exam result file doesn't exist, send an error
    // If file does not exist
    res.json({ success: false, message: 'Result file not found.' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
// Start server on port 3000 (or another port)
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
