'use client';

import { useEffect, useRef } from 'react';
import SvgWordmark from './SvgWordmark';
import Link from 'next/link';

export default function HeroParallax() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const fogRef = useRef<HTMLDivElement>(null);
  const fog2Ref = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rAFId: number | null = null;
    let isIntersecting = false;

    const section = sectionRef.current;
    if (!section) return;

    // Direct DOM styling update function
    const updateStyles = (progress: number) => {
      // 1. Background image (scale from 1.15 to 1.0, translate Y slightly)
      if (bgRef.current) {
        const bgScale = 1.15 - progress * 0.15;
        const bgY = progress * -80;
        bgRef.current.style.transform = `scale(${bgScale}) translateY(${bgY}px) translateZ(0)`;
      }

      // 2. Dark gradient overlay
      if (overlayRef.current) {
        const overlayOpacity = 0.15 + progress * 0.45;
        overlayRef.current.style.opacity = `${overlayOpacity}`;
      }

      // 3. Fog layers
      const fogOpacity = 1 - progress * 0.8;
      if (fogRef.current) {
        const fogY = progress * -120;
        fogRef.current.style.opacity = `${fogOpacity}`;
        fogRef.current.style.transform = `translateY(${fogY}px) translateZ(0)`;
      }
      if (fog2Ref.current) {
        const fog2Y = progress * -60;
        fog2Ref.current.style.opacity = `${fogOpacity * 0.6}`;
        fog2Ref.current.style.transform = `translateY(${fog2Y}px) translateZ(0)`;
      }

      // 4. Lines overlay
      if (linesRef.current) {
        const layer1Y = progress * -40;
        linesRef.current.style.transform = `translateY(${layer1Y}px) translateZ(0)`;
        linesRef.current.style.opacity = `${0.08 + progress * 0.12}`;
      }

      // 5. Wordmark
      if (wordmarkRef.current) {
        const layer2Y = progress * -100;
        const wordmarkScale = 0.6 + progress * 0.4;
        const wordmarkOpacity = Math.min(1, progress * 2.5);
        wordmarkRef.current.style.transform = `translateY(${layer2Y}px) scale(${wordmarkScale}) translateZ(0)`;
        wordmarkRef.current.style.opacity = `${wordmarkOpacity}`;

        // Directly manipulate the SVG Wordmark paths
        const svgEl = wordmarkRef.current.querySelector('svg');
        if (svgEl) {
          const paths = svgEl.querySelectorAll('path');
          const text = svgEl.querySelector('text');
          
          const strokeDashTotal = 800;
          const stagger = 0.15;
          
          // Update each letter path (S, U, M)
          for (let i = 0; i < 3; i++) {
            const path = paths[i];
            if (path) {
              const start = i * stagger;
              const end = start + 0.55;
              const p = Math.min(1, Math.max(0, (progress - start) / (end - start)));
              path.style.strokeDashoffset = `${strokeDashTotal * (1 - p)}`;
              
              const fillOpacity = Math.min(1, Math.max(0, (p - 0.7) / 0.3));
              path.setAttribute('fill-opacity', `${fillOpacity}`);
            }
          }

          // Update subtitle text "STUDIO"
          if (text) {
            const textOpacity = Math.min(1, Math.max(0, (progress - 0.6) / 0.25));
            text.style.opacity = `${textOpacity}`;
          }
        }
      }

      // 6. Content overlay
      if (contentRef.current) {
        const contentOpacity = Math.min(1, Math.max(0, (progress - 0.35) / 0.3));
        const contentY = 60 - progress * 90;
        contentRef.current.style.opacity = `${contentOpacity}`;
        contentRef.current.style.transform = `translateY(${contentY}px) translateZ(0)`;
      }

      // 7. Scroll hint
      if (scrollHintRef.current) {
        scrollHintRef.current.style.opacity = `${1 - progress * 4}`;
      }

      // 8. Progress Bar
      if (progressBarRef.current) {
        progressBarRef.current.style.height = `${progress * 100}%`;
      }
    };

    const handleScroll = () => {
      if (!isIntersecting) return;

      if (rAFId) return;

      rAFId = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const sectionHeight = section.offsetHeight;
        const viewportHeight = window.innerHeight;

        const scrolled = -rect.top;
        const totalScroll = sectionHeight - viewportHeight;
        const progress = Math.min(1, Math.max(0, scrolled / totalScroll));

        updateStyles(progress);
        rAFId = null;
      });
    };

    // Use IntersectionObserver to stop scroll calculations when hero is out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (entry.isIntersecting) {
          handleScroll();
        }
      },
      { threshold: 0 }
    );

    observer.observe(section);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial paint
    updateStyles(0);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      if (rAFId) cancelAnimationFrame(rAFId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero-parallax"
      aria-label="Hero section"
    >
      <div className="hero-parallax__viewport">
        {/* Layer 1: Background image */}
        <div ref={bgRef} className="hero-parallax__bg">
          <img
            src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=1920&auto=format&fit=crop&q=85"
            alt="Architectural pavilion"
            loading="eager"
            className="hero-parallax__bg-img"
          />
        </div>

        {/* Layer 2: Dark gradient overlay */}
        <div ref={overlayRef} className="hero-parallax__overlay" />

        {/* Layer 3: Atmospheric fog — bottom */}
        <div ref={fogRef} className="hero-parallax__fog hero-parallax__fog--bottom" />

        {/* Layer 4: Secondary fog — mid */}
        <div ref={fog2Ref} className="hero-parallax__fog hero-parallax__fog--mid" />

        {/* Layer 5: Architectural line SVG decorations */}
        <div ref={linesRef} className="hero-parallax__lines">
          <svg viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg" className="hero-parallax__lines-svg">
            <line x1="0" y1="540" x2="1920" y2="540" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
            <line x1="0" y1="360" x2="1920" y2="360" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
            <line x1="0" y1="720" x2="1920" y2="720" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
            <line x1="960" y1="0" x2="960" y2="1080" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
            <line x1="480" y1="0" x2="480" y2="1080" stroke="currentColor" strokeWidth="0.5" opacity="0.08" />
            <line x1="1440" y1="0" x2="1440" y2="1080" stroke="currentColor" strokeWidth="0.5" opacity="0.08" />
            <line x1="0" y1="1080" x2="960" y2="0" stroke="currentColor" strokeWidth="0.3" opacity="0.06" />
            <line x1="960" y1="1080" x2="1920" y2="0" stroke="currentColor" strokeWidth="0.3" opacity="0.06" />
          </svg>
        </div>

        {/* Layer 6: Large SVG Wordmark */}
        <div ref={wordmarkRef} className="hero-parallax__wordmark">
          <SvgWordmark />
        </div>

        {/* Layer 7: Content — headline, subtitle, CTA */}
        <div ref={contentRef} className="hero-parallax__content">
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
        <div ref={scrollHintRef} className="hero-parallax__scroll-hint">
          <div className="hero-parallax__scroll-line" />
          <span className="hero-parallax__scroll-text">Scroll</span>
        </div>

        {/* Progress bar */}
        <div className="hero-parallax__progress">
          <div ref={progressBarRef} className="hero-parallax__progress-bar" />
        </div>
      </div>
    </section>
  );
}
