type ErrorPayload = {
  error?: unknown;
  details?: unknown;
};

function errorMessageFromPayload(payload: unknown, fallback: string) {
  if (!payload || typeof payload !== 'object') return fallback;

  const { error, details } = payload as ErrorPayload;
  if (typeof error === 'string') {
    return typeof details === 'string' ? `${error}: ${details}` : error;
  }

  return fallback;
}

export async function fetchJson<T>(response: Response): Promise<T> {
  const text = await response.text();
  let payload: unknown = null;

  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      throw new Error(`Invalid JSON response (${response.status})`);
    }
  }

  if (!response.ok) {
    throw new Error(
      errorMessageFromPayload(payload, `Request failed (${response.status})`)
    );
  }

  if (payload === null) {
    throw new Error('Empty JSON response');
  }

  return payload as T;
}

export function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Something went wrong';
}
