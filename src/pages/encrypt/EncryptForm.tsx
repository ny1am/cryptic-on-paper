import { ClipboardIcon } from '@heroicons/react/24/outline';
import copyToClipboard from 'copy-to-clipboard';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';

import { Cipher, encrypt } from '@/features/cipher';
import { useAutoAnimate } from '@/lib/auto-animate';

import { CiphersContext } from './CiphersContext';
import { CipherMeta, ciphersRegister } from './config';

type FactoryType = CipherMeta['options'] extends infer R ? (opts: R) => Cipher : never;

export function EncryptForm() {
  const { selectedCiphers } = useContext(CiphersContext);

  const [input, setInput] = useState<string>('');
  const inputChangeHandler = ({
    target: { value },
  }: React.ChangeEvent<HTMLTextAreaElement>) => setInput(value);

  const pipe = selectedCiphers.map(({ meta }) => {
    const factory = ciphersRegister[meta.key] as FactoryType;
    return factory(meta.options);
  });
  const result = input && encrypt(pipe, input);

  const copy = () => {
    copyToClipboard(result);
    toast.success('Copied to clipboard!', { id: 'clipboard' });
  };

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
          className="block w-full rounded-md resize-none border-gray-300 shadow-sm text-sm focus:border-indigo-500 focus:ring-indigo-500 placeholder:font-light"
          value={input || ''}
          onChange={inputChangeHandler}
        />
      </div>
      {result && (
        <div className="mt-2 flex flex-col items-end lg:mt-6">
          <div className="w-full">
            <div className="flex justify-between items-end">
              <span className="block text-sm font-medium text-gray-700 mb-1">
                Encrypted message
              </span>
              <button
                type="button"
                onClick={copy}
                className="h-8 w-8 inline-flex justify-center items-center rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 opacity-50 hover:opacity-100 focus:opacity-100"
                title="Copy to clipboard"
              >
                <ClipboardIcon className="h-4" aria-hidden="true" />
                <span className="sr-only">Copy to clipboard</span>
              </button>
            </div>
            <pre className="text-sm break-all whitespace-pre-wrap bg-gray-50 overflow-y-auto p-2 rounded-md h-32 border border-gray-300">
              {result}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
