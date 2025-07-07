import api from './api';

export const register = async (data) => {
  // data: { username, email, password }
  const formData = new FormData();
  formData.append('username', data.username);
  formData.append('email', data.email);
  formData.append('password', data.password);
  return api.post('/auth/register', formData);
};

export const login = async (data) => {
  // data: { username, password }
  const formData = new FormData();
  formData.append('username', data.username);
  formData.append('password', data.password);
  return api.post('/auth/login', formData);
}; 