import { cx } from 'class-variance-authority';
import { forwardRef, HTMLAttributes } from 'react';

export const TextInput = forwardRef<HTMLInputElement, HTMLAttributes<HTMLInputElement>>(
  function TextInputNoRef({ className, ...props }, ref) {
    return (
      <input
        ref={ref}
        type="text"
        className={cx(
          'text-md border-primary focus-ring block w-full rounded-sm',
          className
        )}
        {...props}
      />
    );
  }
);
