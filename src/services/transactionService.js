import api from './api';
import qs from 'qs';

function getToken(token) {
  return token || localStorage.getItem('token') || '';
}

export const getTransactions = async (token) => {
  try {
    const res = await api.get('/transaction/', {
      headers: { 'Authorization': `Bearer ${getToken(token)}` }
    });
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || 'Gagal mengambil transaksi';
  }
};

export const createTransaction = async (data, token) => {
  try {
    const res = await api.post(
      '/transaction/',
      qs.stringify(data),
      {
        headers: {
          'Authorization': `Bearer ${getToken(token)}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      }
    );
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || 'Gagal membuat transaksi';
  }
};
