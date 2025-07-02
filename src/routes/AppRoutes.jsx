import { Routes, Route } from 'react-router-dom';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import StoreListPage from '../pages/Store/StoreListPage';
import UserManagement from '../pages/UserManagement';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/store" element={<StoreListPage />} />
      <Route path="/user-management" element={<UserManagement />} />
    </Routes>
  );
}
