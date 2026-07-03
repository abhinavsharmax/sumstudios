'use client';

import { useEffect, useState } from 'react';

export default function ScrollToTop() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      // Calculate total scrollable height
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (docHeight > 0) {
        const pct = Math.min(100, Math.max(0, (scrolled / docHeight) * 100));
        setProgress(pct);
      }
      
      // Visible after scrolling 300px
      setVisible(scrolled > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Circumference for r=18 is 2 * pi * 18 = 113.097
  const circumference = 113.097;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <button
      className={`scroll-to-top ${visible ? 'scroll-to-top--visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <svg className="scroll-to-top__circle" width="44" height="44" viewBox="0 0 44 44">
        {/* Track circle */}
        <circle
          className="scroll-to-top__circle-track"
          cx="22"
          cy="22"
          r="18"
          strokeWidth="2"
          fill="none"
        />
        {/* Progress circle */}
        <circle
          className="scroll-to-top__circle-progress"
          cx="22"
          cy="22"
          r="18"
          strokeWidth="2"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 22 22)"
        />
      </svg>
      <span className="scroll-to-top__icon">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="19" x2="12" y2="5"></line>
          <polyline points="5 12 12 5 19 12"></polyline>
        </svg>
      </span>
    </button>
  );
}
