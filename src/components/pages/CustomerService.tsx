import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import '../../styles/CustomerService.css';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export default function CustomerService() {
  const [activeTab, setActiveTab] = useState<'contact' | 'faq'>('contact');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const contactInfo = {
    phone: '02-399-1000',
    email: 'customer@sejongpac.or.kr',
    hours: {
      weekday: '평일 09:00 - 18:00',
      weekend: '주말 및 공휴일 휴무'
    },
    address: '서울특별시 종로구 세종로 175 세종문화회관'
  };

  const faqs: FAQ[] = [
    {
      id: 'faq1',
      question: '예매 취소는 어떻게 하나요?',
      answer: '마이페이지 > 예매 내역에서 해당 공연의 "예매 취소" 버튼을 클릭하시면 됩니다. 공연일 3일 전까지는 100% 환불이 가능하며, 그 이후에는 취소 수수료가 발생할 수 있습니다.',
      category: '예매/취소'
    },
    {
      id: 'faq2',
      question: '모바일 티켓을 사용할 수 없어요.',
      answer: '모바일 티켓은 스크린샷이나 캡처 이미지로는 사용이 불가합니다. 반드시 실시간으로 앱이나 웹에서 티켓을 확인해야 하며, 배터리가 충분한지 확인해주세요. 문제가 지속되면 고객센터로 연락주세요.',
      category: '티켓'
    },
    {
      id: 'faq3',
      question: '포인트는 언제 적립되나요?',
      answer: '포인트는 공연 관람 완료 후 1-2일 내에 자동으로 적립됩니다. 예매 시 결제금액의 10%가 적립되며, 적립된 포인트는 다음 예매 시 사용 가능합니다.',
      category: '포인트/쿠폰'
    },
    {
      id: 'faq4',
      question: '좌석을 변경할 수 있나요?',
      answer: '이미 예매가 완료된 좌석은 변경이 불가합니다. 좌석 변경을 원하시는 경우 기존 예매를 취소하고 새로 예매해주셔야 합니다. 단, 취소 시점에 따라 수수료가 발생할 수 있습니다.',
      category: '예매/취소'
    },
    {
      id: 'faq5',
      question: '할인 혜택은 어떤 것들이 있나요?',
      answer: '청소년(만 7-18세), 경로우대(만 65세 이상), 장애인 할인이 있으며, 각각 30% 할인됩니다. 또한 조기예매 할인, 단체 할인(10인 이상) 등의 특별 할인도 제공됩니다.',
      category: '할인/혜택'
    },
    {
      id: 'faq6',
      question: '공연장 주차는 어떻게 하나요?',
      answer: '세종문화회관 지하 주차장을 이용하실 수 있습니다. 공연 관람객은 3시간까지 무료 주차가 가능하며, 주차권은 공연장 안내데스크에서 인증받으실 수 있습니다.',
      category: '기타'
    }
  ];

  const categories = ['전체', '예매/취소', '티켓', '포인트/쿠폰', '할인/혜택', '기타'];
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const filteredFAQs = selectedCategory === '전체' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <>
      <Header />
      <div className="customer-service-page">
        <div className="page-container">
          <div className="page-header">
            <Link to="/mypage" className="back-link">← 마이페이지</Link>
            <h1>고객센터</h1>
            <p>궁금한 사항이 있으시면 언제든지 연락주세요</p>
          </div>

          <div className="service-tabs">
            <button 
              className={`tab-btn ${activeTab === 'contact' ? 'active' : ''}`}
              onClick={() => setActiveTab('contact')}
            >
              연락처 안내
            </button>
            <button 
              className={`tab-btn ${activeTab === 'faq' ? 'active' : ''}`}
              onClick={() => setActiveTab('faq')}
            >
              자주 묻는 질문
            </button>
          </div>

          {activeTab === 'contact' && (
            <div className="contact-section">
              <div className="contact-grid">
                <div className="contact-card">
                  <div className="contact-icon">📞</div>
                  <h3>전화 문의</h3>
                  <p className="contact-value">{contactInfo.phone}</p>
                  <div className="contact-hours">
                    <p>{contactInfo.hours.weekday}</p>
                    <p>{contactInfo.hours.weekend}</p>
                  </div>
                </div>

                <div className="contact-card">
                  <div className="contact-icon">✉️</div>
                  <h3>이메일 문의</h3>
                  <p className="contact-value">{contactInfo.email}</p>
                  <p className="contact-desc">24시간 언제든지 문의하세요</p>
                </div>

                <div className="contact-card full-width">
                  <div className="contact-icon">📍</div>
                  <h3>방문 안내</h3>
                  <p className="contact-value">{contactInfo.address}</p>
                  <div className="location-info">
                    <p>• 지하철 1호선, 5호선 종각역 1번 출구</p>
                    <p>• 지하철 3호선 광화문역 8번 출구</p>
                    <p>• 버스 1020, 7025, 1711, 109 등</p>
                  </div>
                </div>
              </div>

              <div className="inquiry-form-section">
                <h3>온라인 문의</h3>
                <form className="inquiry-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>이름</label>
                      <input type="text" placeholder="이름을 입력하세요" />
                    </div>
                    <div className="form-group">
                      <label>이메일</label>
                      <input type="email" placeholder="이메일을 입력하세요" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>문의 유형</label>
                    <select>
                      <option>예매/취소 문의</option>
                      <option>티켓 관련 문의</option>
                      <option>포인트/쿠폰 문의</option>
                      <option>할인 혜택 문의</option>
                      <option>기타 문의</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>제목</label>
                    <input type="text" placeholder="문의 제목을 입력하세요" />
                  </div>
                  <div className="form-group">
                    <label>내용</label>
                    <textarea placeholder="문의 내용을 자세히 작성해주세요" rows={6}></textarea>
                  </div>
                  <button type="submit" className="submit-btn">문의하기</button>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="faq-section">
              <div className="faq-categories">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="faq-list">
                {filteredFAQs.map((faq) => (
                  <div key={faq.id} className="faq-item">
                    <button
                      className="faq-question"
                      onClick={() => toggleFAQ(faq.id)}
                    >
                      <span className="question-mark">Q</span>
                      <span className="question-text">{faq.question}</span>
                      <span className={`arrow ${expandedFAQ === faq.id ? 'expanded' : ''}`}>
                        ▼
                      </span>
                    </button>
                    {expandedFAQ === faq.id && (
                      <div className="faq-answer">
                        <span className="answer-mark">A</span>
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}