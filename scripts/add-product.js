
/**
 * Add a product via CLI args
 * Usage:
 *   node scripts/add-product.js --id your-id --enName "English Name" --arName "الاسم العربي" --image "images/your.webp"
 */
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const get = (flag) => {
  const i = args.indexOf(flag);
  return i >= 0 ? args[i+1] : null;
};

const id = get('--id');
const enName = get('--enName');
const arName = get('--arName');
const image = get('--image') || 'images/placeholder.webp';

if (!id || !enName || !arName) {
  console.error('Missing required args. Example:');
  console.error('node scripts/add-product.js --id luxury-lipstick --enName "Luxury Lipstick" --arName "أحمر شفاه فاخر" --image "images/lip.webp"');
  process.exit(1);
}

const productsPath = path.join(__dirname, '..', 'data', 'products.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));

if (products.find(p => p.id === id)) {
  console.error('A product with this id already exists.');
  process.exit(1);
}

const product = {
  id,
  name: { en: enName, ar: arName },
  price: 0,
  description: { en: "Short description...", ar: "وصف مختصر..." },
  full_desc: { en: "Full English description...", ar: "الوصف العربي الكامل..." },
  ingredients: { en: ["Item1","Item2"], ar: ["عنصر1","عنصر2"] },
  benefits: { en: ["Benefit1","Benefit2"], ar: ["فائدة1","فائدة2"] },
  image_url: image
};

products.push(product);
fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));

console.log('Product added. Run: npm run build');
