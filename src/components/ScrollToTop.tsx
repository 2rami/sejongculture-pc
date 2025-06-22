import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 즉시 스크롤
    window.scrollTo(0, 0);
    
    // 추가적으로 브라우저 렌더링이 완료된 후에도 스크롤
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
    
    // 더 강력한 백업으로 약간의 지연 후에도 스크롤
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }, [pathname]);

  return null;
}