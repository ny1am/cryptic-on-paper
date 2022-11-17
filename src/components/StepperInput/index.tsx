import cn from 'clsx';
import { forwardRef, HTMLAttributes } from 'react';

export const StepperInput = forwardRef<
  HTMLInputElement,
  HTMLAttributes<HTMLInputElement>
>(function StepperInputNoRef({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      type="number"
      className={cn(
        'block w-full rounded-sm text-sm border-primary focus-ring',
        className
      )}
      {...props}
    />
  );
});
