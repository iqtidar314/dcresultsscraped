const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(express.static('public')); // Serve static files like CSS, JS, etc.
app.use(express.static('results')); // Serve result files from the 'result' directory

// Handle POST request to '/get-result'
app.post('/get-result', (req, res) => {
    const { examName, password } = req.body;

    // Validate password
    if (password !== 'dcstudent') {
        return res.json({ success: false, message: 'Invalid password.' });
    }

    // Check if the exam file exists in the result folder
    const resultFilePath = path.join(__dirname, 'results', `${examName}.html`);

    // If the file exists, send it back to the frontend
    if (require('fs').existsSync(resultFilePath)) {
        const resultHTML = require('fs').readFileSync(resultFilePath, 'utf-8');
        return res.json({ success: true, resultHTML: resultHTML });
    }

    // If the exam result file doesn't exist, send an error
    res.json({ success: false, message: 'Result file not found.' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
