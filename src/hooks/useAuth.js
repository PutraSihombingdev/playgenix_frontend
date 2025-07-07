import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export function useAuth() {
  const context = useContext(AuthContext);
  // Ambil token dari localStorage (atau context jika sudah ada)
  const token = localStorage.getItem('token') || '';
  return { ...context, token };
}
