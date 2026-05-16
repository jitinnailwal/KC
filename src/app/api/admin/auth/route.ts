import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { timingSafeEqual } from 'crypto';
import { checkRateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';

const ADMIN_USER = process.env.ADMIN_USER;
const ADMIN_PASS = process.env.ADMIN_PASS;
const SESSION_NAME = 'kc_admin_session';
const SESSION_VALUE = 'authenticated';
const MAX_AGE = 60 * 60 * 24; // 24 hours

function timingSafeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a.padEnd(256, '\0'));
  const bufB = Buffer.from(b.padEnd(256, '\0'));
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
}

function getClientIp(request: NextRequest): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown';
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const { allowed, resetIn } = checkRateLimit(`auth:${ip}`, {
    maxRequests: 5,
    windowMs: 15 * 60_000, // 15 minutes
  });

  if (!allowed) {
    console.warn(`Rate limit exceeded for admin login from IP: ${ip}`);
    return NextResponse.json(
      { error: 'Too many login attempts. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(Math.ceil(resetIn / 1000)) } }
    );
  }

  try {
    const body = await request.json();
    const { username, password } = body as { username?: string; password?: string };

    if (!ADMIN_USER || !ADMIN_PASS) {
      return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
    }

    if (
      username &&
      password &&
      timingSafeCompare(username, ADMIN_USER) &&
      timingSafeCompare(password, ADMIN_PASS)
    ) {
      const cookieStore = await cookies();
      cookieStore.set(SESSION_NAME, SESSION_VALUE, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: MAX_AGE,
        path: '/',
      });

      return NextResponse.json({ success: true });
    }

    console.warn(`Failed admin login attempt from IP: ${ip}`);
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_NAME);

  if (session?.value === SESSION_VALUE) {
    return NextResponse.json({ authenticated: true });
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_NAME);
  return NextResponse.json({ success: true });
}
