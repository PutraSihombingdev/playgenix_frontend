import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
import { useAuth } from '../hooks/useAuth';

function ProtectedRoute({ children }) {
  const { token } = useAuth();
  const location = useLocation();
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

export default function AppRoutes() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/store" element={user?.role === 'admin' ? <StoreListPage /> : <StoreUser />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/payments" element={<PaymentMethodPage />} />
              <Route path="/review" element={<ReviewPage />} />
              <Route path="/transactions" element={<TransactionPage />} />
              <Route path="/payments/:transactionId/upload" element={<UploadBuktiPage />} />
              <Route path="/store-user" element={<StoreUser />} />
            </Routes>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
