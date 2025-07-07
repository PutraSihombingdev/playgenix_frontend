import React, { useState } from 'react';
import { Button, Row, Col, Input, Tag } from 'antd';
import {
  SearchOutlined,
  FilterOutlined,
  EyeOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';
import AdminLayout from '../../layouts/AdminLayout';
import { getAllProducts, addProduct, updateProduct, deleteProduct } from "../../services/productService";
import { useAuth } from '../../hooks/useAuth';

const dummyData = [
  {
    id: 1,
    name: 'Yuzika_1',
    game: 'Mobile Legend',
    price: 500000,
    rank: 'Mythic 73',
    skin: 215,
    description: '2 skin Legend, 1 skin KOF, Ex Global 1 Ling, dll',
    image: 'https://i.pinimg.com/736x/dd/10/46/dd1046e9294327e6c3baf663300afa0b.jpg'
  },
  {
    id: 2,
    name: 'C H E F I N',
    game: 'Free Fire',
    price: 100000,
    rank: 'Grand Master',
    skin: 230,
    description: 'Sg Unggu, AK Draco Max 1, dll',
    image: 'https://i.pinimg.com/736x/55/96/d8/5596d8307a14cee7b413e77fc5b7fc09.jpg'
  },
  {
    id: 3,
    name: 'ZynxHunter',
    game: 'Valorant',
    price: 350000,
    rank: 'Immortal 1',
    skin: 12,
    description: 'Bundle Reaver, Prime Vandal, akun aktif',
    image: 'https://i.pinimg.com/736x/1e/2d/54/1e2d548c8da2ffbc1fa17ed77c99d450.jpg'
  },
  {
    id: 4,
    name: 'SniperX',
    game: 'PUBG',
    price: 220000,
    rank: 'Ace',
    skin: 80,
    description: 'Outfit lengkap, skin senjata M416 Glacier',
    image: 'https://i.pinimg.com/736x/df/84/af/df84affdbd5952b3e7a85606c0caf0ff.jpg'
  },
];

const StoreUser = () => {
  const { token } = useAuth();
  const [accounts, setAccounts] = useState(dummyData);
  const [searchTerm, setSearchTerm] = useState('');
  const [form, setForm] = useState({ name: '', price: '', description: '', image_url: '' });

  const filteredAccounts = accounts.filter(
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
                {/* Game Tag */}
                <div style={{
                  position: 'absolute',
                  top: '8px',
                  left: '12px',
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  zIndex: 1
                }}>
                  {acc.game}
                </div>

                {/* Game Image */}
                <img
                  src={acc.image}
                  alt={acc.name}
                  style={{
                    width: '100%',
                    height: '160px',
                    objectFit: 'cover'
                  }}
                />

                {/* Account Info */}
                <div style={{ padding: '10px 14px' }}>
                  <p style={{
                    fontWeight: 'bold',
                    fontSize: '14px',
                    marginBottom: '8px',
                    color: '#fff'
                  }}>
                    {acc.game}
                  </p>
                  <p><strong>Rank :</strong> {acc.rank}</p>
                  <p><strong>Skin :</strong> {acc.skin}</p>
                  <p><strong>Harga :</strong> Rp{acc.price.toLocaleString()}</p>
                  <p><strong>Keterangan :</strong> {acc.description}</p>

                  {/* Actions */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                    <Button icon={<ShoppingCartOutlined />} size="small" style={{ backgroundColor: '#333', color: 'white', border: 'none' }}>Tambahkan ke Keranjang</Button>
                    <Button icon={<EyeOutlined />} size="small" style={{ backgroundColor: '#eee', color: '#232323', border: 'none' }}>Detail Akun</Button>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        <form onSubmit={handleSubmit}>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Nama Produk" required />
          <input name="price" value={form.price} onChange={handleChange} placeholder="Harga" required />
          <input name="description" value={form.description} onChange={handleChange} placeholder="Deskripsi" />
          <input name="image_url" value={form.image_url} onChange={handleChange} placeholder="URL Gambar" />
          <button type="submit">Store</button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default StoreUser; 