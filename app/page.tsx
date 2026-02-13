import Link from 'next/link';
import { getPublishedPosts } from '@/lib/data';

export default async function Home({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page } = await searchParams;
  const current = Number(page ?? '1');
  const posts = await getPublishedPosts(current, 10);
  return <main className="container py-8"><h1 className="mb-6 text-3xl font-bold">最新文章</h1><ul className="space-y-4">{posts.map((post) => <li key={post.id} className="rounded border bg-white p-4"><Link className="text-xl font-semibold" href={`/posts/${post.slug}`}>{post.title}</Link><p className="mt-2 text-sm text-slate-600">{post.excerpt}</p></li>)}</ul><div className="mt-8 flex gap-2"><Link className="rounded border px-3 py-1" href={`/?page=${Math.max(current - 1, 1)}`}>上一页</Link><Link className="rounded border px-3 py-1" href={`/?page=${current + 1}`}>下一页</Link></div></main>;
}
