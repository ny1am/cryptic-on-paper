import { createCaretIterator } from '@cop/ciphers';
import { cx } from 'class-variance-authority';
import { forwardRef, useMemo } from 'react';

interface BaseRailFenceDemoProps {
  height: number;
}

export const BaseRailFenceDemo = forwardRef<HTMLUListElement, BaseRailFenceDemoProps>(
  function BaseRailFenceDemoInner({ height }, ref) {
    const originalText = 'supersecrettext'.toUpperCase();

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

    return (
      <ul
        ref={ref}
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
              'inline-flex aspect-square w-4 items-center justify-center text-[9px] font-semibold text-slate-100',
              value && 'border-primary bg-slate-700'
            )}
          >
            {value}
          </li>
        ))}
      </ul>
    );
  }
);
