const nodemailer = require('nodemailer');
const { smtp } = require('./env');
const { confirmationEmailTemplate } = require('../emails/templates');

const transporter = nodemailer.createTransport({
  host: smtp.host,
  port: smtp.port,
  auth: {
    user: smtp.user,
    pass: smtp.pass
  }
});

async function sendConfirmationEmail(request) {
  const { email, firstName, ticketNumber, subject, category } = request;
  const { html, text } = confirmationEmailTemplate({ firstName, ticketNumber, subject, category });

  await transporter.sendMail({
    from: '"ContactHub" <no-reply@contacthub.com>',
    to: email,
    subject: `Confirmation de votre demande — ${ticketNumber}`,
    text,
    html
  });
}

module.exports = { transporter, sendConfirmationEmail };