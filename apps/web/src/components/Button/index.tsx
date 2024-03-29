import { cva, VariantProps } from 'class-variance-authority';
import { forwardRef, PropsWithChildren } from 'react';

const buttonCva = cva(
  'inline-flex justify-center rounded-sm border px-4 py-2 text-sm font-medium',
  {
    variants: {
      intent: {
        primary:
          'border-transparent bg-indigo-300 hover:bg-indigo-200 focus:bg-indigo-200 text-gray-900',
        cancel: 'border-primary text-gray-300 hover:text-gray-100 focus:text-gray-100',
      },
    },
  }
);

interface ButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    PropsWithChildren,
    React.AriaAttributes,
    VariantProps<typeof buttonCva> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function ButtonInner(
  { className, intent, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      type="button"
      className={buttonCva({ intent, className })}
      {...props}
    />
  );
});
