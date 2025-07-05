import React, { useState } from 'react';
import { StarFilled, StarOutlined, FilterOutlined, SearchOutlined } from '@ant-design/icons';
import AdminLayout from '../../layouts/AdminLayout';

const initialReviews = [
  {
    id: 1,
    userName: 'Ahmad Rizki',
    gameTitle: 'Mobile Legend',
    rating: 5,
    review: 'Skin yang sangat bagus dan berkualitas tinggi. Proses pembelian sangat mudah dan cepat. Sangat puas dengan layanan ini!',
    date: '2024-01-15',
    verified: true,
    helpful: 24,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmad',
  },
  {
    id: 2,
    userName: 'Sarah Putri',
    gameTitle: 'Free Fire',
    rating: 4,
    review: 'Skin Free Fire yang saya beli sangat keren. Harga terjangkau dan proses pengiriman cepat. Recommended!',
    date: '2024-01-14',
    verified: true,
    helpful: 18,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
  },
  {
    id: 3,
    userName: 'Budi Santoso',
    gameTitle: 'Mobile Legend',
    rating: 3,
    review: 'Skin bagus tapi pengiriman agak lama. Customer service responsif sih, jadi masih oke lah.',
    date: '2024-01-13',
    verified: false,
    helpful: 8,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Budi',
  },
  {
    id: 4,
    userName: 'Diana Sari',
    gameTitle: 'PUBG Mobile',
    rating: 5,
    review: 'Sangat puas dengan layanan PlayGenix! Skin PUBG yang saya beli original dan proses pembayaran aman. Akan beli lagi nanti.',
    date: '2024-01-12',
    verified: true,
    helpful: 31,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Diana',
  },
  {
    id: 5,
    userName: 'Rizki Pratama',
    gameTitle: 'Valorant',
    rating: 4,
    review: 'Top up Valorant berhasil dengan cepat. Harga lebih murah dari official store. Recommended banget!',
    date: '2024-01-11',
    verified: true,
    helpful: 15,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rizki',
  },
];

