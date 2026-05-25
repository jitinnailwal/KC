import { NextRequest, NextResponse } from 'next/server';
import cloudinary, { assertCloudinaryConfigured } from '@/lib/cloudinary';
import { requireAuth } from '@/lib/auth';
import {
  ALLOWED_IMAGE_TYPES,
  getImageUploadConfig,
  ImageUploadPurpose,
  isImageUploadPurpose,
  MAX_IMAGE_UPLOAD_BYTES,
} from '@/lib/upload-config';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function getRequestId() {
  return globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`;
}

async function getPurpose(request: NextRequest): Promise<ImageUploadPurpose> {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return 'blog';
  }

  if (payload && typeof payload === 'object' && 'purpose' in payload) {
    const purpose = (payload as { purpose?: unknown }).purpose;
    if (isImageUploadPurpose(purpose)) return purpose;
  }

  return 'blog';
}

export async function POST(request: NextRequest) {
  const requestId = getRequestId();

  try {
    const authError = await requireAuth();
    if (authError) return authError;

    const purpose = await getPurpose(request);
    const config = getImageUploadConfig(purpose);
    const { apiKey, apiSecret, cloudName } = assertCloudinaryConfigured();
    const timestamp = Math.round(Date.now() / 1000);
    const params = {
      folder: config.folder,
      tags: `kreativecatalyst,${purpose}`,
      timestamp,
    };
    const signature = cloudinary.utils.api_sign_request(params, apiSecret);

    console.info('[upload-signature] created signed Cloudinary upload params', {
      requestId,
      folder: config.folder,
      purpose,
    });

    return NextResponse.json({
      allowedTypes: ALLOWED_IMAGE_TYPES,
      apiKey,
      cloudName,
      maxBytes: MAX_IMAGE_UPLOAD_BYTES,
      params: {
        ...params,
        signature,
      },
      uploadUrl: `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    });
  } catch (error) {
    console.error('[upload-signature] failed to create upload signature', {
      error: error instanceof Error ? error.message : error,
      requestId,
    });

    return NextResponse.json(
      {
        error: 'Upload configuration is unavailable',
        requestId,
      },
      { status: 500 }
    );
  }
}
