import React, { useState } from 'react';
import { register as registerApi } from '../../services/authService';
import api from '../../services/api';
import qs from 'qs';

export const register = async (username, email, password) => {
  return api.post(
    '/auth/register',
    qs.stringify({ username, email, password }),
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );
};

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await registerApi(username, email, password);
      setSuccess('Register berhasil! Silakan login.');
    } catch (err) {
      // Ambil pesan error dari response backend, fallback ke pesan default
      const msg = err?.response?.data?.error || err?.message || 'Register gagal';
      setError(msg);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
      <button type="submit">Register</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
    </form>
  );
};

export default RegisterPage;