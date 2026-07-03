import type { Metadata } from 'next';
import { PRODUCTS } from '@/lib/data';
import { notFound } from 'next/navigation';
import DivisionLine from '@/components/ui/DivisionLine';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Link from 'next/link';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find(p => p.slug === slug);
  if (!product) return {};
  return { title: product.name, description: product.description };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = PRODUCTS.find(p => p.slug === slug);
  if (!product) notFound();

  const related = PRODUCTS.filter(p => p.slug !== slug).slice(0, 4);

  return (
    <>
      <div style={{ paddingTop: 'var(--header-h)' }}>
        <div
          className="container"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--space-xl)',
            padding: 'var(--space-xl) var(--space-md)',
          }}
        >
          {/* Product image */}
          <ScrollReveal>
            <div
              style={{
                position: 'sticky',
                top: 'calc(var(--header-h) + 2rem)',
                aspectRatio: '3/4',
                overflow: 'hidden',
                background: 'var(--bg-subtle)',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                loading="eager"
              />
            </div>
          </ScrollReveal>

          {/* Product details */}
          <ScrollReveal delay={1}>
            <div style={{ paddingTop: 'var(--space-md)' }}>
              {product.tag && <p className="label mb-sm text-accent">{product.tag}</p>}
              <p className="label mb-sm text-muted">{product.category}</p>
              <h1 className="display-md" style={{ marginBottom: 'var(--space-sm)' }}>{product.name}</h1>
              <p className="display-sm" style={{ color: 'var(--fg-muted)', marginBottom: 'var(--space-md)' }}>
                {product.price}
              </p>

              <DivisionLine />

              <p className="body-lg text-muted" style={{ padding: 'var(--space-md) 0' }}>
                {product.description}
              </p>

              <DivisionLine />

              <div style={{ padding: 'var(--space-md) 0' }}>
                {[
                  { label: 'Material', value: product.material },
                  { label: 'Dimensions', value: product.dimensions },
                  { label: 'Lead time', value: '8–12 weeks' },
                  { label: 'Made in', value: 'India' },
                ].map(item => (
                  <div
                    key={item.label}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      padding: '0.75rem 0',
                      borderBottom: '1px solid var(--border)',
                    }}
                  >
                    <span className="label">{item.label}</span>
                    <span className="body-sm">{item.value}</span>
                  </div>
                ))}
              </div>

              <button className="form-submit" style={{ width: '100%', marginTop: 'var(--space-md)' }}>
                Enquire to Order
              </button>
            </div>
          </ScrollReveal>
        </div>

        <DivisionLine className="container" />

        {/* Related products */}
        <div className="container" style={{ padding: 'var(--space-lg) var(--space-md)' }}>
          <ScrollReveal>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 'var(--space-md)' }}>
              <p className="label">More Objects</p>
              <Link href="/products" className="section__link">View all</Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: 'var(--border)' }}>
              {related.map(rel => (
                <div key={rel.slug} style={{ background: 'var(--bg)' }}>
                  <Link href={`/products/${rel.slug}`} className="product-card">
                    <div className="product-card__media">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={rel.image} alt={rel.name} className="product-card__img" loading="lazy" />
                    </div>
                    <div className="product-card__body">
                      <div>
                        <h3 className="product-card__name">{rel.name}</h3>
                        <p className="product-card__category label">{rel.category}</p>
                      </div>
                      <span className="product-card__price">{rel.price}</span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </>
  );
}
