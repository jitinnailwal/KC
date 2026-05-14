'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h2 className="font-heading font-bold text-2xl mb-4">Something went wrong</h2>
        <p className="text-light-300/60 mb-6">{error.message}</p>
        <button
          onClick={reset}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-accent-blue to-accent-gold text-dark-900 font-semibold"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
