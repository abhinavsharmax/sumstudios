'use client';

import { useMemo } from 'react';

interface SvgWordmarkProps {
  progress?: number; // 0–1 scroll progress
  className?: string;
}

export default function SvgWordmark({ progress = 0, className = '' }: SvgWordmarkProps) {
  // Stagger each letter: S starts at 0, U at 0.15, M at 0.3
  const letterProgress = useMemo(() => {
    const stagger = 0.15;
    return [0, 1, 2].map(i => {
      const start = i * stagger;
      const end = start + 0.55;
      return Math.min(1, Math.max(0, (progress - start) / (end - start)));
    });
  }, [progress]);

  // Fill opacity kicks in after stroke is ~70% drawn
  const fillOpacity = useMemo(() => {
    return letterProgress.map(p => Math.min(1, Math.max(0, (p - 0.7) / 0.3)));
  }, [letterProgress]);

  const strokeDashTotal = 800;

  return (
    <svg
      className={`svg-wordmark ${className}`}
      viewBox="0 0 960 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Sum Studio"
    >
      {/* S */}
      <path
        d="M40 220C40 220 40 260 120 260C200 260 240 230 240 195C240 160 200 145 140 130C80 115 40 100 40 65C40 30 80 10 140 10C200 10 240 35 240 60"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity={fillOpacity[0]}
        style={{
          strokeDasharray: strokeDashTotal,
          strokeDashoffset: strokeDashTotal * (1 - letterProgress[0]),
          transition: 'none',
        }}
      />

      {/* U */}
      <path
        d="M300 15L300 185C300 230 340 265 410 265C480 265 520 230 520 185L520 15"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity={fillOpacity[1]}
        style={{
          strokeDasharray: strokeDashTotal,
          strokeDashoffset: strokeDashTotal * (1 - letterProgress[1]),
          transition: 'none',
        }}
      />

      {/* M */}
      <path
        d="M580 260L580 15L700 200L820 15L820 260"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity={fillOpacity[2]}
        style={{
          strokeDasharray: strokeDashTotal,
          strokeDashoffset: strokeDashTotal * (1 - letterProgress[2]),
          transition: 'none',
        }}
      />

      {/* "STUDIO" subtitle — fades in at end */}
      <text
        x="480"
        y="278"
        textAnchor="middle"
        fill="currentColor"
        fontSize="18"
        letterSpacing="16"
        fontFamily="Inter, Helvetica, sans-serif"
        fontWeight="400"
        style={{
          opacity: Math.min(1, Math.max(0, (progress - 0.6) / 0.25)),
          transition: 'none',
        }}
      >
        STUDIO
      </text>
    </svg>
  );
}
