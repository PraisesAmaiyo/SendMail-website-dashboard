const nonSubscriber = document.querySelector('.nonSubscriber');
const notSubscribed = document.querySelector('.notSubscribed');
const modal = document.querySelector('.modal');

let subscribed = true;

// if (subscribed) {***} is the same as if (subscribed === true) {***}

if (notSubscribed && nonSubscriber && modal) {
  if (subscribed) {
    notSubscribed.style.display = 'none';
    nonSubscriber.style.display = 'none';
  } else {
    notSubscribed.style.display = 'block';
    nonSubscriber.style.display = 'block';
    modal.style.visibility = 'visible';
    modal.style.opacity = '1';
  }
}

// I simulated backens style here, just asume you have "users" as a list of your users.

// const users = [
//    {
//      userName: 'UserA',
//      subscribed: false,
//      id: 1,
//    },
//    {
//      userName: 'UserB',
//      subscribed: true,
//      id: 2,
//    },
//    {
//      userName: 'UserC',
//      subscribed: false,
//      id: 3,
//    },
//  ];

// change the figure 2 ro any other number in the users array to toggle between a subscribed user and a non subscribed user

//  const CheckSubscriberId = 2;

//  const subscribed = users.find((user) => user.id === CheckSubscriberId);

//  if (subscribed.subscribed) {
//    notSubscribed.style.display = 'none';
//    nonSubscriber.style.display = 'none';
//    modal.style.display = 'none';
//  } else {
//    notSubscribed.style.display = 'block';
//    nonSubscriber.style.display = 'block';
//    modal.style.visibility = 'visible';
//    modal.style.opacity = '1';
//  }

// Manage Subscription page
const subscriptionEl = document.querySelector('.subscription');

if (subscriptionEl) {
  if (subscribed) {
    subscriptionEl.innerHTML = `
  <div class="subscription-plan">
  <h1>Your Plan</h1>
</div>

<div class="card card-subscription">
  <div class="subscription-heading">
     <h1>Pro Plan</h1>
  </div>

  <div class="card-white subscription-info">
     <h3 class="subscription-info_plan">Subscription Status: ACTIVE</h3>
     <p class="subscription-info_text">Type: Monthly Subscription</p>
     <p class="subscription-info_text">Payment Method: Card</p>
     <p class="subscription-info_text">Card Type: Visa</p>

     <p class="subscription-info_text">Price: $15.00/month</p>
     <p class="subscription-info_text">Next Billing Date: January 15, 2024</p>

     <div class="subscription-info_payments">
        <div class="payments-heading">
           <h2>Cancel Payments:</h2>
        </div>

        <div class="payments-btns">
           <!-- <div class="payments-btns-double"> -->

           <a href="#">
              <button class="hero-btn-dark">Card Payment</button>
           </a>
           <a href="#">
              <button class="hero-btn-dark">Crypto Payment</button>
           </a>
           <!-- </div> -->

           <a href="#">
              <button class="hero-btn-light">Change payment method</button>
           </a>
        </div>
     </div>
  </div>
</div>`;
  } else {
    subscriptionEl.innerHTML = `
   <div class="subscription-plan">
  <h1>Your Plan</h1>
</div>
<div class="card card-subscription">
  <div class="subscription-heading">
     <h1>Not Subscribed</h1>
  </div>

  <div class="card-white subscription-info">
     <h3 class="subscription-info_plan">Subscription Status: NOT ACTIVE</h3>


     <div class="subscription-info_payments">
        <div class="payments-heading">
           <h2>Cancel Payments:</h2>
        </div>

        <div class="payments-btns">

           <a href="#">
              <button class="hero-btn-dark">Card Payment</button>
           </a>
           <a href="#">
              <button class="hero-btn-dark">Crypto Payment</button>
           </a>

        </div>
     </div>
  </div>
</div>`;
  }
}
