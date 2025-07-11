import AdminLayout from '../../layouts/AdminLayout';
import {
  Table,
  Tag,
  Space,
  Button,
  Input,
  Typography,
  Avatar,
  Card,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useState } from 'react';

const { Title, Text } = Typography;

const initialUsers = [
  {
    key: '1',
    name: 'Jesicha Manurung',
    mobile: '+62812345678',
    email: 'jesi1006@gmail.com',
    status: 'Login',
  },
  {
    key: '2',
    name: 'Mirel Simanjorang',
    mobile: '+62812345678',
    email: 'mirel@gmail.com',
    status: 'Logout',
  },
];

export default function UserManagement() {
  const [users] = useState(initialUsers);
  const [search, setSearch] = useState('');

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      title: <span style={{ color: '#ccc' }}>User</span>,
      dataIndex: 'name',
      render: (_, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Avatar icon={<UserOutlined />} />
          <div>
            <div style={{ fontWeight: 600, color: '#fff' }}>{record.name}</div>
            <div style={{ fontSize: 13, color: '#999' }}>{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: <span style={{ color: '#ccc' }}>Mobile</span>,
      dataIndex: 'mobile',
      render: (text) => <span style={{ color: '#fff' }}>{text}</span>,
    },
    {
      title: <span style={{ color: '#ccc' }}>Status</span>,
      dataIndex: 'status',
      render: (status) => (
        <Tag
          color={status === 'Login' ? 'green' : 'red'}
          style={{ borderRadius: 4, padding: '2px 8px', fontWeight: 500 }}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: <span style={{ color: '#ccc' }}>Aksi</span>,
      render: () => (
        <Space size="middle">
          <Button shape="circle" icon={<EditOutlined />} />
          <Button shape="circle" danger icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div style={{ padding: '32px' }}>
        <div style={{ marginBottom: 24 }}>
          <Title level={3} style={{ color: '#fff', marginBottom: 4 }}>
            Manajemen Pengguna
          </Title>
          <Text style={{ color: '#aaa' }}>
            Lihat dan kelola daftar pengguna yang terdaftar pada sistem.
          </Text>
        </div>

        <Card
          style={{
            backgroundColor: '#2c2c2e',
            borderRadius: 12,
            border: '1px solid #333',
          }}
          styles={{
            body: { padding: 24 }
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              marginBottom: 20,
              gap: 12,
            }}
          >
            <Button
              type="primary"
              icon={<PlusOutlined />}
              style={{
                backgroundColor: '#722ed1',
                borderColor: '#722ed1',
                borderRadius: 6,
              }}
            >
              Tambah Pengguna
            </Button>

            <Input
              placeholder="Cari pengguna..."
              prefix={<SearchOutlined style={{ color: '#aaa' }} />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: 280,
                backgroundColor: '#1e1e1e',
                color: '#fff',
                border: '1px solid #555',
                borderRadius: 6,
              }}
            />
          </div>

          <Table
            columns={columns}
            dataSource={filtered}
            pagination={{ pageSize: 5 }}
            bordered={false}
            className="dark-table"
            rowClassName={() => 'dark-row'}
          />
        </Card>
      </div>

      <style>{`
        .dark-table .ant-table-thead > tr > th {
          background-color: #1e1e1e !important;
          color: #ccc !important;
        }
        .dark-table .ant-table-tbody > tr > td {
          background-color: #1a1a1a !important;
          color: #fff !important;
        }
        .dark-row:hover > td {
          background-color: #333 !important;
        }
      `}</style>
    </AdminLayout>
  );
}
