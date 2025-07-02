import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mlImage from '../../assets/images/mobile-legend.jpg';
import AdminLayout from '../../layouts/AdminLayout';

const initialCartItems = [
  {
    id: 1,
    title: 'Mobile Legend',
    skin: 'Skin 215',
    desc: '2 Skin Legend, KOF, EX, Global 1 LING',
    date: 'May 16, 2025',
    reviews: '960,000 User Reviews',
    price: 500000,
    image: mlImage,
    added: 'July 5',
    checked: true,
  },
  {
    id: 2,
    title: 'Free Fire',
    skin: 'Skin 215',
    desc: 'Sg Unggu, AK Draco Max 1, dll',
    date: 'May 16, 2025',
    reviews: '960,000 User Reviews',
    price: 100000,
    image: mlImage,
    added: 'July 5',
    checked: true,
  },
  {
    id: 3,
    title: 'Mobile Legend',
    skin: 'Skin 215',
    desc: '2 Skin Legend, KOF, EX, Global 1 LING',
    date: 'May 16, 2025',
    reviews: '960,000 User Reviews',
    price: 500000,
    image: mlImage,
    added: 'July 5',
    checked: true,
  },
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const navigate = useNavigate();

  const handleCheck = (id) => {
    setCartItems((prev) => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const total = cartItems.filter(item => item.checked).reduce((acc, item) => acc + item.price, 0);

  return (
    <AdminLayout>
      <div style={{ background: '#232323', minHeight: '100vh', padding: '40px 0' }}>
        <div style={{ width: 900, margin: '0 auto', color: '#fff', display: 'flex', flexDirection: 'column', gap: 32 }}>
          
          {cartItems.map((item) => (
            <div key={item.id} style={{ background: '#2c2c2c', borderRadius: 12, display: 'flex', alignItems: 'center', padding: 24, gap: 0, boxShadow: '0 2px 8px #0002', minHeight: 150 }}>
              <div style={{ flex: '0 0 32%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src={item.image} alt={item.title} style={{ width: 200, height: 120, objectFit: 'cover', borderRadius: 10 }} />
              </div>
              <div style={{ flex: '1 1 45%', padding: '0 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 2 }}>{item.title}</div>
                <div style={{ display: 'flex', gap: 8, margin: '4px 0' }}>
                  <span style={{ background: '#232323', color: '#bdbdbd', borderRadius: 4, padding: '2px 8px', fontSize: 13 }}>{item.skin}</span>
                  <span style={{ background: '#232323', color: '#bdbdbd', borderRadius: 4, padding: '2px 8px', fontSize: 13 }}>{item.desc}</span>
                </div>                <div style={{ color: '#bdbdbd', fontSize: 14 }}>{item.date}</div>
                <div style={{ color: '#4e8cff', fontSize: 14, marginTop: 2, cursor: 'pointer' }}>{item.reviews}</div>
              </div>
              <div style={{ flex: '0 0 23%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', gap: 12 }}>
                <div style={{ color: '#bdbdbd', fontSize: 13 }}>Added on {item.added}</div>
                <div style={{ fontWeight: 600, fontSize: 22 }}>Rp {item.price.toLocaleString('id-ID')}</div>
                <button onClick={() => navigate('/payment-method', { state: { item } })} style={{ background: '#4e8cff', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 32px', fontWeight: 500, fontSize: 16, cursor: 'pointer' }}>Beli</button>
                <input type="checkbox" checked={item.checked} onChange={() => handleCheck(item.id)} style={{ width: 22, height: 22, accentColor: '#4e8cff', cursor: 'pointer' }} />
              </div>
            </div>
          ))}
          <div style={{ background: '#2c2c2c', borderRadius: 12, marginTop: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 36, boxShadow: '0 2px 8px #0002', width: '100%' }}>
            <div>
              <div style={{ color: '#fff', fontWeight: 500, fontSize: 20, marginBottom: 24 }}>Estimasi total</div>
              <button style={{ background: '#232c34', color: '#fff', border: 'none', borderRadius: 6, padding: '12px 32px', fontWeight: 500, fontSize: 16, cursor: 'pointer' }}>Lanjut Belanja</button>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 600, fontSize: 30, marginBottom: 8 }}>Rp {total.toLocaleString('id-ID')}</div>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', marginBottom: 24 }}>
                <span role="img" aria-label="delete" style={{ fontSize: 28, color: '#ff4e4e' }}>🗑️</span>
              </button>
              <br />
              <button onClick={() => navigate('/payment-method')} style={{ background: '#4e8cff', color: '#fff', border: 'none', borderRadius: 6, padding: '12px 32px', fontWeight: 500, fontSize: 16, cursor: 'pointer' }}>Pilih metode pembayaran</button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CartPage; 