const { isProd } = require('../config/env');

const cookieOptions = {
  httpOnly: true,
  secure: isProd, // true uniquement en production (HTTPS)
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 jours, en cohérence avec JWT_EXPIRES_IN
};

module.exports = cookieOptions;