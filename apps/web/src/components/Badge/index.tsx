import { cx } from 'class-variance-authority';
import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cx(
        'inline-flex items-center whitespace-pre-wrap rounded bg-slate-700 px-2 py-0.5 text-xs font-medium text-slate-200',
        className
      )}
    >
      {children}
    </span>
  );
}
