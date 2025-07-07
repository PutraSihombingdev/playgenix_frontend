import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Input, Modal, Form, InputNumber, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import AdminLayout from '../../layouts/AdminLayout';
import { getAllProducts, addProduct, updateProduct, deleteProduct } from '../../services/productService';
import { useAuth } from '../../hooks/useAuth';

const Store = () => {
  const [products, setProducts] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const [showDetail, setShowDetail] = useState(false);
  const [detailData, setDetailData] = useState(null);
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
      <div style={{ color: 'white', padding: '10px' }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setShowAdd(true)}>
          Tambah Produk
        </Button>
        <Row gutter={[12, 12]} style={{ marginTop: 20 }}>
          {products.map(product => (
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
                  <Button icon={<EyeOutlined />} onClick={() => { setShowDetail(true); setDetailData(product); }}>Detail</Button>
                  <Button icon={<EditOutlined />} onClick={() => { setShowEdit(true); setEditData(product); }}>Edit</Button>
                  <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(product.id)}>
                    Hapus
                  </Button>
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
