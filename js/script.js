const container = document.getElementById("product-container");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayProducts(productList) {
    container.innerHTML = "";

    productList.forEach(product => {
        container.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" width="180">
                <h3>${product.name}</h3>
                <p>Category: ${product.category}</p>
                <p>₹${product.price}</p>
                <p>⭐ ${product.rating}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
    });
}
function addToCart(id) {

    let selectedProduct = products.find(product => product.id === id);

    cart.push(selectedProduct);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product added to cart!");
}

if (container) {
    displayProducts(products);
}

function applyFilters() {

    let categoryValue = document.getElementById("categoryFilter").value;
    let priceValue = document.getElementById("priceFilter").value;
    let sortValue = document.getElementById("sortOption").value;

    let filteredProducts = products.filter(product => {

        let categoryMatch =
            categoryValue === "All" || product.category === categoryValue;

        let priceMatch =
            priceValue === "All" || product.price <= parseInt(priceValue);

        return categoryMatch && priceMatch;
    });

    // Sorting
    if (sortValue === "lowToHigh") {
        filteredProducts.sort((a, b) => a.price - b.price);
    }

    if (sortValue === "highToLow") {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    if (sortValue === "ratingHigh") {
        filteredProducts.sort((a, b) => b.rating - a.rating);
    }

    // If no products found
    if (filteredProducts.length === 0) {
        container.innerHTML = "<h2 style='text-align:center;'>No Products Found</h2>";
    } else {
        displayProducts(filteredProducts);
    }
}
if (container) {

    displayProducts(products);

    document.getElementById("categoryFilter").addEventListener("change", applyFilters);
    document.getElementById("priceFilter").addEventListener("change", applyFilters);
    document.getElementById("sortOption").addEventListener("change", applyFilters);
}

const cartContainer = document.getElementById("cart-container");
const totalPriceElement = document.getElementById("total-price");

function displayCart() {

    if (!cartContainer) return;

    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = "<h2 style='text-align:center;'>Your cart is empty</h2>";
        totalPriceElement.innerHTML = "";
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {

        total += item.price;

        cartContainer.innerHTML += `
            <div class="product-card">
                <img src="${item.image}" width="150">
                <h3>${item.name}</h3>
                <p>₹${item.price}</p>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    });

    totalPriceElement.innerHTML = "Total: ₹" + total;
}

function removeFromCart(index) {

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
}

displayCart();

function placeOrder() {

    let name = document.getElementById("name");
    let address = document.getElementById("address");
    let phone = document.getElementById("phone");
    let message = document.getElementById("order-message");

    if (!name || !address || !phone) return;

    if (name.value === "" || address.value === "" || phone.value === "") {
        message.innerHTML = "Please fill all fields!";
        message.style.color = "red";
        return;
    }

    if (cart.length === 0) {
        message.innerHTML = "Your cart is empty!";
        message.style.color = "red";
        return;
    }

    message.innerHTML = "Order placed successfully! 🎉";
    message.style.color = "green";

    localStorage.removeItem("cart");
    cart = [];

    setTimeout(() => {
        window.location.href = "products.html";
    }, 2000);
}
