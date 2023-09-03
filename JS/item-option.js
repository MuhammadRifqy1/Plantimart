const output = document.getElementById("output");

document.querySelectorAll('input[type="radio"]').forEach(function(radio) {
  radio.addEventListener('change', function() {
    if (this.checked) {
      const selectedOption = this.value;
      output.innerHTML = getCardHTML(selectedOption);
      itemContainer(); // Call the itemContainer function to update the quantity buttons
    }
  });
});

output.innerHTML = getCardHTML('option1');

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
}

// Call the itemContainer function initially to set up the quantity buttons
itemContainer();


  function getCardHTML(option) {
    let html = '';
    switch (option) {
      case 'option1':
        html = `
    <div id="product-header"><h1 class="veg">Veggies <i class="fa-solid fa-carrot"></i></h1></div>

    <div id="stuff-bg" class="veg">
        <div id="product-container">
            <div class="card">
                <img src="./Project1-Css/nobg/onion.png" class="card-img-top" alt="...">
                <div class="card-body">
                <h2 class="card-title">Onion</h2>
                <p class="card-text">Price: $0.99.</p>
                </div>
                <div class="card-footer">
                <div class="item2" id = "quantity-container">
                    <button class="btn btn-outline-dark counter-plus"><i class="fa-solid fa-plus"></i></button>
                    <div class=item-count id=quantity2><p>1</p></div>
                    <button class="btn btn-outline-dark counter-minus"><i class="fa-solid fa-minus"></i></button>
                </div>
                <button type="button" class="btn btn-outline-dark checkout" data-bs-toggle="button">Add to Cart</button>
                </div>
            </div>
            <div class="card">
                <img src="./Project1-Css/nobg/Stock6-nobg.png" class="card-img-top" alt="...">
                <div class="card-body">
                <h2 class="card-title">Corn</h2>
                <p class="card-text">Price: $2.99.</p>
                </div>
                <div class="card-footer">
                <div class="item2" id = "quantity-container">
                    <button class="btn btn-outline-dark counter-plus"><i class="fa-solid fa-plus"></i></button>
                    <div class=item-count id=quantity2>1</div>
                    <button class="btn btn-outline-dark counter-minus"><i class="fa-solid fa-minus"></i></button>
                </div>
                <button type="button" class="btn btn-outline-dark checkout" data-bs-toggle="button">Add to Cart</button>
                </div>
            </div>
            <div class="card">
                <img src="./Project1-Css/nobg/Stock4-nobg.png" class="card-img-top" alt="...">
                <div class="card-body">
                <h2 class="card-title">Spinach</h2>
                <p class="card-text">Price: $3.99</p>
                </div>
                <div class="card-footer">
                <div class="item2" id = "quantity-container">
                    <button class="btn btn-outline-dark counter-plus"><i class="fa-solid fa-plus"></i></button>
                    <div class=item-count id=quantity2>1</div>
                    <button class="btn btn-outline-dark counter-minus"><i class="fa-solid fa-minus"></i></button>
                </div>
                <button type="button" class="btn btn-outline-dark checkout" data-bs-toggle="button">Add to Cart</button>
                </div>
            </div>
            <div class="card">
                <img src="./Project1-Css/nobg/Stock3-nobg.png" class="card-img-top" alt="...">
                <div class="card-body">
                <h2 class="card-title">Broccoli</h2>
                <p class="card-text">Price: $1.99</p>
                </div>
                <div class="card-footer">
                <div class="item2" id = "quantity-container">
                    <button class="btn btn-outline-dark counter-plus"><i class="fa-solid fa-plus"></i></button>
                    <div class=item-count id=quantity2>1</div>
                    <button class="btn btn-outline-dark counter-minus"><i class="fa-solid fa-minus"></i></button>
                </div>
                <button type="button" class="btn btn-outline-dark checkout" data-bs-toggle="button">Add to Cart</button>
                </div>
            </div>
        </div>
    </div>
        `;
        break;
      case 'option2':
        html = `
    <div id="product-header"><h1 class="fruit" >Fruit <i class="fa-solid fa-apple-whole"></i></h1></div>
    
    <div id="stuff-bg" class="fruit">
        <div id="product-container">
            <div class="card">
                <img src="./Project1-Css/nobg/Stock2-nobg.png" class="card-img-top" alt="Product 6">
                <div class="card-body">
                <h2 class="card-title">Pomegranate</h2>
                <p class="card-text">Price: $3.49</p>
                </div>
                <div class="card-footer">
                <div class="item2" id = "quantity-container">
                    <button class="btn btn-outline-dark counter-plus"><i class="fa-solid fa-plus"></i></button>
                    <div class=item-count id=quantity2>1</div>
                    <button class="btn btn-outline-dark counter-minus"><i class="fa-solid fa-minus"></i></button>
                </div>
                <button type="button" class="btn btn-outline-dark checkout" data-bs-toggle="button">Add to Cart</button>
                </div>
            </div>
            <div class="card">
                <img src="./Project1-Css/nobg/Stock5-nobg.png" class="card-img-top" alt="...">
                <div class="card-body">
                <h2 class="card-title">Apple</h2>
                <p class="card-text">Price: $4.99</p>
                </div>
                <div class="card-footer">
                <div class="item2" id = "quantity-container">
                    <button class="btn btn-outline-dark counter-plus"><i class="fa-solid fa-plus"></i></button>
                    <div class=item-count id=quantity2>1</div>
                    <button class="btn btn-outline-dark counter-minus"><i class="fa-solid fa-minus"></i></button>
                </div>
                <button type="button" class="btn btn-outline-dark checkout" data-bs-toggle="button">Add to Cart</button>
                </div>
            </div>
            <div class="card">
                <img src="./Project1-Css/nobg/Stock8-nobg.png" class="card-img-top" alt="Product 7">
                <div class="card-body">
                <h2 class="card-title">Watermelon</h2>
                <p class="card-text">Price: $5.59</p>
                </div>
                <div class="card-footer">
                <div class="item2" id = "quantity-container">
                    <button class="btn btn-outline-dark counter-plus"><i class="fa-solid fa-plus"></i></button>
                    <div class=item-count id=quantity2>1</div>
                    <button class="btn btn-outline-dark counter-minus"><i class="fa-solid fa-minus"></i></button>
                </div>
                <button type="button" class="btn btn-outline-dark checkout" data-bs-toggle="button">Add to Cart</button>
                </div>
            </div>
            <div class="card">
                <img src="./Project1-Css/nobg/Stock9-nobg.png" class="card-img-top" alt="Product 8">
                <div class="card-body">
                <h2 class="card-title">Banana</h2>
                <p class="card-text">Price: $2.49</p>
                </div>
                <div class="card-footer">
                <div class="item2" id = "quantity-container">
                    <button class="btn btn-outline-dark counter-plus"><i class="fa-solid fa-plus"></i></button>
                    <div class=item-count id=quantity2>1</div>
                    <button class="btn btn-outline-dark counter-minus"><i class="fa-solid fa-minus"></i></button>
                </div>
                <button type="button" class="btn btn-outline-dark checkout" data-bs-toggle="button">Add to Cart</button>
                </div>
            </div>
        </div>
    </div>
        `;
        break;
      case 'option3':
        html = `
          <div id="product-header"><h1 class="misc">Others <i class="fa-solid fa-bottle-water"></i></h1></div>

        <div id="stuff-bg" class="misc">
        <div id="product-container">
            <div class="card">
                <img src="./Project1-Css/nobg/Stock1-nobg.png" class="card-img-top" alt="Product 4">
                <div class="card-body">
                <h2 class="card-title">Water</h2>
                <p class="card-text">Price: $1.49</p>
                </div>
                <div class="card-footer">
                <div class="item2" id = "quantity-container">
                    <button class="btn btn-outline-dark counter-plus"><i class="fa-solid fa-plus"></i></button>
                    <div class=item-count id=quantity2>1</div>
                    <button class="btn btn-outline-dark counter-minus"><i class="fa-solid fa-minus"></i></button>
                </div>
                <button type="button" class="btn btn-outline-dark checkout" data-bs-toggle="button">Add to Cart</button>
                </div>
            </div>

            <div class="card">
                <img src="./Project1-Css/nobg/Stock10-nobg.png" class="card-img-top" alt="Product 9">
                <div class="card-body">
                <h2 class="card-title">Milk</h2>
                <p class="card-text">Price: $5.49</p>
                </div>
                <div class="card-footer">
                <div class="item2" id = "quantity-container">
                    <button class="btn btn-outline-dark counter-plus"><i class="fa-solid fa-plus"></i></button>
                    <div class=item-count id=quantity2>1</div>
                    <button class="btn btn-outline-dark counter-minus"><i class="fa-solid fa-minus"></i></button>
                </div>
                <button type="button" class="btn btn-outline-dark checkout" data-bs-toggle="button">Add to Cart</button>
                </div>
            </div>
            
            <div class="card">
                <img src="./Project1-Css/nobg/out-of-stock.png" class="card-img-top" alt="...">
                <div class="card-body">
                <h2 class="card-title">Out Of Stock</h2>
                <p class="card-text">Price: $0.00.</p>
                </div>
                <div class="card-footer">
                <div class="item2" id = "quantity-container">
                    <button class="btn btn-outline-dark counter-plus" disabled data-bs-toggle="button"><i class="fa-solid fa-plus"></i></button>
                    <div class=item-count id=quantity2>0</div>
                    <button class="btn btn-outline-dark counter-minus" disabled data-bs-toggle="button"><i class="fa-solid fa-minus"></i></button>
                </div>
                <button type="button" class="btn btn-outline-dark checkout" disabled data-bs-toggle="button">Add to Cart</button>
                </div>
            </div>

            <div class="card">
                <img src="./Project1-Css/nobg/out-of-stock.png" class="card-img-top" alt="...">
                <div class="card-body">
                <h2 class="card-title">Out Of Stock</h2>
                <p class="card-text">Price: $0.00.</p>
                </div>
                <div class="card-footer">
                <div class="item2" id = "quantity-container">
                    <button class="btn btn-outline-dark counter-plus" disabled data-bs-toggle="button"><i class="fa-solid fa-plus"></i></button>
                    <div class=item-count id=quantity2>0</div>
                    <button class="btn btn-outline-dark counter-minus" disabled data-bs-toggle="button"><i class="fa-solid fa-minus"></i></button>
                </div>
                <button type="button" class="btn btn-outline-dark checkout" disabled data-bs-toggle="button">Add to Cart</button>
                </div>
            </div>
        </div>
    </div>
        `;
        break;
    }
    return html;
  }