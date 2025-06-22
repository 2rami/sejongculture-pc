import { useLayoutEffect, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  // 렌더링 전에 스크롤 위치 설정
  useLayoutEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
  }, [pathname]);

  // 렌더링 후에도 추가 보장
  useEffect(() => {
    // 즉시 실행
    const scrollToTop = () => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollTo(0, 0);
    };
    
    scrollToTop();
    
    // 브라우저 렌더링 완료 후
    setTimeout(scrollToTop, 0);
    
    // 추가 백업
    setTimeout(scrollToTop, 50);
    setTimeout(scrollToTop, 100);
  }, [pathname]);

  return null;
}