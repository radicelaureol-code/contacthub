import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useRequestDetail } from '../../hooks/useRequestDetail';

const NEXT_STATUS = {
  nouveau: [{ value: 'en_cours', label: 'Passer en cours' }],
  en_cours: [
    { value: 'resolu', label: 'Marquer résolu' },
    { value: 'nouveau', label: 'Repasser en nouveau' }
  ],
  resolu: [
    { value: 'archive', label: 'Archiver' },
    { value: 'en_cours', label: 'Rouvrir' }
  ],
  archive: []
};

const STATUS_BADGES = {
  nouveau: 'bg-blue-100 text-blue-700',
  en_cours: 'bg-yellow-100 text-yellow-700',
  resolu: 'bg-green-100 text-green-700',
  archive: 'bg-gray-100 text-gray-700'
};

const CATEGORY_LABELS = {
  commercial: '💼 Demande commerciale',
  support: '🛠️ Support technique',
  partenariat: '🤝 Partenariat',
  information: "📄 Demande d'information",
  autre: '💬 Autre'
};

function RequestDetailPage() {
  const { id } = useParams();
  const { request, loading, error, actionError, updating, changeStatus, addNote } = useRequestDetail(id);
  const [noteContent, setNoteContent] = useState('');

  if (loading) return <p className="text-gray-500">Chargement...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!noteContent.trim()) return;
    await addNote(noteContent);
    setNoteContent('');
  };

  return (
    <div className="max-w-3xl">
      <Link to="/admin/requests" className="text-sm text-gray-500 hover:underline">← Retour à la liste</Link>

      <div className="flex items-center justify-between mt-2 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 font-mono">{request.ticketNumber}</h1>
        <span className={`px-3 py-1 rounded text-sm font-medium ${STATUS_BADGES[request.status]}`}>
          {request.status}
        </span>
      </div>

      {actionError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded text-sm">
          {actionError}
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Nom</span>
            <p>{request.firstName} {request.lastName}</p>
          </div>
          <div>
            <span className="text-gray-500">Email</span>
            <p>{request.email}</p>
          </div>
          <div>
            <span className="text-gray-500">Téléphone</span>
            <p>{request.phone || '—'}</p>
          </div>
          <div>
            <span className="text-gray-500">Catégorie</span>
            <p>{CATEGORY_LABELS[request.category]}</p>
          </div>
        </div>
        <div>
          <span className="text-gray-500 text-sm">Sujet</span>
          <p className="font-medium">{request.subject}</p>
        </div>
        <div>
          <span className="text-gray-500 text-sm">Message</span>
          <p className="whitespace-pre-wrap">{request.message}</p>
        </div>
      </div>

      {NEXT_STATUS[request.status].length > 0 && (
        <div className="flex gap-2 mb-8">
          {NEXT_STATUS[request.status].map((s) => (
            <button
              key={s.value}
              disabled={updating}
              onClick={() => changeStatus(s.value)}
              className="bg-gray-900 text-white rounded px-4 py-2 text-sm font-medium disabled:opacity-50"
            >
              {s.label}
            </button>
          ))}
        </div>
      )}

      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-3">Notes internes</h2>

        <div className="space-y-3 mb-4">
          {request.notes.length === 0 && (
            <p className="text-gray-400 text-sm">Aucune note pour le moment.</p>
          )}
          {request.notes.map((note) => (
            <div key={note._id} className="bg-gray-50 border border-gray-200 rounded p-3 text-sm">
              <p>{note.content}</p>
              <p className="text-gray-400 text-xs mt-1">
                {note.author?.name} — {new Date(note.createdAt).toLocaleString('fr-FR')}
              </p>
            </div>
          ))}
        </div>

        <form onSubmit={handleAddNote} className="flex gap-2">
          <input
            type="text"
            placeholder="Ajouter une note interne..."
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
          />
          <button
            type="submit"
            disabled={updating}
            className="bg-gray-900 text-white rounded px-4 py-2 text-sm font-medium disabled:opacity-50"
          >
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );
}

export default RequestDetailPage;