import { PostStatus } from '@prisma/client';
import { prisma } from './prisma';
export async function getPublishedPosts(page = 1, pageSize = 10) {
  return prisma.post.findMany({ where: { status: PostStatus.PUBLISHED, publishedAt: { lte: new Date() } }, include: { author: true, tags: { include: { tag: true } } }, orderBy: { publishedAt: 'desc' }, skip: (page - 1) * pageSize, take: pageSize });
}
