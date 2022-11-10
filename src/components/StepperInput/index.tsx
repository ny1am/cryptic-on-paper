import cn from 'clsx';
import { forwardRef, HTMLAttributes } from 'react';

export const StepperInput = forwardRef<
  HTMLInputElement,
  HTMLAttributes<HTMLInputElement>
>(function TextInputNoRef({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      type="number"
      className={cn('block w-full rounded-md text-sm focus:outline-none', className)}
      {...props}
    />
  );
});
