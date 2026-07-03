'use client';

import { useEffect, useRef, ReactNode, CSSProperties } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: 0 | 1 | 2 | 3 | 4 | 5;
  className?: string;
  style?: CSSProperties;
  as?: React.ElementType;
  from?: 'bottom' | 'left' | 'right';
  parallax?: boolean;
  parallaxSpeed?: number;
}

export default function ScrollReveal({
  children,
  delay = 0,
  className = '',
  style,
  as: Tag = 'div',
  from = 'bottom',
  parallax = false,
  parallaxSpeed = 0.08,
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let isIntersecting = false;
    let rAFId: number | null = null;

    // Reveal Observer
    const revealObserver = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );

    revealObserver.observe(el);

    // Parallax update function
    const onScroll = () => {
      if (!isIntersecting || !parallax) return;

      if (rAFId) return;

      rAFId = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const windowH = window.innerHeight;
        const center = rect.top + rect.height / 2;
        const offset = (center - windowH / 2) * parallaxSpeed;
        
        el.style.setProperty('--parallax-y', `${offset}px`);
        rAFId = null;
      });
    };

    if (parallax) {
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    return () => {
      revealObserver.disconnect();
      if (parallax) {
        window.removeEventListener('scroll', onScroll);
      }
      if (rAFId) {
        cancelAnimationFrame(rAFId);
      }
    };
  }, [parallax, parallaxSpeed]);

  const delayClass = delay > 0 ? ` reveal-delay-${delay}` : '';
  const dirClass = from !== 'bottom' ? ` reveal--from-${from}` : '';
  const parallaxClass = parallax ? ' reveal--parallax' : '';

  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      className={`reveal${delayClass}${dirClass}${parallaxClass} ${className}`}
      style={style}
    >
      {children}
    </Tag>
  );
}
