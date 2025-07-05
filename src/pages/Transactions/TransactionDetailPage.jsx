import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeftOutlined, 
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  CloseCircleOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  ShoppingCartOutlined,
  CreditCardOutlined,
  CalendarOutlined,
  PrinterOutlined,
  DownloadOutlined,
  EditOutlined
} from '@ant-design/icons';
import AdminLayout from '../../layouts/AdminLayout';

const TransactionDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data - in real app this would come from API
  const mockTransaction = {
    id: 'TRX-001',
    userName: 'Ahmad Rizki',
    gameTitle: 'Mobile Legend',
    itemName: 'Skin Legend KOF',
    amount: 500000,
    paymentMethod: 'DANA',
    status: 'completed',
    date: '2024-01-15T10:30:00',
    orderNumber: 'ORD-2024-001',
    userId: 'USR-001',
    email: 'ahmad.rizki@email.com',
    phone: '+6281234567890',
    gameId: 'ML-123456',
    serverId: 'Server 12345',
    paymentReference: 'DANA-2024-001-ABC123',
    notes: 'Pembayaran berhasil diproses dengan cepat. Customer puas dengan layanan.',
    adminNotes: 'Transaksi diproses oleh admin pada 15 Januari 2024',
    completedDate: '2024-01-15T10:35:00'
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTransaction(mockTransaction);
      setLoading(false);
    }, 500);
  }, [id]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      case 'pending':
        return <ClockCircleOutlined style={{ color: '#faad14' }} />;
      case 'processing':
        return <ClockCircleOutlined style={{ color: '#1890ff' }} />;
      case 'failed':
        return <CloseCircleOutlined style={{ color: '#ff4d4f' }} />;
      default:
        return <ExclamationCircleOutlined style={{ color: '#faad14' }} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return '#52c41a';
      case 'pending':
        return '#faad14';
      case 'processing':
        return '#1890ff';
      case 'failed':
        return '#ff4d4f';
      default:
        return '#faad14';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Selesai';
      case 'pending':
        return 'Menunggu Pembayaran';
      case 'processing':
        return 'Sedang Diproses';
      case 'failed':
        return 'Gagal';
      default:
        return 'Tidak Diketahui';
    }
  };

  const handleStatusChange = (newStatus) => {
    setTransaction(prev => ({
      ...prev,
      status: newStatus,
      completedDate: newStatus === 'completed' ? new Date().toISOString() : prev.completedDate
    }));
  };

  if (loading) {
    return (
      <AdminLayout>
        <div style={{ background: '#232323', minHeight: '100vh', padding: '40px 0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ color: '#fff', fontSize: 18 }}>Loading...</div>
        </div>
      </AdminLayout>
    );
  }

  if (!transaction) {
    return (
      <AdminLayout>
        <div style={{ background: '#232323', minHeight: '100vh', padding: '40px 0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ color: '#fff', fontSize: 18 }}>Transaksi tidak ditemukan</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div style={{ background: '#232323', minHeight: '100vh', padding: '40px 0' }}>
        <div style={{ width: 1200, margin: '0 auto', color: '#fff', display: 'flex', flexDirection: 'column', gap: 32 }}>
          
          {/* Header */}
          <div style={{ background: '#2c2c2c', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px #0002' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <button 
                  onClick={() => navigate('/transactions')}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: '#4e8cff', 
                    cursor: 'pointer',
                    fontSize: 18
                  }}
                >
                  <ArrowLeftOutlined />
                </button>
                <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>Detail Transaksi</h1>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button style={{ 
                  background: '#232c34', 
                  color: '#fff', 
                  border: 'none', 
                  borderRadius: 8, 
                  padding: '10px 16px', 
                  fontWeight: 600, 
                  fontSize: 14, 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}>
                  <PrinterOutlined />
                  Print
                </button>
                <button style={{ 
                  background: '#232c34', 
                  color: '#fff', 
                  border: 'none', 
                  borderRadius: 8, 
                  padding: '10px 16px', 
                  fontWeight: 600, 
                  fontSize: 14, 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}>
                  <DownloadOutlined />
                  Export
                </button>
                <button style={{ 
                  background: '#4e8cff', 
                  color: '#fff', 
                  border: 'none', 
                  borderRadius: 8, 
                  padding: '10px 16px', 
                  fontWeight: 600, 
                  fontSize: 14, 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}>
                  <EditOutlined />
                  Edit
                </button>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 24, fontWeight: 700, color: '#4e8cff', marginBottom: 8 }}>
                  {transaction.id}
                </div>
                <div style={{ color: '#bdbdbd', fontSize: 14 }}>
                  Order: {transaction.orderNumber}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>
                  Rp {transaction.amount.toLocaleString('id-ID')}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end' }}>
                  {getStatusIcon(transaction.status)}
                  <span style={{ 
                    color: getStatusColor(transaction.status),
                    fontWeight: 600,
                    fontSize: 16
                  }}>
                    {getStatusText(transaction.status)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 32 }}>
            {/* Left Column */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
              
              {/* Customer Information */}
              <div style={{ background: '#2c2c2c', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px #0002' }}>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <UserOutlined style={{ color: '#4e8cff' }} />
                  Informasi Pelanggan
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#bdbdbd' }}>Nama:</span>
                    <span style={{ fontWeight: 600 }}>{transaction.userName}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#bdbdbd' }}>Email:</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <MailOutlined style={{ color: '#4e8cff' }} />
                      {transaction.email}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#bdbdbd' }}>Telepon:</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <PhoneOutlined style={{ color: '#4e8cff' }} />
                      {transaction.phone}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#bdbdbd' }}>User ID:</span>
                    <span style={{ color: '#4e8cff', fontWeight: 600 }}>{transaction.userId}</span>
                  </div>
                </div>
              </div>

              {/* Order Information */}
              <div style={{ background: '#2c2c2c', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px #0002' }}>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <ShoppingCartOutlined style={{ color: '#4e8cff' }} />
                  Informasi Pesanan
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#bdbdbd' }}>Game:</span>
                    <span style={{ 
                      background: '#232323', 
                      color: '#4e8cff', 
                      borderRadius: 4, 
                      padding: '4px 8px', 
                      fontSize: 12,
                      fontWeight: 500
                    }}>
                      {transaction.gameTitle}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#bdbdbd' }}>Item:</span>
                    <span style={{ fontWeight: 600 }}>{transaction.itemName}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#bdbdbd' }}>Game ID:</span>
                    <span style={{ color: '#4e8cff', fontWeight: 600 }}>{transaction.gameId}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#bdbdbd' }}>Server ID:</span>
                    <span style={{ color: '#4e8cff', fontWeight: 600 }}>{transaction.serverId}</span>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div style={{ background: '#2c2c2c', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px #0002' }}>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <CreditCardOutlined style={{ color: '#4e8cff' }} />
                  Informasi Pembayaran
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#bdbdbd' }}>Metode Pembayaran:</span>
                    <span style={{ 
                      background: '#232323', 
                      color: '#bdbdbd', 
                      borderRadius: 4, 
                      padding: '4px 8px', 
                      fontSize: 12,
                      fontWeight: 500
                    }}>
                      {transaction.paymentMethod}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#bdbdbd' }}>Referensi:</span>
                    <span style={{ color: '#4e8cff', fontWeight: 600, fontSize: 12 }}>
                      {transaction.paymentReference}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#bdbdbd' }}>Total:</span>
                    <span style={{ fontSize: 20, fontWeight: 700 }}>
                      Rp {transaction.amount.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
              
              {/* Status Management */}
              <div style={{ background: '#2c2c2c', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px #0002' }}>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20 }}>Kelola Status</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <button 
                    onClick={() => handleStatusChange('pending')}
                    style={{ 
                      background: transaction.status === 'pending' ? '#faad14' : '#444', 
                      color: '#fff', 
                      border: 'none', 
                      borderRadius: 8, 
                      padding: '12px 16px', 
                      fontWeight: 600, 
                      fontSize: 14, 
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8
                    }}
                  >
                    <ClockCircleOutlined />
                    Menunggu Pembayaran
                  </button>
                  <button 
                    onClick={() => handleStatusChange('processing')}
                    style={{ 
                      background: transaction.status === 'processing' ? '#1890ff' : '#444', 
                      color: '#fff', 
                      border: 'none', 
                      borderRadius: 8, 
                      padding: '12px 16px', 
                      fontWeight: 600, 
                      fontSize: 14, 
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8
                    }}
                  >
                    <ClockCircleOutlined />
                    Sedang Diproses
                  </button>
                  <button 
                    onClick={() => handleStatusChange('completed')}
                    style={{ 
                      background: transaction.status === 'completed' ? '#52c41a' : '#444', 
                      color: '#fff', 
                      border: 'none', 
                      borderRadius: 8, 
                      padding: '12px 16px', 
                      fontWeight: 600, 
                      fontSize: 14, 
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8
                    }}
                  >
                    <CheckCircleOutlined />
                    Selesai
                  </button>
                  <button 
                    onClick={() => handleStatusChange('failed')}
                    style={{ 
                      background: transaction.status === 'failed' ? '#ff4d4f' : '#444', 
                      color: '#fff', 
                      border: 'none', 
                      borderRadius: 8, 
                      padding: '12px 16px', 
                      fontWeight: 600, 
                      fontSize: 14, 
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8
                    }}
                  >
                    <CloseCircleOutlined />
                    Gagal
                  </button>
                </div>
              </div>

              {/* Timeline */}
              <div style={{ background: '#2c2c2c', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px #0002' }}>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <CalendarOutlined style={{ color: '#4e8cff' }} />
                  Timeline Transaksi
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <div style={{ 
                      background: '#4e8cff', 
                      borderRadius: '50%', 
                      width: 12, 
                      height: 12, 
                      marginTop: 4 
                    }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, marginBottom: 4 }}>Pesanan Dibuat</div>
                      <div style={{ color: '#bdbdbd', fontSize: 12 }}>
                        {new Date(transaction.date).toLocaleString('id-ID')}
                      </div>
                    </div>
                  </div>
                  
                  {transaction.status === 'completed' && (
                    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <div style={{ 
                        background: '#52c41a', 
                        borderRadius: '50%', 
                        width: 12, 
                        height: 12, 
                        marginTop: 4 
                      }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, marginBottom: 4 }}>Transaksi Selesai</div>
                        <div style={{ color: '#bdbdbd', fontSize: 12 }}>
                          {new Date(transaction.completedDate).toLocaleString('id-ID')}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Notes */}
              <div style={{ background: '#2c2c2c', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px #0002' }}>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20 }}>Catatan</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div>
                    <div style={{ color: '#bdbdbd', fontSize: 14, marginBottom: 8 }}>Catatan Customer:</div>
                    <div style={{ 
                      background: '#232323', 
                      padding: 12, 
                      borderRadius: 6, 
                      fontSize: 14,
                      lineHeight: 1.5
                    }}>
                      {transaction.notes}
                    </div>
                  </div>
                  <div>
                    <div style={{ color: '#bdbdbd', fontSize: 14, marginBottom: 8 }}>Catatan Admin:</div>
                    <div style={{ 
                      background: '#232323', 
                      padding: 12, 
                      borderRadius: 6, 
                      fontSize: 14,
                      lineHeight: 1.5
                    }}>
                      {transaction.adminNotes}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default TransactionDetailPage;
