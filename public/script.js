// Exam mapping data (already defined earlier)
const examMapping = {
    "HSC": {
        "Science": {
            "2023-2024": ["CT-1", "CT-2", "Final"],
            "2024-2025": ["class-11_2024-2025_CT-1", "CT-2"],
            "2025-2026": ["Final"]
        },
        "Business Studies": {
            "2023-2024": ["Midterm", "Final"],
            "2024-2025": ["Midterm"]
        },
        "Humanities": {
            "2023-2024": ["CT-1", "Midterm"],
            "2024-2025": ["CT-1", "CT-2", "Final"]
        }
    }
};

// Function to update the Exam dropdown based on selected Exam Level, Group, and Session
function updateExamList() {
    const examLevel = document.getElementById('exam-level').value;
    const group = document.getElementById('group').value;
    const session = document.getElementById('session').value;
    const examDropdown = document.getElementById('exam');

    // Clear existing options in the Exam dropdown
    examDropdown.innerHTML = '<option value="">Select Exam</option>';

    // Check if the selected combination exists in the mapping
    if (examMapping[examLevel] && examMapping[examLevel][group] && examMapping[examLevel][group][session]) {
        const exams = examMapping[examLevel][group][session];

        // Populate the Exam dropdown with available exams
        exams.forEach(exam => {
            const option = document.createElement('option');
            option.value = exam;
            option.textContent = exam;
            examDropdown.appendChild(option);
        });
    } else {
        console.error('No exams available for the selected inputs.');
    }
}



document.getElementById('submit-btn').addEventListener('click', function (e) {
    e.preventDefault(); // Prevent form submission (page reload)

    const examName = document.getElementById('exam').value;
    const password = document.getElementById('password').value;

    // Validate password and exam selection
    if (password === "dcstudent" && examName) {
        // Redirect to the result page corresponding to the selected exam
        window.location.href = `results/${examName}.html`;
    } else {
        alert('Invalid password or exam selection. Please try again.');
    }
});



// Add event listeners to the dropdown menus
document.getElementById('exam-level').addEventListener('change', updateExamList);
document.getElementById('group').addEventListener('change', updateExamList);
document.getElementById('session').addEventListener('change', updateExamList);






