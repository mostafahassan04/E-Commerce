let products = [];
let cart = [];
let categories = new Set();
fetchProducts();

async function fetchProducts() {
    const spinner = document.querySelector(".spinner-border");
    spinner.classList.remove("d-none");

    try {
        const data = await fetch("https://fakestoreapi.com/products");
        products = await data.json();
        console.log(products);
        loadCategories();
        displayProducts();
    }
    catch (error) {
        console.error('Error fetching products:', error);
    }
    finally {
        spinner.classList.add("d-none");
    }
}

function displayProducts(productsList = products) {
  const productsContainer = document.querySelector("#productList");
  let cartona = "";
  productsList.forEach((product) => {
    cartona += `
            <div class="col-md-4 mb-4">
                <div class="card" title="click to view details">
                    <img src="${product.image}" class="card-img-top" alt="${product.title}">
                    <div class="card-body">
                        <h5 class="card-title" title="${product.title}">${product.title}</h5>
                        <p class="rating">${product.rating.rate} <i class="fa-solid fa-star text-warning"></i> (${product.rating.count})</p>
                        <p class="price">Price: <strong>$${product.price}</strong></p>
                        <p class="category">Category: <span class="badge bg-secondary">${product.category}</span></p>
                        <button class="btn btn-primary viewDetailsButton" onclick="showProductDetails(${product.id})" title="">View Details</button>
                        <button class="btn btn-success addToCartButton" onclick="addToCart(${product.id})" title="">Add to Cart</button>

                    </div>
                </div>
            </div>
        `;
  });
  productsContainer.innerHTML = cartona;
}

function loadCategories() {
    products.forEach(product => {
        categories.add(product.category);
    });
    const categoryList = document.querySelector(".dropdown-menu");
    let categoryHtml =
      '<li><a class="dropdown-item" href="#" data-category="all">All</a></li>';
    categories.forEach(category => {
        categoryHtml += `<li><a class="dropdown-item" href="#" data-category="${category}">${category}</a></li>`;
    });
    categoryList.innerHTML = categoryHtml;
}

document.querySelector(".dropdown-menu").addEventListener("click", function(event) {
    if (event.target.tagName === 'A') {
        const selectedCategory = event.target.getAttribute('data-category');
        const filteredProducts = selectedCategory === 'all' ? products : products.filter(p => p.category === selectedCategory);
        displayProducts(filteredProducts);
    }
});

function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        document.querySelector(".modal-title").textContent = product.title;
        document.querySelector('.modal-body img').src = product.image;
        document.querySelector('.modal-body img').alt = product.title;
        document.querySelector('.modal-body .modal-description').textContent = product.description;
        document.querySelector('.modal-body .modal-rating').textContent = product.rating.rate;
        document.querySelector('.modal-body .modal-rating-count').textContent = product.rating.count;
        document.querySelector('.modal-body .modal-price').textContent = `$${product.price}`;
        document.querySelector('.modal-body .modal-category').textContent = product.category;


        const productDetailsModal = new bootstrap.Modal(document.getElementById('productDetailsModal'));
        productDetailsModal.show();

    } else {
        alert('Product not found!');
    }
}

document.getElementById("logoutButton").addEventListener("click", function() {
    window.location.href = "../auth/auth.html";
});

function addToCart(protId) {
    if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
    }
    let product = {
        userId: 1,
        product: products.find(p => p.id === protId),
    }
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
}

document.querySelector("#cartButton").addEventListener("click", function() {
    window.location.href = "../cart/cart.html";
});
