const { isProd } = require('../config/env');

function notFound(req, res, next) {
  res.status(404);
  next(new Error(`Route non trouvée: ${req.originalUrl}`));
}

function errorHandler(err, req, res, next) {
  let statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  let message = err.message;

  // ObjectId invalide (ex: /api/requests/abc)
  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Identifiant invalide';
  }

  // Contrainte unique violée (ex: email déjà utilisé)
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue)[0];
    message = `La valeur du champ "${field}" est déjà utilisée`;
  }

  res.status(statusCode).json({
    message,
    stack: isProd ? undefined : err.stack
  });
}

module.exports = { notFound, errorHandler };