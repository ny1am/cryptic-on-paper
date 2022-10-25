import { useContext, useState } from 'react';

import { encrypt, mirrorCypherFactory, railFenceCypherFactory } from '@/features/cypher';
import { Cypher } from '@/features/cypher/types';

import { CiphersContext } from './CiphersContext';
import { CypherOptionsDef } from './types';

type FactoryConfig = {
  [T in keyof CypherOptionsDef]: (o: CypherOptionsDef[T]) => Cypher;
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

  const pipe = selectedCyphers.map((meta) => factoryCfg[meta.name](meta.opts as any));
  const result = encrypt(pipe, input || '');

  return (
    <div>
      <input value={input || ''} onChange={inputChangeHandler} />
      <div>result: {result}</div>
    </div>
  );
}
