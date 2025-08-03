let orders = JSON.parse(localStorage.getItem("orders"));  
console.log(orders);
let userId = 1;
let userOrders = orders.filter(order => order.userid === userId);
console.log(userOrders);
let container = document.querySelector("#orderList");

loadOrders();

function loadOrders() {
    container.innerHTML = ""; // Clear existing content
    for (let i = 0; i < userOrders.length; i++) {
        let order = userOrders[i];
        let total = order.items.reduce(
          (acc, item) => acc + parseFloat(item.product.price),
          0
        );
        let orderCard = document.createElement("div");
        orderCard.className = "card mb-3";
        orderCard.innerHTML = `
            <div class="card-body">
                <h5 class="card-title mb-4">Order #${i + 1}</h5>
                <p class="card-text">Order Date: ${new Date(order.id).toLocaleDateString()}</p>
                <p class="card-text">Items: ${order.items.length}</p>
                <p class="card-text">Total Price: $${total.toFixed(2)}</p>
                <p class="card-text">Status: shipping</p>
            </div>
        `;
        container.appendChild(orderCard);
    };
}