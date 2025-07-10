import React, { useEffect, useState } from 'react';
import reviewService from '../../services/reviewService';
import { StarFilled, StarOutlined, FilterOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import AdminLayout from '../../layouts/AdminLayout';
import { Modal, message } from 'antd';
import { useAuth } from '../../hooks/useAuth';

const renderStars = (rating) => (
  Array.from({ length: 5 }, (_, i) =>
    i < rating
      ? <StarFilled key={i} style={{ color: '#ffd700' }} />
      : <StarOutlined key={i} style={{ color: '#666' }} />
  )
);

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [filterRating, setFilterRating] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ rating: '', comment: '' });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const data = await reviewService.getAllReviews();
        setReviews(data);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const filteredReviews = reviews
    .filter(review => {
      const matchesRating = filterRating === 'all' || String(review.rating) === filterRating;
      const matchesSearch =
        (review.userName || `User ${review.user_id}` || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (review.gameTitle || review.product_id || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (review.review || review.comment || '').toLowerCase().includes(searchTerm.toLowerCase());
      return matchesRating && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.created_at || b.date) - new Date(a.created_at || a.date);
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setFormError('');
    if (!form.rating || !form.comment) {
      setFormError('Rating dan Komentar wajib diisi!');
      return;
    }
    if (form.rating < 1 || form.rating > 5) {
      setFormError('Rating harus 1-5');
      return;
    }
    setSubmitting(true);
    try {
      await reviewService.addReview(form.rating, form.comment);
      setForm({ rating: '', comment: '' });
      setShowForm(false);
      // Refresh review list
      const data = await reviewService.getAllReviews();
      setReviews(data);
      message.success('Review berhasil ditambahkan!');
    } catch (err) {
      message.error('Gagal menambah review');
    } finally {
      setSubmitting(false);
    }
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((acc, review) => acc + Number(review.rating), 0) / reviews.length).toFixed(1)
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
              <button
                style={{
                  background: user ? '#4e8cff' : '#888',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '12px 24px',
                  fontWeight: 600,
                  fontSize: 16,
                  cursor: user ? 'pointer' : 'not-allowed',
                  opacity: user ? 1 : 0.6
                }}
                onClick={() => user && setShowForm(true)}
                disabled={!user}
                title={user ? '' : 'Login untuk menulis review'}
              >
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

          {/* Modal Form Tambah Review */}
          <Modal
            open={showForm}
            onCancel={() => setShowForm(false)}
            footer={null}
            title={<span style={{ color: '#222' }}>Tambah Review</span>}
            bodyStyle={{ background: '#232323', borderRadius: 12 }}
          >
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ color: '#fff', fontWeight: 500 }}>Rating (1-5):</label>
                <input
                  name="rating"
                  type="number"
                  min="1"
                  max="5"
                  value={form.rating}
                  onChange={handleChange}
                  required
                  placeholder="Beri rating 1-5"
                  style={{ width: '100%', marginTop: 4, borderRadius: 6, border: '1px solid #444', padding: 10, background: '#181818', color: '#fff', fontSize: 16 }}
                />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ color: '#fff', fontWeight: 500 }}>Komentar:</label>
                <textarea
                  name="comment"
                  value={form.comment}
                  onChange={handleChange}
                  required
                  placeholder="Tulis komentar Anda"
                  style={{ width: '100%', marginTop: 4, borderRadius: 6, border: '1px solid #444', padding: 10, background: '#181818', color: '#fff', fontSize: 16, minHeight: 70 }}
                />
              </div>
              {formError && <div style={{ color: '#ff6b6b', marginBottom: 12 }}>{formError}</div>}
              <button
                type="submit"
                disabled={submitting}
                style={{ padding: '12px 0', background: '#51cf66', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 17, width: '100%' }}
              >
                {submitting ? 'Mengirim...' : 'Kirim Review'}
              </button>
            </form>
          </Modal>

          {/* Filter Section */}
          <div style={{ background: '#2c2c2c', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px #0002' }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <FilterOutlined style={{ color: '#4e8cff' }} />
                <span style={{ fontWeight: 600 }}>Filter:</span>
              </div>
              <select
                value={filterRating}
                onChange={e => setFilterRating(e.target.value)}
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
                onChange={e => setSortBy(e.target.value)}
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
              </select>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>
                <SearchOutlined style={{ color: '#4e8cff' }} />
                <input
                  type="text"
                  placeholder="Cari review..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
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
            {loading ? (
              <div style={{ color: '#aaa', textAlign: 'center', margin: 40 }}>Memuat review...</div>
            ) : filteredReviews.length === 0 ? (
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
            ) : (
              filteredReviews.map((review) => (
                <div key={review.id} style={{
                  background: '#2c2c2c',
                  borderRadius: 12,
                  padding: 24,
                  boxShadow: '0 2px 8px #0002'
                }}>
                  <div style={{ display: 'flex', gap: 16 }}>
                    <img
                      src={review.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=User${review.user_id}`}
                      alt={review.userName || `User ${review.user_id}`}
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        objectFit: 'cover'
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                        <span style={{ fontWeight: 600, fontSize: 16 }}>
                          {review.username || `User ${review.user_id}`}
                        </span>
                        <span style={{ color: '#bdbdbd', fontSize: 14 }}>
                          {new Date(review.created_at || review.date).toLocaleDateString('id-ID', {
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
                          {review.gameTitle || review.product_id}
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
                        {review.review || review.comment}
                      </p>
                      {/* Tombol membantu dan balas bisa diaktifkan jika backend support */}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ReviewPage; 