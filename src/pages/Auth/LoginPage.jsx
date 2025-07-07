import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { login as loginApi } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

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
    <form onSubmit={handleLogin}>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
      <button type="submit">Login</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  );
};

export default LoginPage;