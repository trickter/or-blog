import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function TagPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tag = await prisma.tag.findUnique({ where: { slug }, include: { posts: { include: { post: true } } } });
  return <main className="container py-8"><h1 className="mb-6 text-2xl font-bold">标签: {tag?.name ?? slug}</h1><ul className="space-y-3">{tag?.posts.map((item) => <li key={item.postId}><Link href={`/posts/${item.post.slug}`}>{item.post.title}</Link></li>)}</ul></main>;
}
