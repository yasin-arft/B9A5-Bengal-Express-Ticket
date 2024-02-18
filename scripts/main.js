
// global variables
const seatNoContainer = document.getElementById('seat-no-container');
const seats = seatNoContainer.children;
const couponCodes = ['NEW15', 'Couple 20'];
const applyCouponBtn = document.getElementById('apply-coupon');
let bookedSeats = 0;
let discountPercentage = 0;

// event handlers
for (const seat of seats) {
  seat.addEventListener('click', handleSeatSelection);
}
applyCouponBtn.addEventListener('click', handleApplyCouponBtn);

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
  if (couponCodes.includes(couponInputValue)) {
    if (couponInputValue === 'NEW15') {
      discountPercentage = 0.15;
    } else if (couponInputValue === 'Couple 20') {
      discountPercentage = 0.20;
    }
    
    const totalPrice = countTotalPrice();
    const grandPrice = countGrandPrice(totalPrice);
    setPriceById('grand-total', grandPrice);

    event.target.parentNode.classList.add('hidden');
  } else {
    alert('Invalid coupon!')
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

  return totalPrice
}

// count grand price
function countGrandPrice(totalPrice) {
  let grandTotal = 0;
  discount = totalPrice * discountPercentage;
  if (discount) {
    grandTotal = totalPrice - discount;
  } else {
    grandTotal = totalPrice;
  }
  return grandTotal;
}


// set price by id
function setPriceById(elementId, price) {
  document.getElementById(elementId).innerText = price;
}
