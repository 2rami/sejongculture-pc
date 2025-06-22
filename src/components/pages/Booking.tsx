import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../Header';
import '../../styles/ModernBooking.css';


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
  const [selectedSeatGrade, setSeatGrade] = useState('');
  const [selectedSeatNumber, setSelectedSeatNumber] = useState('');
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
      const newSelectedSeats = [...selectedSeats, seatId];
      setSelectedSeats(newSelectedSeats);
      if (!selectedSeat) {
        setSelectedSeat(seatType);
      }
      
      // 선택된 좌석이 충분하면 다음 단계로 이동
      if (newSelectedSeats.length >= ticketCount) {
        scrollToSection('ticket-section', 500);
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

  // 강화된 스크롤 자동 이동 함수
  const scrollToSection = (sectionId: string, delay: number = 100) => {
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerHeight = 80; // 헤더 높이
        const elementPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    }, delay);
  };

  // 날짜 선택 시 자동 스크롤
  const handleDateChangeWithScroll = (date: string) => {
    setSelectedDate(date);
    const availableTimes = timesByDate[date] || currentPerformance.times;
    setSelectedTime(availableTimes[0] || '');
    scrollToSection('time-section', 300);
  };

  // 시간 선택 시 자동 스크롤
  const handleTimeChangeWithScroll = (time: string) => {
    setSelectedTime(time);
    scrollToSection('seat-section', 300);
  };

  // 좌석 선택 시 자동 스크롤
  const handleSeatChangeWithScroll = (seat: string) => {
    setSelectedSeat(seat);
    scrollToSection('ticket-section', 300);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <>
      <Header />
      <div className="modern-booking-page">
        {/* 히어로 섹션 - 공연 정보 */}
        <motion.section 
          className="hero-section" 
          id="hero-section"
          variants={itemVariants}
        >
          <div className="hero-background">
            <img 
              src={currentPerformance.image} 
              alt={currentPerformance.title}
              className="hero-bg-image"
            />
            <div className="hero-overlay"></div>
          </div>
          <div className="hero-content">
            <div className="performance-badge">LIVE PERFORMANCE</div>
            <h1 className="hero-title">{currentPerformance.title}</h1>
            <p className="hero-subtitle">{currentPerformance.subtitle}</p>
            <div className="performance-details">
              <div className="detail-item">
                <span className="detail-label">장소</span>
                <span className="detail-text">{currentPerformance.venue}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">기간</span>
                <span className="detail-text">{currentPerformance.dates.length}일 공연</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">가격</span>
                <span className="detail-text">{currentPerformance.prices[currentPerformance.prices.length - 1].price.toLocaleString()}원부터</span>
              </div>
            </div>
            <p className="hero-description">{currentPerformance.description}</p>
            <button 
              className="start-booking-btn"
              onClick={() => scrollToSection('date-section')}
            >
              예매 시작하기
            </button>
          </div>
        </motion.section>

        {/* 단계 1: 날짜 선택 */}
        <motion.section 
          className="booking-step" 
          id="date-section"
          variants={itemVariants}
        >
          <div className="step-container">
            <div className="step-header">
              <div className="step-number">01</div>
              <div className="step-info">
                <h2>공연 날짜 선택</h2>
                <p>원하는 공연 날짜를 선택해주세요</p>
              </div>
            </div>
            <div className="date-selection-grid">
              {currentPerformance.dates.map(date => {
                const dateObj = new Date(date);
                return (
                  <div
                    key={date}
                    className={`date-card ${selectedDate === date ? 'selected' : ''}`}
                    onClick={() => handleDateChangeWithScroll(date)}
                  >
                    <div className="date-month">{dateObj.getMonth() + 1}월</div>
                    <div className="date-day">{dateObj.getDate()}</div>
                    <div className="date-weekday">
                      {dateObj.toLocaleDateString('ko-KR', { weekday: 'short' })}
                    </div>
                    <div className="date-status">예매가능</div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* 단계 2: 시간 선택 */}
        {selectedDate && (
          <section 
            className="booking-step" 
            id="time-section"
            key={`time-${selectedDate}`}
            style={{ background: '#f0f0f0', padding: '2rem', margin: '2rem 0' }}
          >
            <div className="step-container">
              <div className="step-header">
                <div className="step-number">02</div>
                <div className="step-info">
                  <h2>공연 시간 선택</h2>
                  <p>{new Date(selectedDate).toLocaleDateString('ko-KR')} 공연 시간</p>
                </div>
              </div>
              <div className="time-selection-grid">
                {(timesByDate[selectedDate] || currentPerformance.times).map(time => (
                  <div
                    key={time}
                    className={`time-card ${selectedTime === time ? 'selected' : ''}`}
                    onClick={() => handleTimeChangeWithScroll(time)}
                  >
                    <div className="time-main">{time}</div>
                    <div className="time-info">
                      <span className="seats-available">잔여석 많음</span>
                      <span className="time-duration">150분</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 단계 3: 좌석 선택 */}
        {selectedTime && (
          <section 
            className="booking-step seat-step" 
            id="seat-section"
          >
            <div className="step-container">
              <div className="step-header">
                <div className="step-number">03</div>
                <div className="step-info">
                  <h2>좌석 등급 선택</h2>
                  <p>원하는 좌석 등급을 선택해주세요</p>
                </div>
              </div>
              
              {/* 좌석 등급 카드 */}
              <div className="seat-grade-grid">
                {currentPerformance.prices.map((priceInfo, index) => (
                  <div
                    key={priceInfo.seat}
                    className={`seat-grade-card ${selectedSeat === priceInfo.seat ? 'selected' : ''}`}
                    onClick={() => handleSeatChangeWithScroll(priceInfo.seat)}
                  >
                    <div className={`grade-icon grade-${['vip', 'r', 's', 'a'][index]}`}>
                      {priceInfo.seat.charAt(0)}
                    </div>
                    <div className="grade-info">
                      <h3>{priceInfo.seat}</h3>
                      <p className="grade-price">{priceInfo.price.toLocaleString()}원</p>
                      <p className="grade-remaining">{135 - (index * 20)}석 남음</p>
                    </div>
                    <div className="grade-benefits">
                      {index === 0 && <span>최고급 시야</span>}
                      {index === 1 && <span>프리미엄 시야</span>}
                      {index === 2 && <span>우수한 시야</span>}
                      {index === 3 && <span>합리적 가격</span>}
                    </div>
                  </div>
                ))}
              </div>

              {/* 좌석맵 미리보기 */}
              {/* 좌석맵 */}
              <div style={{
                background: '#1a1a1a',
                padding: '3rem 2rem',
                marginTop: '2rem',
                color: '#ffffff'
              }}>
                {/* 무대 */}
                <div style={{
                  background: '#ffffff',
                  color: '#000000',
                  textAlign: 'center',
                  padding: '1rem',
                  marginBottom: '3rem',
                  fontWeight: '600',
                  fontSize: '1.1rem',
                  letterSpacing: '2px'
                }}>STAGE</div>

                {/* 1층 */}
                <div style={{ marginBottom: '4rem' }}>
                  <h4 style={{ textAlign: 'center', marginBottom: '2rem', color: '#cccccc', fontSize: '1.2rem' }}>1층</h4>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                    {['A', 'B', 'C', 'D', 'E'].map(section => (
                      <div key={section} style={{ textAlign: 'center' }}>
                        <div style={{ marginBottom: '1rem', color: '#cccccc', fontWeight: '600' }}>{section}</div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '3px' }}>
                          {Array.from({length: section === 'C' ? 48 : section === 'B' || section === 'D' ? 40 : 32}, (_, i) => {
                            const seatNumber = `1층-${section}${i + 1}`;
                            const isSelected = selectedSeats.includes(seatNumber);
                            const seatGrade = section === 'C' ? 'VIP석' : section === 'B' || section === 'D' ? 'R석' : 'S석';
                            const seatColor = seatGrade === 'VIP석' ? '#ff6b6b' : seatGrade === 'R석' ? '#4ecdc4' : '#95e1d3';
                            
                            return (
                              <button
                                key={seatNumber}
                                style={{
                                  width: '20px',
                                  height: '20px',
                                  background: isSelected ? '#ffffff' : seatColor,
                                  border: `1px solid ${isSelected ? '#000000' : 'transparent'}`,
                                  cursor: 'pointer',
                                  fontSize: '8px',
                                  color: isSelected ? '#000000' : '#000000'
                                }}
                                onClick={() => handleSeatClick(seatNumber, seatGrade)}
                              >
                                {i + 1}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2층 */}
                <div style={{ marginBottom: '4rem' }}>
                  <h4 style={{ textAlign: 'center', marginBottom: '2rem', color: '#cccccc', fontSize: '1.2rem' }}>2층</h4>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                    {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map(section => (
                      <div key={section} style={{ textAlign: 'center' }}>
                        <div style={{ marginBottom: '1rem', color: '#cccccc', fontWeight: '600' }}>{section}</div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '3px' }}>
                          {Array.from({length: section === 'D' ? 48 : 36}, (_, i) => {
                            const seatNumber = `2층-${section}${i + 1}`;
                            const isSelected = selectedSeats.includes(seatNumber);
                            const seatGrade = section === 'D' ? 'R석' : section === 'C' || section === 'E' ? 'S석' : 'A석';
                            const seatColor = seatGrade === 'R석' ? '#4ecdc4' : seatGrade === 'S석' ? '#95e1d3' : '#a8e6cf';
                            
                            return (
                              <button
                                key={seatNumber}
                                style={{
                                  width: '18px',
                                  height: '18px',
                                  background: isSelected ? '#ffffff' : seatColor,
                                  border: `1px solid ${isSelected ? '#000000' : 'transparent'}`,
                                  cursor: 'pointer',
                                  fontSize: '7px',
                                  color: isSelected ? '#000000' : '#000000'
                                }}
                                onClick={() => handleSeatClick(seatNumber, seatGrade)}
                              >
                                {i + 1}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3층 */}
                <div>
                  <h4 style={{ textAlign: 'center', marginBottom: '2rem', color: '#cccccc', fontSize: '1.2rem' }}>3층</h4>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                    {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map(section => (
                      <div key={section} style={{ textAlign: 'center' }}>
                        <div style={{ marginBottom: '1rem', color: '#cccccc', fontWeight: '600' }}>{section}</div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '2px' }}>
                          {Array.from({length: section === 'D' || section === 'E' ? 40 : 30}, (_, i) => {
                            const seatNumber = `3층-${section}${i + 1}`;
                            const isSelected = selectedSeats.includes(seatNumber);
                            const seatGrade = section === 'D' || section === 'E' ? 'S석' : 'A석';
                            const seatColor = seatGrade === 'S석' ? '#95e1d3' : '#a8e6cf';
                            
                            return (
                              <button
                                key={seatNumber}
                                style={{
                                  width: '16px',
                                  height: '16px',
                                  background: isSelected ? '#ffffff' : seatColor,
                                  border: `1px solid ${isSelected ? '#000000' : 'transparent'}`,
                                  cursor: 'pointer',
                                  fontSize: '6px',
                                  color: isSelected ? '#000000' : '#000000'
                                }}
                                onClick={() => handleSeatClick(seatNumber, seatGrade)}
                              >
                                {i + 1}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 좌석 범례 */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '2rem',
                  marginTop: '3rem',
                  flexWrap: 'wrap'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '20px', height: '20px', background: '#ff6b6b' }}></div>
                    <span>VIP석</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '20px', height: '20px', background: '#4ecdc4' }}></div>
                    <span>R석</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '20px', height: '20px', background: '#95e1d3' }}></div>
                    <span>S석</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '20px', height: '20px', background: '#a8e6cf' }}></div>
                    <span>A석</span>
                  </div>
                </div>

                {/* 선택된 좌석 표시 */}
                {selectedSeats.length > 0 && (
                  <div style={{
                    marginTop: '2rem',
                    padding: '1.5rem',
                    background: '#333333',
                    textAlign: 'center'
                  }}>
                    <h4 style={{ marginBottom: '1rem', color: '#ffffff' }}>선택된 좌석</h4>
                    <div style={{ color: '#cccccc' }}>
                      {selectedSeats.join(', ')} ({selectedSeats.length}석)
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* 단계 4: 매수 선택 및 결제 */}
        {selectedSeat && (
          <section 
            className="booking-step final-step" 
            id="ticket-section"
          >
            <div className="step-container">
              <div className="step-header">
                <div className="step-number">04</div>
                <div className="step-info">
                  <h2>예매 정보 확인</h2>
                  <p>매수를 선택하고 최종 결제를 진행해주세요</p>
                </div>
              </div>

              {/* 단일 와이드 레이아웃 */}
              <div style={{
                maxWidth: '1000px',
                margin: '0 auto',
                background: '#ffffff',
                border: '2px solid #000000',
                marginTop: '3rem'
              }}>
                {/* 예매 정보 헤더 */}
                <div style={{
                  background: '#000000',
                  color: '#ffffff',
                  padding: '2rem',
                  textAlign: 'center'
                }}>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    margin: '0',
                    textTransform: 'uppercase',
                    letterSpacing: '2px'
                  }}>예매 정보 확인</h3>
                </div>

                {/* 예매 정보 리스트 */}
                <div style={{padding: '2rem'}}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '2rem',
                    marginBottom: '3rem',
                    paddingBottom: '2rem',
                    borderBottom: '2px solid #f0f0f0'
                  }}>
                    <div style={{textAlign: 'center'}}>
                      <div style={{color: '#999999', fontSize: '0.9rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px'}}>공연</div>
                      <div style={{fontSize: '1.1rem', fontWeight: '600', color: '#000000'}}>{currentPerformance.title}</div>
                    </div>
                    <div style={{textAlign: 'center'}}>
                      <div style={{color: '#999999', fontSize: '0.9rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px'}}>날짜</div>
                      <div style={{fontSize: '1.1rem', fontWeight: '600', color: '#000000'}}>{new Date(selectedDate).toLocaleDateString('ko-KR')}</div>
                    </div>
                    <div style={{textAlign: 'center'}}>
                      <div style={{color: '#999999', fontSize: '0.9rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px'}}>시간</div>
                      <div style={{fontSize: '1.1rem', fontWeight: '600', color: '#000000'}}>{selectedTime}</div>
                    </div>
                    <div style={{textAlign: 'center'}}>
                      <div style={{color: '#999999', fontSize: '0.9rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px'}}>좌석</div>
                      <div style={{fontSize: '1.1rem', fontWeight: '600', color: '#000000'}}>{selectedSeat}</div>
                    </div>
                  </div>

                  {/* 매수 및 결제 */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 2fr',
                    gap: '3rem',
                    alignItems: 'start'
                  }}>
                    {/* 매수 선택 */}
                    <div>
                      <h4 style={{
                        fontSize: '1.1rem',
                        fontWeight: '700',
                        marginBottom: '1.5rem',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                      }}>매수 선택</h4>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '2rem',
                        marginBottom: '1rem'
                      }}>
                        <button 
                          style={{
                            width: '50px',
                            height: '50px',
                            border: '2px solid #000000',
                            background: '#ffffff',
                            fontSize: '1.5rem',
                            fontWeight: '700',
                            cursor: 'pointer'
                          }}
                          onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                        >-</button>
                        <div style={{textAlign: 'center'}}>
                          <div style={{fontSize: '2rem', fontWeight: '700', color: '#000000'}}>{ticketCount}</div>
                          <div style={{fontSize: '0.9rem', color: '#666666'}}>매</div>
                        </div>
                        <button 
                          style={{
                            width: '50px',
                            height: '50px',
                            border: '2px solid #000000',
                            background: '#ffffff',
                            fontSize: '1.5rem',
                            fontWeight: '700',
                            cursor: 'pointer'
                          }}
                          onClick={() => setTicketCount(Math.min(4, ticketCount + 1))}
                        >+</button>
                      </div>
                      <p style={{textAlign: 'center', color: '#999999', fontSize: '0.9rem'}}>최대 4매까지 선택 가능</p>
                    </div>

                    {/* 결제 정보 */}
                    <div>
                      <h4 style={{
                        fontSize: '1.1rem',
                        fontWeight: '700',
                        marginBottom: '1.5rem',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                      }}>결제 정보</h4>
                      <div style={{marginBottom: '1.5rem'}}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          padding: '1rem 0',
                          borderBottom: '1px solid #e0e0e0'
                        }}>
                          <span>{selectedSeat} x {ticketCount}매</span>
                          <span style={{fontWeight: '600'}}>{((currentPerformance.prices.find(p => p.seat === selectedSeat)?.price || 0) * ticketCount).toLocaleString()}원</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          padding: '1rem 0',
                          fontSize: '0.9rem',
                          color: '#666666'
                        }}>
                          <span>예매수수료</span>
                          <span>2,000원</span>
                        </div>
                      </div>
                      <div style={{
                        background: '#000000',
                        color: '#ffffff',
                        padding: '1.5rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '1.2rem',
                        fontWeight: '700'
                      }}>
                        <span>총 결제금액</span>
                        <span>{(((currentPerformance.prices.find(p => p.seat === selectedSeat)?.price || 0) * ticketCount) + 2000).toLocaleString()}원</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 최종 예매 버튼 */}
              <button 
                className="final-booking-btn"
                onClick={handleBooking}
              >
                {(((currentPerformance.prices.find(p => p.seat === selectedSeat)?.price || 0) * ticketCount) + 2000).toLocaleString()}원 결제하기
              </button>
            </div>
          </section>
        )}

      </div>
    </>
  );
}