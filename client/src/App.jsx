import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import PublicLayout from './components/layouts/PublicLayout';
import AdminLayout from './components/layouts/AdminLayout';

import ContactFormPage from './pages/public/ContactFormPage';
import ConfirmationPage from './pages/public/ConfirmationPage';
import LoginPage from './pages/admin/LoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import RequestListPage from './pages/admin/RequestListPage';
import RequestDetailPage from './pages/admin/RequestDetailPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<ContactFormPage />} />
            <Route path="/confirmation/:ticketNumber" element={<ConfirmationPage />} />
          </Route>

          <Route path="/admin/login" element={<LoginPage />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="requests" element={<RequestListPage />} />
            <Route path="requests/:id" element={<RequestDetailPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;