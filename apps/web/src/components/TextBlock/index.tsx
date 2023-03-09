import { cx } from 'class-variance-authority';

type Props = {
  text: string;
  className?: string;
  showNumberOfChars?: boolean;
  'data-test'?: string;
};

export function TextBlock(props: Props) {
  return (
    <pre
      className={cx(
        'border-primary flex w-full grow flex-col overflow-y-auto whitespace-pre-wrap break-all rounded-sm bg-slate-700/50 p-2 text-sm',
        props.className
      )}
    >
      <span className="grow" data-test={props['data-test']}>
        {props.text}
      </span>
      {props.showNumberOfChars && (
        <span className="pt-2 text-right text-2xs leading-none text-slate-400">
          {props.text.length} chars
        </span>
      )}
    </pre>
  );
}
