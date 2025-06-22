import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../Header';
import SmoothScroll from '../SmoothScroll';

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <SmoothScroll>
      <Header />
      <motion.div
        style={{
          background: '#ffffff',
          minHeight: '100vh',
          paddingTop: '6rem'
        }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <motion.div
            style={{
              background: '#000000',
              color: '#ffffff',
              padding: '3rem 2rem',
              textAlign: 'center',
              marginBottom: '3rem'
            }}
            variants={itemVariants}
          >
            <Link
              to="/mypage"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#cccccc',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: '600',
                marginBottom: '2rem',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
            >
              ← 마이페이지
            </Link>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              margin: '0 0 1rem 0',
              textTransform: 'uppercase',
              letterSpacing: '2px'
            }}>고객센터</h1>
            <p style={{
              fontSize: '1.2rem',
              margin: '0',
              color: '#cccccc'
            }}>궁금한 사항이 있으시면 언제든지 연락주세요</p>
          </motion.div>

          <motion.div
            style={{
              display: 'flex',
              gap: '1rem',
              marginBottom: '3rem',
              justifyContent: 'center'
            }}
            variants={itemVariants}
          >
            <motion.button
              style={{
                background: activeTab === 'contact' ? '#000000' : '#ffffff',
                color: activeTab === 'contact' ? '#ffffff' : '#000000',
                border: '2px solid #000000',
                padding: '1rem 2rem',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
              onClick={() => setActiveTab('contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              연락처 안내
            </motion.button>
            <motion.button
              style={{
                background: activeTab === 'faq' ? '#000000' : '#ffffff',
                color: activeTab === 'faq' ? '#ffffff' : '#000000',
                border: '2px solid #000000',
                padding: '1rem 2rem',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
              onClick={() => setActiveTab('faq')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              자주 묻는 질문
            </motion.button>
          </motion.div>

          {activeTab === 'contact' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                  gap: '2rem',
                  marginBottom: '3rem'
                }}
                variants={containerVariants}
              >
                <motion.div
                  style={{
                    background: '#ffffff',
                    border: '2px solid #000000',
                    padding: '2rem',
                    textAlign: 'center'
                  }}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📞</div>
                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: '700',
                    margin: '0 0 1rem 0',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>전화 문의</h3>
                  <p style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    margin: '0 0 1rem 0',
                    color: '#000000'
                  }}>{contactInfo.phone}</p>
                  <div>
                    <p style={{ margin: '0.5rem 0', color: '#666666' }}>{contactInfo.hours.weekday}</p>
                    <p style={{ margin: '0.5rem 0', color: '#666666' }}>{contactInfo.hours.weekend}</p>
                  </div>
                </motion.div>

                <motion.div
                  style={{
                    background: '#ffffff',
                    border: '2px solid #000000',
                    padding: '2rem',
                    textAlign: 'center'
                  }}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✉️</div>
                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: '700',
                    margin: '0 0 1rem 0',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>이메일 문의</h3>
                  <p style={{
                    fontSize: '1.2rem',
                    fontWeight: '600',
                    margin: '0 0 1rem 0',
                    color: '#000000'
                  }}>{contactInfo.email}</p>
                  <p style={{ margin: '0', color: '#666666' }}>24시간 언제든지 문의하세요</p>
                </motion.div>

                <motion.div
                  style={{
                    background: '#ffffff',
                    border: '2px solid #000000',
                    padding: '2rem',
                    textAlign: 'center',
                    gridColumn: '1 / -1'
                  }}
                  variants={itemVariants}
                  whileHover={{ scale: 1.01 }}
                >
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📍</div>
                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: '700',
                    margin: '0 0 1rem 0',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>방문 안내</h3>
                  <p style={{
                    fontSize: '1.2rem',
                    fontWeight: '600',
                    margin: '0 0 1.5rem 0',
                    color: '#000000'
                  }}>{contactInfo.address}</p>
                  <div style={{ textAlign: 'left', maxWidth: '400px', margin: '0 auto' }}>
                    <p style={{ margin: '0.5rem 0', color: '#666666' }}>• 지하철 1호선, 5호선 종각역 1번 출구</p>
                    <p style={{ margin: '0.5rem 0', color: '#666666' }}>• 지하철 3호선 광화문역 8번 출구</p>
                    <p style={{ margin: '0.5rem 0', color: '#666666' }}>• 버스 1020, 7025, 1711, 109 등</p>
                  </div>
                </motion.div>
              </motion.div>

            </motion.div>
          )}

          {activeTab === 'faq' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                style={{
                  display: 'flex',
                  gap: '1rem',
                  marginBottom: '2rem',
                  flexWrap: 'wrap',
                  justifyContent: 'center'
                }}
                variants={itemVariants}
              >
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    style={{
                      background: selectedCategory === category ? '#000000' : '#ffffff',
                      color: selectedCategory === category ? '#ffffff' : '#000000',
                      border: '2px solid #000000',
                      padding: '0.8rem 1.5rem',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}
                    onClick={() => setSelectedCategory(category)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category}
                  </motion.button>
                ))}
              </motion.div>

              <div>
                {filteredFAQs.map((faq, index) => (
                  <motion.div
                    key={faq.id}
                    style={{
                      background: '#ffffff',
                      border: '2px solid #000000',
                      marginBottom: '1rem'
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <motion.button
                      style={{
                        width: '100%',
                        background: 'none',
                        border: 'none',
                        padding: '1.5rem 2rem',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                      onClick={() => toggleFAQ(faq.id)}
                      whileHover={{ backgroundColor: '#f8f8f8' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{
                          background: '#000000',
                          color: '#ffffff',
                          width: '30px',
                          height: '30px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: '700'
                        }}>Q</span>
                        <span style={{ fontWeight: '600', fontSize: '1.1rem' }}>{faq.question}</span>
                      </div>
                      <span style={{
                        transform: expandedFAQ === faq.id ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease'
                      }}>▼</span>
                    </motion.button>
                    {expandedFAQ === faq.id && (
                      <motion.div
                        style={{
                          padding: '0 2rem 2rem 2rem',
                          borderTop: '1px solid #e0e0e0'
                        }}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', paddingTop: '1rem' }}>
                          <span style={{
                            background: '#f0f0f0',
                            color: '#000000',
                            width: '30px',
                            height: '30px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: '700',
                            flexShrink: 0
                          }}>A</span>
                          <p style={{
                            margin: '0',
                            lineHeight: '1.6',
                            color: '#333333'
                          }}>{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </SmoothScroll>
  );
}