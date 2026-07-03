'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { PROJECTS } from '@/lib/data';
import Link from 'next/link';

const SLIDES = PROJECTS.slice(0, 6);
const INTERVAL = 5000;

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimers = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
  };

  const startTimers = useCallback((startFrom = 0) => {
    clearTimers();
    setProgress(startFrom);
    const startTime = Date.now() - (startFrom / 100) * INTERVAL;

    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / INTERVAL) * 100, 100);
      setProgress(pct);
    }, 50);

    timerRef.current = setTimeout(() => {
      setCurrent(prev => (prev + 1) % SLIDES.length);
    }, INTERVAL - (startFrom / 100) * INTERVAL);
  }, []);

  useEffect(() => {
    startTimers(0);
    return clearTimers;
  }, [current, startTimers]);

  const goTo = (idx: number) => {
    clearTimers();
    setCurrent(idx);
  };

  const prev = () => goTo((current - 1 + SLIDES.length) % SLIDES.length);
  const next = () => goTo((current + 1) % SLIDES.length);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  };

  return (
    <section
      className="hero"
      role="region"
      aria-label="Featured projects carousel"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {SLIDES.map((project, i) => (
        <div
          key={project.slug}
          className={`hero__slide${i === current ? ' active' : ''}`}
          aria-hidden={i !== current}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.coverImage}
            alt={project.title}
            className="hero__img"
            loading={i === 0 ? 'eager' : 'lazy'}
          />
          <div className="hero__overlay" />
        </div>
      ))}

      {/* Left / Right click zones */}
      <div className="hero__nav">
        <button className="hero__nav-btn" onClick={prev} aria-label="Previous project" />
        <button className="hero__nav-btn" onClick={next} aria-label="Next project" />
      </div>

      {/* Content overlay */}
      <div className="hero__content">
        <div className="hero__info">
          <p className="hero__label">
            {SLIDES[current].category}&nbsp;&nbsp;—&nbsp;&nbsp;{SLIDES[current].location}
          </p>
          <Link href={`/projects/${SLIDES[current].slug}`}>
            <h1 className="hero__title">{SLIDES[current].title}</h1>
          </Link>
        </div>

        <div className="hero__meta">
          <span className="hero__counter">
            {String(current + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
          </span>
          <div className="hero__progress">
            <div
              className="hero__progress-bar"
              style={{ width: `${progress}%`, transition: progress === 0 ? 'none' : 'width 0.05s linear' }}
            />
          </div>
        </div>
      </div>

      {/* Dot navigation */}
      <div className="hero__dots" role="tablist">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`hero__dot${i === current ? ' active' : ''}`}
            onClick={() => goTo(i)}
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
