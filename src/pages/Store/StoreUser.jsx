import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Input, Tag, Modal, message } from 'antd';
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
import '../../Login.css';

const staticCategories = [
  { label: 'Semua', value: '' },
  { label: 'Mobile Legend', value: 'Mobile Legend' },
  { label: 'Free Fire', value: 'Free Fire' },
  { label: 'PUBG', value: 'PUBG' },
  { label: 'Valorant', value: 'Valorant' },
];
function getProductCategory(name) {
  if (!name) return '';
  const lower = name.toLowerCase();
  if (lower.includes('mobile legend')) return 'Mobile Legend';
  if (lower.includes('free fire')) return 'Free Fire';
  if (lower.includes('pubg')) return 'PUBG';
  if (lower.includes('valorant')) return 'Valorant';
  return 'Lainnya';
}

const StoreUser = () => {
  const { token } = useAuth();
  const [accounts, setAccounts] = useState([]); // Sudah benar, pastikan tidak null/undefined
  const [searchTerm, setSearchTerm] = useState('');
  const [form, setForm] = useState({ name: '', price: '', description: '', image_url: '' });
  const [showDetail, setShowDetail] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [category, setCategory] = useState('');
  const [openDetailId, setOpenDetailId] = useState(null);

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

  // const navigate = useNavigate();

  const handleAddToCart = async (product) => {
    try {
      await addToCart({ product_id: product.id, quantity: 1 }, token);
      message.success('Produk sudah dimasukkan ke keranjang');
    } catch (err) {
      message.error(err?.response?.data?.error || err?.response?.data?.message || err?.message || "Gagal menambah ke keranjang");
    }
  };

  const handleShowDetail = (product) => {
    setDetailData(product);
    setShowDetail(true);
  };

  return (
    <AdminLayout>
      <div className="store-container">
        <h2 className="store-title">Daftar Produk</h2>
        <div className="store-header-bar">
          <Input.Search
            placeholder="Cari produk..."
            allowClear
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ width: 300 }}
          />
        </div>
        <div className="store-category-bar">
          {staticCategories.map(cat => (
            <button
              key={cat.value}
              className={`category-btn${category === cat.value ? ' active' : ''}`}
              onClick={() => setCategory(cat.value)}
              type="button"
            >
              {cat.label}
            </button>
          ))}
        </div>
        <Row gutter={[24, 24]}>
          {filteredAccounts
            .filter(product =>
              (category === '' || getProductCategory(product.name) === category) &&
              product.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map(product => (
              <Col xs={24} sm={12} md={12} lg={12} key={product.id}>
                <div className="store-card">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="store-card-img"
                  />
                  <div className="store-card-header-flex">
                    <h3 className="store-card-title" style={{ flex: 1 }}>{product.name}</h3>
                    <span className="store-card-price-right-flex">Rp{Number(product.price).toLocaleString()}</span>
                  </div>
                  <p className="store-card-desc">{product.description}</p>
                  <div className="store-card-actions-game">
                    <button
                      className="btn-game btn-game-detail"
                      onClick={() => { setShowDetail(true); setDetailData(product); }}
                    >
                      <EyeOutlined style={{ fontSize: 20 }} />
                      <span>Detail</span>
                    </button>
                    <button
                      className="btn-game btn-game-edit"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCartOutlined style={{ fontSize: 20 }} />
                      <span>Keranjang</span>
                    </button>
                  </div>
                </div>
              </Col>
            ))}
        </Row>
        <Modal
          open={showDetail}
          onCancel={() => setShowDetail(false)}
          footer={null}
          title={<span style={{ color: '#222', fontWeight: 700, fontSize: 24 }}>Detail Produk</span>}
          bodyStyle={{ background: '#232323', borderRadius: 16, padding: 32 }}
          style={{ borderRadius: 16 }}
        >
          {detailData && (
            <div>
              <img src={detailData.image_url} alt={detailData.name} style={{ width: '100%', maxHeight: 240, objectFit: 'cover', borderRadius: 12, marginBottom: 24 }} />
              <div style={{ marginBottom: 18 }}>
                <span style={{ fontWeight: 700, color: '#fff', fontSize: 17 }}>Nama:</span>
                <span style={{ color: '#fff', fontSize: 16, marginLeft: 8 }}>{detailData.name}</span>
              </div>
              <div style={{ marginBottom: 18 }}>
                <span style={{ fontWeight: 700, color: '#fff', fontSize: 17 }}>Harga:</span>
                <span style={{ color: '#2ecc40', fontSize: 16, marginLeft: 8 }}>Rp{Number(detailData.price).toLocaleString()}</span>
              </div>
              <div style={{ marginBottom: 8 }}>
                <span style={{ fontWeight: 700, color: '#fff', fontSize: 17 }}>Deskripsi:</span>
                <span style={{ color: '#bdbdbd', fontSize: 16, marginLeft: 8 }}>{detailData.description}</span>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default StoreUser; 