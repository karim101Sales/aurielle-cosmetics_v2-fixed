
const fs = require('fs');
const path = require('path');

function copyDir(src, dst) {
  if (!fs.existsSync(dst)) fs.mkdirSync(dst, { recursive: true });
  for (const entry of fs.readdirSync(src)) {
    const s = path.join(src, entry);
    const d = path.join(dst, entry);
    const stat = fs.statSync(s);
    if (stat.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

const dist = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(dist)) fs.mkdirSync(dist, { recursive: true });

copyDir(path.join(__dirname, '..', 'public'), dist);
copyDir(path.join(__dirname, '..', 'data'), path.join(dist, 'data'));
copyDir(path.join(__dirname, '..', 'qrcodes'), path.join(dist, 'qrcodes'));
console.log('Static assets copied.');
