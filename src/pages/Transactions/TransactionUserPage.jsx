import React, { useEffect, useState } from "react";
import transactionService from "../../services/transactionService";
import { useNavigate } from "react-router-dom";
import Sidebar from '../../components/Sidebar';

function getBuktiUrl(bukti_transfer) {
  if (!bukti_transfer) return null;
  if (bukti_transfer.startsWith('http')) return bukti_transfer;
  return `http://localhost:5000/uploads/payments/${bukti_transfer.split('/').pop()}`;
}

const badgeStyle = {
  borderRadius: 16,
  padding: '4px 18px',
  fontWeight: 600,
  fontSize: 15,
  display: 'inline-block',
  minWidth: 70,
  textAlign: 'center',
};

const statusBadge = (status) => {
  if (status === 'pending') return <span style={{ ...badgeStyle, background: '#ffe066', color: '#333' }}>Pending</span>;
  if (status === 'paid') return <span style={{ ...badgeStyle, background: '#51cf66', color: '#fff' }}>Lunas</span>;
  if (status === 'failed') return <span style={{ ...badgeStyle, background: '#ff6b6b', color: '#fff' }}>Gagal</span>;
  return <span style={{ ...badgeStyle, background: '#ccc', color: '#333' }}>{status}</span>;
};

const TransactionUserPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      const data = await transactionService.getMyTransactions(token);
      console.log('My transactions:', data);
      setTransactions(data);
    } catch (err) {
      console.error('Error fetching my transactions:', err);
      setError(err.response?.data?.error || 'Gagal memuat data transaksi');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleViewDetail = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const getStatus = trx => trx.payment?.status || trx.status;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#181818' }}>
      <div style={{ width: 220, background: '#181818', minHeight: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 100 }}>
        <Sidebar />
      </div>
      <div style={{ flex: 1, maxWidth: 1200, margin: '40px auto', padding: '0 20px', marginLeft: 220 }}>
        {loading ? (
          <div style={{ textAlign: 'center', color: '#fff', marginTop: 80 }}>
            <p>Memuat transaksi Anda...</p>
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', color: '#fff', marginTop: 80 }}>
            <p style={{ color: '#ff6b6b' }}>Error: {error}</p>
            <button onClick={fetchData} style={{ marginTop: 16, padding: '8px 16px' }}>
              Coba Lagi
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {/* Daftar Transaksi */}
            <div style={{ background: '#232323', borderRadius: 12, padding: 24, color: '#fff', boxShadow: '0 2px 16px #0002' }}>
              <h2 style={{ marginBottom: 24 }}>Transaksi Saya</h2>
              {transactions.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#ccc' }}>
                  <p>Anda belum memiliki transaksi</p>
                  <button 
                    onClick={() => navigate('/store')}
                    style={{ 
                      marginTop: 16, 
                      padding: '12px 24px', 
                      background: '#51cf66', 
                      border: 'none', 
                      borderRadius: 6, 
                      color: '#fff', 
                      cursor: 'pointer',
                      fontSize: 16
                    }}
                  >
                    Mulai Belanja
                  </button>
                </div>
              ) : (
                <div style={{ display: 'grid', gap: 12 }}>
                  {transactions.map((trx) => (
                    <div 
                      key={trx.id} 
                      style={{ 
                        background: selectedTransaction?.id === trx.id ? '#2a2a2a' : '#1a1a1a',
                        borderRadius: 8, 
                        padding: 16, 
                        border: selectedTransaction?.id === trx.id ? '2px solid #51cf66' : '1px solid #444',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onClick={() => handleViewDetail(trx)}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <h4 style={{ margin: 0 }}>#{trx.id}</h4>
                        {statusBadge(getStatus(trx))}
                      </div>
                      <p style={{ margin: '4px 0', fontWeight: 'bold' }}>Rp{Number(trx.total).toLocaleString('id-ID')}</p>
                      <p style={{ margin: 0, color: '#999', fontSize: 12 }}>
                        {trx.created_at ? new Date(trx.created_at).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : '-'}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Detail Transaksi */}
            <div style={{ background: '#232323', borderRadius: 12, padding: 24, color: '#fff', boxShadow: '0 2px 16px #0002' }}>
              {selectedTransaction ? (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <h2>Detail Transaksi #{selectedTransaction.id}</h2>
                    <button 
                      onClick={() => setSelectedTransaction(null)}
                      style={{ padding: '8px 16px', background: '#444', border: 'none', borderRadius: 6, color: '#fff', cursor: 'pointer' }}
                    >
                      Tutup
                    </button>
                  </div>

                  <div style={{ background: '#2a2a2a', borderRadius: 8, padding: 20, marginBottom: 20 }}>
                    <h3 style={{ marginBottom: 16 }}>Informasi Transaksi</h3>
                    <div style={{ display: 'grid', gap: 12 }}>
                      <div>
                        <strong>Total:</strong> Rp{Number(selectedTransaction.total).toLocaleString('id-ID')}
                      </div>
                      <div>
                        <strong>Deskripsi Produk:</strong> {selectedTransaction.description || '-'}
                      </div>
                      <div>
                        <strong>Status:</strong> {statusBadge(getStatus(selectedTransaction))}
                      </div>
                      <div>
                        <strong>Tanggal:</strong> {selectedTransaction.created_at ? new Date(selectedTransaction.created_at).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : '-'}
                      </div>
                    </div>
                  </div>

                  {selectedTransaction.payment && (
                    <div style={{ background: '#2a2a2a', borderRadius: 8, padding: 20, marginBottom: 20 }}>
                      <h3 style={{ marginBottom: 16 }}>Informasi Pembayaran</h3>
                      <div style={{ display: 'grid', gap: 12 }}>
                        <div>
                          <strong>Metode Pembayaran:</strong> {selectedTransaction.payment.payment_method || '-'}
                        </div>
                        <div>
                          <strong>Status Pembayaran:</strong> {statusBadge(selectedTransaction.payment.status)}
                        </div>
                        {selectedTransaction.payment.bukti_transfer && (
                          <div>
                            <strong>Bukti Transfer:</strong>
                            <div style={{ marginTop: 8 }}>
                              <img 
                                src={getBuktiUrl(selectedTransaction.payment.bukti_transfer)} 
                                alt="Bukti Transfer" 
                                style={{ 
                                  maxWidth: '100%', 
                                  maxHeight: 200, 
                                  borderRadius: 6,
                                  border: '1px solid #555'
                                }} 
                              />
                              <div style={{ marginTop: 8 }}>
                                <a 
                                  href={getBuktiUrl(selectedTransaction.payment.bukti_transfer)} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  style={{ color: '#51cf66', textDecoration: 'underline' }}
                                >
                                  Lihat Gambar Penuh
                                </a>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  
                </>
              ) : (
                <div style={{ textAlign: 'center', color: '#ccc', padding: '40px 20px' }}>
                  <p>Pilih transaksi untuk melihat detail</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionUserPage; 