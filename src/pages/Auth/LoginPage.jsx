import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { login as loginApi } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import '../../App.css'; // pastikan style global masuk
import '../../index.css';

const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await loginApi(email, password);
      login(data.token, data.user); // simpan token & user ke context
      navigate('/'); // redirect ke dashboard
    } catch (err) {
      const msg = err?.response?.data?.error || err?.message || 'Login gagal';
      setError(msg);
    }
  };

  return (
    <div className="auth-bg">
      <form onSubmit={handleLogin} className="auth-card">
        <h2 className="auth-title">Login</h2>
        <div className="auth-field">
          <label htmlFor="email">Email</label>
          <input id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" required />
        </div>
        <div className="auth-field">
          <label htmlFor="password">Password</label>
          <input id="password" value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" required />
        </div>
        <button type="submit" className="auth-btn">Login</button>
        {error && <div className="auth-error">{error}</div>}
        <div className="auth-link">
          Belum punya akun? <a href="/register">Register</a>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;