import { cx } from 'class-variance-authority';
import { forwardRef, HTMLAttributes } from 'react';

export const TextInput = forwardRef<HTMLInputElement, HTMLAttributes<HTMLInputElement>>(
  function TextInputInner({ className, ...props }, ref) {
    return (
      <input
        ref={ref}
        type="text"
        className={cx(
          'text-md block w-full rounded-xs border-primary focus-ring',
          className
        )}
        {...props}
      />
    );
  }
);
