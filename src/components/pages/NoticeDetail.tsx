import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '../Header';
import '../../styles/NoticeDetail.css';

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

**주요 개선사항**
- 전면적인 조경 공사로 더욱 아름다운 야외 공간 조성
- 편의시설 확충 (휴게 공간, 카페테리아 신설)
- 무료 Wi-Fi 설치로 디지털 편의성 향상
- LED 조명 설치로 야간에도 안전한 환경 조성
- 장애인 접근성 개선을 위한 무장애 시설 확충

**운영 시간**
- 평일: 오전 9시 ~ 오후 10시
- 주말 및 공휴일: 오전 8시 ~ 오후 11시

**특별 이벤트**
리뉴얼 기념으로 5월 20일부터 한 달간 다양한 문화 행사가 준비되어 있습니다:
- 5월 20일 오후 7시: 개관식 및 축하 공연
- 매주 토요일 오후 2시: 야외 음악회
- 매주 일요일 오전 10시: 가족 참여 프로그램

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

**할인 혜택**
- 전체 공연 20% 할인 (일부 특별 공연 제외)
- 온라인 예매 시 추가 5% 할인
- 세종문화회관 멤버십 회원 추가 5% 할인

**할인 대상 공연**
- 뮤지컬 "봄의 전설"
- 클래식 갈라 콘서트
- 발레 "백조의 호수"
- 재즈 콘서트
- 청춘 뮤지컬

**예매 방법**
1. 세종문화회관 공식 홈페이지 접속
2. 원하는 공연 선택
3. 예매 시 할인 코드 'JUNE2025' 입력
4. 추가 할인 혜택 자동 적용

**주의사항**
- 할인 혜택은 중복 적용되지 않습니다
- 일부 VIP석은 할인 대상에서 제외됩니다
- 환불 시 할인된 금액을 기준으로 처리됩니다

이 기회를 놓치지 마시고 사랑하는 사람과 함께 감동적인 공연을 관람하세요!`,
      isImportant: true
    },
    '3': {
      id: 3,
      title: "갤러리 투어 참여자 모집",
      date: "2025.05.03",
      category: "참여모집",
      content: "세종갤러리에서 진행되는 특별 기획전 '현대미술의 흐름' 전시 해설 투어에 참여하실 분들을 모집합니다.",
      fullContent: `세종갤러리에서 진행되는 특별 기획전 '현대미술의 흐름' 전시 해설 투어에 참여하실 분들을 모집합니다.

**전시 개요**
- 전시명: 현대미술의 흐름
- 기간: 2025년 6월 1일 ~ 7월 15일
- 장소: 세종갤러리 1, 2전시실
- 참여 작가: 국내외 현대미술 작가 25명

**투어 프로그램**
- 해설 투어: 매주 화, 목, 토요일 오후 2시
- 소요 시간: 약 90분
- 정원: 회차당 20명
- 참가비: 무료 (전시 입장료 별도)

**신청 방법**
1. 세종문화회관 홈페이지 온라인 신청
2. 전화 신청: 02-399-1000
3. 현장 접수 (당일 선착순)

**해설사 소개**
전문 큐레이터 김예진과 함께하는 상세한 작품 해설을 들으며 깊이 있는 예술 감상의 시간을 가져보세요.

**특별 혜택**
- 투어 참여자 대상 작가와의 만남 우선 예약
- 전시 도록 10% 할인
- 다음 전시 초대권 증정

많은 관심과 참여 부탁드립니다.`,
      isImportant: false
    },
    '4': {
      id: 4,
      title: "클래식 콘서트 선공개",
      date: "2025.05.16",
      category: "공연안내",
      content: "오는 7월에 열릴 세종 클래식 시리즈의 라인업을 미리 공개합니다.",
      fullContent: `오는 7월에 열릴 세종 클래식 시리즈의 라인업을 미리 공개합니다.

**세종 클래식 시리즈 2025**

**7월 5일 (토) 오후 7시 30분**
- 공연명: 베토벤 교향곡 9번 "합창"
- 연주: 서울필하모닉오케스트라
- 지휘: 정명훈
- 협연: 소프라노 조수미, 메조소프라노 양송화, 테너 김우경, 베이스 사무엘 윤

