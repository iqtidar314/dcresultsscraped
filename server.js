const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to get the list of exams based on the selected criteria
app.get('/api/exams', (req, res) => {
    const { level, group, session } = req.query;

    if (!level || !group || !session) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Here you would retrieve the exam list based on the parameters (you can hardcode or fetch from a database)
    // For now, we'll use a simple hardcoded mock data
    const exams = getExams(level, group, session);

    res.json({ exams });
});

// Function to mock fetching exams based on parameters
function getExams(level, group, session) {
    // Replace this mock logic with real data or database querying as needed
    if (level === 'HSC' && group === 'Science') {
        return ['Science Exam 1', 'Science Exam 2'];
    }
    if (level === 'HSC' && group === 'Business Studies') {
        return ['Business Studies Exam 1', 'Business Studies Exam 2'];
    }
    if (level === 'HSC' && group === 'Humanities') {
        return ['Humanities Exam 1', 'Humanities Exam 2'];
    }
    return [];
}

// API endpoint to get the result HTML for a specific exam
app.get('/api/results', (req, res) => {
    const { exam } = req.query;

    if (!exam) {
        return res.status(400).json({ error: 'Exam parameter is required' });
    }

    // Check if the result file exists for the requested exam
    const examFilePath = path.join(__dirname, 'results', `${exam}.html`);

    fs.readFile(examFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(404).json({ error: 'Result file not found' });
        }
        res.send(data);
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});






