const asyncHandler = require('../utils/asyncHandler');
const ContactRequest = require('../models/ContactRequest');
const generateTicketNumber = require('../utils/generateTicketNumber');
const { sendConfirmationEmail } = require('../config/mailer');

const CATEGORIES = ['commercial', 'support', 'partenariat', 'information', 'autre'];

// POST /api/contact
const createContactRequest = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    subject,
    category,
    message,
    consentGiven
  } = req.body;

  const ticketNumber = await generateTicketNumber();

  const request = await ContactRequest.create({
    ticketNumber,
    firstName,
    lastName,
    email,
    phone,
    subject,
    category,
    message,
    consentGiven,
    ipAddress: req.ip
  });

  // Envoi de l'email en tâche asynchrone — n'empêche pas la réponse HTTP
  // d'être renvoyée immédiatement si le SMTP est lent ou échoue
  sendConfirmationEmail(request).catch((err) => {
    console.error('Échec envoi email de confirmation:', err.message);
  });

  res.status(201).json({
    ticketNumber: request.ticketNumber,
    message: 'Votre demande a bien été envoyée'
  });
});

// GET /api/contact/status/:ticketNumber
const getStatusByTicket = asyncHandler(async (req, res) => {
  const request = await ContactRequest.findOne({
    ticketNumber: req.params.ticketNumber
  }).select('ticketNumber status category subject createdAt');

  if (!request) {
    res.status(404);
    throw new Error('Ticket introuvable');
  }

  res.json(request);
});

module.exports = { createContactRequest, getStatusByTicket };