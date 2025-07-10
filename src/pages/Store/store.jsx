import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Input, Modal, Form, InputNumber, message, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, UploadOutlined } from '@ant-design/icons';
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
  const [addImageFile, setAddImageFile] = useState(null);
  const [addImagePreview, setAddImagePreview] = useState(null);

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
  const handleAddImageChange = (e) => {
    const file = e.target.files[0];
    setAddImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAddImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setAddImagePreview(null);
    }
  };

  const handleAdd = async (values) => {
    try {
      let imageUrl = values.image_url;
      if (addImageFile) {
        // Simulasi upload file ke backend, ganti dengan API upload gambar jika ada
        // Misal: const res = await uploadImage(addImageFile); imageUrl = res.url;
        imageUrl = URL.createObjectURL(addImageFile); // Sementara pakai blob url
      }
      await addProduct({ ...values, image_url: imageUrl }, token);
      message.success('Produk berhasil ditambahkan!');
      setShowAdd(false);
      setAddImageFile(null);
      setAddImagePreview(null);
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
                <div className="store-card-alt">
                  <div className="store-card-img-alt">
                    <img src={product.image_url} alt={product.name} />
                  </div>
                  <div className="store-card-info-alt">
                    <div className="store-card-row">
                      <span className="store-card-title-alt">{product.name}</span>
                      <span className="store-card-price-alt">Rp{Number(product.price).toLocaleString()}</span>
                    </div>
                    <div className="store-card-desc-alt">{product.description}</div>
                  </div>
                  <div className="store-card-actions-alt">
                    <button
                      className="btn-alt btn-detail"
                      type="button"
                      onClick={() => { setShowDetail(true); setDetailData(product); }}
                    >
                      <EyeOutlined /> Detail
                    </button>
                    <button
                      className="btn-alt btn-edit"
                      type="button"
                      onClick={() => { setShowEdit(true); setEditData(product); }}
                    >
                      <EditOutlined /> Edit
                    </button>
                    <button
                      className="btn-alt btn-delete"
                      type="button"
                      onClick={() => handleDelete(product.id)}
                    >
                      <DeleteOutlined /> Hapus
                    </button>
                  </div>
                </div>
              </Col>
            ))}
        </Row>

        {/* Modal Tambah Produk */}
        <Modal open={showAdd} onCancel={() => { setShowAdd(false); setAddImageFile(null); setAddImagePreview(null); }} footer={null} title="Tambah Produk">
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
            <Form.Item label="Foto Produk (gambar)" name="image_url" rules={[{ required: true, message: 'Foto wajib diisi' }]}>
              <input type="file" accept="image/*" onChange={handleAddImageChange} style={{ marginBottom: 10 }} />
              {addImagePreview && (
                <div style={{ marginBottom: 10 }}>
                  <img src={addImagePreview} alt="Preview" style={{ maxWidth: 180, maxHeight: 120, borderRadius: 8, boxShadow: '0 2px 8px #0003' }} />
                </div>
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<UploadOutlined />}>Simpan</Button>
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
