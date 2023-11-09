import { updateDateTime } from './script.js';

document.addEventListener('DOMContentLoaded', function () {
  updateDateTime();
});

// Open Compose message modal
const composeBtn = document.querySelector('.composeBtn');
const composeModal = document.querySelector('.compose');

composeBtn.addEventListener('click', openComposeModal);

function openComposeModal() {
  composeModal.classList.add('openModal');
}

// JavaScript for addition of files and documents from device memory
const filesContainer = document.querySelector('.files');
const fileContainer = document.querySelector('.file-container');
const fileInput = document.getElementById('file-input');

let selectedFiles = [];

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
        //   docIcon.style.fontSize = '8rem';
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

        fileInput.value = '';
      });

      fileCardContainer.appendChild(fileX);
      fileCardContainer.appendChild(deleteButton);
      filesContainer.appendChild(fileCardContainer);
    }
  }
}

// Function to extract the first 20 words from a text
const dummymessage = document.querySelectorAll('.user-inbox_tab-text');
const originalMessageText = [];

function getFirst20Words(text) {
  const words = text.split(' ');
  const slicedWords = words.slice(0, 40).join(' ') + '...';
  originalMessageText.push(text);
  return slicedWords;
}

dummymessage.forEach((message) => {
  const text = message.textContent;
  const snippet = getFirst20Words(text);
  message.textContent = snippet;
});

// display messages when clicked
const inboxCard = document.querySelectorAll('.inbox-card');

document.body.addEventListener('click', function (event) {
  const target = event.target;

  function hideAllTabs() {
    inboxCard.forEach((tab) => {
      tab.style.display = 'none';
    });
  }

  let isInsideInbox = false;
  for (let i = 0; i < inboxCard.length; i++) {
    if (inboxCard[i].contains(target)) {
      const messageDisplay = document.querySelector('.messageDisplay');
      messageDisplay.innerHTML = `
      <div class="inbox-card ">
         ${inboxCard[i].innerHTML}
         </div>`;

      const userInboxTabText = messageDisplay.querySelector(
        '.user-inbox_tab-text'
      );
      userInboxTabText.textContent = originalMessageText[i];
      messageDisplay.classList.add('modal', 'openModal');

      console.log(originalMessageText[i]);
    }
  }
});

// JavaScript for Submit and Message addition

const submit = document.getElementById('sendMessage');
const chatContainer = document.querySelector('.chats');

const chatMessages = [
  //   {
  //     name: 'Sarah Kins',
  //     subject: 'Domain and alias addition',
  //     message:
  //       'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molesti voluptatem repellendus eaque sunt harum  odio adipisci magni architecto corrupti, veniam consequuntur iusto dicta accusantium aut perspiciatis illo autem at.',
  //     image: 'https://randomuser.me/api/portraits/women/30.jpg',
  //     date: 'October 23rd',
  //     time: '03:22 pm',
  //     files: [],
  //     id: Math.random(),
  //   },
];

// Initialize the inbox tab when there are no messages
// if (chatMessages < 1) {
//   chatContainer.innerHTML = `
//    <p class ="no-messages">You have no Messages. Click on the Compose Button to send a message</p>
//    `;
//   console.log('fffff');
// } else {
//   chatContainer.innerHTML = `${{ chatMessages }}`;
// }

submit.addEventListener('click', function submitMessage() {
  const name = document.getElementById('userName').innerText;
  const image = document.getElementById('userImage').src;
  const subject = document.getElementById('subject');
  const message = document.getElementById('inputField');

  const subjectValue = subject.value;
  const messageValue = message.value;

  let inboxValues = {
    name,
    subject: subjectValue,
    message: messageValue,
    image,
    files: selectedFiles || [],
    id: Math.random(),
    time: updateDateTime().slice(19, 28),
    date: updateDateTime().slice(5, 19),
  };

  chatMessages.push(inboxValues);

  addChatMessage(chatMessages);

  subject.value = '';
  message.value = '';
  selectedFiles = [];
  fileInput.value = '';
  filesContainer.innerHTML = '';

  renderChatMessages();
  updateDateTime();
  composeModal.classList.remove('openModal');
});

// JavaScript to add or render new messages to the DOM
function renderChatMessages() {
  chatContainer.innerHTML = '';

  chatMessages.forEach((message) => {
    const chatMessage = document.createElement('div');
    chatMessage.className = 'inbox-card user';

    const attachmentsHTML = message.files
      .map((file) => {
        if (file.type.startsWith('image')) {
          return `
          <div class="file-card_display">
            <div style="display: flex;">
               <img src="${URL.createObjectURL(
                 file
               )}" alt="Attachment" class="attachmentFile" />        
            </div>
         </div>
         `;
        } else {
          return `
          <div class="file-card_display">
          <div style="display: flex;">
          <a href="${URL.createObjectURL(file)}" download>
            <div class="fa-solid fa-file-lines doc-icon"></div>
             </a>
          </div>
        </div>
        
         `;
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

         <div class="files" style="display:flex" >
          
            ${attachmentsHTML}
              
         
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

    scrollToBottom();
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

  // Enlarge image
  const imageModal = document.getElementById('imageModal');
  const images = document.querySelectorAll('.attachmentFile');

  function openModal(src) {
    const img = document.getElementById('enlargedImg');
    imageModal.classList.add('openModal');
    img.src = src;

    console.log(imageModal, img);
  }

  images.forEach((image) => {
    image.addEventListener('click', function () {
      openModal(this.src);
    });
  });
}

// Close opened Modal for compose and enlarged image
const closeModalButton = document.querySelectorAll('.closeModal');
const imageModal = document.getElementById('imageModal');

closeModalButton.forEach((closeButton) => {
  closeButton.addEventListener('click', closeModal);
});

function closeModal() {
  imageModal.classList.remove('openModal');
  composeModal.classList.remove('openModal');
  console.log('object');
}

// Function to scroll the chat container to the bottom i.e to alwasy display a new chat
function scrollToBottom() {
  chatContainer.scrollTop =
    chatContainer.scrollHeight - chatContainer.clientHeight + 1;
}

function addChatMessage() {
  scrollToBottom();
}
