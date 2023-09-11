document.addEventListener('DOMContentLoaded', function() {

let cartItems = [];

  const form = document.getElementById('checkout-form');
  const nameDefault = document.getElementById("name")
  const emailDefault = document.getElementById("address") ;

  const accountUsernameData = localStorage.getItem('accountUsernameData');
  if (accountUsernameData) {
    const accountUsernameDataObject = JSON.parse(accountUsernameData);
    const accountUsernameValue = accountUsernameDataObject.accountLocalUsername;
    nameDefault.value = accountUsernameValue;
  }

  const accountAddressData = localStorage.getItem('accountAddressData');
  if (accountAddressData) {
    const accountAddressDataObject = JSON.parse(accountAddressData);
    const accountAddressValue = accountAddressDataObject.accountLocalAddress;
    emailDefault.value = accountAddressValue;
  }

loadCartItemsFromLocalStorage();
updateCartTotal();

function loadCartItemsFromLocalStorage() {
    const storedCartItems = localStorage.getItem('cartItems');
    const formData = localStorage.getItem('formData');
    console.log(storedCartItems);
    console.log(formData);
    if (storedCartItems) {
      cartItems = JSON.parse(storedCartItems);
      renderCartItems()
    }
  }

  form.addEventListener("submit", (e) => {
      // Save form values to local storage
      saveFormValuesToLocalStorage();
      event.preventDefault();
      window.location.href = 'shopping-2nd-form.html';
  });

function saveFormValuesToLocalStorage() {
  const nameForm = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;
  const phonenumber = document.getElementById('phoneNumber').value;
  const stateprovince = document.getElementById('stateProvince').value;
  const postalcode = document.getElementById('postalCode').value;
  const additionalInfo = document.getElementById('extra').value;
    const formData = {
      name: nameForm,
      email: email,
      address: address,
      phonenumber: phonenumber,
      stateprovince: stateprovince,
      postalcode: postalcode,
      additionalinfo: additionalInfo,
      // Add more form fields here as needed
    };

    localStorage.setItem('formData', JSON.stringify(formData));
  }

function saveCartItemsToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

  function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items-container');

    if (cartItems.length === 0) {
      cartItemsContainer.innerHTML = '<h2>Your cart is empty.</h2>';
    } else {
      cartItemsContainer.innerHTML = '';
      cartItems.forEach((item, index) => {
        const cartItemCard = document.createElement('div');
        cartItemCard.classList.add('card' , "col-xl-10" , "col-lg-12" ,"col-md-11" ,"col-12", "shadow-lg");

        const cartItem =document.createElement('div');
        cartItem.classList.add("row" , "g-0" , "w-100" , "h-100");

        const image = document.createElement('img');
        image.src = item.imageSrc;
        image.alt = item.name;
        image.classList.add('w-75');

        const imageContainer = document.createElement('div');
        imageContainer.classList.add('col-3' , "d-flex" , "flex-column" , "align-items-center" , "justify-content-center");
        imageContainer.appendChild(image);

        const name = document.createElement('h6');
        name.classList.add('card-title');
        name.textContent = item.name;

        const price = document.createElement('p');
        price.textContent = `Price: $${(item.price * item.quantity).toFixed(2)}`;
        price.classList.add('card-text');

        const cardBody = document.createElement('div');
        cardBody.classList.add('col-4');
        cardBody.style.alignSelf = 'center';
        cardBody.appendChild(name);
        cardBody.appendChild(price);

        const decreaseButtonIcon = document.createElement('i');
        decreaseButtonIcon.classList.add("fa-solid" , "fa-minus");

        const increaseButtonIcon = document.createElement('i');
        increaseButtonIcon.classList.add("fa-solid" , "fa-plus");

        const decreaseButton = document.createElement('button');
        decreaseButton.classList.add('btn' , 'btn-outline-dark');
        decreaseButton.addEventListener('click', () => decreaseQuantity(item));
        decreaseButton.appendChild(decreaseButtonIcon);

        const quantity = document.createElement('h6');
        quantity.textContent = item.quantity;
        quantity.style.textAlign = 'center';
        quantity.style.margin = "0" ;
        quantity.classList.add('card-text');

        const increaseButton = document.createElement('button');
        increaseButton.classList.add('btn' , 'btn-outline-dark');
        increaseButton.addEventListener('click', () => increaseQuantity(item));
        increaseButton.appendChild(increaseButtonIcon);

        const quantityContainer = document.createElement('div');
        quantityContainer.id = ('quantity-container');
        quantityContainer.classList.add('mb-3');
        quantityContainer.appendChild(increaseButton);
        quantityContainer.appendChild(quantity);
        quantityContainer.appendChild(decreaseButton);

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('btn' , 'btn-outline-dark');
        removeButton.addEventListener('click', () => removeItem(index));

        const cardFooter = document.createElement('div');
        cardFooter.classList.add('card-footer' , 'col-5' , "px-2" ,"d-flex" , "flex-column" , "justify-content-center" , "border-top-0");
        cardFooter.appendChild(quantityContainer);
        cardFooter.appendChild(removeButton);

        cartItem.appendChild(imageContainer);
        cartItem.appendChild(cardBody);
        cartItem.appendChild(cardFooter);
        cartItemCard.appendChild(cartItem);

        cartItemsContainer.appendChild(cartItemCard);
      });
    }
  }

  function decreaseQuantity(item) {
    console.log(item);
    if (item.quantity > 1) {
      item.quantity--;
    }

    else {
      removeItem(item) ;
    }
    saveCartItemsToLocalStorage();
    renderCartItems();
    updateCartTotal()
  }

  function increaseQuantity(item) {
    console.log(item);
    item.quantity++;

    saveCartItemsToLocalStorage();
    renderCartItems();
    updateCartTotal()
  }

  function removeItem(index) {
    cartItems.splice(index, 1);

    saveCartItemsToLocalStorage();
    renderCartItems();
    updateCartTotal()
  }

  function updateCartTotal() {
    const cartTotal = document.getElementById('cart-total');
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    cartTotal.textContent = `Total: $${totalPrice.toFixed(2)}`;
  }

});
