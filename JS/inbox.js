import { updateDateTime } from './script.js';

document.addEventListener('DOMContentLoaded', function () {
  updateDateTime();
});

// JavaScript to toggle the display for INBOX, SENT, SPAM AND TRASH
const chatContainer = document.querySelector('.chats');
const sentContainer = document.querySelector('.sentMessages');

const main = document.querySelector('.main');
const sidebar = document.querySelector('.sidebar');

const messageSelect = document.getElementById('messageSelect');
messageSelect.addEventListener('change', function selectedFiles() {
  if (messageSelect.value === 'inbox') {
    chatContainer.style.display = 'block';
    sentContainer.style.display = 'none';
  } else if (messageSelect.value === 'sent') {
    chatContainer.style.display = 'none';
    sentContainer.style.display = 'block';
  }
});

// Open Compose message modal
const composeBtn = document.querySelector('.composeBtn');
const composeModal = document.querySelector('.compose');

composeBtn.addEventListener('click', openComposeModal);

function openComposeModal(event) {
  event.stopPropagation();
  composeModal.classList.toggle('openModal');

  if (composeModal.classList.contains('openModal')) {
    main.classList.add('blur');
    sidebar.classList.add('blur');
    main.classList.add('no-scroll');
  } else {
    main.classList.remove('blur');
    sidebar.classList.remove('blur');
    main.classList.remove('no-scroll');
  }
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
const inboxMessage = document.querySelectorAll('.user-inbox_tab-text');
const sentMessage = document.querySelectorAll('.user-sent_tab-text');

const originalInboxText = [];
const originalSentText = [];

function getFirst20Words(text, originalTextArray) {
  const words = text.split(' ');
  const slicedWords = words.slice(0, 40).join(' ') + '...';
  originalTextArray.push(text);
  return slicedWords;
}

inboxMessage.forEach((message) => {
  const text = message.textContent;
  const snippet = getFirst20Words(text, originalInboxText);
  message.textContent = snippet;
});

sentMessage.forEach((message) => {
  const text = message.textContent;
  const snippet = getFirst20Words(text, originalSentText);
  message.textContent = snippet;
});

// display images when clicked
const imageModal = document.getElementById('imageModal');
const enlargedImg = document.getElementById('enlargedImg');

function openImageModal(src) {
  enlargedImg.src = src;
  imageModal.classList.add('openModal');
  console.log(imageModal, enlargedImg);
}

// display messages when clicked
const inboxCard = document.querySelectorAll('.inbox-card');
const messageDisplay = document.querySelector('.messageDisplay');
const closeModalButton = document.querySelectorAll('.closeModal');

function openModal(i, isSent) {
  const sentCard = document.querySelectorAll('.sent-card');
  messageDisplay.style.display = 'block';
  messageDisplay.innerHTML = '';
  const newElement = document.createElement('div');

  const messageContent = `
       <div class="${isSent ? 'sent-card' : 'inbox-card'}">
         ${isSent ? sentCard[i].innerHTML : inboxCard[i].innerHTML}
         <div class="close closeModal" id="">&times;</div>
       </div>`;

  newElement.style.height = '80%';
  newElement.innerHTML = messageContent;
  messageDisplay.appendChild(newElement);

  const userInboxTabText = messageDisplay.querySelector('.user-inbox_tab-text');
  const userSentTabText = messageDisplay.querySelector('.user-sent_tab-text');

  console.log(userSentTabText);

  if (userInboxTabText && !isSent) {
    userInboxTabText.textContent = originalInboxText[i];
  }
  if (userSentTabText && isSent) {
    userSentTabText.textContent = originalSentText[i];
  }

  messageDisplay.classList.toggle('openModal');

  if (messageDisplay.classList.contains('openModal')) {
    main.classList.add('blur');
    sidebar.classList.add('blur');
    main.classList.add('no-scroll');
  } else {
    main.classList.remove('blur');
    sidebar.classList.remove('blur');
    main.classList.remove('no-scroll');
  }

  const closeButton = newElement.querySelector('.close');
  closeButton.style.display = 'block';

  closeButton.addEventListener('click', function (event) {
    event.stopPropagation();
    closeModal();
  });
}

const messagesContainer = document.querySelector('.main');

// Event delegation for both inbox and sent messages
messagesContainer.addEventListener('click', function (event) {
  const target = event.target;

  // Check if the clicked element is inside an inbox or sent message
  let inboxMessageElement = target.closest('.inbox-card');
  let sentMessageElement = target.closest('.sent-card');

  if (inboxMessageElement) {
    let index = Array.from(inboxCard).indexOf(inboxMessageElement);
    console.log('Clicked on inbox message via delegation');
    openModal(index, false);
  } else if (sentMessageElement) {
    let index = Array.from(sentContainer.children).indexOf(sentMessageElement);
    console.log('Clicked on sent message via delegation');
    openModal(index, true);
  }

  // Check if the clicked element is an image
  if (target.classList.contains('attachmentFile')) {
    openImageModal(target.src);
  }
});
// Enlarge image function

// Event delegation for sent messages
messagesContainer.addEventListener('click', function (event) {
  const target = event.target;

  // Check if the clicked element is inside a sent message
  let messageElement = target.closest('.sent-card');
  if (messageElement) {
    let index = Array.from(sentContainer.children).indexOf(messageElement);
    console.log('Clicked on sent message via delegationXXXXXX');
    openModal(index, true);
  }
});

// Event delegation for sent messages
sentContainer.addEventListener('click', function (event) {
  const target = event.target;

  // Check if the clicked element is inside a sent message
  let messageElement = target.closest('.sent-card');
  if (messageElement) {
    // Extract the message ID from the clicked element's dataset attribute
    const messageId = messageElement.dataset.messageId;

    openModal(null, true, messageId);
  }
});

// sentContainer.addEventListener('click', function (event) {
//   const target = event.target;

//   // Check if the clicked element is inside a sent message
//   let messageElement = target.closest('.sent-card');
//   if (messageElement) {
//     // Check if the clicked element is an image inside the sent message
//     if (target.classList.contains('attachmentFile')) {
//       openImageModal(target.src);
//     } else {
//       let index = Array.from(sentContainer.children).indexOf(messageElement);
//       console.log('Clicked on sent message via delegation');
//       openModal(index, true);
//     }
//   }
// });

// JavaScript for Submit and Message addition
const submit = document.getElementById('sendMessage');

let sentMessages = [
  {
    name: 'Michael Brown',
    subject: ' The Power of Gratitude: Transforming Lives',
    message: `     Hey there,
      I hope this email finds you well. I wanted to share some groundbreaking news in the world of
      technology. The advancements we're witnessing are truly remarkable, and it's shaping the way we
      live and work. From artificial intelligence to quantum computing, the possibilities seem endless.
      Sit back, relax, and let's delve into the fascinating realm of technological wonders!
      Pretium viverra suspendisse potenti nullam ac tortor vitae. Vitae proin
      sagittis nisl rhoncus mattis rhoncus urna neque viverra. Egestas dui id ornare arcu odio ut sem.
      Pharetra sit amet aliquam id diam maecenas ultricies mi eget. In ante metus dictum at tempor
      commodo ullamcorper a. Et sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque.
      Nascetur ridiculus mus mauris vitae. Augue mauris augue neque gravida. Consequat id porta nibh
      venenatis cras sed. Cursus mattis molestie a iaculis. Luctus venenatis lectus magna fringilla urna.
      Faucibus vitae aliquet nec ullamcorper sit amet risus. Vehicula ipsum a arcu cursus vitae congue
      mauris. Sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec. Eget velit aliquet
      sagittis id consectetur purus ut faucibus pulvinar. Neque volutpat ac tincidunt vitae semper quis
      lectus nulla. Vel facilisis volutpat est velit. Diam volutpat commodo sed egestas egestas fringilla
      phasellus. Pharetra vel turpis nunc eget lorem. At tellus at urna condimentum mattis pellentesque.`,
    image: 'https://randomuser.me/api/portraits/women/30.jpg',
    date: 'November 23rd',
    time: '03:22 pm',
    files: [],
    id: Math.random(),
    isDummy: true,
    id: 'unique-dummy-id-1',
  },
];
// let sentMessages = [];

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
    isDummy: true,
  };

  //   sentMessages = [];
  sentMessages.push(inboxValues);
  addChatMessage(sentMessages);
  console.log(sentMessages);

  subject.value = '';
  message.value = '';
  selectedFiles = [];
  fileInput.value = '';
  filesContainer.innerHTML = '';

  messageSelect.value = 'sent';
  chatContainer.style.display = 'none';
  sentContainer.style.display = 'block';

  main.classList.remove('blur');
  sidebar.classList.remove('blur');
  main.classList.remove('no-scroll');

  rendersentMessages();
  updateDateTime();
  composeModal.classList.remove('openModal');
});

