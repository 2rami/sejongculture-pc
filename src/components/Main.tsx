import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/Main.css';
import logoSvg from '../assets/icons/main-logo.svg';
import textLogoSvg from '../assets/icons/text-logo.svg';
import SearchModal from './SearchModal';
import SmoothScroll from './SmoothScroll';
import imageSrc7 from '../assets/images/image-7.jpeg';
import imageSrc8 from '../assets/images/image-8.jpeg';
import imageSrc14 from '../assets/images/image-14.jpeg';
import imageSrc25 from '../assets/images/image-25.jpeg';
import imageSrc26 from '../assets/images/image-26.jpeg';
import imageSrc27 from '../assets/images/image-27.jpeg';
import imageSrc28 from '../assets/images/image-28.jpeg';
import imageSrc4 from '../assets/images/image-4.jpeg';
import imageSrc6 from '../assets/images/image-6.jpeg';
import imageSrc9 from '../assets/images/image-9.jpeg';
import imageSrc15 from '../assets/images/image-15.jpeg';

export default function Main() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(5);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [hoveredRankingItem, setHoveredRankingItem] = useState<number | null>(null);
  const [hoveredNewsItem, setHoveredNewsItem] = useState<number | null>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [hoveredSubMenu, setHoveredSubMenu] = useState<string | null>(null);

  // 텍스트 길이에 따른 언더라인 길이 계산
  const getTextWidth = (text: string) => {
    const textWidths: { [key: string]: number } = {
      '프로그램': 70,
      '캘린더': 60,
      '랭킹': 40,
      '이벤트&소식': 85,
      '기관소개': 70
    };
    return textWidths[text] || 70;
  };

  // 메뉴 데이터
  const menuData = {
    '프로그램': ['공연/전시', '공연 정보', '예매'],
    '캘린더': ['전시/공연 일정'],
    '랭킹': ['장르별'],
    '이벤트&소식': ['공지사항'],
    '기관소개': ['기관개요']
  };

  // 슬라이더 데이터
  const slides = [
    {
      id: 101,
      image: imageSrc8,
      venue: "세종M홀",
      title: "합창, 피어나다",
      date: "5/7~5/9"
    },
    {
      id: 102,
      image: imageSrc7,
      venue: "대극장",
      title: "봄의 전설",
      date: "4/15~4/28"
    },
    {
      id: 103,
      image: imageSrc14,
      venue: "소극장",
      title: "청춘 콘서트",
      date: "6/1~6/15"
    },
    {
      id: 104,
      image: imageSrc15,
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

  // 월/주차별 카드 데이터
  const cardDataByDate: { [key: string]: any[] } = {
    "5-1": [
      {
        id: 201,
        title: "2025 아뜰리에 광화 봄 전시",
        subtitle: "여명",
        venue: "야외전시",
        period: "5/7~5/9",
        image: imageSrc25,
        color: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)"
      },
      {
        id: 202,
        title: "세종 클래식 콘서트",
        subtitle: "봄의 선율",
        venue: "대극장",
        period: "5/14~5/16",
        image: imageSrc26,
        color: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
      }
    ],
    "5-2": [
      {
        id: 203,
        title: "청춘 뮤지컬",
        subtitle: "꿈을 향해",
        venue: "소극장",
        period: "5/21~5/23",
        image: imageSrc27,
        color: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)"
      },
      {
        id: 204,
        title: "오케스트라 공연",
        subtitle: "환상",
        venue: "세종M홀",
        period: "5/28~5/30",
        image: imageSrc28,
        color: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)"
      }
    ],
    "5-3": [
      {
        id: 205,
        title: "발레 공연",
        subtitle: "백조의 호수",
        venue: "대극장",
        period: "5/21~5/23",
        image: imageSrc25,
        color: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)"
      },
      {
        id: 206,
        title: "재즈 콘서트",
        subtitle: "밤의 선율",
        venue: "세종M홀",
        period: "5/28~5/30",
        image: imageSrc26,
        color: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
      }
    ],
    "5-4": [
      {
        id: 207,
        title: "현대 무용",
        subtitle: "움직임의 예술",
        venue: "소극장",
        period: "5/28~5/30",
        image: imageSrc27,
        color: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)"
      },
      {
        id: 208,
        title: "오페라 갈라",
        subtitle: "명품 아리아",
        venue: "대극장",
        period: "5/29~5/31",
        image: imageSrc28,
        color: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)"
      }
    ],
    "6-1": [
      {
        id: 209,
        title: "여름 음악 축제",
        subtitle: "시원한 선율",
        venue: "야외무대",
        period: "6/4~6/6",
        image: imageSrc25,
        color: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)"
      },
      {
        id: 210,
        title: "실내악 공연",
        subtitle: "소중한 순간",
        venue: "세종M홀",
        period: "6/7~6/9",
        image: imageSrc26,
        color: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
      }
    ],
    "6-2": [
      {
        id: 211,
        title: "국악 공연",
        subtitle: "전통의 멋",
        venue: "소극장",
        period: "6/11~6/13",
        image: imageSrc27,
        color: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)"
      },
      {
        id: 212,
        title: "팝 콘서트",
        subtitle: "여름밤의 노래",
        venue: "대극장",
        period: "6/14~6/16",
        image: imageSrc28,
        color: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)"
      }
    ],
    "6-3": [
      {
        id: 213,
        title: "뮤지컬 갈라",
        subtitle: "명곡 메들리",
        venue: "대극장",
        period: "6/18~6/20",
        image: imageSrc25,
        color: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)"
      },
      {
        id: 214,
        title: "챔버 오케스트라",
        subtitle: "작은 편성의 대화",
        venue: "세종M홀",
        period: "6/21~6/23",
        image: imageSrc26,
        color: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
      }
    ],
    "6-4": [
      {
        id: 215,
        title: "가족 뮤지컬",
        subtitle: "모험",
        venue: "소극장",
        period: "6/25~6/27",
        image: imageSrc27,
        color: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)"
      },
      {
        id: 216,
        title: "클래식 마티네",
        subtitle: "오후의 여유",
        venue: "세종M홀",
        period: "6/28~6/30",
        image: imageSrc28,
        color: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)"
      }
    ],
    "7-1": [
      {
        id: 217,
        title: "여름 특별 공연",
        subtitle: "한여름밤의 꿈",
        venue: "대극장",
        period: "7/2~7/4",
        image: imageSrc25,
        color: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)"
      },
      {
        id: 218,
        title: "기타 앙상블",
        subtitle: "현악의 조화",
        venue: "소극장",
        period: "7/5~7/7",
        image: imageSrc26,
        color: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
      }
    ],
    "7-2": [
      {
        id: 219,
        title: "클래식 갈라",
        subtitle: "명품 선율",
        venue: "세종M홀",
        period: "7/9~7/11",
        image: imageSrc27,
        color: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)"
      },
      {
        id: 220,
        title: "세계 음악 축제",
        subtitle: "다양한 문화의 만남",
        venue: "야외무대",
        period: "7/12~7/14",
        image: imageSrc28,
        color: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)"
      }
    ]
  };

  // 현재 선택된 날짜에 따른 카드 데이터 가져오기
  const getCurrentCards = () => {
    const key = `${currentMonth}-${currentWeek}`;
    return cardDataByDate[key] || cardDataByDate["5-1"];
  };

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
      id: 301,
      rank: 1,
      title: "동양미래특급",
      subtitle: "환상적인 공연",
      period: "2025년 5월 15일 ~ 6월 1일",
      venue: "세종대극장",
      image: imageSrc4,
      stats: {
        tickets: "3,247",
        rate: "98%",
        rating: "4.9",
        reviews: "234"
      }
    },
    {
      id: 302,
      rank: 2,
      title: "봄의 전설",
      subtitle: "감동의 무대",
      period: "2025년 5월 20일 ~ 6월 5일",
      venue: "세종M홀",
      image: imageSrc6,
      stats: {
        tickets: "2,847",
        rate: "94%",
        rating: "4.8",
        reviews: "156"
      }
    },
    {
      id: 303,
      rank: 3,
      title: "청춘 콘서트",
      subtitle: "젊음의 열정",
      period: "2025년 6월 1일 ~ 6월 15일",
      venue: "소극장",
      image: imageSrc7,
      stats: {
        tickets: "1,923",
        rate: "89%",
        rating: "4.6",
        reviews: "127"
      }
    },
    {
      id: 304,
      rank: 4,
      title: "가을 음악회",
      subtitle: "가을의 선율",
      period: "2025년 6월 10일 ~ 6월 25일",
      venue: "야외무대",
      image: imageSrc9,
      stats: {
        tickets: "1,456",
        rate: "85%",
        rating: "4.4",
        reviews: "89"
      }
    }
  ];

  // 현재 표시할 통계 데이터 계산
  const getCurrentStats = () => {
    if (hoveredRankingItem !== null && rankingData[hoveredRankingItem]) {
      return rankingData[hoveredRankingItem].stats;
    }
    // 호버하지 않을 때는 null 반환
    return null;
  };

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
    // 날짜가 변경되면 카드 인덱스를 0으로 리셋
    setCurrentCardIndex(0);
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
    <>
      {/* Header Navigation */}
      <header className="header">
        <div className="header-container">
          <div 
            className="logo"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{ cursor: 'pointer' }}
          >
            <img src={logoSvg} alt="세종문화회관 로고" className="logo-image" />
          </div>
          <div 
            className="nav-menu-wrapper"
          >
            <motion.nav 
              className="nav-menu"
              animate={{
                opacity: hoveredMenu ? 0 : 1
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {Object.keys(menuData).map((menuItem, index) => (
                <div 
                  key={menuItem}
                  className="nav-item-container"
                  onMouseEnter={() => {
                    setHoveredMenu(menuItem);
                    setHoveredSubMenu(null);
                  }}
                >
                  <span className="nav-item">{menuItem}</span>
                </div>
              ))}
              
            </motion.nav>
          </div>
          <div className="header-icons">
            <div className="search-icon" onClick={() => setIsSearchModalOpen(true)}>
              <svg viewBox="0 0 37 36" fill="none">
                <circle cx="14.7333" cy="14.7333" r="12.7333" stroke="black" strokeWidth="4"/>
                <line x1="25.2142" x2="35.4142" y1="23.5191" y2="33.7191" stroke="black" strokeWidth="4"/>
              </svg>
            </div>
            <Link to="/mypage" className="user-icon">
              <svg viewBox="0 0 29 37" fill="none">
                <circle cx="14" cy="10" r="8" stroke="black" strokeWidth="4"/>
                <path d="M13 23H15C21.6274 23 27 28.3726 27 35H2V34C2 27.9249 6.92487 23 13 23Z" stroke="black" strokeWidth="4"/>
              </svg>
            </Link>
          </div>
        </div>
      </header>

      {/* 전체 화면 드롭다운 메뉴 */}
      <AnimatePresence>
        {(hoveredMenu || hoveredSubMenu) && (
          <motion.div 
            className="fullscreen-dropdown-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onMouseLeave={() => {
              setHoveredMenu(null);
              setHoveredSubMenu(null);
            }}
          >
            <motion.div 
              className="fullscreen-dropdown"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <motion.div 
                className="fullscreen-dropdown-content"
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
              >
                {/* 드롭다운 언더라인 */}
                <motion.div 
                  className="dropdown-underline"
                  animate={{
                    x: (hoveredMenu || hoveredSubMenu) ? Object.keys(menuData).indexOf(hoveredMenu || Object.keys(menuData).find(menu => menuData[menu as keyof typeof menuData].includes(hoveredSubMenu!)) || '') * 240 : -100,
                    width: hoveredMenu ? getTextWidth(hoveredMenu) : 120,
                    opacity: (hoveredMenu || hoveredSubMenu) ? 1 : 0
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
                
                {Object.keys(menuData).map((menuItem, menuIndex) => (
                  <div 
                    key={menuItem}
                    className="fullscreen-dropdown-column"
                    onMouseEnter={() => {
                      setHoveredMenu(menuItem);
                      setHoveredSubMenu(null);
                    }}
                  >
                    <motion.h3 
                      className={`dropdown-column-title ${hoveredMenu === menuItem ? 'active' : ''}`}
                      animate={{ 
                        opacity: hoveredMenu === menuItem ? 1 : 0.5
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      {menuItem}
                    </motion.h3>
                    {menuData[menuItem as keyof typeof menuData].map((subItem, index) => {
                      const getLink = (item: string) => {
                        if (item === '공연/전시') return '/performance-list';
                        if (item === '공연 정보') return '/performance-info';
                        if (item === '예매') return '/booking-select';
                        if (item === '공지사항') return '/notice';
                        return '#';
                      };

                      return (
                        <motion.div 
                          key={subItem}
                          className="fullscreen-dropdown-item"
                          onMouseEnter={() => setHoveredSubMenu(subItem)}
                          animate={{
                            opacity: (hoveredMenu === menuItem || hoveredSubMenu === subItem) ? 1 : 0.5,
                            fontWeight: hoveredSubMenu === subItem ? 700 : 500
                          }}
                          transition={{ duration: 0.2, delay: (hoveredMenu === menuItem || hoveredSubMenu === subItem) ? index * 0.05 : 0 }}
                        >
                          <Link to={getLink(subItem)} style={{ textDecoration: 'none', color: 'inherit' }}>
                            {subItem}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <SmoothScroll>
        <div className="main-responsive">
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
                  <Link 
                    key={index}
                    to={`/performance-info?id=${slide.id}`}
                    className={`hero-image-item ${isActive ? 'active' : ''}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
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
                        <button 
                          className="hero-book-btn"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            window.location.href = `/booking?id=${slide.id}`;
                          }}
                        >
                          예매하기
                        </button>
                      </div>
                    </div>
                  </Link>
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
          {/* Section Title */}
          <div className="section-title">
            <h2>공연일정</h2>
          </div>
          
          <div className="calendar-side">
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
              <AnimatePresence mode="wait">
                {getCurrentCards().map((card, index) => {
                  const cardData = getCurrentCards();
                  const position = (index - currentCardIndex + cardData.length) % cardData.length;
                  const isActive = position === 0;
                  
                  return (
                    <motion.div 
                      key={`${currentMonth}-${currentWeek}-${card.id}`}
                      className={`event-card ${isActive ? 'active' : ''}`}
                      onClick={() => {
                        if (isActive) {
                          // 활성화된 카드를 클릭하면 공연 정보 페이지로 이동
                          window.location.href = `/performance-info?id=${card.id}`;
                        } else {
                          // 비활성화된 카드를 클릭하면 해당 카드를 활성화
                          handleCardClick(index);
                        }
                      }}
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
                        height: '100%',
                        cursor: isActive ? 'pointer' : 'pointer'
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      exit={{ opacity: 0, scale: 0.8 }}
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
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Ranking Section */}
      <section className="ranking-section">
        <div className="ranking-container">
          <h2>예매 순위</h2>
          <div className="ranking-content">
            <div className="ranking-grid">
              {rankingData.map((item, index) => (
                <Link 
                  key={item.id}
                  to={`/performance-info?id=${item.id}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <motion.div 
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
                </Link>
              ))}
            </div>
          </div>
          
          <AnimatePresence>
            {getCurrentStats() && (
              <motion.div 
                className="ranking-stats"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className="ranking-stat">
                  <motion.span 
                    className="ranking-stat-number"
                    key={getCurrentStats()!.tickets}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    {getCurrentStats()!.tickets}
                  </motion.span>
                  <span className="ranking-stat-label">이번 달 예매</span>
                </div>
                <div className="ranking-stat">
                  <motion.span 
                    className="ranking-stat-number"
                    key={getCurrentStats()!.rate}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                  >
                    {getCurrentStats()!.rate}
                  </motion.span>
                  <span className="ranking-stat-label">평균 예매율</span>
                </div>
                <div className="ranking-stat">
                  <motion.span 
                    className="ranking-stat-number"
                    key={getCurrentStats()!.rating}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                  >
                    {getCurrentStats()!.rating}
                  </motion.span>
                  <span className="ranking-stat-label">평균 평점</span>
                </div>
                <div className="ranking-stat">
                  <motion.span 
                    className="ranking-stat-number"
                    key={getCurrentStats()!.reviews}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
                  >
                    {getCurrentStats()!.reviews}
                  </motion.span>
                  <span className="ranking-stat-label">리뷰 수</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* News Section */}
      <section className="news-section">
        <div className="news-container">
          <div className="news-content">
            <div className="news-left">
              <img src={textLogoSvg} alt="세종문화회관 글씨 로고" className="news-logo" />
              <Link to="/notice" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h2>이벤트&소식</h2>
              </Link>
            </div>
            
            <div className="news-list">
              {newsData.map((news, index) => (
                <Link 
                  key={index}
                  to={`/notice-detail?id=${index + 1}`}
                  className="news-item-link"
                >
                  <motion.div 
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
                </Link>
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
      
      {/* Search Modal */}
      <SearchModal 
        isOpen={isSearchModalOpen} 
        onClose={() => setIsSearchModalOpen(false)} 
      />
        </div>
      </SmoothScroll>
    </>
  );
}
