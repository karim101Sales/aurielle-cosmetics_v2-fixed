
const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

const products = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'), 'utf-8'));
const config = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'config.json'), 'utf-8'));
const outDir = path.join(__dirname, '..', 'qrcodes');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

(async () => {
  for (const p of products) {
    const url = `${config.baseUrl}/products/${p.id}.html`;
    const file = path.join(outDir, `${p.id}.png`);
    await QRCode.toFile(file, url, { errorCorrectionLevel: 'H', type: 'png', margin: 1, width: 512, color: { dark: '#111117', light: '#ffffff' } });
  }
  console.log('QR codes generated:', products.length);
})();
