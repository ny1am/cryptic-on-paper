import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import copyToClipboard from 'clipboard-copy';
import { useCallback } from 'react';

import { IconButton } from '@/components/IconButton';
import { success } from '@/components/Toast';

type Props = {
  text: string;
  title?: string;
  /** marks the button as running a non-default copy behaviour */
  indicator?: boolean;
  className?: string;
  'data-test'?: string;
  /** takes over the user feedback once the text landed in the clipboard */
  onCopied?: VoidFunction;
};

export function CopyToClipboardButton({
  text,
  title = 'Copy to clipboard',
  indicator,
  className,
  onCopied,
  'data-test': dataTest,
}: Props) {
  const copy = useCallback(async () => {
    if (!text) {
      return;
    }
    await copyToClipboard(text);
    if (onCopied) {
      onCopied();
    } else {
      success('Copied to clipboard!', { id: 'clipboard' });
    }
  }, [text, onCopied]);

  return (
    <IconButton
      type="button"
      title={title}
      className={className}
      data-test={dataTest}
      icon={
        <span className="relative inline-flex">
          <ClipboardDocumentListIcon className="h-5" />
          {indicator && (
            <span className="absolute -right-px -top-px h-1.5 w-1.5 rounded-full bg-indigo-300" />
          )}
        </span>
      }
      onClick={copy}
    />
  );
}
