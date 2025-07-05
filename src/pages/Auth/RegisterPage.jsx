import { Form, Input, Button, Typography, Card } from 'antd';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../layouts/AuthLayout';

const { Title } = Typography;

export default function RegisterPage() {
  const navigate = useNavigate();

  const onFinish = (values) => {
    // Simulasi register sukses
    navigate('/login');
  };

  return (
    <AuthLayout>
      <div style={{ minHeight: '100vh', background: '#232323', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
        <Card
          style={{
            background: '#2c2c2c',
            borderRadius: 14,
            border: 'none',
            color: '#fff',
            width: 400,
            boxShadow: '0 2px 8px #0004',
          }}
          bodyStyle={{ padding: 36 }}
        >
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <Title level={3} style={{ color: '#4e8cff', marginBottom: 4, fontWeight: 700, letterSpacing: 1 }}>Daftar Akun</Title>
            <div style={{ color: '#fff', fontSize: 15, marginBottom: 2 }}>Buat akun baru PlayGenix</div>
            <div style={{ color: '#fff', fontSize: 13 }}>Isi data di bawah untuk mendaftar</div>
          </div>

          <Form
            name="register-form"
            layout="vertical"
            onFinish={onFinish}
            requiredMark={false}
            autoComplete="off"
          >
            <Form.Item
              name="nama"
              label={<span style={{ color: '#fff', fontWeight: 500 }}>Nama Lengkap</span>}
              rules={[{ required: true, message: 'Masukkan nama lengkap!' }]}
            >
              <Input
                prefix={<UserOutlined style={{ color: '#4e8cff' }} />}
                placeholder="Nama Lengkap"
                style={{
                  background: '#232323',
                  color: '#fff',
                  border: '1px solid #444',
                  borderRadius: 8,
                  height: 44,
                }}
              />
            </Form.Item>

            <Form.Item
              name="username"
              label={<span style={{ color: '#fff', fontWeight: 500 }}>Username</span>}
              rules={[{ required: true, message: 'Masukkan username!' }]}
            >
              <Input
                prefix={<UserOutlined style={{ color: '#4e8cff' }} />}
                placeholder="Username"
                style={{
                  background: '#232323',
                  color: '#fff',
                  border: '1px solid #444',
                  borderRadius: 8,
                  height: 44,
                }}
              />
            </Form.Item>

            <Form.Item
              name="email"
              label={<span style={{ color: '#fff', fontWeight: 500 }}>Email</span>}
              rules={[
                { required: true, message: 'Masukkan email!' },
                { type: 'email', message: 'Format email tidak valid!' }
              ]}
            >
              <Input
                prefix={<MailOutlined style={{ color: '#4e8cff' }} />}
                placeholder="Email"
                style={{
                  background: '#232323',
                  color: '#fff',
                  border: '1px solid #444',
                  borderRadius: 8,
                  height: 44,
                }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={<span style={{ color: '#fff', fontWeight: 500 }}>Password</span>}
              rules={[{ required: true, message: 'Masukkan password!' }, { min: 6, message: 'Password minimal 6 karakter!' }]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: '#4e8cff' }} />}
                placeholder="Password"
                style={{
                  background: '#232323',
                  color: '#fff',
                  border: '1px solid #444',
                  borderRadius: 8,
                  height: 44,
                }}
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label={<span style={{ color: '#fff', fontWeight: 500 }}>Konfirmasi Password</span>}
              dependencies={['password']}
              rules={[
                { required: true, message: 'Konfirmasi password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Password tidak cocok!'));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: '#4e8cff' }} />}
                placeholder="Konfirmasi Password"
                style={{
                  background: '#232323',
                  color: '#fff',
                  border: '1px solid #444',
                  borderRadius: 8,
                  height: 44,
                }}
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  width: '100%',
                  height: 44,
                  background: '#4e8cff',
                  border: 'none',
                  borderRadius: 8,
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: 16,
                  letterSpacing: 1,
                }}
              >
                Daftar
              </Button>
            </Form.Item>
          </Form>

          <div style={{ textAlign: 'center', marginTop: 28 }}>
            <span style={{ color: '#fff', fontSize: 14 }}>Sudah punya akun?{' '}</span>
            <a href="/login" style={{ color: '#4e8cff', fontWeight: 500, fontSize: 14, textDecoration: 'none' }}>Masuk sekarang</a>
          </div>
        </Card>
        {/* Custom style for white placeholder and eye icon */}
        <style>{`
          input::placeholder, .ant-input::placeholder, .ant-input-password input::placeholder {
            color: #fff !important;
            opacity: 1 !important;
          }
          .ant-input-password-icon {
            color: #fff !important;
          }
          .ant-input-password-icon:hover, .ant-input-password-icon:focus {
            color: #fff !important;
          }
        `}</style>
      </div>
    </AuthLayout>
  );
}
