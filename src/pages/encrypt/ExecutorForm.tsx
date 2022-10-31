import { ClipboardIcon } from '@heroicons/react/24/outline';
import { useContext, useState } from 'react';

import { Cypher, encrypt } from '@/features/cypher';

import { CiphersContext } from './CiphersContext';
import { CypherMeta, cyphersRegister } from './config';

type FactoryType = CypherMeta['options'] extends infer R ? (opts: R) => Cypher : never;

export function ExecutorForm() {
  const { selectedCyphers } = useContext(CiphersContext);

  const [input, setInput] = useState<string>();
  const inputChangeHandler = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => setInput(value);

  const pipe = selectedCyphers.map((meta) => {
    const factory = cyphersRegister[meta.key] as FactoryType;
    return factory(meta.options);
  });
  const result = encrypt(pipe, input || '');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setInput('');
  };

  return (
    <div className="mt-5 w-full flex items-end flex-wrap gap-y-5">
      <div className="mt-5 basis-1/2 grow">
        <label
          htmlFor="plaintext"
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          Plaintext
        </label>
        <input
          type="text"
          id="plaintext"
          className="block w-full rounded-md shadow-sm text-sm focus:outline-none border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          value={input || ''}
          onChange={inputChangeHandler}
        />
      </div>
      {result && (
        <div className="basis-1/2 flex items-center justify-end gap-4">
          <div className="grow text-xl text-right">{result}</div>
          <button
            type="button"
            className="flex items-center rounded-md border border-transparent bg-indigo-600 px-2 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-200"
            onClick={copyToClipboard}
          >
            <ClipboardIcon className="h-5 w-5" aria-label="Copy to Clipboard" />
          </button>
        </div>
      )}
    </div>
  );
}
