import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import paymentService from "../../services/paymentService";
import { message, Button, Card, Alert, Typography, Tooltip, Space } from "antd";
import { ArrowLeftOutlined, UploadOutlined, CopyOutlined, BankOutlined, FileImageOutlined } from '@ant-design/icons';
import { removeFromCart } from '../../services/cartService';
import { useAuth } from '../../hooks/useAuth';

const { Title, Text } = Typography;

const PaymentMethodPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [bukti, setBukti] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { token } = useAuth();

  const rekening = "1234567890";
  const bankName = "Bank ABC";

  const handleUpload = (e) => {
    const file = e.target.files[0];
    setBukti(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(rekening);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bukti) return message.error("Pilih file bukti pembayaran!");
    setUploading(true);
    paymentService.uploadBukti({
      amount: state.amount,
      transaction_id: state.transaction_id,
      bukti: bukti
    })
      .then(async () => {
        message.success("Bukti pembayaran berhasil diupload! Pemesanan Anda sedang diproses, mohon tunggu konfirmasi dari admin.");
        // Jika pembayaran satu produk, hapus produk itu dari keranjang
        if (state.transaction_id) {
          try {
            await removeFromCart(state.transaction_id, token);
          } catch (err) {
            // Optional: tampilkan pesan jika gagal menghapus dari keranjang
          }
        }
        setTimeout(() => {
          window.location.href = '/transactions';
        }, 2000);
      })
      .catch((err) => {
        message.error("Gagal upload bukti pembayaran");
        console.log(err?.response?.data || err.message);
      })
      .finally(() => setUploading(false));
  };

  return (
    <div className="auth-bg" style={{ minHeight: '100vh', background: '#18181c', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <Card
        style={{
          maxWidth: 440,
          width: '100%',
          borderRadius: 20,
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          background: 'rgba(34, 40, 60, 0.85)',
          border: '1.5px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(8px)',
        }}
        bodyStyle={{ padding: 32, borderRadius: 20 }}
      >
        <Space direction="vertical" style={{ width: '100%' }} size={0}>
          <Button type="link" icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} style={{ color: '#4e8cff', marginBottom: 8, padding: 0, fontWeight: 500 }}>
            Kembali
          </Button>
          <div style={{ textAlign: 'center', marginBottom: 10 }}>
            <FileImageOutlined style={{ fontSize: 38, color: '#4e8cff', marginBottom: 4 }} />
            <Title level={2} style={{ color: '#fff', margin: 0, fontWeight: 700, letterSpacing: 1 }}>Pembayaran</Title>
            <Text style={{ color: '#bbb', fontSize: 15 }}>Selesaikan pembayaran Anda dengan mengikuti instruksi di bawah ini.</Text>
          </div>
          <div style={{ background: 'rgba(44, 62, 80, 0.7)', borderRadius: 12, padding: 18, marginBottom: 18, boxShadow: '0 2px 8px #0002' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <BankOutlined style={{ fontSize: 22, color: '#4e8cff' }} />
              <Text strong style={{ color: '#fff', fontSize: 16 }}>{bankName}</Text>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Text copyable={false} style={{ color: '#fff', fontSize: 18, letterSpacing: 1 }}>{rekening}</Text>
              <Tooltip title={copied ? 'Disalin!' : 'Salin nomor rekening'}>
                <Button icon={<CopyOutlined />} size="small" onClick={handleCopy} style={{ color: copied ? '#51cf66' : '#4e8cff', border: 'none', background: 'none' }} />
              </Tooltip>
            </div>
          </div>
          <Alert
            type="info"
            showIcon
            style={{ background: '#1a2233', color: '#fff', border: 'none', marginBottom: 18 }}
            message={<span>Pastikan nominal transfer <b>sama persis</b> dengan total pembayaran di bawah.</span>}
          />
          <div style={{ marginBottom: 18 }}>
            <Text style={{ color: '#bbb', fontSize: 15 }}>Total Pembayaran</Text>
            <div style={{
              background: 'linear-gradient(90deg, #4f8cff 0%, #2353e6 100%)',
              color: '#fff',
              fontWeight: 700,
              fontSize: 24,
              borderRadius: 10,
              padding: '12px 0',
              marginTop: 4,
              textAlign: 'center',
              letterSpacing: 1.5,
              boxShadow: '0 2px 8px #4e8cff33',
            }}>
              {state?.amount ? `Rp ${Number(state.amount).toLocaleString('id-ID')}` : '-'}
            </div>
          </div>
          <div style={{ marginBottom: 18 }}>
            <Title level={5} style={{ color: '#fff', marginBottom: 8, fontWeight: 600 }}>Langkah Pembayaran:</Title>
            <ol style={{ color: '#bbb', fontSize: 15, marginLeft: 18, marginBottom: 0 }}>
              <li>Transfer ke rekening di atas sesuai nominal.</li>
              <li>Upload bukti pembayaran di bawah.</li>
              <li>Tunggu verifikasi dari admin.</li>
            </ol>
          </div>
          <form onSubmit={handleSubmit} style={{ marginBottom: 0 }}>
            <div className="auth-field" style={{ marginBottom: 16 }}>
              <label htmlFor="bukti" style={{ color: '#fff', fontWeight: 500 }}>Upload Bukti Pembayaran (gambar)</label>
              <input id="bukti" type="file" accept="image/*" onChange={handleUpload} required style={{ background: '#181818', color: '#fff', border: '1px solid #444', borderRadius: 8, padding: '10px 12px', fontSize: 16 }} />
              {preview && (
                <div style={{ marginTop: 16, textAlign: 'center' }}>
                  <img src={preview} alt="Preview Bukti" style={{ maxWidth: 260, maxHeight: 260, borderRadius: 12, boxShadow: '0 2px 12px #0008', border: '1.5px solid #4e8cff' }} />
                </div>
              )}
            </div>
            <Button
              type="primary"
              htmlType="submit"
              icon={<UploadOutlined />}
              loading={uploading}
              block
              size="large"
              style={{ background: 'linear-gradient(90deg, #4f8cff 0%, #2353e6 100%)', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 18, marginTop: 8, boxShadow: '0 2px 8px #4e8cff33' }}
            >
              {uploading ? "Mengupload..." : "Upload Bukti Pembayaran"}
            </Button>
          </form>
        </Space>
      </Card>
    </div>
  );
};

export default PaymentMethodPage; 