import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { slugify } from '@/lib/utils';

export default async function NewPostPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== 'ADMIN') redirect('/admin/login');
  const tags = await prisma.tag.findMany({ orderBy: { name: 'asc' } });
  async function createPost(formData: FormData) {
    'use server';
    const title = String(formData.get('title') ?? '');
    const content = String(formData.get('content') ?? '');
    const status = String(formData.get('status') ?? 'DRAFT') as 'DRAFT' | 'PUBLISHED';
    const tagIds = formData.getAll('tagIds').map(String);
    const slug = slugify(title);
    const readTimeMins = Math.max(1, Math.ceil(content.split(/\s+/).length / 220));
    await prisma.post.create({ data: { title, slug, content, status, excerpt: content.slice(0, 120), readTimeMins, authorId: session.user.id, publishedAt: status === 'PUBLISHED' ? new Date() : null, tags: { create: tagIds.map((id) => ({ tagId: id })) } } });
    redirect('/admin/posts');
  }
  return <main className="container py-8"><h1 className="mb-4 text-2xl font-bold">新建文章</h1><form action={createPost} className="space-y-3"><input name="title" placeholder="标题" className="w-full rounded border p-2" /><textarea name="content" rows={14} className="w-full rounded border p-2" placeholder="Markdown 内容" /><select name="status" className="rounded border p-2"><option value="DRAFT">草稿</option><option value="PUBLISHED">发布</option></select><div>{tags.map((tag) => <label key={tag.id} className="mr-3"><input type="checkbox" name="tagIds" value={tag.id} /> {tag.name}</label>)}</div><button className="rounded bg-slate-900 px-4 py-2 text-white">保存</button></form></main>;
}
