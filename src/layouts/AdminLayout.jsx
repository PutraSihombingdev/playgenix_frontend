import { Layout } from 'antd';
import Sidebar from '../components/Sidebar';

const { Content, Sider } = Layout;

export default function AdminLayout({ children }) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={220} theme="dark">
        <Sidebar />
      </Sider>

      <Layout>
        <Content style={{ background: '#1e1e1e', minHeight: '100vh' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
