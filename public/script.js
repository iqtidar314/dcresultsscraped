const examMapping = {
    "HSC": {
        "Science": {
            "2023-2024": ["Test Exam _HSC-1st Year-Science_2023-2024"],
<<<<<<< HEAD
            "2024-2025": ["CT-1_HSC-1st Year-Science_2024-2025", "SE_HSC-1st Year-Science_2024-2025", "Half Yearly_HSC-1st Year-Science_2024-2025", "CT-2_HSC-1st Year-Science_2024-2025", "Year Final_HSC-1st Year-Science_2024-2025"],
        },
        "Business Studies": {
            "2023-2024": ["Test Exam _HSC-1st Year-Business Studies_2023-2024"],
            "2024-2025": ["CT-1_HSC-1st Year-Business Studies_2024-2025", "SE_HSC-1st Year-Business Studies_2024-2025", "Half Yearly_HSC-1st Year-Business Studies_2024-2025", "CT-2_HSC-1st Year-Business Studies_2024-2025", "Year Final Exam_HSC-1st Year-Business Studies_2024-2025"]
=======
            "2024-2025": ["CT-1_HSC-1st Year-Science_2024-2025", "SE_HSC-1st Year-Science_2024-2025","Half Yearly_HSC-1st Year-Science_2024-2025","CT-2_HSC-1st Year-Science_2024-2025","Year Final_HSC-1st Year-Science_2024-2025"],
        },
        "Business Studies": {
            "2023-2024": ["Test Exam _HSC-1st Year-Business Studies_2023-2024"],
            "2024-2025": ["CT-1_HSC-1st Year-Business Studies_2024-2025","SE_HSC-1st Year-Business Studies_2024-2025","Half Yearly_HSC-1st Year-Business Studies_2024-2025","CT-2_HSC-1st Year-Business Studies_2024-2025","Year Final Exam_HSC-1st Year-Business Studies_2024-2025"]
>>>>>>> origin/main
        },
        "Humanities": {
            "2023-2024": ["Test Exam _HSC-1st Year-Humanites_2023-2024"],
            "2024-2025": ["CT-1_HSC-1st Year-Humanites_2024-2025", "SE_HSC-1st Year-Humanites_2024-2025", "Half Yearly_HSC-1st Year-Humanites_2024-2025", "CT-2_HSC-1st Year-Humanites_2024-2025", "Year Final_HSC-1st Year-Humanites_2024-2025"]
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
            const exams = examMapping[examLevel] ? . [group] ? . [session] || [];

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
        // Send the selected exam and password to the backend
        fetch('/get-result', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    examName: selectedExam,
                    password: password,
                }),
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch result');
                }
                return response.json();
            })
            .then((data) => {
                if (data.success) {
                    // Redirect to the unique result page URL
                    window.location.href = data.url;
                } else {
                    alert('Failed to generate result.');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Unable to load the result.');
            });
    });
});