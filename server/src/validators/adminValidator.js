const { z } = require('zod');

const STATUSES = ['nouveau', 'en_cours', 'resolu', 'archive'];

const updateStatusSchema = z.object({
  status: z.enum(STATUSES, { errorMap: () => ({ message: 'Statut invalide' }) })
});

const addNoteSchema = z.object({
  content: z.string().trim().min(1, 'Le contenu de la note est requis').max(2000)
});

module.exports = { updateStatusSchema, addNoteSchema };