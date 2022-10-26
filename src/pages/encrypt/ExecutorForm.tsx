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

  return (
    <div>
      <input value={input || ''} onChange={inputChangeHandler} />
      <div>result: {result}</div>
    </div>
  );
}
