# ContactHub

Mini système de gestion des demandes de contact pour une entreprise : un formulaire public permet aux visiteurs d'envoyer une demande, et un espace d'administration permet aux employés de la consulter, la traiter et en suivre l'évolution.

## ✨ Fonctionnalités

**Partie publique**
- Formulaire de contact (nom, email, téléphone, catégorie, sujet, message, consentement RGPD)
- Génération automatique d'un numéro de ticket
- Email de confirmation automatique
- Consultation du statut d'une demande via son numéro de ticket

**Partie admin**
- Authentification par session (JWT en cookie httpOnly)
- Dashboard avec compteurs (nouveau / en cours / résolu / total)
- Liste des demandes avec recherche, filtres (statut, catégorie) et pagination
- Détail d'une demande avec historique
- Changement de statut contrôlé (`nouveau → en_cours → resolu → archive`)
- Ajout de notes internes

## 🧱 Stack technique

| Côté | Technologies |
|---|---|
| Frontend | React, Vite, Tailwind CSS, React Router, Axios |
| Backend | Node.js, Express |
| Base de données | MongoDB, Mongoose |
| Authentification | JWT (cookie httpOnly) |
| Validation | Zod |
| Emails | Nodemailer (SMTP) |

## 📁 Structure du projet

contacthub/
├── scripts/
│ └── build.js # build le frontend et le copie dans server/public
├── server/
│ ├── src/
│ │ ├── config/ # env, connexion DB, config SMTP
│ │ ├── models/ # schémas Mongoose
│ │ ├── controllers/
│ │ ├── routes/
│ │ ├── middlewares/ # auth, validation, gestion d'erreurs
│ │ ├── validators/ # schémas Zod
│ │ ├── emails/ # templates d'emails
│ │ ├── scripts/
│ │ │ └── seed.js # création interactive d'un compte employé
│ │ ├── app.js
│ │ └── server.js
│ ├── public/ # build frontend (généré, non versionné)
│ └── .env # non versionné
└── client/
└── src/
├── pages/ # public/ et admin/
├── components/
├── context/ # AuthContext
├── hooks/ # useAuth, useRequests, useRequestDetail, ...
└── services/ # appels API (axios)


## 🚀 Installation

### Prérequis
- Node.js ≥ 18
- Une instance MongoDB (locale ou [MongoDB Atlas](https://www.mongodb.com/atlas))
- Un compte SMTP de test (ex : [Mailtrap](https://mailtrap.io))

### Étapes

1. Cloner le repo et installer les dépendances :
```bash
   git clone https://github.com/<ton-user>/contacthub.git
   cd contacthub
   npm install
   cd server && npm install
   cd ../client && npm install
   cd ..
```

2. Configurer les variables d'environnement :
```bash
   cp server/.env.example server/.env
```

Puis renseigne dans `server/.env` :
```bash
   PORT=5000
   NODE_ENV=development
   MONGO_URI=mongodb://localhost:27017/contacthub
   JWT_SECRET=une_chaine_aleatoire_longue
   JWT_EXPIRES_IN=7d
   SMTP_HOST=...
   SMTP_PORT=...
   SMTP_USER=...
   SMTP_PASS=...
   CLIENT_ORIGIN=http://localhost:5173
```

> Génère un `JWT_SECRET` solide avec : `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`

3. Créer un compte employé (script interactif) :
```bash
   npm run seed
```

## 🧑‍💻 Développement

Backend et frontend tournent séparément en dev (proxy Vite → Express) :

```bash
# Terminal 1 — backend (port 5000)
npm run dev

# Terminal 2 — frontend (port 5173)
cd client && npm run dev
```

Accès :
- Formulaire public : http://localhost:5173
- Admin : http://localhost:5173/admin/login

## 🏗️ Build & production

Build le frontend et le sert directement depuis le backend (un seul serveur, un seul port) :

```bash
npm run build
npm start
```

Accès unique : http://localhost:5000

## 📜 Scripts disponibles (racine)

| Commande | Description |
|---|---|
| `npm run dev` | Lance le backend en mode développement (nodemon) |
| `npm run seed` | Crée un compte employé (interactif) |
| `npm run build` | Build le frontend et le copie dans `server/public` |
| `npm start` | Lance le serveur en mode production |

## 🔒 Sécurité

- Mots de passe hashés avec bcrypt
- Session gérée via JWT stocké dans un cookie `httpOnly` (non accessible en JS côté client)
- Validation stricte des entrées côté serveur (Zod)
- Transitions de statut contrôlées côté serveur (pas de saut d'étape possible)
