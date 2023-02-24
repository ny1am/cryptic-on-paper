import { encrypt } from '@cop/ciphers';
import { useDeferredValue, useMemo } from 'react';

import { CopyToClipboardButton } from '@/components/CopyToClipboardButton';
import { TextBlock } from '@/components/TextBlock';
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

  return (
    <div className="mt-2 flex grow flex-col items-end lg:mt-6">
      <div className="mb-1 flex w-full items-end justify-between">
        <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Encrypted message
        </span>
        <div className="flex gap-1">
          <ExplainButton />
          <CopyToClipboardButton text={cipherText} />
        </div>
      </div>
      <TextBlock text={cipherText} className="min-h-[8rem]" />
    </div>
  );
}
