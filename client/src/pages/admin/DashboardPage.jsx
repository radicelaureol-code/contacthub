import { Link } from 'react-router-dom';
import { useStats } from '../../hooks/useStats';

const CARDS = [
  { key: 'nouveau', label: 'Nouvelles demandes', icon: '📩', color: 'text-blue-600' },
  { key: 'en_cours', label: 'En traitement', icon: '🔄', color: 'text-yellow-600' },
  { key: 'resolu', label: 'Résolues', icon: '✅', color: 'text-green-600' },
  { key: 'total', label: 'Total', icon: '📊', color: 'text-gray-900' }
];

function DashboardPage() {
  const { stats, loading, error } = useStats();

  if (loading) return <p className="text-gray-500">Chargement...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {CARDS.map((card) => (
          <div key={card.key} className="bg-white border border-gray-200 rounded-lg p-5">
            <div className="text-2xl mb-2">{card.icon}</div>
            <div className={`text-3xl font-bold ${card.color}`}>{stats[card.key]}</div>
            <div className="text-sm text-gray-500 mt-1">{card.label}</div>
          </div>
        ))}
      </div>

      <Link
        to="/admin/requests"
        className="inline-block bg-gray-900 text-white rounded px-4 py-2 font-medium"
      >
        Voir toutes les demandes
      </Link>
    </div>
  );
}

export default DashboardPage;