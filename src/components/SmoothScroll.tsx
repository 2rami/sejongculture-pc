import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import '../styles/SmoothScroll.css';

export default function SmoothScroll({
  children
}: {
  children: React.ReactNode;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // 스크롤 진행률 가져오기
  const { scrollYProgress } = useScroll();
  
  // 부드러운 스프링 효과 적용 (준비된 후에만)
  const smoothProgress = useSpring(scrollYProgress, { 
    mass: 0.1,
    stiffness: 100,
    damping: 20
  });

  // Y축 변환 계산 (준비된 후에만)
  const y = useTransform(smoothProgress, value => {
    if (!isReady) return 0; // 준비되지 않았으면 원래 위치 유지
    return value * -(contentHeight - window.innerHeight);
  });

  // 윈도우 리사이즈 및 컨텐츠 높이 업데이트 핸들러
  useEffect(() => {
    const handleResize = () => {
      if (contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight);
      }
    };

    // 초기 높이 설정
    handleResize();

    // 리사이즈 이벤트 리스너 추가
    window.addEventListener("resize", handleResize);

    // cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [contentRef]);

  // Vercel 안전 초기화
  useEffect(() => {
    // 페이지 로드 완료 후 SmoothScroll 활성화
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 500); // 0.5초 지연으로 초기 스크롤 문제 방지

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* 스크롤바를 위한 보이지 않는 spacer */}
      <div style={{ height: contentHeight }} />
      
      {/* 실제 컨텐츠 컨테이너 */}
      <motion.div
        className="scrollBody"
        style={{ y }}
        ref={contentRef}
      >
        {children}
      </motion.div>
    </>
  );
}
