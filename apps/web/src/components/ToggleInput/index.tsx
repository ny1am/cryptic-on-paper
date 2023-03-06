import { cx } from 'class-variance-authority';
import { forwardRef, useCallback } from 'react';

import { Switch } from '@/lib/headlessui';

type Props = {
  value: boolean;
  onChange: (v: any) => void;
  label: string;
  name: string;
};

export const ToggleInput = forwardRef<HTMLButtonElement, Props>(function ToggleInputInner(
  props,
  ref
) {
  const { value: enabled, onChange, label, name } = props;
  console.log(props);
  const setEnabled = useCallback(() => {
    const e = { target: { name, value: !enabled, checked: !enabled } };
    // console.log(e);
    onChange(e);
  }, [enabled, onChange, name]);

  return (
    <Switch
      ref={ref}
      checked={enabled}
      onChange={setEnabled}
      name={name}
      className={cx(
        enabled ? 'bg-indigo-600' : 'bg-gray-200',
        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
      )}
    >
      <span className="sr-only">{label}</span>
      <span
        aria-hidden="true"
        className={cx(
          enabled ? 'translate-x-5' : 'translate-x-0',
          'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
        )}
      />
    </Switch>
  );
});
