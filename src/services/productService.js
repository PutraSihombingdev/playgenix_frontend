import api from './api';

function getToken(token) {
  return token || localStorage.getItem('token') || '';
}

export const getAllProducts = async () => {
  return api.get('/products/');
};

export const addProduct = async (data, token) => {
  return api.post('/products/', data, {
    headers: {
      'Authorization': `Bearer ${getToken(token)}`,
      'Content-Type': 'multipart/form-data',
    }
  });
};

export const updateProduct = async (id, data, token) => {
  return api.put(`/products/${id}`, data, {
    headers: {
      'Authorization': `Bearer ${getToken(token)}`,
      'Content-Type': 'multipart/form-data',
    }
  });
};

export const deleteProduct = async (id, token) => {
  return api.delete(`/products/${id}`, {
    headers: {
      'Authorization': `Bearer ${getToken(token)}`,
    }
  });
}; 