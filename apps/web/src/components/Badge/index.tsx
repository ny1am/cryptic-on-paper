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
        'inline-flex items-center rounded px-2 py-0.5 text-xs font-medium whitespace-pre-wrap text-indigo-800 bg-indigo-100 dark:text-slate-200 dark:bg-slate-700',
        className
      )}
    >
      {children}
    </span>
  );
}
