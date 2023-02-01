import { cx } from 'class-variance-authority';

type Props = {
  text: string;
  className?: string;
};

export function TextBlock({ text, className }: Props) {
  return (
    <pre
      className={cx(
        'border-primary w-full grow overflow-y-auto whitespace-pre-wrap break-all rounded-sm bg-indigo-50/50 p-2 text-sm dark:bg-slate-700/50',
        className
      )}
      data-test="text-ciphertext"
    >
      {text}
    </pre>
  );
}
