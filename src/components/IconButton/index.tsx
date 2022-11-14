import cn from 'clsx';
import React, { cloneElement, ReactElement } from 'react';

import { Tooltip } from '@/components/Tooltip';

interface IconButtonProps {
  title: string;
  className?: string;
  icon: ReactElement;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function IconButton({ title, className, icon, onClick }: IconButtonProps) {
  return (
    <Tooltip label={title}>
      <button
        type="button"
        className={cn(
          'w-8 h-8 inline-flex items-center justify-center rounded-sm opacity-50 hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-indigo-500',
          className
        )}
        onClick={onClick}
      >
        {cloneElement(icon, { 'aria-hidden': true })}
        <span className="sr-only">{title}</span>
      </button>
    </Tooltip>
  );
}
