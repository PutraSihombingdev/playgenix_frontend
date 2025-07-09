import { Routes, Route } from 'react-router-dom';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import StoreListPage from '../pages/Store/store';
import CartPage from '../pages/CartPage/CartPage';
import PaymentMethodPage from '../pages/Payments/PaymentMethodPage';
import LoginPage from '../pages/Auth/LoginPage';
import ReviewPage from '../pages/Review/ReviewPage';
import RegisterPage from '../pages/Auth/RegisterPage';
import StoreUser from '../pages/Store/StoreUser';
import TransactionPage from '../pages/Transactions/TransactionPage';
import UploadBuktiPage from '../pages/Payments/UploadBuktiPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/store" element={<StoreListPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/payments" element={<PaymentMethodPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/review" element={<ReviewPage />} />
      
      {/* Route untuk transaksi - akan menampilkan halaman sesuai role */}
      <Route path="/transactions" element={<TransactionPage />} />
      <Route path="/payments/:transactionId/upload" element={<UploadBuktiPage />} />
      
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/store-user" element={<StoreUser />} />
    </Routes>
  );
}
