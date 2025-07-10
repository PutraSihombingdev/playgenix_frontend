import { Layout } from 'antd';
import Sidebar from '../components/Sidebar';

const { Content, Sider } = Layout;

export default function AdminLayout({ children }) {
  return (
    <Layout hasSider className="min-h-screen !bg-[#141414]">
      <Sider
        width={220}
        theme="dark"
        className="!bg-[#141414] sidebar-gradient"
        style={{
          overflow: 'hidden',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 1000,
          borderRight: '1.5px solid #223',
          boxShadow: '2px 0 16px 0 #0004',
        }}
      >
        <div className="text-white text-center font-bold py-4 text-xl border-b border-gray-700">
          PlayGenix
        </div>
        <Sidebar />
      </Sider>

      <Layout
        className="ml-[220px] !bg-[#1f1f1f]"
        style={{
          marginLeft: 220,
          minHeight: '100vh',
          backgroundColor: '#1f1f1f',
        }}
      >
        <Content className="p-6 text-white" style={{ overflowY: 'auto' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
