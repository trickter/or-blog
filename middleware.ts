import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';

export default auth((req: NextRequest & { auth?: { user?: { role?: string } } }) => {
  if (req.nextUrl.pathname.startsWith('/admin') && !req.nextUrl.pathname.startsWith('/admin/login')) {
    if (!req.auth?.user || req.auth.user.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }
  return NextResponse.next();
});

export const config = { matcher: ['/admin/:path*'] };
