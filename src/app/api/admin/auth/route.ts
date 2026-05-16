import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const runtime = 'nodejs';

const ADMIN_USER = process.env.ADMIN_USER;
const ADMIN_PASS = process.env.ADMIN_PASS;
const SESSION_NAME = 'kc_admin_session';
const SESSION_VALUE = 'authenticated';
const MAX_AGE = 60 * 60 * 24; // 24 hours

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body as { username?: string; password?: string };

    if (!ADMIN_USER || !ADMIN_PASS) {
      return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
    }

    if (username === ADMIN_USER && password === ADMIN_PASS) {
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
