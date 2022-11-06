import { createContext } from 'react';

import { CipherMeta, CipherUIMeta } from './config';

export const CiphersContext = createContext<{
  selectedCiphers: CipherUIMeta[];
  addCipher: (meta: CipherMeta) => void;
}>({
  selectedCiphers: [],
  addCipher: () => undefined,
});
