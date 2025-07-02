import {
  DashboardOutlined,
  ShopOutlined,
  HeartOutlined,
  CreditCardOutlined,
  UserOutlined,
  SwapOutlined,
  StarOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = ({ key }) => {
    if (key === '/logout') {
      // Tambahkan logika logout di sini
      console.log('Logout clicked');
      // Misalnya: localStorage.clear(); navigate('/login');
    } else {
      navigate(key);
    }
  };

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '/store',
      icon: <ShopOutlined />,
      label: 'Store',
    },
    {
      key: '/favorite',
      icon: <HeartOutlined />,
      label: 'Favorite',
    },
    {
      key: '/payments',
      icon: <CreditCardOutlined />,
      label: 'Payment',
    },
    {
      key: '/user-management',
      icon: <UserOutlined />,
      label: 'Manajemen User',
    },
    {
      key: '/transactions',
      icon: <SwapOutlined />,
      label: 'Transaksi',
    },
    {
      key: '/review',
      icon: <StarOutlined />,
      label: 'Review',
    },
    {
      key: '/logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
    },
  ];

  return (
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
      }}
    />
  );
}
