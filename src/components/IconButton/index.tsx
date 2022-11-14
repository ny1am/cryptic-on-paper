import { cx } from 'class-variance-authority';
import React, { cloneElement, forwardRef, ReactElement } from 'react';

import { ConditionalWrapper } from '@/components/ConditionalWrapper';
import { Tooltip } from '@/components/Tooltip';

interface IconButtonProps {
  title: string;
  className?: string;
  icon: ReactElement;
  disabled?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  noTooltip?: boolean;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButtonNoRef(
    { title, className, onClick, icon, disabled, noTooltip },
    ref
  ) {
    return (
      <ConditionalWrapper
        condition={!noTooltip}
        wrapper={(children) => <Tooltip label={title}>{children}</Tooltip>}
      >
        <button
          ref={ref}
          type="button"
          className={cx(
            'w-8 h-8 inline-flex items-center justify-center rounded-sm opacity-50 disabled:!opacity-10 hover:opacity-100 focus:opacity-100 dark:opacity-70 dark:hover:opacity-100 dark:focus:opacity-100',
            className
          )}
          disabled={disabled}
          onClick={onClick}
        >
          {cloneElement(icon, { 'aria-hidden': true })}
          <span className="sr-only">{title}</span>
        </button>
      </ConditionalWrapper>
    );
  }
);
