const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'), {
    setHeaders: (res) => {
        res.set('Cache-Control', 'public, max-age=86400'); // Cache for 1 day
    }
}));
// Mock database: Exam names mapped to embed links
const examData = {
    "class-11_2024-2025_CT-1": "https://1drv.ms/x/c/ef87fe212c714713/IQRWrKoZOtZAQaldW4hD4-nXAed55g1lIK36hs3qHGTurFk",
    "class-12_2024-2025_Final": "https://docs.google.com/spreadsheets/d/e/YOUR_PUBLIC_LINK_2/pubhtml?widget=true&headers=false",
    "midterm_2023": "https://docs.google.com/spreadsheets/d/e/YOUR_PUBLIC_LINK_3/pubhtml?widget=true&headers=false"
};

// Route to dynamically generate a result page
app.post('/get-result', (req, res) => {
    const { examName, password } = req.body;

    // Validate the password
    if (password !== 'dcstudent') {
        return res.status(401).send('<h1>401 Unauthorized: Invalid Password</h1>');
    }

    // Fetch the embed link for the requested exam
    const embedLink = examData[examName];
    if (!embedLink) {
        return res.status(404).send('<h1>404 Not Found: Result Not Available</h1>');
    }

    // Path to the template HTML file
    const templatePath = path.join(__dirname, 'public', 'template', 'template.html');

    // Read and modify the template file
    fs.readFile(templatePath, 'utf8', (err, templateHTML) => {
        if (err) {
            console.error('Error reading template.html:', err);
            return res.status(500).send('<h1>500 Internal Server Error</h1>');
        }

       // Replace all occurrences of {{EXAM_NAME}} with the actual exam name
       const updatedHTML = templateHTML
       .replace(/{{EXAM_NAME}}/g, examName)  // Replace all instances of {{EXAM_NAME}}
       .replace('PLACEHOLDER_EMBED_LINK', embedLink);  // Replace iframe embed link

   // Save the generated HTML as a static file
   const resultFileName = `${examName.replace(/[^a-zA-Z0-9_-]/g, '_')}.html`; // Safe filename
   const resultFilePath = path.join(__dirname, 'public', 'results', resultFileName);

   fs.writeFile(resultFilePath, updatedHTML, (writeErr) => {
       if (writeErr) {
           console.error('Error saving result file:', writeErr);
           return res.status(500).send('<h1>500 Internal Server Error</h1>');
       }

       // Return the unique URL of the saved file
       const resultURL = `/results/${resultFileName}`;
       res.json({ success: true, url: resultURL });
   });
});
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Server running at http://localhost:${PORT}`);
});
