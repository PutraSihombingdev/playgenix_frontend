import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../layouts/AdminLayout';
import { getCart, removeFromCart } from '../../services/cartService';
import { useAuth } from '../../hooks/useAuth';
import { message } from 'antd'; // Added message import
import { checkoutCart } from "../../services/transactionService";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { token } = useAuth();

  // Ambil data keranjang dari backend
  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await getCart(token);
      // Tambahkan checked: true pada setiap item
      const items = (Array.isArray(res) ? res : []).map(item => ({ ...item, checked: true }));
      setCartItems(items);
    } catch (err) {
      console.error('Gagal mengambil keranjang:', err);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchCart();
  }, [token]);

  const handleCheck = (id) => {
    setCartItems((prev) => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const handleRemoveFromCart = async (id) => {
    try {
      await removeFromCart(id, token);
      message.success('Produk berhasil dihapus dari keranjang');
      fetchCart(); // Refresh data
    } catch (err) {
      message.error('Gagal menghapus produk dari keranjang');
    }
  };

  const total = cartItems
    .filter(item => item.checked)
    .reduce((acc, item) => {
      const product = item.product || item;
      const price = Number(product.price);
      return acc + (isNaN(price) ? 0 : price);
    }, 0);

  // Setelah user klik "Checkout"
  const handleCheckout = async () => {
    const selectedItems = cartItems.filter(item => item.checked);
    if (selectedItems.length === 0) {
      alert("Pilih minimal satu produk untuk checkout!");
      return;
    }
    try {
      const res = await checkoutCart();
      const { transaction_id, amount } = res;
      navigate("/payments", { state: { transaction_id, amount } });
    } catch (err) {
      alert("Checkout gagal: " + (err?.response?.data?.message || "Unknown error"));
    }
  };

  // Tambahkan fungsi centang semua
  const allChecked = cartItems.length > 0 && cartItems.every(item => item.checked);
  const someChecked = cartItems.some(item => item.checked);
  const handleCheckAll = () => {
    setCartItems(prev => prev.map(item => ({ ...item, checked: !allChecked })));
  };

  if (loading) {
    return (
      <AdminLayout>
        <div style={{ background: '#232323', minHeight: '100vh', padding: '40px 0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ color: '#fff', fontSize: '18px' }}>Loading keranjang...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div style={{ background: '#232323', minHeight: '100vh', padding: '40px 0' }}>
        <div style={{ width: 900, margin: '0 auto', color: '#fff', display: 'flex', flexDirection: 'column', gap: 32 }}>
          {/* Tambahkan centang semua */}
          {cartItems.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
              <input
                type="checkbox"
                checked={allChecked}
                indeterminate={someChecked && !allChecked ? 'indeterminate' : undefined}
                onChange={handleCheckAll}
                style={{ width: 22, height: 22, accentColor: '#4e8cff', cursor: 'pointer', marginRight: 8 }}
              />
              <span style={{ fontWeight: 500, fontSize: 16 }}>Centang Semua</span>
            </div>
          )}
          
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <div style={{ fontSize: '24px', marginBottom: '16px' }}>Keranjang Kosong</div>
              <div style={{ color: '#bdbdbd', marginBottom: '32px' }}>Belum ada produk di keranjang Anda</div>
              <button
                onClick={() => navigate('/store-user')}
                style={{
                  background: '#4e8cff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                  padding: '12px 32px',
                  fontWeight: 500,
                  fontSize: 16,
                  cursor: 'pointer'
                }}
              >
                Mulai Belanja
              </button>
            </div>
          ) : (
            <>
              {cartItems.map((item) => {
                // Handle struktur data yang mungkin berbeda dari backend
                const product = item.product || item;
                const cartItemId = item.id;
                const productPrice = Number(product.price);
                
                return (
                  <div key={cartItemId} style={{ background: '#2c2c2c', borderRadius: 12, display: 'flex', alignItems: 'center', padding: 24, gap: 0, boxShadow: '0 2px 8px #0002', minHeight: 150 }}>
                    <div style={{ flex: '0 0 32%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <img 
                        src={product.image_url || product.image} 
                        alt={product.name || product.title} 
                        style={{ width: 200, height: 120, objectFit: 'cover', borderRadius: 10 }} 
                      />
                    </div>
                    <div style={{ flex: '1 1 45%', padding: '0 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 2 }}>{product.name || product.title}</div>
                                             <div style={{ display: 'flex', gap: 8, margin: '4px 0' }}>
                         <span style={{ background: '#232323', color: '#bdbdbd', borderRadius: 4, padding: '2px 8px', fontSize: 13 }}>
                           {product.description || product.desc || 'Akun Game'}
                         </span>
                       </div>
                      <div style={{ color: '#bdbdbd', fontSize: 14 }}>
                        Ditambahkan: {new Date(item.created_at || Date.now()).toLocaleDateString('id-ID')}
                      </div>
                    </div>
                    <div style={{ flex: '0 0 23%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', gap: 12 }}>
                                           <div style={{ color: '#bdbdbd', fontSize: 13 }}>
                       Akun Game
                     </div>
                      <div style={{ fontWeight: 600, fontSize: 22 }}>
                        Rp {(product.price || 0).toLocaleString('id-ID')}
                      </div>
                      <button 
                        onClick={() => navigate('/payments', { state: { transaction_id: cartItemId, amount: isNaN(productPrice) ? 0 : productPrice } })} 
                        style={{ background: '#4e8cff', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 32px', fontWeight: 500, fontSize: 16, cursor: 'pointer' }}
                      >
                        Beli
                      </button>
                      <input 
                        type="checkbox" 
                        checked={item.checked !== false} 
                        onChange={() => handleCheck(cartItemId)} 
                        style={{ width: 22, height: 22, accentColor: '#4e8cff', cursor: 'pointer' }} 
                      />
                      <button 
                        onClick={() => handleRemoveFromCart(cartItemId)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', marginTop: 8 }}
                      >
                        <span role="img" aria-label="delete" style={{ fontSize: 20, color: '#ff4e4e' }}>🗑️</span>
                      </button>
                    </div>
                  </div>
                );
              })}
              
              <div style={{ background: '#2c2c2c', borderRadius: 12, marginTop: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 36, boxShadow: '0 2px 8px #0002', width: '100%' }}>
                <div>
                  <div style={{ color: '#fff', fontWeight: 500, fontSize: 20, marginBottom: 24 }}>Estimasi total</div>
                  <button
                    style={{
                      background: '#232c34',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 6,
                      padding: '12px 32px',
                      fontWeight: 500,
                      fontSize: 16,
                      cursor: 'pointer'
                    }}
                    onClick={() => navigate('/store-user')}
                  >
                    Lanjut Belanja
                  </button>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 600, fontSize: 30, marginBottom: 8 }}>
                    Rp {Number(total).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <button 
                    onClick={handleCheckout}
                    disabled={cartItems.filter(item => item.checked).length === 0}
                    style={{
                      background: cartItems.filter(item => item.checked).length === 0 ? '#888' : '#4e8cff',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 6,
                      padding: '12px 32px',
                      fontWeight: 500,
                      fontSize: 16,
                      cursor: cartItems.filter(item => item.checked).length === 0 ? 'not-allowed' : 'pointer'
                    }}
                  >
                    Pilih metode pembayaran
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default CartPage; 