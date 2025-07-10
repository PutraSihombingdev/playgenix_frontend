import React, { useState } from 'react';
import { register as registerApi } from '../../services/authService';
import api from '../../services/api';
import qs from 'qs';
import '../../App.css';
import '../../index.css';

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
    <div className="auth-bg">
      <form onSubmit={handleRegister} className="auth-card">
        <h2 className="auth-title">Register</h2>
        <div className="auth-field">
          <label htmlFor="username">Username</label>
          <input id="username" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
        </div>
        <div className="auth-field">
          <label htmlFor="email">Email</label>
          <input id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" required />
        </div>
        <div className="auth-field">
          <label htmlFor="password">Password</label>
          <input id="password" value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" required />
        </div>
        <button type="submit" className="auth-btn">Register</button>
        {error && <div className="auth-error">{error}</div>}
        {success && <div className="auth-success">{success}</div>}
        <div className="auth-link">
          Sudah punya akun? <a href="/login">Login</a>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;