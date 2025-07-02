import { useState } from 'react';
import { Input, Button, Row, Col, Card, Space, Tag } from 'antd';
import {
  SearchOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import AdminLayout from '../../layouts/AdminLayout';

const akunList = [
  {
    id: 1,
    game: 'Mobile Legend',
    image: 'https://i.imgur.com/C8G0Mbi.jpeg',
    akun: 'Yuziko_1',
    uid: '12355532',
    rank: 'Mythic 773',
    skin: 215,
    harga: 500000,
    keterangan: '2 skin Legend, skin KOF, Ex Global 1 Ling, dll.',
  },
  {
    id: 2,
    game: 'Free Fire',
    image: 'https://i.imgur.com/yVsmuLs.jpeg',
    akun: 'CHEF IN',
    uid: '11231',
    rank: 'Grand Master',
    skin: 230,
    harga: 190000,
    keterangan: 'SG Unggu, AK Draco Max 1, dll.',
  },
];

export default function StoreListPage() {
  const [search, setSearch] = useState('');

  const filteredAkun = akunList.filter((akun) =>
    akun.akun.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <h2 className="text-xl font-semibold text-white mb-4">Product</h2>

      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Search"
          prefix={<SearchOutlined />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-[#333] text-white rounded-lg w-72"
        />

        <Space>
          <Tag color="purple">Top</Tag>
          <Tag color="magenta">Popular</Tag>
          <Tag color="blue">Recommended</Tag>
          <Button type="primary">Filter</Button>
        </Space>
      </div>

      <Row gutter={[16, 16]}>
        {filteredAkun.map((akun) => (
          <Col xs={24} sm={12} md={12} lg={12} key={akun.id}>
            <Card
              hoverable
              className="bg-[#2a2a2a] text-white"
              cover={
                <img
                  alt={akun.game}
                  src={akun.image}
                  className="object-cover h-40 w-full"
                />
              }
            >
              <h3 className="text-lg text-white font-semibold mb-2">
                {akun.game}
              </h3>
              <div className="text-sm text-white leading-relaxed">
                <p>Nama Akun : {akun.akun}</p>
                <p>ID : {akun.uid}</p>
                <p>Rank : {akun.rank}</p>
                <p>Skin : {akun.skin}</p>
                <p>Harga : Rp.{akun.harga.toLocaleString('id-ID')}</p>
                <p>Keterangan : {akun.keterangan}</p>
              </div>

              <div className="flex justify-between mt-4">
                <Button icon={<EditOutlined />} className="text-white bg-blue-600">
                  Edit Akun
                </Button>
                <Button icon={<EyeOutlined />} className="text-white bg-purple-600">
                  Lihat Detail
                </Button>
                <Button icon={<DeleteOutlined />} danger>
                  Hapus Akun
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </AdminLayout>
  );
}
