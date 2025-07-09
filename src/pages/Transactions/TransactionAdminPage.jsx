import React, { useEffect, useState } from "react";
import transactionService from "../../services/transactionService";
import { useNavigate } from "react-router-dom";
import Sidebar from '../../components/Sidebar';

// CSS untuk animasi loading
const loadingStyle = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = loadingStyle;
document.head.appendChild(style);

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

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'paid', label: 'Lunas' },
  { value: 'failed', label: 'Gagal' },
];

const TransactionAdminPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      const data = await transactionService.getTransactionList(token);
      console.log('Transaction data:', data);
      setTransactions(data);
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setError(err.response?.data?.error || 'Gagal memuat data transaksi');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = async (id, status) => {
    console.log('Attempting to update transaction:', { id, status });
    setUpdatingId(id);
    try {
      await transactionService.updateTransactionStatus(id, status);
      console.log('Status updated successfully');
      
      // Update local state
      setTransactions(prev => 
        prev.map(trx => 
          trx.id === id ? { ...trx, status } : trx
        )
      );
      
      // Update selected transaction jika sedang dilihat
      if (selectedTransaction && selectedTransaction.id === id) {
        setSelectedTransaction(prev => ({ ...prev, status }));
      }
      
      alert('Status berhasil diupdate!');
    } catch (err) {
      console.error('Update error details:', err);
      let errorMessage = 'Gagal update status';
      
      if (err.response) {
        if (err.response.status === 500) {
          const errorData = err.response.data;
          if (errorData && errorData.error) {
            if (errorData.error.includes('Data truncated')) {
              errorMessage = 'Status tidak valid untuk database. Silakan hubungi administrator.';
            } else if (errorData.error.includes('Database error')) {
              errorMessage = 'Error database. Periksa log backend untuk detail.';
            } else {
              errorMessage = `Server error: ${errorData.error}`;
            }
          } else {
            errorMessage = 'Server error (500). Periksa log backend untuk detail.';
          }
        } else if (err.response.status === 404) {
          errorMessage = 'Transaksi tidak ditemukan';
        } else if (err.response.status === 401) {
          errorMessage = 'Token tidak valid. Silakan login ulang.';
        } else if (err.response.status === 403) {
          errorMessage = 'Akses ditolak. Hanya admin yang dapat mengubah status.';
        } else if (err.response.status === 400) {
          errorMessage = `Data tidak valid: ${err.response.data?.error || 'Unknown error'}`;
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      alert(errorMessage);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus transaksi ini? Tindakan ini tidak dapat dibatalkan.')) {
      return;
    }
    
    try {
      await transactionService.deleteTransaction(id);
      console.log('Transaction deleted successfully');
      
      // Update local state
      setTransactions(prev => prev.filter(trx => trx.id !== id));
      
      // Clear selected transaction jika yang dihapus sedang dipilih
      if (selectedTransaction && selectedTransaction.id === id) {
        setSelectedTransaction(null);
      }
      
      alert('Transaksi berhasil dihapus!');
    } catch (err) {
      console.error('Delete error:', err);
      let errorMessage = 'Gagal menghapus transaksi';
      
      if (err.response) {
        if (err.response.status === 404) {
          errorMessage = 'Transaksi tidak ditemukan';
        } else if (err.response.status === 401) {
          errorMessage = 'Token tidak valid. Silakan login ulang.';
        } else if (err.response.status === 403) {
          errorMessage = 'Akses ditolak. Hanya admin yang dapat menghapus transaksi.';
        } else if (err.response.status === 500) {
          errorMessage = 'Server error. Periksa log backend untuk detail.';
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      alert(errorMessage);
    }
  };

  const handleViewDetail = async (transaction) => {
    setSelectedTransaction(transaction);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#181818' }}>
      <div style={{ width: 220, background: '#181818', minHeight: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 100 }}>
        <Sidebar />
      </div>
      <div style={{ flex: 1, maxWidth: 1200, margin: '40px auto', padding: '0 20px', marginLeft: 220 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {/* Daftar Transaksi */}
          <div style={{ background: '#232323', borderRadius: 12, padding: 24, color: '#fff', boxShadow: '0 2px 16px #0002' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ margin: 0 }}>Daftar Transaksi</h2>
              <button 
                onClick={fetchData}
                style={{ 
                  padding: '8px 16px', 
                  background: '#51cf66', 
                  border: 'none', 
                  borderRadius: 6, 
                  color: '#fff', 
                  cursor: 'pointer',
                  fontSize: 14
                }}
              >
                🔄 Refresh
              </button>
            </div>
            {transactions.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#ccc' }}>Belum ada transaksi</p>
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
                      {statusBadge(trx.status)}
                    </div>
                    <p style={{ margin: 0, color: '#ccc', fontSize: 14 }}>{trx.email}</p>
                    <p style={{ margin: '4px 0', fontWeight: 'bold' }}>Rp{Number(trx.total).toLocaleString('id-ID')}</p>
                    <p style={{ margin: 0, color: '#999', fontSize: 12 }}>
                      {trx.created_at ? new Date(trx.created_at).toLocaleDateString('id-ID') : '-'}
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
                      <strong>Email:</strong> {selectedTransaction.email || '-'}
                    </div>
                    <div>
                      <strong>Total:</strong> Rp{Number(selectedTransaction.total).toLocaleString('id-ID')}
                    </div>
                    <div>
                      <strong>Deskripsi Akun:</strong> {selectedTransaction.account_desc || '-'}
                    </div>
                    <div>
                      <strong>Status:</strong> {statusBadge(selectedTransaction.status)}
                    </div>
                    <div>
                      <strong>Tanggal:</strong> {selectedTransaction.created_at ? new Date(selectedTransaction.created_at).toLocaleDateString('id-ID') : '-'}
                    </div>
                  </div>
                </div>

                <div style={{ background: '#2a2a2a', borderRadius: 8, padding: 20, marginBottom: 20 }}>
                  <h3 style={{ marginBottom: 16 }}>Bukti Pembayaran</h3>
                  {selectedTransaction.bukti_pembayaran ? (
                    <div>
                      <img 
                        src={getBuktiUrl(selectedTransaction.bukti_pembayaran)} 
                        alt="Bukti Pembayaran" 
                        style={{ 
                          maxWidth: '100%', 
                          maxHeight: 200, 
                          borderRadius: 8,
                          border: '2px solid #444'
                        }} 
                      />
                      <div style={{ marginTop: 12 }}>
                        <a 
                          href={getBuktiUrl(selectedTransaction.bukti_pembayaran)} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{ color: '#51cf66', textDecoration: 'underline' }}
                        >
                          Lihat Gambar Penuh
                        </a>
                      </div>
                    </div>
                  ) : (
                    <p style={{ color: '#ccc' }}>Belum ada bukti pembayaran</p>
                  )}
                </div>

                <div style={{ background: '#2a2a2a', borderRadius: 8, padding: 20 }}>
                  <h3 style={{ marginBottom: 16 }}>Update Status</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                    <select
                      value={selectedTransaction.status || 'pending'}
                      disabled={updatingId === selectedTransaction.id}
                      onChange={e => handleStatusChange(selectedTransaction.id, e.target.value)}
                      style={{
                        ...badgeStyle,
                        background: selectedTransaction.status === 'pending' ? '#ffe066' : selectedTransaction.status === 'paid' ? '#51cf66' : '#ff6b6b',
                        color: selectedTransaction.status === 'pending' ? '#333' : '#fff',
                        border: 'none',
                        outline: 'none',
                        minWidth: 120,
                        padding: '8px 12px',
                        cursor: updatingId === selectedTransaction.id ? 'not-allowed' : 'pointer',
                        opacity: updatingId === selectedTransaction.id ? 0.6 : 1
                      }}
                    >
                      {statusOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    {updatingId === selectedTransaction.id && (
                      <span style={{ color: '#51cf66', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ width: 16, height: 16, border: '2px solid #51cf66', borderTop: '2px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></span>
                        Mengupdate...
                      </span>
                    )}
                  </div>
                  
                  <div style={{ display: 'flex', gap: 12 }}>
                    <button 
                      onClick={() => handleDelete(selectedTransaction.id)}
                      disabled={updatingId === selectedTransaction.id}
                      style={{ 
                        padding: '8px 16px', 
                        background: '#ff6b6b', 
                        border: 'none', 
                        borderRadius: 6, 
                        color: '#fff', 
                        cursor: updatingId === selectedTransaction.id ? 'not-allowed' : 'pointer',
                        opacity: updatingId === selectedTransaction.id ? 0.6 : 1
                      }}
                    >
                      🗑️ Hapus Transaksi
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', color: '#ccc', padding: '40px 20px' }}>
                <p>Pilih transaksi untuk melihat detail</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionAdminPage; 