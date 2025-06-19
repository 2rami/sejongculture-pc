import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../Header';
import '../../styles/Booking.css';

// sub-2 asset 이미지들 import
import src2_1 from '../../assets/images/sub-2 asset/src2-1.jpeg';
import src2_2 from '../../assets/images/sub-2 asset/src2-2.jpg';
import src2_3 from '../../assets/images/sub-2 asset/src2-3.jpg';
import src2_4 from '../../assets/images/sub-2 asset/src2-4.jpg';
import src2_5 from '../../assets/images/sub-2 asset/src2-5.jpg';

// main 이미지들 import (홈에서 사용하는 이미지들)
import imageSrc4 from '../../assets/images/image-4.jpeg';
import imageSrc6 from '../../assets/images/image-6.jpeg';
import imageSrc7 from '../../assets/images/image-7.jpeg';
import imageSrc8 from '../../assets/images/image-8.jpeg';
import imageSrc9 from '../../assets/images/image-9.jpeg';
import imageSrc14 from '../../assets/images/image-14.jpeg';
import imageSrc15 from '../../assets/images/image-15.jpeg';
import imageSrc25 from '../../assets/images/image-25.jpeg';
import imageSrc26 from '../../assets/images/image-26.jpeg';
import imageSrc27 from '../../assets/images/image-27.jpeg';
import imageSrc28 from '../../assets/images/image-28.jpeg';

interface Performance {
  id: string;
  title: string;
  subtitle: string;
  venue: string;
  dates: string[];
  times: string[];
  prices: { seat: string; price: number }[];
  image: string;
  description: string;
}

