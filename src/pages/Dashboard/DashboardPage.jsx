import { Card, Row, Col, Typography, Carousel } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import AdminLayout from '../../layouts/AdminLayout';

const { Meta } = Card;
const { Title } = Typography;

const slideImages = [
  'https://static-src.vocagame.com/gamestoreindonesia/Gamestore%20Indonesia%20Banner%20Murah%201-min-242c-original.png',
  'https://static-src.vocagame.com/gamestoreindonesia/Gamestore%20Indonesia%20Banner%20Murah%20Reseller-min-a19e-original.png',
];

const gameList = [
  {
    name: 'Valorant',
    image: 'https://i.pinimg.com/736x/cf/ae/88/cfae886e263126f685510e2f45b82970.jpg',
    total: 235,
  },
  {
    name: 'Mobile Legend',
    image: 'https://i.pinimg.com/736x/82/55/03/8255033248d018b6c5f3d460b2deec16.jpg',
    total: 170,
  },
  {
    name: 'PUBG',
    image: 'https://i.pinimg.com/736x/51/6a/74/516a74d6d701c86c007f668d7cf2891a.jpg',
    total: 125,
  },
  {
    name: 'Free Fire',
    image: 'https://i.pinimg.com/736x/9b/aa/66/9baa66a3fb33bfcea3e8b791dee5d1c7.jpg',
    total: 198,
    highlight: true,
  },
];

export default function DashboardPage() {
  return (
    <AdminLayout>
      {/* Carousel Slide */}
      <div className="mb-8">
        <Carousel autoplay effect="fade" dotPosition="bottom">
          {slideImages.map((src, index) => (
            <div key={index} className="px-1">
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-full h-[200px] object-cover rounded-lg shadow-md"
              />
            </div>
          ))}
        </Carousel>
      </div>

      {/* Section Title */}
      <Title level={4} style={{ color: '#fff' }} className="mb-4">
        Menyediakan Penjualan Akun Game
      </Title>

      {/* Game Cards */}
      <Row gutter={[20, 20]}>
        {gameList.map((game, index) => (
          <Col key={index} xs={24} sm={12} md={12} lg={8} xl={6}>
            <Card
              hoverable
              bordered={false}
              className={`rounded-xl transition-transform duration-300 hover:scale-[1.03] shadow-lg ${
                game.highlight ? 'border border-yellow-500' : ''
              }`}
              style={{
                backgroundColor: '#2c2c2e',
                color: '#fff',
              }}
              bodyStyle={{
                backgroundColor: '#2c2c2e',
                padding: '16px',
              }}
              cover={
                <img
                  alt={game.name}
                  src={game.image}
                  className="object-cover h-44 w-full rounded-t-xl"
                  style={{ borderBottom: '2px solid #2c2c2e' }}
                />
              }
            >
              <Meta
                title={
                  <div
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: 18,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    {game.name}
                    <RightOutlined style={{ fontSize: 16, color: 'white' }} />
                  </div>
                }
                description={
                  <div style={{ color: 'white', fontSize: 15, fontWeight: 500 }}>
                    {game.total} games
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </AdminLayout>
  );
}
