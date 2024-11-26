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
    //science 2024-25
    "CT-1_HSC-1st Year-Science_2024-2025":"https://1drv.ms/x/c/ef87fe212c714713/IQSz-6lGaqu3SbM8O6cgQlWTAUjO40gSqlW2XDnjuWXBqd4",
    "SE_HSC-1st Year-Science_2024-2025":"https://1drv.ms/x/c/ef87fe212c714713/IQR_pkv0hWwiTLAP2-QqyUDGAWN6Unsjin9qSRZCRxrgstc",
    "Half Yearly_HSC-1st Year-Science_2024-2025":"https://1drv.ms/x/c/ef87fe212c714713/IQR_FmFsTMoYR78CqDQJ3r1DAQVSQs9qDK0zTzNe6iR1yYM",
    "CT-2_HSC-1st Year-Science_2024-2025":"https://1drv.ms/x/c/ef87fe212c714713/IQQPdWl2tI5DRpq5NWQgZsHtAQy81cPXng4il2jKfh26fI8",
    "Year Final_HSC-1st Year-Science_2024-2025":"https://1drv.ms/x/c/ef87fe212c714713/IQTQG7k72ajySq3mAakm76JEAeU-vt9jnu_HXGI9aAnBsAc",
    //business 24-25
    "CT-1_HSC-1st Year-Business Studies_2024-2025": "https://1drv.ms/x/c/ef87fe212c714713/IQTs0dkSAXonQL7pPOhSZuOsAWD32qD3N5mKG6ZQArsas9Y",
    "SE_HSC-1st Year-Business Studies_2024-2025":"https://1drv.ms/x/c/ef87fe212c714713/IQS8uPl25LvES7GtdQ1Vj0ynAS1jjMglVzfrzb2jKyj-29E",
    "Half Yearly_HSC-1st Year-Business Studies_2024-2025":"https://1drv.ms/x/c/ef87fe212c714713/IQTNIASQ4ghnTYwDHJhnVbCzAdHLaw7vaHWo_6OBnGZL0hM",
    "CT-2_HSC-1st Year-Business Studies_2024-2025":"https://1drv.ms/x/c/ef87fe212c714713/IQTtJ2HSUwtCTLaDpblvUpaWAXWKHP3IAqiejkQu55622cY",
    "Year Final Exam_HSC-1st Year-Business Studies_2024-2025":"https://1drv.ms/x/c/ef87fe212c714713/IQSt41rcBHGjR6-ICUWwF2TMAQPPBsRPrvvs5hn_Z5Y3QqM",
    //huamanities 24-25
    "CT-1_HSC-1st Year-Humanites_2024-2025":"https://1drv.ms/x/c/ef87fe212c714713/IQQpqj_tXN42QKtrOcDSJrbEAX5qnCFCiRmCNPbsL582HsE",
    "SE_HSC-1st Year-Humanites_2024-2025":"https://1drv.ms/x/c/ef87fe212c714713/IQS8XIaxcMFKRZxgIvjQXETmAUWgfgtrJ05Qg1_FcryfAHw",
    "Half Yearly_HSC-1st Year-Humanites_2024-2025":"https://1drv.ms/x/c/ef87fe212c714713/IQRgBSN9Mm4GTaYiegDwypVbAeQYEqfTW9BdeRGpmcPP6bA",
    "CT-2_HSC-1st Year-Humanites_2024-2025":"https://1drv.ms/x/c/ef87fe212c714713/IQSVyt0WaoisSroy16ZKDWFqAaEImXHYA1HMErXBdThVJCY",
    "Year Final_HSC-1st Year-Humanites_2024-2025":"https://1drv.ms/x/c/ef87fe212c714713/IQT_HS0I9T83TpBFKy8i6CBxAZsLYkE6JfvQt7GLsRheY7k",
    //23-24
    "Test Exam _HSC-1st Year-Science_2023-2024":"https://1drv.ms/x/c/ef87fe212c714713/IQSfvJ4omDDZR7GC7XSR35yWARvfh0-MEEBrpAoCRsSts-s",
    "Test Exam _HSC-1st Year-Business Studies_2023-2024":"https://1drv.ms/x/c/ef87fe212c714713/IQRRBqKACvguSa__NUr_mrLPAY9c40Ji16fz5IfrPRi8keI",
    "Test Exam _HSC-1st Year-Humanites_2023-2024":"https://1drv.ms/x/c/ef87fe212c714713/IQSp1qlI821hT7Z2g4-zcotLAeQYRHbWSMKd5xxJxNPzI84",



};
//to add more link
        //    "":"",

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
