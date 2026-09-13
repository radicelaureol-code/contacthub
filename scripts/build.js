const { execSync } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

const clientDir = path.join(__dirname, '../client');
const buildDir = path.join(clientDir, 'dist'); // Vite génère "dist", pas "build"
const targetDir = path.join(__dirname, '../server/public');

console.log('📦 Build du frontend (Vite)...');
execSync('npm run build', { cwd: clientDir, stdio: 'inherit' });

console.log('📂 Copie vers server/public...');
fs.emptyDirSync(targetDir);
fs.copySync(buildDir, targetDir);

console.log('✅ Terminé.');