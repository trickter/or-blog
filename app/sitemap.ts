import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const posts = await prisma.post.findMany({ where: { status: 'PUBLISHED' } });
  return [{ url: baseUrl, lastModified: new Date() }, ...posts.map((post) => ({ url: `${baseUrl}/posts/${post.slug}`, lastModified: post.updatedAt }))];
}
