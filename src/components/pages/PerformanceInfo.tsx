import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../Header';
import SmoothScroll from '../SmoothScroll';

// sub asset 이미지들 import
import sub1 from '../../assets/images/sub asset/sub1.jpg';
import sub2 from '../../assets/images/sub asset/sub2.jpg';
import sub3 from '../../assets/images/sub asset/sub3.jpg';
import sub4 from '../../assets/images/sub asset/sub4.jpeg';
import sub5 from '../../assets/images/sub asset/sub5.png';

// main 이미지들 import (홈에서 사용하는 이미지들)
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
  description: string;
  cast: string[];
  duration: string;
  rating: string;
}

export default function PerformanceInfo() {
  const [searchParams] = useSearchParams();
  const performanceId = searchParams.get('id') || '1';

  // 공연 데이터 (PerformanceList와 동일한 이미지 사용)
  const performances: { [key: string]: Performance } = {
    '1': {
      id: 1,
      title: "봄의 전설",
      subtitle: "Spring Legend",
      venue: "세종대극장",
      period: "2025년 5월 15일 ~ 6월 1일",
      price: "R석 80,000원 / S석 60,000원",
      genre: "뮤지컬",
      image: imageSrc7,
      description: "봄의 감동을 전하는 대형 뮤지컬입니다. 사랑과 희망의 메시지를 담은 감동적인 스토리와 웅장한 음악이 어우러진 작품으로, 관객들에게 잊지 못할 감동을 선사합니다.",
      cast: ["김민수", "이지혜", "박성호", "최유진"],
      duration: "2시간 30분 (인터미션 15분 포함)",
      rating: "12세 이상 관람가"
    },
    '2': {
      id: 2,
      title: "클래식 갈라 콘서트",
      subtitle: "Classic Gala Concert",
      venue: "세종M홀",
      period: "2025년 5월 20일 ~ 5월 22일",
      price: "VIP석 100,000원 / R석 70,000원",
      genre: "클래식",
      image: imageSrc8,
      description: "세계적인 연주자들과 함께하는 특별한 클래식 콘서트입니다. 베토벤, 모차르트, 차이콥스키의 명곡들을 한 자리에서 만나볼 수 있는 기회입니다.",
      cast: ["서울필하모닉오케스트라", "지휘자 정명훈", "피아니스트 조성진"],
      duration: "1시간 50분 (인터미션 20분 포함)",
      rating: "전 연령 관람가"
    },
    '3': {
      id: 3,
      title: "현대 미술 전시",
      subtitle: "Modern Art Exhibition",
      venue: "세종갤러리",
      period: "2025년 6월 1일 ~ 7월 15일",
      price: "일반 15,000원 / 학생 10,000원",
      genre: "전시",
      image: imageSrc25,
      description: "현대 미술의 흐름을 한눈에 볼 수 있는 특별 기획전입니다. 국내외 작가들의 다양한 작품을 통해 현대 예술의 새로운 지평을 경험해보세요.",
      cast: ["큐레이터 김예진", "작가 이동현", "작가 Sarah Kim"],
      duration: "상설 전시 (오전 10시 ~ 오후 6시)",
      rating: "전 연령 관람가"
    },
    '4': {
      id: 4,
      title: "청춘 콘서트",
      subtitle: "Youth Concert",
      venue: "소극장",
      period: "2025년 6월 10일 ~ 6월 15일",
      price: "R석 45,000원 / S석 35,000원",
      genre: "콘서트",
      image: imageSrc26,
      description: "젊은 아티스트들의 열정적인 무대를 만나보세요. 다양한 장르의 음악과 퍼포먼스가 어우러진 청춘 콘서트입니다.",
      cast: ["밴드 청춘", "가수 김태현", "댄스팀 Energy"],
      duration: "2시간 (인터미션 없음)",
      rating: "15세 이상 관람가"
    },
    '5': {
      id: 5,
      title: "발레 백조의 호수",
      subtitle: "Swan Lake Ballet",
      venue: "세종대극장",
      period: "2025년 6월 20일 ~ 6월 25일",
      price: "VIP석 120,000원 / R석 90,000원",
      genre: "발레",
      image: imageSrc27,
      description: "차이콥스키의 불멸의 명작 백조의 호수를 만나보세요. 국립발레단의 우아하고 완벽한 공연으로 클래식 발레의 진수를 경험할 수 있습니다.",
      cast: ["국립발레단", "주연 강수진", "주연 김지영"],
      duration: "2시간 45분 (인터미션 20분 포함)",
      rating: "7세 이상 관람가"
    },
    '6': {
      id: 6,
      title: "재즈의 밤",
      subtitle: "Jazz Night",
      venue: "세종M홀",
      period: "2025년 7월 1일 ~ 7월 3일",
      price: "R석 55,000원 / S석 40,000원",
      genre: "재즈",
      image: imageSrc28,
      description: "감미로운 재즈 선율이 흐르는 특별한 밤을 만나보세요. 국내외 최고의 재즈 뮤지션들이 선사하는 환상적인 무대입니다.",
      cast: ["재즈 트리오 블루문", "색소포니스트 김광민", "보컬리스트 나윤선"],
      duration: "2시간 (인터미션 15분 포함)",
      rating: "전 연령 관람가"
    },
    '7': {
      id: 7,
      title: "오페라 라 트라비아타",
      subtitle: "La Traviata",
      venue: "세종대극장",
      period: "2025년 7월 10일 ~ 7월 20일",
      price: "VIP석 150,000원 / R석 100,000원",
      genre: "오페라",
      image: imageSrc4,
      description: "베르디의 불멸의 명작 라 트라비아타를 만나보세요. 애절한 사랑 이야기와 아름다운 아리아가 어우러진 감동의 무대입니다.",
      cast: ["국립오페라단", "소프라노 조수미", "테너 이용훈"],
      duration: "3시간 (인터미션 20분 포함)",
      rating: "12세 이상 관람가"
    },
    '8': {
      id: 8,
      title: "한국 전통 예술제",
      subtitle: "Korean Traditional Arts Festival",
      venue: "야외무대",
      period: "2025년 8월 1일 ~ 8월 5일",
      price: "일반 25,000원 / 학생 15,000원",
      genre: "전통예술",
      image: imageSrc6,
      description: "우리나라 전통 예술의 아름다움을 한자리에서 만나보는 특별한 축제입니다. 국악, 무용, 연희가 어우러진 풍성한 무대를 경험해보세요.",
      cast: ["국립국악원", "한국무용단", "남사당패"],
      duration: "2시간 30분 (인터미션 20분 포함)",
      rating: "전 연령 관람가"
    },
    '9': {
      id: 9,
      title: "현대 무용 공연",
      subtitle: "Contemporary Dance",
      venue: "소극장",
      period: "2025년 8월 15일 ~ 8월 20일",
      price: "R석 50,000원 / S석 35,000원",
      genre: "무용",
      image: imageSrc9,
      description: "현대 무용의 새로운 가능성을 보여주는 실험적인 작품입니다. 몸짓으로 표현하는 감정의 깊이를 느껴보세요.",
      cast: ["현대무용단 모던", "안무가 김설진", "무용수 이현우"],
      duration: "1시간 45분 (인터미션 없음)",
      rating: "15세 이상 관람가"
    },
    '10': {
      id: 10,
      title: "실험 연극",
      subtitle: "Experimental Theater",
      venue: "소극장",
      period: "2025년 9월 1일 ~ 9월 10일",
      price: "R석 40,000원 / S석 30,000원",
      genre: "연극",
      image: imageSrc14,
      description: "기존의 연극 형식을 뛰어넘는 혁신적인 실험 연극입니다. 관객과 배우가 함께 만들어가는 새로운 형태의 무대예술을 경험해보세요.",
      cast: ["극단 실험실", "연출가 박진우", "배우 김소연"],
      duration: "1시간 30분 (인터미션 없음)",
      rating: "18세 이상 관람가"
    },
    '11': {
      id: 11,
      title: "가을 음악회",
      subtitle: "Autumn Concert",
      venue: "세종M홀",
      period: "2025년 9월 15일 ~ 9월 25일",
      price: "R석 60,000원 / S석 45,000원",
      genre: "클래식",
      image: imageSrc15,
      description: "가을의 정취를 담은 아름다운 클래식 음악회입니다. 계절의 변화를 음악으로 표현한 서정적인 무대를 선사합니다.",
      cast: ["코리안심포니오케스트라", "지휘자 임헌정", "바이올리니스트 김민"],
      duration: "1시간 55분 (인터미션 20분 포함)",
      rating: "전 연령 관람가"
    },
    '12': {
      id: 12,
      title: "특별 기획전",
      subtitle: "Special Exhibition",
      venue: "세종갤러리",
      period: "2025년 10월 1일 ~ 11월 30일",
      price: "일반 20,000원 / 학생 12,000원",
      genre: "전시",
      image: imageSrc8,
      description: "다양한 장르의 예술가들이 참여하는 특별 기획전입니다. 회화, 조각, 미디어아트가 어우러진 풍성한 전시를 만나보세요.",
      cast: ["큐레이터 이민정", "작가 박현수", "작가 최유리"],
      duration: "상설 전시 (오전 10시 ~ 오후 6시)",
      rating: "전 연령 관람가"
    },
    // 홈 슬라이더 공연들
    '101': {
      id: 101,
      title: "헤리티지 만찬",
      subtitle: "Heritage Dinner",
      venue: "세종대극장",
      period: "2025년 5월 7일 ~ 5월 9일",
      price: "R석 65,000원 / S석 45,000원",
      genre: "연극",
      image: imageSrc8,
      description: "국내 최고 셰프 최현석의  특별한 만찬을 즐길 수 있는 연극입니다. 서울시립합창단의 라이브 음악과 함께하는 이색적인 경험을 제공합니다.",
      cast: ["서울시립합창단", "셰프 최현석", "피아니스트 박미영"],
      duration: "1시간 40분 (인터미션 15분 포함)",
      rating: "전 연령 관람가"
    },
    '102': {
      id: 102,
      title: "봄의 전설",
      subtitle: "Legend of Spring",
      venue: "대극장",
      period: "2025년 4월 15일 ~ 4월 28일",
      price: "VIP석 120,000원 / R석 85,000원",
      genre: "뮤지컬",
      image: imageSrc7,
      description: "봄을 배경으로 한 감동적인 사랑 이야기를 그린 대형 뮤지컬입니다. 웅장한 무대와 아름다운 음악이 어우러진 작품입니다.",
      cast: ["김태우", "박혜진", "이민호", "정수연"],
      duration: "2시간 50분 (인터미션 20분 포함)",
      rating: "12세 이상 관람가"
    },
    '103': {
      id: 103,
      title: "청춘 콘서트",
      subtitle: "Youth Concert",
      venue: "소극장",
      period: "2025년 6월 1일 ~ 6월 15일",
      price: "R석 55,000원 / S석 40,000원",
      genre: "콘서트",
      image: imageSrc14,
      description: "젊은 세대를 위한 특별한 콘서트입니다. 다양한 장르의 음악과 트렌디한 퍼포먼스를 만나보세요.",
      cast: ["밴드 유스", "래퍼 DJ Max", "싱어송라이터 Luna"],
      duration: "2시간 10분 (인터미션 15분 포함)",
      rating: "15세 이상 관람가"
    },
    '104': {
      id: 104,
      title: "가을 음악회",
      subtitle: "Autumn Concert",
      venue: "세종아트센터",
      period: "2025년 9월 10일 ~ 9월 20일",
      price: "VIP석 90,000원 / R석 70,000원",
      genre: "클래식",
      image: imageSrc15,
      description: "가을의 정취를 담은 클래식 음악회입니다. 계절의 변화를 음악으로 표현한 아름다운 무대를 선사합니다.",
      cast: ["코리안심포니오케스트라", "지휘자 임헌정", "바이올리니스트 김민"],
      duration: "1시간 55분 (인터미션 20분 포함)",
      rating: "전 연령 관람가"
    },
    // 카드 섹션 공연들 (일부 샘플)
    '201': {
      id: 201,
      title: "2025 아뜰리에 광화 봄 전시",
      subtitle: "여명",
      venue: "야외전시",
      period: "2025년 5월 7일 ~ 5월 9일",
      price: "일반 20,000원 / 학생 15,000원",
      genre: "전시",
      image: imageSrc25,
      description: "새로운 시작을 알리는 봄 전시입니다. 다양한 작가들의 신선한 작품을 통해 희망의 메시지를 전합니다.",
      cast: ["큐레이터 김지연", "작가 이현수", "작가 박민정"],
      duration: "상설 전시 (오전 9시 ~ 오후 7시)",
      rating: "전 연령 관람가"
    },
    '202': {
      id: 202,
      title: "세종 클래식 콘서트",
      subtitle: "봄의 선율",
      venue: "대극장",
      period: "2025년 5월 14일 ~ 5월 16일",
      price: "VIP석 110,000원 / R석 80,000원",
      genre: "클래식",
      image: imageSrc26,
      description: "봄을 주제로 한 클래식 명곡들을 모은 특별한 콘서트입니다. 베토벤과 비발디의 명작들을 만나보세요.",
      cast: ["서울필하모닉오케스트라", "지휘자 정명훈", "솔리스트 조성진"],
      duration: "2시간 (인터미션 20분 포함)",
      rating: "전 연령 관람가"
    },
    '203': {
      id: 203,
      title: "청춘 뮤지컬",
      subtitle: "꿈을 향해",
      venue: "소극장",
      period: "2025년 5월 21일 ~ 5월 23일",
      price: "R석 70,000원 / S석 50,000원",
      genre: "뮤지컬",
      image: imageSrc27,
      description: "꿈을 향해 달려가는 청춘들의 이야기를 그린 감동적인 뮤지컬입니다. 젊은 에너지가 가득한 무대를 경험해보세요.",
      cast: ["김유진", "이서준", "박다은", "최민수"],
      duration: "2시간 20분 (인터미션 15분 포함)",
      rating: "12세 이상 관람가"
    },
    '204': {
      id: 204,
      title: "오케스트라 공연",
      subtitle: "환상",
      venue: "세종M홀",
      period: "2025년 5월 28일 ~ 5월 30일",
      price: "VIP석 95,000원 / R석 75,000원",
      genre: "클래식",
      image: imageSrc28,
      description: "환상적인 오케스트라 연주를 통해 클래식 음악의 진수를 느껴보세요. 웅장하고 아름다운 선율이 여러분을 매혹시킬 것입니다.",
      cast: ["KBS교향악단", "지휘자 임헌정", "첼리스트 장한나"],
      duration: "1시간 50분 (인터미션 15분 포함)",
      rating: "전 연령 관람가"
    },
    // 랭킹 섹션 공연들
    '301': {
      id: 301,
      title: "동양미래특급",
      subtitle: "환상적인 공연",
      venue: "세종대극장",
      period: "2025년 5월 15일 ~ 6월 1일",
      price: "VIP석 200,000원 / R석 150,000원",
      genre: "뮤지컬",
      image: imageSrc4,
      description: "미래를 배경으로 한 스펙터클한 뮤지컬입니다. 첨단 기술과 전통적인 스토리텔링이 만나 관객들에게 새로운 감동을 선사합니다. 압도적인 무대와 뛰어난 퍼포먼스로 예매 1위를 차지한 화제의 작품입니다.",
      cast: ["김태현", "이수연", "박민우", "정다은"],
      duration: "3시간 (인터미션 20분 포함)",
      rating: "15세 이상 관람가"
    },
    '302': {
      id: 302,
      title: "봄의 전설",
      subtitle: "감동의 무대",
      venue: "세종M홀",
      period: "2025년 5월 20일 ~ 6월 5일",
      price: "VIP석 180,000원 / R석 130,000원",
      genre: "뮤지컬",
      image: imageSrc6,
      description: "봄을 배경으로 펼쳐지는 아름다운 사랑 이야기입니다. 서정적인 멜로디와 감동적인 스토리로 많은 관객들의 사랑을 받고 있는 작품입니다. 예매 순위 2위를 기록하며 꾸준한 인기를 유지하고 있습니다.",
      cast: ["송지훈", "김하나", "이준혁", "박소영"],
      duration: "2시간 40분 (인터미션 20분 포함)",
      rating: "12세 이상 관람가"
    },
    '303': {
      id: 303,
      title: "청춘 콘서트",
      subtitle: "젊음의 열정",
      venue: "소극장",
      period: "2025년 6월 1일 ~ 6월 15일",
      price: "R석 80,000원 / S석 60,000원",
      genre: "콘서트",
      image: imageSrc7,
      description: "젊은 아티스트들이 선사하는 에너지 넘치는 콘서트입니다. 다양한 장르의 음악과 무대 퍼포먼스가 어우러져 젊은 세대들에게 큰 호응을 얻고 있습니다. 예매 순위 3위의 인기 공연입니다.",
      cast: ["밴드 블루스카이", "래퍼 MC Storm", "댄스팀 Velocity"],
      duration: "2시간 30분 (인터미션 15분 포함)",
      rating: "15세 이상 관람가"
    },
    '304': {
      id: 304,
      title: "해리포터와 혼혈왕자 음악회",
      subtitle: "마법의 선율",
      venue: "야외무대",
      period: "2025년 6월 10일 ~ 6월 25일",
      price: "VIP석 120,000원 / R석 90,000원 / S석 70,000원",
      genre: "영화 콘서트",
      image: imageSrc9,
      description: "해리포터와 혼혈왕자 영화를 야외 대형 스크린으로 상영하며 오케스트라가 실시간으로 연주하는 마법 같은 음악회입니다. 별빛 아래에서 펼쳐지는 마법 세계의 감동을 경험해보세요. 예매 순위 4위를 기록한 인기 공연입니다.",
      cast: ["서울시립교향악단", "지휘자 박현수", "특별 출연 어린이 합창단"],
      duration: "2시간 30분 (인터미션 20분 포함)",
      rating: "전 연령 관람가"
    }
  };

  const currentPerformance = performances[performanceId] || performances['1'];

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
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '4rem',
              marginBottom: '4rem'
            }}
            variants={itemVariants}
          >
            <motion.div
              style={{
                position: 'relative',
                height: '600px',
                overflow: 'hidden'
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={currentPerformance.image}
                alt={currentPerformance.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </motion.div>
            
            <motion.div style={{ padding: '2rem 0' }} variants={itemVariants}>
              <motion.div
                style={{
                  background: '#f0f0f0',
                  color: '#000000',
                  padding: '0.5rem 1.5rem',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  marginBottom: '2rem',
                  display: 'inline-block'
                }}
                whileHover={{ background: '#000000', color: '#ffffff' }}
                transition={{ duration: 0.3 }}
              >
                {currentPerformance.genre}
              </motion.div>
              
              <motion.h1
                style={{
                  fontSize: '3rem',
                  fontWeight: '700',
                  margin: '0 0 1rem 0',
                  color: '#000000',
                  textTransform: 'uppercase',
                  letterSpacing: '2px'
                }}
                variants={itemVariants}
              >
                {currentPerformance.title}
              </motion.h1>
              
              <motion.p
                style={{
                  fontSize: '1.3rem',
                  color: '#666666',
                  margin: '0 0 3rem 0',
                  fontWeight: '400'
                }}
                variants={itemVariants}
              >
                {currentPerformance.subtitle}
              </motion.p>
              
              <motion.div style={{ marginBottom: '3rem' }} variants={itemVariants}>
                {[
                  { label: '장소', value: currentPerformance.venue },
                  { label: '기간', value: currentPerformance.period },
                  { label: '가격', value: currentPerformance.price },
                  { label: '공연시간', value: currentPerformance.duration },
                  { label: '관람등급', value: currentPerformance.rating }
                ].map((detail, index) => (
                  <motion.div
                    key={index}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '120px 1fr',
                      gap: '1rem',
                      padding: '1rem 0',
                      borderBottom: '1px solid #e0e0e0'
                    }}
                    whileHover={{ backgroundColor: '#f8f8f8' }}
                    transition={{ duration: 0.2 }}
                  >
                    <span style={{
                      color: '#999999',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      fontWeight: '600',
                      fontSize: '0.9rem'
                    }}>
                      {detail.label}
                    </span>
                    <span style={{
                      color: '#000000',
                      fontWeight: '600'
                    }}>
                      {detail.value}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to={`/booking?id=${currentPerformance.id}`}
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
                  예매하기
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div
            style={{
              background: '#ffffff',
              border: '2px solid #000000',
              marginBottom: '3rem'
            }}
            variants={itemVariants}
          >
            <div style={{
              background: '#000000',
              color: '#ffffff',
              padding: '1.5rem 2rem'
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                margin: '0',
                textTransform: 'uppercase',
                letterSpacing: '2px'
              }}>
                공연 소개
              </h2>
            </div>
            <div style={{ padding: '2rem' }}>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: '1.8',
                color: '#333333',
                margin: '0'
              }}>
                {currentPerformance.description}
              </p>
            </div>
          </motion.div>
          
          <motion.div
            style={{
              background: '#ffffff',
              border: '2px solid #000000',
              marginBottom: '3rem'
            }}
            variants={itemVariants}
          >
            <div style={{
              background: '#000000',
              color: '#ffffff',
              padding: '1.5rem 2rem'
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                margin: '0',
                textTransform: 'uppercase',
                letterSpacing: '2px'
              }}>
                출연진 / 스태프
              </h2>
            </div>
            <div style={{
              padding: '2rem',
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              {currentPerformance.cast.map((member, index) => (
                <motion.span
                  key={index}
                  style={{
                    background: '#f0f0f0',
                    color: '#000000',
                    padding: '0.8rem 1.5rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}
                  whileHover={{
                    background: '#000000',
                    color: '#ffffff',
                    scale: 1.05
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {member}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </SmoothScroll>
  );
}