import React, { useState, useEffect, useRef } from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from '../assets/icons/loadingani.json';
import textLogo from '../assets/icons/text-logo.svg';
import '../styles/LoadingAnimation.css';

interface LoadingAnimationProps {
  onComplete?: () => void;
  size?: number;
  className?: string;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ 
  onComplete,
  size = 200, 
  className = '' 
}) => {
  const [progress, setProgress] = useState(0);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [showRipple, setShowRipple] = useState(false);
  const [showFullBuilding, setShowFullBuilding] = useState(false);
  const [animationPhase, setAnimationPhase] = useState<'single' | 'group' | 'complete'>('single');

  // 디버깅: 애니메이션 데이터 확인
  console.log('Loading animation data:', loadingAnimation);
  console.log('Animation has layers:', loadingAnimation?.layers?.length);

  useEffect(() => {
    // 퍼센트 올라가는 애니메이션과 단계 관리
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 3 + 1.5; // 더 빠르게
        
        // 단계별 애니메이션 전환 - 4단계로 세분화
        if (newProgress >= 30 && animationPhase === 'single') {
          setAnimationPhase('group'); // 3개 합쳐지는 단계
        } else if (newProgress >= 70 && animationPhase === 'group') {
          setAnimationPhase('complete'); // 지붕 내려오면서 바로 축소
        }
        
        if (newProgress >= 100) {
          clearInterval(interval);
          // 100% 되면 완전한 건물 표시
          setShowFullBuilding(true);
          setTimeout(() => {
            setShowRipple(true);
            // 잔상 효과 후 완료
            setTimeout(() => {
              setLoadingComplete(true);
              onComplete?.();
            }, 1500);
          }, 800);
          return 100;
        }
        return newProgress;
      });
    }, 100); // 더 빠르게

    return () => clearInterval(interval);
  }, [onComplete, animationPhase]);

  // 로티 애니메이션 완료 로그
  useEffect(() => {
    if (showFullBuilding) {
      console.log('Building complete animation started');
    }
  }, [showFullBuilding]);

  // lottie-react에서는 speed prop이 없으므로 CSS animation으로 제어
  const getLottieAnimationDuration = () => {
    switch (animationPhase) {
      case 'single': return '8s'; // 기둥 하나씩 느리게
      case 'group': return '5s'; // 3개 합쳐질 때 중간 속도  
      case 'complete': return '3s'; // 지붕 내려올 때 빠르게
      default: return '6s';
    }
  };

  // 단계별 애니메이션 스타일
  const getAnimationStyle = () => {
    if (showFullBuilding) {
      return {
        height: '60vh',
        width: '80vw',
        maxWidth: '600px',
        maxHeight: '400px',
        transform: 'scale(1) translate(0, 0)',
        transformOrigin: 'center center',
        transition: 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
      };
    }

    switch (animationPhase) {
      case 'single':
        return {
          height: '100vh',
          width: '100vw',
          transform: `scale(8) translate(-15vw, 0vh)`, // 기둥 하나 가로로 중앙에 보이게 조정
          transformOrigin: 'center center',
          transition: 'transform 1s ease-out'
        };
      case 'group':
        return {
          height: '100vh',
          width: '100vw',
          transform: `scale(6) translate(10vw, -5vh)`, // 3개 기둥 오른쪽 부분 확대
          transformOrigin: 'center center',
          transition: 'transform 1s ease-out'
        };
      case 'complete':
        return {
          height: '100vh',
          width: '100vw',
          transform: `scale(2.5) translate(0, -5vh)`, // 지붕 포함 전체가 보이도록 스케일 축소
          transformOrigin: 'center center',
          transition: 'transform 1s ease-out'
        };
      default:
        return {
          height: '100vh',
          width: '100vw',
          transform: 'scale(6) translate(0, -10vh)',
          transformOrigin: 'center center'
        };
    }
  };

  if (loadingComplete) return null;

  return (
    <div className={`loading-fullscreen ${className}`}>
      {/* 로딩 중에는 로티 기둥들 확대, 100%에서 전체 건물 중앙에 표시 */}
      <div className="fullscreen-lottie-container">
        {showRipple && <div className="ripple-effect"></div>}
        
        {animationPhase === 'single' ? (
          // 처음 단계에서는 검정 가로 직사각형 표시
          <div className="black-rectangle-container">
            <div className="black-rectangle"></div>
          </div>
        ) : loadingAnimation && loadingAnimation.layers ? (
          <div className={`lottie-animation-wrapper ${showFullBuilding ? 'complete-view' : `phase-${animationPhase}`}`}>
            <Lottie
              animationData={loadingAnimation}
              loop={false}
              style={getAnimationStyle()}
              className={`loading-animation-lottie ${showFullBuilding ? 'complete' : `phase-${animationPhase}`}`}
            />
          </div>
        ) : (
          <div style={{
            width: '100vw',
            height: '100vh',
            background: '#f9f9f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            color: '#666'
          }}>
            세종문화회관 로딩 중...
          </div>
        )}
      </div>

      {/* 퍼센트 표시 */}
      <div className="loading-progress">
        <div className="progress-text">
          {Math.round(progress)}%
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 로딩 로고 */}
      <div className="loading-logo">
        <img 
          src={textLogo} 
          alt="세종문화회관" 
          className="loading-logo-image"
        />
      </div>
    </div>
  );
};

export default LoadingAnimation;