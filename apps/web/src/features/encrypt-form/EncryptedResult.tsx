import { encrypt } from '@cop/ciphers';
import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import copyToClipboard from 'copy-to-clipboard';
import { useCallback, useDeferredValue, useMemo } from 'react';

import { IconButton } from '@/components/IconButton';
import { TextBlock } from '@/components/TextBlock';
import { success } from '@/components/Toast';
import { createCipher } from '@/features/config';
import { ExplainButton } from '@/features/explain';
import { usePipeCiphers } from '@/features/pipe';

interface Props {
  text: string;
}

export function EncryptedResult({ text }: Props) {
  const selectedCiphers = usePipeCiphers();
  const deferredText = useDeferredValue(text);

  const pipe = useMemo(
    () => selectedCiphers.map(({ meta }) => createCipher(meta)),
    [selectedCiphers]
  );

  const cipherText = useMemo(() => encrypt(pipe, deferredText), [pipe, deferredText]);

  const copy = useCallback(() => {
    if (cipherText) {
      copyToClipboard(cipherText);
      success('Copied to clipboard!', { id: 'clipboard' });
    }
  }, [cipherText]);

  return (
    <div className="mt-2 grow flex flex-col items-end lg:mt-6">
      <div className="mb-1 w-full flex justify-between items-end">
        <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Encrypted message
        </span>
        <div className="flex gap-1">
          <ExplainButton />
          <IconButton
            title="Copy to clipboard"
            icon={<ClipboardDocumentListIcon className="h-5" />}
            onClick={copy}
          />
        </div>
      </div>
      <TextBlock text={cipherText} className="min-h-[8rem]" />
    </div>
  );
}
