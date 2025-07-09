import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import TransactionAdminPage from './TransactionAdminPage';
import TransactionUserPage from './TransactionUserPage';

const TransactionPage = () => {
  const { user } = useAuth();

  // Jika user adalah admin, tampilkan halaman admin
  if (user?.role === 'admin') {
    return <TransactionAdminPage />;
  }

  // Jika user bukan admin, tampilkan halaman user
  return <TransactionUserPage />;
};

export default TransactionPage; 