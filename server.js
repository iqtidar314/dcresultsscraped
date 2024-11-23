const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();



// Serve static files like index.html, style.css, script.js from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));




// Middleware to parse JSON data from requests
app.use(express.json());

// Serve static files in the "results" directory
app.use('/results', express.static(path.join(__dirname, 'results')));

// POST route to handle result requests
app.post('/get-result', (req, res) => {
    const { examName, password } = req.body;

    // Validate password
    if (password !== 'dcstudent') {
        return res.status(401).json({ success: false, message: 'Invalid password.' });
    }

    // Construct the result file path
    const resultFilePath = path.join(__dirname, 'results', `${examName}.html`);

    // Check if the requested file exists
    if (fs.existsSync(resultFilePath)) {
        // Read and send the file content
        const resultHTML = fs.readFileSync(resultFilePath, 'utf-8');
        return res.status(200).json({ success: true, resultHTML });
    } else {
        // If file not found, send error message
        return res.status(404).json({ success: false, message: 'Result file not found.' });
    }
});

// Start the server
const PORT = 3000; // You can customize the port if needed
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
