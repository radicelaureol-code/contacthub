import { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function AdminLayout() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen bg-gray-50 md:flex">
      {/* Barre supérieure mobile uniquement */}
      <div className="md:hidden flex items-center justify-between bg-gray-900 text-white px-4 py-3">
        <span className="font-bold">ContactHub Admin</span>
        <button onClick={() => setSidebarOpen(true)} className="p-1" aria-label="Ouvrir le menu">
          ☰
        </button>
      </div>

      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar : fixe en mobile (drawer), statique en desktop */}
      <aside
        className={`
          fixed md:static top-0 left-0 h-full w-64 bg-gray-900 text-white flex flex-col z-50
          transform transition-transform duration-200
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
        `}
      >
        <div className="p-6 text-xl font-bold flex items-center justify-between">
          ContactHub Admin
          <button onClick={closeSidebar} className="md:hidden text-gray-400" aria-label="Fermer le menu">
            ✕
          </button>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          <Link to="/admin" onClick={closeSidebar} className="block px-4 py-2 rounded hover:bg-gray-800">
            Dashboard
          </Link>
          <Link to="/admin/requests" onClick={closeSidebar} className="block px-4 py-2 rounded hover:bg-gray-800">
            Demandes
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-800">
          <p className="text-sm text-gray-400 mb-2">{user?.name}</p>
          <button onClick={handleLogout} className="text-sm text-gray-300 hover:text-white">
            Déconnexion
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <main className="p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;