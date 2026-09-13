const { z } = require('zod');

const CATEGORIES = ['commercial', 'support', 'partenariat', 'information', 'autre'];

const createContactSchema = z.object({
  firstName: z.string().trim().min(1, 'Le prénom est requis').max(100),
  lastName: z.string().trim().min(1, 'Le nom est requis').max(100),
  email: z.string().trim().email('Email invalide'),
  phone: z.string().trim().max(20).optional().or(z.literal('')),
  subject: z.string().trim().min(1, 'Le sujet est requis').max(200),
  category: z.enum(CATEGORIES, { errorMap: () => ({ message: 'Catégorie invalide' }) }),
  message: z.string().trim().min(10, 'Le message doit contenir au moins 10 caractères').max(5000),
  consentGiven: z.literal(true, {
    errorMap: () => ({ message: 'Le consentement est requis' })
  })
});

module.exports = { createContactSchema };