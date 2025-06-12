import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Main.css';
import logoSvg from '../로고.svg';
import textLogoSvg from '../글씨로고.svg';
import imageSrc7 from '../imageSrc (7).jpeg';
import imageSrc8 from '../imageSrc (8).jpeg';
import imageSrc14 from '../imageSrc (14).jpeg';
import imageSrc25 from '../imageSrc (25).jpeg';
import imageSrc26 from '../imageSrc (26).jpeg';
import imageSrc27 from '../imageSrc (27).jpeg';
import imageSrc28 from '../imageSrc (28).jpeg';
import imageSrc4 from '../imageSrc (4).jpeg';
import imageSrc6 from '../imageSrc (6).jpeg';
import imageSrc9 from '../imageSrc (9).jpeg';

export default function Main() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(5);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [hoveredRankingItem, setHoveredRankingItem] = useState<number | null>(null);
  const [hoveredNewsItem, setHoveredNewsItem] = useState<number | null>(null);

  // 슬라이더 데이터
  const slides = [
    {
      image: imageSrc8,
      venue: "세종M홀",
      title: "합창, 피어나다",
      date: "5/7~5/9"
    },
    {
      image: imageSrc7,
      venue: "대극장",
      title: "봄의 전설",
      date: "4/15~4/28"
    },
    {
      image: imageSrc14,
      venue: "소극장",
      title: "청춘 콘서트",
      date: "6/1~6/15"
    },
    {
      image: null, // 회색 박스
      venue: "세종아트센터",
      title: "가을 음악회",
      date: "9/10~9/20"
    }
  ];

  // 이벤트 데이터 (월/주차별)
  const eventData: { [key: string]: { title: string; subtitle: string; venue: string; period: string } } = {
    "5-1": { title: "2025 아뜰리에 광화 봄 전시", subtitle: "여명", venue: "야외전시", period: "5/7~5/9" },
    "5-2": { title: "세종 클래식 콘서트", subtitle: "봄의 선율", venue: "대극장", period: "5/14~5/16" },
    "5-3": { title: "청춘 뮤지컬", subtitle: "꿈을 향해", venue: "소극장", period: "5/21~5/23" },
    "5-4": { title: "오케스트라 공연", subtitle: "환상", venue: "세종M홀", period: "5/28~5/30" },
    "6-1": { title: "여름 음악 축제", subtitle: "시원한 선율", venue: "야외무대", period: "6/4~6/6" },
    "6-2": { title: "발레 공연", subtitle: "백조의 호수", venue: "대극장", period: "6/11~6/13" },
    "6-3": { title: "재즈 콘서트", subtitle: "밤의 선율", venue: "세종M홀", period: "6/18~6/20" },
    "6-4": { title: "가족 뮤지컬", subtitle: "모험", venue: "소극장", period: "6/25~6/27" },
    "7-1": { title: "여름 특별 공연", subtitle: "한여름밤의 꿈", venue: "대극장", period: "7/2~7/4" },
    "7-2": { title: "클래식 갈라", subtitle: "명품 선율", venue: "세종M홀", period: "7/9~7/11" },
    "7-3": { title: "현대 무용", subtitle: "움직임의 예술", venue: "소극장", period: "7/16~7/18" },
    "7-4": { title: "오페라 공연", subtitle: "라 트라비아타", venue: "대극장", period: "7/23~7/25" }
  };

  // 카드 데이터
  const cardData = [
    {
      id: 1,
      title: "2025 아뜰리에 광화 봄 전시",
      subtitle: "여명",
      venue: "야외전시",
      period: "5/7~5/9",
      image: imageSrc25,
      color: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)"
    },
    {
      id: 2,
      title: "세종 클래식 콘서트",
      subtitle: "봄의 선율",
      venue: "대극장",
      period: "5/14~5/16",
      image: imageSrc26,
      color: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
    },
    {
      id: 3,
      title: "청춘 뮤지컬",
      subtitle: "꿈을 향해",
      venue: "소극장",
      period: "5/21~5/23",
      image: imageSrc27,
      color: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)"
    },
    {
      id: 4,
      title: "오케스트라 공연",
      subtitle: "환상",
      venue: "세종M홀",
      period: "5/28~5/30",
      image: imageSrc28,
      color: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)"
    },
    {
      id: 5,
      title: "재즈 콘서트",
      subtitle: "밤의 선율",
      venue: "야외무대",
      period: "6/4~6/6",
      image: imageSrc8,
      color: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)"
    }
  ];

  // 뉴스 데이터
  const newsData = [
    { title: "예술광장 리뉴얼 오픈", date: "2025.05.16" },
    { title: "티켓 할인 이벤트", date: "2025.05.22" },
    { title: "갤러리 투어 참여자 모집", date: "2025.05.03" },
    { title: "클래식 콘서트 선공개", date: "2025.05.16" },
    { title: "여름 프로그램 안내", date: "2025.05.03" }
  ];
  const rankingData = [
    {
      id: 1,
      rank: 1,
      title: "동양미래특급",
      subtitle: "환상적인 공연",
      period: "2025년 5월 15일 ~ 6월 1일",
      venue: "세종대극장",
      image: imageSrc4
    },
    {
      id: 2,
      rank: 2,
      title: "봄의 전설",
      subtitle: "감동의 무대",
      period: "2025년 5월 20일 ~ 6월 5일",
      venue: "세종M홀",
      image: imageSrc6
    },
    {
      id: 3,
      rank: 3,
      title: "청춘 콘서트",
      subtitle: "젊음의 열정",
      period: "2025년 6월 1일 ~ 6월 15일",
      venue: "소극장",
      image: imageSrc7
    },
    {
      id: 4,
      rank: 4,
      title: "가을 음악회",
      subtitle: "가을의 선율",
      period: "2025년 6월 10일 ~ 6월 25일",
      venue: "야외무대",
      image: imageSrc9
    }
  ];

  // 현재 이벤트 가져오기
  const getCurrentEvent = () => {
    const key = `${currentMonth}-${currentWeek}`;
    return eventData[key] || eventData["5-1"];
  };

  // 다이얼 숫자 클릭 핸들러
  const handleNumberClick = (type: 'month' | 'week', value: number) => {
    if (type === 'month') {
      setCurrentMonth(value);
    } else {
      setCurrentWeek(value);
    }
  };

  // 카드 클릭 핸들러
  const handleCardClick = (index: number) => {
    setCurrentCardIndex(index);
  };

  // 이전 슬라이드로 이동
  const goToPrevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // 다음 슬라이드로 이동
  const goToNextSlide = () => {
    setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // 재생/일시정지 토글
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // 자동 슬라이드 (재생 중일 때)
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(goToNextSlide, 4000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  useEffect(() => {
    // 5초 후에 도르래 애니메이션 시작
    const timer = setTimeout(() => {
      const rotatingNumbers = document.querySelectorAll('.rotating-number');
      rotatingNumbers.forEach(number => {
        number.classList.add('animate');
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="main-responsive">
      {/* Header Navigation */}
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <img src={logoSvg} alt="세종문화회관 로고" className="logo-image" />
          </div>
          <nav className="nav-menu">
            <span>프로그램</span>
            <span>캘린더</span>
            <span>랭킹</span>
            <span>이벤트&소식</span>
            <span>기관소개</span>
          </nav>
          <div className="header-icons">
            <div className="search-icon">
              <svg viewBox="0 0 37 36" fill="none">
                <circle cx="14.7333" cy="14.7333" r="12.7333" stroke="black" strokeWidth="4"/>
                <line x1="25.2142" x2="35.4142" y1="23.5191" y2="33.7191" stroke="black" strokeWidth="4"/>
              </svg>
            </div>
            <div className="user-icon">
              <svg viewBox="0 0 29 37" fill="none">
                <circle cx="14" cy="10" r="8" stroke="black" strokeWidth="4"/>
                <path d="M13 23H15C21.6274 23 27 28.3726 27 35H2V34C2 27.9249 6.92487 23 13 23Z" stroke="black" strokeWidth="4"/>
              </svg>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Images */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-slider">
            <div className="hero-images">
              {slides.map((slide, index) => {
                const isActive = index === currentSlide;
                const isPrev = index === (currentSlide - 1 + slides.length) % slides.length;
                const isNext = index === (currentSlide + 1) % slides.length;
                const isVisible = isActive || isPrev || isNext;
                
                if (!isVisible) return null;
                
                return (
                  <div 
                    key={index}
                    className={`hero-image-item ${isActive ? 'active' : ''}`}
                  >
                    {slide.image ? (
                      <img src={slide.image} alt={`Hero Image ${index + 1}`} className="hero-image" />
                    ) : (
                      <div className="hero-image-placeholder">
                        <span>이미지 {index + 1}</span>
                      </div>
                    )}
                    <div className="hero-overlay">
                      <div className="hero-event-info">
                        <h4>{slide.venue}</h4>
                        <h3>{slide.title}</h3>
                        <p>{slide.date}</p>
                        <button className="hero-book-btn">예매하기</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="hero-controls">
              <div className="hero-progress-container">
                <div className="hero-progress-bar">
                  <div 
                    className="hero-progress-fill"
                    style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
                  />
                </div>
              </div>
              
              <div className="hero-controls-right">
                <button className="hero-nav-btn prev" onClick={goToPrevSlide}>
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                
                <button className="hero-play-btn" onClick={togglePlayPause}>
                  {isPlaying ? (
                    <svg viewBox="0 0 24 24" fill="none" className="pause-icon">
                      <rect x="6" y="4" width="4" height="16" fill="currentColor"/>
                      <rect x="14" y="4" width="4" height="16" fill="currentColor"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" className="play-icon">
                      <polygon points="5,3 19,12 5,21" fill="currentColor"/>
                    </svg>
                  )}
                </button>
                
                <button className="hero-nav-btn next" onClick={goToNextSlide}>
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                
                <span className="hero-page-indicator">{currentSlide + 1} / {slides.length}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calendar & Event Combined Section */}
      <section className="calendar-event-section">
        <div className="calendar-event-container">
          <div className="calendar-side">
            <div className="calendar-header">
              <h2>공연일정</h2>
            </div>
            
            <div className="calendar-content">
              <div className="dial-container">
                <div className="dial-section">
                  <div className="dial-wrapper">
                    <div className="dial-numbers">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) => {
                        const isActive = month === currentMonth;
                        const distance = Math.abs(month - currentMonth);
                        let className = 'dial-number';
                        
                        if (isActive) className += ' active';
                        else if (distance === 1) className += ' distance-1';
                        else if (distance === 2) className += ' distance-2';
                        else if (distance === 3) className += ' distance-3';
                        else className += ' distance-far';
                        
                        // 선택된 숫자를 중앙에 위치시키기 위한 계산
                        const offset = (month - currentMonth) * 80; // 80px씩 간격
                        
                        return (
                          <div 
                            key={month}
                            className={className}
                            style={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: `translate(-50%, calc(-50% + ${offset}px))`
                            }}
                            onClick={() => handleNumberClick('month', month)}
                          >
                            {month}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="dial-label">월</div>
                </div>

                <div className="dial-section">
                  <div className="dial-wrapper">
                    <div className="dial-numbers">
                      {[1, 2, 3, 4, 5, 6].map((week) => {
                        const isActive = week === currentWeek;
                        const distance = Math.abs(week - currentWeek);
                        let className = 'dial-number';
                        
                        if (isActive) className += ' active';
                        else if (distance === 1) className += ' distance-1';
                        else if (distance === 2) className += ' distance-2';
                        else if (distance === 3) className += ' distance-3';
                        else className += ' distance-far';
                        
                        // 선택된 숫자를 중앙에 위치시키기 위한 계산
                        const offset = (week - currentWeek) * 80; // 80px씩 간격
                        
                        return (
                          <div 
                            key={week}
                            className={className}
                            style={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: `translate(-50%, calc(-50% + ${offset}px))`
                            }}
                            onClick={() => handleNumberClick('week', week)}
                          >
                            {week}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="dial-label">주차</div>
                </div>
              </div>
              
              <div className="calendar-grid">
                <div className="calendar-numbers">
                  <div className="number-row">
                    <span className="rotating-number small" data-current="2" data-next="1">
                      <span className="number-current">2</span>
                      <span className="number-next">1</span>
                    </span>
                    <span className="rotating-number medium" data-current="3" data-next="2">
                      <span className="number-current">3</span>
                      <span className="number-next">2</span>
                    </span>
                    <span className="rotating-number large" data-current="4" data-next="3">
                      <span className="number-current">4</span>
                      <span className="number-next">3</span>
                    </span>
                  </div>
                  <div className="number-row">
                    <span className="rotating-number small" data-current="4" data-next="5">
                      <span className="number-current">4</span>
                      <span className="number-next">5</span>
                    </span>
                    <span className="rotating-number small" data-current="3" data-next="4">
                      <span className="number-current">3</span>
                      <span className="number-next">4</span>
                    </span>
                    <span className="rotating-number medium" data-current="6" data-next="7">
                      <span className="number-current">6</span>
                      <span className="number-next">7</span>
                    </span>
                    <span className="rotating-number medium" data-current="2" data-next="8">
                      <span className="number-current">2</span>
                      <span className="number-next">8</span>
                    </span>
                  </div>
                  <div className="number-row">
                    <span className="rotating-number small" data-current="8" data-next="9">
                      <span className="number-current">8</span>
                      <span className="number-next">9</span>
                    </span>
                    <span className="rotating-number medium" data-current="7" data-next="10">
                      <span className="number-current">7</span>
                      <span className="number-next">10</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="event-side">
            <div className="card-stack">
                {cardData.map((card, index) => {
                  const position = (index - currentCardIndex + cardData.length) % cardData.length;
                  const isActive = position === 0;
                  
                  return (
                    <motion.div 
                      key={card.id}
                      className={`event-card ${isActive ? 'active' : ''}`}
                      onClick={() => handleCardClick(index)}
                      animate={{
                        y: position * -80,
                        opacity: position > 3 ? 0 : Math.max(0.3, 1 - (position * 0.25)),
                        scale: position === 0 ? 1 : Math.max(0.7, 1 - (position * 0.15)),
                        filter: position === 0 ? "blur(0px)" : `blur(${position * 3}px)`
                      }}
                      transition={{
                        duration: 0.8,
                        ease: [0.25, 0.1, 0.25, 1],
                        type: "tween"
                      }}
                      style={{
                        zIndex: cardData.length - position,
                        position: 'absolute',
                        width: '100%',
                        height: '100%'
                      }}
                    >
                      <motion.div 
                        className="card-content-simple"
                        whileHover={{ 
                          scale: 1.02,
                          transition: { duration: 0.2 }
                        }}
                      >
                        <div className="card-image-container">
                          {card.image ? (
                            <img src={card.image} alt={card.title} className="card-image-simple" />
                          ) : (
                            <div className="card-image-placeholder-simple" style={{ background: card.color }} />
                          )}
                          <div className="card-image-overlay">
                            <div className="card-title-overlay">
                              <h3>{card.title}</h3>
                              <p>&lt;{card.subtitle}&gt;</p>
                            </div>
                            <div className="card-info-overlay">
                              <span className="card-venue-info">장소 {card.venue}</span>
                              <span className="card-period-info">기간 {card.period}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
            </div>
          </div>
        </div>
      </section>

      {/* Ranking Section */}
      <section className="ranking-section">
        <div className="ranking-container">
          <h2>🏆 예매 순위 TOP 4</h2>
          <div className="ranking-content">
            <div className="ranking-grid">
              {rankingData.map((item, index) => (
                <motion.div 
                  key={item.id}
                  className={`ranking-item ${hoveredRankingItem === index ? 'expanded' : ''}`}
                  data-rank={item.rank}
                  onMouseEnter={() => setHoveredRankingItem(index)}
                  onMouseLeave={() => setHoveredRankingItem(null)}
                  whileHover={{
                    rotateY: 10,
                    rotateX: -5,
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <img src={item.image} alt={item.title} className="ranking-image" />
                  <div className="ranking-overlay">
                    <h3>{item.title}</h3>
                    <p>{item.subtitle}</p>
                    <p>{item.period}</p>
                    <p>{item.venue}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="ranking-stats">
            <div className="ranking-stat">
              <span className="ranking-stat-number">2,847</span>
              <span className="ranking-stat-label">이번 달 예매</span>
            </div>
            <div className="ranking-stat">
              <span className="ranking-stat-number">94%</span>
              <span className="ranking-stat-label">평균 예매율</span>
            </div>
            <div className="ranking-stat">
              <span className="ranking-stat-number">4.8</span>
              <span className="ranking-stat-label">평균 평점</span>
            </div>
            <div className="ranking-stat">
              <span className="ranking-stat-number">156</span>
              <span className="ranking-stat-label">리뷰 수</span>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="news-section">
        <div className="news-container">
          <div className="news-content">
            <div className="news-left">
              <img src={textLogoSvg} alt="세종문화회관 글씨 로고" className="news-logo" />
              <h2>이벤트&소식</h2>
            </div>
            
            <div className="news-list">
              {newsData.map((news, index) => (
                <motion.div 
                  key={index}
                  className="news-item"
                  onMouseEnter={() => setHoveredNewsItem(index)}
                  onMouseLeave={() => setHoveredNewsItem(null)}
                  animate={{
                    scale: hoveredNewsItem === index ? 1.05 : (hoveredNewsItem !== null && hoveredNewsItem !== index ? 0.95 : 1),
                    opacity: hoveredNewsItem === index ? 1 : (hoveredNewsItem !== null && hoveredNewsItem !== index ? 0.5 : 1)
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <h3>{news.title}</h3>
                  <span className="news-date">{news.date}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-links">
            <span>개인정보처리방침</span>
            <span>이용약관</span>
            <span>이메일무단수집거부</span>
            <span>고객서비스헌장</span>
            <span>오시는 길</span>
            <span>사이트 맵</span>
          </div>
          
          <div className="footer-logo">
            <img src={logoSvg} alt="세종문화회관 로고" className="footer-logo-image" />
          </div>
          
          <div className="footer-info">
            <p>
              <strong>재단법인</strong> 세종문화회관 서울특별시 종로구 세종대로 175 (세종로) (우)03172<br />
              <strong>대표자</strong> : 안호상 <strong>사업자등록번호</strong> : 101-82-06773<br />
              <strong>통신판매업신고</strong> : 서울종로-0988호
            </p>
          </div>
          
          <div className="copyright">
            <p>COPYRIGHT© SEJONG CENTER FOR THE PERFORMING ARTS. ALL RIGHTS RESERVED</p>
          </div>
        </div>
      </footer>
    </div>
  );
}