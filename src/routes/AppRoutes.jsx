import { Routes, Route } from 'react-router-dom';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import UserManagement from '../pages/UserManagement';




export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/user-management" element={<UserManagement />} />
      {/* halaman lainnya... */}
    </Routes>
  );
}
