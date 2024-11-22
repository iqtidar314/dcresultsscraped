document.getElementById('exam-level').addEventListener('change', updateExamList);
document.getElementById('groups').addEventListener('change', updateExamList);
document.getElementById('session').addEventListener('change', updateExamList);

// Update the exam list based on selected criteria
function updateExamList() {
    const level = document.getElementById('exam-level').value;
    const group = document.getElementById('groups').value;
    const session = document.getElementById('session').value;

    // Fetch the exam list from the backend
    fetch(`https://dc-student-results.onrender.com/api/exams?level=${level}&group=${group}&session=${session}`)
        .then(response => response.json())
        .then(data => {
            const examSelect = document.getElementById('exam');
            examSelect.innerHTML = '<option value="">Select Exam</option>'; // Clear previous options

            // Add new exam options
            data.exams.forEach(exam => {
                const option = document.createElement('option');
                option.value = exam;
                option.textContent = exam;
                examSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching exam list:', error));
}

// Handle form submission
document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault();

    const examName = document.getElementById('exam-list').value;
    const password = document.getElementById('password').value;

    if (password === "dcstudent" && examName) {
        // Redirect to the correct result page
        window.location.href = `result/${examName}.html`;
    } else {
        alert('Invalid password or exam selection. Please try again.');
    }
});

const examMapping = {
    "HSC": {
        "Science": {
            "2023-2024": ["CT-1", "CT-2", "Final"],
            "2024-2025": ["class-11_2024-2025_CT-1", "CT-2"],
        },
        "Business Studies": {
            "2023-2024": ["Midterm", "Final"],
            "2024-2025": ["Midterm"],
        },
        "Humanities": {
            "2023-2024": ["CT-1", "Midterm"],
            "2024-2025": ["CT-1", "CT-2", "Final"],
        }
    }
};
function updateExamList() {
    const examLevel = document.getElementById('exam-level').value;
    const group = document.getElementById('group').value;
    const session = document.getElementById('session').value;
    const examDropdown = document.getElementById('exam-list');

    // Clear existing options
    examDropdown.innerHTML = '<option value="" disabled selected>Select Exam</option>';

    // Check if valid inputs exist in the mapping
    if (examMapping[examLevel] && examMapping[examLevel][group] && examMapping[examLevel][group][session]) {
        const exams = examMapping[examLevel][group][session];

        // Populate the dropdown with available exams
        exams.forEach(exam => {
            const option = document.createElement('option');
            option.value = exam; // The exam file name without extension
            option.textContent = exam; // Displayed text
            examDropdown.appendChild(option);
        });
    } else {
        console.error('No exams available for the selected inputs.');
    }
}

