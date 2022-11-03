import cn from 'clsx';
import { forwardRef, PropsWithChildren } from 'react';

interface ButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    PropsWithChildren,
    React.AriaAttributes {
  primary?: boolean;
  secondary?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function ButtonNoRef(
  { className, primary, secondary, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex justify-center rounded-md border px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
        primary
          ? 'text-white border-transparent bg-indigo-600 hover:bg-indigo-700'
          : secondary
          ? 'text-indigo-700 border-indigo-700 bg-indigo-50 hover:bg-indigo-100'
          : 'text-gray-700 border-gray-300 bg-white hover:text-gray-500',
        className
      )}
      {...props}
    />
  );
});
