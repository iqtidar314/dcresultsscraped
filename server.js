const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Serve static HTML files from 'docs' directory
app.use(express.static('docs'));

// Handle POST request to '/get-result' route
app.post('/get-result', (req, res) => {
    const { class: selectedClass, exam: selectedExam } = req.body;

    // For now, let's just return a simple message
    const result = {
        message: `You selected ${selectedClass} for the ${selectedExam} exam.`,
    };

    res.json(result);  // Send the result as JSON
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
