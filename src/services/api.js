import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1', // Ganti jika backend berjalan di port/host lain
});

export default api;
