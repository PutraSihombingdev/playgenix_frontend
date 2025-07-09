import api from './api';
import qs from 'qs';

function getToken(token) {
  return token || localStorage.getItem('token') || '';
}

// Fungsi untuk mengecek koneksi ke backend
export const checkBackendConnection = async () => {
  try {
    // Gunakan endpoint yang pasti ada di backend
    const res = await api.get('/transaction/list');
    console.log('Backend connection successful');
    return true;
  } catch (error) {
    console.error('Backend connection failed:', error);
    return false;
  }
};

export const getTransactionList = async (token) => {
  const res = await api.get('/transaction/list', {
    headers: { Authorization: `Bearer ${getToken(token)}` }
  });
  return res.data;
};

export const getMyTransactions = async (token) => {
  const res = await api.get('/transaction/my', {
    headers: { Authorization: `Bearer ${getToken(token)}` }
  });
  return res.data;
};

export const getTransactionDetail = async (id, token) => {
  const res = await api.get(`/transaction/${id}`, {
    headers: { Authorization: `Bearer ${getToken(token)}` }
  });
  return res.data;
};

export const updateTransactionStatus = async (id, status) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token tidak ditemukan');
    }
    
    console.log('Updating transaction status:', { id, status });
    console.log('Token:', token.substring(0, 20) + '...');
    
    // Validasi status yang diizinkan sesuai backend
    const allowedStatuses = ['pending', 'paid', 'failed'];
    if (!allowedStatuses.includes(status)) {
      throw new Error(`Status tidak valid. Status yang diizinkan: ${allowedStatuses.join(', ')}`);
    }
    
    // Pastikan ID adalah number
    const transactionId = parseInt(id);
    if (isNaN(transactionId)) {
      throw new Error('ID transaksi tidak valid');
    }
    
    // Mapping status untuk memastikan format yang benar
    const statusMapping = {
      'pending': 'pending',
      'paid': 'paid', 
      'failed': 'failed'
    };
    
    const mappedStatus = statusMapping[status];
    if (!mappedStatus) {
      throw new Error(`Status mapping tidak ditemukan untuk: ${status}`);
    }
    
    const requestData = { status: mappedStatus };
    console.log('Request data:', requestData);
    console.log('Request URL:', `/transaction/${transactionId}/status`);
    console.log('Mapped status:', mappedStatus);
    
    const res = await api.patch(`/transaction/${transactionId}/status`, requestData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Update response:', res.data);
    return res.data;
  } catch (error) {
    console.error('Error updating transaction status:', error);
    console.error('Error message:', error.message);
    console.error('Error response:', error.response);
    
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
      
      // Handle specific database errors
      if (error.response.status === 500) {
        const errorData = error.response.data;
        if (errorData && errorData.error && errorData.error.includes('Data truncated')) {
          throw new Error('Status tidak valid untuk database. Silakan hubungi administrator.');
        }
      }
    }
    throw error;
  }
};

export const deleteTransaction = async (id) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token tidak ditemukan');
    }
    
    console.log('Deleting transaction:', { id });
    console.log('Token:', token.substring(0, 20) + '...');
    
    // Pastikan ID adalah number
    const transactionId = parseInt(id);
    if (isNaN(transactionId)) {
      throw new Error('ID transaksi tidak valid');
    }
    
    console.log('Request URL:', `/transaction/${transactionId}`);
    
    const res = await api.delete(`/transaction/${transactionId}`, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Delete response:', res.data);
    return res.data;
  } catch (error) {
    console.error('Error deleting transaction:', error);
    console.error('Error message:', error.message);
    console.error('Error response:', error.response);
    
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    }
    throw error;
  }
};

export const checkoutCart = async () => {
  const token = localStorage.getItem('token');
  const res = await api.post('/transaction/', {}, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.data;
};

export const uploadBuktiTransfer = async (transactionId, amount, file) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token tidak ditemukan');
    }

    const formData = new FormData();
    formData.append('transaction_id', transactionId);
    formData.append('amount', amount);
    formData.append('bukti', file);

    const res = await api.post('/transaction/upload-bukti', formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    return res.data;
  } catch (error) {
    console.error('Error uploading bukti transfer:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
    throw error;
  }
};

export default {
  getTransactionList,
  getMyTransactions,
  getTransactionDetail,
  updateTransactionStatus,
  deleteTransaction,
  checkoutCart,
  uploadBuktiTransfer,
  checkBackendConnection,
};
