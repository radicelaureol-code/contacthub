import { Link } from 'react-router-dom';
import { useRequests } from '../../hooks/useRequests';

const STATUS_OPTIONS = [
  { value: '', label: 'Tous les statuts' },
  { value: 'nouveau', label: 'Nouveau' },
  { value: 'en_cours', label: 'En cours' },
  { value: 'resolu', label: 'Résolu' },
  { value: 'archive', label: 'Archivé' }
];

const CATEGORY_OPTIONS = [
  { value: '', label: 'Toutes les catégories' },
  { value: 'commercial', label: '💼 Commercial' },
  { value: 'support', label: '🛠️ Support' },
  { value: 'partenariat', label: '🤝 Partenariat' },
  { value: 'information', label: '📄 Information' },
  { value: 'autre', label: '💬 Autre' }
];

const STATUS_BADGES = {
  nouveau: 'bg-blue-100 text-blue-700',
  en_cours: 'bg-yellow-100 text-yellow-700',
  resolu: 'bg-green-100 text-green-700',
  archive: 'bg-gray-100 text-gray-700'
};

function RequestListPage() {
  const { requests, pagination, filters, updateFilter, loading, error } = useRequests();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Demandes</h1>

      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          placeholder="Rechercher (nom, email)..."
          value={filters.search}
          onChange={(e) => updateFilter('search', e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 flex-1 min-w-[200px]"
        />
        <select
          value={filters.status}
          onChange={(e) => updateFilter('status', e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          {STATUS_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <select
          value={filters.category}
          onChange={(e) => updateFilter('category', e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          {CATEGORY_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      {loading && <p className="text-gray-500">Chargement...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 text-left">
                <tr>
                  <th className="px-4 py-3">Ticket</th>
                  <th className="px-4 py-3">Nom</th>
                  <th className="px-4 py-3">Sujet</th>
                  <th className="px-4 py-3">Catégorie</th>
                  <th className="px-4 py-3">Statut</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((r) => (
                  <tr key={r._id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <Link to={`/admin/requests/${r._id}`} className="font-mono text-gray-900 hover:underline">
                        {r.ticketNumber}
                      </Link>
                    </td>
                    <td className="px-4 py-3">{r.firstName} {r.lastName}</td>
                    <td className="px-4 py-3">{r.subject}</td>
                    <td className="px-4 py-3">{r.category}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${STATUS_BADGES[r.status]}`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(r.createdAt).toLocaleDateString('fr-FR')}
                    </td>
                  </tr>
                ))}
                {requests.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                      Aucune demande trouvée
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {pagination && pagination.pages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-4">
              <button
                disabled={filters.page <= 1}
                onClick={() => updateFilter('page', filters.page - 1)}
                className="px-3 py-1 border border-gray-300 rounded disabled:opacity-40"
              >
                Précédent
              </button>
              <span className="text-sm text-gray-500">
                Page {pagination.page} / {pagination.pages}
              </span>
              <button
                disabled={filters.page >= pagination.pages}
                onClick={() => updateFilter('page', filters.page + 1)}
                className="px-3 py-1 border border-gray-300 rounded disabled:opacity-40"
              >
                Suivant
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default RequestListPage;