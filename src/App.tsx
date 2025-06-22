import React, { useState, useEffect, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import PerformanceList from './components/pages/PerformanceList';
import PerformanceInfo from './components/pages/PerformanceInfo';
import Notice from './components/pages/Notice';
import NoticeDetail from './components/pages/NoticeDetail';
import Booking from './components/pages/Booking';
import MyPage from './components/pages/MyPage';
import BookingHistory from './components/pages/BookingHistory';
import BookingDetail from './components/pages/BookingDetail';
import MobileTicket from './components/pages/MobileTicket';
import Coupons from './components/pages/Coupons';
import Points from './components/pages/Points';
import Profile from './components/pages/Profile';
import CustomerService from './components/pages/CustomerService';
import ScrollToTop from './components/ScrollToTop';
import LoadingAnimation from './components/LoadingAnimation';
import './App.css';

function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // 앱 시작시 스크롤을 맨 위로 강제 이동 (Vercel 대응)
  useLayoutEffect(() => {
    // 브라우저 히스토리 복원 방지
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    // 강제 스크롤 초기화
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (hasVisited) {
      setIsInitialLoading(false);
    }
    
    // Vercel 환경에서도 작동하도록 여러 시점에서 스크롤 보장
    const scrollToTop = () => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollTo(0, 0);
    };
    
    scrollToTop();
    setTimeout(scrollToTop, 0);
    setTimeout(scrollToTop, 100);
    setTimeout(scrollToTop, 300);
  }, []);

  const handleLoadingComplete = () => {
    setIsInitialLoading(false);
    sessionStorage.setItem('hasVisited', 'true');
    // 로딩 완료 후 스크롤 보장
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  };

  if (isInitialLoading) {
    return <LoadingAnimation onComplete={handleLoadingComplete} />;
  }

  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/performances" element={<PerformanceList />} />
          <Route path="/performance-list" element={<PerformanceList />} />
          <Route path="/performance-info" element={<PerformanceInfo />} />
          <Route path="/customerservice/notice" element={<Notice />} />
          <Route path="/customerservice/notice/detail" element={<NoticeDetail />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/notice-detail" element={<NoticeDetail />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/customerservice" element={<CustomerService />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/booking-history" element={<BookingHistory />} />
          <Route path="/mypage/booking-detail" element={<BookingDetail />} />
          <Route path="/mypage/mobile-ticket" element={<MobileTicket />} />
          <Route path="/mypage/coupons" element={<Coupons />} />
          <Route path="/mypage/points" element={<Points />} />
          <Route path="/mypage/profile" element={<Profile />} />
          <Route path="/mypage/customer-service" element={<CustomerService />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
