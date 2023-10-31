const inboxAction = document.querySelectorAll('.user-inbox_actions');
const inboxActionTab = document.querySelectorAll('.inbox-actions');
const inboxActionBtn = document.querySelectorAll('.inbox_actions_btns');

function hideAllTabs() {
  inboxActionTab.forEach((tab) => {
    tab.style.display = 'none';
  });
}

document.body.addEventListener('click', function (event) {
  const target = event.target;

  let isInsideInbox = false;

  for (let i = 0; i < inboxAction.length; i++) {
    if (inboxAction[i].contains(target) || inboxActionTab[i].contains(target)) {
      isInsideInbox = true;
      break;
    }
  }

  if (!isInsideInbox) {
    hideAllTabs();
  }
});

inboxAction.forEach((openActionBtn, index) => {
  openActionBtn.addEventListener('click', function (e) {
    e.stopPropagation();

    if (inboxActionTab[index].style.display === 'block') {
      inboxActionTab[index].style.display = 'none';
    } else {
      hideAllTabs();
      inboxActionTab[index].style.display = 'block';
    }
  });
});

///////////////////////

const filesContainer = document.querySelector('.files');
const fileContainer = document.querySelector('.file-container');
const fileInput = document.getElementById('file-input');

fileInput.addEventListener('change', handleFileSelect);

const selectedFiles = [];

function handleFileSelect(event) {
  const files = event.target.files;

  if (files.length > 0) {
    filesContainer.style.display = 'flex';

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileCardContainer = document.createElement('div');
      fileCardContainer.className = 'file-card';

      const fileX = document.createElement('div');

      const fileExtension = file.name.split('.').pop().toLowerCase();
      if (['jpg', 'jpeg', 'png'].includes(fileExtension)) {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        img.style.maxWidth = '100%';
        img.style.maxHeight = '100%';
        fileX.style.display = 'flex';
        fileX.appendChild(img);
      } else {
        const docIcon = document.createElement('i');
        docIcon.className = 'fa-solid fa-file-lines doc-icon';
        docIcon.style.fontSize = '8rem';
        fileX.appendChild(docIcon);
      }
      selectedFiles.push(fileCardContainer);

      const deleteButton = document.createElement('button');
      deleteButton.innerHTML = '<i class="fas fa-times"></i>';
      deleteButton.className = 'delete-button';

      deleteButton.addEventListener('click', function () {
        const fileCardContainer = this.parentNode;

        const index = selectedFiles.indexOf(fileCardContainer);
        if (index !== -1) {
          selectedFiles.splice(index, 1);
        }

        filesContainer.removeChild(fileCardContainer);

        if (selectedFiles.length === 0) {
          filesContainer.style.display = 'none';
        }
      });

      fileCardContainer.appendChild(fileX);
      fileCardContainer.appendChild(deleteButton);
      filesContainer.appendChild(fileCardContainer);
    }
  }
}
