import bcrypt from 'bcryptjs';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Email from 'next-auth/providers/email';
import { prisma } from './prisma';
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'database' },
  providers: [Email({ server: process.env.EMAIL_SERVER, from: process.env.EMAIL_FROM }), Credentials({ credentials: { email: { label: 'Email', type: 'email' }, password: { label: 'Password', type: 'password' } }, async authorize(credentials) { if (!credentials?.email || !credentials.password) return null; const user = await prisma.user.findUnique({ where: { email: String(credentials.email) } }); if (!user?.passwordHash) return null; return (await bcrypt.compare(String(credentials.password), user.passwordHash)) ? { id: user.id, email: user.email, name: user.name, role: user.role } : null; } })],
  callbacks: { async session({ session, user }) { if (session.user) { (session.user as { id: string; role: string }).id = user.id; (session.user as { id: string; role: string }).role = user.role; } return session; } },
  pages: { signIn: '/admin/login' },
});
