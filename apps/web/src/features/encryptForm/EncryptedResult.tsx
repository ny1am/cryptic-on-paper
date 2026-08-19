import { encrypt } from '@cop/ciphers';
import { useCallback, useDeferredValue, useMemo } from 'react';

import { CopyToClipboardButton } from '@/components/CopyToClipboardButton';
import { TextBlock } from '@/components/TextBlock';
import { success, successWithUndo } from '@/components/Toast';
import {
  ClearAfterCopyMenuButton,
  useIsClearAfterCopyEnabled,
  useSessionWipe,
} from '@/features/clearAfterCopy';
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

  const clearAfterCopy = useIsClearAfterCopyEnabled();
  const wipeSession = useSessionWipe();

  const handleCopied = useCallback(() => {
    if (!clearAfterCopy) {
      success('Copied to clipboard!', { id: 'clipboard' });
      return;
    }
    const undoWipe = wipeSession();
    successWithUndo('Copied & cleared', undoWipe, { id: 'clipboard' });
  }, [clearAfterCopy, wipeSession]);

  return (
    <div className="mt-2 flex grow flex-col items-end lg:mt-6">
      <div className="mb-1 flex w-full items-end justify-between">
        <span className="block text-sm font-medium text-gray-300">Encrypted message</span>
        <div className="flex items-center gap-3">
          <ExplainButton />
          {/* copy and its options read as one split control */}
          <div className="flex items-center">
            <CopyToClipboardButton
              text={cipherText}
              title={clearAfterCopy ? 'Copy & clear' : 'Copy to clipboard'}
              indicator={clearAfterCopy}
              onCopied={handleCopied}
              data-test="btn-copy"
            />
            <ClearAfterCopyMenuButton className="-ml-1.5" />
          </div>
        </div>
      </div>
      <TextBlock
        text={cipherText}
        className="min-h-[8rem]"
        showNumberOfChars
        data-test="text-ciphertext"
      />
    </div>
  );
}
