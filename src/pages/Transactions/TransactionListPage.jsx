import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  SearchOutlined, 
  FilterOutlined, 
  EyeOutlined, 
  DownloadOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  CloseCircleOutlined,
  DollarOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';
import AdminLayout from '../../layouts/AdminLayout';

const initialTransactions = [
  {
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
    phone: '+6281234567890'
  },
  {
    id: 'TRX-002',
    userName: 'Sarah Putri',
    gameTitle: 'Free Fire',
    itemName: 'AK Draco Max',
    amount: 100000,
    paymentMethod: 'GoPay',
    status: 'pending',
    date: '2024-01-15T11:45:00',
    orderNumber: 'ORD-2024-002',
    userId: 'USR-002',
    email: 'sarah.putri@email.com',
    phone: '+6282345678901'
  },
  {
    id: 'TRX-003',
    userName: 'Budi Santoso',
    gameTitle: 'PUBG Mobile',
    itemName: 'UC 1000',
    amount: 150000,
    paymentMethod: 'OVO',
    status: 'processing',
    date: '2024-01-15T09:15:00',
    orderNumber: 'ORD-2024-003',
    userId: 'USR-003',
    email: 'budi.santoso@email.com',
    phone: '+6283456789012'
  },
  {
    id: 'TRX-004',
    userName: 'Diana Sari',
    gameTitle: 'Valorant',
    itemName: 'Valorant Points 1000',
    amount: 750000,
    paymentMethod: 'Bank Transfer',
    status: 'failed',
    date: '2024-01-14T16:20:00',
    orderNumber: 'ORD-2024-004',
    userId: 'USR-004',
    email: 'diana.sari@email.com',
    phone: '+6284567890123'
  },
  {
    id: 'TRX-005',
    userName: 'Rizki Pratama',
    gameTitle: 'Mobile Legend',
    itemName: 'Diamond 1000',
    amount: 200000,
    paymentMethod: 'ShopeePay',
    status: 'completed',
    date: '2024-01-14T14:30:00',
    orderNumber: 'ORD-2024-005',
    userId: 'USR-005',
    email: 'rizki.pratama@email.com',
    phone: '+6285678901234'
  },
  {
    id: 'TRX-006',
    userName: 'Maya Indah',
    gameTitle: 'Free Fire',
    itemName: 'Skin Elite Pass',
    amount: 300000,
    paymentMethod: 'LinkAja',
    status: 'pending',
    date: '2024-01-14T13:45:00',
    orderNumber: 'ORD-2024-006',
    userId: 'USR-006',
    email: 'maya.indah@email.com',
    phone: '+6286789012345'
  }
];

