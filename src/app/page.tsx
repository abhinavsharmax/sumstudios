import HeroParallax from '@/components/ui/HeroParallax';
import DivisionLine from '@/components/ui/DivisionLine';
import ProjectCard from '@/components/ui/ProjectCard';
import BlogCard from '@/components/ui/BlogCard';
import ProductCard from '@/components/ui/ProductCard';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Link from 'next/link';
import { PROJECTS, BLOG_POSTS, PRODUCTS } from '@/lib/data';

export default function HomePage() {
  const featuredProjects = PROJECTS.slice(0, 3);
  const latestPosts = BLOG_POSTS.slice(0, 4);
  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <>
      {/* ── HERO PARALLAX ─────────────────────────────────── */}
      <HeroParallax />

      {/* ── MARQUEE ───────────────────────────────────────── */}
      <div className="marquee" aria-hidden>
        <div className="marquee__inner">
          {['Architecture', 'Interiors', 'Objects', 'Landscapes', 'Urbanism', 'Culture'].map((word, i) => (
            <span key={i} className="marquee__item">
              {word}<span className="marquee__sep">·</span>
            </span>
          ))}
          {['Architecture', 'Interiors', 'Objects', 'Landscapes', 'Urbanism', 'Culture'].map((word, i) => (
            <span key={`dup-${i}`} className="marquee__item" aria-hidden>
              {word}<span className="marquee__sep">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── ABOUT STRIP ───────────────────────────────────── */}
      <section className="section container">
        <div className="about-strip">
          <ScrollReveal className="about-strip__text">
            <p className="label mb-sm">The Practice</p>
            <p className="display-md" style={{ marginBottom: 'var(--space-md)' }}>
              A studio where innovative solutions and well-considered execution is <span className="em">paramount.</span>
            </p>
            <p className="body-lg text-muted" style={{ marginBottom: 'var(--space-md)' }}>
              Founded on the belief that great architecture emerges from deep commitment — to place, to materials, to the people who inhabit our spaces. We work at every scale, from objects held in the hand to cities experienced over a lifetime.
            </p>
            <Link href="/about" className="section__link">Learn about the studio</Link>
          </ScrollReveal>

          <ScrollReveal delay={2} className="about-strip__stat" parallax parallaxSpeed={0.05}>
            {[
              { value: '14+', label: 'Years of practice' },
              { value: '68', label: 'Projects completed' },
              { value: '12', label: 'Awards received' },
              { value: '6', label: 'Countries' },
            ].map(stat => (
              <div key={stat.label} className="stat-item">
                <span className="stat-item__value">{stat.value}</span>
                <span className="stat-item__label">{stat.label}</span>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <DivisionLine className="container" />

      {/* ── FEATURED PROJECTS ─────────────────────────────── */}
      <section className="section container" id="projects">
        <div className="section__header">
          <ScrollReveal>
            <p className="label mb-xs">Selected Work</p>
            <h2 className="display-lg">Projects</h2>
          </ScrollReveal>
          <Link href="/projects" className="section__link">View all projects</Link>
        </div>

        <div className="projects-grid">
          <ScrollReveal className="projects-grid__item--large" parallax>
            <ProjectCard project={PROJECTS[0]} priority />
          </ScrollReveal>
          <ScrollReveal delay={1} className="projects-grid__item--small" parallax>
            <ProjectCard project={PROJECTS[1]} />
          </ScrollReveal>
          <ScrollReveal delay={1} className="projects-grid__item--third" parallax>
            <ProjectCard project={PROJECTS[2]} />
          </ScrollReveal>
          <ScrollReveal delay={2} className="projects-grid__item--third" parallax>
            <ProjectCard project={PROJECTS[3]} />
          </ScrollReveal>
          <ScrollReveal delay={3} className="projects-grid__item--third" parallax>
            <ProjectCard project={PROJECTS[4]} />
          </ScrollReveal>
        </div>
      </section>

      <DivisionLine className="container" />

      {/* ── JOURNAL ───────────────────────────────────────── */}
      <section className="section container" id="journal">
        <div className="section__header">
          <ScrollReveal>
            <p className="label mb-xs">Thinking</p>
            <h2 className="display-lg">Journal</h2>
          </ScrollReveal>
          <Link href="/blog" className="section__link">All articles</Link>
        </div>

        <ScrollReveal>
          <div className="blog-list">
            {latestPosts.map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        </ScrollReveal>
      </section>

      <DivisionLine className="container" />

      {/* ── OBJECTS / PRODUCTS ────────────────────────────── */}
      <section className="section container" id="objects">
        <div className="section__header">
          <ScrollReveal>
            <p className="label mb-xs">Crafted Pieces</p>
            <h2 className="display-lg">Objects</h2>
          </ScrollReveal>
          <Link href="/products" className="section__link">Shop all objects</Link>
        </div>

        <div className="products-grid">
          {featuredProducts.map((product, i) => (
            <ScrollReveal key={product.slug} delay={(i % 4) as 0 | 1 | 2 | 3 | 4 | 5}>
              <ProductCard product={product} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── CTA STRIP ─────────────────────────────────────── */}
      <section className="cta-strip">
        <ScrollReveal>
          <p className="label cta-strip__label">
            Start a conversation
          </p>
          <p className="display-lg cta-strip__title">
            Let&apos;s make something <span className="em" style={{ color: 'inherit' }}>worth making.</span>
          </p>
          <Link href="/contact" className="cta-strip__btn">
            Get in touch
          </Link>
        </ScrollReveal>
      </section>
    </>
  );
}
