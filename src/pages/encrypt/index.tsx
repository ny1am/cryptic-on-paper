import { useState } from 'react';

import { CiphersContext } from './CiphersContext';
import { CypherMeta } from './config';
import { CyphersPipe } from './CyphersPipe';
import { ExecutorForm } from './ExecutorForm';

export function EncryptPage() {
  const [selectedCyphers, setSelectedCyphers] = useState<CypherMeta[]>([]);
  const addCypher = (c: CypherMeta) => setSelectedCyphers((sc) => [...sc, c]);

  return (
    <CiphersContext.Provider value={{ selectedCyphers, addCypher }}>
      <CyphersPipe />
      <ExecutorForm />
    </CiphersContext.Provider>
  );
}
