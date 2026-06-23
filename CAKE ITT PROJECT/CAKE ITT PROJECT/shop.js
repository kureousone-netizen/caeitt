const vendorCards = document.querySelectorAll(".vendor-card");
const vendorProductsArea = document.getElementById("vendor-products-area");
const selectedVendorTitle = document.getElementById("selected-vendor-title");
const selectedVendorNote = document.getElementById("selected-vendor-note");
const vendorProductGrid = document.getElementById("vendor-product-grid");

const API = "http://127.0.0.1:8000";

vendorCards.forEach((card) => {
  card.addEventListener("click", () => {
    const vendor = card.dataset.vendor;
    showVendorProducts(vendor);
  });
});

async function showVendorProducts(vendor) {
  vendorProductGrid.innerHTML = "<p>Loading products...</p>";
  vendorProductsArea.classList.add("active");
  vendorProductsArea.scrollIntoView({ behavior: "smooth", block: "start" });

  try {
    const response = await fetch(`${API}/products/vendor/${encodeURIComponent(vendor)}`);
    const vendorProducts = await response.json();

    selectedVendorTitle.textContent = `${vendor} Products`;
    selectedVendorNote.textContent =
      "You can only order from one vendor at a time. To switch vendors, please clear your cart first.";

    vendorProductGrid.innerHTML = "";

    if (vendorProducts.length === 0) {
      vendorProductGrid.innerHTML = "<p>No products found for this vendor.</p>";
      return;
    }

    vendorProducts.forEach((product) => {
      // FIX 1: Pull the flat price column directly from your MySQL table database schema
      const actualPrice = Number(product.price || 0);

      const card = document.createElement("a");
      // FIX 2: Corrected matching database key property from .id to .product_id
      card.href = `product.html?id=${product.product_id}`;
      card.className = "shop-card";

      card.innerHTML = `
        <img src="${product.image || 'images/default-cake.jpg'}" alt="${product.name}">
        <div class="shop-card-content">
          <h3>${product.name}</h3>
          <p>${product.category || 'Fresh Pastry'}</p>
          <span class="starting-price">Price: ${formatNaira(actualPrice)}</span>
        </div>
      `;

      vendorProductGrid.appendChild(card);
    });

  } catch (error) {
    console.error("Failed to load products:", error);
    vendorProductGrid.innerHTML = "<p>Could not load products. Make sure the API is running.</p>";
  }
}

// Kept this function safe in case other modules depend on it, but bypassed its calculation for flat pricing
function getStartingPrice(product) {
  const sizePrices = product.sizes?.map((size) => Number(size.price)) || [];
  const extraPrices = product.extras?.map((extra) => Number(extra.price)) || [];

  const lowestSize = sizePrices.length > 0 ? Math.min(...sizePrices) : 0;
  const lowestExtra = extraPrices.length > 0 ? Math.min(...extraPrices) : 0;

  return lowestSize + lowestExtra;
}

function formatNaira(amount) {
  return "₦" + Math.round(Number(amount || 0)).toLocaleString();
}