import api from './api';
import qs from 'qs';

function getToken(token) {
  return token || localStorage.getItem('token') || '';
}

export const getCart = async (token) => {
  try {
    const res = await api.get('/cart/', {
      headers: { 'Authorization': `Bearer ${getToken(token)}` }
    });
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || 'Gagal mengambil keranjang';
  }
};

export const addToCart = async (data, token) => {
  try {
    const res = await api.post(
      '/cart/',
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
    throw err.response?.data?.message || 'Gagal menambah ke keranjang';
  }
};

export const removeFromCart = async (id, token) => {
  try {
    const res = await api.delete(`/cart/${id}`, {
      headers: { 'Authorization': `Bearer ${getToken(token)}` }
    });
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || 'Gagal menghapus dari keranjang';
  }
}; 