const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const cookieOptions = require('../utils/cookieOptions');

// POST /api/auth/login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Email et mot de passe requis');
  }

  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    res.status(401);
    throw new Error('Identifiants invalides');
  }

  const token = generateToken(user._id);
  res.cookie('token', token, cookieOptions);

  res.json({
    id: user._id,
    name: user.name,
    email: user.email
  });
});

// POST /api/auth/logout
const logout = asyncHandler(async (req, res) => {
  res.clearCookie('token', { ...cookieOptions, maxAge: 0 });
  res.json({ message: 'Déconnecté' });
});

// GET /api/auth/me
const getMe = asyncHandler(async (req, res) => {
  res.json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email
  });
});

module.exports = { login, logout, getMe };