import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Input, Tag, Form, InputNumber, message } from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  FilterOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined
} from '@ant-design/icons';
import AdminLayout from '../../layouts/AdminLayout';
import {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct
} from "../../services/productService";
import { useAuth } from '../../hooks/useAuth';

const Store = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await getAllProducts();
      setAccounts(res.data); // Pastikan backend mengembalikan array produk
    } catch (err) {
      // handle error, misal tampilkan pesan
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredAccounts = accounts.filter(
    acc => acc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [showAdd, setShowAdd] = useState(false);
  const { token } = useAuth();
  const [addLoading, setAddLoading] = useState(false);

  const onFinish = async (values) => {
    setAddLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('price', values.price);
      formData.append('description', values.description || '');
      formData.append('image', values.image || '');

      await addProduct(formData, token);
      message.success('Produk berhasil ditambahkan!');
      setShowAdd(false);
      fetchProducts();
    } catch (err) {
      message.error('Gagal menambah produk');
    }
    setAddLoading(false);
  };

  const [editProduct, setEditProduct] = useState(null);
  const [editData, setEditData] = useState({});

  return (
    <AdminLayout>
      <div style={{ color: 'white', padding: '10px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '12px' }}>Product</h2>

        <div style={{ maxWidth: '300px', marginBottom: '12px' }}>
          <Input
            placeholder="Search"
            prefix={<SearchOutlined style={{ color: '#fff' }} />}
            onChange={e => setSearchTerm(e.target.value)}
            style={{
              backgroundColor: '#2a2a2a',
              border: '1px solid #444',
              color: 'white'
            }}
          />
        </div>

        <div style={{ marginBottom: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Tag color="#a855f7" style={{ cursor: 'pointer', padding: '3px 12px' }}>Top</Tag>
          <Tag style={{ background: '#333', color: 'white', cursor: 'pointer' }}>Popular</Tag>
          <Tag style={{ background: '#333', color: 'white', cursor: 'pointer' }}>Recommended</Tag>
          <Tag icon={<FilterOutlined />} style={{ background: '#444', color: 'white', cursor: 'pointer' }}>Filter</Tag>
        </div>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{
            marginBottom: '20px',
            backgroundColor: '#a855f7',
            borderColor: '#a855f7',
            padding: '0 20px'
          }}
          onClick={() => setShowAdd(true)}
        >
          Tambah Produk
        </Button>

        {showAdd && (
          <Form
            layout="vertical"
            onFinish={onFinish}
            style={{ maxWidth: 600, background: '#222', padding: 24, borderRadius: 8 }}
          >
            <Form.Item
              label="Nama Produk"
              name="name"
              rules={[{ required: true, message: 'Nama wajib diisi' }]}
            >
              <Input placeholder="Nama Produk" />
            </Form.Item>
            <Form.Item
              label="Harga"
              name="price"
              rules={[{ required: true, message: 'Harga wajib diisi' }]}
            >
              <InputNumber min={0} style={{ width: '100%' }} placeholder="Harga" />
            </Form.Item>
            <Form.Item label="Deskripsi" name="description">
              <Input.TextArea rows={3} placeholder="Deskripsi" />
            </Form.Item>
            <Form.Item label="URL Gambar" name="image">
              <Input placeholder="https://..." />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={addLoading}>Simpan</Button>
              <Button style={{ marginLeft: 8 }} htmlType="button" onClick={() => setShowAdd(false)} disabled={addLoading}>Batal</Button>
            </Form.Item>
          </Form>
        )}

        <Row gutter={[12, 12]}>
          {filteredAccounts.map(acc => (
            <Col xs={24} sm={12} md={12} lg={12} key={acc.id}>
              <div style={{
                backgroundColor: '#2c2c2c',
                borderRadius: '15px',
                overflow: 'hidden',
                color: 'white',
                fontSize: '13px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}>
                {/* Product Image */}
                <img
                  src={
                    acc.image && acc.image.startsWith('http')
                      ? acc.image
                      : 'https://via.placeholder.com/400x160?text=No+Image'
                  }
                  alt={acc.name}
                  style={{
                    width: '100%',
                    height: '160px',
                    objectFit: 'cover'
                  }}
                />

                {/* Product Info */}
                <div style={{ padding: '10px 14px' }}>
                  <p style={{
                    fontWeight: 'bold',
                    fontSize: '14px',
                    marginBottom: '8px',
                    color: '#fff'
                  }}>
                    {acc.name}
                  </p>
                  <p><strong>Harga :</strong> Rp{Number(acc.price).toLocaleString()}</p>
                  <p><strong>Deskripsi :</strong> {acc.description}</p>

                  {/* Actions */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                    <Button
                      icon={<EditOutlined />}
                      size="small"
                      style={{ backgroundColor: '#333', color: 'white', border: 'none' }}
                      onClick={() => {
                        setEditProduct(acc.id);
                        setEditData(acc);
                      }}
                    >
                      Edit Produk
                    </Button>
                    <Button icon={<EyeOutlined />} size="small" style={{ backgroundColor: '#333', color: 'white', border: 'none' }}>Lihat Detail</Button>
                    <Button
                      icon={<DeleteOutlined />}
                      size="small"
                      danger
                      onClick={async () => {
                        await deleteProduct(acc.id);
                        fetchProducts();
                      }}
                    >
                      Hapus Produk
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </AdminLayout>
  );
};

export default Store;
