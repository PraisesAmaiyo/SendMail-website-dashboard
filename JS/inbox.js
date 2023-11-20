import { updateDateTime } from './script.js';

document.addEventListener('DOMContentLoaded', function () {
  updateDateTime();
});

// JavaScript to toggle the display for INBOX, SENT, SPAM AND TRASH
const chatContainer = document.querySelector('.chats');
const sentContainer = document.querySelector('.sentMessages');
const trashContainer = document.querySelector('.trashMessages');
const spamContainer = document.querySelector('.spamMessages');

const main = document.querySelector('.main');
const sidebar = document.querySelector('.sidebar');

const messageSelect = document.getElementById('messageSelect');
messageSelect.addEventListener('change', function selectedFiles() {
  if (messageSelect.value === 'inbox') {
    chatContainer.style.display = 'block';
    sentContainer.style.display = 'none';
    spamContainer.style.display = 'none';
    trashContainer.style.display = 'none';
  } else if (messageSelect.value === 'sent') {
    sentContainer.style.display = 'block';
    chatContainer.style.display = 'none';
    spamContainer.style.display = 'none';
    trashContainer.style.display = 'none';
  } else if (messageSelect.value === 'trash') {
    trashContainer.style.display = 'block';
    chatContainer.style.display = 'none';
    sentContainer.style.display = 'none';
    chatContainer.style.display = 'none';
  } else if (messageSelect.value === 'spam') {
    spamContainer.style.display = 'block';
    sentContainer.style.display = 'none';
    chatContainer.style.display = 'none';
    trashContainer.style.display = 'none';
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
        const fileIconContainer = document.createElement('div');
        fileIconContainer.style.display = 'flex';

        if (file.type === 'application/pdf') {
          const pdfIcon = document.createElement('i');
          pdfIcon.className = 'fa-solid fa-file-pdf doc-icon';
          fileIconContainer.appendChild(pdfIcon);
        } else if (
          file.type === 'application/msword' ||
          file.type ===
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ) {
          const wordIcon = document.createElement('i');
          wordIcon.className = 'fa-solid fa-file-word doc-icon';
          fileIconContainer.appendChild(wordIcon);
        } else {
          const genericIcon = document.createElement('i');
          genericIcon.className = 'fa-regular fa-file doc-icon';
          fileIconContainer.appendChild(genericIcon);
        }

        fileX.appendChild(fileIconContainer);
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
const trashMessage = document.querySelectorAll('.user-trash_tab-text');
const spamMessage = document.querySelectorAll('.user-spam_tab-text');

const originalInboxText = [];
const originalSentText = [];
const originalTrashText = [];
const originalSpamText = [];

function getFirst40Words(text, originalTextArray) {
  const words = text.split(' ');
  const slicedWords = words.slice(0, 40).join(' ');

  if (words.length > 40) {
    originalTextArray.push(text);
    return slicedWords + '...';
  } else {
    originalTextArray.push(text);
    return text;
  }
}

inboxMessage.forEach((message) => {
  const text = message.textContent;
  const snippet = getFirst40Words(text, originalInboxText);
  message.textContent = snippet;
});

sentMessage.forEach((message) => {
  const text = message.textContent;
  const snippet = getFirst40Words(text, originalSentText);
  message.textContent = snippet;
});

trashMessage.forEach((message) => {
  const text = message.textContent;
  const snippet = getFirst40Words(text, originalTrashText);
  message.textContent = snippet;
});

spamMessage.forEach((message) => {
  const text = message.textContent;
  const snippet = getFirst40Words(text, originalSpamText);
  message.textContent = snippet;
});

// display images when clicked
const imageModal = document.getElementById('imageModal');
const enlargedImg = document.getElementById('enlargedImg');

function openImageModal(src) {
  enlargedImg.src = src;
  imageModal.classList.add('openModal');
  console.log('IMAGE');
}

// display messages when clicked
const inboxCard = document.querySelectorAll('.inbox-card');
const sentCard = document.querySelectorAll('.sent-card');
const trashCard = document.querySelectorAll('.trash-card');
const spamCard = document.querySelectorAll('.spam-card');
const messageDisplay = document.querySelector('.messageDisplay');

function openModal(i, inbox) {
  messageDisplay.style.display = 'block';
  messageDisplay.innerHTML = '';
  const messageCard = document.createElement('div');

  //   const messageContainer = inboxCard ? sentMessage : inboxMessage;
  //   const message = messageContainer[i];

  //   if (message) {
  //     const attachmentsHTML = message.files
  //       ? message.files
  //           .map((file) => {
  //             if (file.type.startsWith('image')) {
  //               return `
  //         <div class="file-card_display">
  //           <div style="display: flex;">
  //             <img src="${
  //               URL.createObjectURL(file)
  //               //   file.path
  //             }" alt="Attachment" class="attachmentFile" />
  //           </div>
  //         </div>
  //       `;
  //             } else if (file.type === 'application/pdf') {
  //               return `
  //           <div class="file-card_display">
  //              <div style="display: flex;">
  //                <a href="${URL.createObjectURL(file)}" download>
  //                 <i class="fa-solid fa-file-pdf doc-icon"></i>
  //                <a>
  //              </div>
  //           </div>`;
  //             } else if (
  //               file.type === 'application/msword' ||
  //               file.type ===
  //                 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  //             ) {
  //               return `
  //           <div class="file-card_display">
  //              <div style="display: flex;">
  //                <a href="${URL.createObjectURL(file)}" download>
  //                 <i class="fa-solid fa-file-word doc-icon"></i>
  //                <a>
  //             </div>
  //           </div>`;
  //             } else {
  //               // Add more conditions for other file types if needed
  //               return `
  //           <div class="file-card_display">
  //             <div style="display: flex;">
  //                <a href="${URL.createObjectURL(file)}" download>
  //                   <i class="fa-regular fa-file doc-icon"></i>
  //                <a>
  //             </div>
  //           </div>`;
  //             }
  //           })
  //           .join('')
  //       : '';

  const messageContent = `
      <div class="${inbox ? 'inbox-card' : 'sent-card'}">
        ${inbox ? inbox[i].innerHTML : ''}
        <div class="close closeModal" id="">&times;</div>
      </div>`;

  messageCard.style.height = '80%';
  messageCard.innerHTML = messageContent;
  messageDisplay.appendChild(messageCard);

  const userInboxTabText = messageDisplay.querySelector('.user-inbox_tab-text');
  const userSentTabText = messageDisplay.querySelector('.user-sent_tab-text');
  const userTrashTabText = messageDisplay.querySelector('.user-trash_tab-text');
  const userSpamTabText = messageDisplay.querySelector('.user-spam_tab-text');

  if (userInboxTabText && inboxCard) {
    userInboxTabText.textContent = originalInboxText[i];
  }

  if (userSentTabText && sentCard) {
    userSentTabText.textContent = originalSentText[i];
  }

  if (userTrashTabText && trashCard) {
    userTrashTabText.textContent = originalTrashText[i];
  }

  if (userSpamTabText && spamCard) {
    userSpamTabText.textContent = originalSpamText[i];
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

  messageDisplay.addEventListener('click', function (event) {
    const target = event.target;

    // Check if the clicked element is inside a sent message
    let attachmentElement = target.closest('.sent-card');
    if (attachmentElement) {
      // Check if the clicked element is an image
      if (target.classList.contains('attachmentFile')) {
        openImageModal(target.src);
        console.log('clicked');
      }
    }
  });

  const closeButton = messageCard.querySelector('.close');
  closeButton.style.display = 'block';

  closeButton.addEventListener('click', function (event) {
    event.stopPropagation();
    closeModal();
  });
}
// }

// function generateMessageHTML(message, attachmentsHTML) {
//   // Create the HTML structure for displaying the sent message
//   return `
//        <div class="user-sent">
//            <div class="user-sent_header">
//                <div>
//                    <h3 class="user-sent_tab-name">${message.name}</h3>
//                    <h4 class="user-sent_tab-subject">Subject: ${
//                      message.subject
//                    }</h4>
//                </div>
//            </div>

//            <div class="user-sent_tab">
//            <p class="user-sent_tab-text">${message.message}</p>
//            </div>

//            <div class="files" style="display:flex">
//            ${attachmentsHTML ? attachmentsHTML : ''}
//            </div>

//            <div class="user-sent_info">
//                <p class="user-sent_info-date">${message.time}</p>
//                <p class="user-sent_info-time">${message.date}</p>
//            </div>

//            <div class="user-sent_actions">
//                <i class="fa-solid fa-ellipsis-vertical"></i>
//            </div>

//            <div class="sent-actions user">
//                <p class="sent-actions_btns">Archive</p>
//                <p class="sent-actions_btns">Report Spam</p>
//                <p class="sent-actions_btns">Delete</p>
//            </div>
//        </div>
//    `;
// }

const messagesContainer = document.querySelector('.main');

// Event delegation for both inbox and sent messages
messagesContainer.addEventListener('click', function (event) {
  const target = event.target;

  // Check if the clicked element is inside an inbox or sent message
  let inboxMessageElement = target.closest('.inbox-card');
  let sentMessageElement = target.closest('.sent-card');
  let trashMessageElement = target.closest('.trash-card');
  let spamMessageElement = target.closest('.spam-card');

  if (inboxMessageElement) {
    let index = Array.from(inboxCard).indexOf(inboxMessageElement);
    console.log(index);
    openModal(index, inboxCard);
  } else if (sentMessageElement) {
    let index = Array.from(sentCard).indexOf(sentMessageElement);
    openModal(index, sentCard);
  } else if (trashMessageElement) {
    let index = Array.from(trashCard).indexOf(trashMessageElement);
    openModal(index, trashCard);
  } else if (spamMessageElement) {
    let index = Array.from(spamCard).indexOf(spamMessageElement);
    openModal(index, spamCard);
  }

  // Check if the clicked element is an image
  if (target.classList.contains('attachmentFile')) {
    openImageModal(target.src);
  }
  // Check if the clicked element is an image
  if (target.classList.contains('inbox-actions')) {
    event.stopPropagation();
    !openModal();
  }
});

// Event delegation for sent messages
// messagesContainer.addEventListener('click', function (event) {
//   const target = event.target;

//   // Check if the clicked element is inside a sent message
//   let messageElement = target.closest('.sent-card');
//   if (messageElement) {
//     let index = Array.from(sentContainer.children).indexOf(messageElement);
//     openModal(index, true);
//   }
// });

const submit = document.getElementById('sendMessage');

// let sentMessages = [
//   {
//     name: 'Kiere Judy',
//     subject: 'I need new Alias for my Brand Mail',
//     slicedMessage: `Hello SendMail, The advancements we're witnessing are truly remarkable, and it's shaping the way we
//     live and work. From artificial intelligence to quantum computing, the possibilities seem...`,

//     message: `Hello SendMail, The advancements we're witnessing are truly remarkable, and it's shaping the way we
//     live and work. From artificial intelligence to quantum computing, the possibilities seem endless.
//     Sit back, relax, and let's delve into the fascinating realm of technological wonders!
//     Pretium viverra suspendisse potenti nullam ac tortor vitae. Vitae proin sagittis nisl rhoncus mattis rhoncus urna neque viverra. Egestas dui id ornare arcu odio ut sem.
//     Pharetra sit amet aliquam id diam maecenas ultricies mi eget. In ante metus dictum at tempor
//     commodo ullamcorper a. Et sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque.
//     Nascetur ridiculus mus mauris vitae. Augue mauris augue neque gravida. Consequat id porta nibh
//     venenatis cras sed. Cursus mattis molestie a iaculis. Luctus venenatis lectus magna fringilla urna.
//     Faucibus vitae aliquet nec ullamcorper sit amet risus. Vehicula ipsum a arcu cursus vitae congue
//     mauris. Sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec.`,
//     date: 'November 23rd',
//     time: '03:22 pm',
//     files: [
//       // {
//       //   type: 'image/png',
//       //   name: 'dcImage.png',
//       //   path: 'https://scontent.fabb1-2.fna.fbcdn.net/v/t39.30808-6/400765364_736353168521805_7853714947437572353_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGpHcMLuv8m6iKqNTYYqmupmbN8sbG5LwCZs3yxsbkvAEaRA34CdbY1deRBvSeJMHZU1JM28oCk_R_TkXhoYdux&_nc_ohc=E_t2SJk22CIAX9zDRHU&_nc_zt=23&_nc_ht=scontent.fabb1-2.fna&oh=00_AfDFJ-ls0TLlu8fSlEp--nmWcoHMvstgn_74KMzAJtguJA&oe=65596725',
//       // },
//     ],
//     id: Math.random(),
//     isDummy: true,
//   },
//   {
//     name: 'Michael Brown',
//     subject: ' The Power of Gratitude: Transforming Lives',
//     slicedMessage: `Hey there,
//     I hope this email finds you well. I wanted to share some groundbreaking news in the world of
//     technology. The ...`,
//     message: `     Hey there,
//       I hope this email finds you well. I wanted to share some groundbreaking news in the world of
//       technology. The advancements we're witnessing are truly remarkable, and it's shaping the way we
//       live and work. From artificial intelligence to quantum computing, the possibilities seem endless.
//       Sit back, relax, and let's delve into the fascinating realm of technological wonders!
//       Pretium viverra suspendisse potenti nullam ac tortor vitae. Vitae proin
//       sagittis nisl rhoncus mattis rhoncus urna neque viverra. Egestas dui id ornare arcu odio ut sem.
//       Pharetra sit amet aliquam id diam maecenas ultricies mi eget. In ante metus dictum at tempor
//       commodo ullamcorper a. Et sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque.
//       Nascetur ridiculus mus mauris vitae. Augue mauris augue neque gravida. Consequat id porta nibh
//       venenatis cras sed. Cursus mattis molestie a iaculis. Luctus venenatis lectus magna fringilla urna.
//       Faucibus vitae aliquet nec ullamcorper sit amet risus. Vehicula ipsum a arcu cursus vitae congue
//       mauris. Sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec. Eget velit aliquet
//       sagittis id consectetur purus ut faucibus pulvinar. Neque volutpat ac tincidunt vitae semper quis
//       lectus nulla. Vel facilisis volutpat est velit. Diam volutpat commodo sed egestas egestas fringilla
//       phasellus. Pharetra vel turpis nunc eget lorem. At tellus at urna condimentum mattis pellentesque.`,
//     date: 'November 23rd',
//     time: '03:22 pm',
//     files: [
//       // {
//       //   type: 'image/png',
//       //   name: 'dcImage.png',
//       //   path: 'https://scontent.fabb1-2.fna.fbcdn.net/v/t39.30808-6/400765364_736353168521805_7853714947437572353_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGpHcMLuv8m6iKqNTYYqmupmbN8sbG5LwCZs3yxsbkvAEaRA34CdbY1deRBvSeJMHZU1JM28oCk_R_TkXhoYdux&_nc_ohc=E_t2SJk22CIAX9zDRHU&_nc_zt=23&_nc_ht=scontent.fabb1-2.fna&oh=00_AfDFJ-ls0TLlu8fSlEp--nmWcoHMvstgn_74KMzAJtguJA&oe=65596725',
//       // },
//     ],
//     id: Math.random(),
//     isDummy: true,
//   },
// ];
let sentMessages = [];

submit.addEventListener('click', function submitMessage() {
  const name = document.getElementById('userName').innerText;
  const subject = document.getElementById('subject');
  const message = document.getElementById('inputField');

  const subjectValue = subject.value;
  const messageValue = message.value;

  let splitMessage = '';
  let slicedMessage = '';

  if (messageValue.split(' ').length < 40) {
    splitMessage = messageValue.split(' ');
    slicedMessage = splitMessage.join(' ');
  } else {
    splitMessage = messageValue.split(' ');
    slicedMessage = splitMessage.slice(0, 40).join(' ') + '...';
  }

  let inboxValues = {
    name,
    subject: subjectValue,
    slicedMessage,
    message: messageValue,
    files: selectedFiles || [],
    id: Math.random(),
    time: updateDateTime().slice(19, 28),
    date: updateDateTime().slice(5, 19),
    isDummy: true,
  };

  //   sentMessages = [];
  sentMessages.unshift(inboxValues);

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

  //   rendersentMessages();
  updateDateTime();
  composeModal.classList.remove('openModal');
});

// JavaScript to add or render new messages to the DOM
// function rendersentMessages() {
//   sentContainer.innerHTML = '';

//   sentMessages.forEach((message, index) => {
//     const chatMessage = document.createElement('div');
//     chatMessage.className = `sent-card user `;

//     const attachmentsHTML = message.files
//       .map((file) => {
//         if (file.type.startsWith('image')) {
//           return `
//           <div class="file-card_display">
//             <div style="display: flex;">
//               <img src="${
//                 URL.createObjectURL(file)
//                 //  file.path
//               }" alt="Attachment" class="attachmentFile" />
//             </div>
//           </div>
//         `;
//         } else if (file.type === 'application/pdf') {
//           return `
//             <div class="file-card_display">
//                <div style="display: flex;">
//                   <a href="${URL.createObjectURL(file)}" download>
//                      <i class="fa-solid fa-file-pdf doc-icon"></i>
//                   <a>
//                </div>
//             </div>`;
//         } else if (
//           file.type === 'application/msword' ||
//           file.type ===
//             'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
//         ) {
//           return `
//             <div class="file-card_display">
//                <div style="display: flex;">
//                   <a href="${URL.createObjectURL(file)}" download>
//                      <i class="fa-solid fa-file-word doc-icon"></i>
//                   <a>
//                </div>
//             </div>`;
//         } else {
//           // Add more conditions for other file types if needed
//           return `
//             <div class="file-card_display">
//                <div style="display: flex;">
//                   <a href="${URL.createObjectURL(file)}" download>
//                      <i class="fa-regular fa-file doc-icon"></i>
//                   <a>
//                </div>
//             </div>`;
//         }
//       })
//       .join('');

//     chatMessage.innerHTML = `
//          <div class="user-sent">
//          <div class="user-sent_header">
//             <div>
//                <h3 class="user-sent_tab-name">${message.name}</h3>
//                <h4 class="user-sent_tab-subject">Subject: ${
//                  message.subject
//                }</h4>
//                   </div>
//          </div>

//          <div class="user-sent_tab">

//             <p class="user-sent_tab-text">${message.slicedMessage}</p>
//          </div>

//          <div class="files" style="display:flex">
//              ${
//                attachmentsHTML
//                  ? `<div style="margin-top: 1rem; display: flex; align-items: center;">
//                  <i style="font-size: 1.5rem;" class="fa-solid fa-file-circle-check"></i>
//                  <p style="font-size: 1rem; margin-left: 1rem;">CONTAINS FILES</p>
//               </div>`
//                  : ''
//              }
//          </div>

//          <div class="user-sent_info">
//          <p class="user-sent_info-date ">${message.time}</p>
//             <p class="user-sent_info-time">${message.date}</p>
//          </div>

//          <div class="user-sent_actions">
//             <i class="fa-solid fa-ellipsis-vertical"></i>
//          </div>

//          <div class="sent-actions user">
//             <p class="sent-actions_btns">Archive</p>
//             <p class="sent-actions_btns">Report Spam</p>
//             <p class="sent-actions_btns">Delete</p>
//             </div>
//          </div>
//    `;

//     sentContainer.appendChild(chatMessage);

//     chatMessage.addEventListener('click', function () {
//       openModal(index, true);
//     });
//   });
// }
// rendersentMessages();

// Javascript for Archive, Spam and Delete

const inboxAction = document.querySelectorAll('.user-inbox_actions');
const inboxActionTab = document.querySelectorAll('.inbox-actions');
const sentAction = document.querySelectorAll('.user-sent_actions');
const sentActionTab = document.querySelectorAll('.sent-actions');
const trashAction = document.querySelectorAll('.user-trash_actions');
const trashActionTab = document.querySelectorAll('.trash-actions');
const spamAction = document.querySelectorAll('.user-spam_actions');
const spamActionTab = document.querySelectorAll('.spam-actions');

function hideAllTabs() {
  inboxActionTab.forEach((tab) => {
    tab.style.display = 'none';
  });

  trashActionTab.forEach((tab) => {
    tab.style.display = 'none';
  });

  sentActionTab.forEach((tab) => {
    tab.style.display = 'none';
  });

  spamActionTab.forEach((tab) => {
    tab.style.display = 'none';
  });
}

document.body.addEventListener('click', function (event) {
  const target = event.target;

  let isInsideInbox = false;
  let isInsideTrash = false;
  let isInsideSent = false;
  let isInsideSpam = false;

  for (let i = 0; i < inboxAction.length; i++) {
    if (inboxAction[i].contains(target) || inboxActionTab[i].contains(target)) {
      isInsideInbox = true;
      break;
    }
  }

  for (let i = 0; i < sentAction.length; i++) {
    if (sentAction[i].contains(target) || sentActionTab[i].contains(target)) {
      isInsideSent = true;
      break;
    }
  }

  for (let i = 0; i < trashAction.length; i++) {
    if (trashAction[i].contains(target) || trashActionTab[i].contains(target)) {
      isInsideTrash = true;
      break;
    }
  }

  for (let i = 0; i < spamAction.length; i++) {
    if (spamAction[i].contains(target) || spamActionTab[i].contains(target)) {
      isInsideSpam = true;
      break;
    }
  }

  if (!isInsideInbox) {
    hideAllTabs();
  }
  if (!isInsideTrash) {
    hideAllTabs();
  }
  if (!isInsideSent) {
    hideAllTabs();
  }
  if (!isInsideSpam) {
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

trashAction.forEach((openActionBtn, index) => {
  openActionBtn.addEventListener('click', function (e) {
    e.stopPropagation();

    if (trashActionTab[index].style.display === 'block') {
      trashActionTab[index].style.display = 'none';
    } else {
      hideAllTabs();
      trashActionTab[index].style.display = 'block';
    }
  });
});

sentAction.forEach((openActionBtn, index) => {
  openActionBtn.addEventListener('click', function (e) {
    e.stopPropagation();

    if (sentActionTab[index].style.display === 'block') {
      sentActionTab[index].style.display = 'none';
    } else {
      hideAllTabs();
      sentActionTab[index].style.display = 'block';
    }
  });
});

spamAction.forEach((openActionBtn, index) => {
  openActionBtn.addEventListener('click', function (e) {
    e.stopPropagation();

    if (spamActionTab[index].style.display === 'block') {
      spamActionTab[index].style.display = 'none';
    } else {
      hideAllTabs();
      spamActionTab[index].style.display = 'block';
    }
  });
});

// Close opened Modal for compose and enlarged image
const closeModalButton = document.querySelectorAll('.closeModal');
const closeImageModalBtn = document.querySelectorAll('.closeImageModal');

closeModalButton.forEach((closeButton) => {
  closeButton.addEventListener('click', function () {
    closeModal();
  });
});

closeImageModalBtn.forEach((closeImageButton) => {
  closeImageButton.addEventListener('click', function () {
    closeImageModal();
  });
});

function closeModal() {
  composeModal.classList.remove('openModal');
  messageDisplay.classList.remove('openModal');
  messageDisplay.style.display = 'none';
  messageDisplay.innerHTML = '';

  const message = document.getElementById('inputField');
  message.value = '';

  main.classList.remove('blur');
  sidebar.classList.remove('blur');
  main.classList.remove('no-scroll');
}

function closeImageModal() {
  imageModal.classList.remove('openModal');
}
