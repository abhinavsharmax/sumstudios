import type { Metadata } from 'next';
import DivisionLine from '@/components/ui/DivisionLine';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Studio',
  description: 'Sum Studio is a Mumbai-based architecture practice committed to thoughtful, enduring design — buildings, interiors, and objects.',
};

const TEAM = [
  {
    name: 'Anika Sharma',
    role: 'Principal Architect',
    bio: 'Studied at Kamla Raheja Vidyanidhi Institute and the Architectural Association. Previously with Snøhetta Oslo and Studio Mumbai.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=85',
  },
  {
    name: 'Rohan Mehta',
    role: 'Principal, Design',
    bio: 'Graduated from CEPT University and Yale School of Architecture. Led projects in South Asia, East Africa, and the Netherlands.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=85',
  },
  {
    name: 'Priya Nair',
    role: 'Associate, Interiors',
    bio: 'Interior architect with a focus on material research and craft-based making. Trained at NID Ahmedabad.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&auto=format&fit=crop&q=85',
  },
];

const VALUES = [
  { label: '01', title: 'Commitment to Place', text: 'Every project begins with listening — to the site, the climate, the people, the culture. Architecture that ignores its context is architecture that fails.' },
  { label: '02', title: 'Material Honesty', text: 'We use materials for what they are, not what they can be made to appear. Concrete is concrete. Timber is timber. The beauty is in the nature, not the imitation.' },
  { label: '03', title: 'Long Duration', text: 'We design for time. Buildings should age well, accumulate meaning, and outlast fashion. We reject the aesthetic of the new and court the aesthetic of the enduring.' },
  { label: '04', title: 'Joy in Making', text: 'Architecture is a discipline of making. We believe in the pleasure of craft — in joints that are considered, surfaces that reward touch, and spaces that make you glad to be alive.' },
];

export default function AboutPage() {
  return (
    <>
      <div className="page-hero container">
        <ScrollReveal>
          <p className="label page-hero__eyebrow">The Practice</p>
          <h1 className="display-hero page-hero__title" style={{ maxWidth: '12ch' }}>
            Architecture with conviction.
          </h1>
        </ScrollReveal>
      </div>

      {/* Full-bleed image */}
      <ScrollReveal>
        <div style={{ width: '100%', aspectRatio: '21/8', overflow: 'hidden', background: 'var(--bg-subtle)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1800&auto=format&fit=crop&q=85"
            alt="Sum Studio workspace"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            loading="lazy"
          />
        </div>
      </ScrollReveal>

      {/* Philosophy */}
      <div className="container" style={{ padding: 'var(--space-xl) var(--space-md)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-xl)', alignItems: 'start' }}>
          <ScrollReveal>
            <p className="label" style={{ position: 'sticky', top: 'calc(var(--header-h) + 2rem)' }}>Philosophy</p>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <p className="display-md" style={{ marginBottom: 'var(--space-md)', maxWidth: '22ch' }}>
              A place where great commitment is given in pursuit of function, aesthetic, coherence, and joy.
            </p>
            <p className="body-lg text-muted" style={{ marginBottom: 'var(--space-sm)' }}>
              Sum Studio was founded in 2012 by Anika Sharma and Rohan Mehta, two architects who shared a belief that Indian architecture could be rigorous and poetic simultaneously — technically demanding without sacrificing warmth, globally informed without abandoning the local.
            </p>
            <p className="body-lg text-muted">
              The studio operates across scales — from master plans to door handles. We believe that the quality of a building is ultimately expressed through its details, and that every decision, however small, carries the weight of intention.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <DivisionLine className="container" />

      {/* Values */}
      <div className="container" style={{ padding: 'var(--space-xl) var(--space-md)' }}>
        <ScrollReveal>
          <p className="label mb-lg">What We Stand For</p>
        </ScrollReveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, background: 'var(--border)' }}>
          {VALUES.map((v, i) => (
            <ScrollReveal key={v.label} delay={(i % 2) as 0|1|2|3|4|5}>
              <div style={{ background: 'var(--bg)', padding: 'var(--space-lg) var(--space-md)' }}>
                <p className="label mb-sm text-faint">{v.label}</p>
                <h3 className="display-sm" style={{ marginBottom: 'var(--space-sm)' }}>{v.title}</h3>
                <p className="body-base text-muted">{v.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <DivisionLine className="container" />

      {/* Team */}
      <div className="container" style={{ padding: 'var(--space-xl) var(--space-md)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 'var(--space-lg)' }}>
          <ScrollReveal>
            <p className="label mb-xs">People</p>
            <h2 className="display-lg">The Team</h2>
          </ScrollReveal>
          <Link href="/contact" className="section__link">Work with us</Link>
        </div>

        <div className="team-grid">
          {TEAM.map((member, i) => (
            <ScrollReveal key={member.name} delay={(i % 3) as 0|1|2|3|4|5} className="team-card">
              <div className="team-card__img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={member.image} alt={member.name} loading="lazy" />
              </div>
              <h3 className="display-sm" style={{ marginBottom: '0.25rem' }}>{member.name}</h3>
              <p className="label mb-sm" style={{ color: 'var(--fg-muted)' }}>{member.role}</p>
              <DivisionLine />
              <p className="body-sm text-muted" style={{ marginTop: '1rem' }}>{member.bio}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Awards strip */}
      <div style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ padding: 'var(--space-xl) var(--space-md)' }}>
          <ScrollReveal>
            <p className="label mb-lg">Recognition</p>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-md)' }}>
            {[
              { award: 'Aga Khan Award for Architecture', year: '2024', project: 'Pavilion Vayu' },
              { award: 'Indian Architecture Awards — Best Residential', year: '2023', project: 'Residence Kanav' },
              { award: 'Architectural Review Award', year: '2022', project: 'Studio Suryavansh' },
              { award: 'Pritzker Young Architect Prize', year: '2021', project: 'Firm' },
              { award: 'World Architecture Festival Shortlist', year: '2024', project: 'Library of Light' },
              { award: 'RIBA International Award', year: '2023', project: 'Atelier Mira' },
            ].map((a, i) => (
              <ScrollReveal key={i} delay={(i % 3) as 0|1|2|3|4|5}>
                <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: 'var(--space-sm)' }}>
                  <p className="body-sm text-muted" style={{ marginBottom: '0.35rem' }}>{a.year}</p>
                  <p style={{ fontSize: '0.9375rem', marginBottom: '0.25rem', lineHeight: 1.3 }}>{a.award}</p>
                  <p className="label text-faint">{a.project}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
