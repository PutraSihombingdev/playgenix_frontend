import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AdminLayout from '../../layouts/AdminLayout';
import visaLogo from '../../assets/images/VISA.jpg';
import mastercardLogo from '../../assets/images/Master card.jpg';
import danaLogo from '../../assets/images/Dana logo.jpg';
import linkajaLogo from '../../assets/images/Link aja.jpg';
import gopayLogo from '../../assets/images/Gopay.jpg';

const paymentMethods = [
  { value: 'visa', label: 'Visa' },
  { value: 'mastercard', label: 'MasterCard' },
  { value: 'dana', label: 'Dana' },
  { value: 'linkaja', label: 'Linkaja' },
  { value: 'gopay', label: 'Gopay' },
];

const PaymentMethodPage = () => {
  const [selected, setSelected] = useState(paymentMethods[0].value);
  const navigate = useNavigate();
  const location = useLocation();
  const item = location.state?.item;

  return (
    <AdminLayout>
      <div style={{ background: '#232323', minHeight: '100vh', padding: '40px 0' }}>
        <div style={{ width: 900, margin: '0 auto', color: '#fff', display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div style={{ background: '#2c2c2c', borderRadius: 12, boxShadow: '0 2px 8px #0002', padding: 36, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
            <h2 style={{ fontWeight: 600, fontSize: 28, color: '#fff', marginBottom: 16 }}>Pilih Metode Pembayaran</h2>
            {item && (
              <div style={{ width: 400, background: '#232323', borderRadius: 8, padding: 16, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 16 }}>
                <img src={item.image} alt={item.title} style={{ width: 80, height: 50, objectFit: 'cover', borderRadius: 6 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 18 }}>{item.title}</div>
                  <div style={{ color: '#bdbdbd', fontSize: 13 }}>{item.desc}</div>
                  <div style={{ color: '#4e8cff', fontSize: 13, marginTop: 2 }}>{item.reviews}</div>
                </div>
                <div style={{ fontWeight: 600, fontSize: 18, color: '#fff' }}>Rp {item.price.toLocaleString('id-ID')}</div>
              </div>
            )}
            <div style={{ width: 400, display: 'flex', flexDirection: 'column', gap: 20 }}>
              <label htmlFor="payment-method" style={{ color: '#bdbdbd', fontSize: 16, marginBottom: 8 }}>Silakan pilih metode pembayaran:</label>
              <select
                id="payment-method"
                value={selected}
                onChange={e => setSelected(e.target.value)}
                style={{ padding: '12px 16px', borderRadius: 6, border: 'none', fontSize: 16, background: '#232323', color: '#fff', outline: 'none' }}
              >
                {paymentMethods.map(method => (
                  <option key={method.value} value={method.value}>{method.label}</option>
                ))}
              </select>
              <div style={{ marginTop: 24 }}>
                <div style={{ color: '#bdbdbd', fontSize: 15, marginBottom: 8 }}>We accept the following secure payment methods:</div>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <img src={visaLogo} alt="Visa" style={{ height: 32, background: '#fff', borderRadius: 4, padding: 2 }} />
                  <img src={mastercardLogo} alt="MasterCard" style={{ height: 32, background: '#fff', borderRadius: 4, padding: 2 }} />
                  <img src={danaLogo} alt="Dana" style={{ height: 32, background: '#fff', borderRadius: 4, padding: 2 }} />
                  <img src={linkajaLogo} alt="LinkAja" style={{ height: 32, background: '#fff', borderRadius: 4, padding: 2 }} />
                  <img src={gopayLogo} alt="Gopay" style={{ height: 32, background: '#fff', borderRadius: 4, padding: 2 }} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 16, marginTop: 32 }}>
                <button onClick={() => navigate('/cart')} style={{ background: '#232c34', color: '#fff', border: 'none', borderRadius: 6, padding: '12px 32px', fontWeight: 500, fontSize: 16, cursor: 'pointer' }}>Kembali ke Cart</button>
                <button style={{ background: '#8fc400', color: '#fff', border: 'none', borderRadius: 6, padding: '12px 32px', fontWeight: 500, fontSize: 16, cursor: 'pointer' }}>Lanjut</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default PaymentMethodPage; 