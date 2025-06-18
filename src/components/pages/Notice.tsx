import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '../Header';
import '../../styles/Notice.css';
import textLogoSvg from '../../assets/icons/text-logo.svg';

interface NoticeItem {
  id: number;
  title: string;
  date: string;
  category: string;
  content: string;
  isImportant: boolean;
}

export default function Notice() {
  const [selectedCategory, setSelectedCategory] = useState('전체');

  // 확장된 공지사항 데이터
  const noticeData: NoticeItem[] = [
    {
      id: 1,
      title: "예술광장 리뉴얼 오픈",
      date: "2025.05.16",
      category: "시설안내",
      content: "세종문화회관 예술광장이 새롭게 단장하여 5월 20일부터 다시 문을 엽니다. 더욱 쾌적하고 아름다운 공간에서 다양한 문화 행사를 즐기실 수 있습니다. 리뉴얼 기념 특별 이벤트도 준비되어 있으니 많은 관심 부탁드립니다.",
      isImportant: true
    },
    {
      id: 2,
      title: "티켓 할인 이벤트",
      date: "2025.05.22",
      category: "이벤트",
      content: "6월 한 달간 모든 공연 티켓을 20% 할인된 가격으로 만나보세요! 온라인 예매 시 추가 5% 할인 혜택까지! 이 기회를 놓치지 마시고 사랑하는 사람과 함께 감동적인 공연을 관람하세요.",
      isImportant: true
    },
    {
      id: 3,
      title: "갤러리 투어 참여자 모집",
      date: "2025.05.03",
      category: "참여모집",
      content: "세종갤러리에서 진행되는 특별 기획전 '현대미술의 흐름' 전시 해설 투어에 참여하실 분들을 모집합니다. 전문 큐레이터의 상세한 작품 해설을 들으며 깊이 있는 예술 감상의 시간을 가져보세요.",
      isImportant: false
    },
    {
      id: 4,
      title: "클래식 콘서트 선공개",
      date: "2025.05.16",
      category: "공연안내",
      content: "오는 7월에 열릴 세종 클래식 시리즈의 라인업을 미리 공개합니다. 세계적인 연주자들과 함께하는 특별한 무대를 기대해 주세요. 시즌 티켓 예매는 6월 1일부터 시작됩니다.",
      isImportant: false
    },
    {
      id: 5,
      title: "여름 프로그램 안내",
      date: "2025.05.03",
      category: "공연안내",
      content: "무더운 여름을 시원하게 만들어 줄 다양한 공연들이 준비되어 있습니다. 가족 뮤지컬부터 청춘 콘서트까지, 모든 연령대가 즐길 수 있는 풍성한 프로그램으로 여러분을 찾아갑니다.",
      isImportant: false
    },
    {
      id: 6,
      title: "주차장 운영시간 변경 안내",
      date: "2025.04.28",
      category: "시설안내",
      content: "5월 1일부터 세종문화회관 지하주차장 운영시간이 변경됩니다. 평일 오전 7시부터 밤 11시까지, 주말 및 공휴일은 오전 8시부터 밤 10시까지 운영됩니다. 이용에 참고 부탁드립니다.",
      isImportant: false
    },
    {
      id: 7,
      title: "청소년 문화교실 수강생 모집",
      date: "2025.04.25",
      category: "참여모집",
      content: "방학을 맞은 청소년들을 위한 특별 문화교실을 개설합니다. 연극, 음악, 미술 등 다양한 분야의 전문가들과 함께 창작 활동을 경험해보세요. 모집 기간은 5월 31일까지입니다.",
      isImportant: false
    },
    {
      id: 8,
      title: "세종문화회관 모바일 앱 출시",
      date: "2025.04.20",
      category: "서비스",
      content: "더욱 편리한 예매와 정보 확인을 위한 세종문화회관 공식 모바일 앱이 출시되었습니다. 앱스토어와 플레이스토어에서 다운로드 받으실 수 있으며, 앱 전용 할인 혜택도 제공됩니다.",
      isImportant: false
    }
  ];

  const categories = ['전체', '시설안내', '이벤트', '참여모집', '공연안내', '서비스'];

  const filteredNotices = selectedCategory === '전체' 
    ? noticeData 
    : noticeData.filter(notice => notice.category === selectedCategory);


  return (
    <>
      <Header />
      <div className="notice-page">
        <div className="page-container">
        {/* 헤더 섹션 */}
        <div className="notice-header">
          <div className="header-content">
            <img src={textLogoSvg} alt="세종문화회관 글씨 로고" className="notice-logo" />
            <div className="header-text">
              <h1>이벤트&소식</h1>
              <p>세종문화회관의 다양한 소식과 이벤트를 확인하세요</p>
            </div>
          </div>
        </div>

        {/* 카테고리 필터 */}
        <div className="category-filter">
          {categories.map(category => (
            <button 
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 공지사항 목록 */}
        <div className="notice-list">
          {filteredNotices.map((notice, index) => (
            <Link 
              key={notice.id}
              to={`/notice-detail?id=${notice.id}`}
              className="notice-item-link"
            >
              <motion.div 
                className={`notice-item ${notice.isImportant ? 'important' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="notice-summary">
                  <div className="notice-main">
                    <div className="notice-title-section">
                      {notice.isImportant && <span className="important-badge">중요</span>}
                      <span className="category-tag">{notice.category}</span>
                      <h3 className="notice-title">{notice.title}</h3>
                    </div>
                    <span className="notice-date">{notice.date}</span>
                  </div>
                  <div className="expand-icon">
                    <svg 
                      viewBox="0 0 24 24" 
                      fill="none"
                    >
                      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
        </div>
      </div>
    </>
  );
}