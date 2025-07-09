import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import transactionService from "../../services/transactionService";
import { useAuth } from "../../hooks/useAuth";

const UploadBuktiPage = () => {
  const { transactionId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    amount: '',
    bukti: null
  });

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const data = await transactionService.getTransactionDetail(transactionId, token);
        setTransaction(data);
        setFormData(prev => ({ ...prev, amount: data.total }));
      } catch (err) {
        console.error('Error fetching transaction:', err);
        setError(err.response?.data?.error || 'Gagal memuat data transaksi');
      } finally {
        setLoading(false);
      }
    };

    if (transactionId) {
      fetchTransaction();
    }
  }, [transactionId]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validasi file
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.type)) {
        alert('File harus berupa gambar (JPG, JPEG, PNG)');
        return;
      }

      if (file.size > maxSize) {
        alert('Ukuran file maksimal 5MB');
        return;
      }

      setFormData(prev => ({ ...prev, bukti: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.bukti) {
      alert('Pilih file bukti transfer');
      return;
    }

    if (!formData.amount || formData.amount <= 0) {
      alert('Masukkan jumlah pembayaran yang valid');
      return;
    }

    setUploading(true);
    try {
      await transactionService.uploadBuktiTransfer(
        transactionId,
        formData.amount,
        formData.bukti
      );
      
      alert('Bukti transfer berhasil diupload!');
      navigate('/my-transactions');
    } catch (err) {
      console.error('Upload error:', err);
      let errorMessage = 'Gagal upload bukti transfer';
      
      if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      alert(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ maxWidth: 600, margin: '40px auto', textAlign: 'center', color: '#fff' }}>
        <p>Memuat data transaksi...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ maxWidth: 600, margin: '40px auto', textAlign: 'center', color: '#fff' }}>
        <p style={{ color: '#ff6b6b' }}>Error: {error}</p>
        <button onClick={() => navigate('/my-transactions')} style={{ marginTop: 16, padding: '8px 16px' }}>
          Kembali ke Transaksi Saya
        </button>
      </div>
    );
  }

  if (!transaction) {
    return (
      <div style={{ maxWidth: 600, margin: '40px auto', textAlign: 'center', color: '#fff' }}>
        <p>Transaksi tidak ditemukan</p>
        <button onClick={() => navigate('/my-transactions')} style={{ marginTop: 16, padding: '8px 16px' }}>
          Kembali ke Transaksi Saya
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', background: '#232323', borderRadius: 12, padding: 32, color: '#fff', boxShadow: '0 2px 16px #0002' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2>Upload Bukti Transfer</h2>
        <button 
          onClick={() => navigate('/my-transactions')}
          style={{ padding: '8px 16px', background: '#444', border: 'none', borderRadius: 6, color: '#fff', cursor: 'pointer' }}
        >
          Kembali
        </button>
      </div>

      <div style={{ background: '#2a2a2a', borderRadius: 8, padding: 24, marginBottom: 24 }}>
        <h3 style={{ marginBottom: 16 }}>Informasi Transaksi</h3>
        <div style={{ display: 'grid', gap: 12 }}>
          <div>
            <strong>ID Transaksi:</strong> #{transaction.id}
          </div>
          <div>
            <strong>Total:</strong> Rp{Number(transaction.total).toLocaleString('id-ID')}
          </div>
          <div>
            <strong>Status:</strong> {transaction.status}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ background: '#2a2a2a', borderRadius: 8, padding: 24 }}>
        <h3 style={{ marginBottom: 16 }}>Upload Bukti Transfer</h3>
        
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 8 }}>
            <strong>Jumlah Pembayaran (Rp):</strong>
          </label>
          <input
            type="number"
            value={formData.amount}
            onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
            placeholder="Masukkan jumlah pembayaran"
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: 6,
              border: '1px solid #444',
              background: '#333',
              color: '#fff',
              fontSize: 16
            }}
            required
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 8 }}>
            <strong>File Bukti Transfer:</strong>
          </label>
          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png"
            onChange={handleFileChange}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: 6,
              border: '1px solid #444',
              background: '#333',
              color: '#fff',
              fontSize: 16
            }}
            required
          />
          <p style={{ marginTop: 8, fontSize: 14, color: '#ccc' }}>
            Format: JPG, JPEG, PNG (maksimal 5MB)
          </p>
        </div>

        {formData.bukti && (
          <div style={{ marginBottom: 20 }}>
            <strong>Preview:</strong>
            <div style={{ marginTop: 8 }}>
              <img
                src={URL.createObjectURL(formData.bukti)}
                alt="Preview"
                style={{
                  maxWidth: '100%',
                  maxHeight: 200,
                  borderRadius: 6,
                  border: '1px solid #555'
                }}
              />
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: 12 }}>
          <button
            type="submit"
            disabled={uploading}
            style={{
              padding: '12px 24px',
              background: uploading ? '#666' : '#51cf66',
              border: 'none',
              borderRadius: 6,
              color: '#fff',
              cursor: uploading ? 'not-allowed' : 'pointer',
              fontSize: 16,
              flex: 1
            }}
          >
            {uploading ? 'Mengupload...' : 'Upload Bukti Transfer'}
          </button>
          
          <button
            type="button"
            onClick={() => navigate('/my-transactions')}
            style={{
              padding: '12px 24px',
              background: '#444',
              border: 'none',
              borderRadius: 6,
              color: '#fff',
              cursor: 'pointer',
              fontSize: 16
            }}
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadBuktiPage; 