import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../Header';
import SmoothScroll from '../SmoothScroll';
// 공연 이미지 import
import imageSrc4 from '../../assets/images/image-4.jpeg';
import imageSrc6 from '../../assets/images/image-6.jpeg';
import imageSrc7 from '../../assets/images/image-7.jpeg';
import imageSrc8 from '../../assets/images/image-8.jpeg';
import imageSrc9 from '../../assets/images/image-9.jpeg';
import imageSrc14 from '../../assets/images/image-14.jpeg';
import imageSrc15 from '../../assets/images/image-15.jpeg';
import imageSrc25 from '../../assets/images/image-25.jpeg';
import imageSrc26 from '../../assets/images/image-26.jpeg';
import imageSrc27 from '../../assets/images/image-27.jpeg';
import imageSrc28 from '../../assets/images/image-28.jpeg';

interface Performance {
  id: number;
  title: string;
  subtitle: string;
  venue: string;
  period: string;
  price: string;
  genre: string;
  image: string;
}

export default function PerformanceList() {
  const [selectedGenre, setSelectedGenre] = useState('전체');

  const performances: Performance[] = [
    {
      id: 1,
      title: "봄의 전설",
      subtitle: "Spring Legend",
      venue: "세종대극장",
      period: "2025.05.15 - 2025.06.01",
      price: "R석 80,000원 / S석 60,000원",
      genre: "뮤지컬",
      image: imageSrc7
    },
    {
      id: 2,
      title: "클래식 갈라 콘서트",
      subtitle: "Classic Gala Concert",
      venue: "세종M홀",
      period: "2025.05.20 - 2025.05.22",
      price: "VIP석 100,000원 / R석 70,000원",
      genre: "클래식",
      image: imageSrc8
    },
    {
      id: 3,
      title: "동양미래특급",
      subtitle: "Oriental Future Express",
      venue: "세종대극장",
      period: "2025.05.25 - 2025.06.10",
      price: "VIP석 120,000원 / R석 90,000원",
      genre: "뮤지컬",
      image: imageSrc4
    },
    {
      id: 4,
      title: "세종 클래식 콘서트",
      subtitle: "Sejong Classic Concert",
      venue: "세종M홀",
      period: "2025.05.14 - 2025.05.16",
      price: "VIP석 110,000원 / R석 80,000원",
      genre: "클래식",
      image: imageSrc26
    },
    {
      id: 5,
      title: "청춘 뮤지컬",
      subtitle: "Youth Musical",
      venue: "소극장",
      period: "2025.05.21 - 2025.05.23",
      price: "R석 70,000원 / S석 50,000원",
      genre: "뮤지컬",
      image: imageSrc27
    },
    {
      id: 6,
      title: "오케스트라 공연",
      subtitle: "Orchestra Performance",
      venue: "세종M홀",
      period: "2025.05.28 - 2025.05.30",
      price: "VIP석 95,000원 / R석 75,000원",
      genre: "클래식",
      image: imageSrc28
    },
    {
      id: 7,
      title: "현대무용공연",
      subtitle: "Contemporary Dance",
      venue: "세종대극장",
      period: "2025.06.01 - 2025.06.05",
      price: "R석 85,000원 / S석 65,000원",
      genre: "무용",
      image: imageSrc9
    },
    {
      id: 8,
      title: "국악 한마당",
      subtitle: "Korean Traditional Music",
      venue: "세종M홀",
      period: "2025.06.10 - 2025.06.12",
      price: "R석 60,000원 / S석 45,000원",
      genre: "국악",
      image: imageSrc14
    },
    {
      id: 9,
      title: "발레 갈라",
      subtitle: "Ballet Gala",
      venue: "세종대극장",
      period: "2025.06.15 - 2025.06.20",
      price: "VIP석 130,000원 / R석 100,000원",
      genre: "무용",
      image: imageSrc15
    },
    {
      id: 10,
      title: "재즈 앙상블",
      subtitle: "Jazz Ensemble",
      venue: "소극장",
      period: "2025.06.25 - 2025.06.27",
      price: "R석 75,000원 / S석 55,000원",
      genre: "기타",
      image: imageSrc25
    },
    {
      id: 11,
      title: "어린이 뮤지컬",
      subtitle: "Children's Musical",
      venue: "소극장",
      period: "2025.07.01 - 2025.07.10",
      price: "R석 50,000원 / S석 35,000원",
      genre: "뮤지컬",
      image: imageSrc6
    }
  ];

  const genres = ['전체', '뮤지컬', '클래식', '무용', '국악', '기타'];

  const filteredPerformances = selectedGenre === '전체' 
    ? performances 
    : performances.filter(performance => performance.genre === selectedGenre);

  return (
    <SmoothScroll>
      <Header />
      <div style={{
          background: '#ffffff',
          minHeight: '100vh',
          paddingTop: '6rem'
        }}>
          <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          {/* 페이지 헤더 */}
          <div style={{
            background: '#000000',
            color: '#ffffff',
            padding: '3rem 2rem',
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              margin: '0 0 1rem 0',
              textTransform: 'uppercase',
              letterSpacing: '2px'
            }}>공연/전시</h1>
            <p style={{
              fontSize: '1.2rem',
              margin: '0',
              color: '#cccccc'
            }}>세종문화회관의 다양한 공연을 만나보세요</p>
          </div>

          {/* 장르 필터 */}
          <div style={{
            background: '#ffffff',
            border: '2px solid #000000',
            marginBottom: '3rem'
          }}>
            <div style={{
              background: '#000000',
              color: '#ffffff',
              padding: '1.5rem 2rem'
            }}>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: '700',
                margin: '0',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>장르별 보기</h3>
            </div>
            <div style={{
              padding: '2rem',
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  style={{
                    background: selectedGenre === genre ? '#000000' : '#ffffff',
                    color: selectedGenre === genre ? '#ffffff' : '#000000',
                    border: '2px solid #000000',
                    padding: '1rem 2rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* 공연 목록 */}
          <div style={{
            background: '#ffffff',
            border: '2px solid #000000',
            marginBottom: '3rem'
          }}>
            <div style={{
              background: '#000000',
              color: '#ffffff',
              padding: '1.5rem 2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: '700',
                margin: '0',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                {selectedGenre === '전체' ? '전체 공연' : `${selectedGenre} 공연`}
              </h3>
              <span style={{
                color: '#cccccc',
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                총 {filteredPerformances.length}개
              </span>
            </div>
            
            <div style={{
              padding: '2rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '2rem'
            }}>
              {filteredPerformances.map((performance) => (
                <motion.div
                  key={performance.id}
                  style={{
                    border: '1px solid #e0e0e0',
                    display: 'block',
                    transition: 'all 0.3s ease',
                    background: '#ffffff'
                  }}
                  whileHover={{
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: performance.id * 0.1 }}
                >
                  {/* 이미지와 기본 정보는 공연정보로 연결 */}
                  <Link
                    to={`/performance-info?id=${performance.id}`}
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                      display: 'block'
                    }}
                  >
                    <div style={{
                      width: '100%',
                      height: '300px',
                      overflow: 'hidden'
                    }}>
                      <img
                        src={performance.image}
                        alt={performance.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      />
                    </div>
                    <div style={{ padding: '1.5rem 1.5rem 1rem 1.5rem' }}>
                      <div style={{
                        background: '#f0f0f0',
                        color: '#000000',
                        padding: '0.5rem 1rem',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        marginBottom: '1rem',
                        display: 'inline-block'
                      }}>
                        {performance.genre}
                      </div>
                      <h4 style={{
                        fontSize: '1.3rem',
                        fontWeight: '700',
                        margin: '0 0 0.5rem 0',
                        color: '#000000'
                      }}>{performance.title}</h4>
                      <p style={{
                        fontSize: '1rem',
                        color: '#666666',
                        margin: '0 0 1rem 0'
                      }}>{performance.subtitle}</p>
                      
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'auto 1fr',
                        gap: '0.5rem 1rem',
                        fontSize: '0.9rem'
                      }}>
                        <span style={{
                          color: '#999999',
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                          fontWeight: '600'
                        }}>장소</span>
                        <span style={{ color: '#000000' }}>{performance.venue}</span>
                        
                        <span style={{
                          color: '#999999',
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                          fontWeight: '600'
                        }}>기간</span>
                        <span style={{ color: '#000000' }}>{performance.period}</span>
                        
                        <span style={{
                          color: '#999999',
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                          fontWeight: '600'
                        }}>가격</span>
                        <span style={{ color: '#000000', fontWeight: '600' }}>{performance.price}</span>
                      </div>
                    </div>
                  </Link>
                  
                  {/* 예매하기 버튼은 별도로 예매 페이지로 연결 */}
                  <div style={{
                    padding: '0 1.5rem 1.5rem 1.5rem',
                    textAlign: 'center'
                  }}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        to={`/booking?id=${performance.id}`}
                        style={{
                          background: '#000000',
                          color: '#ffffff',
                          padding: '1rem 2rem',
                          fontSize: '0.9rem',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                          display: 'inline-block',
                          textDecoration: 'none',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#333333';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#000000';
                        }}
                      >
                        예매하기
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SmoothScroll>
  );
}