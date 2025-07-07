import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1', // ganti sesuai base_url backend kamu
  withCredentials: false,
});

export default api;
