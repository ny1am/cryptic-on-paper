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
    <div className="mt-10">
      <div>
        <label htmlFor="plaintext" className="block text-md font-medium text-gray-700">
          Plaintext
        </label>
        <input
          type="text"
          id="plaintext"
          className="mt-1 block w-full rounded-md shadow-sm text-lg focus:outline-none border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          value={input || ''}
          onChange={inputChangeHandler}
        />
      </div>
      <div className="mt-4">
        <div className="flex w-full items-end">
          <span className="grow text-xl">
            {`Cypher text: `}
            <strong>{result || ''}</strong>
          </span>
          <div className="shrink-0 ml-4 ">
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-200"
              disabled={!result}
              onClick={copyToClipboard}
            >
              <ClipboardIcon className="h-5 w-5 mr-2" aria-hidden="true" />
              Copy to Clipboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
