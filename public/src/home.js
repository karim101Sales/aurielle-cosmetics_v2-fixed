
(async function () {
  let products = null;
  
  async function loadProducts() {
    if (!products) {
      products = await (await fetch("data/products.json")).json();
    }
    return products;
  }

  async function renderProducts(lang) {
    const products = await loadProducts();
    const grid = document.getElementById("productGrid");
    if (!grid) return;
    
    grid.innerHTML = products.map(p => `
      <a href="products/${p.id}.html" class="card group overflow-hidden focus:outline-none focus:ring-2 focus:ring-accent/50 shine">
        <figure class="aspect-[4/5] overflow-hidden product-figure">
          <img src="${p.image_url}" alt="${p.name[lang]}" class="w-full h-full object-cover"/>
        </figure>
        <div class="p-4 text-center">
          <h3 class="text-lg mb-1">${p.name[lang]}</h3>
          <p class="text-pearl/70 text-sm">${p.description[lang]}</p>
        </div>
      </a>
    `).join("");
  }

  // Initial render
  const initialLang = localStorage.getItem("lang") || "en";
  await renderProducts(initialLang);

  // Listen for language changes
  document.addEventListener('aurielle:languageChanged', async (e) => {
    const lang = e?.detail?.lang || localStorage.getItem("lang") || "en";
    await renderProducts(lang);
  });
})();
