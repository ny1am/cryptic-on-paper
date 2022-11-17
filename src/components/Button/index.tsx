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
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function ButtonNoRef(
  { className, primary, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex justify-center rounded-sm border px-4 py-2 text-sm font-medium',
        primary
          ? 'text-white border-transparent bg-indigo-600 hover:bg-indigo-700 focus:bg-indigo-700 dark:bg-indigo-300 dark:hover:bg-indigo-200 dark:focus:bg-indigo-200 dark:text-gray-900'
          : 'border-primary text-gray-700 hover:text-gray-500 focus:text-gray-500 dark:text-gray-300 dark:hover:text-gray-100 dark:focus:text-gray-100',
        className
      )}
      {...props}
    />
  );
});
