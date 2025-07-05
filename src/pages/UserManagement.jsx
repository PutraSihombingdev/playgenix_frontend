import AdminLayout from '../layouts/AdminLayout';
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
      title: 'User',
      dataIndex: 'name',
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Avatar icon={<UserOutlined />} />
          <div>
            <div style={{ fontWeight: 600, color: '#e0e0e0' }}>{record.name}</div>
            <div style={{ fontSize: 13, color: '#aaa' }}>{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
      render: (text) => <span style={{ color: '#ddd' }}>{text}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => (
        <Tag
          color={status === 'Login' ? 'success' : 'error'}
          style={{
            borderRadius: 4,
            fontWeight: 'bold',
            padding: '0 10px',
            textTransform: 'uppercase',
          }}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: 'Aksi',
      render: () => (
        <Space size="middle">
          <Button
            shape="circle"
            icon={<EditOutlined />}
            style={{ backgroundColor: '#1e1e1e', color: '#fff', border: '1px solid #444' }}
          />
          <Button
            shape="circle"
            icon={<DeleteOutlined />}
            danger
          />
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
            backgroundColor: '#2a2a2a',
            borderRadius: 12,
            border: '1px solid #444',
            overflow: 'hidden',
            boxShadow: '0 2px 10px rgba(0,0,0,0.4)',
          }}
          bodyStyle={{ padding: 24 }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 20,
              gap: 12,
            }}
          >
            <Button
              type="primary"
              icon={<PlusOutlined />}
              style={{
                backgroundColor: '#1677ff',
                borderRadius: 6,
                fontWeight: 'bold',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
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
                paddingLeft: 10,
              }}
              className="white-placeholder"
            />
          </div>

          <Table
            columns={columns}
            dataSource={filtered}
            pagination={{ pageSize: 5 }}
            bordered={false}
            style={{
              backgroundColor: '#000',
              color: '#fff',
            }}
            components={{
              header: {
                cell: (props) => (
                  <th
                    {...props}
                    style={{
                      ...props.style,
                      backgroundColor: '#1a1a1a',
                      color: '#fff',
                      borderBottom: '1px solid #333',
                      padding: '12px',
                      fontSize: 14,
                      textAlign: 'left',
                    }}
                  />
                ),
              },
              body: {
                cell: (props) => (
                  <td
                    {...props}
                    style={{
                      ...props.style,
                      backgroundColor: '#111',
                      color: '#fff',
                      borderBottom: '1px solid #333',
                      padding: '12px',
                      fontSize: 14,
                    }}
                  />
                ),
              },
            }}
          />
        </Card>
      </div>

      {/* Placeholder putih untuk input pencarian */}
      <style>
        {`
          .white-placeholder input::placeholder {
            color: #fff !important;
          }
        `}
      </style>
    </AdminLayout>
  );
}
