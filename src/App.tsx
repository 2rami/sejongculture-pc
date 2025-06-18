import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import PerformanceList from './components/pages/PerformanceList';
import PerformanceInfo from './components/pages/PerformanceInfo';
import Notice from './components/pages/Notice';
import NoticeDetail from './components/pages/NoticeDetail';
import BookingSelect from './components/pages/BookingSelect';
import Booking from './components/pages/Booking';
import MyPage from './components/pages/MyPage';
import BookingHistory from './components/pages/BookingHistory';
import BookingDetail from './components/pages/BookingDetail';
import MobileTicket from './components/pages/MobileTicket';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/performance-list" element={<PerformanceList />} />
          <Route path="/performance-info" element={<PerformanceInfo />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/notice-detail" element={<NoticeDetail />} />
          <Route path="/booking-select" element={<BookingSelect />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/booking-history" element={<BookingHistory />} />
          <Route path="/mypage/booking-detail" element={<BookingDetail />} />
          <Route path="/mypage/mobile-ticket" element={<MobileTicket />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
