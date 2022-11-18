import { cx } from 'class-variance-authority';

import { createCaretIterator } from '@/features/cipher';

interface RailFenceDemoProps {
  height: number;
}

export function RailFenceDemo({ height }: RailFenceDemoProps) {
  const originalText = 'supersecrettext'.toUpperCase();
  const length = originalText.length;

  const matrix = new Array(height).fill(new Array(length).fill('')).map((arr, i) =>
    arr.map((_: unknown, j: number) => ({
      key: (i + 1) * 100 + j, //unique random big number; use for animation maybe
      value: '',
    }))
  );

  const caretIterator = createCaretIterator(height);

  for (let i = 0; i < length; i++) {
    const caretState = caretIterator.next();
    matrix[caretState.value][i] = { key: i, value: originalText[i] };
  }

  return (
    <ul
      className="inline-grid gap-1"
      style={{
        gridTemplateColumns: `repeat(${length}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${height}, minmax(0, 1fr))`,
      }}
    >
      {matrix.flat().map(({ key, value }) => (
        <li
          key={key}
          className={cx(
            'inline-flex justify-center items-center text-[9px] font-semibold w-4 aspect-square text-indigo-700 dark:text-slate-100',
            value && 'border-primary bg-indigo-50 dark:bg-slate-700'
          )}
        >
          {value}
        </li>
      ))}
    </ul>
  );
}
