document.addEventListener('DOMContentLoaded', function() {

  const accountSetting = document.getElementById('accountSetting');
  const ongoingTransaction = document.getElementById('ongoingTransaction');
  const transactionHistory = document.getElementById('transactionHistory');
  const commentAccount = document.getElementById('commentAccount');
  const customerService = document.getElementById('customerService');
  const accountUsername = document.getElementById('accountUsername');
  const accountSetEmail = document.getElementById('accountSetEmail');
  const accountSetPassword = document.getElementById('accountSetPassword');
  const accountAddress = document.getElementById('accountAddress');
  const faqButton = document.getElementById('faqButton');
  var buttonUser = document.getElementById('buttonUser');
  var buttonEmail = document.getElementById('buttonEmail');
  var buttonPassword = document.getElementById('buttonPassword');
  var buttonAddress = document.getElementById('buttonAddress');

  function loadlogInInfoFromLocalStorage() {
    const logInInfo = localStorage.getItem('logInInfo');
    if (logInInfo) {
      const logInInfoObject = JSON.parse(logInInfo);
      const emailValue = logInInfoObject.accountEmail;
      const passwordValue = logInInfoObject.accountPassword;
      accountSetEmail.value = emailValue;
      accountSetPassword.value = passwordValue;
    };

    const accountUsernameData = localStorage.getItem('accountUsernameData');
    if (accountUsernameData) {
      const accountUsernameDataObject = JSON.parse(accountUsernameData);
      const accountUsernameValue = accountUsernameDataObject.accountLocalUsername;
      accountUsername.value = accountUsernameValue;
    }

    const accountAddressData = localStorage.getItem('accountAddressData');
    if (accountAddressData) {
      const accountAddressDataObject = JSON.parse(accountAddressData);
      const accountAddressValue = accountAddressDataObject.accountLocalAddress;
      accountAddress.value = accountAddressValue;
    }

  }

  const ongoingCloseButton = document.getElementById('ongoingClose');
  ongoingCloseButton.addEventListener('click', hideOngoingDetail);

  function showOngoingDetail(checkoutData) {
    const ongoingModal = document.getElementById('ongoing-modal');
    const storedCartItems = JSON.parse(checkoutData.storedCartItems);

    if (storedCartItems) {
      renderCartItemsForTransaction(storedCartItems);
    }

    const savedFormData = JSON.parse(checkoutData.savedFormData);

    if (savedFormData) {
      const cartForm = document.getElementById('cartForm');
      const cartAdditional = document.getElementById('cartAdditional');
      cartForm.innerHTML = '';
      cartAdditional.innerHTML = '';

      const formDataObject = JSON.parse(savedFormData);
      console.log(formDataObject);
      const nameValue = formDataObject.name;
      const emailValue = formDataObject.email;
      const addressValue = formDataObject.address;
      const phoneValue = formDataObject.phonenumber;
      const stateProvinceValue = formDataObject.stateprovince;
      const postalCodeValue = formDataObject.postalcode;
      const additionalValue = formDataObject.additionalinfo;

      const infoName = document.createElement('h6');
      infoName.textContent = `Name : ${nameValue}`;
      infoName.classList.add('fw-normal');

      const infoEmail = document.createElement('h6');
      infoEmail.textContent = `Email : ${emailValue}` ;
      infoEmail.classList.add('fw-normal');

      const infoAdress = document.createElement('h6');
      infoAdress.textContent = `Address : ${addressValue}`;
      infoAdress.classList.add('fw-normal');

      const infoPhoneNumber = document.createElement('h6');
      infoPhoneNumber.textContent = `Phone Number : ${phoneValue}`;
      infoPhoneNumber.classList.add('fw-normal');

      const infoStateProvince = document.createElement('h6');
      infoStateProvince.textContent = `State / Province : ${stateProvinceValue}`;
      infoStateProvince.classList.add('fw-normal');

      const infoPostalCode = document.createElement('h6');
      infoPostalCode.textContent = `Postal Code : ${postalCodeValue}`;
      infoPostalCode.classList.add('fw-normal');

      cartForm.appendChild(infoName);
      cartForm.appendChild(infoEmail);
      cartForm.appendChild(infoAdress);
      cartForm.appendChild(infoPhoneNumber);
      cartForm.appendChild(infoStateProvince);
      cartForm.appendChild(infoPostalCode);

      if (additionalValue != "") {
        const infoAdditional = document.createElement('h5');
        infoAdditional.textContent = `Additional Info : ${additionalValue}`;
        infoAdditional.classList.add('fw-normal');
        cartAdditional.appendChild(infoAdditional);
      }

    }

    const paypalPaymentDataCheck = checkoutData.paypalPaymentData;
    if (paypalPaymentDataCheck) {
      const paypalPaymentData = JSON.parse(checkoutData.paypalPaymentData);
      const cartPayment = document.getElementById('cartPayment');
      const paypalPaymentDataInside =  JSON.parse(paypalPaymentData);
      cartPayment.innerHTML = '';
      console.log(paypalPaymentDataInside);

      const paymentMethod = document.createElement('h4');
      paymentMethod.textContent = "Payment : Paypal" ;

      const paypalEmail = document.createElement('h6');
      const paypalEmailValue = paypalPaymentDataInside.paypal;
      paypalEmail.textContent = `Paypal Email : ${paypalEmailValue}` ;
      paypalEmail.classList.add('fw-normal');

      cartPayment.appendChild(paymentMethod);
      cartPayment.appendChild(paypalEmail);

    }

    const bankDataCheck = checkoutData.bankData;
    if (bankDataCheck) {
      const bankData = JSON.parse(checkoutData.bankData);
      const cartPayment = document.getElementById('cartPayment');
      const bankDataInside =  JSON.parse(bankData);
      cartPayment.innerHTML = '';
      console.log(bankDataInside);

      const paymentMethod = document.createElement('h4');
      paymentMethod.textContent = "Payment : Bank Transfer" ;

      const bankName = document.createElement('h6');
      const bankNameValue = bankDataInside.nameBank;
      bankName.textContent = `Account Name : ${bankNameValue}` ;
      bankName.classList.add('fw-normal');

      const bankNumber = document.createElement('h6');
      const bankNumberValue = bankDataInside.bankNumber;
      bankNumber.textContent = `Account Number : ${bankNumberValue}` ;
      bankNumber.classList.add('fw-normal');

      cartPayment.appendChild(paymentMethod);
      cartPayment.appendChild(bankName);
      cartPayment.appendChild(bankNumber);

    }

    const debitDataCheck = checkoutData.debitData;
    if (debitDataCheck) {
      const debitData = JSON.parse(checkoutData.debitData);
      const cartPayment = document.getElementById('cartPayment');
      const debitDataInside =  JSON.parse(debitData);
      cartPayment.innerHTML = '';

      const paymentMethod = document.createElement('h4');
      paymentMethod.textContent = "Payment : Bank Transfer" ;

      const debitNumber = document.createElement('h6');
      const debitNumberValue = debitDataInside.debit;
      debitNumber.textContent = `Account Name : ${debitNumberValue}` ;
      debitNumber.classList.add('fw-normal');

      const expireDate = document.createElement('h6');
      const expireDateValue = debitDataInside.expire;
      expireDate.textContent = `Expire Date : ${expireDateValue}` ;
      expireDate.classList.add('fw-normal');

      const cvvNumber = document.createElement('h6');
      const cvvNumberValue = debitDataInside.cvv;
      cvvNumber.textContent = `CVV : ${cvvNumberValue}` ;
      cvvNumber.classList.add('fw-normal');

      cartPayment.appendChild(paymentMethod);
      cartPayment.appendChild(debitNumber);
      cartPayment.appendChild(expireDate);
      cartPayment.appendChild(cvvNumber);

    }

    if(paypalPaymentDataCheck == null && debitDataCheck == null && bankDataCheck == null){
      const cartPayment = document.getElementById('cartPayment');
      cartPayment.innerHTML = '';
      const paymentMethod = document.createElement('h4');
      paymentMethod.textContent = "Payment : Cash On Delivery" ;
      cartPayment.appendChild(paymentMethod);
    }

    ongoingModal.style.display = 'block';
  }

  function removeTransaction(index) {
  const wholeArrayCheckout = JSON.parse(localStorage.getItem('wholeArrayCheckout')) || [];
  if (index >= 0 && index < wholeArrayCheckout.length) {
    wholeArrayCheckout.splice(index, 1);
    localStorage.setItem('wholeArrayCheckout', JSON.stringify(wholeArrayCheckout));
    }
  }

  function removeTransactionHistory(index) {
  const transactionKey = JSON.parse(localStorage.getItem('transactionKey')) || [];
  if (index >= 0 && index < transactionKey.length) {
    transactionKey.splice(index, 1);
    localStorage.setItem('transactionKey', JSON.stringify(transactionKey));
    }
  }

  function moveTransactionToLocalStorage(index) {
  const wholeArrayCheckout = JSON.parse(localStorage.getItem('wholeArrayCheckout')) || [];

  if (index >= 0 && index < wholeArrayCheckout.length) {
    const transactionToMove = wholeArrayCheckout[index];
    console.log(transactionToMove);

    // Create a new local storage item with a unique key for each transaction
    var transactionKey = JSON.parse(localStorage.getItem('transactionKey')) || [];
    transactionKey.push(transactionToMove);
    console.log(transactionKey);
    localStorage.setItem('transactionKey', JSON.stringify(transactionKey));

    // Remove the transaction from wholeArrayCheckout
    wholeArrayCheckout.splice(index, 1);
    localStorage.setItem('wholeArrayCheckout', JSON.stringify(wholeArrayCheckout));
    loadHistoryInfoFromLocalStorage()
    loadCheckoutInfoFromLocalStorage();
  }
}


  function addSeeDetailEventListeners(checkoutData, seeDetailButton) {
    seeDetailButton.addEventListener("click", function() {
      showOngoingDetail(checkoutData);
    });
  }

  function hideOngoingDetail() {
    const ongoingModal = document.getElementById('ongoing-modal');
    ongoingModal.style.display = 'none';
  }

  function renderCartItemsForTransaction(cartItems) {
  const cartInfo = document.getElementById('cartInfo');
  cartInfo.innerHTML = ''; // Clear previous content

  if (cartItems.length === 0) {
    cartItemsString.innerHTML = '<h2>Your cart is empty.</h2>';
  } else {
    console.log(cartItems);
    cartItemsString =  JSON.parse(cartItems);
    console.log(cartItemsString);
    cartItemsString.forEach((item, index) => {
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

        cartInfo.appendChild(cartItemCard);
    });
  }
}


  function loadCheckoutInfoFromLocalStorage() {
    const wholeArrayCheckout = JSON.parse(localStorage.getItem('wholeArrayCheckout'))
    const checkoutList = document.getElementById('checkoutListOngoing');
    checkoutList.innerHTML = "";

    if (wholeArrayCheckout.length > 0) {

      for (let i = 0; i < wholeArrayCheckout.length; i++) {
      const checkoutData = wholeArrayCheckout[i];
      console.log(checkoutData);

      // Access properties of each checkoutData object
      const savedFormData = JSON.parse(checkoutData.savedFormData);
      const storedCartItems = JSON.parse(checkoutData.storedCartItems);

      const transactionStatus = document.createElement('div');
      transactionStatus.style.height  = '25px'
      transactionStatus.textContent = `Transaction Status : On Progress`;
      transactionStatus.classList.add('badge' ,"col-12" , "bg-warning");

      const cartItem = document.createElement('div');
      cartItem.classList.add('card' , "col-sm-10", "col-11" ,"mx-2" , "border-top-0" , "flex-row" , "flex-wrap" , "mt-2" , "transaction");
      cartItem.appendChild(transactionStatus)

      const boxStack = document.createElement("div");
      boxStack.classList.add('fa-solid' , 'fa-boxes-stacked', 'h-50');

      const boxes = document.createElement("div");
      boxes.style.height  = '100px'
      boxes.classList.add('col-md-2' , "col-sm-4" ,"col-12" ,  "d-flex" , "justify-content-center" , "align-items-center");
      boxes.style.color  = 'var(--bs-warning)'
      boxes.appendChild(boxStack)

      const checkoutOrder = document.createElement("div");
      checkoutOrder.classList.add('col-md-3' , "col-sm-4" ,"col-12" ,  "d-flex" , "justify-content-center" , "align-items-center" , "ps-2");
      checkoutOrder.textContent = `Checkout Items No.${i + 1}`;

      const cartlist = JSON.parse(storedCartItems);
      const cartItemsCountContainer = document.createElement("div");
      cartItemsCountContainer.style.fontSize = "18px" ;
      cartItemsCountContainer.textContent = "Cart Content";
      cartItemsCountContainer.classList.add("col-md-3" , "col-sm-4" ,"col-12" ,  "text-center" , "d-flex" , "flex-column" , "justify-content-center" );

      for (let j = 0; j < cartlist.length; j++){
        const cartItemsCount = document.createElement("p");
        cartItemsCount.classList.add('m-0' , "text-center");
        cartItemsCount.style.fontSize = "15px" ;
        cartItemsCount.style.color  = 'var(--bs-gray-700)';
        cartItemsCount.textContent = cartlist[j].name;
        cartItemsCountContainer.appendChild(cartItemsCount)
        if (j == 1 && cartlist.length > 2){
          const andMore = document.createElement("p");
          andMore.classList.add('m-0' , "text-center");
          andMore.style.fontSize = "13px" ;
          andMore.style.color  = 'var(--bs-gray-600)';
          andMore.style.fontStyle  = 'italic';
          andMore.textContent = `And ${cartlist.length - (j+1)}+ More`;
          cartItemsCountContainer.appendChild(andMore)
          break
        }
      }

      const trashIcon = document.createElement("i");
      trashIcon.classList.add('fa-solid' , 'fa-trash' , "ps-2");

      const checkIcon = document.createElement("i");
      checkIcon.classList.add('fa-solid' , 'fa-check' , "ps-2");

      const infoIcon = document.createElement("i");
      infoIcon.classList.add('fa-solid' , 'fa-info' , "ps-2");

      // Create a "See Detail" button for each transaction
      const seeDetailButton = document.createElement("button");
      seeDetailButton.style.fontSize = "12px";
      seeDetailButton.classList.add('btn', 'btn-outline-secondary', 'col-10', 'mt-1');
      seeDetailButton.style.padding = "3px";
      seeDetailButton.textContent = "See Detail";
      seeDetailButton.appendChild(infoIcon);

      const confirmButton = document.createElement("button");
      confirmButton.style.fontSize = "12px" ;
      confirmButton.style.padding = "3px" ;
      confirmButton.classList.add('btn' , "btn-outline-success" , "col-10" , "my-1");
      confirmButton.textContent = "Mark As Done";
      confirmButton.appendChild(checkIcon);

      const removeButton = document.createElement("button");
      removeButton.style.fontSize = "12px" ;
      removeButton.style.padding = "3px" ;
      removeButton.classList.add('btn' , "btn-outline-danger" , "col-10" , "mb-1");
      removeButton.textContent = "Remove Items";
      removeButton.appendChild(trashIcon);


      addSeeDetailEventListeners(checkoutData, seeDetailButton);

      confirmButton.addEventListener("click", function() {
        const transactionKey = moveTransactionToLocalStorage(i);
        loadCheckoutInfoFromLocalStorage();
        if (transactionKey) {
          console.log(`Transaction Key: ${transactionKey}`);
        }
      });

      removeButton.addEventListener("click", function() {
        removeTransaction(i);
        loadCheckoutInfoFromLocalStorage();
      });


      const buttonContainer = document.createElement("div");
      buttonContainer.style.fontSize = "13px" ;
      buttonContainer.classList.add("col-md-4" , "col-12" , "d-flex" , "flex-column" , "align-items-center" , "justify-content-around");
      buttonContainer.appendChild(seeDetailButton);
      buttonContainer.appendChild(confirmButton);
      buttonContainer.appendChild(removeButton);


      cartItem.appendChild(boxes)
      cartItem.appendChild(checkoutOrder)
      cartItem.appendChild(cartItemsCountContainer)
      cartItem.appendChild(buttonContainer)
      checkoutList.appendChild(cartItem)

      };
    }

    else if(wholeArrayCheckout.length === 0 ) {
      const emptyTransaction  = document.createElement("h5");
      emptyTransaction.classList.add('mt-3' , "text-center" , "px-2");
      emptyTransaction.textContent = "You Doesn't Have Any Transaction Right Now" ;

      const buttonShop = document.createElement("button");
      buttonShop.classList.add('btn', 'btn-outline-dark', 'col-7' , "col-md-5" , 'mt-3');
      buttonShop.textContent = "Go To Shop"

      buttonShop.addEventListener("click", function() {
        window.location.href = 'shopping-shop.html';
      });

      checkoutList.appendChild(emptyTransaction)
      checkoutList.appendChild(buttonShop)
    }

  };

  function loadHistoryInfoFromLocalStorage() {
    const transactionData = JSON.parse(localStorage.getItem('transactionKey')) || [];
    console.log(transactionData);
    const checkoutList = document.getElementById('checkoutListHistory');
    checkoutList.innerHTML = "";

    if (transactionData.length > 0) {

    for (let i = 0; i < transactionData.length; i++) {
      const checkoutData = transactionData[i];
      console.log(checkoutData);

      // Access properties of each checkoutData object
      const savedFormData = JSON.parse(checkoutData.savedFormData);
      const storedCartItems = JSON.parse(checkoutData.storedCartItems);

      const transactionStatus = document.createElement('div');
      transactionStatus.style.height  = '25px'
      transactionStatus.textContent = `Transaction Status : Done`;
      transactionStatus.classList.add('badge' ,"col-12" , "bg-success");

      const cartItem = document.createElement('div');
      cartItem.classList.add('card' , "col-sm-10", "col-11" ,"mx-2" , "border-top-0" , "flex-row" , "flex-wrap" , "mt-2" , "history");
      cartItem.appendChild(transactionStatus)

      const boxStack = document.createElement("div");
      boxStack.classList.add('fa-solid' , 'fa-boxes-stacked', 'h-50');

      const boxes = document.createElement("div");
      boxes.style.height  = '100px'
      boxes.classList.add('col-md-2' , "col-sm-4" ,"col-12" ,  "d-flex" , "justify-content-center" , "align-items-center");
      boxes.style.color  = 'var(--bs-success)';
      boxes.appendChild(boxStack)

      const checkoutOrder = document.createElement("div");
      checkoutOrder.classList.add('col-md-3' , "col-sm-4" ,"col-12" ,  "d-flex" , "justify-content-center" , "align-items-center" , "ps-2");
      checkoutOrder.textContent = `Checkout History No.${i + 1}`;

      const cartlist = JSON.parse(storedCartItems);
      const cartItemsCountContainer = document.createElement("div");
      cartItemsCountContainer.style.fontSize = "18px" ;
      cartItemsCountContainer.textContent = "Cart Content";
      cartItemsCountContainer.style.height  = '100px';
      cartItemsCountContainer.classList.add("col-md-3" , "col-sm-4" ,"col-12" ,  "text-center" , "d-flex" , "flex-column" , "justify-content-center" );

      for (let j = 0; j < cartlist.length; j++){
        const cartItemsCount = document.createElement("p");
        cartItemsCount.classList.add('m-0' , "text-center");
        cartItemsCount.style.fontSize = "15px" ;
        cartItemsCount.style.color  = 'var(--bs-gray-700)';
        cartItemsCount.textContent = cartlist[j].name;
        cartItemsCountContainer.appendChild(cartItemsCount)
        if (j == 1 && cartlist.length > 2){
          const andMore = document.createElement("p");
          andMore.classList.add('m-0' , "text-center");
          andMore.style.fontSize = "13px" ;
          andMore.style.color  = 'var(--bs-gray-600)';
          andMore.style.fontStyle  = 'italic';
          andMore.textContent = `And ${cartlist.length - (j+1)}+ More`;
          cartItemsCountContainer.appendChild(andMore)
          break
        }
      }

      const trashIcon = document.createElement("i");
      trashIcon.classList.add('fa-solid' , 'fa-trash' , "ps-2");

      const checkIcon = document.createElement("i");
      checkIcon.classList.add('fa-solid' , 'fa-check' , "ps-2");

      const infoIcon = document.createElement("i");
      infoIcon.classList.add('fa-solid' , 'fa-info' , "ps-2");

      // Create a "See Detail" button for each transaction
      const seeDetailButton = document.createElement("button");
      seeDetailButton.style.fontSize = "13px";
      seeDetailButton.classList.add('btn', 'btn-outline-secondary', 'col-10');
      seeDetailButton.textContent = "See Detail";
      seeDetailButton.appendChild(infoIcon);

      const removeButton = document.createElement("button");
      removeButton.style.fontSize = "13px" ;
      removeButton.classList.add('btn' , "btn-outline-danger" , "col-10" , "remove-button" );
      removeButton.textContent = "Clear History";
      removeButton.appendChild(trashIcon);


      addSeeDetailEventListeners(checkoutData, seeDetailButton);

      removeButton.addEventListener("click", function() {
        removeTransactionHistory(i);
        loadHistoryInfoFromLocalStorage();
      });

      const buttonContainer = document.createElement("div");
      buttonContainer.style.fontSize = "13px" ;
      buttonContainer.style.height = "100px" ;
      buttonContainer.classList.add("col-md-4" , "col-12" , "d-flex" , "flex-column" , "align-items-center" , "justify-content-around");
      buttonContainer.appendChild(seeDetailButton);
      buttonContainer.appendChild(removeButton);

      cartItem.appendChild(boxes)
      cartItem.appendChild(checkoutOrder)
      cartItem.appendChild(cartItemsCountContainer)
      cartItem.appendChild(buttonContainer)
      checkoutList.appendChild(cartItem)

    }
  }

    else if(transactionData.length === 0 ) {
      const emptyTransaction  = document.createElement("h5");
      emptyTransaction.classList.add('mt-3' , "text-center" , "px-2");
      emptyTransaction.textContent = "Your History Was Empty" ;

      const buttonShop = document.createElement("button");
      buttonShop.classList.add('btn', 'btn-outline-dark', 'col-7' , "col-md-5" , 'mt-3');
      buttonShop.textContent = "Go To Shop"

      buttonShop.addEventListener("click", function() {
        window.location.href = 'shopping-shop.html';
      });

      checkoutList.appendChild(emptyTransaction)
      checkoutList.appendChild(buttonShop)
      }
  };


  loadlogInInfoFromLocalStorage();
  loadCheckoutInfoFromLocalStorage()

  const transactionData = localStorage.getItem("transactionKey") || [];
  if (transactionData) {
    loadHistoryInfoFromLocalStorage()
  } else {
    console.log('Transaction not found.');
  }

  buttonUser.addEventListener("click" , enableEditUser);
  buttonEmail.addEventListener("click" , enableEditEmail);
  buttonPassword.addEventListener("click" , enableEditPassword);
  buttonAddress.addEventListener("click" , enableEditAddress);

  function enableEditUser(){
    accountUsername.disabled = false ;
    var buttonUserClone = buttonUser.cloneNode(true);
    buttonUserClone.type = "submit";
    buttonUserClone.style.background = "var(--bs-success-border-subtle)";
    buttonUserClone.textContent = "" ;

    buttonConfirm = document.createElement("i") ;
    buttonConfirm.classList.add("fa-solid" , "fa-check");
    buttonConfirm.style.color = "green"
    buttonUserClone.appendChild(buttonConfirm);

    buttonUserClone.addEventListener("click", saveUserToLocalStorage)

    buttonUser.parentNode.replaceChild(buttonUserClone , buttonUser)
  }

  function enableEditEmail(){
    accountSetEmail.disabled = false ;
    var buttonEmailClone = buttonEmail.cloneNode(true);
    buttonEmailClone.type = "submit";
    buttonEmailClone.style.background = "var(--bs-success-border-subtle)";
    buttonEmailClone.textContent = "" ;

    buttonConfirm = document.createElement("i") ;
    buttonConfirm.classList.add("fa-solid" , "fa-check");
    buttonConfirm.style.color = "green"
    buttonEmailClone.appendChild(buttonConfirm);

    buttonEmailClone.addEventListener("click", saveSetEmailToLocalStorage)

    buttonEmail.parentNode.replaceChild(buttonEmailClone , buttonEmail)
  }

  function enableEditPassword(){

    accountSetPassword.disabled = false ;
    var buttonPasswordClone = buttonPassword.cloneNode(true);
    buttonPasswordClone.type = "submit";
    buttonPasswordClone.style.background = "var(--bs-success-border-subtle)";
    buttonPasswordClone.textContent = "" ;

    buttonConfirm = document.createElement("i") ;
    buttonConfirm.classList.add("fa-solid" , "fa-check");
    buttonConfirm.style.color = "green"
    buttonPasswordClone.appendChild(buttonConfirm);

    buttonPasswordClone.addEventListener("click", saveSetPasswordToLocalStorage)

    buttonPassword.parentNode.replaceChild(buttonPasswordClone , buttonPassword)
  }

  function enableEditAddress(){

    accountAddress.disabled = false ;
    var buttonAddressClone = buttonAddress.cloneNode(true);
    buttonAddressClone.type = "submit";
    buttonAddressClone.style.background = "var(--bs-success-border-subtle)";
    buttonAddressClone.textContent = "" ;

    buttonConfirm = document.createElement("i") ;
    buttonConfirm.classList.add("fa-solid" , "fa-check");
    buttonConfirm.style.color = "green"
    buttonAddressClone.appendChild(buttonConfirm);

    buttonAddressClone.addEventListener("click", saveAddressToLocalStorage)

    buttonAddress.parentNode.replaceChild(buttonAddressClone , buttonAddress)

  }

  function saveUserToLocalStorage() {
    const accountLocalUsername = document.getElementById("accountUsername").value;
      const accountUsernameData = {
        accountLocalUsername: accountLocalUsername,
      };
      localStorage.setItem('accountUsernameData', JSON.stringify(accountUsernameData));
  }

  function saveSetEmailToLocalStorage() {
       const newEmail = accountSetEmail.value;
       const logInInfo = JSON.parse(localStorage.getItem('logInInfo')) || {};
       logInInfo.accountEmail = newEmail;
       localStorage.setItem('logInInfo', JSON.stringify(logInInfo));
  }

  function saveSetPasswordToLocalStorage() {
       const newPassword = accountSetPassword.value;
       const logInInfo = JSON.parse(localStorage.getItem('logInInfo')) || {};
       logInInfo.accountPassword = newPassword;
       localStorage.setItem('logInInfo', JSON.stringify(logInInfo));
  }

  function saveAddressToLocalStorage() {
    const accountLocalAddress = document.getElementById("accountAddress").value;
      const accountAddressData = {
        accountLocalAddress: accountLocalAddress,
      };
      localStorage.setItem('accountAddressData', JSON.stringify(accountAddressData));
  }

  document.querySelectorAll('input[type="radio"]').forEach(function(radio) {
    radio.addEventListener('change', function() {
      if (this.checked) {
        const selectedOption = this.value;
        getCardHTML(selectedOption);
      }
    });
  });

  function getCardHTML(option) {
    let html = '';
    switch (option) {
      case 'account':
      accountSetting.style.display = 'block';
      ongoingTransaction.style.display = 'none';
      transactionHistory.style.display = 'none';
      commentAccount.style.display = 'none';
      customerService.style.display = 'none';
      break;
      case 'ongoing':
      accountSetting.style.display = 'none';
      ongoingTransaction.style.display = 'block';
      transactionHistory.style.display = 'none';
      commentAccount.style.display = 'none';
      customerService.style.display = 'none';
      break;
      case 'history':
      accountSetting.style.display = 'none';
      ongoingTransaction.style.display = 'none';
      transactionHistory.style.display = 'block';
      commentAccount.style.display = 'none';
      customerService.style.display = 'none';
      break;
      case 'comment':
      accountSetting.style.display = 'none';
      ongoingTransaction.style.display = 'none';
      transactionHistory.style.display = 'none';
      commentAccount.style.display = 'block';
      customerService.style.display = 'none';
      break;
      case 'csPlant':
      accountSetting.style.display = 'none';
      ongoingTransaction.style.display = 'none';
      transactionHistory.style.display = 'none';
      commentAccount.style.display = 'none';
      customerService.style.display = 'block';
      break;
    }
  }

  faqButton.addEventListener("click" , goToFaq);

  function goToFaq() {
    window.location.href = 'shopping-contact.html';
  }

  logOutButton.addEventListener("click" , logOut);

  function logOut() {
    localStorage.removeItem('logInInfo')
    window.location.href = 'shopping-home.html';
  }

});
