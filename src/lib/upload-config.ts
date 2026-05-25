export const ALLOWED_IMAGE_TYPES = [
  'image/avif',
  'image/gif',
  'image/jpeg',
  'image/png',
  'image/webp',
] as const;

export const MAX_IMAGE_UPLOAD_BYTES = 10 * 1024 * 1024;
export const VERCEL_PROXY_UPLOAD_LIMIT_BYTES = 4 * 1024 * 1024;

export const IMAGE_UPLOAD_PURPOSES = {
  blog: {
    folder: 'kreativecatalyst/blog',
    deliveryTransformation: 'c_fill,g_auto,w_1200,h_630,q_auto,f_auto',
  },
  'case-study': {
    folder: 'kreativecatalyst/case-studies',
    deliveryTransformation: 'c_fill,g_auto,w_1200,h_630,q_auto,f_auto',
  },
  review: {
    folder: 'kreativecatalyst/reviews',
    deliveryTransformation: 'c_fill,g_face,w_600,h_600,q_auto,f_auto',
  },
  seo: {
    folder: 'kreativecatalyst/seo',
    deliveryTransformation: 'c_fill,g_auto,w_1200,h_630,q_auto,f_auto',
  },
} as const;

export type ImageUploadPurpose = keyof typeof IMAGE_UPLOAD_PURPOSES;

export function isImageUploadPurpose(value: unknown): value is ImageUploadPurpose {
  return typeof value === 'string' && value in IMAGE_UPLOAD_PURPOSES;
}

export function getImageUploadConfig(purpose: ImageUploadPurpose) {
  return IMAGE_UPLOAD_PURPOSES[purpose];
}

export function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.ceil(bytes / 1024)} KB`;
  return `${Math.ceil((bytes / (1024 * 1024)) * 10) / 10} MB`;
}

export function validateImageFile(file: File) {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type as (typeof ALLOWED_IMAGE_TYPES)[number])) {
    return `Unsupported image type. Use JPG, PNG, WebP, AVIF, or GIF.`;
  }

  if (file.size > MAX_IMAGE_UPLOAD_BYTES) {
    return `Image is too large. Maximum size is ${formatBytes(MAX_IMAGE_UPLOAD_BYTES)}.`;
  }

  return null;
}

type CloudinaryDeliveryAsset = {
  cloudName: string;
  publicId: string;
  version?: number;
  format?: string;
  transformation: string;
};

export function buildCloudinaryDeliveryUrl({
  cloudName,
  publicId,
  version,
  format,
  transformation,
}: CloudinaryDeliveryAsset) {
  const versionPath = version ? `/v${version}` : '';
  const extension = format ? `.${format}` : '';
  const encodedPublicId = publicId.split('/').map(encodeURIComponent).join('/');

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformation}${versionPath}/${encodedPublicId}${extension}`;
}
