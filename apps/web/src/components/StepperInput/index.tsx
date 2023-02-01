import { cx } from 'class-variance-authority';
import { forwardRef, HTMLAttributes } from 'react';

export const StepperInput = forwardRef<
  HTMLInputElement,
  HTMLAttributes<HTMLInputElement>
>(function StepperInputNoRef({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      type="number"
      className={cx(
        'text-md border-primary focus-ring block w-full rounded-sm',
        className
      )}
      {...props}
    />
  );
});
