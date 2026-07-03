import Link from 'next/link';
import { BlogPost } from '@/lib/data';

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="blog-entry">
      <span className="blog-entry__index label">
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className="blog-entry__title">{post.title}</span>
      <span className="blog-entry__meta">
        <span className="blog-entry__category">{post.category}</span>
        <span className="blog-entry__date">{post.date}</span>
      </span>
    </Link>
  );
}
