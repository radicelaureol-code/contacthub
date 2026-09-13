const readline = require('readline');

require('../config/env'); // valide les variables d'env au passage
const connectDB = require('../config/db');
const mongoose = require('mongoose');
const User = require('../models/User');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (question) => new Promise((resolve) => rl.question(question, resolve));

async function seed() {
  await connectDB();
  console.log('');

  const name = (await ask('Nom complet : ')).trim();
  const email = (await ask('Email : ')).trim().toLowerCase();
  const password = await ask('Mot de passe : ');

  if (!name || !email || !password) {
    console.log('\n❌ Tous les champs sont requis.');
    rl.close();
    await mongoose.disconnect();
    process.exit(1);
  }

  const existing = await User.findOne({ email });
  if (existing) {
    console.log(`\n❌ Un utilisateur avec l'email "${email}" existe déjà.`);
  } else {
    await User.create({ name, email, password });
    console.log(`\n✅ Utilisateur "${name}" créé avec succès (${email}).`);
  }

  rl.close();
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error('\n❌ Erreur lors du seed:', err.message);
  process.exit(1);
});