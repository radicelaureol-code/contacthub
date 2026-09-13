const express = require('express');
const { createContactRequest, getStatusByTicket } = require('../controllers/contactController');
const validate = require('../middlewares/validate');
const { createContactSchema } = require('../validators/contactValidator');

const router = express.Router();

router.post('/', validate(createContactSchema), createContactRequest);
router.get('/status/:ticketNumber', getStatusByTicket);

module.exports = router;