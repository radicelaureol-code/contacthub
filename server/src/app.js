const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { nodeEnv } = require('./config/env');
const morgan = require('morgan');
const path = require('path');

const { clientOrigin } = require('./config/env');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

const app = express();

// Middlewares globaux
app.use(cors({ origin: clientOrigin, credentials: true }));
app.use(express.json());
app.use(cookieParser());

if (nodeEnv === 'development') {
  app.use(morgan('dev'));
}

// Routes API (ajoutées au fur et à mesure des prochaines étapes)
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/requests', require('./routes/adminRoutes'));

// Healthcheck simple, utile pour vérifier que le serveur tourne
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Servir le frontend buildé — TOUJOURS après les routes /api/*
app.use(express.static(path.join(__dirname, '../public')));
app.get('*', (req, res, next) => {
  // Si la requête cible /api/*, on laisse passer au 404 JSON plutôt que de servir index.html
  if (req.originalUrl.startsWith('/api/')) return next();
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;