function updateProgress(progressId, percentage) {
  const progressCircle = document.getElementById(progressId);
  const progress = progressCircle.querySelector('.progress');
  const percentageText = progressCircle.querySelector('.percentage');

  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (percentage / 100) * circumference;

  progress.style.strokeDasharray = `${circumference} ${circumference}`;
  progress.style.strokeDashoffset = offset;
  percentageText.textContent = `${percentage}%`;
}

// Note that if it is 4/5 then calculate 4/5 * 100 and input the value

// Update progress for domain
updateProgress('domain', 75);

// Update progress for alias
updateProgress('alias', 100);

// Update progress for domainCreated
updateProgress('domainCreated', 25);
