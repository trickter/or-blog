import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { postSchema } from '@/lib/validations';

export async function GET() {
  const session = await auth();
  if (session?.user.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const posts = await prisma.post.findMany({ include: { tags: { include: { tag: true } } }, orderBy: { updatedAt: 'desc' } });
  return NextResponse.json({ data: posts });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (session?.user.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const payload = postSchema.parse(await req.json());
  const readTimeMins = Math.max(1, Math.ceil(payload.content.split(/\s+/).length / 220));
  const post = await prisma.post.create({ data: { ...payload, authorId: session.user.id, readTimeMins, publishedAt: payload.status === 'PUBLISHED' ? new Date() : null, tags: { create: payload.tagIds.map((tagId) => ({ tagId })) } } });
  return NextResponse.json({ data: post }, { status: 201 });
}
