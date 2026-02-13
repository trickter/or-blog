import { notFound, redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user || session.user.role !== 'ADMIN') redirect('/admin/login');
  const post = await prisma.post.findUnique({ where: { id }, include: { tags: true } });
  if (!post) notFound();
  const tags = await prisma.tag.findMany();

  async function updatePost(formData: FormData) {
    'use server';
    const title = String(formData.get('title') ?? '');
    const content = String(formData.get('content') ?? '');
    const status = String(formData.get('status') ?? 'DRAFT') as 'DRAFT' | 'PUBLISHED';
    const tagIds = formData.getAll('tagIds').map(String);
    await prisma.post.update({ where: { id }, data: { title, content, status, excerpt: content.slice(0, 120), publishedAt: status === 'PUBLISHED' ? (post.publishedAt ?? new Date()) : null, tags: { deleteMany: {}, create: tagIds.map((tagId) => ({ tagId })) } } });
    redirect('/admin/posts');
  }

  return <main className="container py-8"><h1 className="mb-4 text-2xl font-bold">编辑文章</h1><form action={updatePost} className="space-y-3"><input name="title" defaultValue={post.title} className="w-full rounded border p-2" /><textarea name="content" defaultValue={post.content} rows={14} className="w-full rounded border p-2" /><select name="status" defaultValue={post.status} className="rounded border p-2"><option value="DRAFT">草稿</option><option value="PUBLISHED">发布</option></select><div>{tags.map((tag) => <label key={tag.id} className="mr-3"><input type="checkbox" name="tagIds" value={tag.id} defaultChecked={post.tags.some((t) => t.tagId === tag.id)} /> {tag.name}</label>)}</div><button className="rounded bg-slate-900 px-4 py-2 text-white">更新</button></form></main>;
}
