import { updateDateTime } from './script.js';

document.addEventListener('DOMContentLoaded', function () {
  updateDateTime();
  console.log(updateDateTime());
  console.log(updateDateTime().slice(19, 28));
});

const filesContainer = document.querySelector('.files');
const fileContainer = document.querySelector('.file-container');
const fileInput = document.getElementById('file-input');

const selectedFiles = [];

fileInput.addEventListener('change', handleFileSelect);

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
      // selectedFiles.push(fileCardContainer);
      selectedFiles.push(file);

      const deleteButton = document.createElement('button');
      deleteButton.innerHTML = '<i class="fas fa-times"></i>';
      deleteButton.className = 'delete-button';

      deleteButton.addEventListener('click', function () {
        const fileCardContainer = this.parentNode;

        const index = selectedFiles.indexOf(file);
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

///////////////////////////

const submit = document.getElementById('sendMessage');
const chatContainer = document.querySelector('.chats');

const chatMessages = [
  {
    name: 'Johnson Cane',
    subject: 'Lorem ipsum dolor sit amet...',
    message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
    image: 'https://randomuser.me/api/portraits/women/30.jpg',
    date: 'October 23rd',
    time: '03:22 pm',
  },
];

submit.addEventListener('click', function submitMessage() {
  const name = document.getElementById('userName').innerText;
  const image = document.getElementById('userImage').src;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('inputField').value;

  //   const timestamp = new Date().getTime();

  //   document.addEventListener('DOMContentLoaded', function () {
  //     subject.addEventListener('input', updateValues);
  //     message.addEventListener('input', updateValues);

  //     function updateValues() {
  //       inboxValues.subject = subject.value;
  //       inboxValues.message = message.value;
  //       console.log(inboxValues);
  //     }
  //     //   console.log(inboxValues);
  //   });

  let inboxValues = {
    name,
    subject: subject,
    message: message,
    image,
    file: selectedFiles || [],
    id: Math.random(),
    time: updateDateTime().slice(19, 28),
    date: updateDateTime().slice(5, 19),
  };
  console.log(inboxValues.file);
  chatMessages.push(inboxValues);

  //  inboxValues.date = updateDateTime(inboxValues.timestamp);

  console.log(inboxValues);
  console.log(chatMessages);

  renderChatMessages();
  updateDateTime();
});

function renderChatMessages() {
  chatContainer.innerHTML = '';
  chatMessages.forEach((message) => {
    const chatMessage = document.createElement('div');
    chatMessage.className = 'inbox-card user';

    const attachmentsHTML = message.files
      .map((file) => {
        if (file.type.startsWith('image')) {
          return `<img src="${URL.createObjectURL(file)}" alt="Attachment" />`;
        } else {
          return `<a href="${URL.createObjectURL(
            file
          )}" download>Download File</a>`;
        }
      })
      .join('');

    chatMessage.innerHTML = `
<div class="user-inbox">
<div class="user-inbox_header">
     <div>
     <img
     src="${message.image}"
     alt="Client Image" class="user-image" />
     </div>
     <div>
        <h3 class="user-inbox_tab-name">${message.name}</h3>
        <h4 class="user-inbox_tab-subject">Subject: ${message.subject}</h4>
           </div>
  </div>

  <div class="user-inbox_tab">

     <p class="user-inbox_tab-text">${message.message}</p>
  </div>

  <div class="user-inbox_tab">

     <p class="user-inbox_tab-text">${attachmentsHTML}</p>
  </div>

  <div class="user-inbox_info">
  <p class="user-inbox_info-date ">${message.time}</p>
     <p class="user-inbox_info-time">${message.date}</p>
  </div>

  <div class="user-inbox_actions">
     <i class="fa-solid fa-ellipsis-vertical"></i>
  </div>

  <div class="inbox-actions user">
     <p class="inbox-actions_btns">Archive</p>
     <p class="inbox-actions_btns">Report Spam</p>
     <p class="inbox-actions_btns">Delete</p>
     </div>
</div>
   `;

    chatContainer.appendChild(chatMessage);
  });

  //////////////////////

  const inboxAction = document.querySelectorAll('.user-inbox_actions');
  const inboxActionTab = document.querySelectorAll('.inbox-actions');

  function hideAllTabs() {
    inboxActionTab.forEach((tab) => {
      tab.style.display = 'none';
    });
  }

  document.body.addEventListener('click', function (event) {
    const target = event.target;

    let isInsideInbox = false;

    for (let i = 0; i < inboxAction.length; i++) {
      if (
        inboxAction[i].contains(target) ||
        inboxActionTab[i].contains(target)
      ) {
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
}
