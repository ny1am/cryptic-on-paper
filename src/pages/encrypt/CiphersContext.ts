import { createContext } from 'react';

import { CypherMeta } from './types';

export const CiphersContext = createContext<{
  selectedCyphers: CypherMeta[];
  addCypher: (c: CypherMeta) => void;
}>({
  selectedCyphers: [],
  addCypher: () => [],
});
