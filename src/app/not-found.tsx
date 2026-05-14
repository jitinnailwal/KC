import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-heading font-bold text-6xl text-gradient mb-4">404</h1>
        <h2 className="font-heading font-semibold text-xl mb-4">Page Not Found</h2>
        <p className="text-light-300/60 mb-8">The page you are looking for does not exist.</p>
        <Link
          href="/"
          className="px-6 py-3 rounded-full bg-gradient-to-r from-accent-blue to-accent-gold text-dark-900 font-semibold inline-block"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
