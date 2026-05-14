import { NextResponse } from 'next/server';

export function jsonError(
  error: unknown,
  message = 'Request failed',
  status = 500
) {
  console.error(message, error);

  const payload: { error: string; details?: string } = { error: message };
  if (process.env.NODE_ENV !== 'production') {
    payload.details = error instanceof Error ? error.message : String(error);
  }

  return NextResponse.json(payload, { status });
}
