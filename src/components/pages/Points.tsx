import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import '../../styles/Points.css';

interface PointHistory {
  id: string;
  date: string;
  type: 'earned' | 'used';
  description: string;
  points: number;
  balance: number;
  source: string;
}

export default function Points() {
  const [filterType, setFilterType] = useState<'all' | 'earned' | 'used'>('all');

  const currentPoints = 15400;
  const expiringPoints = 2400;
  const expiringDate = '2025-06-30';

  const pointHistory: PointHistory[] = [
    {
      id: 'PT001',
      date: '2025-05-01',
      type: 'earned',
      description: '동양미래특급 예매',
      points: 3600,
      balance: 15400,
      source: '예매 적립 (10%)'
    },
    {
      id: 'PT002',
      date: '2025-04-25',
      type: 'used',
      description: '봄의 전설 할인 사용',
      points: -5000,
      balance: 11800,
      source: '결제 시 사용'
    },
    {
      id: 'PT003',
      date: '2025-04-20',
      type: 'earned',
      description: '봄의 전설 예매',
      points: 1300,
      balance: 16800,
      source: '예매 적립 (10%)'
    },
    {
      id: 'PT004',
      date: '2025-04-15',
      type: 'earned',
      description: '신규 회원 가입',
      points: 5000,
      balance: 15500,
      source: '가입 혜택'
    },
    {
      id: 'PT005',
      date: '2025-04-10',
      type: 'earned',
      description: '청춘 콘서트 예매',
      points: 1200,
      balance: 10500,
      source: '예매 적립 (10%)'
    },
    {
      id: 'PT006',
      date: '2025-04-05',
      type: 'used',
      description: '전시 관람 할인 사용',
      points: -2000,
      balance: 9300,
      source: '결제 시 사용'
    }
  ];

  const filteredHistory = filterType === 'all' 
    ? pointHistory 
    : pointHistory.filter(item => item.type === filterType);

  return (
    <>
      <Header />
      <div className="points-page">
        <div className="page-container">
          <div className="page-header">
            <Link to="/mypage" className="back-link">← 마이페이지</Link>
            <h1>포인트</h1>
            <p>포인트 적립 내역을 확인하세요</p>
          </div>

          {/* 포인트 요약 */}
          <div className="points-summary">
            <div className="current-points-card">
              <div className="points-icon">💰</div>
              <div className="points-info">
                <h3>보유 포인트</h3>
                <p className="points-amount">{currentPoints.toLocaleString()}P</p>
              </div>
            </div>
            
            <div className="expiring-points-card">
              <div className="expiring-icon">⏰</div>
              <div className="expiring-info">
                <h4>소멸 예정 포인트</h4>
                <p className="expiring-amount">{expiringPoints.toLocaleString()}P</p>
                <p className="expiring-date">{expiringDate}까지</p>
              </div>
            </div>
          </div>

          {/* 포인트 안내 */}
          <div className="points-info-section">
            <h3>포인트 적립 안내</h3>
            <div className="info-grid">
              <div className="info-item">
                <div className="info-icon">🎫</div>
                <h4>예매 적립</h4>
                <p>공연 예매 시<br/>결제금액의 10% 적립</p>
              </div>
              <div className="info-item">
                <div className="info-icon">🎉</div>
                <h4>이벤트 적립</h4>
                <p>특별 이벤트 참여 시<br/>추가 포인트 적립</p>
              </div>
              <div className="info-item">
                <div className="info-icon">👤</div>
                <h4>회원 혜택</h4>
                <p>신규 가입 시<br/>5,000P 즉시 지급</p>
              </div>
            </div>
          </div>

          {/* 필터 버튼 */}
          <div className="filter-section">
            <button 
              className={`filter-btn ${filterType === 'all' ? 'active' : ''}`}
              onClick={() => setFilterType('all')}
            >
              전체
            </button>
            <button 
              className={`filter-btn ${filterType === 'earned' ? 'active' : ''}`}
              onClick={() => setFilterType('earned')}
            >
              적립
            </button>
            <button 
              className={`filter-btn ${filterType === 'used' ? 'active' : ''}`}
              onClick={() => setFilterType('used')}
            >
              사용
            </button>
          </div>

          {/* 포인트 내역 */}
          <div className="points-history">
            <h3>포인트 내역</h3>
            <div className="history-list">
              {filteredHistory.length > 0 ? (
                filteredHistory.map((item) => (
                  <div key={item.id} className="history-item">
                    <div className="history-info">
                      <h4>{item.description}</h4>
                      <p className="history-source">{item.source}</p>
                      <p className="history-date">{item.date}</p>
                    </div>
                    <div className="history-points">
                      <span className={`points-change ${item.type}`}>
                        {item.type === 'earned' ? '+' : ''}{item.points.toLocaleString()}P
                      </span>
                      <span className="points-balance">
                        잔액: {item.balance.toLocaleString()}P
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <p>해당 조건의 포인트 내역이 없습니다.</p>
                </div>
              )}
            </div>
          </div>

          {/* 포인트 이용 안내 */}
          <div className="usage-info-section">
            <h3>포인트 이용 안내</h3>
            <div className="usage-content">
              <ul>
                <li>1포인트 = 1원으로 사용 가능합니다.</li>
                <li>최소 1,000포인트부터 사용 가능합니다.</li>
                <li>포인트는 적립일로부터 2년 후 자동 소멸됩니다.</li>
                <li>환불 시 사용한 포인트는 재적립됩니다.</li>
                <li>부분 취소 시 사용한 포인트는 비례하여 재적립됩니다.</li>
                <li>포인트는 현금으로 환전되지 않습니다.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}