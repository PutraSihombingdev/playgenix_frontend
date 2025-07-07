import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createPayment } from '../../services/paymentService';
import { useAuth } from '../../hooks/useAuth';
import { message } from 'antd';

const paymentMethods = [
  { value: 'visa', label: 'Visa' },
  { value: 'gopay', label: 'Gopay' },
  { value: 'dana', label: 'Dana' },
  // Tambahkan metode lain sesuai kebutuhan
];

const PaymentMethodPage = () => {
  const [selected, setSelected] = useState(paymentMethods[0].value);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useAuth();

  const total = Number(location.state?.total);

  if (isNaN(total) || total <= 0) {
    return <div style={{ color: 'red', padding: 24 }}>Total pembayaran tidak valid. Silakan kembali ke keranjang.</div>;
  }

  const handleSubmit = async () => {
    if (!total || !selected) {
      message.error("Total dan metode pembayaran wajib diisi!");
      return;
    }
    setLoading(true);
    try {
      await createPayment({ amount: total, method: selected }, token);
      message.success('Pembayaran berhasil dibuat!');
      navigate('/payments');
    } catch (err) {
      message.error(err?.response?.data?.error || err?.message || "Gagal membuat pembayaran");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Pilih Metode Pembayaran</h2>
      <div>
        {paymentMethods.map((m) => (
          <label key={m.value} style={{ marginRight: 16 }}>
            <input
              type="radio"
              value={m.value}
              checked={selected === m.value}
              onChange={() => setSelected(m.value)}
            />
            {m.label}
          </label>
        ))}
      </div>
      <div style={{ margin: '24px 0' }}>
        <strong>Total: </strong>Rp {Number(total).toLocaleString('id-ID')}
      </div>
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Memproses...' : 'Lanjut'}
      </button>
    </div>
  );
};

export default PaymentMethodPage; 