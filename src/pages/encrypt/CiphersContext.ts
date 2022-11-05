import { createContext } from 'react';

import { CipherMeta } from './config';

export const CiphersContext = createContext<{
  selectedCiphers: CipherMeta[];
  addCipher: (c: CipherMeta) => void;
}>({
  selectedCiphers: [],
  addCipher: () => undefined,
});
