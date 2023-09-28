document.addEventListener("DOMContentLoaded", function () {

const toastTrigger = document.querySelectorAll('.added-notif');
const toastLiveExample = document.getElementById('liveToast')

toastTrigger.forEach(button => {
  button.addEventListener('click', toastPopup);
});

function toastPopup() {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
  toastBootstrap.show()
}

const cartButton = document.getElementById("cart-button");
const cartCount = document.getElementById('cart-count');
const cartCountBottom = document.getElementById('cart-count-bottom');
let count = 0;
let cartItems = [];

function cartBtnCheck(){
  if (cartButton === null) {
    {}
  }
  else {
    cartButton.addEventListener('click', showCartItems);
    }
  }

cartBtnCheck()
loadCartItemsFromLocalStorage();

function showCartItems() {
  const cartModal = document.getElementById('cart-modal');
  cartModal.style.display = 'block';
  renderCartItems();
  updateCartTotal();
}

function hideCartItems() {
  const cartModal = document.getElementById('cart-modal');
  cartModal.style.display = 'none';
}

function calculateTotalPrice() {
  let totalPriceInCents = 0;
  cartItems.forEach(item => {
    totalPriceInCents += item.priceInCents * item.quantity;
  });
  return (totalPriceInCents / 100).toFixed(2);
}

function loadCartItemsFromLocalStorage() {
    const storedCartItems = localStorage.getItem('cartItems');
    console.log(storedCartItems);
    if (storedCartItems) {
      cartItems = JSON.parse(storedCartItems);
      updateCartTotal();
      updateCartCount();
      renderCartItems();
    }
  }

  function saveCartItemsToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }


// ...

function renderCartItems() {
  const cartItemsContainer = document.getElementById('cart-items-container');
  const emptyCart = document.getElementById("empty-cart");

  if (cartItems.length === 0) {
    cartItemsContainer.innerHTML = '';
    const noItem = document.createElement('h2');
    noItem.textContent = "Your Cart Is Empty";
    noItem.classList.add("m-0" , "text-center" , "p-2");

    if (emptyCart.children.length === 0){
      emptyCart.appendChild(noItem);
    }

  } else {

    emptyCart.innerHTML = "" ;
    cartItemsContainer.innerHTML = '';
    cartItems.forEach((item, index) => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('card' , "col-md-9", "col-11" ,"mx-2" , "my-3");

      const image = document.createElement('img');
      image.src = item.imageSrc;
      image.alt = item.name;
      image.style.width = '90%';

      const imageContainer = document.createElement('div');
      imageContainer.classList.add('card-img-top' , "d-flex" , "justify-content-center");
      imageContainer.appendChild(image);

      const name = document.createElement('h5');
      name.classList.add('card-title');
      name.textContent = item.name;

      const price = document.createElement('h6');
      price.textContent = `Price: $${(item.price * item.quantity).toFixed(2)}`;
      price.classList.add('card-text');

      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body' , "px-2" , "py-3");
      cardBody.appendChild(name);
      cardBody.appendChild(price);

      const decreaseButtonIcon = document.createElement('i');
      decreaseButtonIcon.classList.add("fa-solid" , "fa-minus");

      const increaseButtonIcon = document.createElement('i');
      increaseButtonIcon.classList.add("fa-solid" , "fa-plus");

      const decreaseButton = document.createElement('button');
      decreaseButton.classList.add('btn' , 'btn-outline-dark' , 'counter-minus');
      decreaseButton.addEventListener('click', () => decreaseQuantity(item));
      decreaseButton.appendChild(decreaseButtonIcon);

      const quantity = document.createElement('h6');
      quantity.textContent = item.quantity;
      quantity.style.textAlign = 'center';
      quantity.style.margin = "0" ;
      quantity.classList.add('card-text');

      const increaseButton = document.createElement('button');
      increaseButton.classList.add('btn' , 'btn-outline-dark' , 'counter-plus');
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
      removeButton.classList.add('btn' , 'btn-outline-dark' , '.bottom-remove-button');
      removeButton.addEventListener('click', () => removeItem(index));

      const cardFooter = document.createElement('div');
      cardFooter.classList.add('card-footer', "d-flex" , "flex-column" , "px-sm-3" , "px-2");
      cardFooter.appendChild(quantityContainer);
      cardFooter.appendChild(removeButton);

      cartItem.appendChild(imageContainer);
      cartItem.appendChild(cardBody);
      cartItem.appendChild(cardFooter);

      cartItemsContainer.appendChild(cartItem);
    });
  }

  // Show/hide checkout button based on cartItems length
  const checkoutButton = document.getElementById('checkout-button-container');
  if (cartItems.length === 0) {
    checkoutButton.style.display = 'none';
  } else {
    checkoutButton.style.display = 'flex';
    checkoutButton.style.justifyContent = 'center';
  }
}

