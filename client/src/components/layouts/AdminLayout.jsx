import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function AdminLayout() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 text-xl font-bold">ContactHub Admin</div>
        <nav className="flex-1 px-4 space-y-1">
          <Link to="/admin" className="block px-4 py-2 rounded hover:bg-gray-800">Dashboard</Link>
          <Link to="/admin/requests" className="block px-4 py-2 rounded hover:bg-gray-800">Demandes</Link>
        </nav>
        <div className="p-4 border-t border-gray-800">
          <p className="text-sm text-gray-400 mb-2">{user?.name}</p>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-300 hover:text-white"
          >
            Déconnexion
          </button>
        </div>
      </aside>
      <div className="flex-1">
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;