import React, { useState } from 'react';
import { Button, Row, Col, Input, Tag } from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  FilterOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined
} from '@ant-design/icons';
import AdminLayout from '../layouts/AdminLayout';

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
    image: 'https://via.placeholder.com/300x160.png?text=Free+Fire'
  },
  {
    id: 3,
    name: 'ZynxHunter',
    game: 'Valorant',
    price: 350000,
    rank: 'Immortal 1',
    skin: 12,
    description: 'Bundle Reaver, Prime Vandal, akun aktif',
    image: 'https://via.placeholder.com/300x160.png?text=Valorant'
  },
  {
    id: 4,
    name: 'SniperX',
    game: 'PUBG',
    price: 220000,
    rank: 'Ace',
    skin: 80,
    description: 'Outfit lengkap, skin senjata M416 Glacier',
    image: 'https://via.placeholder.com/300x160.png?text=PUBG'
  },
];

const Store = () => {
  const [accounts, setAccounts] = useState(dummyData);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAccounts = accounts.filter(
    acc => acc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        >
          Tambah Akun
        </Button>

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
                  {/* GANTI JUDUL DENGAN GAME */}
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
                    <Button icon={<EditOutlined />} size="small" style={{ backgroundColor: '#333', color: 'white', border: 'none' }}>Edit Akun</Button>
                    <Button icon={<EyeOutlined />} size="small" style={{ backgroundColor: '#333', color: 'white', border: 'none' }}>Lihat Detail</Button>
                    <Button icon={<DeleteOutlined />} size="small" danger>Hapus Akun</Button>
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
