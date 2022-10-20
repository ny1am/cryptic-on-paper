import { useContext, useState } from 'react';

import { encrypt, mirrorCypherFactory, railFenceCypherFactory } from '@/features/cypher';

import { CiphersContext } from './CiphersContext';

const factoryCfg = {
  mirror: mirrorCypherFactory,
  railFence: railFenceCypherFactory,
};

export function ExecutorForm() {
  const { selectedCyphers } = useContext(CiphersContext);

  const [input, setInput] = useState<string>();
  const inputChangeHandler = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => setInput(value);

  const [result, setResult] = useState<string>();
  const executeHandler = () => {
    const list = selectedCyphers.map((meta) =>
      factoryCfg[meta.name](('opts' in meta ? meta.opts : undefined) as any)
    );
    const result = encrypt(list, input || '');
    setResult(result);
  };

  return (
    <div>
      <div>
        <input value={input || ''} onChange={inputChangeHandler} />
        <button onClick={executeHandler} disabled={!input || !selectedCyphers.length}>
          run
        </button>
      </div>

      <div>result: {result || ''}</div>
    </div>
  );
}
