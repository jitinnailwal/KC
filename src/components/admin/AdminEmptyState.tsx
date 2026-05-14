'use client';

interface AdminEmptyStateProps {
  title: string;
  actionLabel: string;
  onAction: () => void;
  accentClass?: string;
}

export default function AdminEmptyState({
  title,
  actionLabel,
  onAction,
  accentClass = 'text-accent-blue',
}: AdminEmptyStateProps) {
  return (
    <div className="text-center py-20">
      <p className="text-light-300/40 mb-4">{title}</p>
      <button
        onClick={onAction}
        className={`${accentClass} text-sm hover:underline`}
      >
        {actionLabel}
      </button>
    </div>
  );
}
