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
        'inline-flex justify-center rounded-sm border px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
        primary
          ? 'text-white border-transparent bg-indigo-600 hover:bg-indigo-700'
          : 'text-gray-700 border-indigo-100 bg-white hover:text-gray-500',
        className
      )}
      {...props}
    />
  );
});
