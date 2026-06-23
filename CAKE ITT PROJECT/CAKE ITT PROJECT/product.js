const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const API = "http://127.0.0.1:8000";

const productImage = document.getElementById("product-image");
const productName = document.getElementById("product-name");
const productDescription = document.getElementById("product-description");

const flavourBox = document.getElementById("flavour-box");
const flavourSelect = document.getElementById("flavour");

const sizeBox = document.getElementById("size-box");
const sizeSelect = document.getElementById("size");

const extraBox = document.getElementById("extra-box");
const extraSelect = document.getElementById("extra");

const messageBox = document.getElementById("message-box");
const cakeMessage = document.getElementById("cake-message");

const quantityInput = document.getElementById("quantity");
const productForm = document.getElementById("product-options-form");

let product = null;

async function loadProduct() {
  try {
    const response = await fetch(`${API}/products/${productId}`);
    const data = await response.json();

    if (!data || data.message === "Product not found") {
      showNotFound();
      return;
    }

    product = data;
    renderProduct();

  } catch (error) {
    console.error("Failed to load product:", error);
    showNotFound();
  }
}

function showNotFound() {
  const container = document.querySelector(".product-detail-container");
  if (container) {
    container.innerHTML = `
      <div class="product-not-found">
        <h1>Product Not Found</h1>
        <p>This product does not exist or may have been removed.</p>
        <a href="shop.html" class="hero-button">Back to Shop</a>
      </div>
    `;
  }
}

function renderProduct() {
  document.title = `${product.name} | Cake Itt`;

  // Map elements directly to your flat database keys
  productImage.src = product.image || 'images/default-cake.jpg';
  productImage.alt = product.name;
  productName.textContent = product.name;
  productDescription.textContent = product.category || 'Freshly Baked Delicacy';

  // FIX 1: Populate placeholder dropdown mock configurations if your DB schema is flat
  const mockFlavours = product.flavours || ["Vanilla", "Chocolate", "Red Velvet"];
  const mockSizes = product.sizes || [{ name: "Standard Size", price: Number(product.price || 0) }];
  const mockExtras = product.extras || [{ name: "None", price: 0 }, { name: "Extra Frosting", price: 1500 }];

  loadTextOptions(mockFlavours, flavourSelect, flavourBox);
  loadPricedOptions(mockSizes, sizeSelect, sizeBox);
  loadPricedOptions(mockExtras, extraSelect, extraBox);

  // Keep customization boxes explicitly active so calculations evaluate cleanly
  if (flavourBox) flavourBox.style.display = "block";
  if (sizeBox) sizeBox.style.display = "block";
  if (extraBox) extraBox.style.display = "block";
  if (messageBox) messageBox.style.display = "block";

  const priceDisplay = document.createElement("p");
  priceDisplay.className = "product-price-display";
  const addBtn = productForm.querySelector(".product-add-btn");
  if (addBtn) {
    productForm.insertBefore(priceDisplay, addBtn);
  }

  updatePrice();

  sizeSelect?.addEventListener("change", updatePrice);
  extraSelect?.addEventListener("change", updatePrice);
  quantityInput?.addEventListener("input", updatePrice);

  productForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const sizePrice = getSelectedPrice(sizeSelect);
    const extraPrice = getSelectedPrice(extraSelect);
    const quantity = Number(quantityInput.value) || 1;

    const unitPrice = sizePrice + extraPrice;
    const totalPrice = unitPrice * quantity;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // FIX 2: Check active cart states using your structural database identifier: vendor_id
    const currentVendorId = product.vendor_id || 1;
    const existingVendorId = cart.length > 0 ? cart[0].vendor_id : null;

    if (existingVendorId && Number(existingVendorId) !== Number(currentVendorId)) {
      const warningMessage = `You already have items from Vendor ${existingVendorId}. Please clear your cart before changing bakeries.`;
      if (typeof showToast === "function") {
        showToast(warningMessage);
      } else {
        alert(warningMessage);
      }
      return;
    }

    // FIX 3: Structure the outbound cart package object keys to align exactly with your script.js template
    const selectedProduct = {
      product_id: product.product_id, // Match structural primary key
      name: product.name,
      vendor_id: currentVendorId,     // Avoid undefined tracks
      category: product.category || "Cakes",
      image: product.image || 'images/default-cake.jpg',
      flavour: flavourSelect.value || "Vanilla",
      size: sizeSelect.options[sizeSelect.selectedIndex]?.dataset.name || "Standard Size",
      extra: extraSelect.options[extraSelect.selectedIndex]?.dataset.name || "None",
      message: cakeMessage ? cakeMessage.value : "",
      quantity: quantity,
      price: unitPrice,               // Keeps internal item pricing logic uniform
      totalPrice: totalPrice
    };

    cart.push(selectedProduct);
    localStorage.setItem("cart", JSON.stringify(cart));

    if (typeof updateCartCount === "function") updateCartCount();
    if (typeof renderCart === "function") renderCart();

    const cartPanel = document.getElementById("cart-panel");
    if (cartPanel) {
      cartPanel.classList.add("active");
    }

    const addButton = document.querySelector(".product-add-btn");
    if (addButton) {
      addButton.textContent = "Added to Cart ✓";
      setTimeout(() => {
        addButton.textContent = "Add to Cart";
      }, 1500);
    }
  });

  function updatePrice() {
    const sizePrice = getSelectedPrice(sizeSelect);
    const extraPrice = getSelectedPrice(extraSelect);
    const quantity = Number(quantityInput.value) || 1;

    const unitPrice = sizePrice + extraPrice;
    const totalPrice = unitPrice * quantity;

    // FIX 4: Bind displaying labels explicitly to your product.vendor_id column structure
    priceDisplay.innerHTML = `
      <strong>Vendor ID:</strong> ${product.vendor_id || 1}<br>
      <strong>Price:</strong> ${formatNaira(unitPrice)} each<br>
      <strong>Total:</strong> ${formatNaira(totalPrice)}
    `;
  }
}

loadProduct();

function loadTextOptions(options, selectElement, boxElement) {
  if (!options || options.length === 0 || !selectElement) {
    if (boxElement) boxElement.style.display = "none";
    return;
  }
  selectElement.innerHTML = "";
  options.forEach(option => {
    const optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.textContent = option;
    selectElement.appendChild(optionElement);
  });
}

function loadPricedOptions(options, selectElement, boxElement) {
  if (!options || options.length === 0 || !selectElement) {
    if (boxElement) boxElement.style.display = "none";
    return;
  }
  selectElement.innerHTML = "";
  options.forEach(option => {
    const optionElement = document.createElement("option");
    optionElement.value = option.price;
    optionElement.dataset.name = option.name;
    optionElement.textContent =
      option.price > 0
        ? `${option.name} - ${formatNaira(option.price)}`
        : option.name;
    selectElement.appendChild(optionElement);
  });
}

function getSelectedPrice(selectElement) {
  if (!selectElement || !selectElement.value) return 0;
  return Number(selectElement.value) || 0;
}

function formatNaira(amount) {
  return "₦" + Math.round(Number(amount || 0)).toLocaleString();
}