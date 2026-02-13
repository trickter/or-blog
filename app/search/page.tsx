import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const query = q?.trim() ?? '';
  const posts = query ? await prisma.post.findMany({ where: { status: 'PUBLISHED', OR: [{ title: { contains: query, mode: 'insensitive' } }, { excerpt: { contains: query, mode: 'insensitive' } }, { content: { contains: query, mode: 'insensitive' } }] } }) : [];
  return <main className="container py-8"><form><input className="w-full rounded border p-2" name="q" defaultValue={query} placeholder="搜索标题、摘要、正文" /></form><ul className="mt-6 space-y-3">{posts.map((post) => <li key={post.id}><Link href={`/posts/${post.slug}`}>{post.title}</Link></li>)}</ul></main>;
}