export default function Booking() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const performanceId = searchParams.get('id') || '1';
  
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedSeat, setSelectedSeat] = useState('');
  const [ticketCount, setTicketCount] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  
  // 날짜별 시간 데이터
  const timesByDate: { [key: string]: string[] } = {
    '2025-04-10': ['14:00', '19:30'],
    '2025-04-13': ['15:00', '19:00'],
    '2025-04-17': ['14:30', '18:30'],
    '2025-04-20': ['16:00', '20:00'],
    '2025-05-15': ['14:00', '19:30'],
    '2025-05-18': ['15:30', '19:00'],
    '2025-05-22': ['14:00', '18:00'],
    '2025-05-25': ['16:30', '20:30'],
    '2025-06-01': ['14:00', '19:30'],
    '2025-06-05': ['15:00', '19:00'],
    '2025-06-10': ['14:30', '18:30'],
    '2025-06-15': ['16:00', '20:00'],
    '2025-09-10': ['14:00', '19:30'],
    '2025-09-13': ['15:30', '19:00'],
    '2025-09-17': ['14:00', '18:00'],
    '2025-09-20': ['16:30', '20:30'],
    '2025-11-15': ['14:00', '19:30'],
    '2025-11-18': ['15:00', '19:00'],
    '2025-11-22': ['14:30', '18:30'],
    '2025-11-25': ['16:00', '20:00']
  };
  
  // 날짜 변경 시 시간 초기화 및 첫 번째 시간 자동 선택
  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    const availableTimes = timesByDate[date] || currentPerformance.times;
    setSelectedTime(availableTimes[0] || '');
  };
  
  // 좌석 클릭 핸들러
  const handleSeatClick = (seatId: string, seatType: string) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else if (selectedSeats.length < ticketCount) {
      setSelectedSeats([...selectedSeats, seatId]);
      if (!selectedSeat) {
        setSelectedSeat(seatType);
      }
    }
  };
  
  // 좌석맵 렌더링
  const renderSeatMap = () => {
    const sections = [
      { name: 'VIP석', type: 'vip', rows: 3, seatsPerRow: 20, startRow: 'A' },
      { name: 'R석', type: 'r', rows: 5, seatsPerRow: 24, startRow: 'D' },
      { name: 'S석', type: 's', rows: 6, seatsPerRow: 28, startRow: 'I' },
      { name: 'A석', type: 'a', rows: 8, seatsPerRow: 32, startRow: 'O' }
    ];
    
    return (
      <div className="seat-map-container">
        {sections.map((section, sectionIndex) => (
          <div key={section.type} className="seat-section">
            <div className="section-label">{section.name}</div>
            {Array.from({ length: section.rows }, (_, rowIndex) => {
              const rowLetter = String.fromCharCode(section.startRow.charCodeAt(0) + rowIndex);
              return (
                <div key={rowLetter} className="seat-row">
                  <span className="row-label">{rowLetter}</span>
                  {Array.from({ length: section.seatsPerRow }, (_, seatIndex) => {
                    const seatNumber = seatIndex + 1;
                    const seatId = `${rowLetter}${seatNumber}`;
                    const isSelected = selectedSeats.includes(seatId);
                    const isUnavailable = (seatIndex + rowIndex) % 13 === 0; // 일부 좌석 예매불가
                    
                    // 통로 추가
                    const shouldAddAisle = seatIndex === Math.floor(section.seatsPerRow / 2) - 1;
                    
                    return (
                      <React.Fragment key={seatId}>
                        <div
                          className={`seat ${section.type} ${
                            isSelected ? 'selected' : ''
                          } ${isUnavailable ? 'unavailable' : ''}`}
                          onClick={() => !isUnavailable && handleSeatClick(seatId, section.name)}
                          title={`${seatId} (${section.name})`}
                        />
                        {shouldAddAisle && <div className="aisle" />}
                      </React.Fragment>
                    );
                  })}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  // 공연 데이터 (다른 페이지들과 동일한 이미지 사용)
  const performances: { [key: string]: Performance } = {
    '1': {
      id: '1',
      title: '봄의 전설',
      subtitle: 'Spring Legend',
      venue: '세종대극장',
      dates: ['2025-05-15', '2025-05-16', '2025-05-17', '2025-05-18'],
      times: ['14:00', '19:30'],
      prices: [
        { seat: 'VIP석', price: 100000 },
        { seat: 'R석', price: 80000 },
        { seat: 'S석', price: 60000 },
        { seat: 'A석', price: 40000 }
      ],
      image: imageSrc7,
      description: '봄의 감동을 전하는 대형 뮤지컬 공연입니다.'
    },
    '2': {
      id: '2',
      title: '클래식 갈라 콘서트',
      subtitle: 'Classic Gala Concert',
      venue: '세종M홀',
      dates: ['2025-05-20', '2025-05-21', '2025-05-22'],
      times: ['19:30'],
      prices: [
        { seat: 'VIP석', price: 120000 },
        { seat: 'R석', price: 90000 },
        { seat: 'S석', price: 70000 }
      ],
      image: imageSrc8,
      description: '세계적인 연주자들과 함께하는 특별한 클래식 콘서트입니다.'
    },
    '3': {
      id: '3',
      title: '현대 미술 전시',
      subtitle: 'Modern Art Exhibition',
      venue: '세종갤러리',
      dates: ['2025-06-01', '2025-06-02', '2025-06-03', '2025-06-04'],
      times: ['10:00', '14:00'],
      prices: [
        { seat: '일반', price: 15000 },
        { seat: '학생', price: 10000 },
        { seat: '경로', price: 8000 }
      ],
      image: imageSrc25,
      description: '현대 미술의 흐름을 한눈에 볼 수 있는 특별 기획전입니다.'
    },
    '4': {
      id: '4',
      title: '청춘 콘서트',
      subtitle: 'Youth Concert',
      venue: '소극장',
      dates: ['2025-06-10', '2025-06-11', '2025-06-12'],
      times: ['18:00', '20:30'],
      prices: [
        { seat: 'R석', price: 45000 },
        { seat: 'S석', price: 35000 },
        { seat: 'A석', price: 25000 }
      ],
      image: imageSrc26,
      description: '젊은 아티스트들의 열정적인 무대를 만나보세요.'
    },
    '5': {
      id: '5',
      title: '발레 백조의 호수',
      subtitle: 'Swan Lake Ballet',
      venue: '세종대극장',
      dates: ['2025-06-20', '2025-06-21', '2025-06-22', '2025-06-23'],
      times: ['14:00', '19:30'],
      prices: [
        { seat: 'VIP석', price: 120000 },
        { seat: 'R석', price: 90000 },
        { seat: 'S석', price: 70000 },
        { seat: 'A석', price: 50000 }
      ],
      image: imageSrc27,
      description: '차이콥스키의 불멸의 명작 백조의 호수를 만나보세요.'
    },
    '6': {
      id: '6',
      title: '재즈의 밤',
      subtitle: 'Jazz Night',
      venue: '세종M홀',
      dates: ['2025-07-01', '2025-07-02', '2025-07-03'],
      times: ['20:00'],
      prices: [
        { seat: 'R석', price: 55000 },
        { seat: 'S석', price: 40000 },
        { seat: 'A석', price: 30000 }
      ],
      image: imageSrc28,
      description: '감미로운 재즈 선율이 흐르는 특별한 밤을 만나보세요.'
    },
    '7': {
      id: '7',
      title: '오페라 라 트라비아타',
      subtitle: 'La Traviata',
      venue: '세종대극장',
      dates: ['2025-07-10', '2025-07-12', '2025-07-15', '2025-07-18'],
      times: ['19:30'],
      prices: [
        { seat: 'VIP석', price: 150000 },
        { seat: 'R석', price: 100000 },
        { seat: 'S석', price: 80000 },
        { seat: 'A석', price: 60000 }
      ],
      image: imageSrc4,
      description: '베르디의 불멸의 명작 라 트라비아타를 만나보세요.'
    },
    '8': {
      id: '8',
      title: '한국 전통 예술제',
      subtitle: 'Korean Traditional Arts Festival',
      venue: '야외무대',
      dates: ['2025-08-01', '2025-08-02', '2025-08-03'],
      times: ['19:00'],
      prices: [
        { seat: '일반', price: 25000 },
        { seat: '학생', price: 15000 },
        { seat: '경로', price: 12000 }
      ],
      image: imageSrc6,
      description: '우리나라 전통 예술의 아름다움을 한자리에서 만나보는 특별한 축제입니다.'
    },
    '9': {
      id: '9',
      title: '현대 무용 공연',
      subtitle: 'Contemporary Dance',
      venue: '소극장',
      dates: ['2025-08-15', '2025-08-16', '2025-08-17'],
      times: ['19:30'],
      prices: [
        { seat: 'R석', price: 50000 },
        { seat: 'S석', price: 35000 },
        { seat: 'A석', price: 25000 }
      ],
      image: imageSrc9,
      description: '현대 무용의 새로운 가능성을 보여주는 실험적인 작품입니다.'
    },
    '10': {
      id: '10',
      title: '실험 연극',
      subtitle: 'Experimental Theater',
      venue: '소극장',
      dates: ['2025-09-01', '2025-09-02', '2025-09-03'],
      times: ['20:00'],
      prices: [
        { seat: 'R석', price: 40000 },
        { seat: 'S석', price: 30000 },
        { seat: 'A석', price: 20000 }
      ],
      image: imageSrc14,
      description: '기존의 연극 형식을 뛰어넘는 혁신적인 실험 연극입니다.'
    },
    '11': {
      id: '11',
      title: '가을 음악회',
      subtitle: 'Autumn Concert',
      venue: '세종M홀',
      dates: ['2025-09-15', '2025-09-16', '2025-09-17'],
      times: ['19:30'],
      prices: [
        { seat: 'R석', price: 60000 },
        { seat: 'S석', price: 45000 },
        { seat: 'A석', price: 35000 }
      ],
      image: imageSrc15,
      description: '가을의 정취를 담은 아름다운 클래식 음악회입니다.'
    },
    '12': {
      id: '12',
      title: '특별 기획전',
      subtitle: 'Special Exhibition',
      venue: '세종갤러리',
      dates: ['2025-10-01', '2025-10-05', '2025-10-10'],
      times: ['10:00', '14:00'],
      prices: [
        { seat: '일반', price: 20000 },
        { seat: '학생', price: 12000 },
        { seat: '경로', price: 10000 }
      ],
      image: imageSrc8,
      description: '다양한 장르의 예술가들이 참여하는 특별 기획전입니다.'
    },
    // 홈 슬라이더 공연들
    '101': {
      id: '101',
      title: '합창, 피어나다',
      subtitle: 'Blooming Chorus',
      venue: '세종M홀',
      dates: ['2025-05-07', '2025-05-08', '2025-05-09'],
      times: ['15:00', '19:00'],
      prices: [
        { seat: 'R석', price: 65000 },
        { seat: 'S석', price: 45000 },
        { seat: 'A석', price: 30000 }
      ],
      image: imageSrc8,
      description: '봄의 생명력을 노래하는 대규모 합창 공연입니다.'
    },
    '102': {
      id: '102',
      title: '봄의 전설',
      subtitle: 'Legend of Spring',
      venue: '대극장',
      dates: ['2025-04-15', '2025-04-17', '2025-04-20', '2025-04-24', '2025-04-28'],
      times: ['14:00', '19:30'],
      prices: [
        { seat: 'VIP석', price: 120000 },
        { seat: 'R석', price: 85000 },
        { seat: 'S석', price: 65000 },
        { seat: 'A석', price: 45000 }
      ],
      image: imageSrc7,
      description: '봄을 배경으로 한 감동적인 사랑 이야기를 그린 대형 뮤지컬입니다.'
    },
    '103': {
      id: '103',
      title: '청춘 콘서트',
      subtitle: 'Youth Concert',
      venue: '소극장',
      dates: ['2025-06-01', '2025-06-05', '2025-06-10', '2025-06-15'],
      times: ['18:00', '20:30'],
      prices: [
        { seat: 'R석', price: 55000 },
        { seat: 'S석', price: 40000 },
        { seat: 'A석', price: 25000 }
      ],
      image: imageSrc14,
      description: '젊은 세대를 위한 특별한 콘서트입니다.'
    },
    '104': {
      id: '104',
      title: '가을 음악회',
      subtitle: 'Autumn Concert',
      venue: '세종아트센터',
      dates: ['2025-09-10', '2025-09-13', '2025-09-17', '2025-09-20'],
      times: ['19:30'],
      prices: [
        { seat: 'VIP석', price: 90000 },
        { seat: 'R석', price: 70000 },
        { seat: 'S석', price: 50000 }
      ],
      image: imageSrc15,
      description: '가을의 정취를 담은 클래식 음악회입니다.'
    },
    // 카드 섹션 공연들 (Main.tsx의 카드 ID와 일치)
    '201': {
      id: '201',
      title: '2025 아뜰리에 광화 봄 전시',
      subtitle: '여명',
      venue: '야외전시',
      dates: ['2025-05-07', '2025-05-08', '2025-05-09'],
      times: ['09:00', '14:00'],
      prices: [
        { seat: '일반', price: 20000 },
        { seat: '학생', price: 15000 },
        { seat: '경로', price: 10000 }
      ],
      image: imageSrc25,
      description: '새로운 시작을 알리는 봄 전시입니다.'
    },
    '202': {
      id: '202',
      title: '세종 클래식 콘서트',
      subtitle: '봄의 선율',
      venue: '대극장',
      dates: ['2025-05-14', '2025-05-15', '2025-05-16'],
      times: ['15:00', '19:30'],
      prices: [
        { seat: 'VIP석', price: 110000 },
        { seat: 'R석', price: 80000 },
        { seat: 'S석', price: 60000 }
      ],
      image: imageSrc26,
      description: '봄을 주제로 한 클래식 명곡들을 모은 특별한 콘서트입니다.'
    },
    '203': {
      id: '203',
      title: '청춘 뮤지컬',
      subtitle: '꿈을 향해',
      venue: '소극장',
      dates: ['2025-05-21', '2025-05-22', '2025-05-23'],
      times: ['14:00', '19:00'],
      prices: [
        { seat: 'R석', price: 70000 },
        { seat: 'S석', price: 50000 },
        { seat: 'A석', price: 35000 }
      ],
      image: imageSrc27,
      description: '꿈을 향해 달려가는 청춘들의 이야기를 그린 감동적인 뮤지컬입니다.'
    },
    '204': {
      id: '204',
      title: '오케스트라 공연',
      subtitle: '환상',
      venue: '세종M홀',
      dates: ['2025-05-28', '2025-05-29', '2025-05-30'],
      times: ['19:30'],
      prices: [
        { seat: 'VIP석', price: 95000 },
        { seat: 'R석', price: 75000 },
        { seat: 'S석', price: 55000 }
      ],
      image: imageSrc28,
      description: '환상적인 오케스트라 연주를 통해 클래식 음악의 진수를 느껴보세요.'
    },
    // 랭킹 섹션 공연들
    '301': {
      id: '301',
      title: '동양미래특급',
      subtitle: '환상적인 공연',
      venue: '세종대극장',
      dates: ['2025-05-15', '2025-05-18', '2025-05-22', '2025-05-25', '2025-06-01'],
      times: ['14:00', '19:30'],
      prices: [
        { seat: 'VIP석', price: 200000 },
        { seat: 'R석', price: 150000 },
        { seat: 'S석', price: 120000 },
        { seat: 'A석', price: 80000 }
      ],
      image: imageSrc4,
      description: '미래를 배경으로 한 스펙터클한 뮤지컬입니다.'
    },
    '302': {
      id: '302',
      title: '봄의 전설',
      subtitle: '감동의 무대',
      venue: '세종M홀',
      dates: ['2025-05-20', '2025-05-23', '2025-05-27', '2025-05-30', '2025-06-05'],
      times: ['14:00', '19:30'],
      prices: [
        { seat: 'VIP석', price: 180000 },
        { seat: 'R석', price: 130000 },
        { seat: 'S석', price: 100000 },
        { seat: 'A석', price: 70000 }
      ],
      image: imageSrc6,
      description: '봄을 배경으로 펼쳐지는 아름다운 사랑 이야기입니다.'
    },
    '303': {
      id: '303',
      title: '청춘 콘서트',
      subtitle: '젊음의 열정',
      venue: '소극장',
      dates: ['2025-06-01', '2025-06-05', '2025-06-10', '2025-06-15'],
      times: ['18:00', '20:30'],
      prices: [
        { seat: 'R석', price: 80000 },
        { seat: 'S석', price: 60000 },
        { seat: 'A석', price: 40000 }
      ],
      image: imageSrc7,
      description: '젊은 아티스트들이 선사하는 에너지 넘치는 콘서트입니다.'
    },
    '304': {
      id: '304',
      title: '해리포터와 혼혈왕자 음악회',
      subtitle: '마법의 선율',
      venue: '야외무대',
      dates: ['2025-06-10', '2025-06-15', '2025-06-20', '2025-06-25'],
      times: ['19:00'],
      prices: [
        { seat: 'VIP석', price: 120000 },
        { seat: 'R석', price: 90000 },
        { seat: 'S석', price: 70000 }
      ],
      image: imageSrc9,
      description: '해리포터와 혼혈왕자 영화를 야외 대형 스크린으로 상영하며 오케스트라가 실시간으로 연주하는 마법 같은 음악회입니다.'
    }
  };

  const currentPerformance = performances[performanceId] || performances['1'];

  const handleBooking = () => {
    if (!selectedDate || !selectedTime || !selectedSeat) {
      alert('날짜, 시간, 좌석을 모두 선택해주세요.');
      return;
    }
    
    const selectedPrice = currentPerformance.prices.find(p => p.seat === selectedSeat);
    const totalPrice = (selectedPrice?.price || 0) * ticketCount;
    
    const confirmMessage = `예매가 완료되었습니다!\n공연: ${currentPerformance.title}\n날짜: ${selectedDate}\n시간: ${selectedTime}\n좌석: ${selectedSeat}\n매수: ${ticketCount}매\n총 금액: ${totalPrice.toLocaleString()}원\n\n마이페이지에서 예매 내역을 확인하시겠습니까?`;
    
    if (window.confirm(confirmMessage)) {
      navigate('/mypage');
    }
  };

  return (
    <>
      <Header />
      <div className="booking-page">
        <div className="page-container" style={{'--bg-image': `url(${currentPerformance.image})`} as React.CSSProperties}>
        <div className="booking-header">
          <div className="performance-image">
            <img src={currentPerformance.image} alt={currentPerformance.title} />
          </div>
          <div className="performance-info">
            <h1>{currentPerformance.title}</h1>
            <p className="subtitle">{currentPerformance.subtitle}</p>
            <p className="venue">장소: {currentPerformance.venue}</p>
            <p className="description">{currentPerformance.description}</p>
          </div>
        </div>

        <div className="booking-main">
          {/* 좌석 선택 영역 */}
          <div className="seat-selection-area">
            <h2>좌석 선택</h2>
            
            {/* 무대 */}
            <div className="stage">STAGE 무대</div>
            
            {/* 좌석맵 */}
            <div className="seat-map">
              {renderSeatMap()}
            </div>
            
            {/* 좌석 범례 */}
            <div className="seat-legend">
              <div className="legend-item">
                <div className="legend-color legend-vip"></div>
                <span>VIP석</span>
              </div>
              <div className="legend-item">
                <div className="legend-color legend-r"></div>
                <span>R석</span>
              </div>
              <div className="legend-item">
                <div className="legend-color legend-s"></div>
                <span>S석</span>
              </div>
              <div className="legend-item">
                <div className="legend-color legend-a"></div>
                <span>A석</span>
              </div>
              <div className="legend-item">
                <div className="legend-color legend-selected"></div>
                <span>선택됨</span>
              </div>
              <div className="legend-item">
                <div className="legend-color legend-unavailable"></div>
                <span>선택불가</span>
              </div>
            </div>
          </div>

          {/* 예매 정보 패널 */}
          <div className="booking-panel">
            <h2>예매 정보</h2>
            
            {/* 날짜 선택 */}
            <div className="form-section">
              <h3>공연 날짜</h3>
              <div className="date-options">
                {currentPerformance.dates.map(date => (
                  <button
                    key={date}
                    className={`option-btn ${selectedDate === date ? 'selected' : ''}`}
                    onClick={() => handleDateChange(date)}
                  >
                    {new Date(date).toLocaleDateString('ko-KR', { 
                      month: 'short', 
                      day: 'numeric'
                    })}
                  </button>
                ))}
              </div>
            </div>

            {/* 시간 선택 */}
            <div className="form-section">
              <h3>공연 시간</h3>
              <div className="time-options">
                {(selectedDate ? timesByDate[selectedDate] || currentPerformance.times : currentPerformance.times).map(time => (
                  <button
                    key={time}
                    className={`option-btn ${selectedTime === time ? 'selected' : ''}`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                </button>
              ))}
            </div>
          </div>

            
            {/* 좌석 등급별 가격 */}
            <div className="seat-prices">
              <h3>좌석 등급 / 가격</h3>
              <div className="price-list">
                {currentPerformance.prices.map((priceInfo, index) => (
                  <div
                    key={priceInfo.seat}
                    className={`price-item ${selectedSeat === priceInfo.seat ? 'selected' : ''}`}
                    onClick={() => setSelectedSeat(priceInfo.seat)}
                  >
                    <div className="seat-grade">
                      <div className={`grade-color grade-${['vip', 'r', 's', 'a'][index] || 'a'}`}></div>
                      <span>{priceInfo.seat}</span>
                    </div>
                    <div className="seat-info">
                      <div className="seat-price">{priceInfo.price.toLocaleString()}원</div>
                      <div className="seat-remaining">{135 - (index * 20)}석</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 선택된 좌석 정보 */}
            {selectedSeat && (
              <div className="selected-seats">
                <h3>선택된 좌석</h3>
                <div className="selected-seat-list">
                  <div className="selected-seat-item">
                    <span>{selectedSeat} x {ticketCount}매</span>
                    <span>{((currentPerformance.prices.find(p => p.seat === selectedSeat)?.price || 0) * ticketCount).toLocaleString()}원</span>
                  </div>
                </div>
                
                {/* 매수 선택 */}
                <div className="form-section">
                  <h3>매수 선택</h3>
                  <div className="ticket-count">
                    <button 
                      className="count-btn"
                      onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                    >
                      -
                    </button>
                    <span className="count">{ticketCount}</span>
                    <button 
                      className="count-btn"
                      onClick={() => setTicketCount(Math.min(4, ticketCount + 1))}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 총 결제 금액 */}
            {selectedSeat && (
              <div className="total-section">
                <h3>총 결제 금액</h3>
                <div className="total-amount">
                  {((currentPerformance.prices.find(p => p.seat === selectedSeat)?.price || 0) * ticketCount).toLocaleString()}원
                </div>
              </div>
            )}

            {/* 예매 버튼 */}
            <button 
              className="booking-submit-btn" 
              onClick={handleBooking}
              disabled={!selectedDate || !selectedTime || !selectedSeat}
            >
              {selectedDate && selectedTime && selectedSeat ? '예매하기' : '날짜, 시간, 좌석을 선택해주세요'}
            </button>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}