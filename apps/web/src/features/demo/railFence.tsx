import { createCaretIterator } from '@cop/ciphers';
import { cx } from 'class-variance-authority';
import { useEffect, useMemo, useRef } from 'react';

import { useThrottle } from '@/hooks';
import { autoAnimate } from '@/lib/auto-animate';

interface RailFenceDemoProps {
  height: number;
}

export function RailFenceDemo(props: RailFenceDemoProps) {
  const originalText = 'supersecrettext'.toUpperCase();

  const height = useThrottle(props.height, 400);

  const matrix = useMemo(() => {
    const result = Array.from({ length: height }, (_, i) =>
      Array.from({ length: originalText.length }, (_, j) => ({
        key: `${i}_${j}`,
        value: '',
      }))
    );

    const caretIterator = createCaretIterator(height);
    for (let i = 0; i < originalText.length; i++) {
      const caretState = caretIterator.next();
      result[caretState.value][i] = { key: `${i}`, value: originalText[i] };
    }
    return result;
  }, [originalText, height]);

  const length = originalText.length;

  const parentRef = useRef(null);
  useEffect(() => {
    parentRef.current && autoAnimate(parentRef.current);
  }, [parentRef]);

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
            'inline-flex aspect-square w-4 items-center justify-center text-[9px] font-semibold text-indigo-700 dark:text-slate-100',
            value && 'border-primary bg-indigo-50 dark:bg-slate-700'
          )}
        >
          {value}
        </li>
      ))}
    </ul>
  );
}
