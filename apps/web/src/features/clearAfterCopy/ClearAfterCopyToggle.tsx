import { useId } from 'react';

import { useClearAfterCopyActions, useIsClearAfterCopyEnabled } from './store';

export function ClearAfterCopyToggle() {
  const enabled = useIsClearAfterCopyEnabled();
  const { setEnabled } = useClearAfterCopyActions();

  const id = useId();
  return (
    <div className="max-w-[15rem]">
      <div className="flex items-center gap-2">
        <input
          id={id}
          type="checkbox"
          checked={enabled}
          onChange={({ target }) => void setEnabled(target.checked)}
          className="focus-ring h-4 w-4 shrink-0 rounded-sm border-slate-500 bg-slate-800 text-indigo-400 ring-offset-slate-900 focus:ring-offset-2"
          data-test="checkbox-clear-after-copy"
        />
        <label htmlFor={id} className="select-none text-sm text-gray-200">
          Clear after copy
        </label>
      </div>
      <p className="mt-1 pl-6 text-xs leading-snug text-gray-400">
        Wipes the message and the ciphers as soon as you copy. You can undo it right
        after.
      </p>
    </div>
  );
}
