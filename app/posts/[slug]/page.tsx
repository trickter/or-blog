import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { renderMarkdown } from '@/lib/markdown';

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug }, include: { author: true, tags: { include: { tag: true } } } });
  if (!post || post.status !== 'PUBLISHED') notFound();
  return <main className="container py-8"><h1 className="mb-2 text-3xl font-bold">{post.title}</h1><div className="mb-6 text-sm text-slate-600">{post.author.name ?? post.author.email} · {post.readTimeMins} 分钟阅读</div><article className="prose max-w-none rounded bg-white p-6" dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }} /></main>;
}
