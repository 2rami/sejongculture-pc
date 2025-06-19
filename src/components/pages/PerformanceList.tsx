import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import '../../styles/PerformanceList.css';
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
      title: "현대 미술 전시",
      subtitle: "Modern Art Exhibition",
      venue: "세종갤러리",
      period: "2025.06.01 - 2025.07.15",
      price: "일반 15,000원 / 학생 10,000원",
      genre: "전시",
      image: imageSrc25
    },
    {
      id: 4,
      title: "청춘 콘서트",
      subtitle: "Youth Concert",
      venue: "소극장",
      period: "2025.06.10 - 2025.06.15",
      price: "R석 45,000원 / S석 35,000원",
      genre: "콘서트",
      image: imageSrc26
    },
    {
      id: 5,
      title: "발레 백조의 호수",
      subtitle: "Swan Lake Ballet",
      venue: "세종대극장",
      period: "2025.06.20 - 2025.06.25",
      price: "VIP석 120,000원 / R석 90,000원",
      genre: "발레",
      image: imageSrc27
    },
    {
      id: 6,
      title: "재즈의 밤",
      subtitle: "Jazz Night",
      venue: "세종M홀",
      period: "2025.07.01 - 2025.07.03",
      price: "R석 55,000원 / S석 40,000원",
      genre: "재즈",
      image: imageSrc28
    },
    {
      id: 7,
      title: "오페라 라 트라비아타",
      subtitle: "La Traviata",
      venue: "세종대극장",
      period: "2025.07.10 - 2025.07.20",
      price: "VIP석 150,000원 / R석 100,000원",
      genre: "오페라",
      image: imageSrc4
    },
    {
      id: 8,
      title: "한국 전통 예술제",
      subtitle: "Korean Traditional Arts Festival",
      venue: "야외무대",
      period: "2025.08.01 - 2025.08.05",
      price: "일반 25,000원 / 학생 15,000원",
      genre: "전통예술",
      image: imageSrc6
    },
    {
      id: 9,
      title: "현대 무용 공연",
      subtitle: "Contemporary Dance",
      venue: "소극장",
      period: "2025.08.15 - 2025.08.20",
      price: "R석 50,000원 / S석 35,000원",
      genre: "무용",
      image: imageSrc9
    },
    {
      id: 10,
      title: "실험 연극",
      subtitle: "Experimental Theater",
      venue: "소극장",
      period: "2025.09.01 - 2025.09.10",
      price: "R석 40,000원 / S석 30,000원",
      genre: "연극",
      image: imageSrc14
    },
    {
      id: 11,
      title: "가을 음악회",
      subtitle: "Autumn Concert",
      venue: "세종M홀",
      period: "2025.09.15 - 2025.09.25",
      price: "R석 60,000원 / S석 45,000원",
      genre: "클래식",
      image: imageSrc15
    },
    {
      id: 12,
      title: "특별 기획전",
      subtitle: "Special Exhibition",
      venue: "세종갤러리",
      period: "2025.10.01 - 2025.11.30",
      price: "일반 20,000원 / 학생 12,000원",
      genre: "전시",
      image: imageSrc8
    }
  ];

  const genres = ['전체', '뮤지컬', '클래식', '전시', '콘서트', '발레', '재즈', '오페라', '전통예술', '무용', '연극'];

  const filteredPerformances = selectedGenre === '전체' 
    ? performances 
    : performances.filter(performance => performance.genre === selectedGenre);


  return (
    <>
      <Header />
      <div className="performance-list-page">
        <div className="page-container">
        <h1>공연/전시</h1>
        
        {/* 장르 필터 */}
        <div className="genre-filter">
          {genres.map(genre => (
            <button 
              key={genre}
              className={`genre-btn ${selectedGenre === genre ? 'active' : ''}`}
              onClick={() => setSelectedGenre(genre)}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* 공연 목록 */}
        <div className="performance-grid">
          {filteredPerformances.map(performance => (
            <div key={performance.id} className="performance-card">
              <Link to={`/performance-info?id=${performance.id}`} className="performance-card-link">
                <div className="performance-image-container">
                  <img 
                    src={performance.image} 
                    alt={performance.title} 
                    className="performance-image"
                  />
                  <div className="performance-overlay">
                    <div className="genre-tag">{performance.genre}</div>
                    <div 
                      className="book-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        window.location.href = `/booking?id=${performance.id}`;
                      }}
                    >
                      예매하기
                    </div>
                  </div>
                </div>
                <div className="performance-info">
                  <h3 className="performance-title">{performance.title}</h3>
                  <p className="performance-subtitle">{performance.subtitle}</p>
                  <div className="performance-details">
                    <p><span className="label">장소:</span> {performance.venue}</p>
                    <p><span className="label">기간:</span> {performance.period}</p>
                    <p><span className="label">가격:</span> {performance.price}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        </div>
      </div>
    </>
  );
}