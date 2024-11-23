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
document.addEventListener('DOMContentLoaded', () => {
    // References to dropdowns and input fields
    const examLevelDropdown = document.getElementById('exam-level');
    const groupDropdown = document.getElementById('group');
    const sessionDropdown = document.getElementById('session');
    const examDropdown = document.getElementById('exam');
    const passwordInput = document.getElementById('password');
    const submitButton = document.getElementById('submit-btn');
    const resultContainer = document.getElementById('result-container');

    // Simulate an exam list based on dropdown selections
    const examData = {
        "HSC_Science_2023-2024": ["CT-1", "Midterm", "Final"],
        "HSC_Science_2024-2025": ["class-11_2024-2025_CT-1", "Midterm", "Final"],
        "HSC_Business Studies_2023-2024": ["CT-1", "Midterm"],
        "HSC_Humanities_2023-2024": ["CT-1"],
    };

    // Function to update the exam list
    function updateExamList() {
        // Get selected values
        const examLevel = examLevelDropdown.value;
        const group = groupDropdown.value;
        const session = sessionDropdown.value;

        // Construct key for exam data
        const key = `${examLevel}_${group}_${session}`;
        
        // Clear existing options
        examDropdown.innerHTML = '<option value="">Select Exam</option>';
        
        // Populate exam options based on the key
        if (examData[key]) {
            examData[key].forEach(exam => {
                const option = document.createElement('option');
                option.value = exam;
                option.textContent = exam;
                examDropdown.appendChild(option);
            });
        }
    }

    // Event listeners for dropdowns
    examLevelDropdown.addEventListener('change', updateExamList);
    groupDropdown.addEventListener('change', updateExamList);
    sessionDropdown.addEventListener('change', updateExamList);

    // Function to submit the form
    submitButton.addEventListener('click', () => {
        const selectedExam = examDropdown.value;
        const password = passwordInput.value;

        // Validate inputs
        if (!selectedExam) {
            alert('Please select an exam.');
            return;
        }
        if (!password) {
            alert('Please enter the password.');
            return;
        }

        // Send data to the backend
        fetch('/get-result', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                examName: selectedExam, // The exam name selected
                password: password      // The password entered by the user
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Display the result in the container
                resultContainer.innerHTML = data.resultHTML;
            } else {
                alert(data.message); // Show error message from the backend
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Something went wrong while fetching the result.');
        });
    });
});
