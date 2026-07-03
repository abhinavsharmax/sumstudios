import type { Metadata } from 'next';
import { BLOG_POSTS } from '@/lib/data';
import BlogCard from '@/components/ui/BlogCard';
import DivisionLine from '@/components/ui/DivisionLine';
import ScrollReveal from '@/components/ui/ScrollReveal';

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Writing on architecture, materials, light, and the practice of making space — from the Sum Studio desk.',
};

export default function BlogPage() {
  const [featured, ...rest] = BLOG_POSTS;

  return (
    <>
      <div className="page-hero container">
        <ScrollReveal>
          <p className="label page-hero__eyebrow">Thinking</p>
          <h1 className="display-hero page-hero__title">Journal</h1>
        </ScrollReveal>
      </div>

      {/* Featured article */}
      <div className="container" style={{ padding: 'var(--space-lg) var(--space-md)' }}>
        <ScrollReveal>
          <div className="blog-hero-grid">
            <div>
              <div className="blog-featured-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={featured.coverImage} alt={featured.title} loading="eager" />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: 'var(--space-sm)' }}>
              <p className="label mb-sm">{featured.category}&nbsp;·&nbsp;{featured.readTime} read</p>
              <h2 className="display-md" style={{ marginBottom: 'var(--space-sm)' }}>
                <a href={`/blog/${featured.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {featured.title}
                </a>
              </h2>
              <p className="body-lg text-muted" style={{ marginBottom: 'var(--space-md)' }}>{featured.excerpt}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: 'var(--space-sm)' }}>
                <span className="label">{featured.author}</span>
                <span className="body-sm text-muted">{featured.date}</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <DivisionLine className="container" label="All Articles" />

      {/* Article list */}
      <div className="container" style={{ paddingBottom: 'var(--space-xl)' }}>
        <ScrollReveal>
          <div className="blog-list">
            {BLOG_POSTS.map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </>
  );
}
