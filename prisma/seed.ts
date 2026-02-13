import bcrypt from 'bcryptjs';
import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL ?? 'admin@example.com';
  const password = process.env.ADMIN_PASSWORD ?? 'ChangeMe123!';
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: { role: Role.ADMIN, passwordHash },
    create: { email, name: 'Admin', role: Role.ADMIN, passwordHash },
  });

  const tag = await prisma.tag.upsert({
    where: { slug: 'getting-started' },
    update: {},
    create: { slug: 'getting-started', name: 'Getting Started' },
  });

  const admin = await prisma.user.findUniqueOrThrow({ where: { email } });

  await prisma.post.upsert({
    where: { slug: 'hello-blog' },
    update: {},
    create: {
      slug: 'hello-blog',
      title: 'Hello Blog',
      excerpt: 'Your first post is here.',
      content: '# Hello Blog\n\nWelcome to your production-ready blog CMS.',
      status: 'PUBLISHED',
      publishedAt: new Date(),
      readTimeMins: 1,
      authorId: admin.id,
      tags: { create: [{ tagId: tag.id }] },
    },
  });
}

main().finally(() => prisma.$disconnect());
