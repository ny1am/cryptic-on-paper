import { useState } from 'react';

import { CiphersContext } from './CiphersContext';
import { CiphersPipe } from './CiphersPipe';
import { CipherMeta } from './config';
import { EncryptForm } from './EncryptForm';

export function EncryptPage() {
  const [selectedCiphers, setSelectedCiphers] = useState<CipherMeta[]>([]);
  const addCipher = (c: CipherMeta) => setSelectedCiphers((sc) => [...sc, c]);

  return (
    <CiphersContext.Provider value={{ selectedCiphers, addCipher }}>
      <CiphersPipe />
      <EncryptForm />
    </CiphersContext.Provider>
  );
}
