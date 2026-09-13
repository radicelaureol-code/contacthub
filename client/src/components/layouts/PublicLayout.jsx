import { Outlet, Link } from 'react-router-dom';

function PublicLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <Link to="/" className="text-xl font-bold text-gray-900">ContactHub</Link>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
export default PublicLayout;