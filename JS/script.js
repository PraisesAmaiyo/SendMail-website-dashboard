const btnNavEl = document.querySelector('.btn-mobile-nav');
// const headerEl = document.querySelector('.navigation-header');
const allLinks = document.querySelectorAll('a:link');

window.addEventListener('load', function () {
  const headerEl = document.querySelector('.navigation-header');
  const sidebarEl = document.querySelector('.sidebar');
  const mainEl = document.querySelector('.main');

  // Sticky nav bar
  const obs = new IntersectionObserver(
    function (entries) {
      const ent = entries[0];
      console.log(ent);

      if (ent.isIntersecting === false) {
        document.body.classList.add('sticky');

        sidebarEl.style.marginTop = '8rem';
        mainEl.style.marginTop = '8rem';
      }

      if (ent.isIntersecting === true) {
        document.body.classList.remove('sticky');

        sidebarEl.style.marginTop = '0';
        mainEl.style.marginTop = '0';
      }
    },
    {
      // In the viewport
      root: null,
      threshold: 0,
      rootMargin: '-1000px',
    }
  );

  obs.observe(headerEl);
});

function updateProgress(progressId, percentage) {
  const progressCircle = document.getElementById(progressId);

  if (progressCircle) {
    const progress = progressCircle.querySelector('.progress');
    const percentageText = progressCircle.querySelector('.percentage');

    const circumference = 2 * Math.PI * 30;
    const offset = circumference - (percentage / 100) * circumference;

    progress.style.strokeDasharray = `${circumference} ${circumference}`;
    progress.style.strokeDashoffset = offset;
    percentageText.textContent = `${percentage}%`;
  }
}

// Note that if it is 4/5 then calculate 4/5 * 100 and input the value
// Update progress for domain
updateProgress('domain', 75);

// Update progress for alias
updateProgress('alias', 60);

// Update progress for domainCreated
updateProgress('domainCreated', 100);

// Mobile nav
btnNavEl.addEventListener('click', function () {
  headerEl.classList.toggle('nav-open');
});

allLinks.forEach(function (link) {
  link.addEventListener('click', function (e) {
    const href = link.getAttribute('href');
    console.log(href);

    // scroll back to top
    if (href === '#')
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

    // Scroll to other links
    if (href !== '#' && href.startsWith('#')) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: 'smooth' });
      e.preventDefault();
    }

    // CLose mobile navigation
    if (link.classList.contains('main-nav-link'))
      headerEl.classList.toggle('nav-open');
  });
});

