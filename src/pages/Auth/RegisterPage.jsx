import React, { useState } from 'react';
import { register as registerApi } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import playgenixLogo from '../../assets/images/playgenix-logo.png'; // Gambar logo baru (background hitam)
import '../../App.css';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await registerApi(username, email, password);
      setSuccess('Register berhasil! Silakan login.');
    } catch (err) {
      const msg = err?.response?.data?.error || err?.message || 'Register gagal';
      setError(msg);
    }
  };

  return (
    <div className="login-panda-bg">
      <div className="login-panda-container">
        {/* Kiri: Form Register */}
        <div className="login-panda-left">
          <div className="login-panda-brand">Devstorm Team<span className="login-panda-dot">.</span></div>
          <h2 className="login-panda-title">DAFTAR AKUN</h2>
          <div className="login-panda-sub">Sudah punya akun? <span className="login-panda-link" onClick={() => navigate('/login')}>Masuk</span></div>
          <form className="login-panda-form" onSubmit={handleRegister}>
            <label className="login-panda-label">Username</label>
            <div className="login-panda-input-wrap">
              <input
                className="login-panda-input"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Username Anda"
                type="text"
                autoComplete="username"
                required
              />
            </div>
            <label className="login-panda-label">Email</label>
            <div className="login-panda-input-wrap">
              <input
                className="login-panda-input"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="email@contoh.com"
                type="email"
                autoComplete="email"
                required
              />
            </div>
            <label className="login-panda-label">Password</label>
            <div className="login-panda-input-wrap">
              <input
                className="login-panda-input"
                value={password}
                onChange={e => setPassword(e.target.value)}
                type={showPassword ? 'text' : 'password'}
                placeholder="********"
                autoComplete="new-password"
                required
              />
              <span className="login-panda-link" style={{position:'absolute',right:18,top:14}} onClick={()=>setShowPassword(v=>!v)}>
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </span>
            </div>
            <button className="login-panda-btn" type="submit">Daftar</button>
            {error && <div className="login-panda-error">{error}</div>}
            {success && <div className="login-panda-success">{success}</div>}
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

export default RegisterPage;