import { cx } from 'class-variance-authority';

type Props = {
  text: string;
  className?: string;
};

export function TextBlock({ text, className }: Props) {
  return (
    <pre
      className={cx(
        'w-full grow text-sm break-all whitespace-pre-wrap bg-indigo-50/50 overflow-y-auto p-2 rounded-sm border-primary dark:bg-slate-700/50',
        className
      )}
      data-test="text-ciphertext"
    >
      {text}
    </pre>
  );
}
