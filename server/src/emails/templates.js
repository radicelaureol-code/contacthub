function confirmationEmailTemplate({ firstName, ticketNumber, subject, category }) {
  const categoryLabels = {
    commercial: 'Demande commerciale',
    support: 'Support technique',
    partenariat: 'Partenariat',
    information: "Demande d'information",
    autre: 'Autre'
  };

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #1f2937;">
      <h2 style="color: #111827;">Bonjour ${firstName},</h2>
      <p>Nous avons bien reçu votre demande. Voici un récapitulatif :</p>
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
        <tr>
          <td style="padding: 8px 0; color: #6b7280;">N° de ticket</td>
          <td style="padding: 8px 0; font-weight: bold;">${ticketNumber}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280;">Catégorie</td>
          <td style="padding: 8px 0;">${categoryLabels[category] || category}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280;">Sujet</td>
          <td style="padding: 8px 0;">${subject}</td>
        </tr>
      </table>
      <p>Conservez ce numéro pour suivre l'avancement de votre demande.</p>
      <p style="margin-top: 32px; color: #6b7280; font-size: 14px;">L'équipe ContactHub</p>
    </div>
  `;

  const text = `Bonjour ${firstName},

Nous avons bien reçu votre demande.

N° de ticket : ${ticketNumber}
Catégorie : ${categoryLabels[category] || category}
Sujet : ${subject}

Conservez ce numéro pour suivre l'avancement de votre demande.

L'équipe ContactHub`;

  return { html, text };
}

module.exports = { confirmationEmailTemplate };