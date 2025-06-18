import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import '../../styles/MyPage.css';

export default function MyPage() {
  const menuItems = [
    {
      title: "예매 내역",
      description: "예매한 공연 목록을 확인하세요",
      link: "/mypage/booking-history",
      icon: "🎫"
    },
    {
      title: "쿠폰",
      description: "사용 가능한 쿠폰을 관리하세요",
      link: "/mypage/coupons",
      icon: "🎟️"
    },
    {
      title: "포인트",
      description: "포인트 적립 내역을 확인하세요",
      link: "/mypage/points",
      icon: "💰"
    },
    {
      title: "내 정보 수정",
      description: "개인정보를 수정하세요",
      link: "/mypage/profile",
      icon: "👤"
    },
    {
      title: "고객센터",
      description: "문의사항이 있으시면 연락주세요",
      link: "/mypage/customer-service",
      icon: "📞"
    }
  ];

  return (
    <>
      <Header />
      <div className="mypage">
        <div className="page-container">
          <div className="mypage-header">
            <h1>마이페이지</h1>
            <p>세종문화회관의 다양한 서비스를 이용해보세요</p>
          </div>
          
          <div className="mypage-grid">
            {menuItems.map((item, index) => (
              <Link key={index} to={item.link} className="mypage-card">
                <div className="card-icon">{item.icon}</div>
                <div className="card-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div className="card-arrow">→</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}