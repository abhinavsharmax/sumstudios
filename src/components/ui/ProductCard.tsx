import Link from 'next/link';
import { Product } from '@/lib/data';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.slug}`} className="product-card">
      <div className="product-card__media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="product-card__img"
          loading="lazy"
        />
        {product.tag && (
          <span className="product-card__tag label">{product.tag}</span>
        )}
      </div>
      <div className="product-card__body">
        <div>
          <h3 className="product-card__name">{product.name}</h3>
          <p className="product-card__category label" style={{ marginTop: '0.25rem' }}>{product.category}</p>
        </div>
        <span className="product-card__price">{product.price}</span>
      </div>
    </Link>
  );
}
