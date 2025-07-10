import {
  DashboardOutlined,
  ShopOutlined,
  HeartOutlined,
  CreditCardOutlined,
  UserOutlined,
  SwapOutlined,
  StarOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';
import { Menu, Modal } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const role = user?.role || 'user';
  const [logoutConfirmVisible, setLogoutConfirmVisible] = useState(false);

  const handleMenuClick = ({ key }) => {
    if (key === '/logout') {
      setLogoutConfirmVisible(true);
    } else {
      navigate(key);
    }
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
    setLogoutConfirmVisible(false);
  };

  // Filter menu berdasarkan role
  let menuItems = [
    { key: '/', icon: <DashboardOutlined />, label: 'Dashboard' },
    { key: '/store', icon: <ShopOutlined />, label: 'Store' },
    { key: '/store-user', icon: <ShoppingCartOutlined />, label: 'Shop' },
    { key: '/cart', icon: <ShoppingOutlined />, label: 'Cart' },
    { key: '/transactions', icon: <SwapOutlined />, label: 'Transaksi' },
    { key: '/review', icon: <StarOutlined />, label: 'Review' },
    { key: '/logout', icon: <LogoutOutlined />, label: 'Logout' },
  ];

  if (role === 'admin') {
    // Admin tidak bisa akses Cart & Store User
    menuItems = menuItems.filter(item => item.key !== '/cart' );
  } else {
    // User tidak bisa akses Store (admin)
    menuItems = menuItems.filter(item => item.key !== '/store');
  }

  return (
    <>
      <Menu
        mode="inline"
        theme="dark"
        selectedKeys={[location.pathname]}
        onClick={handleMenuClick}
        items={menuItems}
        style={{
          height: '100%',
          paddingTop: 20,
          borderRight: 0,
          fontWeight: 600,
          fontSize: 16,
        }}
        className="sidebar-menu-custom"
      />
      <Modal
        open={logoutConfirmVisible}
        onOk={handleLogout}
        onCancel={() => setLogoutConfirmVisible(false)}
        okText="Ya, Logout"
        cancelText="Batal"
        centered
        title="Konfirmasi Logout"
      >
        <p>Apakah yakin untuk Log out?</p>
      </Modal>
    </>
  );
}
