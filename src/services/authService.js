import api from './api';
import qs from 'qs';

export const register = async (username, email, password) => {
  return api.post(
    '/auth/register',
    qs.stringify({ username, email, password }),
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );
};

export const login = async (email, password) => {
  const res = await api.post(
    '/auth/login',
    qs.stringify({ email, password }),
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );
  return res.data;
};