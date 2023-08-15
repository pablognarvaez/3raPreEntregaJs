const cartItemsElement = document.getElementById("cart-items");
const cartTotalElement = document.getElementById("cart-total");
const notificationElement = document.getElementById("notification");
let cart = [];

const addToCartButtons = document.querySelectorAll(".add-to-cart");
addToCartButtons.forEach(button => {
    button.addEventListener("click", addToCart);
});

document.addEventListener("DOMContentLoaded", () => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDOM();
    }
});

let cartTotal = 0;

function addToCart(event) {
    const productPrice = parseFloat(event.target.getAttribute("data-price"));
    cartTotal += productPrice;
    cartTotalElement.textContent = cartTotal.toFixed(2);

    const productName = event.target.parentElement.querySelector("h3").textContent;
    const cartItem = {
        name: productName,
        price: productPrice
    };
    cart.push(cartItem);

    showNotification("Producto agregado al carrito.");

    updateCartStorage();
    updateCartDOM();
}

function showNotification(message) {
    const notification = document.createElement("div");
    notification.classList.add("alert", "alert-success");
    notification.textContent = message;
    notificationElement.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function updateCartStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartDOM() {
    cartItemsElement.innerHTML = "";
    cart.forEach(item => {
        const cartItem = document.createElement("li");
        cartItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        cartItemsElement.appendChild(cartItem);
    });
}
