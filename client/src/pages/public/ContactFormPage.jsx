import { useContactForm } from '../../hooks/useContactForm';

const CATEGORIES = [
  { value: 'commercial', label: '💼 Demande commerciale' },
  { value: 'support', label: '🛠️ Support technique' },
  { value: 'partenariat', label: '🤝 Partenariat' },
  { value: 'information', label: "📄 Demande d'information" },
  { value: 'autre', label: '💬 Autre' }
];

function ContactFormPage() {
  const { formData, updateField, handleSubmit, errors, submitting } = useContactForm();

  return (
    <div className="max-w-xl mx-auto py-12 px-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Contactez-nous</h1>

      {errors && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded text-sm">
          {errors}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Prénom"
            value={formData.firstName}
            onChange={(e) => updateField('firstName', e.target.value)}
            required
            className="border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Nom"
            value={formData.lastName}
            onChange={(e) => updateField('lastName', e.target.value)}
            required
            className="border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => updateField('email', e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />

        <input
          type="tel"
          placeholder="Téléphone (optionnel)"
          value={formData.phone}
          onChange={(e) => updateField('phone', e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />

        <select
          value={formData.category}
          onChange={(e) => updateField('category', e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">Catégorie de la demande</option>
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Sujet"
          value={formData.subject}
          onChange={(e) => updateField('subject', e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />

        <textarea
          placeholder="Votre message"
          value={formData.message}
          onChange={(e) => updateField('message', e.target.value)}
          required
          rows={5}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />

        <label className="flex items-start gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={formData.consentGiven}
            onChange={(e) => updateField('consentGiven', e.target.checked)}
            required
            className="mt-1"
          />
          <span>J'accepte que mes données soient traitées dans le cadre de ma demande.</span>
        </label>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-gray-900 text-white rounded px-4 py-2 font-medium disabled:opacity-50"
        >
          {submitting ? 'Envoi en cours...' : 'Envoyer'}
        </button>
      </form>
    </div>
  );
}

export default ContactFormPage;