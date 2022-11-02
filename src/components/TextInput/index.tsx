import cn from 'clsx';
import { forwardRef, HTMLAttributes } from 'react';

export const TextInput = forwardRef<HTMLInputElement, HTMLAttributes<HTMLInputElement>>(
  function TextInputNoRef({ className, ...props }, ref) {
    return (
      <input
        ref={ref}
        type="text"
        className={cn(
          'block w-full rounded-md text-sm focus:outline-none shadow-sm',
          className
        )}
        {...props}
      />
    );
  }
);
