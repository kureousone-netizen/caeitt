const cartToggle = document.getElementById("cart-toggle");
const cartPanel = document.getElementById("cart-panel");
const closeCart = document.getElementById("close-cart");
const clearCart = document.getElementById("clear-cart");
const checkout = document.getElementById("checkout");
const cartItemsList = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");

const VAT_RATE = 0.0243;
const BASE_DELIVERY_FEE = 1000;
const DELIVERY_INCREMENT = 500;
const DELIVERY_INCREMENT_THRESHOLD = 100000;

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function formatNaira(amount) {
  return "₦" + Math.round(Number(amount || 0)).toLocaleString();
}

function calculateDeliveryFee(subtotal) {
  const increments = Math.floor(subtotal / DELIVERY_INCREMENT_THRESHOLD);
  return BASE_DELIVERY_FEE + (increments * DELIVERY_INCREMENT);
}

function calculateCartTotals(cart) {
  const subtotal = cart.reduce((sum, item) => {
    // Explicitly calculate price multiplied by quantity for the absolute true subtotal
    const price = Number(item.price || item.totalPrice || 0);
    const qty = Number(item.quantity || 1);
    return sum + (price * qty);
  }, 0);

  const vatAmount = subtotal * VAT_RATE;
  const deliveryFee = calculateDeliveryFee(subtotal);
  const finalTotal = subtotal + vatAmount + deliveryFee;

  return {
    subtotal,
    vatAmount,
    deliveryFee,
    finalTotal
  };
}

function updateCartCount() {
  const cart = getCart();

  const totalQuantity = cart.reduce((sum, item) => {
    return sum + Number(item.quantity || 1);
  }, 0);

  if (cartCount) {
    cartCount.textContent = totalQuantity;
  }
}

function renderCart() {
  const cart = getCart();

  if (!cartItemsList) return;

  // 1. CRITICAL: Clear the old HTML out so items don't duplicate on screen refresh
  cartItemsList.innerHTML = "";

  // 2. Handle the Empty State layout gracefully
  if (cart.length === 0) {
    cartItemsList.innerHTML = `
      <li class="empty-cart-state">
        <strong>Your cart is empty.</strong><br>
        <span>Let’s add some sweet treats to your cart 😋</span>
      </li>
    `;
    updateCartCount();
    return;
  }

  // 3. Your updated item mapping loop (Working perfectly!)
  cart.forEach((item, index) => {
    const itemPrice = Number(item.price || item.totalPrice || 0);
    const quantity = Number(item.quantity || 1);
    const itemTotal = itemPrice * quantity;

    const li = document.createElement("li");
    li.innerHTML = `
      <div class="cart-item-info">
        <strong>${item.name}</strong><br>
        <small>
          Vendor ID: ${item.vendor_id || 1}<br>
          ${item.category ? `Category: ${item.category}<br>` : ""}
          Quantity: ${quantity}<br>
          Price: ${formatNaira(itemPrice)} each<br>
          <strong>Total: ${formatNaira(itemTotal)}</strong>
        </small>
      </div>
      <button class="remove-cart-item" data-index="${index}">Remove</button>
    `;
    cartItemsList.appendChild(li);
  });

  // 4. CRITICAL: Compute and display the global invoice totals block
  const totals = calculateCartTotals(cart);

  const totalLine = document.createElement("li");
  totalLine.className = "cart-total";
  totalLine.innerHTML = `
    <div>
      <strong>Subtotal:</strong> ${formatNaira(totals.subtotal)}<br>
      <strong>VAT (2.43%):</strong> ${formatNaira(totals.vatAmount)}<br>
      <strong>Delivery Fee:</strong> ${formatNaira(totals.deliveryFee)}<br>
      <hr style="border: 0; border-top: 1px dashed #ccc; margin: 5px 0;">
      <strong>Total Balance:</strong> ${formatNaira(totals.finalTotal)}
    </div>
  `;
  cartItemsList.appendChild(totalLine);

  const noteLine = document.createElement("li");
  noteLine.className = "cart-note";
  noteLine.innerHTML = "<small style='color:#666;'>You can review your order before payment.</small>";
  cartItemsList.appendChild(noteLine);

  // 5. Re-bind click event listeners to the new "Remove" buttons so they work
  document.querySelectorAll(".remove-cart-item").forEach((button) => {
    button.addEventListener("click", function () {
      const index = Number(this.dataset.index);
      const currentCart = getCart();

      currentCart.splice(index, 1);
      saveCart(currentCart);
      renderCart();
      updateCartCount();
    });
  });

  updateCartCount();
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 4200);
}

const toastMessage = sessionStorage.getItem("toastMessage");

if (toastMessage) {
  showToast(toastMessage);
  sessionStorage.removeItem("toastMessage");
}

const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 80) {
      element.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// Smoothly scroll to top on refresh/load for landing and shop pages
window.addEventListener("load", () => {
  if (window.location.hash) return;

  const page = window.location.pathname.split("/").pop();

  const shouldScrollToTop =
    page === "" ||
    page === "index.html" ||
    page === "shop.html";

  if (shouldScrollToTop) {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }, 300);
  }
});