**7월 12일 (토) 오후 7시 30분**
- 공연명: 차이콥스키 피아노 협주곡 1번
- 연주: KBS교향악단
- 지휘: 임헌정
- 협연: 피아니스트 조성진

**7월 19일 (토) 오후 7시 30분**
- 공연명: 드보르작 신세계 교향곡
- 연주: 수원시립교향악단
- 지휘: 김대진

**시즌 티켓 예매**
- 예매 시작: 6월 1일 오전 10시
- 시즌권 혜택: 개별 구매 대비 30% 할인
- 좌석 등급별 가격: VIP 450,000원 / R석 350,000원 / S석 250,000원

세계적인 연주자들과 함께하는 특별한 무대를 기대해 주세요!`,
      isImportant: false
    },
    '5': {
      id: 5,
      title: "여름 프로그램 안내",
      date: "2025.05.03",
      category: "공연안내",
      content: "무더운 여름을 시원하게 만들어 줄 다양한 공연들이 준비되어 있습니다.",
      fullContent: `무더운 여름을 시원하게 만들어 줄 다양한 공연들이 준비되어 있습니다.

**여름 특별 프로그램 2025**

**가족 뮤지컬**
- 7월 1일 ~ 8월 15일
- 어린이와 가족이 함께 즐길 수 있는 감동적인 뮤지컬
- 매주 토일 오후 2시, 5시 공연

**청춘 콘서트 시리즈**
- 7월 매주 금요일 오후 8시
- 젊은 아티스트들의 열정적인 무대
- 다양한 장르의 음악과 퍼포먼스

**야외 음악회**
- 8월 매주 토요일 오후 7시
- 세종문화회관 야외무대에서 진행
- 무료 관람 (선착순 500명)

**여름 문화교실**
- 7월 ~ 8월 매주 화수목
- 어린이부터 성인까지 참여 가능한 문화예술 체험 프로그램
- 수강료: 50,000원 (4주 과정)

**특별 할인 혜택**
- 여름 프로그램 패키지 구매 시 20% 할인
- 학생 및 경로 우대 30% 할인
- 가족 패키지 (4인 이상) 25% 할인

모든 연령대가 즐길 수 있는 풍성한 프로그램으로 여러분을 찾아갑니다!`,
      isImportant: false
    }
  };

  const currentNotice = noticeDetails[noticeId] || noticeDetails['1'];

  return (
    <>
      <Header />
      <div className="notice-detail-page">
        <div className="page-container">
          {/* 브레드크럼 네비게이션 */}
          <div className="breadcrumb">
            <Link to="/" className="breadcrumb-link">홈</Link>
            <span className="breadcrumb-separator">&gt;</span>
            <Link to="/notice" className="breadcrumb-link">공지사항</Link>
            <span className="breadcrumb-separator">&gt;</span>
            <span className="breadcrumb-current">{currentNotice.title}</span>
          </div>

          {/* 공지사항 헤더 */}
          <div className="notice-detail-header">
            {currentNotice.isImportant && <span className="important-badge">중요</span>}
            <span className="category-badge">{currentNotice.category}</span>
            <h1>{currentNotice.title}</h1>
            <div className="notice-meta">
              <span className="notice-date">{currentNotice.date}</span>
            </div>
          </div>

          {/* 공지사항 내용 */}
          <div className="notice-detail-content">
            <div className="content-text">
              {currentNotice.fullContent.split('\n').map((line, index) => {
                if (line.startsWith('**') && line.endsWith('**')) {
                  return <h3 key={index} className="content-subtitle">{line.replace(/\*\*/g, '')}</h3>;
                } else if (line.startsWith('- ')) {
                  return <li key={index} className="content-list-item">{line.substring(2)}</li>;
                } else if (line.trim() === '') {
                  return <br key={index} />;
                } else {
                  return <p key={index} className="content-paragraph">{line}</p>;
                }
              })}
            </div>
          </div>

          {/* 하단 네비게이션 */}
          <div className="notice-detail-navigation">
            <Link to="/notice" className="back-to-list-btn">
              목록으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}