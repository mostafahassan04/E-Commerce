document.addEventListener('DOMContentLoaded', function() {
  

  checkAdminStatus();
  
 
  loadData();
  
 
  setupEventListeners();
});


function checkAdminStatus() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
  if (!currentUser || !currentUser.isAdmin) {
    alert('Only admins can access this page. Redirecting to login...');
    window.location.href = 'auth.html';
  }
}


function loadData() {
  
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const products = JSON.parse(localStorage.getItem('products')) || [];
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  

  updateStats(users, products, orders);
  

  loadUserTable(users);
  

  loadOrderTable(orders);
}


function updateStats(users, products, orders) {
  document.getElementById('total-users').textContent = users.length;
  document.getElementById('total-products').textContent = products.length;
  document.getElementById('total-orders').textContent = orders.length;
  
  
  let totalRevenue = 0;
  orders.forEach(order => {
    totalRevenue += order.total || 0;
  });
  
  document.getElementById('total-revenue').textContent = '$' + totalRevenue.toFixed(2);
}


function loadUserTable(users) {
  const tableBody = document.querySelector('#users-table tbody');
  tableBody.innerHTML = '';
  
  users.forEach(user => {
    const row = document.createElement('tr');
    
    row.innerHTML = `
      <td>${user.username}</td>
      <td>${user.email}</td>
      <td>${user.isAdmin ? 'Yes' : 'No'}</td>
      <td>
        <button class="btn btn-delete" onclick="deleteUser('${user.email}')">Delete</button>
        ${!user.isAdmin ? `<button class="btn btn-edit" onclick="makeAdmin('${user.email}')">Make Admin</button>` : ''}
      </td>
    `;
    
    tableBody.appendChild(row);
  });
}
function loadOrderTable(orders) {
  const tableBody = document.querySelector('#orders-table tbody');
  tableBody.innerHTML = '';
  
  orders.forEach(order => {
    const row = document.createElement('tr');
    
    row.innerHTML = `
      <td>#${order.id}</td>
      <td>${order.username || 'Guest'}</td>
      <td>$${order.total?.toFixed(2) || '0.00'}</td>
      <td>
        <button class="btn btn-view" onclick="viewOrder('${order.id}')">View</button>
        <button class="btn btn-delete" onclick="deleteOrder('${order.id}')">Delete</button>
      </td>
    `;
    
    tableBody.appendChild(row);
  });
}


function setupEventListeners() {

  const tabButtons = document.querySelectorAll('.nav-btn');
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      
      tabButtons.forEach(btn => btn.classList.remove('active'));
      
     
      this.classList.add('active');
      
      
      const tabId = this.getAttribute('data-tab');
      document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
      });
      document.getElementById(tabId).classList.add('active');
      
      
      const titles = {
        'stats': 'Dashboard Statistics',
        'users': 'User Management',
        'orders': 'Order Management'
      };
      document.getElementById('page-title').textContent = titles[tabId];
    });
  });
  
  
  document.getElementById('logoutBtn').addEventListener('click', logout);
  
 
  document.querySelector('.close-modal').addEventListener('click', () => {
    document.getElementById('orderModal').style.display = 'none';
  });
}


function deleteUser(email) {
  if (confirm('Are you sure you want to delete this user?')) {
    let users = JSON.parse(localStorage.getItem('users'));
    users = users.filter(user => user.email !== email);
    localStorage.setItem('users', JSON.stringify(users));
    loadData(); 
  }
}

function makeAdmin(email) {
  let users = JSON.parse(localStorage.getItem('users'));
  const user = users.find(user => user.email === email);
  
  if (user) {
    user.isAdmin = true;
    localStorage.setItem('users', JSON.stringify(users));
    loadData(); 
    alert(`${user.username} is now an admin`);
  }
}


function deleteOrder(orderId) {
  if (confirm('Are you sure you want to delete this order?')) {
    let orders = JSON.parse(localStorage.getItem('orders'));
    orders = orders.filter(order => order.id !== orderId);
    localStorage.setItem('orders', JSON.stringify(orders));
    loadData(); 
  }
}

function viewOrder(orderId) {
  const orders = JSON.parse(localStorage.getItem('orders'));
  const order = orders.find(order => order.id === orderId);
  
  if (order) {

    let itemsHTML = '<h3>Items:</h3><ul>';
    order.items.forEach(item => {
      itemsHTML += `<li>${item.quantity}x ${item.title} - $${item.price.toFixed(2)}</li>`;
    });
    itemsHTML += '</ul>';
    
   
    document.getElementById('modal-title').textContent = `Order #${order.id}`;
    document.getElementById('modal-body').innerHTML = `
      <p><strong>Customer:</strong> ${order.username || 'Guest'}</p>
      <p><strong>Date:</strong> ${new Date(order.date).toLocaleString()}</p>
      ${itemsHTML}
      <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
    `;
    

    document.getElementById('orderModal').style.display = 'block';
  }
}

function logout() {
  localStorage.removeItem('currentUser');
  window.location.href = 'auth.html';
}


window.deleteUser = deleteUser;
window.makeAdmin = makeAdmin;
window.deleteOrder = deleteOrder;
window.viewOrder = viewOrder;