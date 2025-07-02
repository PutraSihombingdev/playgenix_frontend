import { Layout } from 'antd';
import Sidebar from '../components/Sidebar';

const { Sider, Content } = Layout;

export default function AdminLayout({ children }) {
  return (
    <Layout hasSider className="min-h-screen !bg-[#141414]">
      <Sider
        width={220}
        theme="dark"
        className="!bg-[#141414]"
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 1000,
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
          marginLeft: 220, // fix if Tailwind fails
          minHeight: '100vh',
          backgroundColor: '#1f1f1f',
        }}
      >
        <Content
          className="p-6 text-white"
          style={{ overflowY: 'auto' }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
