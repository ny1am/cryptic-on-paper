import { useState } from 'react';
import { v4 as generateUuid } from 'uuid';

import { useAutoAnimate } from '@/lib/auto-animate';

import { CiphersContext } from './CiphersContext';
import { CiphersPipe } from './CiphersPipe';
import { CipherMeta, CipherUIMeta } from './config';
import { EncryptForm } from './EncryptForm';

export function EncryptPage() {
  const [selectedCiphers, setSelectedCiphers] = useState<CipherUIMeta[]>([]);
  const addCipher = (meta: CipherMeta) =>
    setSelectedCiphers((array) => [...array, { meta, uuid: generateUuid() }]);

  const [contentRef] = useAutoAnimate<HTMLDivElement>();
  return (
    <CiphersContext.Provider value={{ selectedCiphers, addCipher }}>
      <div className="mx-auto pt-16 max-w-7xl px-4 lg:pt-24 lg:px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span>Cryptic </span>
            <span className="text-indigo-600">on paper</span>
          </h1>
          <p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
            Encrypt messages with simple ciphers that you could replicate on a piece of
            paper
          </p>
        </div>
      </div>

      <div
        ref={contentRef}
        className="mt-8 max-w-4xl mx-auto flex flex-wrap gap-4 p-4 lg:gap-10 lg:mt-20"
      >
        <div className="basis-72 grow-[10] shrink-0 lg:max-w-lg lg:mx-auto">
          <CiphersPipe />
        </div>
        {selectedCiphers.length > 0 && (
          <div className="basis-72 grow shrink-0">
            <EncryptForm />
          </div>
        )}
      </div>
    </CiphersContext.Provider>
  );
}
