import { NextRequest, NextResponse } from 'next/server';

const SESSION_NAME = 'kc_admin_session';
const SESSION_VALUE = 'authenticated';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin pages (except login)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const session = request.cookies.get(SESSION_NAME);

    if (session?.value !== SESSION_VALUE) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
