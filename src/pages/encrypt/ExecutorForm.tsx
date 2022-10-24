import { useContext, useState } from 'react';

import { encrypt, mirrorCypherFactory, railFenceCypherFactory } from '@/features/cypher';
import { Cypher } from '@/features/cypher/types';

import { CiphersContext } from './CiphersContext';
import { CypherOptionsDef } from './types';

type FactoryConfig = {
  [T in keyof CypherOptionsDef]: (
    o: CypherOptionsDef[T] extends void ? void : CypherOptionsDef[T]
  ) => Cypher;
};

const factoryCfg: FactoryConfig = {
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
    const list = selectedCyphers.map((meta) => {
      if ('opts' in meta) {
        return factoryCfg[meta.name](meta.opts);
      }
      return factoryCfg[meta.name]();
    });
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
