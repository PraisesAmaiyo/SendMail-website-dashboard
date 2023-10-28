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
    hideAllTabs();
    inboxActionTab[index].style.display = 'block';
  });
});
