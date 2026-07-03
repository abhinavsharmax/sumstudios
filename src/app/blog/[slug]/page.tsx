import type { Metadata } from 'next';
import { BLOG_POSTS } from '@/lib/data';
import { notFound } from 'next/navigation';
import DivisionLine from '@/components/ui/DivisionLine';
import Link from 'next/link';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find(p => p.slug === slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find(p => p.slug === slug);
  if (!post) notFound();

  const related = BLOG_POSTS.filter(p => p.slug !== slug).slice(0, 3);

  return (
    <>
      {/* Article hero */}
      <div
        style={{
          width: '100%',
          aspectRatio: '21/9',
          overflow: 'hidden',
          background: 'var(--bg-subtle)',
          maxHeight: 560,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.coverImage}
          alt={post.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          loading="eager"
        />
      </div>

      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '220px 1fr',
            gap: 'var(--space-xl)',
            paddingTop: 'var(--space-lg)',
          }}
        >
          {/* Sidebar */}
          <ScrollReveal>
            <div style={{ position: 'sticky', top: 'calc(var(--header-h) + 2rem)' }}>
              <p className="label mb-sm">{post.category}</p>
              <DivisionLine />
              <div style={{ paddingTop: 'var(--space-sm)' }}>
                {[
                  { label: 'Author', value: post.author },
                  { label: 'Published', value: post.date },
                  { label: 'Read time', value: post.readTime },
                ].map(item => (
                  <div key={item.label} style={{ marginBottom: '1rem' }}>
                    <p className="label" style={{ marginBottom: '0.25rem' }}>{item.label}</p>
                    <p className="body-sm">{item.value}</p>
                  </div>
                ))}
              </div>
              <Link href="/blog" className="section__link" style={{ marginTop: 'var(--space-md)', display: 'inline-block' }}>
                ← All articles
              </Link>
            </div>
          </ScrollReveal>

          {/* Article body */}
          <article>
            <ScrollReveal>
              <p className="label mb-sm" style={{ color: 'var(--fg-muted)' }}>{post.category}&nbsp;·&nbsp;{post.date}</p>
              <h1 className="display-lg" style={{ marginBottom: 'var(--space-md)', maxWidth: '20ch' }}>{post.title}</h1>
              <p className="display-sm text-muted" style={{ marginBottom: 'var(--space-lg)', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400, lineHeight: 1.3, maxWidth: '42ch' }}>
                {post.excerpt}
              </p>
            </ScrollReveal>

            <DivisionLine />

            <ScrollReveal delay={1}>
              <div
                className="post-body"
                style={{ paddingTop: 'var(--space-md)', paddingBottom: 'var(--space-xl)' }}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </ScrollReveal>
          </article>
        </div>

        {/* Related articles */}
        <DivisionLine label="More from the Journal" />
        <div style={{ padding: 'var(--space-lg) 0' }}>
          <ScrollReveal>
            <div className="blog-list">
              {related.map((rel, i) => (
                <Link key={rel.slug} href={`/blog/${rel.slug}`} className="blog-entry">
                  <span className="blog-entry__index label">{String(i + 1).padStart(2, '0')}</span>
                  <span className="blog-entry__title">{rel.title}</span>
                  <span className="blog-entry__meta">
                    <span className="blog-entry__category">{rel.category}</span>
                    <span className="blog-entry__date">{rel.date}</span>
                  </span>
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </>
  );
}