const ReviewPage = () => {
  const [reviews, setReviews] = useState(initialReviews);
  const [filterRating, setFilterRating] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} style={{ color: index < rating ? '#ffd700' : '#666' }}>
        {index < rating ? <StarFilled /> : <StarOutlined />}
      </span>
    ));
  };

  const filteredReviews = reviews
    .filter(review => {
      const matchesRating = filterRating === 'all' || review.rating === parseInt(filterRating);
      const matchesSearch = review.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           review.gameTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           review.review.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesRating && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date) - new Date(a.date);
        case 'rating':
          return b.rating - a.rating;
        case 'helpful':
          return b.helpful - a.helpful;
        default:
          return 0;
      }
    });

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  const ratingCounts = reviews.reduce((acc, review) => {
    acc[review.rating] = (acc[review.rating] || 0) + 1;
    return acc;
  }, {});

  return (
    <AdminLayout>
      <div style={{ background: '#232323', minHeight: '100vh', padding: '40px 0' }}>
        <div style={{ width: 1200, margin: '0 auto', color: '#fff', display: 'flex', flexDirection: 'column', gap: 32 }}>
          
          {/* Header Section */}
          <div style={{ background: '#2c2c2c', borderRadius: 12, padding: 32, boxShadow: '0 2px 8px #0002' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h1 style={{ fontSize: 32, fontWeight: 700, margin: 0 }}>Review & Rating</h1>
              <button style={{ 
                background: '#4e8cff', 
                color: '#fff', 
                border: 'none', 
                borderRadius: 8, 
                padding: '12px 24px', 
                fontWeight: 600, 
                fontSize: 16, 
                cursor: 'pointer' 
              }}>
                Tulis Review
              </button>
            </div>
            
            <div style={{ display: 'flex', gap: 48, alignItems: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 48, fontWeight: 700, color: '#4e8cff' }}>{averageRating}</div>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
                  {renderStars(Math.round(averageRating))}
                </div>
                <div style={{ color: '#bdbdbd', fontSize: 14 }}>Berdasarkan {reviews.length} review</div>
              </div>
              
              <div style={{ flex: 1 }}>
                {[5, 4, 3, 2, 1].map(rating => (
                  <div key={rating} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, width: 80 }}>
                      <span style={{ fontSize: 14 }}>{rating}</span>
                      <StarFilled style={{ color: '#ffd700', fontSize: 16 }} />
                    </div>
                    <div style={{ 
                      flex: 1, 
                      height: 8, 
                      background: '#444', 
                      borderRadius: 4, 
                      overflow: 'hidden' 
                    }}>
                      <div style={{ 
                        width: `${(ratingCounts[rating] || 0) / reviews.length * 100}%`, 
                        height: '100%', 
                        background: '#4e8cff' 
                      }} />
                    </div>
                    <div style={{ width: 40, fontSize: 14, color: '#bdbdbd' }}>
                      {ratingCounts[rating] || 0}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Filter Section */}
          <div style={{ background: '#2c2c2c', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px #0002' }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <FilterOutlined style={{ color: '#4e8cff' }} />
                <span style={{ fontWeight: 600 }}>Filter:</span>
              </div>
              
              <select 
                value={filterRating} 
                onChange={(e) => setFilterRating(e.target.value)}
                style={{ 
                  background: '#444', 
                  color: '#fff', 
                  border: '1px solid #666', 
                  borderRadius: 6, 
                  padding: '8px 12px',
                  fontSize: 14
                }}
              >
                <option value="all">Semua Rating</option>
                <option value="5">5 Bintang</option>
                <option value="4">4 Bintang</option>
                <option value="3">3 Bintang</option>
                <option value="2">2 Bintang</option>
                <option value="1">1 Bintang</option>
              </select>

              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                style={{ 
                  background: '#444', 
                  color: '#fff', 
                  border: '1px solid #666', 
                  borderRadius: 6, 
                  padding: '8px 12px',
                  fontSize: 14
                }}
              >
                <option value="date">Terbaru</option>
                <option value="rating">Rating Tertinggi</option>
                <option value="helpful">Paling Membantu</option>
              </select>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>
                <SearchOutlined style={{ color: '#4e8cff' }} />
                <input
                  type="text"
                  placeholder="Cari review..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ 
                    background: '#444', 
                    color: '#fff', 
                    border: '1px solid #666', 
                    borderRadius: 6, 
                    padding: '8px 12px',
                    fontSize: 14,
                    width: 200
                  }}
                />
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {filteredReviews.map((review) => (
              <div key={review.id} style={{ 
                background: '#2c2c2c', 
                borderRadius: 12, 
                padding: 24, 
                boxShadow: '0 2px 8px #0002' 
              }}>
                <div style={{ display: 'flex', gap: 16 }}>
                  <img 
                    src={review.avatar} 
                    alt={review.userName}
                    style={{ 
                      width: 48, 
                      height: 48, 
                      borderRadius: '50%', 
                      objectFit: 'cover' 
                    }} 
                  />
                  
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                      <span style={{ fontWeight: 600, fontSize: 16 }}>{review.userName}</span>
                      {review.verified && (
                        <span style={{ 
                          background: '#4e8cff', 
                          color: '#fff', 
                          borderRadius: 4, 
                          padding: '2px 8px', 
                          fontSize: 12,
                          fontWeight: 500
                        }}>
                          Verified
                        </span>
                      )}
                      <span style={{ color: '#bdbdbd', fontSize: 14 }}>
                        {new Date(review.date).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                      <span style={{ 
                        background: '#232323', 
                        color: '#4e8cff', 
                        borderRadius: 4, 
                        padding: '4px 8px', 
                        fontSize: 12,
                        fontWeight: 500
                      }}>
                        {review.gameTitle}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    
                    <p style={{ 
                      color: '#e0e0e0', 
                      fontSize: 14, 
                      lineHeight: 1.6, 
                      marginBottom: 16,
                      margin: 0
                    }}>
                      {review.review}
                    </p>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <button style={{ 
                        background: 'none', 
                        border: '1px solid #666', 
                        color: '#bdbdbd', 
                        borderRadius: 6, 
                        padding: '6px 12px', 
                        fontSize: 12, 
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4
                      }}>
                        👍 Membantu ({review.helpful})
                      </button>
                      <button style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: '#4e8cff', 
                        fontSize: 12, 
                        cursor: 'pointer' 
                      }}>
                        Balas
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredReviews.length === 0 && (
            <div style={{ 
              background: '#2c2c2c', 
              borderRadius: 12, 
              padding: 48, 
              textAlign: 'center',
              boxShadow: '0 2px 8px #0002' 
            }}>
              <div style={{ fontSize: 18, color: '#bdbdbd', marginBottom: 16 }}>
                Tidak ada review yang ditemukan
              </div>
              <div style={{ color: '#666', fontSize: 14 }}>
                Coba ubah filter atau kata kunci pencarian Anda
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ReviewPage; 