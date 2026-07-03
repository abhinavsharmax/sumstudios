'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import SvgWordmark from './SvgWordmark';
import Link from 'next/link';

export default function HeroParallax() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const sectionHeight = section.offsetHeight;
    const viewportHeight = window.innerHeight;

    // scrollProgress: 0 at top, 1 when sticky viewport scrolls out
    const scrolled = -rect.top;
    const totalScroll = sectionHeight - viewportHeight;
    const progress = Math.min(1, Math.max(0, scrolled / totalScroll));

    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Derived animation values
  const bgScale = 1.15 - scrollProgress * 0.15; // 1.15 → 1.0
  const bgY = scrollProgress * -80; // parallax shift up
  const fogOpacity = 1 - scrollProgress * 0.8;
  const fogY = scrollProgress * -120;
  const fog2Y = scrollProgress * -60;
  const wordmarkScale = 0.6 + scrollProgress * 0.4; // 0.6 → 1.0
  const wordmarkOpacity = Math.min(1, scrollProgress * 2.5);
  const contentOpacity = Math.min(1, Math.max(0, (scrollProgress - 0.35) / 0.3));
  const contentY = 60 - scrollProgress * 90; // slides up
  const overlayOpacity = 0.15 + scrollProgress * 0.45;

  // Parallax layers move at different speeds
  const layer1Y = scrollProgress * -40;
  const layer2Y = scrollProgress * -100;

  return (
    <section
      ref={sectionRef}
      className="hero-parallax"
      aria-label="Hero section"
    >
      {/* Sticky viewport — stays fixed while parent scrolls */}
      <div className="hero-parallax__viewport">
        {/* Layer 1: Background image */}
        <div
          className="hero-parallax__bg"
          style={{
            transform: `scale(${bgScale}) translateY(${bgY}px)`,
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=1920&auto=format&fit=crop&q=85"
            alt="Architectural pavilion"
            loading="eager"
            className="hero-parallax__bg-img"
          />
        </div>

        {/* Layer 2: Dark gradient overlay */}
        <div
          className="hero-parallax__overlay"
          style={{ opacity: overlayOpacity }}
        />

        {/* Layer 3: Atmospheric fog — bottom */}
        <div
          className="hero-parallax__fog hero-parallax__fog--bottom"
          style={{
            opacity: fogOpacity,
            transform: `translateY(${fogY}px)`,
          }}
        />

        {/* Layer 4: Secondary fog — mid */}
        <div
          className="hero-parallax__fog hero-parallax__fog--mid"
          style={{
            opacity: fogOpacity * 0.6,
            transform: `translateY(${fog2Y}px)`,
          }}
        />

        {/* Layer 5: Architectural line SVG decorations */}
        <div
          className="hero-parallax__lines"
          style={{
            transform: `translateY(${layer1Y}px)`,
            opacity: 0.08 + scrollProgress * 0.12,
          }}
        >
          <svg viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg" className="hero-parallax__lines-svg">
            {/* Horizontal construction lines */}
            <line x1="0" y1="540" x2="1920" y2="540" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
            <line x1="0" y1="360" x2="1920" y2="360" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
            <line x1="0" y1="720" x2="1920" y2="720" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
            {/* Vertical guides */}
            <line x1="960" y1="0" x2="960" y2="1080" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
            <line x1="480" y1="0" x2="480" y2="1080" stroke="currentColor" strokeWidth="0.5" opacity="0.08" />
            <line x1="1440" y1="0" x2="1440" y2="1080" stroke="currentColor" strokeWidth="0.5" opacity="0.08" />
            {/* Diagonal accent */}
            <line x1="0" y1="1080" x2="960" y2="0" stroke="currentColor" strokeWidth="0.3" opacity="0.06" />
            <line x1="960" y1="1080" x2="1920" y2="0" stroke="currentColor" strokeWidth="0.3" opacity="0.06" />
          </svg>
        </div>

        {/* Layer 6: Large SVG Wordmark */}
        <div
          className="hero-parallax__wordmark"
          style={{
            transform: `translateY(${layer2Y}px) scale(${wordmarkScale})`,
            opacity: wordmarkOpacity,
          }}
        >
          <SvgWordmark progress={scrollProgress} />
        </div>

        {/* Layer 7: Content — headline, subtitle, CTA */}
        <div
          className="hero-parallax__content"
          style={{
            opacity: contentOpacity,
            transform: `translateY(${contentY}px)`,
          }}
        >
          <div className="hero-parallax__content-inner">
            <p className="hero-parallax__eyebrow">
              Architecture · Interiors · Objects
            </p>
            <h1 className="hero-parallax__title">
              Spaces That <span className="em">Shape Living</span>
            </h1>
            <p className="hero-parallax__subtitle">
              A studio where innovative solutions and considered execution converge.{' '}
              <span className="em">Committed to function, aesthetic, coherence, and joy.</span>
            </p>
            <div className="hero-parallax__actions">
              <Link href="/projects" className="btn-pill btn-pill--primary">
                <span className="btn-pill__text" data-text="Explore Projects">
                  Explore Projects
                </span>
                <span className="btn-pill__icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.78 12.53l-6.75 6.75a.75.75 0 11-1.06-1.06l5.47-5.47H3.75a.75.75 0 110-1.5h14.69l-5.47-5.47a.75.75 0 111.06-1.06l6.75 6.75a.75.75 0 010 1.06z" fill="currentColor" />
                  </svg>
                </span>
              </Link>
              <Link href="/contact" className="btn-pill">
                <span className="btn-pill__text" data-text="Get in Touch">
                  Get in Touch
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="hero-parallax__scroll-hint"
          style={{
            opacity: 1 - scrollProgress * 4,
          }}
        >
          <div className="hero-parallax__scroll-line" />
          <span className="hero-parallax__scroll-text">Scroll</span>
        </div>

        {/* Progress bar */}
        <div className="hero-parallax__progress">
          <div
            className="hero-parallax__progress-bar"
            style={{ height: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
}
