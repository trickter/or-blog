import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { slugify } from '@/lib/utils';

export default async function AdminTagsPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== 'ADMIN') redirect('/admin/login');
  const tags = await prisma.tag.findMany({ orderBy: { name: 'asc' } });

  async function createTag(formData: FormData) {
    'use server';
    const name = String(formData.get('name') ?? '');
    await prisma.tag.create({ data: { name, slug: slugify(name) } });
    redirect('/admin/tags');
  }

  async function mergeTag(formData: FormData) {
    'use server';
    const fromId = String(formData.get('fromId') ?? '');
    const toId = String(formData.get('toId') ?? '');
    if (!fromId || !toId || fromId === toId) return;
    await prisma.$transaction(async (tx) => {
      const links = await tx.postTag.findMany({ where: { tagId: fromId } });
      for (const link of links) {
        await tx.postTag.upsert({ where: { postId_tagId: { postId: link.postId, tagId: toId } }, update: {}, create: { postId: link.postId, tagId: toId } });
      }
      await tx.postTag.deleteMany({ where: { tagId: fromId } });
      await tx.tag.delete({ where: { id: fromId } });
    });
    redirect('/admin/tags');
  }

  async function deleteTag(formData: FormData) {
    'use server';
    const id = String(formData.get('id') ?? '');
    await prisma.postTag.deleteMany({ where: { tagId: id } });
    await prisma.tag.delete({ where: { id } });
    redirect('/admin/tags');
  }

  return <main className="container py-8"><h1 className="mb-4 text-2xl font-bold">标签管理</h1><form action={createTag} className="mb-6 flex gap-2"><input className="rounded border p-2" name="name" placeholder="新标签名称" /><button className="rounded bg-slate-900 px-4 py-2 text-white">新增</button></form><form action={mergeTag} className="mb-6 flex flex-wrap items-center gap-2 rounded border bg-white p-3"><span>合并标签</span><select name="fromId" className="rounded border p-2">{tags.map((tag) => <option key={tag.id} value={tag.id}>{tag.name}</option>)}</select><span>→</span><select name="toId" className="rounded border p-2">{tags.map((tag) => <option key={tag.id} value={tag.id}>{tag.name}</option>)}</select><button className="rounded bg-slate-900 px-4 py-2 text-white">执行合并</button></form><ul className="space-y-2">{tags.map((tag) => <li key={tag.id} className="flex items-center justify-between rounded border bg-white p-3"><span>{tag.name} ({tag.slug})</span><form action={deleteTag}><input type="hidden" name="id" value={tag.id} /><button className="text-sm text-red-600">删除</button></form></li>)}</ul></main>;
}
