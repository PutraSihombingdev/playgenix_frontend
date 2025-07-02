import { Layout } from 'antd';
import Sidebar from '../components/Sidebar';

const { Sider, Content } = Layout;

function AdminLayout({ children }) {
  return (
    <Layout className="min-h-screen">
      <Sider
        width={220}
        className="bg-[#141414]"
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
      >
        <div className="text-white text-center font-bold py-4 text-xl border-b border-gray-700">
          PlayGenix
        </div>
        <Sidebar />
      </Sider>

      <Layout className="ml-[220px] bg-[#1f1f1f]">
        <Content className="p-6 text-white">{children}</Content>
      </Layout>
    </Layout>
  );
}

export default AdminLayout; 
