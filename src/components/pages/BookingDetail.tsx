import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Header from '../Header';
import '../../styles/BookingDetail.css';
import imageSrc4 from '../../assets/images/image-4.jpeg';
import imageSrc6 from '../../assets/images/image-6.jpeg';
import imageSrc7 from '../../assets/images/image-7.jpeg';
import imageSrc25 from '../../assets/images/image-25.jpeg';

interface BookingDetailData {
  id: string;
  performanceTitle: string;
  venue: string;
  date: string;
  time: string;
  seats: string[];
  totalPrice: number;
  bookingDate: string;
  status: 'confirmed' | 'cancelled' | 'completed';
  image: string;
  ticketNumber: string;
  bookingNumber: string;
  paymentMethod: string;
  paymentDate: string;
  refundInfo?: string;
  performer: string;
  duration: string;
  grade: string;
  cancelPolicy: string;
}

export default function BookingDetail() {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get('id');

  const bookingDetails: { [key: string]: BookingDetailData } = {
    'BK2025001': {
      id: 'BK2025001',
      performanceTitle: '동양미래특급',
      venue: '세종대극장',
      date: '2025-05-15',
      time: '19:30',
      seats: ['A구역 3열 15번', 'A구역 3열 16번'],
      totalPrice: 360000,
      bookingDate: '2025-04-20',
      status: 'confirmed',
      image: imageSrc4,
      ticketNumber: 'T202500001',
      bookingNumber: 'BK202504200001',
      paymentMethod: '신용카드 (KB국민카드 1234****)',
      paymentDate: '2025-04-20 14:23:15',
      performer: '세종챔버앙상블',
      duration: '120분 (중간휴식 20분)',
      grade: '만 7세 이상',
      cancelPolicy: '공연일 3일 전까지 100% 환불'
    },
    'BK2025002': {
      id: 'BK2025002',
      performanceTitle: '봄의 전설',
      venue: '세종M홀',
      date: '2025-05-23',
      time: '14:00',
      seats: ['R구역 5열 8번'],
      totalPrice: 130000,
      bookingDate: '2025-04-15',
      status: 'confirmed',
      image: imageSrc6,
      ticketNumber: 'T202500002',
      bookingNumber: 'BK202504150001',
      paymentMethod: '신용카드 (삼성카드 5678****)',
      paymentDate: '2025-04-15 16:45:32',
      performer: '서울시립교향악단',
      duration: '90분',
      grade: '만 5세 이상',
      cancelPolicy: '공연일 7일 전까지 100% 환불'
    },
    'BK2025003': {
      id: 'BK2025003',
      performanceTitle: '청춘 콘서트',
      venue: '소극장',
      date: '2025-06-05',
      time: '20:30',
      seats: ['S구역 2열 12번', 'S구역 2열 13번'],
      totalPrice: 120000,
      bookingDate: '2025-05-01',
      status: 'confirmed',
      image: imageSrc7,
      ticketNumber: 'T202500003',
      bookingNumber: 'BK202505010001',
      paymentMethod: '카카오페이',
      paymentDate: '2025-05-01 11:20:45',
      performer: '청춘뮤직앙상블',
      duration: '100분 (중간휴식 15분)',
      grade: '만 12세 이상',
      cancelPolicy: '공연일 1일 전까지 90% 환불'
    },
    'BK2025004': {
      id: 'BK2025004',
      performanceTitle: '아뜰리에 광화 봄 전시',
      venue: '야외전시',
      date: '2025-03-20',
      time: '14:00',
      seats: ['일반 입장권 2매'],
      totalPrice: 40000,
      bookingDate: '2025-03-01',
      status: 'completed',
      image: imageSrc25,
      ticketNumber: 'T202500004',
      bookingNumber: 'BK202503010001',
      paymentMethod: '신용카드 (현대카드 9012****)',
      paymentDate: '2025-03-01 09:15:23',
      performer: '아뜰리에 광화',
      duration: '자유관람',
      grade: '전체 관람가',
      cancelPolicy: '전시일 당일까지 100% 환불'
    }
  };

  const booking = bookingId ? bookingDetails[bookingId] : null;

  if (!booking) {
    return (
      <>
        <Header />
        <div className="booking-detail-page">
          <div className="page-container">
            <div className="error-message">
              <h2>예매 정보를 찾을 수 없습니다.</h2>
              <Link to="/mypage/booking-history" className="back-btn">예매 내역으로 돌아가기</Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return '예매 확정';
      case 'cancelled': return '예매 취소';
      case 'completed': return '관람 완료';
      default: return status;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'confirmed': return 'status-confirmed';
      case 'cancelled': return 'status-cancelled';
      case 'completed': return 'status-completed';
      default: return '';
    }
  };

  return (
    <>
      <Header />
      <div className="booking-detail-page">
        <div className="page-container">
          <div className="page-header">
            <Link to="/mypage/booking-history" className="back-link">← 예매 내역</Link>
            <h1>예매 상세 정보</h1>
            <p>예매하신 공연의 상세 정보를 확인하세요</p>
          </div>

          <div className="booking-detail-container">
            <div className="booking-summary">
              <div className="booking-image">
                <img src={booking.image} alt={booking.performanceTitle} />
              </div>
              <div className="booking-basic-info">
                <div className="booking-title-section">
                  <h2>{booking.performanceTitle}</h2>
                  <span className={`status-badge ${getStatusClass(booking.status)}`}>
                    {getStatusText(booking.status)}
                  </span>
                </div>
                <div className="booking-info-grid">
                  <div className="info-item">
                    <span className="label">장소</span>
                    <span className="value">{booking.venue}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">공연일시</span>
                    <span className="value">{booking.date} {booking.time}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">좌석</span>
                    <span className="value">{booking.seats.join(', ')}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">관람등급</span>
                    <span className="value">{booking.grade}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">공연시간</span>
                    <span className="value">{booking.duration}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">출연진</span>
                    <span className="value">{booking.performer}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="booking-details-section">
              <div className="details-card">
                <h3>예매 정보</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="label">예매번호</span>
                    <span className="value">{booking.bookingNumber}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">티켓번호</span>
                    <span className="value">{booking.ticketNumber}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">예매일</span>
                    <span className="value">{booking.bookingDate}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">결제금액</span>
                    <span className="value total-price">{booking.totalPrice.toLocaleString()}원</span>
                  </div>
                </div>
              </div>

              <div className="details-card">
                <h3>결제 정보</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="label">결제수단</span>
                    <span className="value">{booking.paymentMethod}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">결제일시</span>
                    <span className="value">{booking.paymentDate}</span>
                  </div>
                </div>
              </div>

              <div className="details-card">
                <h3>취소/환불 정책</h3>
                <div className="policy-content">
                  <p>{booking.cancelPolicy}</p>
                  <ul>
                    <li>티켓 수령 후 분실 및 훼손에 대한 책임은 예매자에게 있습니다.</li>
                    <li>공연 당일 환불은 불가합니다.</li>
                    <li>부분 환불은 불가하며, 전체 좌석에 대해서만 환불 가능합니다.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="action-buttons">
              {booking.status === 'confirmed' && (
                <>
                  <Link 
                    to={`/mypage/mobile-ticket?id=${booking.id}`}
                    className="mobile-ticket-btn"
                  >
                    모바일 티켓 보기
                  </Link>
                  <button className="cancel-btn">
                    예매 취소
                  </button>
                </>
              )}
              {booking.status === 'completed' && (
                <button className="review-btn">
                  리뷰 작성
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}