import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { isImageUploadPurpose } from '@/lib/upload-config';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function getRequestId() {
  return globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`;
}

function stringValue(value: unknown, fallback = 'unknown') {
  return typeof value === 'string' && value.trim() ? value.slice(0, 500) : fallback;
}

function numberValue(value: unknown) {
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined;
}

export async function POST(request: NextRequest) {
  const requestId = getRequestId();
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const body = await request.json();
    const purpose = body && typeof body === 'object' && 'purpose' in body
      ? (body as { purpose?: unknown }).purpose
      : undefined;

    console.error('[upload] client upload failed', {
      message: stringValue((body as { message?: unknown })?.message),
      phase: stringValue((body as { phase?: unknown })?.phase),
      purpose: isImageUploadPurpose(purpose) ? purpose : 'unknown',
      requestId,
      size: numberValue((body as { size?: unknown })?.size),
      status: numberValue((body as { status?: unknown })?.status),
      type: stringValue((body as { type?: unknown })?.type),
    });

    return NextResponse.json({ requestId, success: true });
  } catch (error) {
    console.error('[upload] failed to record client upload error', {
      error: error instanceof Error ? error.message : error,
      requestId,
    });

    return NextResponse.json({ requestId, success: false }, { status: 400 });
  }
}
