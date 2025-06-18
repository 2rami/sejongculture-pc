import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import '../../styles/MyPage.css';
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

  // 최근 포인트 내역 (최대 3개)
  const recentPoints = [
    { date: '2025-05-01', description: '동양미래특급 예매', points: '+3,600', type: 'earned' },
    { date: '2025-04-25', description: '봄의 전설 할인 사용', points: '-5,000', type: 'used' },
    { date: '2025-04-20', description: '봄의 전설 예매', points: '+1,300', type: 'earned' }
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
      <div className="mypage">
        <div className="page-container">
          <div className="mypage-header">
            <h1>마이페이지</h1>
            <p>안녕하세요, {profileData.name}님</p>
          </div>

          {/* 개인정보 요약 */}
          <div className="profile-summary">
            <div className="profile-info">
              <h3>내 정보</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="label">이름</span>
                  <span className="value">{profileData.name}</span>
                </div>
                <div className="info-item">
                  <span className="label">이메일</span>
                  <span className="value">{profileData.email}</span>
                </div>
                <div className="info-item">
                  <span className="label">휴대폰</span>
                  <span className="value">{profileData.phone}</span>
                </div>
              </div>
              <Link to="/mypage/profile" className="detail-link">정보 수정하기 →</Link>
            </div>
            
            <div className="points-summary">
              <h3>포인트</h3>
              <div className="points-info">
                <div className="current-points">
                  <span className="points-amount">{profileData.points.toLocaleString()}P</span>
                  <span className="points-label">보유 포인트</span>
                </div>
                <div className="expiring-points">
                  <span className="expiring-amount">{profileData.expiringPoints.toLocaleString()}P</span>
                  <span className="expiring-label">소멸 예정</span>
                </div>
              </div>
              <Link to="/mypage/points" className="detail-link">포인트 내역 →</Link>
            </div>
          </div>

          {/* 예매 내역 섹션 */}
          <div className="section">
            <div className="section-header">
              <h2>최근 예매 내역</h2>
              <Link to="/mypage/booking-history" className="more-link">전체보기 →</Link>
            </div>
            <div className="booking-list">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="booking-item">
                  <div className="booking-image">
                    <img src={booking.image} alt={booking.title} />
                  </div>
                  <div className="booking-info">
                    <h4>{booking.title}</h4>
                    <p>{booking.date} | {booking.venue}</p>
                    <span className={`status ${booking.status}`}>
                      {getStatusText(booking.status)}
                    </span>
                  </div>
                  <div className="booking-actions">
                    <Link to={`/mypage/booking-detail?id=${booking.id}`} className="detail-btn">
                      상세보기
                    </Link>
                    <Link to={`/mypage/mobile-ticket?id=${booking.id}`} className="ticket-btn">
                      모바일 티켓
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 쿠폰 섹션 */}
          <div className="section">
            <div className="section-header">
              <h2>사용 가능한 쿠폰</h2>
              <Link to="/mypage/coupons" className="more-link">쿠폰 관리 →</Link>
            </div>
            <div className="coupon-list">
              {availableCoupons.map((coupon, index) => (
                <div key={index} className="coupon-item">
                  <div className="coupon-discount">{coupon.discount}</div>
                  <div className="coupon-info">
                    <h4>{coupon.name}</h4>
                    <p>유효기간: {coupon.expiry}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 포인트 내역 섹션 */}
          <div className="section">
            <div className="section-header">
              <h2>최근 포인트 내역</h2>
              <Link to="/mypage/points" className="more-link">전체보기 →</Link>
            </div>
            <div className="points-list">
              {recentPoints.map((point, index) => (
                <div key={index} className="point-item">
                  <div className="point-info">
                    <h4>{point.description}</h4>
                    <p>{point.date}</p>
                  </div>
                  <div className={`point-amount ${point.type}`}>
                    {point.points}P
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 고객센터 섹션 */}
          <div className="section">
            <div className="section-header">
              <h2>고객센터</h2>
              <Link to="/mypage/customer-service" className="more-link">문의하기 →</Link>
            </div>
            <div className="customer-service-info">
              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div className="contact-details">
                  <h4>전화 문의</h4>
                  <p>02-399-1000</p>
                  <span>평일 09:00 - 18:00</span>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">✉️</div>
                <div className="contact-details">
                  <h4>이메일 문의</h4>
                  <p>customer@sejongpac.or.kr</p>
                  <span>24시간 접수 가능</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}