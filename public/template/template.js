// Show Instructions Modal
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('instructions-modal');
  const showInstructions = document.getElementById('show-instructions');
  const closeModal = document.getElementById('close-modal');

  // Auto-show modal after 2 seconds
  setTimeout(() => {
    modal.style.display = 'flex';
  }, 2000);

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
