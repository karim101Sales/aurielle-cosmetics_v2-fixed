
(async function () {
  let products = null;
  const pathParts = location.pathname.split("/");
  const file = pathParts[pathParts.length - 1].replace(".html", "");
  async function loadProducts(){
    if(!products) products = await (await fetch("data/products.json")).json();
    return products;
  }
  async function render(lang){
    const products = await loadProducts();
    const prod = products.find(p => p.id === file);
    if (!prod) return;
  const tAll = await (await fetch("data/translations.json")).json();
    const t = tAll[lang] || tAll.en;
    // Name / desc
    const pName = document.getElementById('pName');
    const pDesc = document.getElementById('pDesc');
    const pIngredients = document.getElementById('pIngredients');
    const pBenefits = document.getElementById('pBenefits');
    const pPrice = document.getElementById('pPrice');
    const pImage = document.getElementById('pImage');
    const pQr = document.getElementById('pQr');

    if(pName) pName.textContent = prod.name[lang];
    if(pDesc) pDesc.textContent = prod.full_desc[lang];
    if(pIngredients) pIngredients.innerHTML = prod.ingredients[lang].map(i => `<li>${i}</li>`).join("");
    if(pBenefits) pBenefits.innerHTML = prod.benefits[lang].map(i => `<li>${i}</li>`).join("");
    
    // Handle related products translations
    const relatedSection = document.querySelector('section:has(h2[data-i18n="related"])');
    if (relatedSection) {
      const relatedCards = relatedSection.querySelectorAll('.card');
      relatedCards.forEach(card => {
        const titleEl = card.querySelector('h3');
        const descEl = card.querySelector('p');
        const productId = card.getAttribute('href')?.split('/')?.pop()?.replace('.html', '');
        if (productId) {
          const relatedProduct = products.find(p => p.id === productId);
          if (relatedProduct) {
            if (titleEl) titleEl.textContent = relatedProduct.name[lang];
            if (descEl) descEl.textContent = relatedProduct.description[lang];
          }
        }
      });
    }

    if(pName) pName.textContent = prod.name[lang];
    if(pDesc) pDesc.textContent = prod.full_desc[lang];
    if(pIngredients) pIngredients.innerHTML = prod.ingredients[lang].map(i => `<li>${i}</li>`).join("");
    if(pBenefits) pBenefits.innerHTML = prod.benefits[lang].map(i => `<li>${i}</li>`).join("");
    if(pPrice) pPrice.textContent = `$${prod.price.toFixed(2)}`;
    // set image - use relative path so works in various hosting setups
  if(pImage) pImage.setAttribute('src', prod.image_url);
  if(pQr) pQr.setAttribute('src', `qrcodes/${prod.id}.png`);

    // Meta title
    document.title = `${prod.name[lang]} ${t.product_meta_suffix}`;

    // Share
    const shareBtn = document.getElementById("shareBtn");
    if(shareBtn) {
      try { shareBtn.removeEventListener?.('click'); } catch(e){}
      shareBtn.replaceWith(shareBtn.cloneNode(true)); // remove previous listeners
      const newShare = document.getElementById("shareBtn");
      newShare?.addEventListener("click", async (e) => {
        e.preventDefault();
        try {
          await navigator.share({ title: prod.name[lang], url: location.href });
        } catch {}
      });
    }
  }

  // initial render
  const initialLang = localStorage.getItem("lang") || "en";
  await render(initialLang);

  // listen for language changes
  document.addEventListener('aurielle:languageChanged', (e) => {
    const lang = e?.detail?.lang || localStorage.getItem("lang") || "en";
    render(lang);
  });

})();
