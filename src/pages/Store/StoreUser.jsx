import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Input, Tag, Modal } from 'antd';
import {
  SearchOutlined,
  FilterOutlined,
  EyeOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';
import AdminLayout from '../../layouts/AdminLayout';
import { getAllProducts, addProduct, updateProduct, deleteProduct } from "../../services/productService";
import { useAuth } from '../../hooks/useAuth';
import { addToCart } from "../../services/cartService";
import { useNavigate } from "react-router-dom";

const StoreUser = () => {
  const { token } = useAuth();
  const [accounts, setAccounts] = useState([]); // Sudah benar, pastikan tidak null/undefined
  const [searchTerm, setSearchTerm] = useState('');
  const [form, setForm] = useState({ name: '', price: '', description: '', image_url: '' });
  const [showDetail, setShowDetail] = useState(false);
  const [detailData, setDetailData] = useState(null);

  // Ambil data produk dari backend saat mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProducts();
        setAccounts(Array.isArray(res) ? res : []);
      } catch (err) {
        setAccounts([]);
      }
    };
    fetchProducts();
  }, []);

  const filteredAccounts = (accounts || []).filter(
    acc => acc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // Jika ada upload file, gunakan FormData
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('price', form.price);
      formData.append('description', form.description);
      formData.append('image_url', form.image_url); // atau formData.append('image', file);

      await addProduct(formData, token);
      alert('Produk berhasil ditambahkan!');
      // Reset form atau refresh data
    } catch (err) {
      alert('Gagal menambah produk');
    }
  };

  const navigate = useNavigate();

  const handleAddToCart = async (product) => {
    try {
      await addToCart({ product_id: product.id, quantity: 1 }, token);
      navigate("/cart");
    } catch (err) {
      alert(err?.response?.data?.error || err?.response?.data?.message || err?.message || "Gagal menambah ke keranjang");
    }
  };

  const handleShowDetail = (product) => {
    setDetailData(product);
    setShowDetail(true);
  };

  return (
    <AdminLayout>
      <div style={{ color: 'white', padding: '10px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '12px' }}>Store User</h2>

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


        <Row gutter={[12, 12]} style={{ marginTop: 20 }}>
          {filteredAccounts.map(product => (
            <Col xs={24} sm={12} md={8} key={product.id}>
              <div style={{ background: '#2c2c2c', borderRadius: 10, padding: 16 }}>
                <img
                  src={product.image_url}
                  alt={product.name}
                  style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 8 }}
                />
                <h3>{product.name}</h3>
                <p>Harga: Rp{Number(product.price).toLocaleString()}</p>
                <p>{product.description}</p>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Button
                    icon={<ShoppingCartOutlined />}
                    style={{ backgroundColor: '#333', color: 'white', border: 'none' }}
                    onClick={() => handleAddToCart(product)}
                  >
                    Tambahkan ke Keranjang
                  </Button>
                  <Button
                    icon={<EyeOutlined />}
                    style={{ backgroundColor: '#eee', color: '#232323', border: 'none' }}
                    onClick={() => handleShowDetail(product)}
                  >
                    Detail
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        <Modal
          open={showDetail}
          onCancel={() => setShowDetail(false)}
          footer={null}
          title="Detail Produk"
        >
          {detailData && (
            <div>
              <img src={detailData.image_url} alt={detailData.name} style={{ width: '100%', maxHeight: 200, objectFit: 'cover', marginBottom: 16 }} />
              <p><strong>Nama:</strong> {detailData.name}</p>
              <p><strong>Harga:</strong> Rp{Number(detailData.price).toLocaleString()}</p>
              <p><strong>Deskripsi:</strong> {detailData.description}</p>
            </div>
          )}
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default StoreUser; 