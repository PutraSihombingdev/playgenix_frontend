import React, { useState } from "react";
import { register } from '../../services/authService';

const RegisterPage = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!form.username || !form.email || !form.password) {
      setError("Semua field wajib diisi");
      return;
    }
    try {
      await register(form);
      setSuccess("Registrasi berhasil! Silakan login.");
    } catch (err) {
      setError("Registrasi gagal: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '40px auto', background: '#232323', padding: 24, borderRadius: 10, color: '#fff' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Daftar Akun</h2>
      <div style={{ marginBottom: 12 }}>
        <input name="username" value={form.username} onChange={handleChange} placeholder="Username" style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #444', background: '#2c2c2c', color: '#fff' }} />
      </div>
      <div style={{ marginBottom: 12 }}>
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #444', background: '#2c2c2c', color: '#fff' }} />
      </div>
      <div style={{ marginBottom: 12 }}>
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #444', background: '#2c2c2c', color: '#fff' }} />
      </div>
      <button type="submit" style={{ width: '100%', padding: 10, borderRadius: 6, background: '#4e8cff', color: '#fff', border: 'none', fontWeight: 600 }}>Register</button>
      {error && <div style={{color: "red", marginTop: 10}}>{error}</div>}
      {success && <div style={{color: "green", marginTop: 10}}>{success}</div>}
    </form>
  );
};

export default RegisterPage;