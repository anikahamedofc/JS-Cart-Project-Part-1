const allProductsDiv = document.getElementById("all-products");
const cartProductsDiv = document.getElementById("cart-products");
const cartTotalDiv = document.getElementById("cart-total");
let products;
let cartItem = JSON.parse(localStorage.getItem("cartItem")) || [];

// step no 1
//  (1) Display Product Using JSON File
// fetch data
fetch("products.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    products = data;
    for (let i = 0; i < data.length; i++) {
      allProductsDiv.innerHTML += `
      <div class="col-lg-4">
      <div class="single-product">
        <img src="${data[i].image}" alt="" />
        <h5>$<span id="product-price">${data[i].price}</span></h5>
        <h3>${data[i].name}</h3>
        <p>
        ${data[i].text}
        </p>
        <button onclick ="addToCart ('${data[i].id}')">Add To Cart</button>
      </div>
    </div>
      `;
    }
  })

  .catch((err) => {
    console.log(err);
  });

// 03 Display product from local stroge
function displayCart() {
  for (let i = 0; i < cartItem.length; i++) {
    cartProductsDiv.innerHTML += `
        <div class="cart-product" id="id2">
        <img src="${cartItem[i].image}" alt="" />
        <h3>
        ${cartItem[i].name}(Price: $<span id="product-price">${cartItem[i].price})</span>
        </h3>
        <h5>Quantity: ${cartItem[i].quantity}</h5>
        <h5>Sub Total: ${cartItem[i].price}</h5>
        <button class="remove-item">X</button>
        </div>
        `;
  }
}

displayCart();

// 04 part get cart total
function cartTotal() {
  const temp = cartItem.map(function (item) {
    return parseFloat(item.price) * parseFloat(item.quantity);
  });
  // const sum = temp.reduce(function(){},0)
  const sum = temp.reduce(function (prev, next) {
    return prev + next;
  }, 0);
  cartTotalDiv.innerText = sum;
}

cartTotal();

// 02 function

function addToCart(productId) {
  const product = products.find((product) => product.id == productId);
  console.log(product);

  // 01 create product forent end
  const cartProduct = `
  <div class="cart-product" id="id2">
  <img src="${product.image}" alt="" />
  <h3>
  ${product.name}(Price: $<span id="product-price">${product.price})</span>
  </h3>
  <h5>Quantity: 1</h5>
  <h5>Sub Total: ${product.price}</h5>
  <button class="remove-item">X</button>
  </div>
  `;

  cartProductsDiv.innerHTML += cartProduct;

  //   add product in localStorage
  cartItem.push(product);
  product.quantity = 1;
  localStorage.setItem("cartItem", JSON.stringify(cartItem));

  cartTotal();
}
