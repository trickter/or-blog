import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { checkRateLimit } from '@/lib/rate-limit';

export async function GET(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
  if (!checkRateLimit(`search:${ip}`, 60, 60_000)) return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  const q = req.nextUrl.searchParams.get('q')?.trim();
  if (!q) return NextResponse.json({ data: [] });
  const data = await prisma.post.findMany({ where: { status: 'PUBLISHED', OR: [{ title: { contains: q, mode: 'insensitive' } }, { excerpt: { contains: q, mode: 'insensitive' } }, { content: { contains: q, mode: 'insensitive' } }] }, take: 20 });
  return NextResponse.json({ data });
}
