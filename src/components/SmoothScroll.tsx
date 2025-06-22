import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({
  children
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Vercel 안전 초기화 - 로딩 완료 후 지연 시작
    const timer = setTimeout(() => {
      // Lenis 인스턴스 생성 (기본 설정)
      lenisRef.current = new Lenis({
        duration: 1.2,          // 스크롤 지속 시간
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // 부드러운 easing
      });

      // 스크롤 이벤트 처리
      function raf(time: number) {
        lenisRef.current?.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }, 1000); // 1초 지연으로 로딩 완료 보장

    // cleanup
    return () => {
      clearTimeout(timer);
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
    };
  }, []);

  return <div>{children}</div>;
}
