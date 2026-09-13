const ContactRequest = require('../models/ContactRequest');

async function generateTicketNumber() {
  const year = new Date().getFullYear();
  const count = await ContactRequest.countDocuments({
    createdAt: { $gte: new Date(`${year}-01-01`) }
  });
  return `CTH-${year}-${String(count + 1).padStart(6, '0')}`;
}

module.exports = generateTicketNumber;