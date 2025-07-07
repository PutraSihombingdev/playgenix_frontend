import React, { useState } from "react";
import { login } from "../../services/authService";

const LoginPage = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await login(form);
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.location.href = "/";
    } catch (err) {
      setError("Login gagal: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', background: '#232323', padding: 24, borderRadius: 10, color: '#fff' }}>
      <form onSubmit={handleSubmit}>
        <input name="username" value={form.username} onChange={handleChange} placeholder="Username" style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #444', background: '#2c2c2c', color: '#fff', marginBottom: 12 }} />
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #444', background: '#2c2c2c', color: '#fff', marginBottom: 12 }} />
        <button type="submit" style={{ width: '100%', padding: 10, borderRadius: 6, background: '#4e8cff', color: '#fff', border: 'none', fontWeight: 600 }}>Login</button>
        {error && <div style={{color: "red", marginTop: 10}}>{error}</div>}
      </form>
      <div style={{ textAlign: 'center', marginTop: 18 }}>
        <span style={{ color: '#fff', fontSize: 14 }}>Belum punya akun?{' '}</span>
        <a href="/register" style={{ color: '#4e8cff', fontWeight: 500, fontSize: 14, textDecoration: 'none' }}>Daftar sekarang</a>
      </div>
    </div>
  );
};

export default LoginPage;