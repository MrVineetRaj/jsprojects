/**
 * Write your challenge solution here
 */
const products = [
  {
    image: "../src/assets/change-the-color.png",
    price: "5",
    name: "Change The Color",
  },
  {
    image: "../src/assets/tic-tac-toe.png",
    price: "9",
    name: "Tic Tac Toe",
  },
  {
    image: "../src/assets/image-carousel.png",
    price: "6",
    name: "Image Carousel",
  },
  {
    image: "../src/assets/task-manager.png",
    price: "8",
    name: "Task Manager",
  },
];

let cartItems = [
  {
    image: "../src/assets/change-the-color.png",
    price: "5",
    name: "Change The Color",
    quantity: 5,
  },
  {
    image: "../src/assets/tic-tac-toe.png",
    price: "9",
    name: "Tic Tac Toe",
    quantity: 2,
  },
];

let totalCartValue = 0;

const productsContainer = document.querySelector(".products-container");
const cartContainer = document.querySelector(".cart-items-list");

function loadProducts() {
  productsContainer.innerHTML = "";
  products.forEach((product, index) => {
    const newProductItem = document.createElement("div");
    newProductItem.classList.add("product");

    newProductItem.innerHTML = `
                              <img
                                src="${product.image}"
                                alt="${product.name}"
                                class="product-image"
                              />
                              
                              <span>
                                <p>${product.name}</p>
                                <button class="add-to-cart-btn">Add to Cart</button>
                              </span>
                              <p class="price">${product.price} $</p>
                              `;

    productsContainer.appendChild(newProductItem);
  });

  document
    .querySelectorAll(".add-to-cart-btn")
    .forEach((addToCartBtn, index) => {
      addToCartBtn.addEventListener("click", () => {
        let hasProductInCart = cartItems.some(
          (item) => products[index].name === item.name
        );

        if (!hasProductInCart) {
          cartItems.push({
            ...products[index],
            quantity: 1,
          });
          loadCarTItem();
          return;
        }

        cartItems.forEach((item) => {
          if (item.name === products[index].name) {
            item.quantity++;
          }
        });
        loadCarTItem();
      });
    });
}

function loadCarTItem() {
  cartContainer.innerHTML = "";
  totalCartValue = 0;
  cartItems.forEach((item, index) => {
    let newCartItemContainer = document.createElement("div");
    newCartItemContainer.classList.add("cart-item-container");

    newCartItemContainer.innerHTML = `
                                      <div class="left">
                                        <img src="${item.image}" alt="" />
                                        <p>${item.name}</p>
                                      </div>

                                      <div class="right">
                                        <span class="cart-item-quantity-controls">
                                          <button class="decrease-quantity">-</button>
                                          <span class="product-quantity">${
                                            item.quantity
                                          }</span>
                                          <button class="increase-quantity">+</button>
                                          <span>X</span>
                                        </span>
                                        <span class="cart-item-quantity-price">${
                                          item.price
                                        } $ = ${
      item.quantity * item.price
    } $</span>
                                      </div>
                                      `;

    totalCartValue += item.price * item.quantity;
    cartContainer.appendChild(newCartItemContainer);
  });

  document
    .querySelectorAll(".increase-quantity")
    .forEach((increaseBtn, index) => {
      increaseBtn.addEventListener("click", () => {
        cartItems[index].quantity++;
        loadCarTItem();
      });
    });
  document
    .querySelectorAll(".decrease-quantity")
    .forEach((decreaseBtn, index) => {
      decreaseBtn.addEventListener("click", () => {
        console.log(cartItems[index]);
        if (cartItems[index].quantity === 1) {
          cartItems = cartItems.filter((item) => {
            return cartItems[index].name !== item.name;
          });
          loadCarTItem();
          return;
        }
        cartItems[index].quantity--;
        loadCarTItem();
      });
    });

  document.getElementById(
    "total-price"
  ).innerText = `${totalCartValue} $/- only`;
}
loadCarTItem();
loadProducts();
