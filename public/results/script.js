/*= {
    "HSC": {
        "Science": {
            "2023-2024": ["Test Exam _HSC-1st Year-Science_2023-2024"],
            "2024-2025": ["CT-1_HSC-1st Year-Science_2024-2025", "SE_HSC-1st Year-Science_2024-2025","Half Yearly_HSC-1st Year-Science_2024-2025","CT-2_HSC-1st Year-Science_2024-2025","Year Final_HSC-1st Year-Science_2024-2025"],
        },
        "Business Studies": {
            "2023-2024": ["Test Exam _HSC-1st Year-Business Studies_2023-2024"],
            "2024-2025": ["CT-1_HSC-1st Year-Business Studies_2024-2025","SE_HSC-1st Year-Business Studies_2024-2025","Half Yearly_HSC-1st Year-Business Studies_2024-2025","CT-2_HSC-1st Year-Business Studies_2024-2025","Year Final Exam_HSC-1st Year-Business Studies_2024-2025"]
        },
        "Humanities": {
            "2023-2024": ["Test Exam _HSC-1st Year-Humanites_2023-2024"],
            "2024-2025": ["CT-1_HSC-1st Year-Humanites_2024-2025", "SE_HSC-1st Year-Humanites_2024-2025", "Half Yearly_HSC-1st Year-Humanites_2024-2025", "CT-2_HSC-1st Year-Humanites_2024-2025", "Year Final_HSC-1st Year-Humanites_2024-2025"]
        }
    }
};*/
// Show Instructions Modal
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('instructions-modal');
    const showInstructions = document.getElementById('show-instructions');
    const closeModal = document.getElementById('close-modal');
  
    // Auto-show modal after 2 seconds
  
    // Manual show modal
    showInstructions.addEventListener('click', () => {
      modal.style.display = 'flex';
    });
  
    // Close modal
    closeModal.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  
    // Close modal on outside click
    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  });
  
  
  const examMapping = {
      "HSC": {
          "Science": {
              "2023-2024": ["Test Exam_HSC-2nd Year-Science_2023-2024","SE_Exam_HSC-2nd_Year-Science_2023-2024"],
              "2024-2025": ["CT-1_HSC-1st Year-Science_2024-2025", "SE_HSC-1st Year-Science_2024-2025","Half Yearly_HSC-1st Year-Science_2024-2025","CT-2_HSC-1st Year-Science_2024-2025","Year Final_HSC-1st Year-Science_2024-2025"],
          },
          "Business Studies": {
              "2023-2024": ["Test Exam_HSC-2nd Year-Business Studies_2023-2024","SE_HSC-2nd_Year-Business_Studies_2023-2024"],
              "2024-2025": ["CT-1_HSC-1st Year-Business Studies_2024-2025","SE_HSC-1st Year-Business Studies_2024-2025","Half Yearly_HSC-1st Year-Business Studies_2024-2025","CT-2_HSC-1st Year-Business Studies_2024-2025","Year Final Exam_HSC-1st Year-Business Studies_2024-2025"]
          },
          "Humanities": {
              "2023-2024": ["Test Exam_HSC-2nd Year-Humanites_2023-2024","SE_Exam_HSC-2nd_Year-Humanities_2023-2024"],
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
                  // If response is not ok, read the error message from the response body
                  return response.text().then((errorText) => {
                      throw new Error(errorText);  // Throw error with the message from the backend
                  });
              }
              return response.json();  // Parse the successful response as JSON
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
              alert('Unable to load the result/ Invalid Password enter');
          });
      });
  });