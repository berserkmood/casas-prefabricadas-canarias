const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dirs = [
  'assets/images/hero-islas',
  'assets/images/hero-guias',
  'assets/images/hero-tramites',
];

async function run() {
  for (const dir of dirs) {
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.webp') && !f.endsWith('-opt.webp'));
    for (const file of files) {
      const src = path.join(dir, file);
      const out = path.join(dir, file.replace('.webp', '-opt.webp'));
      const before = fs.statSync(src).size;
      await sharp(src)
        .resize(1200, 630, { fit: 'cover', position: 'center' })
        .webp({ quality: 72, effort: 6 })
        .toFile(out);
      const after = fs.statSync(out).size;
      const saved = Math.round((before - after) / 1024);
      console.log(`${file}: ${Math.round(before/1024)}KB -> ${Math.round(after/1024)}KB (${saved > 0 ? '-' : '+'}${Math.abs(saved)}KB)`);
    }
  }
}
run().catch(console.error);
