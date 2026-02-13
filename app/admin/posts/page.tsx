import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function AdminPostsPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== 'ADMIN') redirect('/admin/login');
  const posts = await prisma.post.findMany({ orderBy: { updatedAt: 'desc' }, include: { tags: { include: { tag: true } } } });
  return <main className="container py-8"><div className="mb-6 flex items-center justify-between"><h1 className="text-2xl font-bold">文章管理</h1><Link className="rounded bg-slate-900 px-3 py-2 text-white" href="/admin/posts/new">新建文章</Link></div><table className="w-full bg-white"><thead><tr><th>标题</th><th>状态</th><th>操作</th></tr></thead><tbody>{posts.map((post) => <tr key={post.id} className="border-t"><td>{post.title}</td><td>{post.status}</td><td><Link href={`/admin/posts/${post.id}`}>编辑</Link></td></tr>)}</tbody></table></main>;
}
