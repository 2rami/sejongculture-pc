import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import './SmoothScroll.css';

export default function SmoothScroll({
  children
}: {
  children: React.ReactNode;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  // 스크롤 진행률 가져오기
  const { scrollYProgress } = useScroll();
  
  // 부드러운 스프링 효과 적용
  const smoothProgress = useSpring(scrollYProgress, { 
    mass: 0.1,
    stiffness: 100,
    damping: 20
  });

  // Y축 변환 계산
  const y = useTransform(smoothProgress, value => {
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
  }, [contentRef, children]);

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
