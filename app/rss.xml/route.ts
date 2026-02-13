import { prisma } from '@/lib/prisma';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const posts = await prisma.post.findMany({ where: { status: 'PUBLISHED' }, orderBy: { publishedAt: 'desc' }, take: 50 });
  const xml = `<?xml version="1.0"?><rss version="2.0"><channel><title>OR Blog</title><link>${baseUrl}</link>${posts.map((p) => `<item><title>${p.title}</title><link>${baseUrl}/posts/${p.slug}</link><description>${p.excerpt ?? ''}</description></item>`).join('')}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
