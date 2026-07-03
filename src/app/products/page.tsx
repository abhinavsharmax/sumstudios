import type { Metadata } from 'next';
import { PRODUCTS } from '@/lib/data';
import ProductsClient from './ProductsClient';

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Designed objects by Sum Studio — furniture, lighting, and homeware crafted with the same rigour as our architecture.',
};

export default function ProductsPage() {
  return (
    <ProductsClient products={PRODUCTS} />
  );
}
