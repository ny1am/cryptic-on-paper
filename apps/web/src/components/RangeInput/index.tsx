import './range.scss';

import { forwardRef, HTMLAttributes, useMemo } from 'react';

type RangeInputProps = HTMLAttributes<HTMLInputElement> & {
  min: number;
  max: number;
};

export const RangeInput = forwardRef<HTMLInputElement, RangeInputProps>(
  function RangeInputNoRef(props, ref) {
    const { min, max } = props;
    const marks = useMemo(
      () => Array.from({ length: max - min + 1 }, (_, i) => `${min + i}`),
      [min, max]
    );
    return (
      <div className="mt-1">
        <input ref={ref} type="range" step="1" {...props} />
        <div
          className="relative text-xs text-gray-500 flex justify-between dark:text-gray-400"
          aria-hidden="true"
        >
          {marks.map((v) => (
            <span key={v} className="w-3 text-center">
              {v}
            </span>
          ))}
        </div>
      </div>
    );
  }
);
