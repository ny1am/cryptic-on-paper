import { createContext } from 'react';

import { CypherMeta } from './config';

export const CiphersContext = createContext<{
  selectedCyphers: CypherMeta[];
  addCypher: (c: CypherMeta) => void;
}>({
  selectedCyphers: [],
  addCypher: () => undefined,
});
