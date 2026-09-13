const fs = require('fs-extra');
const path = require('path');

const source = path.join(__dirname, '../client/dist');
const target = path.join(__dirname, '../server/public');

if (!fs.existsSync(source)) {
  console.error('❌ client/dist introuvable — lance d\'abord le build du client.');
  process.exit(1);
}

console.log('📂 Copie de client/dist vers server/public...');
fs.emptyDirSync(target);
fs.copySync(source, target);
console.log('✅ Copie terminée.');