import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Header from '../Header';
import '../../styles/MobileTicket.css';
import imageSrc4 from '../../assets/images/image-4.jpeg';
import imageSrc6 from '../../assets/images/image-6.jpeg';
import imageSrc7 from '../../assets/images/image-7.jpeg';
import imageSrc25 from '../../assets/images/image-25.jpeg';

interface MobileTicketData {
  id: string;
  performanceTitle: string;
  venue: string;
  date: string;
  time: string;
  seats: string[];
  totalPrice: number;
  image: string;
  ticketNumber: string;
  bookingNumber: string;
  qrCode: string;
  performer: string;
  duration: string;
  grade: string;
  gateInfo: string;
  entryTime: string;
}

export default function MobileTicket() {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get('id');
  const [brightness, setBrightness] = useState(100);

  const ticketData: { [key: string]: MobileTicketData } = {
    'BK2025001': {
      id: 'BK2025001',
      performanceTitle: '동양미래특급',
      venue: '세종대극장',
      date: '2025-05-15',
      time: '19:30',
      seats: ['A구역 3열 15번', 'A구역 3열 16번'],
      totalPrice: 360000,
      image: imageSrc4,
      ticketNumber: 'T202500001',
      bookingNumber: 'BK202504200001',
      qrCode: 'QR202500001ABC',
      performer: '세종챔버앙상블',
      duration: '120분 (중간휴식 20분)',
      grade: '만 7세 이상',
      gateInfo: '정문 입구',
      entryTime: '공연시작 30분 전부터'
    },
    'BK2025002': {
      id: 'BK2025002',
      performanceTitle: '봄의 전설',
      venue: '세종M홀',
      date: '2025-05-23',
      time: '14:00',
      seats: ['R구역 5열 8번'],
      totalPrice: 130000,
      image: imageSrc6,
      ticketNumber: 'T202500002',
      bookingNumber: 'BK202504150001',
      qrCode: 'QR202500002DEF',
      performer: '서울시립교향악단',
      duration: '90분',
      grade: '만 5세 이상',
      gateInfo: '후문 입구',
      entryTime: '공연시작 20분 전부터'
    },
    'BK2025003': {
      id: 'BK2025003',
      performanceTitle: '청춘 콘서트',
      venue: '소극장',
      date: '2025-06-05',
      time: '20:30',
      seats: ['S구역 2열 12번', 'S구역 2열 13번'],
      totalPrice: 120000,
      image: imageSrc7,
      ticketNumber: 'T202500003',
      bookingNumber: 'BK202505010001',
      qrCode: 'QR202500003GHI',
      performer: '청춘뮤직앙상블',
      duration: '100분 (중간휴식 15분)',
      grade: '만 12세 이상',
      gateInfo: '측면 입구',
      entryTime: '공연시작 25분 전부터'
    }
  };

  const ticket = bookingId ? ticketData[bookingId] : null;

  if (!ticket) {
    return (
      <>
        <Header />
        <div className="mobile-ticket-page">
          <div className="page-container">
            <div className="error-message">
              <h2>티켓 정보를 찾을 수 없습니다.</h2>
              <Link to="/mypage/booking-history" className="back-btn">예매 내역으로 돌아가기</Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  const handleBrightnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrightness(parseInt(e.target.value));
  };

  return (
    <>
      <Header />
      <div className="mobile-ticket-page">
        <div className="page-container">
          <div className="page-header">
            <Link to="/mypage/booking-history" className="back-link">← 예매 내역</Link>
            <h1>모바일 티켓</h1>
            <p>입장 시 QR코드를 스캔해주세요</p>
          </div>

          <div className="ticket-controls">
            <div className="brightness-control">
              <span className="brightness-label">화면 밝기</span>
              <input 
                type="range" 
                min="50" 
                max="100" 
                value={brightness}
                onChange={handleBrightnessChange}
                className="brightness-slider"
              />
              <span className="brightness-value">{brightness}%</span>
            </div>
          </div>

          <div 
            className="mobile-ticket-container"
            style={{ filter: `brightness(${brightness}%)` }}
          >
            <div className="ticket-header">
              <div className="ticket-logo">
                <h2>세종문화회관</h2>
                <p>Sejong Center</p>
              </div>
              <div className="ticket-type">
                <span>모바일 티켓</span>
              </div>
            </div>

            <div className="ticket-main">
              <div className="performance-image">
                <img src={ticket.image} alt={ticket.performanceTitle} />
              </div>
              
              <div className="ticket-info">
                <h3 className="performance-title">{ticket.performanceTitle}</h3>
                <div className="ticket-details">
                  <div className="detail-row">
                    <span className="label">공연장</span>
                    <span className="value">{ticket.venue}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">일시</span>
                    <span className="value">{ticket.date} {ticket.time}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">좌석</span>
                    <span className="value">{ticket.seats.join(', ')}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">입장</span>
                    <span className="value">{ticket.gateInfo}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">입장시간</span>
                    <span className="value">{ticket.entryTime}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="qr-section">
              <div className="qr-code">
                <div className="qr-placeholder">
                  <div className="qr-pattern">
                    <div className="qr-corner"></div>
                    <div className="qr-corner"></div>
                    <div className="qr-corner"></div>
                    <div className="qr-corner"></div>
                    <div className="qr-center"></div>
                  </div>
                </div>
                <p className="qr-text">{ticket.qrCode}</p>
              </div>
              <div className="qr-info">
                <p>입장 시 이 QR코드를 스캔해주세요</p>
                <p className="ticket-warning">• 스크린샷이나 캡처 이미지는 입장이 불가합니다</p>
                <p className="ticket-warning">• 티켓은 공연 당일에만 유효합니다</p>
              </div>
            </div>

            <div className="ticket-footer">
              <div className="ticket-numbers">
                <div className="ticket-number">
                  <span className="label">티켓번호</span>
                  <span className="value">{ticket.ticketNumber}</span>
                </div>
                <div className="booking-number">
                  <span className="label">예매번호</span>
                  <span className="value">{ticket.bookingNumber}</span>
                </div>
              </div>
              <div className="validity-info">
                <p>이 티켓은 {ticket.date}에만 유효합니다</p>
              </div>
            </div>
          </div>

          <div className="ticket-notice">
            <h4>모바일 티켓 이용 안내</h4>
            <ul>
              <li>공연장 입장 시 모바일 티켓의 QR코드를 제시해주세요.</li>
              <li>스크린샷이나 캡처된 이미지로는 입장이 불가합니다.</li>
              <li>배터리 부족에 대비하여 미리 충전을 완료해주세요.</li>
              <li>네트워크 연결이 원활하지 않을 수 있으니 미리 확인해주세요.</li>
              <li>분실 시 고객센터(02-399-1000)로 연락주세요.</li>
            </ul>
          </div>

          <div className="action-buttons">
            <Link 
              to={`/mypage/booking-detail?id=${ticket.id}`}
              className="detail-btn"
            >
              예매 상세보기
            </Link>
            <button 
              className="save-btn"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: `${ticket.performanceTitle} 모바일 티켓`,
                    text: `${ticket.date} ${ticket.time} ${ticket.venue}`,
                  });
                } else {
                  alert('모바일 티켓을 저장하려면 스크린샷을 찍어주세요.');
                }
              }}
            >
              티켓 저장
            </button>
          </div>
        </div>
      </div>
    </>
  );
}