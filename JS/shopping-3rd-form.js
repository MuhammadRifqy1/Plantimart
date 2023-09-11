document.addEventListener('DOMContentLoaded', function() {

let cartItems = [];

  const infoName = document.getElementById('infoName');
  const infoEmail = document.getElementById('infoEmail');
  const infoAdress = document.getElementById('infoAdress');
  const infoPhoneNumber = document.getElementById('infoPhoneNumber');
  const infoStateProvince = document.getElementById('infoStateProvince');
  const infoPostalCode = document.getElementById('infoPostalCode');
  const infoAdditional = document.getElementById('infoAdditional');

  loadWholeItemsFromLocalStorage();
  updateCartTotal();

  function loadWholeItemsFromLocalStorage() {

    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      cartItems = JSON.parse(storedCartItems);
      renderCartItems()
    }

    const savedFormData = localStorage.getItem('formData');
    if (savedFormData) {
      const formDataObject = JSON.parse(savedFormData);
      console.log(formDataObject);
      const nameValue = formDataObject.name;
      const emailValue = formDataObject.email;
      const addressValue = formDataObject.address;
      const phoneValue = formDataObject.phonenumber;
      const stateProvinceValue = formDataObject.stateprovince;
      const postalCodeValue = formDataObject.postalcode;
      const additionalValue = formDataObject.additionalinfo;
      infoName.textContent = `Name : ${nameValue}`;
      infoEmail.textContent = `Email : ${emailValue}` ;
      infoAdress.textContent = `Address : ${addressValue}`;
      infoPhoneNumber.textContent = `Phone Number : ${phoneValue}`;
      infoStateProvince.textContent = `State / Province : ${stateProvinceValue}`;
      infoPostalCode.textContent = `Postal Code : ${postalCodeValue}`;
      if (additionalValue != "") {
        infoAdditional.textContent = `Additional Info : ${additionalValue}`;
      }
    }

    const debitData = localStorage.getItem('debitData');
    if(debitData){
      const debitDataObject = JSON.parse(debitData);

      const paymentMethod = document.createElement('h4');
      paymentMethod.textContent = "Payment : Debit" ;

      const debitNumber = document.createElement('div');
      const debitNumberValue = debitDataObject.debit
      debitNumber.textContent = `Name : ${debitNumberValue}` ;

      const expireDate = document.createElement('div');
      const expireDateValue = debitDataObject.expire
      expireDate.textContent = `Bank Account Number : ${expireDateValue}` ;

      const cvv = document.createElement('div');
      const cvvValue = debitDataObject.cvv
      cvv.textContent = `CVV : ${cvvValue}` ;

      const debitContainer =  document.createElement('div');
      debitContainer.classList.add('d-grid' , "payment-grid");
      debitContainer.style.gridTemplateColumns = '1fr 1fr';
      debitContainer.appendChild(debitNumber);
      debitContainer.appendChild(expireDate);
      debitContainer.appendChild(cvv);

      paymentData.appendChild(paymentMethod);
      paymentData.appendChild(debitContainer);
    }

    const paypalPaymentData = localStorage.getItem('paypalPaymentData');
    if(paypalPaymentData){
      const paypalPaymentDataObject = JSON.parse(paypalPaymentData);

      const paymentMethod = document.createElement('h4');
      paymentMethod.textContent = "Payment : Paypal" ;

      const paypalEmail = document.createElement('div');
      const paypalEmailValue = paypalPaymentDataObject.paypal
      paypalEmail.textContent = `Name : ${paypalEmailValue}` ;

      paymentData.appendChild(paymentMethod);
      paymentData.appendChild(paypalEmail);
    }

    const bankData = localStorage.getItem('bankData');
    if(bankData){

      const bankDataObject = JSON.parse(bankData);

      const paymentMethod = document.createElement('h4');
      paymentMethod.textContent = "Payment : Bank Transfer" ;

      const bankName = document.createElement('div');
      const bankNameValue = bankDataObject.nameBank
      bankName.textContent = `Name : ${bankNameValue}` ;

      const bankNumber = document.createElement('div');
      const bankNumberValue = bankDataObject.bankNumber
      bankNumber.textContent = `Expiry Date : ${bankNumberValue}` ;

      const bankContainer =  document.createElement('div');
      bankContainer.classList.add('d-grid' , "payment-grid");
      bankContainer.style.gridTemplateColumns = '1fr 1fr';
      bankContainer.appendChild(bankName);
      bankContainer.appendChild(bankNumber);

      paymentData.appendChild(paymentMethod);
      paymentData.appendChild(bankContainer);
    }

    if(paypalPaymentData == null && debitData == null && bankData == null){
      const paymentMethod = document.createElement('h4');
      paymentMethod.textContent = "Payment : Cash On Delivery" ;
      paymentData.appendChild(paymentMethod);
    }

  }



  function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items-container');

    if (cartItems.length === 0) {
      cartItemsContainer.innerHTML = '<h2>Your cart is empty.</h2>';
    } else {
      cartItemsContainer.innerHTML = '';
      cartItems.forEach((item, index) => {
        const cartItemCard = document.createElement('div');
        cartItemCard.classList.add('card' , "col-11");

        const cartItem =document.createElement('div');
        cartItem.classList.add("d-flex","flex-column","align-item-center");

        const image = document.createElement('img');
        image.src = item.imageSrc;
        image.alt = item.name;
        image.classList.add('w-75');

        const imageContainer = document.createElement('div');
        imageContainer.classList.add('col-md-12' , "d-flex" , "flex-column" , "align-items-center" , "justify-content-center");
        imageContainer.style.height = '200px';
        imageContainer.appendChild(image);

        const name = document.createElement('h5');
        name.classList.add('card-title');
        name.textContent = item.name;

        const price = document.createElement('h6');
        price.textContent = `Price: $${(item.price * item.quantity).toFixed(2)}`;
        price.classList.add('card-text');

        const quantity = document.createElement('h6');
        quantity.textContent = `Quantity: ${item.quantity}`;
        quantity.classList.add('card-text');

        const cardBody = document.createElement('div');
        cardBody.classList.add('col-md-12',"py-3");
        cardBody.style.alignSelf = 'center';
        cardBody.style.textAlign = 'center';
        cardBody.appendChild(name);
        cardBody.appendChild(quantity);
        cardBody.appendChild(price);

        cartItem.appendChild(imageContainer);
        cartItem.appendChild(cardBody);
        cartItemCard.appendChild(cartItem);

        cartItemsContainer.appendChild(cartItemCard);
      });
    }
  }

  function updateCartTotal() {
    const cartTotal = document.getElementById('cart-total');
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    cartTotal.textContent = `Total: $${totalPrice.toFixed(2)}`;
  }

  const checkoutButton = document.getElementById('checkoutButton');

  checkoutButton.addEventListener('click', checkout);

  function checkout() {
    const savedFormData = localStorage.getItem('formData');
    const storedCartItems = localStorage.getItem('cartItems');
    const debitData = localStorage.getItem('debitData');

    if(debitData){
      const stringSavedFormData = JSON.stringify(savedFormData);
      const stringStoredCartItems = JSON.stringify(storedCartItems);
      const stringDebitData = JSON.stringify(debitData);

      var wholeInfoCheckout = {
        savedFormData: stringSavedFormData,
        storedCartItems: stringStoredCartItems,
        debitData: stringDebitData
      };

      console.log(wholeInfoCheckout);

      var wholeArrayCheckout = JSON.parse(localStorage.getItem('wholeArrayCheckout')) || [];

      wholeArrayCheckout.push(wholeInfoCheckout);

      localStorage.setItem('wholeArrayCheckout', JSON.stringify(wholeArrayCheckout));
      localStorage.removeItem('debitData');
    }

    const paypalPaymentData = localStorage.getItem('paypalPaymentData');
    if (paypalPaymentData) {
      const stringSavedFormData = JSON.stringify(savedFormData);
      const stringStoredCartItems = JSON.stringify(storedCartItems);
      const stringPaypalPaymentData = JSON.stringify(paypalPaymentData);

      var wholeInfoCheckout = {
        savedFormData: stringSavedFormData,
        storedCartItems: stringStoredCartItems,
        paypalPaymentData: stringPaypalPaymentData
      };

      console.log(wholeInfoCheckout);

      var wholeArrayCheckout = JSON.parse(localStorage.getItem('wholeArrayCheckout')) || [];

      wholeArrayCheckout.push(wholeInfoCheckout);

      localStorage.setItem('wholeArrayCheckout', JSON.stringify(wholeArrayCheckout));
      localStorage.removeItem('paypalPaymentData');
    }


    const bankData = localStorage.getItem('bankData');
    if(bankData){
      const stringSavedFormData = JSON.stringify(savedFormData);
      const stringStoredCartItems = JSON.stringify(storedCartItems);
      const stringBankData = JSON.stringify(bankData);

      const wholeInfoCheckout = {
        savedFormData: stringSavedFormData,
        storedCartItems: stringStoredCartItems,
        bankData:stringBankData
      };

      console.log(wholeInfoCheckout);

      var wholeArrayCheckout = JSON.parse(localStorage.getItem('wholeArrayCheckout')) || [];

      wholeArrayCheckout.push(wholeInfoCheckout);

      localStorage.setItem('wholeArrayCheckout', JSON.stringify(wholeArrayCheckout));
      localStorage.removeItem('bankData');
    }

    else{
      const stringSavedFormData = JSON.stringify(savedFormData);
      const stringStoredCartItems = JSON.stringify(storedCartItems);

      const wholeInfoCheckout = {
        savedFormData: stringSavedFormData,
        storedCartItems: stringStoredCartItems,
      };

      console.log(wholeInfoCheckout);

      var wholeArrayCheckout = JSON.parse(localStorage.getItem('wholeArrayCheckout')) || [];

      wholeArrayCheckout.push(wholeInfoCheckout);

      localStorage.setItem('wholeArrayCheckout', JSON.stringify(wholeArrayCheckout));
    }

    localStorage.removeItem("cartItems")
    localStorage.removeItem("formData")
    window.location.href = 'shopping-home.html';
  }

});
