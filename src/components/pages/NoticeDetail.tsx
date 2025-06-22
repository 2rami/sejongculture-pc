import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../Header';
import SmoothScroll from '../SmoothScroll';

interface NoticeDetailData {
  id: number;
  title: string;
  date: string;
  category: string;
  content: string;
  fullContent: string;
  isImportant: boolean;
}

export default function NoticeDetail() {
  const [searchParams] = useSearchParams();
  const noticeId = searchParams.get('id') || '1';

  // 공지사항 상세 데이터
  const noticeDetails: { [key: string]: NoticeDetailData } = {
    '1': {
      id: 1,
      title: "예술광장 리뉴얼 오픈",
      date: "2025.05.16",
      category: "시설안내",
      content: "세종문화회관 예술광장이 새롭게 단장하여 5월 20일부터 다시 문을 엽니다.",
      fullContent: `세종문화회관 예술광장이 새롭게 단장하여 5월 20일부터 다시 문을 엽니다.

이번 리뉴얼을 통해 더욱 쾌적하고 아름다운 공간으로 거듭났습니다. 주요 개선사항은 다음과 같습니다:

• 조경시설 전면 개선으로 더욱 아름다운 야외 공간 조성
• 휴식 시설 확충으로 관람객 편의성 증대  
• LED 조명 설치로 야간에도 안전하고 아름다운 공간 연출
• 접근성 개선을 위한 무장애 시설 확충

리뉴얼 기념 특별 이벤트:
- 기간: 5월 20일 ~ 6월 10일
- 내용: 야외 공연, 포토존 설치, 기념품 증정
- 참여 방법: 현장 방문 시 자동 참여

많은 관심과 참여 부탁드립니다.`,
      isImportant: true
    },
    '2': {
      id: 2,
      title: "티켓 할인 이벤트",
      date: "2025.05.22",
      category: "이벤트",
      content: "6월 한 달간 모든 공연 티켓을 20% 할인된 가격으로 만나보세요!",
      fullContent: `6월 한 달간 모든 공연 티켓을 20% 할인된 가격으로 만나보세요!

할인 혜택:
• 모든 공연 티켓 20% 할인
• 온라인 예매 시 추가 5% 할인 (총 25% 할인)
• 세종문화회관 회원 추가 3% 할인 (최대 28% 할인)

대상 공연:
- 뮤지컬, 클래식, 무용, 국악 등 모든 장르
- 6월 1일 ~ 6월 30일 공연분

주의사항:
• 다른 할인과 중복 적용 불가
• 일부 프리미엄 공연 제외
• 환불 시 할인 적용 전 금액 기준

이 기회를 놓치지 마시고 사랑하는 사람과 함께 감동적인 공연을 관람하세요.`,
      isImportant: true
    }
  };

  const currentNotice = noticeDetails[noticeId];

  if (!currentNotice) {
    return (
      <>
        <Header />
        <div style={{
          background: '#ffffff',
          minHeight: '100vh',
          paddingTop: '6rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            textAlign: 'center',
            padding: '3rem'
          }}>
            <h2 style={{ color: '#000000', marginBottom: '1rem' }}>공지사항을 찾을 수 없습니다</h2>
            <Link 
              to="/customerservice/notice"
              style={{
                background: '#000000',
                color: '#ffffff',
                padding: '1rem 2rem',
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontWeight: '600'
              }}
            >
              공지사항 목록으로
            </Link>
          </div>
        </div>
      </>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
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
          {/* 뒤로가기 */}
          <motion.div 
            style={{ marginBottom: '3rem' }}
            variants={itemVariants}
          >
            <Link 
              to="/notice"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#666666',
                textDecoration: 'none',
                fontSize: '1.1rem',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#000000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#666666';
              }}
            >
              ← 이벤트&소식 목록으로
            </Link>
          </motion.div>

          {/* 공지사항 상세 */}
          <motion.article
            style={{
              background: '#ffffff',
              marginBottom: '4rem'
            }}
            variants={itemVariants}
          >
            {/* 헤더 섹션 */}
            <motion.header
              style={{
                background: '#000000',
                color: '#ffffff',
                padding: '3rem 2rem',
                textAlign: 'center'
              }}
              variants={itemVariants}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '2rem',
                flexWrap: 'wrap'
              }}>
                {currentNotice.isImportant && (
                  <motion.span
                    style={{
                      background: '#ffffff',
                      color: '#000000',
                      padding: '0.6rem 1.2rem',
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    HOT
                  </motion.span>
                )}
                <span style={{
                  background: 'rgba(255,255,255,0.2)',
                  color: '#ffffff',
                  padding: '0.6rem 1.2rem',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  {currentNotice.category}
                </span>
                <span style={{
                  color: '#cccccc',
                  fontSize: '1rem',
                  fontWeight: '500'
                }}>
                  {currentNotice.date}
                </span>
              </div>
              
              <h1 style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                margin: '0',
                color: '#ffffff',
                lineHeight: '1.3',
                textTransform: 'uppercase',
                letterSpacing: '2px'
              }}>
                {currentNotice.title}
              </h1>
            </motion.header>

            {/* 내용 */}
            <motion.div
              style={{
                padding: '4rem 3rem'
              }}
              variants={itemVariants}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '3rem'
              }}>
                <div style={{
                  flex: 1,
                  height: '2px',
                  background: '#000000'
                }}></div>
                <h2 style={{
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  margin: '0 2rem',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  color: '#000000'
                }}>내용</h2>
                <div style={{
                  flex: 1,
                  height: '2px',
                  background: '#000000'
                }}></div>
              </div>

              <div style={{
                fontSize: '1.2rem',
                lineHeight: '1.8',
                color: '#333333',
                whiteSpace: 'pre-line',
                maxWidth: '800px',
                margin: '0 auto',
                textAlign: 'left'
              }}>
                {currentNotice.fullContent}
              </div>
            </motion.div>

            {/* 하단 액션 */}
            <motion.div
              style={{
                padding: '3rem 2rem',
                textAlign: 'center',
                borderTop: '2px solid #000000'
              }}
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to="/notice"
                  style={{
                    background: '#000000',
                    color: '#ffffff',
                    border: 'none',
                    padding: '1.5rem 3rem',
                    fontSize: '1.1rem',
                    fontWeight: '700',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    display: 'inline-block',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#333333';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#000000';
                  }}
                >
                  목록으로 돌아가기
                </Link>
              </motion.div>
            </motion.div>
          </motion.article>

          {/* 관련 문의 */}
          <motion.div
            style={{
              marginBottom: '4rem'
            }}
            variants={itemVariants}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '3rem'
            }}>
              <div style={{
                flex: 1,
                height: '2px',
                background: '#000000'
              }}></div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                margin: '0 2rem',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                color: '#000000'
              }}>관련 문의</h3>
              <div style={{
                flex: 1,
                height: '2px',
                background: '#000000'
              }}></div>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem'
            }}>
              <motion.div
                style={{
                  background: '#ffffff',
                  border: '2px solid #000000',
                  padding: '2rem',
                  textAlign: 'center'
                }}
                whileHover={{ scale: 1.02, boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}
                transition={{ duration: 0.3 }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📞</div>
                <h4 style={{
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  margin: '0 0 1rem 0',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>전화 문의</h4>
                <p style={{
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  margin: '0 0 0.5rem 0',
                  color: '#000000'
                }}>02-399-1000</p>
                <p style={{
                  color: '#666666',
                  margin: '0',
                  fontSize: '1rem'
                }}>평일 09:00 - 18:00</p>
              </motion.div>

              <motion.div
                style={{
                  background: '#ffffff',
                  border: '2px solid #000000',
                  padding: '2rem',
                  textAlign: 'center'
                }}
                whileHover={{ scale: 1.02, boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}
                transition={{ duration: 0.3 }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✉️</div>
                <h4 style={{
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  margin: '0 0 1rem 0',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>이메일 문의</h4>
                <p style={{
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  margin: '0 0 0.5rem 0',
                  color: '#000000'
                }}>info@sejongpac.or.kr</p>
                <p style={{
                  color: '#666666',
                  margin: '0',
                  fontSize: '1rem'
                }}>24시간 접수 가능</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </SmoothScroll>
  );
}