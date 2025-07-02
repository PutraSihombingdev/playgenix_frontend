import { Routes, Route } from 'react-router-dom';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import StoreListPage from '../pages/Store/StoreListPage';
import UserManagement from '../pages/UserManagement';
import CartPage from '../pages/CartPage/CartPage';
import PaymentMethodPage from '../pages/Payments/PaymentMethodPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/store" element={<StoreListPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/payments" element={<PaymentMethodPage />} />
      <Route path="/user-management" element={<UserManagement />} />
      {/* Tambahkan route lainnya jika ada */}
    </Routes>
  );
}
