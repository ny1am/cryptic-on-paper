import { cx } from 'class-variance-authority';
import { forwardRef, HTMLAttributes } from 'react';

export const StepperInput = forwardRef<
  HTMLInputElement,
  HTMLAttributes<HTMLInputElement>
>(function StepperInputInner({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      type="number"
      className={cx(
        'text-md block w-full rounded-xs border-primary focus-ring',
        className
      )}
      {...props}
    />
  );
});
