import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Input, Modal, Form, InputNumber, message, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import AdminLayout from '../../layouts/AdminLayout';
import { getAllProducts, addProduct, updateProduct, deleteProduct } from '../../services/productService';
import { useAuth } from '../../hooks/useAuth';
import './store.css'; // Tambahkan import CSS untuk styling custom

const staticCategories = [
  { label: 'Semua', value: '' },
  { label: 'Mobile Legend', value: 'Mobile Legend' },
  { label: 'Free Fire', value: 'Free Fire' },
  { label: 'PUBG', value: 'PUBG' },
  { label: 'Valorant', value: 'Valorant' },
  { label: 'Genshin', value: 'Genshin' },
  // Tambahkan kategori lain jika perlu
];

function getProductCategory(name) {
  if (!name) return '';
  const lower = name.toLowerCase();
  if (lower.includes('mobile legend')) return 'Mobile Legend';
  if (lower.includes('free fire')) return 'Free Fire';
  if (lower.includes('pubg')) return 'PUBG';
  if (lower.includes('valorant')) return 'Valorant';
  if (lower.includes('genshin')) return 'Genshin';
  return 'Lainnya';
}

const Store = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState(""); // Tambah state search
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const [showDetail, setShowDetail] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [category, setCategory] = useState('');
  const { token } = useAuth();

  // Ambil data produk
  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();
      setProducts(Array.isArray(res) ? res : []);
    } catch (err) {
      setProducts([]);
      message.error('Gagal mengambil produk');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Tambah produk
  const handleAdd = async (values) => {
    try {
      await addProduct(values, token);
      message.success('Produk berhasil ditambahkan!');
      setShowAdd(false);
      fetchProducts();
    } catch (err) {
      message.error(err?.response?.data?.error || 'Gagal menambah produk');
    }
  };

  // Edit produk
  const handleEdit = async (values) => {
    try {
      await updateProduct(editData.id, values, token);
      message.success('Produk berhasil diupdate!');
      setShowEdit(false);
      fetchProducts();
    } catch (err) {
      message.error(err?.response?.data?.error || 'Gagal update produk');
    }
  };

  // Hapus produk dengan modal custom
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteProduct(deleteId, token);
      message.success('Produk berhasil dihapus');
      setShowDeleteModal(false);
      setDeleteId(null);
      fetchProducts();
    } catch (err) {
      message.error(err);
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  return (
    <AdminLayout>
      <div className="store-container">
        <h2 className="store-title">Daftar Produk</h2>
        <div className="store-header-bar">
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setShowAdd(true)}>
            Tambah Produk
          </Button>
          <Input.Search
            placeholder="Cari produk..."
            allowClear
            value={search}
            onChange={e => setSearch(e.target.value)}
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
          {products
            .filter(product =>
              (category === '' || getProductCategory(product.name) === category) &&
              product.name.toLowerCase().includes(search.toLowerCase())
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
                    <h3 className="store-card-title">{product.name}</h3>
                    <span className="store-card-price-right-flex">Rp{Number(product.price).toLocaleString()}</span>
                  </div>
                  <p className="store-card-desc">{product.description}</p>
                  <div className="store-card-actions-game">
                    <button className="btn-game btn-game-detail" onClick={() => { setShowDetail(true); setDetailData(product); }}>
                      <EyeOutlined style={{ fontSize: 20 }} />
                      <span>Detail</span>
                    </button>
                    <button className="btn-game btn-game-edit" onClick={() => { setShowEdit(true); setEditData(product); }}>
                      <EditOutlined style={{ fontSize: 20 }} />
                      <span>Edit</span>
                    </button>
                    <button className="btn-game btn-game-delete" onClick={() => handleDelete(product.id)}>
                      <DeleteOutlined style={{ fontSize: 20 }} />
                      <span>Hapus</span>
                    </button>
                  </div>
                </div>
              </Col>
            ))}
        </Row>

        {/* Modal Tambah Produk */}
        <Modal open={showAdd} onCancel={() => setShowAdd(false)} footer={null} title="Tambah Produk">
          <Form layout="vertical" onFinish={handleAdd}>
            <Form.Item label="Nama Produk" name="name" rules={[{ required: true, message: 'Nama wajib diisi' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Harga" name="price" rules={[{ required: true, message: 'Harga wajib diisi' }]}>
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item label="Deskripsi" name="description">
              <Input.TextArea rows={3} />
            </Form.Item>
            <Form.Item label="URL Gambar" name="image_url">
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">Simpan</Button>
            </Form.Item>
          </Form>
        </Modal>

        {/* Modal Edit Produk */}
        <Modal open={showEdit} onCancel={() => setShowEdit(false)} footer={null} title="Edit Produk">
          <Form layout="vertical" initialValues={editData} onFinish={handleEdit}>
            <Form.Item label="Nama Produk" name="name" rules={[{ required: true, message: 'Nama wajib diisi' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Harga" name="price" rules={[{ required: true, message: 'Harga wajib diisi' }]}>
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item label="Deskripsi" name="description">
              <Input.TextArea rows={3} />
            </Form.Item>
            <Form.Item label="URL Gambar" name="image_url">
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">Simpan Perubahan</Button>
            </Form.Item>
          </Form>
        </Modal>

        {/* Modal Detail Produk */}
        <Modal open={showDetail} onCancel={() => setShowDetail(false)} footer={null} title="Detail Produk">
          {detailData && (
            <div>
              <img src={detailData.image_url} alt={detailData.name} style={{ width: '100%', maxHeight: 200, objectFit: 'cover', marginBottom: 16 }} />
              <p><strong>Nama:</strong> {detailData.name}</p>
              <p><strong>Harga:</strong> Rp{Number(detailData.price).toLocaleString()}</p>
              <p><strong>Deskripsi:</strong> {detailData.description}</p>
            </div>
          )}
        </Modal>

        {/* Modal Konfirmasi Hapus Produk */}
        <Modal open={showDeleteModal} onCancel={cancelDelete} onOk={confirmDelete} okText="Hapus" okType="danger" cancelText="Batal" title="Konfirmasi Hapus Produk">
          <p>Yakin ingin menghapus produk ini?</p>
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default Store;