import api from './api';

export const getAllReviews = async () => {
  const res = await api.get('/review/');
  return res.data;
};

export const getReviewsByProduct = async (productId) => {
  const res = await api.get(`/review/${productId}`);
  return res.data;
};

export const addReview = async (rating, comment) => {
  const token = localStorage.getItem('token');
  const res = await api.post('/review/', { rating, comment }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export default { getAllReviews, getReviewsByProduct, addReview }; 