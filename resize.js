const sharp = require('sharp');

sharp('assets/images/casas-prefabricadas/telde-gran-canaria-120m2.webp')
  .resize(800, 450)
  .webp({ quality: 82 })
  .toFile('assets/images/casas-prefabricadas/telde-gran-canaria-120m2-800.webp')
  .then(() => console.log('carousel resized'))
  .catch(e => console.error('carousel error:', e));

sharp('assets/images/icono-logo.webp')
  .resize(96, 96)
  .webp({ quality: 90 })
  .toFile('assets/images/icono-logo-small.webp')
  .then(() => console.log('logo resized'))
  .catch(e => console.error('logo error:', e));
