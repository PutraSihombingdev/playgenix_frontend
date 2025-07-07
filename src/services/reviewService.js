import api from './api';
import qs from 'qs';

function getToken(token) {
  return token || localStorage.getItem('token') || '';
}

export const getAllReviews = async () => {
  try {
    const res = await api.get('/review/');
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || 'Gagal mengambil review';
  }
};

export const getReviewsByProduct = async (productId) => {
  try {
    const res = await api.get(`/review/${productId}`);
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || 'Gagal mengambil review produk';
  }
};

export const addReview = async (data, token) => {
  try {
    const res = await api.post(
      '/review/',
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
    throw err.response?.data?.message || 'Gagal menambah review';
  }
}; 