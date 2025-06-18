import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import logoSvg from '../assets/icons/main-logo.svg';

export default function Header() {
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [hoveredSubMenu, setHoveredSubMenu] = useState<string | null>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

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

  const getLink = (item: string) => {
    if (item === '공연/전시') return '/performance-list';
    if (item === '공연 정보') return '/performance-info';
    if (item === '예매') return '/booking-select';
    if (item === '공지사항') return '/notice';
    return '#';
  };

  return (
    <>
      {/* Header Navigation */}
      <header className="header">
        <div className="header-container">
          <Link to="/" className="logo">
            <img src={logoSvg} alt="세종문화회관 로고" className="logo-image" />
          </Link>
          <div className="nav-menu-wrapper">
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
                    {menuData[menuItem as keyof typeof menuData].map((subItem, index) => (
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
                    ))}
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}