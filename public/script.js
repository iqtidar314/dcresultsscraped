
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
document.addEventListener('DOMContentLoaded', () => {
    const examLevelDropdown = document.getElementById('exam-level');
    const groupDropdown = document.getElementById('group');
    const sessionDropdown = document.getElementById('session');
    const examDropdown = document.getElementById('exam');
    const passwordInput = document.getElementById('password');
    const submitButton = document.getElementById('submit-btn');

    // Function to update the exam list
    function updateExamList() {
        const examLevel = examLevelDropdown.value;
        const group = groupDropdown.value;
        const session = sessionDropdown.value;

        // Clear existing options
        examDropdown.innerHTML = '<option value="">Select Exam</option>';

        // Validate selections before accessing examMapping
        if (examLevel && group && session) {
            const exams = examMapping[examLevel]?.[group]?.[session] || [];

            // Populate the exam dropdown
            exams.forEach((exam) => {
                const option = document.createElement('option');
                option.value = exam;
                option.textContent = exam;
                examDropdown.appendChild(option);
            });
        }
    }

    // Event listeners for dropdown changes
    examLevelDropdown.addEventListener('change', updateExamList);
    groupDropdown.addEventListener('change', updateExamList);
    sessionDropdown.addEventListener('change', updateExamList);

    // Form submission
    submitButton.addEventListener('click', () => {
        const selectedExam = examDropdown.value;
        const password = passwordInput.value;

        if (!selectedExam || !password) {
            alert('Please fill all fields.');
            return;
        }

        fetch('/get-result', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ examName: selectedExam, password })
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                const resultURL = `/results/${selectedExam}.html`;
                window.open(resultURL, '_blank');
            } else {
                alert(data.message);
            }
        })
        .catch((err) => {
            console.error(err);
            alert('An error occurred while fetching the result.');
        });
    });
});



