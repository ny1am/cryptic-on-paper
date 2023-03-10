import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import copyToClipboard from 'clipboard-copy';
import { useCallback } from 'react';

import { IconButton } from '@/components/IconButton';
import { success } from '@/components/Toast';

type Props = {
  text: string;
};

export function CopyToClipboardButton({ text }: Props) {
  const copy = useCallback(async () => {
    if (text) {
      await copyToClipboard(text);
      success('Copied to clipboard!', { id: 'clipboard' });
    }
  }, [text]);

  return (
    <IconButton
      type="button"
      title="Copy to clipboard"
      icon={<ClipboardDocumentListIcon className="h-5" />}
      onClick={copy}
    />
  );
}
