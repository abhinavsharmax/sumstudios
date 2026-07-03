'use client';

import { CSSProperties } from 'react';

interface DivisionLineProps {
  label?: string;
  strong?: boolean;
  className?: string;
  style?: CSSProperties;
}

export default function DivisionLine({ label, strong, className = '', style }: DivisionLineProps) {
  return (
    <div className={`division-line${strong ? ' division-line--strong' : ''} ${className}`} style={style}>
      {label && (
        <span className="division-line-label label">{label}</span>
      )}
    </div>
  );
}
