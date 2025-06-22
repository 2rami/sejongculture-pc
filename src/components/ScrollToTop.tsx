import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // 페이지 변경 시에만 스크롤을 맨 위로
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}