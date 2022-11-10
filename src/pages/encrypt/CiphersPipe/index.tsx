import { useContext } from 'react';

import { useAutoAnimate } from '@/lib/auto-animate';

import { CiphersContext } from '../CiphersContext';
import { AddButton } from './AddButton';
import { EmptyPipe } from './EmptyPipe';
import { Pipe } from './Pipe';

export function CiphersPipe() {
  const { selectedCiphers } = useContext(CiphersContext);
  const [contentRef] = useAutoAnimate<HTMLDivElement>();

  return (
    <div className="rounded-sm bg-white border border-indigo-100">
      <div ref={contentRef} className="min-h-[16rem] p-6 flex flex-col">
        {selectedCiphers.length > 0 ? (
          <Pipe />
        ) : (
          <div className="grow flex justify-center items-center my-10">
            <EmptyPipe />
          </div>
        )}
      </div>
      <div className="px-3 pl-6 py-3 flex justify-end">
        <AddButton />
      </div>
    </div>
  );
}
