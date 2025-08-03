document.querySelector("#checkoutButton").addEventListener("click", checkout);
let subtotal = 0;
let promoCodes = ["25", "50", "75"];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function loadCart() {
  const container = document.querySelector("#cartItems");
  let cartona = "";
  for (let i = 0; i < cart.length; i++) {
    cartona += `
            <div class="col-md-4 mb-4">
                <div class="card" title="click to view details">
                    <img src="${cart[i].product.image}" class="card-img-top" alt="${cart[i].product.title}">
                    <div class="card-body">
                        <h5 class="card-title" title="${cart[i].product.title}">${cart[i].product.title}</h5>
                        <p class="price">Price: <strong>$${cart[i].product.price}</strong></p>
                        <button class="btn btn-danger removeFromCartButton" onclick="removeFromCart(${i})" title="">Remove Product</button>
                    </div>
                </div>
            </div>
        `;

    subtotal += cart[i].product.price;

  }
  document.querySelector(
    ".subtotal"
  ).textContent = `Subtotal: $${subtotal.toFixed(2)}`;
  container.innerHTML = cartona;
}

loadCart();

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty");
    return;
  }
  alert("Thank you for your order!");
  saveOrders();
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
  clearInput();
}

function saveOrders() {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push({ id: new Date(), items: cart, userid: cart[0].userId });
  localStorage.setItem("orders", JSON.stringify(orders));
  console.log(JSON.parse(localStorage.getItem("orders")));
}
``;
function applyPromoCode() {
 let value = document.querySelector("#promoCode").value;
  if (promoCodes.includes(value)) {
    subtotal *= (100 - parseInt(value)) / 100;
    document.querySelector(
      ".subtotal"
    ).textContent = `Subtotal: $${subtotal.toFixed(2)}`;
  } else {
    alert("Invalid promo code");
  }
}

function removeFromCart(index) {
  subtotal -= cart[index].product.price;
  document.querySelector(
    ".subtotal"
  ).textContent = `Subtotal: $${subtotal.toFixed(2)}`;
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function clearInput() {
  document.querySelector("#promoCode").value = "";
  subtotal = 0;
  document.querySelector(".subtotal").textContent = `Subtotal: $${subtotal.toFixed(2)}`;
}

document.querySelector("#promoButton").addEventListener("click", applyPromoCode);

// function sendEmail() {
//   emailjs
//     .send("service_oakizmn", "template_ebx0sho", {
//       to_name: "Ziad",
//       from_name: "My Website",
//       message: "Hello there!",
//     })
//     .then(
//       function (response) {
//         console.log("Email sent!", response.status, response.text);
//       },
//       function (error) {
//         console.error("Failed to send email", error);
//       }
//     );
// }
