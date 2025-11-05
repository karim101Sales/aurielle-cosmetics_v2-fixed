
const fs = require('fs');
const path = require('path');

const products = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'), 'utf-8'));
const tpl = fs.readFileSync(path.join(__dirname, '..', 'templates', 'product.html'), 'utf-8');

const outDir = path.join(__dirname, '..', 'dist', 'products');
fs.mkdirSync(outDir, { recursive: true });

function renderProduct(p) {
  function li(items) { return items.map(i => `<li>${i}</li>`).join(''); }
  const related = products.filter(r => r.id !== p.id).slice(0,3).map(r => `
    <a href="/products/${r.id}.html" class="card overflow-hidden">
      <figure class="aspect-[4/5] overflow-hidden product-figure">
        <img src="/${r.image_url}" alt="${r.name.en}" class="w-full h-full object-cover" />
      </figure>
      <div class="p-4 text-center">
        <h3 class="text-lg mb-1">${r.name.en}</h3>
        <p class="text-pearl/70 text-sm">${r.description.en}</p>
      </div>
    </a>
  `).join('');

  return tpl
    .replaceAll('{{name_en}}', p.name.en)
    .replaceAll('{{full_desc_en}}', p.full_desc.en)
    .replaceAll('{{ingredients_en_li}}', li(p.ingredients.en))
    .replaceAll('{{benefits_en_li}}', li(p.benefits.en))
    .replaceAll('{{image_url}}', p.image_url)
    .replaceAll('{{id}}', p.id)
    .replaceAll('{{related_cards}}', related);
}

for (const p of products) {
  const html = renderProduct(p);
  fs.writeFileSync(path.join(outDir, `${p.id}.html`), html, 'utf-8');
}

// Copy index/about/contact and assets are handled by copy-static.js
console.log('Product pages generated:', products.length);
