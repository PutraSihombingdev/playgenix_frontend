import { Routes, Route } from 'react-router-dom';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import StoreListPage from '../pages/Store/store';
import CartPage from '../pages/CartPage/CartPage';
import PaymentMethodPage from '../pages/Payments/PaymentMethodPage';
import UserManagement from '../pages/Users/UserManagement';
import LoginPage from '../pages/Auth/LoginPage';
import ReviewPage from '../pages/Review/ReviewPage';
import TransactionListPage from '../pages/Transactions/TransactionListPage';
import TransactionDetailPage from '../pages/Transactions/TransactionDetailPage';
import RegisterPage from '../pages/Auth/RegisterPage';
import StoreUser from '../pages/Store/StoreUser';


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/store" element={<StoreListPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/payments" element={<PaymentMethodPage />} />
      <Route path="/user-management" element={<UserManagement />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/review" element={<ReviewPage />} />
      <Route path="/transactions" element={<TransactionListPage />} />
      <Route path="/transactions/:id" element={<TransactionDetailPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/store-user" element={<StoreUser />} />
    </Routes>
  );
}
