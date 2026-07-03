'use client';

import { PROJECTS, Project } from '@/lib/data';
import DivisionLine from '@/components/ui/DivisionLine';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Link from 'next/link';
import { useState } from 'react';

const CATEGORIES = ['All', 'Residential', 'Cultural', 'Commercial', 'Mixed-Use', 'Civic'];

function ProjectImage({ src, alt }: { src: string; alt: string; aspectRatio?: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{ overflow: 'hidden', aspectRatio: '4/3', marginBottom: '1.25rem', background: 'var(--bg-subtle)' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)',
          transform: hovered ? 'scale(1.04)' : 'scale(1)',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />
    </div>
  );
}

export default function ProjectsClient({ projects }: { projects: Project[] }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <>
      {/* Page Hero */}
      <div className="page-hero container">
        <ScrollReveal>
          <p className="label page-hero__eyebrow">Work</p>
          <h1 className="display-hero page-hero__title">Selected Projects</h1>
        </ScrollReveal>
      </div>

      {/* Filter strip */}
      <div className="container" style={{ paddingTop: 'var(--space-md)', paddingBottom: 'var(--space-md)' }}>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', borderBottom: '1px solid var(--border)', paddingBottom: 'var(--space-md)' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className="label"
              onClick={() => setActiveCategory(cat)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: cat === activeCategory ? 'var(--fg)' : 'var(--fg-muted)',
                borderBottom: cat === activeCategory ? '1px solid var(--fg)' : '1px solid transparent',
                paddingBottom: '2px',
                transition: 'color 0.15s',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects grid */}
      <div className="container" style={{ paddingBottom: 'var(--space-xl)' }}>
        <div className="projects-masonry">
          {filtered.map((project, i) => (
            <ScrollReveal key={project.slug} delay={(i % 3) as 0 | 1 | 2 | 3 | 4 | 5} className="projects-masonry__item">
              <Link href={`/projects/${project.slug}`} style={{ display: 'block' }}>
                <ProjectImage src={project.coverImage} alt={project.title} />
                <p className="label mb-xs">{project.category}</p>
                <h2 className="display-sm" style={{ marginBottom: '0.5rem' }}>{project.title}</h2>
                <p className="body-sm text-muted">{project.location}&nbsp;·&nbsp;{project.year}&nbsp;·&nbsp;{project.status}</p>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <DivisionLine className="container" />
    </>
  );
}
