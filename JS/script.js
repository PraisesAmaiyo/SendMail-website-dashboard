// script.js
const progress = document.querySelector('.progress');
const percentageText = document.querySelector('.percentage');

function updateProgress(percentage) {
  const circumference = 2 * Math.PI * 45; // Circumference of the circle
  const offset = circumference - (percentage / 100) * circumference;

  progress.style.strokeDasharray = `${circumference} ${circumference}`;
  progress.style.strokeDashoffset = offset;
  percentageText.textContent = `${percentage}%`;
}

// Example: Set progress to 75%
updateProgress(75);
