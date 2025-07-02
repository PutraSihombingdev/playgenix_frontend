import { Input, Card, Row, Col, Avatar, Button } from 'antd';
import {
  SearchOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
  RightOutlined,
} from '@ant-design/icons';
import AdminLayout from '../../layouts/AdminLayout';

const { Meta } = Card;

const gameList = [
  {
    name: 'Valorant',
    image: 'https://cdn.cloudflare.steamstatic.com/apps/csgo/blog/images/val.png',
    total: 235,
  },
  {
    name: 'Mobile Legend',
    image: 'https://upload.wikimedia.org/wikipedia/en/9/9d/Mobile_Legends_Logo.png',
    total: 170,
  },
  {
    name: 'PUBG',
    image: 'https://seeklogo.com/images/P/pubg-mobile-logo-2E27B2B7C5-seeklogo.com.png',
    total: 125,
  },
  {
    name: 'Free Fire',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Free_Fire_logo.png',
    total: 198,
    highlight: true,
  },
];

export default function DashboardPage() {
  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Search"
          prefix={<SearchOutlined />}
          className="bg-[#333] text-white rounded-lg w-72"
        />
        <div className="flex items-center gap-4">
          <ShoppingCartOutlined className="text-xl text-white" />
          <Avatar icon={<UserOutlined />} />
        </div>
      </div>

      {/* Banner */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-32 rounded-lg mb-6 flex items-center justify-center text-xl font-semibold">
        Gambar / Slide
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold mb-4 text-white">
        Menyediakan Penjualan Akun Game
      </h2>

      {/* Game Cards */}
      <Row gutter={[16, 16]}>
        {gameList.map((game, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              className={`bg-[#2a2a2a] text-white ${
                game.highlight ? 'border-2 border-yellow-400' : ''
              }`}
              cover={
                <img
                  alt={game.name}
                  src={game.image}
                  className="object-cover h-40 w-full"
                />
              }
              actions={[<RightOutlined key="more" className="text-white" />]}
            >
              <Meta
                title={<span className="text-white">{game.name}</span>}
                description={<span className="text-gray-400">{game.total} games</span>}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Logout Button */}
      <div className="mt-10">
        <Button icon={<LogoutOutlined />} danger>
          Logout
        </Button>
      </div>
    </AdminLayout>
  );
}
