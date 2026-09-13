const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema(
  {
    content: { type: String, required: true, trim: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
  },
  { _id: true }
);

const ContactRequestSchema = new mongoose.Schema(
  {
    ticketNumber: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    // Informations du visiteur
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },

    // Contenu de la demande
    subject: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ['commercial', 'support', 'partenariat', 'information', 'autre'],
      required: true
    },
    message: { type: String, required: true, trim: true },

    // RGPD
    consentGiven: { type: Boolean, required: true },

    // Suivi interne
    status: {
      type: String,
      enum: ['nouveau', 'en_cours', 'resolu', 'archive'],
      default: 'nouveau',
      index: true
    },
    notes: [NoteSchema],

    // Métadonnées techniques
    ipAddress: { type: String }
  },
  { timestamps: true }
);

// Recherche textuelle par nom / prénom / email (admin)
ContactRequestSchema.index({ firstName: 'text', lastName: 'text', email: 'text' });

module.exports = mongoose.model('ContactRequest', ContactRequestSchema);