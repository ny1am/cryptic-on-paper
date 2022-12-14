import { createCaretIterator } from '@cop/ciphers';
import { cx } from 'class-variance-authority';
import { useMemo } from 'react';

import { useAutoAnimate } from '@/lib/auto-animate';

interface RailFenceDemoProps {
  height: number;
}

export function RailFenceDemo({ height }: RailFenceDemoProps) {
  const originalText = 'supersecrettext'.toUpperCase();

  const matrix = useMemo(() => {
    const result = new Array(height)
      .fill(new Array(originalText.length).fill(''))
      .map((arr, i) =>
        arr.map((_: unknown, j: number) => ({ key: `${i}_${j}`, value: '' }))
      );
    const caretIterator = createCaretIterator(height);
    for (let i = 0; i < originalText.length; i++) {
      const caretState = caretIterator.next();
      result[caretState.value][i] = { key: `${i}`, value: originalText[i] };
    }
    return result;
  }, [originalText, height]);

  const length = originalText.length;
  const [parentRef] = useAutoAnimate<HTMLUListElement>();
  return (
    <ul
      ref={parentRef}
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
