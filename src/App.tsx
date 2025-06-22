import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (hasVisited) {
      setIsInitialLoading(false);
    }
  }, []);

  const handleLoadingComplete = () => {
    setIsInitialLoading(false);
    sessionStorage.setItem('hasVisited', 'true');
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
