import { useState } from 'react';

import { CiphersContext } from './CiphersContext';
import { CyphersPipe } from './CyphersPipe';
import { ExecutorForm } from './ExecutorForm';
import { CypherMeta } from './types';

export function EncryptPage() {
  const [selectedCyphers, setSelectedCyphers] = useState<CypherMeta[]>([]);
  const addCypher = (c: CypherMeta) => setSelectedCyphers((sc) => [...sc, c]);

  return (
    <CiphersContext.Provider value={{ selectedCyphers, addCypher }}>
      <CyphersPipe />
      <hr />
      <ExecutorForm />
    </CiphersContext.Provider>
  );
}
