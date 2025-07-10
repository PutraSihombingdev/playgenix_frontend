import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { uploadPaymentProof } from '../../services/paymentService';
import { message } from 'antd';

const UploadProofPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { method, total } = location.state || {};
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      message.error('Pilih file bukti pembayaran terlebih dahulu!');
      return;
    }
    setLoading(true);
    try {
      await uploadPaymentProof({ file, method, total });
      message.success('Bukti pembayaran berhasil diupload! Menunggu verifikasi admin.');
      navigate('/transactions');
    } catch (err) {
      message.error(err?.response?.data?.error || err?.message || 'Gagal upload bukti pembayaran');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#18181c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: 420, width: '100%', margin: '40px auto', background: '#45475a', borderRadius: 22, boxShadow: '0 8px 40px #0002', padding: 36 }}>
        <h2 className="auth-title">Upload Bukti Pembayaran</h2>
        <div className="auth-field">
          <label>Metode Pembayaran</label>
          <input value={method} disabled />
        </div>
        <div className="auth-field">
          <label>Total</label>
          <input value={total ? `Rp ${Number(total).toLocaleString('id-ID')}` : ''} disabled />
        </div>
        <div className="auth-field">
          <label htmlFor="bukti">Bukti Pembayaran (gambar)</label>
          <input id="bukti" type="file" accept="image/*" onChange={handleFileChange} required />
        </div>
        <button type="submit" className="auth-btn" disabled={loading}>
          {loading ? 'Mengupload...' : 'Upload'}
        </button>
      </div>
    </div>
  );
};

export default UploadProofPage; 