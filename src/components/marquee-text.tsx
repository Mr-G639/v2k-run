import React, { useRef, useState, useLayoutEffect, CSSProperties } from 'react';

interface MarqueeTextProps {
  text: string;
  className?: string;
}

const PIXELS_PER_SECOND = 40;

const MarqueeText: React.FC<MarqueeTextProps> = ({ text, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  
  // --- THAY ĐỔI Ở ĐÂY ---
  // Cho phép state animationStyle chấp nhận các thuộc tính CSS tùy chỉnh (bắt đầu bằng --)
  const [animationStyle, setAnimationStyle] = useState<CSSProperties & { [key: string]: any }>({});

  useLayoutEffect(() => {
    if (containerRef.current && textRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const textWidth = textRef.current.offsetWidth;
      const overflow = textWidth > containerWidth;

      setIsOverflowing(overflow);

      if (overflow) {
        const duration = textWidth / PIXELS_PER_SECOND;
        setAnimationStyle({
          '--marquee-duration': `${duration}s`,
          '--marquee-start-position': `${containerWidth}px`,
          '--marquee-end-position': `-${textWidth}px`,
          animation: `marquee-dynamic var(--marquee-duration) linear infinite`,
        });
      } else {
        setAnimationStyle({});
      }
    }
  }, [text]);

  return (
    <div ref={containerRef} className={`marquee-container ${className || ''}`}>
      <span ref={textRef} style={animationStyle} className={isOverflowing ? 'marquee-content' : ''}>
        {text}
      </span>
    </div>
  );
};

export default MarqueeText;