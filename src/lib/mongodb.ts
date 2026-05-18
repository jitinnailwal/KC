import dns from 'dns';
import mongoose from 'mongoose';

// Fix Node.js DNS SRV resolution on Windows by using public DNS servers
dns.setServers(['8.8.8.8', '1.1.1.1']);

const MONGODB_URI = process.env.MONGODB_URI;
const SERVER_SELECTION_TIMEOUT_MS = Number.parseInt(
  process.env.MONGODB_SERVER_SELECTION_TIMEOUT_MS || '5000',
  10
);
const CONNECT_TIMEOUT_MS = Number.parseInt(
  process.env.MONGODB_CONNECT_TIMEOUT_MS || '10000',
  10
);

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

type ErrorWithDetails = {
  code?: unknown;
  name?: unknown;
  message?: unknown;
  cause?: unknown;
};

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

async function dbConnect() {
  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable in .env.local');
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        serverSelectionTimeoutMS: Number.isFinite(SERVER_SELECTION_TIMEOUT_MS)
          ? SERVER_SELECTION_TIMEOUT_MS
          : 5000,
        connectTimeoutMS: Number.isFinite(CONNECT_TIMEOUT_MS)
          ? CONNECT_TIMEOUT_MS
          : 10000,
        maxPoolSize: 10,
      })
      .then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default dbConnect;

function collectErrorText(error: unknown): string {
  if (!error || typeof error !== 'object') {
    return String(error);
  }

  const details = error as ErrorWithDetails;
  const current = [details.name, details.code, details.message]
    .filter((value): value is string => typeof value === 'string')
    .join(' ');

  return details.cause ? `${current} ${collectErrorText(details.cause)}` : current;
}

export function isMongoConnectionError(error: unknown) {
  const text = collectErrorText(error).toLowerCase();

  return [
    'mongodb_uri',
    'querysrv',
    'econnrefused',
    'enotfound',
    'etimedout',
    'eai_again',
    'server selection',
    'buffering timed out',
    'topology is closed',
    'connection timed out',
  ].some((token) => text.includes(token));
}
