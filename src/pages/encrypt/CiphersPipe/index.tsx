import { useCallback, useRef } from 'react';

import { Button } from '@/components/Button';
import { useAutoAnimate } from '@/lib/auto-animate';

import { useIsPipeEmpty, usePipeActions } from '../store';
import { AddButton } from './AddButton';
import { EmptyPipe } from './EmptyPipe';
import { Pipe } from './Pipe';

export function CiphersPipe() {
  const { deleteAll: clearCiphers } = usePipeActions();
  const isPipeEmpty = useIsPipeEmpty();

  const addButtonRef = useRef<HTMLButtonElement>(null);
  const handleClear = useCallback(() => {
    clearCiphers();
    addButtonRef.current?.focus();
  }, [clearCiphers]);

  const [contentRef] = useAutoAnimate<HTMLDivElement>();
  return (
    <div className="rounded-sm border-primary">
      <div ref={contentRef} className="min-h-[16rem] p-6 flex flex-col overflow-hidden">
        {isPipeEmpty ? (
          <div className="grow flex justify-center items-center my-10">
            <EmptyPipe />
          </div>
        ) : (
          <Pipe />
        )}
      </div>
      <div className="p-4 flex justify-between">
        {!isPipeEmpty && (
          <Button onClick={handleClear} intent="cancel">
            Clear
          </Button>
        )}
        <AddButton ref={addButtonRef} className="ml-auto" />
      </div>
    </div>
  );
}