const TransactionListPage = () => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterGame, setFilterGame] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const navigate = useNavigate();

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
        return 'Menunggu';
      case 'processing':
        return 'Diproses';
      case 'failed':
        return 'Gagal';
      default:
        return 'Tidak Diketahui';
    }
  };

  const filteredTransactions = transactions
    .filter(transaction => {
      const matchesStatus = filterStatus === 'all' || transaction.status === filterStatus;
      const matchesGame = filterGame === 'all' || transaction.gameTitle === filterGame;
      const matchesSearch = 
        transaction.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.id.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesGame && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date) - new Date(a.date);
        case 'amount':
          return b.amount - a.amount;
        case 'status':
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

  const totalRevenue = transactions
    .filter(t => t.status === 'completed')
    .reduce((acc, t) => acc + t.amount, 0);

  const pendingTransactions = transactions.filter(t => t.status === 'pending').length;
  const completedTransactions = transactions.filter(t => t.status === 'completed').length;

  const uniqueGames = [...new Set(transactions.map(t => t.gameTitle))];

  return (
    <AdminLayout>
      <div style={{ background: '#232323', minHeight: '100vh', padding: '40px 0' }}>
        <div style={{ width: 1400, margin: '0 auto', color: '#fff', display: 'flex', flexDirection: 'column', gap: 32 }}>
          
          {/* Header Section */}
          <div style={{ background: '#2c2c2c', borderRadius: 12, padding: 32, boxShadow: '0 2px 8px #0002' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h1 style={{ fontSize: 32, fontWeight: 700, margin: 0 }}>Daftar Transaksi</h1>
              <div style={{ display: 'flex', gap: 12 }}>
                <button style={{ 
                  background: '#232c34', 
                  color: '#fff', 
                  border: 'none', 
                  borderRadius: 8, 
                  padding: '12px 24px', 
                  fontWeight: 600, 
                  fontSize: 16, 
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
                  padding: '12px 24px', 
                  fontWeight: 600, 
                  fontSize: 16, 
                  cursor: 'pointer' 
                }}>
                  + Transaksi Baru
                </button>
              </div>
            </div>
            
            {/* Stats Cards */}
            <div style={{ display: 'flex', gap: 24 }}>
              <div style={{ 
                background: '#232323', 
                borderRadius: 8, 
                padding: 20, 
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 16
              }}>
                <div style={{ 
                  background: '#4e8cff', 
                  borderRadius: '50%', 
                  width: 48, 
                  height: 48, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <DollarOutlined style={{ fontSize: 24, color: '#fff' }} />
                </div>
                <div>
                  <div style={{ color: '#bdbdbd', fontSize: 14 }}>Total Pendapatan</div>
                  <div style={{ fontSize: 24, fontWeight: 700 }}>Rp {totalRevenue.toLocaleString('id-ID')}</div>
                </div>
              </div>
              
              <div style={{ 
                background: '#232323', 
                borderRadius: 8, 
                padding: 20, 
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 16
              }}>
                <div style={{ 
                  background: '#52c41a', 
                  borderRadius: '50%', 
                  width: 48, 
                  height: 48, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <CheckCircleOutlined style={{ fontSize: 24, color: '#fff' }} />
                </div>
                <div>
                  <div style={{ color: '#bdbdbd', fontSize: 14 }}>Transaksi Selesai</div>
                  <div style={{ fontSize: 24, fontWeight: 700 }}>{completedTransactions}</div>
                </div>
              </div>
              
              <div style={{ 
                background: '#232323', 
                borderRadius: 8, 
                padding: 20, 
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 16
              }}>
                <div style={{ 
                  background: '#faad14', 
                  borderRadius: '50%', 
                  width: 48, 
                  height: 48, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <ClockCircleOutlined style={{ fontSize: 24, color: '#fff' }} />
                </div>
                <div>
                  <div style={{ color: '#bdbdbd', fontSize: 14 }}>Menunggu Pembayaran</div>
                  <div style={{ fontSize: 24, fontWeight: 700 }}>{pendingTransactions}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Section */}
          <div style={{ background: '#2c2c2c', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px #0002' }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <FilterOutlined style={{ color: '#4e8cff' }} />
                <span style={{ fontWeight: 600 }}>Filter:</span>
              </div>
              
              <select 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{ 
                  background: '#444', 
                  color: '#fff', 
                  border: '1px solid #666', 
                  borderRadius: 6, 
                  padding: '8px 12px',
                  fontSize: 14
                }}
              >
                <option value="all">Semua Status</option>
                <option value="completed">Selesai</option>
                <option value="pending">Menunggu</option>
                <option value="processing">Diproses</option>
                <option value="failed">Gagal</option>
              </select>

              <select 
                value={filterGame} 
                onChange={(e) => setFilterGame(e.target.value)}
                style={{ 
                  background: '#444', 
                  color: '#fff', 
                  border: '1px solid #666', 
                  borderRadius: 6, 
                  padding: '8px 12px',
                  fontSize: 14
                }}
              >
                <option value="all">Semua Game</option>
                {uniqueGames.map(game => (
                  <option key={game} value={game}>{game}</option>
                ))}
              </select>

              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                style={{ 
                  background: '#444', 
                  color: '#fff', 
                  border: '1px solid #666', 
                  borderRadius: 6, 
                  padding: '8px 12px',
                  fontSize: 14
                }}
              >
                <option value="date">Terbaru</option>
                <option value="amount">Nominal Tertinggi</option>
                <option value="status">Status</option>
              </select>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>
                <SearchOutlined style={{ color: '#4e8cff' }} />
                <input
                  type="text"
                  placeholder="Cari transaksi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ 
                    background: '#444', 
                    color: '#fff', 
                    border: '1px solid #666', 
                    borderRadius: 6, 
                    padding: '8px 12px',
                    fontSize: 14,
                    width: 250
                  }}
                />
              </div>
            </div>
          </div>

          {/* Transactions Table */}
          <div style={{ background: '#2c2c2c', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 8px #0002' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#232323' }}>
                    <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid #444', fontWeight: 600 }}>ID Transaksi</th>
                    <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid #444', fontWeight: 600 }}>Pelanggan</th>
                    <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid #444', fontWeight: 600 }}>Game</th>
                    <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid #444', fontWeight: 600 }}>Item</th>
                    <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid #444', fontWeight: 600 }}>Nominal</th>
                    <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid #444', fontWeight: 600 }}>Metode Pembayaran</th>
                    <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid #444', fontWeight: 600 }}>Status</th>
                    <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid #444', fontWeight: 600 }}>Tanggal</th>
                    <th style={{ padding: '16px', textAlign: 'center', borderBottom: '1px solid #444', fontWeight: 600 }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} style={{ borderBottom: '1px solid #444' }}>
                      <td style={{ padding: '16px', fontWeight: 600, color: '#4e8cff' }}>
                        {transaction.id}
                      </td>
                      <td style={{ padding: '16px' }}>
                        <div>
                          <div style={{ fontWeight: 600 }}>{transaction.userName}</div>
                          <div style={{ fontSize: 12, color: '#bdbdbd' }}>{transaction.email}</div>
                        </div>
                      </td>
                      <td style={{ padding: '16px' }}>
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
                      </td>
                      <td style={{ padding: '16px' }}>
                        <div style={{ fontWeight: 500 }}>{transaction.itemName}</div>
                        <div style={{ fontSize: 12, color: '#bdbdbd' }}>{transaction.orderNumber}</div>
                      </td>
                      <td style={{ padding: '16px', fontWeight: 600, fontSize: 16 }}>
                        Rp {transaction.amount.toLocaleString('id-ID')}
                      </td>
                      <td style={{ padding: '16px' }}>
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
                      </td>
                      <td style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          {getStatusIcon(transaction.status)}
                          <span style={{ 
                            color: getStatusColor(transaction.status),
                            fontWeight: 500
                          }}>
                            {getStatusText(transaction.status)}
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: '16px', color: '#bdbdbd', fontSize: 14 }}>
                        {new Date(transaction.date).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td style={{ padding: '16px', textAlign: 'center' }}>
                        <button 
                          onClick={() => navigate(`/transactions/${transaction.id}`)}
                          style={{ 
                            background: '#4e8cff', 
                            color: '#fff', 
                            border: 'none', 
                            borderRadius: 6, 
                            padding: '8px 12px', 
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                            fontSize: 12
                          }}
                        >
                          <EyeOutlined />
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredTransactions.length === 0 && (
              <div style={{ 
                padding: 48, 
                textAlign: 'center',
                color: '#bdbdbd'
              }}>
                <div style={{ fontSize: 18, marginBottom: 16 }}>
                  Tidak ada transaksi yang ditemukan
                </div>
                <div style={{ fontSize: 14, color: '#666' }}>
                  Coba ubah filter atau kata kunci pencarian Anda
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default TransactionListPage;
