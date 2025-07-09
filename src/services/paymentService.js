import api from './api';
import qs from 'qs';

function getToken(token) {
  return token || localStorage.getItem('token') || '';
}

export const getPayments = async (token) => {
  try {
    const res = await api.get('/payment/', {
      headers: { 'Authorization': `Bearer ${getToken(token)}` }
    });
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || 'Gagal mengambil pembayaran';
  }
};

export const createPayment = async (data, token) => {
  try {
    const res = await api.post(
      '/payment/',
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
    throw err.response?.data?.error || 'Gagal membuat pembayaran';
  }
};

export const updatePaymentStatus = async (id, status, token) => {
  try {
    const res = await api.patch(
      `/payment/${id}`,
      qs.stringify({ status }),
      {
        headers: {
          'Authorization': `Bearer ${getToken(token)}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      }
    );
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || 'Gagal update status pembayaran';
  }
};

// Tambahkan fungsi uploadBukti
export const uploadBukti = (formData) =>
  api.post('/payment/upload-bukti', formData, {
    headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${getToken()}` },
  });

export default { getPayments, createPayment, updatePaymentStatus, uploadBukti };
