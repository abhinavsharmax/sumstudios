import type { Metadata } from 'next';
import { PROJECTS } from '@/lib/data';
import { notFound } from 'next/navigation';
import DivisionLine from '@/components/ui/DivisionLine';
import Link from 'next/link';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find(p => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = PROJECTS.find(p => p.slug === slug);
  if (!project) notFound();

  const related = PROJECTS.filter(p => p.slug !== slug && p.category === project.category).slice(0, 2);

  return (
    <>
      {/* Full-bleed hero image */}
      <div
        style={{
          width: '100%',
          height: '90vh',
          minHeight: 480,
          overflow: 'hidden',
          position: 'relative',
          background: 'var(--bg-subtle)',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.coverImage}
          alt={project.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          loading="eager"
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 'var(--space-md)',
            left: 'var(--space-md)',
            right: 'var(--space-md)',
            color: '#f0ede6',
          }}
        >
          <p className="label" style={{ color: 'rgba(240,237,230,0.65)', marginBottom: '0.75rem' }}>
            {project.category}&nbsp;·&nbsp;{project.year}
          </p>
          <h1 className="display-hero" style={{ color: '#f0ede6' }}>{project.title}</h1>
        </div>
      </div>

      {/* Project details */}
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: 'var(--space-xl)',
            padding: 'var(--space-xl) 0',
            borderBottom: '1px solid var(--border)',
          }}
        >
          {/* Metadata sidebar */}
          <ScrollReveal>
            <div style={{ position: 'sticky', top: 'calc(var(--header-h) + 2rem)' }}>
              {[
                { label: 'Location', value: project.location },
                { label: 'Year', value: project.year },
                { label: 'Status', value: project.status },
                { label: 'Programme', value: project.category },
                { label: 'Area', value: project.area },
                { label: 'Client', value: project.client },
              ].map(item => (
                <div
                  key={item.label}
                  style={{ borderBottom: '1px solid var(--border)', padding: '1rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}
                >
                  <span className="label">{item.label}</span>
                  <span className="body-sm">{item.value}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Description */}
          <ScrollReveal delay={1}>
            <p className="display-sm" style={{ marginBottom: 'var(--space-md)', lineHeight: 1.25 }}>
              {project.description}
            </p>
            <p className="body-lg text-muted">
              The project responds to its site with precision and restraint. Every material decision is made in dialogue with the local context — its climate, its culture, its building traditions. The result is architecture that belongs to its place while transcending the merely vernacular.
            </p>
            <p className="body-lg text-muted" style={{ marginTop: 'var(--space-sm)' }}>
              Light enters through calculated apertures that shift the reading of space throughout the day. The building breathes — in summer it draws cool air through section, in winter it traps solar gain through careful glazing. Passive systems that feel effortless precisely because they were difficult.
            </p>
          </ScrollReveal>
        </div>

        {/* Related projects */}
        {related.length > 0 && (
          <ScrollReveal>
            <div style={{ padding: 'var(--space-lg) 0' }}>
              <p className="label mb-md">Related Work</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-md)' }}>
                {related.map(rel => (
                  <Link key={rel.slug} href={`/projects/${rel.slug}`} style={{ display: 'block' }}>
                    <div style={{ overflow: 'hidden', aspectRatio: '4/3', marginBottom: '1rem', background: 'var(--bg-subtle)' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={rel.coverImage} alt={rel.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                    </div>
                    <p className="label mb-xs">{rel.category}</p>
                    <h3 className="display-sm">{rel.title}</h3>
                  </Link>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>

      <DivisionLine />
    </>
  );
}
