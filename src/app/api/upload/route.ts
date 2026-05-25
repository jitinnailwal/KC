import { NextRequest, NextResponse } from 'next/server';
import cloudinary, { assertCloudinaryConfigured } from '@/lib/cloudinary';
import { requireAuth } from '@/lib/auth';
import {
  buildCloudinaryDeliveryUrl,
  formatBytes,
  getImageUploadConfig,
  ImageUploadPurpose,
  isImageUploadPurpose,
  validateImageFile,
  VERCEL_PROXY_UPLOAD_LIMIT_BYTES,
} from '@/lib/upload-config';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function getRequestId() {
  return globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`;
}

function getPurpose(value: FormDataEntryValue | null): ImageUploadPurpose {
  return isImageUploadPurpose(value) ? value : 'blog';
}

export async function POST(request: NextRequest) {
  const requestId = getRequestId();

  try {
    const authError = await requireAuth();
    if (authError) return authError;

    const contentLength = Number(request.headers.get('content-length') || 0);

    if (contentLength > VERCEL_PROXY_UPLOAD_LIMIT_BYTES) {
      return NextResponse.json(
        {
          error: 'Image is too large for the server upload route',
          details: `Use the direct Cloudinary upload flow for files over ${formatBytes(VERCEL_PROXY_UPLOAD_LIMIT_BYTES)}.`,
          requestId,
        },
        { status: 413 }
      );
    }

    const formData = await request.formData();
    const fileValue = formData.get('file');
    const purpose = getPurpose(formData.get('purpose'));

    if (!(fileValue instanceof File)) {
      return NextResponse.json({ error: 'No file provided', requestId }, { status: 400 });
    }

    const file = fileValue;
    const validationError = validateImageFile(file);

    if (validationError) {
      return NextResponse.json(
        {
          error: validationError,
          requestId,
        },
        { status: 400 }
      );
    }

    const { cloudName } = assertCloudinaryConfigured();
    const uploadConfig = getImageUploadConfig(purpose);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = `data:${file.type};base64,${buffer.toString('base64')}`;

    const result = await cloudinary.uploader.upload(base64, {
      folder: uploadConfig.folder,
      resource_type: 'image',
      tags: ['kreativecatalyst', purpose],
    });

    console.info('[upload] proxied Cloudinary upload completed', {
      bytes: file.size,
      folder: uploadConfig.folder,
      purpose,
      requestId,
      type: file.type,
    });

    return NextResponse.json({
      url: buildCloudinaryDeliveryUrl({
        cloudName,
        publicId: result.public_id,
        version: result.version,
        format: result.format,
        transformation: uploadConfig.deliveryTransformation,
      }),
      originalUrl: result.secure_url,
      public_id: result.public_id,
      requestId,
    });
  } catch (error) {
    console.error('[upload] proxied Cloudinary upload failed', {
      error: error instanceof Error ? error.message : error,
      requestId,
    });

    return NextResponse.json(
      {
        error: 'Upload failed',
        details: error instanceof Error ? error.message : undefined,
        requestId,
      },
      { status: 500 }
    );
  }
}
