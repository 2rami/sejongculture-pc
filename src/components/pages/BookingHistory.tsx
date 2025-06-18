import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import '../../styles/BookingHistory.css';
import imageSrc4 from '../../assets/images/image-4.jpeg';
import imageSrc6 from '../../assets/images/image-6.jpeg';
import imageSrc7 from '../../assets/images/image-7.jpeg';
import imageSrc25 from '../../assets/images/image-25.jpeg';

interface BookingItem {
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
}

export default function BookingHistory() {
  const [filterStatus, setFilterStatus] = useState<'all' | 'confirmed' | 'cancelled' | 'completed'>('all');

  // 예매 내역 데이터
  const bookingHistory: BookingItem[] = [
    {
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
      ticketNumber: 'T202500001'
    },
    {
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
      ticketNumber: 'T202500002'
    },
    {
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
      ticketNumber: 'T202500003'
    },
    {
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
      ticketNumber: 'T202500004'
    }
  ];

  const filteredBookings = filterStatus === 'all' 
    ? bookingHistory 
    : bookingHistory.filter(booking => booking.status === filterStatus);

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
      <div className="booking-history-page">
        <div className="page-container">
          <div className="page-header">
            <Link to="/mypage" className="back-link">← 마이페이지</Link>
            <h1>예매 내역</h1>
            <p>예매하신 공연 목록을 확인하세요</p>
          </div>

          {/* 필터 버튼 */}
          <div className="filter-section">
            <button 
              className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
              onClick={() => setFilterStatus('all')}
            >
              전체
            </button>
            <button 
              className={`filter-btn ${filterStatus === 'confirmed' ? 'active' : ''}`}
              onClick={() => setFilterStatus('confirmed')}
            >
              예매 확정
            </button>
            <button 
              className={`filter-btn ${filterStatus === 'completed' ? 'active' : ''}`}
              onClick={() => setFilterStatus('completed')}
            >
              관람 완료
            </button>
            <button 
              className={`filter-btn ${filterStatus === 'cancelled' ? 'active' : ''}`}
              onClick={() => setFilterStatus('cancelled')}
            >
              예매 취소
            </button>
          </div>

          {/* 예매 내역 리스트 */}
          <div className="booking-list">
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <div key={booking.id} className="booking-item">
                  <div className="booking-image">
                    <img src={booking.image} alt={booking.performanceTitle} />
                  </div>
                  <div className="booking-info">
                    <div className="booking-header">
                      <h3>{booking.performanceTitle}</h3>
                      <span className={`status-badge ${getStatusClass(booking.status)}`}>
                        {getStatusText(booking.status)}
                      </span>
                    </div>
                    <div className="booking-details">
                      <p><strong>장소:</strong> {booking.venue}</p>
                      <p><strong>공연일:</strong> {booking.date} {booking.time}</p>
                      <p><strong>좌석:</strong> {booking.seats.join(', ')}</p>
                      <p><strong>예매일:</strong> {booking.bookingDate}</p>
                      <p><strong>결제금액:</strong> {booking.totalPrice.toLocaleString()}원</p>
                    </div>
                  </div>
                  <div className="booking-actions">
                    <Link 
                      to={`/mypage/booking-detail?id=${booking.id}`}
                      className="detail-btn"
                    >
                      상세보기
                    </Link>
                    {booking.status === 'confirmed' && (
                      <Link 
                        to={`/mypage/mobile-ticket?id=${booking.id}`}
                        className="ticket-btn"
                      >
                        모바일 티켓
                      </Link>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <p>예매 내역이 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}