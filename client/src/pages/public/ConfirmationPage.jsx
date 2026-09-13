import { useParams, Link } from 'react-router-dom';
import { useTicketStatus } from '../../hooks/useTicketStatus';

const STATUS_LABELS = {
  nouveau: { label: 'Nouveau', color: 'bg-blue-100 text-blue-700' },
  en_cours: { label: 'En cours', color: 'bg-yellow-100 text-yellow-700' },
  resolu: { label: 'Résolu', color: 'bg-green-100 text-green-700' },
  archive: { label: 'Archivé', color: 'bg-gray-100 text-gray-700' }
};

function ConfirmationPage() {
  const { ticketNumber } = useParams();
  const { ticket, loading, error } = useTicketStatus(ticketNumber);

  if (loading) {
    return <p className="text-center py-12 text-gray-500">Chargement...</p>;
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto py-12 px-6 text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <Link to="/" className="text-gray-900 underline">Retour au formulaire</Link>
      </div>
    );
  }

  const statusInfo = STATUS_LABELS[ticket.status] || { label: ticket.status, color: 'bg-gray-100 text-gray-700' };

  return (
    <div className="max-w-md mx-auto py-16 px-6 text-center">
      <div className="text-5xl mb-4">✅</div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Demande envoyée</h1>
      <p className="text-gray-600 mb-6">
        Un email de confirmation vous a été envoyé.
      </p>

      <div className="border border-gray-200 rounded-lg p-6 text-left space-y-3">
        <div>
          <span className="text-sm text-gray-500">N° de ticket</span>
          <p className="font-mono font-bold text-lg">{ticket.ticketNumber}</p>
        </div>
        <div>
          <span className="text-sm text-gray-500">Sujet</span>
          <p>{ticket.subject}</p>
        </div>
        <div>
          <span className="text-sm text-gray-500">Statut</span>
          <p>
            <span className={`inline-block px-2 py-1 rounded text-sm font-medium ${statusInfo.color}`}>
              {statusInfo.label}
            </span>
          </p>
        </div>
      </div>

      <Link to="/" className="inline-block mt-8 text-gray-900 underline">
        Envoyer une nouvelle demande
      </Link>
    </div>
  );
}

export default ConfirmationPage;