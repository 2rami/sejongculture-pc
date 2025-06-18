import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import '../../styles/Coupons.css';

export default function Coupons() {
  const menuItems = [
    {
      title: "쿠폰 등록",
      description: "새로운 쿠폰을 등록하세요",
      link: "/mypage/coupon-register",
      icon: "➕",
      color: "#ff6b6b"
    },
    {
      title: "쿠폰함",
      description: "보유한 쿠폰을 확인하세요",
      link: "/mypage/coupon-wallet",
      icon: "🎟️",
      color: "#4ecdc4"
    }
  ];

  const recentCoupons = [
    {
      id: "CP001",
      name: "신규 회원 할인 쿠폰",
      discount: "20%",
      expiryDate: "2025-06-30",
      status: "available"
    },
    {
      id: "CP002", 
      name: "봄 시즌 특별 할인",
      discount: "15%",
      expiryDate: "2025-05-31",
      status: "available"
    },
    {
      id: "CP003",
      name: "VIP 회원 전용 쿠폰",
      discount: "30%",
      expiryDate: "2025-04-30",
      status: "expired"
    }
  ];

  return (
    <>
      <Header />
      <div className="coupons-page">
        <div className="page-container">
          <div className="page-header">
            <Link to="/mypage" className="back-link">← 마이페이지</Link>
            <h1>쿠폰</h1>
            <p>할인 쿠폰을 등록하고 관리하세요</p>
          </div>

          <div className="coupons-menu">
            {menuItems.map((item, index) => (
              <Link key={index} to={item.link} className="coupon-menu-card">
                <div className="menu-icon" style={{color: item.color}}>
                  {item.icon}
                </div>
                <div className="menu-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div className="menu-arrow">→</div>
              </Link>
            ))}
          </div>

          <div className="recent-coupons-section">
            <h2>최근 쿠폰</h2>
            <div className="recent-coupons-list">
              {recentCoupons.map((coupon) => (
                <div key={coupon.id} className={`recent-coupon-item ${coupon.status}`}>
                  <div className="coupon-info">
                    <h4>{coupon.name}</h4>
                    <p className="coupon-discount">{coupon.discount} 할인</p>
                    <p className="coupon-expiry">만료일: {coupon.expiryDate}</p>
                  </div>
                  <div className="coupon-status">
                    <span className={`status-badge ${coupon.status}`}>
                      {coupon.status === 'available' ? '사용 가능' : '만료됨'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/mypage/coupon-wallet" className="view-all-btn">
              모든 쿠폰 보기
            </Link>
          </div>

          <div className="coupon-info-section">
            <h3>쿠폰 이용 안내</h3>
            <div className="info-content">
              <ul>
                <li>쿠폰은 결제 시 할인 적용됩니다.</li>
                <li>중복 사용은 불가하며, 1회 예매 시 1개의 쿠폰만 사용 가능합니다.</li>
                <li>쿠폰별 사용 조건이 다를 수 있으니 상세 내용을 확인해주세요.</li>
                <li>만료된 쿠폰은 자동으로 삭제됩니다.</li>
                <li>쿠폰 분실 시 재발급이 불가할 수 있습니다.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}