rendersentMessages();

// JavaScript to add or render new messages to the DOM
function rendersentMessages() {
  sentContainer.innerHTML = '';

  sentMessages.forEach((message, index) => {
    const chatMessage = document.createElement('div');
    chatMessage.className = `sent-card user `;

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
         <div class="user-sent">
         <div class="user-sent_header">
            <div>
            <img
            src="${message.image}"
            alt="Client Image" class="user-image" />
            </div>
            <div>
               <h3 class="user-sent_tab-name">${message.name}</h3>
               <h4 class="user-sent_tab-subject">Subject: ${message.subject}</h4>
                  </div>
         </div>

         <div class="user-sent_tab">

            <p class="user-sent_tab-text">${message.message}</p>
         </div>

         <div class="files" style="display:flex" >          
            ${attachmentsHTML}         
         </div>

         <div class="user-sent_info">
         <p class="user-sent_info-date ">${message.time}</p>
            <p class="user-sent_info-time">${message.date}</p>
         </div>

         <div class="user-sent_actions">
            <i class="fa-solid fa-ellipsis-vertical"></i>
         </div>

         <div class="sent-actions user">
            <p class="sent-actions_btns">Archive</p>
            <p class="sent-actions_btns">Report Spam</p>
            <p class="sent-actions_btns">Delete</p>
            </div>
         </div>
   `;

    console.log(message.message);
    sentContainer.appendChild(chatMessage);

    chatMessage.addEventListener('click', function () {
      openModal(index, true);
    });

    scrollToBottom();
  });

  //   //   Enlarge image
  //   const imageModal = document.getElementById('imageModal');
  //   const images = document.querySelectorAll('.attachmentFile');

  //   function openModal(src) {
  //     const img = document.getElementById('enlargedImg');
  //     imageModal.classList.add('openModal');
  //     img.src = src;

  //     console.log(imageModal, img);
  //   }

  //   images.forEach((image) => {
  //     image.addEventListener('click', function () {
  //       openModal(this.src);
  //     });
  //   });

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

// Close opened Modal for compose and enlarged image

closeModalButton.forEach((closeButton) => {
  closeButton.addEventListener('click', function (event) {
    closeModal();
  });
});

function closeModal() {
  imageModal.classList.remove('openModal');
  composeModal.classList.remove('openModal');
  messageDisplay.classList.remove('openModal');
  messageDisplay.style.display = 'none';
  messageDisplay.innerHTML = '';
  messageSelect.value = 'inbox';

  main.classList.remove('blur');
  sidebar.classList.remove('blur');
  main.classList.remove('no-scroll');

  console.log('Closed Modal');
}

// Function to scroll the chat container to the bottom i.e to alwasy display a new chat
function scrollToBottom() {
  chatContainer.scrollTop =
    chatContainer.scrollHeight - chatContainer.clientHeight + 1;
}

function addChatMessage() {
  scrollToBottom();
}
