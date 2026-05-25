import { fetchJson } from '@/lib/fetch-json';
import {
  buildCloudinaryDeliveryUrl,
  getImageUploadConfig,
  ImageUploadPurpose,
  validateImageFile,
} from '@/lib/upload-config';

type UploadSignatureResponse = {
  apiKey: string;
  cloudName: string;
  uploadUrl: string;
  params: Record<string, string | number>;
};

type CloudinaryUploadResponse = {
  error?: {
    message?: string;
  };
  format?: string;
  public_id?: string;
  secure_url?: string;
  version?: number;
};

export type UploadedImage = {
  url: string;
  originalUrl: string;
  publicId: string;
};

type UploadFailureLog = {
  message: string;
  phase: string;
  purpose: ImageUploadPurpose;
  size: number;
  status?: number;
  type: string;
};

function parseCloudinaryResponse(text: string): CloudinaryUploadResponse {
  if (!text) return {};

  try {
    return JSON.parse(text) as CloudinaryUploadResponse;
  } catch {
    return {};
  }
}

function getCloudinaryError(payload: CloudinaryUploadResponse, status: number) {
  return payload.error?.message || `Cloudinary upload failed (${status})`;
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Upload failed';
}

async function reportUploadFailure(payload: UploadFailureLog) {
  try {
    await fetch('/api/upload/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    // Logging should never block the admin from seeing the upload error.
  }
}

export async function uploadImage(file: File, purpose: ImageUploadPurpose): Promise<UploadedImage> {
  const validationError = validateImageFile(file);

  if (validationError) {
    throw new Error(validationError);
  }

  const signature = await fetchJson<UploadSignatureResponse>(
    await fetch('/api/upload/signature', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ purpose }),
    })
  );

  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', signature.apiKey);

  Object.entries(signature.params).forEach(([key, value]) => {
    formData.append(key, String(value));
  });

  let response: Response;

  try {
    response = await fetch(signature.uploadUrl, {
      method: 'POST',
      body: formData,
    });
  } catch (error) {
    const message = getErrorMessage(error);

    console.error('[upload] Cloudinary direct upload request failed', {
      message,
      purpose,
      type: file.type,
      size: file.size,
    });
    await reportUploadFailure({
      message,
      phase: 'cloudinary_request',
      purpose,
      size: file.size,
      type: file.type,
    });

    throw new Error('Could not reach Cloudinary upload service.');
  }

  const payload = parseCloudinaryResponse(await response.text());

  if (!response.ok) {
    const message = getCloudinaryError(payload, response.status);
    console.error('[upload] Cloudinary direct upload failed', {
      message,
      purpose,
      status: response.status,
      type: file.type,
      size: file.size,
    });
    await reportUploadFailure({
      message,
      phase: 'cloudinary_response',
      purpose,
      size: file.size,
      status: response.status,
      type: file.type,
    });
    throw new Error(message);
  }

  if (!payload.public_id || !payload.secure_url) {
    console.error('[upload] Cloudinary response missing asset fields', {
      purpose,
      status: response.status,
      hasPublicId: Boolean(payload.public_id),
      hasSecureUrl: Boolean(payload.secure_url),
    });
    await reportUploadFailure({
      message: 'Cloudinary response missing asset fields',
      phase: 'cloudinary_response',
      purpose,
      size: file.size,
      status: response.status,
      type: file.type,
    });
    throw new Error('Cloudinary upload completed without an image URL.');
  }

  return {
    url: buildCloudinaryDeliveryUrl({
      cloudName: signature.cloudName,
      publicId: payload.public_id,
      version: payload.version,
      format: payload.format,
      transformation: getImageUploadConfig(purpose).deliveryTransformation,
    }),
    originalUrl: payload.secure_url,
    publicId: payload.public_id,
  };
}
