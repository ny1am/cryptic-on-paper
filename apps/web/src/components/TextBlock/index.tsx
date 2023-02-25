import { cx } from 'class-variance-authority';

type Props = {
  text: string;
  className?: string;
  showNumberOfChars?: boolean;
};

export function TextBlock({ text, className, showNumberOfChars }: Props) {
  return (
    <pre
      className={cx(
        'border-primary flex w-full grow flex-col overflow-y-auto whitespace-pre-wrap break-all rounded-sm bg-indigo-50/50 p-2 text-sm dark:bg-slate-700/50',
        className
      )}
      data-test="text-ciphertext"
    >
      <span className="grow">{text}</span>
      {showNumberOfChars && (
        <span className="pt-2 text-right text-2xs leading-none text-slate-500 dark:text-slate-400">
          {text.length} chars
        </span>
      )}
    </pre>
  );
}
