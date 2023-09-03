// JavaScript
document.addEventListener("DOMContentLoaded", function () {

  const products = document.querySelectorAll('.product-category');
  const productsText = document.querySelectorAll('.product-category .card-title');
  const searchbar = document.getElementById('search-bar-input');
  const filterButton = document.getElementById('filterButton');
  const emptyText = document.getElementsByClassName('empty-text')[0];
  const cartCloseButton2 = document.getElementById("cart-close2");

  filterButton.addEventListener('click', showFilter);
  cartCloseButton2.addEventListener('click', hideFilter);

  function showFilter() {
    const cartFilter = document.getElementById('filter-modal');
    cartFilter.style.display = 'block';
  }

  function hideFilter() {
    const cartFilter = document.getElementById('filter-modal');
    cartFilter.style.display = 'none';
  }

  function product_check() {
    let productCounter = 0 ;
    for (i = 0; i < products.length; i++) {
    if (products[i].style.display ==="block"){
            productCounter++;
        };
      };
    if (productCounter === 0 ){
      emptyText.style.display = "block";
    }
    else {
      emptyText.style.display = "none";
    }
  };

  searchbar.addEventListener('input',  search_product)

  function search_product() {
  let input = document.getElementById('search-bar-input').value;
  input = input.toLowerCase();

  for (let i = 0; i < products.length; i++) {
      if (!productsText[i].innerHTML.toLowerCase().includes(input)) {
          products[i].style.display = "none";
      } else {
          products[i].style.display = "block";
      }
    };
    product_check();
  };

  const radioButtons = document.querySelectorAll('input[type="radio"][name="grid-columns"]');
  console.log(radioButtons);
  const radioButtonBig = document.getElementById("radioBig");
  const radioButtonSmall = document.getElementById("radioSmall");

  // Add event listener to each radio button
  radioButtons.forEach(radioButton => {
    radioButton.addEventListener('change', () => {
      if (radioButton.checked) {
        const value = radioButton.value;
        const products = document.querySelectorAll('.product'); // Get all elements with the class 'product'
        products.forEach(product => {
          product.style.width = value; // Set the new width for each 'product' element
        });
      }
    });
  });


  function updateRadioValue() {
    if (
        (window.matchMedia("(min-width: 991px) and (max-width: 1024px)").matches) ||
        (window.matchMedia("(min-width: 720px) and (max-width: 886px)").matches)
    ) {
        radioButtonBig.value = "33.33333333%";
        radioButtonSmall.value = "25%";
    } else if (window.matchMedia("(min-width: 590px) and (max-width: 719px)").matches) {
        radioButtonBig.value = "50%";
        radioButtonSmall.value = "33.33333333%";
    } else {
        console.log("normal");
        radioButtonBig.value = "25%";
        radioButtonSmall.value = "20%";
    }
}

// Call the function initially and whenever the window size changes
updateRadioValue();
window.addEventListener('resize', updateRadioValue);


      // Get all category checkboxes
      const categoryCheckboxes = document.querySelectorAll('.category-checkbox');

      // Add event listeners to the checkboxes
      categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
          updateProductDisplay();
        });
      });

      function updateProductDisplay() {
        // Get the selected categories from the checkboxes
        const selectedCategories = [];
        categoryCheckboxes.forEach(checkbox => {
          if (checkbox.checked) {
            selectedCategories.push(checkbox.dataset.category);
          }
        });

        // If no checkboxes are checked, show all products
        if (selectedCategories.length === 0) {
          products.forEach(product => {
            product.style.display = 'block';
          });
        } else {
          // Hide all products and then show only those that belong to at least one selected category
          products.forEach(product => {
            product.style.display = 'none';
            const productCategories = product.dataset.categories.split(' ');
            if (selectedCategories.some(category => productCategories.includes(category))) {
              product.style.display = 'block';
            }
          });
        }
      }



});
