import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const UserInfo = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return (
      <div style={{ padding: '16px', textAlign: 'center', color: '#fff' }}>
        <p>Silakan login untuk melanjutkan</p>
        <button 
          onClick={() => navigate('/login')}
          style={{ 
            padding: '8px 16px', 
            background: '#51cf66', 
            border: 'none', 
            borderRadius: 6, 
            color: '#fff', 
            cursor: 'pointer' 
          }}
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '16px', color: '#fff' }}>
      <div style={{ marginBottom: 16 }}>
        <h4 style={{ margin: 0, marginBottom: 8 }}>Selamat Datang!</h4>
        <p style={{ margin: 0, color: '#ccc', fontSize: 14 }}>{user.email}</p>
        <span style={{ 
          display: 'inline-block',
          padding: '4px 8px',
          background: user.role === 'admin' ? '#ff6b6b' : '#51cf66',
          borderRadius: 4,
          fontSize: 12,
          marginTop: 8
        }}>
          {user.role === 'admin' ? 'Admin' : 'User'}
        </span>
      </div>

      <div style={{ borderTop: '1px solid #444', paddingTop: 16 }}>
        <h5 style={{ margin: 0, marginBottom: 12 }}>Menu</h5>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button 
            onClick={() => navigate('/')}
            style={{ 
              padding: '8px 12px', 
              background: 'none', 
              border: 'none', 
              color: '#fff', 
              cursor: 'pointer',
              textAlign: 'left',
              borderRadius: 4
            }}
          >
            🏠 Dashboard
          </button>
          
          <button 
            onClick={() => navigate('/store')}
            style={{ 
              padding: '8px 12px', 
              background: 'none', 
              border: 'none', 
              color: '#fff', 
              cursor: 'pointer',
              textAlign: 'left',
              borderRadius: 4
            }}
          >
            🛒 Toko
          </button>

          {user.role === 'admin' ? (
            <button 
              onClick={() => navigate('/transactions')}
              style={{ 
                padding: '8px 12px', 
                background: 'none', 
                border: 'none', 
                color: '#fff', 
                cursor: 'pointer',
                textAlign: 'left',
                borderRadius: 4
              }}
            >
              📊 Semua Transaksi
            </button>
          ) : (
            <button 
              onClick={() => navigate('/transactions')}
              style={{ 
                padding: '8px 12px', 
                background: 'none', 
                border: 'none', 
                color: '#fff', 
                cursor: 'pointer',
                textAlign: 'left',
                borderRadius: 4
              }}
            >
              📋 Transaksi Saya
            </button>
          )}

          <button 
            onClick={handleLogout}
            style={{ 
              padding: '8px 12px', 
              background: 'none', 
              border: 'none', 
              color: '#ff6b6b', 
              cursor: 'pointer',
              textAlign: 'left',
              borderRadius: 4,
              marginTop: 8
            }}
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfo; 