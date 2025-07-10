import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { login as loginApi } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import playgenixLogo from '../../assets/images/playgenix-logo.png'; // Gambar logo baru (background hitam)
import '../../App.css';

const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await loginApi(email, password);
      login(data.token, data.user);
      navigate('/');
    } catch (err) {
      const msg = err?.response?.data?.error || err?.message || 'Login gagal';
      setError(msg);
    }
  };

  return (
    <div className="login-panda-bg">
      <div className="login-panda-container">
        {/* Kiri: Form Login */}
        <div className="login-panda-left">
          <div className="login-panda-brand">Devstrom Team<span className="login-panda-dot">.</span></div>
          <h2 className="login-panda-title">SELAMAT DATANG KEMBALI!</h2>
          <div className="login-panda-sub">Belum punya akun? <span className="login-panda-link" onClick={() => navigate('/register')}>Daftar</span></div>
          <form className="login-panda-form" onSubmit={handleLogin}>
            <label className="login-panda-label">Email</label>
            <div className="login-panda-input-wrap">
              <input
                className="login-panda-input"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="email@contoh.com"
                type="email"
                autoComplete="username"
                required
              />
            </div>
            <label className="login-panda-label">Password</label>
            <div className="login-panda-input-wrap">
              <input
                className="login-panda-input"
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
                placeholder="********"
                autoComplete="current-password"
                required
              />
            </div>
            <div className="login-panda-row">
              <label className="login-panda-remember">
                <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} />
                <span>Ingat saya</span>
              </label>
            </div>
            <button className="login-panda-btn" type="submit">Masuk</button>
            {error && <div className="login-panda-error">{error}</div>}
          </form>
        </div>
        {/* Kanan: Gambar Logo Playgenix */}
        <div className="login-panda-right">
          <img src={playgenixLogo} alt="Playgenix Logo" className="login-playgenix-img" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;