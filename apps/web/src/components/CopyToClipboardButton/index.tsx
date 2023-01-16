import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import copyToClipboard from 'copy-to-clipboard';
import { useCallback } from 'react';

import { IconButton } from '@/components/IconButton';
import { success } from '@/components/Toast';

type Props = {
  text: string;
};

export function CopyToClipboardButton({ text }: Props) {
  const copy = useCallback(() => {
    if (text) {
      copyToClipboard(text);
      success('Copied to clipboard!', { id: 'clipboard' });
    }
  }, [text]);

  return (
    <IconButton
      title="Copy to clipboard"
      icon={<ClipboardDocumentListIcon className="h-5" />}
      onClick={copy}
    />
  );
}
