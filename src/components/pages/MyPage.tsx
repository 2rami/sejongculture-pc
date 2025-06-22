import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import imageSrc4 from '../../assets/images/image-4.jpeg';
import imageSrc6 from '../../assets/images/image-6.jpeg';
import imageSrc7 from '../../assets/images/image-7.jpeg';

export default function MyPage() {
  const [profileData] = useState({
    name: '김세종',
    email: 'sejong@example.com',
    phone: '010-1234-5678',
    points: 15400,
    expiringPoints: 2400
  });

  // 최근 예매 내역 (최대 3개)
  const recentBookings = [
    {
      id: 'BK2025001',
      title: '동양미래특급',
      date: '2025-05-15',
      venue: '세종대극장',
      status: 'confirmed',
      image: imageSrc4
    },
    {
      id: 'BK2025002',
      title: '봄의 전설',
      date: '2025-05-23',
      venue: '세종M홀',
      status: 'confirmed',
      image: imageSrc6
    },
    {
      id: 'BK2025003',
      title: '청춘 콘서트',
      date: '2025-06-05',
      venue: '소극장',
      status: 'confirmed',
      image: imageSrc7
    }
  ];

  // 사용 가능한 쿠폰
  const availableCoupons = [
    { name: '신규 회원 할인 쿠폰', discount: '20%', expiry: '2025-06-30' },
    { name: '봄 시즌 특별 할인', discount: '15%', expiry: '2025-05-31' }
  ];

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return '예매 확정';
      case 'cancelled': return '예매 취소';
      case 'completed': return '관람 완료';
      default: return status;
    }
  };

  return (
    <>
      <Header />
      <div style={{
        background: '#ffffff',
        minHeight: '100vh',
        paddingTop: '6rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          {/* 페이지 헤더 */}
          <div style={{
            background: '#000000',
            color: '#ffffff',
            padding: '3rem 2rem',
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              margin: '0 0 1rem 0',
              textTransform: 'uppercase',
              letterSpacing: '2px'
            }}>마이페이지</h1>
            <p style={{
              fontSize: '1.2rem',
              margin: '0',
              color: '#cccccc'
            }}>안녕하세요, {profileData.name}님</p>
          </div>

          {/* 개인정보 요약 */}
          <div style={{
            background: '#ffffff',
            border: '2px solid #000000',
            marginBottom: '3rem'
          }}>
            <div style={{
              background: '#000000',
              color: '#ffffff',
              padding: '1.5rem 2rem'
            }}>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: '700',
                margin: '0',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>내 정보</h3>
            </div>
            <div style={{ padding: '2rem' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '2rem',
                marginBottom: '2rem'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    color: '#999999',
                    fontSize: '0.9rem',
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>이름</div>
                  <div style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#000000'
                  }}>{profileData.name}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    color: '#999999',
                    fontSize: '0.9rem',
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>이메일</div>
                  <div style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#000000'
                  }}>{profileData.email}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    color: '#999999',
                    fontSize: '0.9rem',
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>휴대폰</div>
                  <div style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#000000'
                  }}>{profileData.phone}</div>
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Link 
                  to="/mypage/profile" 
                  style={{
                    background: '#000000',
                    color: '#ffffff',
                    border: 'none',
                    padding: '1rem 2rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    display: 'inline-block'
                  }}
                >
                  정보 수정하기
                </Link>
              </div>
            </div>
          </div>

          {/* 예매 내역 섹션 */}
          <div style={{
            background: '#ffffff',
            border: '2px solid #000000',
            marginBottom: '3rem'
          }}>
            <div style={{
              background: '#000000',
              color: '#ffffff',
              padding: '1.5rem 2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: '700',
                margin: '0',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>최근 예매 내역</h3>
              <Link 
                to="/mypage/booking-history" 
                style={{
                  color: '#cccccc',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
              >
                전체보기 →
              </Link>
            </div>
            <div style={{ padding: '2rem' }}>
              {recentBookings.map((booking) => (
                <div key={booking.id} style={{
                  display: 'grid',
                  gridTemplateColumns: '100px 1fr auto',
                  gap: '2rem',
                  alignItems: 'center',
                  padding: '1.5rem 0',
                  borderBottom: booking.id !== recentBookings[recentBookings.length - 1].id ? '1px solid #e0e0e0' : 'none'
                }}>
                  <div>
                    <img 
                      src={booking.image} 
                      alt={booking.title}
                      style={{
                        width: '100px',
                        height: '100px',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                  <div>
                    <h4 style={{
                      fontSize: '1.2rem',
                      fontWeight: '600',
                      margin: '0 0 0.5rem 0',
                      color: '#000000'
                    }}>{booking.title}</h4>
                    <p style={{
                      color: '#666666',
                      margin: '0 0 0.5rem 0',
                      fontSize: '1rem'
                    }}>{booking.date} | {booking.venue}</p>
                    <span style={{
                      background: '#f0f0f0',
                      color: '#000000',
                      padding: '0.5rem 1rem',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}>
                      {getStatusText(booking.status)}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <Link 
                      to={`/mypage/booking-detail?id=${booking.id}`}
                      style={{
                        background: '#ffffff',
                        color: '#000000',
                        border: '2px solid #000000',
                        padding: '0.8rem 1.5rem',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                      }}
                    >
                      상세보기
                    </Link>
                    <Link 
                      to={`/mypage/mobile-ticket?id=${booking.id}`}
                      style={{
                        background: '#000000',
                        color: '#ffffff',
                        border: '2px solid #000000',
                        padding: '0.8rem 1.5rem',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                      }}
                    >
                      모바일 티켓
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 포인트 & 쿠폰 섹션 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {/* 포인트 카드 */}
            <div style={{
              background: '#ffffff',
              border: '2px solid #000000'
            }}>
              <div style={{
                background: '#000000',
                color: '#ffffff',
                padding: '1.5rem 2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  margin: '0',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>포인트</h3>
                <Link 
                  to="/mypage/points" 
                  style={{
                    color: '#cccccc',
                    textDecoration: 'none',
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}
                >
                  내역 →
                </Link>
              </div>
              <div style={{ padding: '2rem', textAlign: 'center' }}>
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: '700',
                  color: '#000000',
                  marginBottom: '1rem'
                }}>
                  {profileData.points.toLocaleString()}P
                </div>
                <div style={{
                  color: '#666666',
                  fontSize: '0.9rem'
                }}>
                  만료 예정: {profileData.expiringPoints.toLocaleString()}P
                </div>
              </div>
            </div>

            {/* 쿠폰 카드 */}
            <div style={{
              background: '#ffffff',
              border: '2px solid #000000'
            }}>
              <div style={{
                background: '#000000',
                color: '#ffffff',
                padding: '1.5rem 2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  margin: '0',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>쿠폰</h3>
                <Link 
                  to="/mypage/coupons" 
                  style={{
                    color: '#cccccc',
                    textDecoration: 'none',
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}
                >
                  관리 →
                </Link>
              </div>
              <div style={{ padding: '2rem', textAlign: 'center' }}>
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: '700',
                  color: '#000000',
                  marginBottom: '1rem'
                }}>
                  {availableCoupons.length}장
                </div>
                <div style={{
                  color: '#666666',
                  fontSize: '0.9rem'
                }}>
                  사용 가능한 쿠폰
                </div>
              </div>
            </div>
          </div>

          {/* 바로가기 섹션 */}
          <div style={{
            background: '#ffffff',
            border: '2px solid #000000',
            marginBottom: '3rem'
          }}>
            <div style={{
              background: '#000000',
              color: '#ffffff',
              padding: '1.5rem 2rem'
            }}>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: '700',
                margin: '0',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>바로가기</h3>
            </div>
            <div style={{
              padding: '2rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '2rem'
            }}>
              <Link 
                to="/customerservice" 
                style={{
                  background: '#f8f8f8',
                  padding: '2rem',
                  textAlign: 'center',
                  textDecoration: 'none',
                  color: '#000000',
                  border: '1px solid #e0e0e0'
                }}
              >
                <div style={{
                  fontSize: '2rem',
                  marginBottom: '1rem'
                }}>📞</div>
                <span style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>고객센터</span>
              </Link>
              <Link 
                to="/customerservice/notice" 
                style={{
                  background: '#f8f8f8',
                  padding: '2rem',
                  textAlign: 'center',
                  textDecoration: 'none',
                  color: '#000000',
                  border: '1px solid #e0e0e0'
                }}
              >
                <div style={{
                  fontSize: '2rem',
                  marginBottom: '1rem'
                }}>📢</div>
                <span style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>공지사항</span>
              </Link>
              <Link 
                to="/performances" 
                style={{
                  background: '#f8f8f8',
                  padding: '2rem',
                  textAlign: 'center',
                  textDecoration: 'none',
                  color: '#000000',
                  border: '1px solid #e0e0e0'
                }}
              >
                <div style={{
                  fontSize: '2rem',
                  marginBottom: '1rem'
                }}>🎭</div>
                <span style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>공연예매</span>
              </Link>
              <Link 
                to="/mypage/profile" 
                style={{
                  background: '#f8f8f8',
                  padding: '2rem',
                  textAlign: 'center',
                  textDecoration: 'none',
                  color: '#000000',
                  border: '1px solid #e0e0e0'
                }}
              >
                <div style={{
                  fontSize: '2rem',
                  marginBottom: '1rem'
                }}>⚙️</div>
                <span style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>설정</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}