// ...

function addToCart(button) {
  const product = button.parentElement.parentElement; // Get the product card
  const name = product.querySelector('h5').textContent;
  const priceElement = product.querySelector('h6.card-text');
  const priceText = priceElement.textContent;
  const priceMatch = priceText.match(/[\d.]+/); // Use regular expression to extract the numeric part of the price
  const price = parseFloat(priceMatch[0]); // Convert the extracted string to a floating-point number
  const imageSrc = product.querySelector('img').src;
  const quantityElement = product.querySelector('.item-count');
  const quantity = parseInt(quantityElement.textContent);

  const existingItem = cartItems.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cartItems.push({ name: name, price: price, quantity: quantity, imageSrc: imageSrc });
  }

  saveCartItemsToLocalStorage();
  updateCartTotal();
  updateCartCount();
  renderCartItems();
}


function decreaseQuantity(item) {
  if (item.quantity > 1) {
    item.quantity--;
  }

  saveCartItemsToLocalStorage();
  updateCartTotal();
  updateCartCount();
  renderCartItems();
}

function increaseQuantity(item) {
  item.quantity++;

  saveCartItemsToLocalStorage();
  updateCartTotal();
  updateCartCount();
  renderCartItems();
}

function removeItem(index) {
  cartItems.splice(index, 1);

  saveCartItemsToLocalStorage();
  updateCartTotal();
  updateCartCount();
  renderCartItems();
}

function updateCartTotal() {
  const cartTotal = document.getElementById('cart-total');
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  cartTotal.textContent = `Total: $${totalPrice.toFixed(2)}`;
}

function updateCartCount() {
  const totalCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = totalCount;
  cartCountBottom.textContent = totalCount;
}

const cartButtonBottom = document.getElementById("cart-button-bottom");
  cartButtonBottom.addEventListener('click', showCartItems);

function checkout() {
  if (cartItems.length === 0) {
    alert('Your cart is empty. Add some items before checking out.');
  } else {
    window.location.href = 'shopping-1st-form.html';
  }
}


const checkoutButton = document.createElement('button');
checkoutButton.id = 'checkout-button';
checkoutButton.textContent = 'Checkout';
checkoutButton.addEventListener('click', checkout);
checkoutButton.style.position = 'flex';
checkoutButton.classList.add('btn' , 'btn-light');
checkoutButton.style.width = "170px"
checkoutButton.style.height = "60px"

// Append the checkout button to the desired element in your HTML
const checkoutContainer = document.getElementById('checkout-button-container');
checkoutContainer.appendChild(checkoutButton);

// Add event listeners to the "Add to Cart" buttons
document.addEventListener('click', function(event) {
  if (event.target.classList.contains('bottom-card-button')) {
    addToCart(event.target);
  }
});

  const cartCloseButton = document.getElementById('cart-close');
  cartCloseButton.addEventListener('click', hideCartItems);


  function itemContainer() {
    // Get all the item containers
    const itemContainers = document.querySelectorAll('.item2');

    // Loop through each item container
    itemContainers.forEach(itemContainer => {
      const counterMinus = itemContainer.querySelector('.counter-minus');
      const counterPlus = itemContainer.querySelector('.counter-plus');
      const itemCount = itemContainer.querySelector('.item-count');

      let amount = parseInt(itemCount.textContent); // Get the initial count for each item

      counterMinus.addEventListener('click', () => {
        if (amount > 1) {
          amount--;
          itemCount.textContent = amount;
        }
      });

      counterPlus.addEventListener('click', () => {
        amount++;
        itemCount.textContent = amount;
      });
    });
  };
  itemContainer();
});