function updateDateTime() {
  // Create a new Date object for the current date and time
  const currentDate = new Date();

  // Define an array of day names
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Get the day of the week (0 for Sun, 1 for Mon, 2 for Tue, etc.)
  const dayOfWeek = dayNames[currentDate.getDay()];

  // Define an array of month names
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  // Get the month, day, year, hour, and minute components
  const month = monthNames[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const hour = currentDate.getHours();
  const minute = currentDate.getMinutes();

  // Format the day with the appropriate suffix (e.g., 1st, 2nd, 3rd, 4th, etc.)
  const daySuffix = getDaySuffix(day);

  // Format the time as AM or PM
  const amPm = hour >= 12 ? 'PM' : 'AM';

  // Adjust the hour to 12-hour format
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;

  // Create the formatted date and time strings
  const formattedDate = `${dayOfWeek}, ${month} ${day}${daySuffix}, ${year}`;
  const formattedTime = `${formattedHour}:${
    (minute < 10 ? '0' : '') + minute
  } ${amPm}`;

  // Update the HTML elements with the formatted date and time
  document.querySelector('.main-date').textContent = formattedDate;
  document.querySelector('.main-time').textContent = formattedTime;
}

// Call the updateDateTime function initially to set the initial values
updateDateTime();

// Update the date and time every second
setInterval(updateDateTime, 1000);

// Function to get the day suffix (e.g., 1st, 2nd, 3rd, 4th, etc.)
function getDaySuffix(day) {
  if (day >= 11 && day <= 13) {
    return 'th';
  }
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

// Toggle the active class for sideNavs

const sideNavs = document.querySelectorAll('.side-nav_item');

sideNavs.forEach((nav) => {
  nav.addEventListener('click', () => {
    nav.classList.add('active');

    sideNavs.forEach((otherNav) => {
      if (otherNav !== nav) {
        otherNav.classList.remove('active');
      }
    });
  });
});

// JS to Loop to generate options from 1 to 25.
const numberSelect = document.getElementById('domain-input_select');

if (numberSelect) {
  for (let i = 1; i <= 25; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.text = i;
    numberSelect.appendChild(option);
  }
}

// JS for DNS modal.
const dnsModal = document.getElementById('dns-modal');
const main = document.querySelector('.main');
const sidebar = document.querySelector('.sidebar');
const dnsButtons = document.querySelectorAll('.dns-button');
const closeModal = document.querySelector('.icon-close');

dnsButtons.forEach((btn) => {
  btn.addEventListener('click', function () {
    dnsModal.classList.add('active');
    //  dnsModal.style.display = 'block';
    main.classList.add('blur');
    sidebar.classList.add('blur');
  });
});

if (closeModal) {
  closeModal.addEventListener('click', function () {
    dnsModal.classList.remove('active');
    // dnsModal.style.display = 'none';
    main.classList.remove('blur');
    sidebar.classList.remove('blur');
  });
}

// JS for add domain and alias modal.

const addAliasBtn = document.getElementById('addAliasButton');
const addDomainBtn = document.getElementById('addDomainButton');
const aliasModal = document.getElementById('alias-Modal');
const domainModal = document.getElementById('domain-Modal');

const domainCancelBtn = document.getElementById('domain-cancel-btn');
const aliasCancelBtn = document.getElementById('alias-cancel-btn');

if (addAliasBtn) {
  addAliasBtn.addEventListener('click', function () {
    aliasModal.classList.add('active');

    main.classList.add('blur');
    sidebar.classList.add('blur');
  });
}

if (addDomainBtn) {
  addDomainBtn.addEventListener('click', function () {
    domainModal.classList.add('active');

    main.classList.add('blur');
    sidebar.classList.add('blur');
  });
}

if (document.getElementById('save-btn')) {
  document.getElementById('save-btn').addEventListener('click', function () {
    document.getElementById('username').setAttribute('required', 'required');
  });
}

if (domainCancelBtn) {
  domainCancelBtn.addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('username').removeAttribute('required');
    domainModal.classList.remove('active');

    main.classList.remove('blur');
    sidebar.classList.remove('blur');
  });
}

if (aliasCancelBtn) {
  aliasCancelBtn.addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('username').removeAttribute('required');
    aliasModal.classList.remove('active');

    main.classList.remove('blur');
    sidebar.classList.remove('blur');
  });
}

// JS for add Domain Account modal.

const addDomainAccountBtn = document.getElementById('add-domain-account_btn');
const domainAccountForm = document.getElementById('domainAccountForm');
const cancelDomain = document.getElementById('cancel-domain');
const createDomain = document.getElementById('create-domain');

let initialFormState = null;

if (addDomainAccountBtn) {
  addDomainAccountBtn.addEventListener('click', function () {
    const form = document.querySelector('.domainAccount-form');
    form.reset();
    domainAccountForm.classList.add('active');

    initialFormState = getFormState(form);

    main.classList.add('blur');
    sidebar.classList.add('blur');
  });
}

if (cancelDomain) {
  cancelDomain.addEventListener('click', function (e) {
    e.preventDefault();

    if (initialFormState) {
      resetFormState(initialFormState);
    }

    domainAccountForm.classList.remove('active');
    main.classList.remove('blur');
    sidebar.classList.remove('blur');
  });
}

function getFormState(form) {
  const formState = {};
  const inputs = form.querySelectorAll('.cancel-button-input');
  inputs.forEach((input) => {
    formState[input.id] = input.required;

    console.log(input.id);
  });

  return formState;
}

function resetFormState(formState) {
  const inputs = document.querySelectorAll('.cancel-button-input');
  inputs.forEach((input) => {
    input.required = formState[input.id];
  });
}

if (domainAccountForm) {
  domainAccountForm.addEventListener('submit', function (e) {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const confirmPasswordField = document.getElementById('confirm-password');
    const errorMessage = document.getElementById('password-error');

    if (password !== confirmPassword) {
      e.preventDefault();
      errorMessage.style.display = 'block';
      //  alert('Password and Confirm Password do not match');
      confirmPasswordField.classList.add('error');
    } else {
      confirmPasswordField.classList.remove('error');
      errorMessage.style.display = 'none';
    }
  });
}
