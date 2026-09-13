const asyncHandler = require('../utils/asyncHandler');
const ContactRequest = require('../models/ContactRequest');

// Transitions de statut autorisées — évite qu'un statut saute des étapes
const ALLOWED_TRANSITIONS = {
  nouveau: ['en_cours'],
  en_cours: ['resolu', 'nouveau'],
  resolu: ['archive', 'en_cours'],
  archive: []
};

// GET /api/requests
const getRequests = asyncHandler(async (req, res) => {
  const { status, category, search, page = 1, limit = 20 } = req.query;

  const filter = {};
  if (status) filter.status = status;
  if (category) filter.category = category;
  if (search) filter.$text = { $search: search };

  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.min(100, Math.max(1, Number(limit)));

  const [requests, total] = await Promise.all([
    ContactRequest.find(filter)
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .select('-notes'), // pas besoin des notes dans la liste
    ContactRequest.countDocuments(filter)
  ]);

  res.json({
    data: requests,
    pagination: {
      total,
      page: pageNum,
      limit: limitNum,
      pages: Math.ceil(total / limitNum)
    }
  });
});

// GET /api/requests/:id
const getRequestById = asyncHandler(async (req, res) => {
  const request = await ContactRequest.findById(req.params.id)
    .populate('notes.author', 'name email');

  if (!request) {
    res.status(404);
    throw new Error('Demande introuvable');
  }

  res.json(request);
});

// PATCH /api/requests/:id/status
const updateStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;


  const request = await ContactRequest.findById(req.params.id);
  if (!request) {
    res.status(404);
    throw new Error('Demande introuvable');
  }

  if (!ALLOWED_TRANSITIONS[request.status].includes(status)) {
    res.status(400);
    throw new Error(`Transition non autorisée: ${request.status} → ${status}`);
  }

  request.status = status;
  await request.save();

  res.json(request);
});

// POST /api/requests/:id/notes
const addNote = asyncHandler(async (req, res) => {
  const { content } = req.body;

  const request = await ContactRequest.findById(req.params.id);
  if (!request) {
    res.status(404);
    throw new Error('Demande introuvable');
  }

  request.notes.push({ content: content.trim(), author: req.user._id });
  await request.save();

  const updated = await ContactRequest.findById(request._id)
    .populate('notes.author', 'name email');

  res.status(201).json(updated);
});

// GET /api/stats
const getStats = asyncHandler(async (req, res) => {
  const counts = await ContactRequest.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } }
  ]);

  const stats = { nouveau: 0, en_cours: 0, resolu: 0, archive: 0 };
  counts.forEach(({ _id, count }) => {
    stats[_id] = count;
  });

  const total = Object.values(stats).reduce((sum, n) => sum + n, 0);

  res.json({ ...stats, total });
});

module.exports = { getRequests, getRequestById, updateStatus, addNote, getStats };