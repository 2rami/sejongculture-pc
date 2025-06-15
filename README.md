# 🏛️ 세종문화회관 PC 웹사이트

세종문화회관 공식 웹사이트를 React + TypeScript로 구현한 프로젝트입니다.

![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-3178C6?style=flat-square&logo=typescript)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.17.0-0055FF?style=flat-square&logo=framer)

## ✨ 주요 기능

- 🎭 **공연/전시 정보** - 세종문화회관의 다양한 공연과 전시 정보
- 📅 **공연 일정** - 인터랙티브한 캘린더와 이벤트 스케줄
- 🏆 **예매 순위** - 인기 공연 랭킹 시스템
- 📰 **이벤트&소식** - 최신 소식과 공지사항
- 🔍 **통합 검색** - 모달 기반 검색 시스템
- 🎨 **부드러운 애니메이션** - Framer Motion 기반 UI/UX

## 🛠️ 기술 스택

### Frontend
- **React 19.1.0** - 메인 프레임워크
- **TypeScript 4.9.5** - 타입 안전성
- **Framer Motion 12.17.0** - 애니메이션 라이브러리
- **React Spring 10.0.1** - 추가 애니메이션 효과

### Development Tools
- **React Scripts 5.0.1** - 빌드 도구
- **ESLint & Prettier** - 코드 품질 관리

## 📁 프로젝트 구조

```
src/
├── components/           # React 컴포넌트
│   ├── Main.tsx         # 메인 페이지
│   ├── SearchModal.tsx  # 검색 모달
│   └── SmoothScroll.tsx # 부드러운 스크롤
├── assets/              # 정적 자원
│   ├── images/          # 이미지 파일들
│   ├── icons/           # 아이콘/로고들
│   └── index.ts         # assets export
├── styles/              # CSS 스타일
│   ├── Main.css
│   ├── SearchModal.css
│   └── SmoothScroll.css
├── App.tsx              # 메인 앱 컴포넌트
└── index.tsx            # 엔트리 포인트
```

## 🚀 시작하기

### 필수 요구사항
- Node.js 16.0.0 이상
- npm 또는 yarn

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/your-username/sejong-culture-pc.git
cd sejong-culture-pc

# 의존성 설치
npm install

# 개발 서버 시작
npm start
```

개발 서버가 실행되면 [http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.

## 📜 사용 가능한 스크립트

프로젝트 디렉토리에서 다음 명령어들을 실행할 수 있습니다:

### `npm start`
개발 모드로 앱을 실행합니다.  
브라우저에서 [http://localhost:3000](http://localhost:3000)으로 확인 가능합니다.

파일을 수정하면 페이지가 자동으로 새로고침됩니다.

### `npm run build`
프로덕션용으로 앱을 빌드합니다.  
`build` 폴더에 최적화된 파일들이 생성됩니다.

### `npm test`
테스트를 실행합니다.

### `npm run deploy`
GitHub Pages에 배포합니다.

## 🎨 주요 컴포넌트

### Main.tsx
- 메인 페이지의 모든 섹션을 포함
- 슬라이더, 캘린더, 랭킹, 뉴스 섹션
- 애니메이션과 인터랙션 효과

### SearchModal.tsx
- 검색 기능을 위한 모달 컴포넌트
- Framer Motion 애니메이션 적용
- 반응형 디자인

### SmoothScroll.tsx
- 부드러운 스크롤 효과 구현
- Framer Motion의 useScroll, useSpring 활용

## 🌟 주요 특징

- **반응형 디자인** - 다양한 화면 크기 지원
- **접근성** - 시맨틱 HTML과 ARIA 속성 적용
- **성능 최적화** - 코드 스플리팅과 지연 로딩
- **타입 안전성** - TypeScript로 런타임 오류 방지
- **현대적 UI/UX** - 최신 디자인 트렌드 적용

## 🔧 개발 가이드

### 코드 스타일
- TypeScript strict 모드 사용
- ESLint 규칙 준수
- 함수형 컴포넌트와 Hooks 사용

### 폴더 구조 규칙
- 컴포넌트는 `components/` 폴더에
- 스타일은 `styles/` 폴더에 분리
- 이미지는 `assets/images/`에 정리

## 📄 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 문의

프로젝트에 대한 질문이나 제안사항이 있으시면 Issue를 생성해주세요.

---

**세종문화회관**과 함께하는 문화예술의 디지털 경험 🎭✨
