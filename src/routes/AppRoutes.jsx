import { Routes, Route } from 'react-router-dom';
import DashboardPage from '../pages/dashboard/DashboardPage';
import UserManagement from '../pages/UserManagement';
import Store from '../pages/store';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/user-management" element={<UserManagement />} />
      <Route path="/store" element={<Store />} />
      {/* halaman lainnya... */}
    </Routes>
  );
}
