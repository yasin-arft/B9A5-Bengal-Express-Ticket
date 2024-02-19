
// global variables
const seatNoContainer = document.getElementById('seat-no-container');
const seats = seatNoContainer.children;
const couponCodes = ['NEW15', 'Couple 20'];
const applyCouponBtn = document.getElementById('apply-coupon');
let bookedSeats = 0;
let discountPercentage = 0;
let discountPrice = 0;

// event handlers
for (const seat of seats) {
  seat.addEventListener('click', handleSeatSelection);
}
applyCouponBtn.addEventListener('click', handleApplyCouponBtn);
document.getElementById('phone-number').addEventListener('blur', handlePhoneNumberInput);
document.getElementById('form-submit').addEventListener('click', handleFormSubmit);
document.getElementById('modal-continue-btn').addEventListener('click', function() {
  replaceClassById('success-modal', 'flex', 'hidden');
});

// seat selection handler
function handleSeatSelection(event) {

  // prevent selecting more than four tickets at once
  if (bookedSeats >= 4) {
    return alert('Can not buy more than four tickets at once');
  }

  const element = event.target;

  element.classList.add('active');
  decreaseSeatCount();
  countBookedSeats();
  addToBookingTable(element.innerText);

  const totalPrice = countTotalPrice();
  setPriceById('total-price', totalPrice);

  const grandPrice = countGrandPrice(totalPrice);
  setPriceById('grand-total', grandPrice);

  // enable apply coupon button
  if (bookedSeats === 4) {
    applyCouponBtn.removeAttribute('disabled');
  }

  // prevent selecting one ticket more than once
  element.removeEventListener('click', handleSeatSelection);
}

// apply coupon handler
function handleApplyCouponBtn(event) {
  const couponInput = document.getElementById('coupon-input');
  const couponInputValue = couponInput.value;

  // check whether coupon code is valid or not
  if (couponCodes.includes(couponInputValue)) {
    // set discount percentage
    if (couponInputValue === 'NEW15') {
      discountPercentage = 0.15;
    } else if (couponInputValue === 'Couple 20') {
      discountPercentage = 0.20;
    }

    // update grand price
    const totalPrice = countTotalPrice();
    const grandPrice = countGrandPrice(totalPrice);
    setPriceById('grand-total', grandPrice);

    // hide apply coupon area
    event.target.parentNode.classList.add('hidden');

    // show discount price
    setPriceById('discount-price', discountPrice);
    replaceClassById('discount-price-area', 'hidden', 'flex');
  } else {
    alert('Invalid coupon!');
  }
}

// form submit handler
function handleFormSubmit(event) {
  event.preventDefault();
  replaceClassById('success-modal', 'hidden', 'flex');
}

// phone number input handler
function handlePhoneNumberInput(event) {
  const value = parseInt(event.target.value);
  if (typeof value === 'number' && bookedSeats > 0) {
    document.getElementById('form-submit').removeAttribute('disabled');
  }
}

// decrease seats count after selection
function decreaseSeatCount() {
  const seatLeftElement = document.getElementById('seat-left');
  const seatLeftCount = parseInt(seatLeftElement.innerText);
  const updatedSeatLeftCount = seatLeftCount - 1;
  seatLeftElement.innerText = updatedSeatLeftCount;
}

// add seats details to booking table after selection
function addToBookingTable(seatNo) {
  const bookingTableBody = document.getElementById('booking-table-body');
  const tr = document.createElement('tr');

  const td1 = document.createElement('td');
  td1.innerText = seatNo;
  tr.appendChild(td1);

  const td2 = document.createElement('td');
  td2.innerText = 'Economy';
  tr.appendChild(td2);

  const td3 = document.createElement('td');
  td3.classList.add('text-right');
  td3.innerText = 550;
  tr.appendChild(td3);

  bookingTableBody.appendChild(tr);
}

// count booked seats
function countBookedSeats() {
  const bookedSeatsCountElement = document.getElementById('booked-seats-count');
  bookedSeats++;
  bookedSeatsCountElement.innerText = bookedSeats;
}

// count total price
function countTotalPrice() {
  const totalPrice = bookedSeats * 550;

  return totalPrice;
}

// count grand price
function countGrandPrice(totalPrice) {
  let grandTotal = 0;
  discountPrice = totalPrice * discountPercentage;
  if (discountPrice) {
    grandTotal = totalPrice - discountPrice;
  } else {
    grandTotal = totalPrice;
  }
  return grandTotal;
}


// set price by id
function setPriceById(elementId, price) {
  document.getElementById(elementId).innerText = price;
}

// replace a class
function replaceClassById(id, oldClass, newClass) {
  const element = document.getElementById(id);
  element.classList.remove(oldClass);
  element.classList.add(newClass);
}

