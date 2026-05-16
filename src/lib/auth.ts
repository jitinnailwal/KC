import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const SESSION_NAME = 'kc_admin_session';
const SESSION_VALUE = 'authenticated';

/**
 * Verify the admin session cookie. Returns null if authenticated,
 * or a 401 NextResponse if not.
 */
export async function requireAuth(): Promise<NextResponse | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_NAME);

  if (session?.value === SESSION_VALUE) {
    return null;
  }

  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
