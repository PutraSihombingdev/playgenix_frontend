import { Form, Input, Button, Typography, Card } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; // ✅ Tambahkan ini
import AuthLayout from '../../layouts/AuthLayout';

const { Title } = Typography;

export default function LoginPage() {
  const navigate = useNavigate(); // ✅ Gunakan navigasi

  const onFinish = (values) => {
    console.log('Login success:', values);
    // Simulasi login sukses, lalu arahkan ke dashboard
    navigate('/'); // ✅ Arahkan ke halaman dashboard
  };

  return (
    <AuthLayout>
      <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a] px-4">
        <Card
          className="w-full max-w-md shadow-lg"
          style={{
            backgroundColor: '#2c2c2e',
            borderRadius: '12px',
            color: '#fff',
          }}
          bodyStyle={{ padding: '32px' }}
        >
          <div className="text-center mb-6">
            <Title level={3} style={{ color: '#fff', marginBottom: 0 }}>
              Login Akun
            </Title>
            <p className="text-gray-400">Silakan masuk untuk melanjutkan</p>
          </div>

          <Form
            name="login-form"
            layout="vertical"
            onFinish={onFinish}
            requiredMark={false}
          >
            <Form.Item
              name="username"
              label={<span style={{ color: '#fff' }}>Username</span>}
              rules={[{ required: true, message: 'Masukkan username!' }]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="Username"
                style={{ backgroundColor: '#1f1f1f', color: '#fff' }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={<span style={{ color: '#fff' }}>Password</span>}
              rules={[{ required: true, message: 'Masukkan password!' }]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Password"
                style={{ backgroundColor: '#1f1f1f', color: '#fff' }}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                style={{
                  backgroundColor: '#722ed1',
                  borderColor: '#722ed1',
                  fontWeight: 'bold',
                }}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </AuthLayout>
  );
}