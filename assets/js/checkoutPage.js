const dropSummaryBtn = document.querySelector("#drop_summary");
const dropSummary = document.querySelector(".dropSummary");
const dropSummaryIcon = document.querySelector(".orderSummary button img");
const expDate = document.querySelector("#expiryDate");
const cardNo = document.querySelector("#creditCardNumber");
const email = document.querySelector('.UserEmail');
const emailMessage = document.querySelector('.emailMessage');
dropSummaryBtn.addEventListener("click", () => {
  console.log('clicked');
  if (dropSummary.style.display == "none") {
    dropSummaryIcon.src = "assets/images/up_drop.svg";
    dropSummary.style.display = "grid";
  } else{
    dropSummary.style.display = "none";
    dropSummaryIcon.src = "assets/images/down_drop.svg";
  }
});

window.addEventListener("resize", (e) => {
  if (window.innerWidth > 768) {
    dropSummary.style.display = "none";
  }
});


 cardNo.addEventListener("input", function (e) {
    let value = this.value;
    value = value.replace(/\D/g, "");

    let formattedValue = "";
    for (let i = 0; i < value.length; i += 4) {
      formattedValue += value.substring(i, i + 4) + " ";
    }

    this.value = formattedValue.trim(); 
  });

expDate.addEventListener("input", function (e) {
  let value = this.value;

  value = value.replace(/[^0-9/]/g, "");

  if (value.length > 2 && value[2] !== "/") {
    value = value.slice(0, 2) + " / " + value.slice(2);
  }

  if (value.length > 7) {
    value = value.slice(0, 7);
  }

  this.value = value;
});

function isValidYear(year) {
  const currentYear = new Date().getFullYear() % 100; 
  return year >= currentYear;
}

document.querySelector("#expiryDate").addEventListener("focusout", function () {
  const value = this.value.replace(/\s+/g, "").split("/"); 
  if (value.length === 2) {
    const month = parseInt(value[0], 10);
    const year = parseInt(value[1], 10);

    
    if (month < 1 || month > 12 || !isValidYear(year)) {
      alert("Please enter a valid expiry date.");
      this.value = ""; 
    }
  } else {
    alert("Please enter a valid expiry date.");
    this.value = ""; 
  }
});

document.querySelector("#cvv").addEventListener("input", function (e) {
  let value = this.value;

  value = value.replace(/\D/g, "");

  if (value.length > 3) {
    value = value.slice(0, 3);
  }

  this.value = value;
});

email.addEventListener("focusout", function () {
console.log(emailMessage);

  const email = this.value;
 console.log(email);
  if (isValidEmail(email)) {
    console.log(emailMessage);
    emailMessage.innerText = 'Valid Email';
    console.log(emailMessage.innerText);
    emailMessage.classList.add('valid');
    console.log(emailMessage.classList);

    setTimeout(() => {
     emailMessage.classList.remove('valid');
    console.log(emailMessage.classList);

    }, 2000);
  } else {
    emailMessage.classList.add('invalid');
    emailMessage.innerText = 'Invalid Email';
    setTimeout(() => {
      emailMessage.classList.remove('invalid');

    }, 2000);
    this.value = "";
  }

  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  
  
})
