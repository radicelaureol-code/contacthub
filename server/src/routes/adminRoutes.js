const express = require('express');
const {
  getRequests,
  getRequestById,
  updateStatus,
  addNote,
  getStats
} = require('../controllers/adminController');
const { protect } = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validate');
const { updateStatusSchema, addNoteSchema } = require('../validators/adminValidator');

const router = express.Router();

router.use(protect);

router.get('/stats', getStats);
router.get('/', getRequests);
router.get('/:id', getRequestById);
router.patch('/:id/status', validate(updateStatusSchema), updateStatus);
router.post('/:id/notes', validate(addNoteSchema), addNote);

module.exports = router;