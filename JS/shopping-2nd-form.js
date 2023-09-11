document.addEventListener('DOMContentLoaded', function() {

  const paypalForm = document.getElementById('paypal-form');
  const debitForm = document.getElementById('debit-form');
  const bankForm = document.getElementById('bank-form');
  const codForm = document.getElementById('cod-form');
  const codAddress = document.getElementById('cod-address');

  loadCartItemsFromLocalStorage();

  function loadCartItemsFromLocalStorage() {
    const storedCartItems = localStorage.getItem('cartItems');
    const formData = localStorage.getItem('formData');
    if (formData) {
      const formDataObject = JSON.parse(formData);
      const addressValue = formDataObject.address;
      codAddress.value = addressValue;
    }
    const debitData = localStorage.getItem('debitData');
    if(debitData){
      localStorage.removeItem('debitData');
    }

    const paypalPaymentData = localStorage.getItem('paypalPaymentData');
    if(paypalPaymentData){
      localStorage.removeItem('paypalPaymentData');
    }

    const bankData = localStorage.getItem('bankData');
    if(bankData){
      localStorage.removeItem('bankData');
    }
  }


  paypalForm.addEventListener("submit", (e) => {
      // Save form values to local storage
      savePaypalValuesToLocalStorage()
      event.preventDefault();
      window.location.href = 'shopping-3rd-form.html';
  });

  debitForm.addEventListener("submit", (e) => {
      // Save form values to local storage
      saveDebitValuesToLocalStorage()
      event.preventDefault();
      window.location.href = 'shopping-3rd-form.html';
  });

  bankForm.addEventListener("submit", (e) => {
      // Save form values to local storage
      saveBankValuesToLocalStorage()
      event.preventDefault();
      window.location.href = 'shopping-3rd-form.html';
  });

  codForm.addEventListener("submit", (e) => {
    // Save form values to local storage
     const newEmailValue = codAddress.value;
     editAddress()
     event.preventDefault();
     window.location.href = 'shopping-3rd-form.html';
  });


function savePaypalValuesToLocalStorage() {
  const paypal = document.getElementById("paypal-email").value;
    const paypalPaymentData = {
      paypal: paypal,
    };
    localStorage.setItem('paypalPaymentData', JSON.stringify(paypalPaymentData));
  }

function saveDebitValuesToLocalStorage() {
  const debit = document.getElementById("debitNumber").value;
  const expire = document.getElementById("expire").value;
  const cvv = document.getElementById("cvv").value;
    const debitData = {
      debit: debit,
      expire: expire,
      cvv: cvv,
 };
 localStorage.setItem('debitData', JSON.stringify(debitData));
}

 function saveBankValuesToLocalStorage() {
   const nameBank = document.getElementById("name-bank").value;
   const bankNumber = document.getElementById("bank-number").value;
     const bankData = {
       nameBank: nameBank,
       bankNumber: bankNumber,
  };
  localStorage.setItem('bankData', JSON.stringify(bankData));
}

function editAddress() {
     const newAddress = codAddress.value;
     const formData = JSON.parse(localStorage.getItem('formData')) || {};
     formData.address = newAddress;
     localStorage.setItem('formData', JSON.stringify(formData));
   }


});
