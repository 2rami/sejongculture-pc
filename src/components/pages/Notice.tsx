import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../Header';
import SmoothScroll from '../SmoothScroll';

interface NoticeItem {
  id: number;
  title: string;
  date: string;
  category: string;
  content: string;
  isImportant: boolean;
}

export default function Notice() {
  const [selectedCategory, setSelectedCategory] = useState('전체');

  // 확장된 공지사항 데이터
  const noticeData: NoticeItem[] = [
    {
      id: 1,
      title: "예술광장 리뉴얼 오픈",
      date: "2025.05.16",
      category: "시설안내",
      content: "세종문화회관 예술광장이 새롭게 단장하여 5월 20일부터 다시 문을 엽니다. 더욱 쾌적하고 아름다운 공간에서 다양한 문화 행사를 즐기실 수 있습니다. 리뉴얼 기념 특별 이벤트도 준비되어 있으니 많은 관심 부탁드립니다.",
      isImportant: true
    },
    {
      id: 2,
      title: "티켓 할인 이벤트",
      date: "2025.05.22",
      category: "이벤트",
      content: "6월 한 달간 모든 공연 티켓을 20% 할인된 가격으로 만나보세요! 온라인 예매 시 추가 5% 할인 혜택까지! 이 기회를 놓치지 마시고 사랑하는 사람과 함께 감동적인 공연을 관람하세요.",
      isImportant: true
    },
    {
      id: 3,
      title: "갤러리 투어 참여자 모집",
      date: "2025.05.03",
      category: "참여모집",
      content: "세종갤러리에서 진행되는 특별 기획전 '현대미술의 흐름' 전시 해설 투어에 참여하실 분들을 모집합니다. 전문 큐레이터의 상세한 작품 해설을 들으며 깊이 있는 예술 감상의 시간을 가져보세요.",
      isImportant: false
    },
    {
      id: 4,
      title: "클래식 콘서트 선공개",
      date: "2025.05.16",
      category: "공연안내",
      content: "다가오는 세종 클래식 콘서트의 연주곡목이 공개되었습니다. 베토벤 교향곡 9번 '합창'을 비롯하여 모차르트의 명곡들로 구성된 프로그램을 만나보실 수 있습니다. 티켓 예매는 5월 20일부터 시작됩니다.",
      isImportant: false
    },
    {
      id: 5,
      title: "세종문화회관 창립 50주년 기념 특별전",
      date: "2025.04.28",
      category: "전시안내",
      content: "세종문화회관 창립 50주년을 맞이하여 특별 기획전시를 개최합니다. 지난 50년간의 발자취와 함께 미래 비전을 담은 의미 있는 전시입니다. 관람료는 무료이며, 6월 30일까지 진행됩니다.",
      isImportant: false
    },
    {
      id: 6,
      title: "주차장 이용 안내",
      date: "2025.04.20",
      category: "시설안내",
      content: "공연 관람객들의 편의를 위해 주차장 운영 시간이 연장됩니다. 평일 오후 10시, 주말 오후 11시까지 이용 가능하며, 공연 관람객에게는 2시간 무료 주차 혜택을 제공합니다.",
      isImportant: false
    },
    {
      id: 7,
      title: "온라인 예매 시스템 점검 안내",
      date: "2025.04.15",
      category: "시스템공지",
      content: "더 나은 서비스 제공을 위해 온라인 예매 시스템 정기 점검을 실시합니다. 점검 시간: 매주 화요일 오전 2시~6시. 점검 시간 중에는 온라인 예매가 일시 중단되니 양해 부탁드립니다.",
      isImportant: false
    },
    {
      id: 8,
      title: "청소년 문화교실 수강생 모집",
      date: "2025.04.10",
      category: "참여모집",
      content: "청소년들을 위한 다양한 문화예술 교육 프로그램을 준비했습니다. 연극, 음악, 미술 등 다양한 분야의 전문 강사진과 함께하는 특별한 시간을 만들어보세요. 신청은 홈페이지에서 가능합니다.",
      isImportant: false
    },
    {
      id: 9,
      title: "신규 회원 혜택 안내",
      date: "2025.04.05",
      category: "이벤트",
      content: "새로 가입하시는 회원분들께 특별한 혜택을 드립니다! 가입 시 5,000원 상당의 포인트 지급, 첫 공연 예매 시 10% 할인 쿠폰, 생일 기념 특별 할인 혜택까지! 지금 바로 회원가입하세요.",
      isImportant: false
    },
    {
      id: 10,
      title: "카페테리아 메뉴 추가 안내",
      date: "2025.03.30",
      category: "시설안내",
      content: "1층 카페테리아에 새로운 메뉴가 추가되었습니다. 건강한 샐러드부터 따뜻한 수제 디저트까지, 공연 관람 전후 여유로운 시간을 즐기실 수 있는 다양한 메뉴를 준비했습니다.",
      isImportant: false
    }
  ];

  const categories = ['전체', '공연안내', '전시안내', '시설안내', '이벤트', '참여모집', '시스템공지'];

  const filteredNotices = selectedCategory === '전체' 
    ? noticeData 
    : noticeData.filter(notice => notice.category === selectedCategory);

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
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          {/* 페이지 헤더 */}
          <motion.div
            style={{
              background: '#000000',
              color: '#ffffff',
              padding: '4rem 2rem',
              textAlign: 'center',
              marginBottom: '4rem'
            }}
            variants={itemVariants}
          >
            <h1 style={{
              fontSize: '3rem',
              fontWeight: '700',
              margin: '0 0 1rem 0',
              textTransform: 'uppercase',
              letterSpacing: '3px'
            }}>이벤트 & 소식</h1>
            <p style={{
              fontSize: '1.3rem',
              margin: '0',
              color: '#cccccc'
            }}>세종문화회관의 최신 이벤트와 소식을 만나보세요</p>
          </motion.div>

          {/* 카테고리 필터 */}
          <motion.div
            style={{
              marginBottom: '4rem'
            }}
            variants={itemVariants}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '2rem'
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
              }}>카테고리</h3>
              <div style={{
                flex: 1,
                height: '2px',
                background: '#000000'
              }}></div>
            </div>
            <div style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  style={{
                    background: selectedCategory === category ? '#000000' : 'transparent',
                    color: selectedCategory === category ? '#ffffff' : '#000000',
                    border: '2px solid #000000',
                    padding: '1rem 2rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: selectedCategory === category ? '#333333' : '#f0f0f0'
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* 공지사항 목록 */}
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
              }}>
                {selectedCategory === '전체' ? '전체 이벤트 & 소식' : `${selectedCategory} 소식`}
              </h3>
              <div style={{
                flex: 1,
                height: '2px',
                background: '#000000'
              }}></div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: '2rem'
            }}>
              {filteredNotices.map((notice, index) => (
                <motion.div
                  key={notice.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link
                    to={`/customerservice/notice/detail?id=${notice.id}`}
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                      display: 'block'
                    }}
                  >
                    <motion.div 
                      style={{
                        border: '2px solid #e0e0e0',
                        padding: '2rem',
                        height: '100%',
                        cursor: 'pointer',
                        background: '#ffffff'
                      }}
                      whileHover={{
                        borderColor: '#000000',
                        scale: 1.02,
                        boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '1rem',
                        marginBottom: '1.5rem'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                          {notice.isImportant && (
                            <span style={{
                              background: '#000000',
                              color: '#ffffff',
                              padding: '0.4rem 0.8rem',
                              fontSize: '0.7rem',
                              fontWeight: '700',
                              textTransform: 'uppercase',
                              letterSpacing: '1px'
                            }}>
                              HOT
                            </span>
                          )}
                          <span style={{
                            background: '#f0f0f0',
                            color: '#000000',
                            padding: '0.4rem 0.8rem',
                            fontSize: '0.7rem',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                          }}>
                            {notice.category}
                          </span>
                        </div>
                        <span style={{
                          color: '#999999',
                          fontSize: '0.8rem',
                          fontWeight: '500',
                          marginLeft: 'auto'
                        }}>
                          {notice.date}
                        </span>
                      </div>

                      <h4 style={{
                        fontSize: '1.4rem',
                        fontWeight: '700',
                        margin: '0 0 1rem 0',
                        color: '#000000',
                        lineHeight: '1.3'
                      }}>
                        {notice.title}
                      </h4>

                      <p style={{
                        color: '#666666',
                        lineHeight: '1.6',
                        margin: '0 0 1.5rem 0',
                        fontSize: '1rem'
                      }}>
                        {notice.content.length > 120 
                          ? `${notice.content.substring(0, 120)}...` 
                          : notice.content}
                      </p>

                      <div style={{
                        borderTop: '1px solid #e0e0e0',
                        paddingTop: '1rem',
                        textAlign: 'right'
                      }}>
                        <span style={{
                          color: '#000000',
                          fontSize: '0.9rem',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          letterSpacing: '1px'
                        }}>
                          자세히 보기 →
                        </span>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 문의 섹션 */}
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
              }}>문의사항</h3>
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
                whileHover={{ scale: 1.02 }}
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
                whileHover={{ scale: 1.02 }}
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