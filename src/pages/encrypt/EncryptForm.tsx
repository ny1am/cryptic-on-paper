import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import copyToClipboard from 'copy-to-clipboard';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';

import { Tooltip } from '@/components/Tooltip';
import { Cipher, encrypt } from '@/features/cipher';
import { useAutoAnimate } from '@/lib/auto-animate';

import { CipherMeta, ciphersRegister } from './config';
import { useCiphersPipeStore } from './store';

type FactoryType = CipherMeta['options'] extends infer R ? (opts: R) => Cipher : never;

export function EncryptForm() {
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
    <div ref={contentRef}>
      <div className="w-full">
        <label htmlFor="plaintext" className="sr-only">
          Message to encrypt
        </label>
        <textarea
          id="plaintext"
          placeholder="Message to encrypt..."
          rows={5}
          className="block w-full rounded-sm resize-none border-indigo-100 text-sm focus:border-indigo-500 focus:ring-indigo-500 placeholder:font-light"
          value={plainText || ''}
          onChange={handlePlainTextChange}
        />
      </div>
      {cipherText && (
        <div className="mt-2 flex flex-col items-end lg:mt-6">
          <div className="w-full">
            <div className="flex justify-between items-end">
              <span className="block text-sm font-medium text-gray-700 mb-1">
                Encrypted message
              </span>
              <Tooltip label="Copy to clipboard">
                <button
                  type="button"
                  onClick={copy}
                  className="h-8 w-8 inline-flex justify-center items-center rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 opacity-50 hover:opacity-100 focus:opacity-100"
                >
                  <ClipboardDocumentListIcon className="h-5" aria-hidden="true" />
                  <span className="sr-only">Copy to clipboard</span>
                </button>
              </Tooltip>
            </div>
            <pre className="text-sm break-all whitespace-pre-wrap bg-indigo-50/50 overflow-y-auto p-2 rounded-sm h-32 border border-indigo-100">
              {cipherText}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
