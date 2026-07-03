'use client';

import { useEffect, useRef, ReactNode, CSSProperties, useCallback } from 'react';

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

  const handleParallax = useCallback(() => {
    const el = ref.current;
    if (!el || !parallax) return;

    const rect = el.getBoundingClientRect();
    const windowH = window.innerHeight;
    const center = rect.top + rect.height / 2;
    const offset = (center - windowH / 2) * parallaxSpeed;

    el.style.setProperty('--parallax-y', `${offset}px`);
  }, [parallax, parallaxSpeed]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!parallax) return;

    window.addEventListener('scroll', handleParallax, { passive: true });
    handleParallax();
    return () => window.removeEventListener('scroll', handleParallax);
  }, [parallax, handleParallax]);

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
