import api from './api';
import qs from 'qs';

function getToken(token) {
  return token || localStorage.getItem('token') || '';
}

export const getAllProducts = async () => {
  try {
    const res = await api.get('/products/');
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || 'Gagal mengambil produk';
  }
};

export const addProduct = async (data, token) => {
  try {
    const res = await api.post(
      '/products/',
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
    throw err.response?.data?.message || 'Gagal menambah produk';
  }
};

export const updateProduct = async (id, data, token) => {
  try {
    const res = await api.put(
      `/products/${id}`,
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
    throw err.response?.data?.message || 'Gagal update produk';
  }
};

export const deleteProduct = async (id, token) => {
  try {
    const res = await api.delete(`/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch (err) {
    // Tampilkan pesan error dari backend
    throw err.response?.data?.error || 'Gagal hapus produk';
  }
};