import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { tagSchema } from '@/lib/validations';

export async function GET() {
  const tags = await prisma.tag.findMany({ orderBy: { name: 'asc' } });
  return NextResponse.json({ data: tags });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (session?.user.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const payload = tagSchema.parse(await req.json());
  const tag = await prisma.tag.create({ data: payload });
  return NextResponse.json({ data: tag }, { status: 201 });
}
