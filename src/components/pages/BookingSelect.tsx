import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import '../../styles/BookingSelect.css';

// sub-2 asset 이미지들 import
import src2_1 from '../../assets/images/sub-2 asset/src2-1.jpeg';
import src2_2 from '../../assets/images/sub-2 asset/src2-2.jpg';
import src2_3 from '../../assets/images/sub-2 asset/src2-3.jpg';
import src2_4 from '../../assets/images/sub-2 asset/src2-4.jpg';
import src2_5 from '../../assets/images/sub-2 asset/src2-5.jpg';

interface Performance {
  id: string;
  title: string;
  subtitle: string;
  venue: string;
  period: string;
  image: string;
  minPrice: number;
}

export default function BookingSelect() {
  const performances: Performance[] = [
    {
      id: '1',
      title: '봄의 전설',
      subtitle: 'Spring Legend',
      venue: '세종대극장',
      period: '2025.05.15 - 2025.05.18',
      image: src2_1,
      minPrice: 40000
    },
    {
      id: '2',
      title: '클래식 갈라 콘서트',
      subtitle: 'Classic Gala Concert',
      venue: '세종M홀',
      period: '2025.05.20 - 2025.05.22',
      image: src2_2,
      minPrice: 70000
    },
    {
      id: '3',
      title: '발레 백조의 호수',
      subtitle: 'Swan Lake Ballet',
      venue: '세종대극장',
      period: '2025.06.20 - 2025.06.23',
      image: src2_3,
      minPrice: 60000
    },
    {
      id: '4',
      title: '재즈의 밤',
      subtitle: 'Jazz Night',
      venue: '세종M홀',
      period: '2025.07.01 - 2025.07.03',
      image: src2_4,
      minPrice: 45000
    },
    {
      id: '5',
      title: '오페라 라 트라비아타',
      subtitle: 'La Traviata',
      venue: '세종대극장',
      period: '2025.07.10 - 2025.07.18',
      image: src2_5,
      minPrice: 80000
    }
  ];

  return (
    <>
      <Header />
      <div className="booking-select-page">
        <div className="page-container">
        <h1>예매할 공연을 선택하세요</h1>
        <p className="page-description">원하시는 공연을 선택하시면 예매 페이지로 이동합니다.</p>
        
        <div className="performance-grid">
          {performances.map(performance => (
            <Link 
              key={performance.id} 
              to={`/booking?id=${performance.id}`}
              className="performance-card-link"
            >
              <div className="performance-card">
                <div className="performance-image-container">
                  <img src={performance.image} alt={performance.title} className="performance-image" />
                  <div className="performance-overlay">
                    <button className="select-btn">이 공연 예매하기</button>
                  </div>
                </div>
                <div className="performance-info">
                  <h3 className="performance-title">{performance.title}</h3>
                  <p className="performance-subtitle">{performance.subtitle}</p>
                  <div className="performance-details">
                    <p><span className="label">장소:</span> {performance.venue}</p>
                    <p><span className="label">기간:</span> {performance.period}</p>
                    <p><span className="label">최저가:</span> {performance.minPrice.toLocaleString()}원~</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        </div>
      </div>
    </>
  );
}