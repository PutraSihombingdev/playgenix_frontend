import { Card, Row, Col, Typography, Carousel, Badge } from 'antd';
import { RightOutlined, StarFilled } from '@ant-design/icons';
import AdminLayout from '../../layouts/AdminLayout';
import { useNavigate } from 'react-router-dom';
import playgenixLogo from '../../assets/images/playgenix-logo.png';

const { Meta } = Card;
const { Title, Text } = Typography;

const slideImages = [
  ' https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTNhYjU3OWVsY2Rhc3ExaGFoN3JuZTd1cXJhYmxwcjRleXF4ZDlzNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xvRPIAtMwKQ2SlxKtx/giphy.gif',
  'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWkwOWVpb2gyZTE2b25uZG9yeTNpMnZ0NDJ1eTZhcXc1dm1hbjB5NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/nK82NmFluFh1arwVF6/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3ejE4b240d2lxMTE0YmZzMmh3YnVpcnd3YWUyODBvZXF1NDNjaHI4NCZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/UgV8Y7bDxsZDCP01eo/giphy.gif',
  'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnZ3YThrdjZodnIzM294aDI3NXF4MjlkYTFhbGlvc2xiYWFlcXBkbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/20XFN3vWiU79fBQgBc/giphy.gif',
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
  const navigate = useNavigate();
  return (
    <AdminLayout>
      {/* Carousel Slide + Welcome */}
      <div style={{
        maxWidth: 1200,
        width: '100%',
        margin: '0 auto',
        marginBottom: 40,
        display: 'flex',
        alignItems: 'center',
        gap: 32,
        background: '#232323',
        borderRadius: 18,
        boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
        overflow: 'hidden',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>
        {/* Logo kiri */}
        <div className="welcome-animated welcome-left" style={{
          flex: 1,
          minWidth: 220,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          animation: 'slideInLeft 1.2s cubic-bezier(.68,-0.55,.27,1.55)',
        }}>
          <div style={{
            background: 'rgba(44,62,80,0.18)',
            borderRadius: 18,
            padding: '32px 18px 24px 18px',
            boxShadow: '0 2px 16px #4e8cff22',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            width: '100%',
            maxWidth: 340,
          }}>
            <img src={playgenixLogo} alt="Playgenix Logo" style={{ width: 200, height: 200, objectFit: 'contain', filter: 'drop-shadow(0 4px 24px #4e8cff88)' }} />
            <span style={{
              color: '#4e8cff',
              fontSize: 18,
              fontWeight: 800,
              marginTop: -40,
              letterSpacing: 1,
              textAlign: 'center',
              lineHeight: 1.5,
              display: 'block',
              maxWidth: 340
            }}>
              Selamat datang di Playgenix!<br />Temukan akun game favoritmu dengan harga terbaik.
            </span>
          </div>
        </div>
        {/* Carousel tengah */}
        <div style={{ flex: 2, minWidth: 0 }}>
          <Carousel autoplay effect="fade" dotPosition="bottom" autoplaySpeed={3000}>
            {slideImages.map((src, index) => (
              <div key={index}>
                <img
                  src={src}
                  alt={`Slide ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '50vh',
                    maxHeight: 400,
                    minHeight: 180,
                    objectFit: 'contain',
                    borderRadius: 32,
                    boxShadow: '0 4px 32px #0004',
                    margin: 0,
                    display: 'block',
                  }}
                />
              </div>
            ))}
          </Carousel>
        </div>
        {/* Logo kanan */}
        <div className="welcome-animated welcome-right" style={{
          flex: 1,
          minWidth: 220,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          animation: 'slideInRight 1.2s cubic-bezier(.68,-0.55,.27,1.55)',
        }}>
          <div style={{
            background: 'rgba(44,62,80,0.18)',
            borderRadius: 18,
            padding: '32px 18px 24px 18px',
            boxShadow: '0 2px 16px #4e8cff22',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            width: '100%',
            maxWidth: 340,
          }}>
            <img src={playgenixLogo} alt="Playgenix Logo" style={{ width: 200, height: 200, objectFit: 'contain', filter: 'drop-shadow(0 4px 24px #4e8cff88)' }} />
            <span style={{
              color: '#4e8cff',
              fontSize: 18,
              fontWeight: 800,
              marginTop: -40,
              letterSpacing: 1,
              textAlign: 'center',
              lineHeight: 1.5,
              display: 'block',
              maxWidth: 340
            }}>
              Selamat datang di Playgenix!<br />Temukan akun game favoritmu dengan harga terbaik.
            </span>
          </div>
        </div>
        <style>{`
          @keyframes fadeInWelcome {
            0% { opacity: 0; transform: scale(0.8); }
            100% { opacity: 1; transform: scale(1); }
          }
          @keyframes glowWelcome {
            0% { text-shadow: 0 2px 16px #4e8cff88, 0 0 32px #fff2; }
            100% { text-shadow: 0 2px 32px #51cf66cc, 0 0 48px #4e8cffcc; }
          }
          @keyframes slideInLeft {
            0% { opacity: 0; transform: translateX(-60px) scale(0.9); }
            100% { opacity: 1; transform: translateX(0) scale(1); }
          }
          @keyframes slideInRight {
            0% { opacity: 0; transform: translateX(60px) scale(0.9); }
            100% { opacity: 1; transform: translateX(0) scale(1); }
          }
          @media (max-width: 900px) {
            .welcome-animated { display: none !important; }
          }
        `}</style>
      </div>

      {/* CTA Section */}
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <Title level={4} style={{ color: '#fff', marginBottom: 0 }}>
          Menyediakan Penjualan Akun Game Original & Terpercaya
        </Title>
        <Text style={{ color: '#bdbdbd', fontSize: 16 }}>
          Temukan akun game favoritmu dengan harga terbaik dan proses mudah hanya di PlayGenix!
        </Text>
      </div>

      {/* Game Cards */}
      <Row gutter={[20, 20]} justify="center">
        {gameList.map((game, index) => (
          <Col key={index} xs={24} sm={12} md={12} lg={8} xl={6}>
            <Badge.Ribbon
              text={game.highlight ? 'Recommended' : ''}
              color={game.highlight ? 'gold' : undefined}
              style={{ fontWeight: 600, fontSize: 14 }}
            >
              <Card
                hoverable
                onClick={() => navigate('/store-user')}
                variant="borderless"
                className={`rounded-xl transition-transform duration-300 hover:scale-[1.04] shadow-lg`}
                style={{
                  background: 'linear-gradient(135deg, #232526 0%, #2c2c2e 100%)',
                  color: '#fff',
                  border: game.highlight ? '2px solid #ffd700' : 'none',
                  boxShadow: game.highlight ? '0 0 16px #ffd70044' : '0 2px 8px #0002',
                  cursor: 'pointer',
                  minHeight: 340,
                }}
                styles={{ body: { backgroundColor: 'transparent', padding: '16px' } }}
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
                      {game.highlight && <StarFilled style={{ color: '#ffd700', marginRight: 6 }} />}
                      <RightOutlined style={{ fontSize: 16, color: 'white' }} />
                    </div>
                  }
                  description={
                    <div style={{ color: '#bdbdbd', fontSize: 15, fontWeight: 500 }}>
                      {game.total} akun tersedia
                    </div>
                  }
                />
              </Card>
            </Badge.Ribbon>
          </Col>
        ))}
      </Row>
    </AdminLayout>
  );
}
