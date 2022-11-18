import { cva, VariantProps } from 'class-variance-authority';
import { forwardRef, PropsWithChildren } from 'react';

const buttonCva = cva(
  'inline-flex justify-center rounded-sm border px-4 py-2 text-sm font-medium',
  {
    variants: {
      intent: {
        primary:
          'text-white border-transparent bg-indigo-600 hover:bg-indigo-700 focus:bg-indigo-700 dark:bg-indigo-300 dark:hover:bg-indigo-200 dark:focus:bg-indigo-200 dark:text-gray-900',
        cancel:
          'border-primary text-gray-700 hover:text-gray-500 focus:text-gray-500 dark:text-gray-300 dark:hover:text-gray-100 dark:focus:text-gray-100',
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

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function ButtonNoRef(
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
