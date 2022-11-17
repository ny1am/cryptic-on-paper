import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import cn from 'clsx';
import copyToClipboard from 'copy-to-clipboard';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';

import { IconButton } from '@/components/IconButton';
import { Cipher, encrypt } from '@/features/cipher';
import { useAutoAnimate } from '@/lib/auto-animate';

import { CipherMeta, ciphersRegister } from './config';
import { useCiphersPipeStore } from './store';

type FactoryType = CipherMeta['options'] extends infer R ? (opts: R) => Cipher : never;

interface EncryptFormProps {
  className?: string;
}

export function EncryptForm({ className }: EncryptFormProps) {
  const selectedCiphers = useCiphersPipeStore((s) => s.ciphers);

  const [plainText, setPlainText] = useState<string>('');
  const handlePlainTextChange = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLTextAreaElement>) =>
      setPlainText(value),
    []
  );

  const pipe = selectedCiphers.map(({ meta }) => {
    const factory = ciphersRegister[meta.key] as FactoryType;
    return factory(meta.options);
  });
  const cipherText = plainText && pipe.length > 0 && encrypt(pipe, plainText);

  const copy = useCallback(() => {
    if (cipherText) {
      copyToClipboard(cipherText);
      toast.success('Copied to clipboard!', { id: 'clipboard' });
    }
  }, [cipherText]);

  const [contentRef] = useAutoAnimate<HTMLDivElement>();
  return (
    <div className={cn('flex flex-col', className)} ref={contentRef}>
      <div className="w-full">
        <label htmlFor="plaintext" className="sr-only">
          Message to encrypt
        </label>
        <textarea
          id="plaintext"
          placeholder="Message to encrypt..."
          rows={5}
          className="block w-full rounded-sm resize-none border-primary text-sm focus-ring placeholder:font-light"
          value={plainText || ''}
          onChange={handlePlainTextChange}
        />
      </div>
      {cipherText && (
        <div className="mt-2 grow flex flex-col items-end lg:mt-6">
          <div className="mb-1 w-full flex justify-between items-end">
            <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Encrypted message
            </span>
            <IconButton
              title="Copy to clipboard"
              icon={<ClipboardDocumentListIcon className="h-5" />}
              onClick={copy}
            />
          </div>
          <pre className="min-h-[8rem] w-full grow text-sm break-all whitespace-pre-wrap bg-indigo-50/50 overflow-y-auto p-2 rounded-sm border-primary dark:bg-slate-700/50">
            {cipherText}
          </pre>
        </div>
      )}
    </div>
  );
}
