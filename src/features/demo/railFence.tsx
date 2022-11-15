import cn from 'clsx';

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
    <div
      className="h-[150px] flex flex-col items-center justify-center border-t border-b border-dashed border-indigo-200"
      aria-hidden="true"
    >
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
            className={cn(
              'inline-flex justify-center items-center text-[9px] font-semibold text-indigo-700 w-4 aspect-square',
              value && 'border border-solid border-indigo-200 bg-indigo-50'
            )}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}
