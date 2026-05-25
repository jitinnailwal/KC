import { v2 as cloudinary } from 'cloudinary';

const CLOUDINARY_ENV_KEYS = [
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET',
] as const;

export function getMissingCloudinaryEnvVars() {
  return CLOUDINARY_ENV_KEYS.filter((key) => !process.env[key]);
}

export function getCloudinaryCredentials() {
  return {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
    apiKey: process.env.CLOUDINARY_API_KEY || '',
    apiSecret: process.env.CLOUDINARY_API_SECRET || '',
  };
}

export function assertCloudinaryConfigured() {
  const missing = getMissingCloudinaryEnvVars();

  if (missing.length > 0) {
    throw new Error(`Missing Cloudinary environment variables: ${missing.join(', ')}`);
  }

  return getCloudinaryCredentials();
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
