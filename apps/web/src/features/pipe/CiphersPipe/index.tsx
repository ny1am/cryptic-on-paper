import { useCallback, useRef } from 'react';

import { Button } from '@/components/Button';
import { useAutoAnimate } from '@/lib/auto-animate';

import { AddButton } from '../AddCipher';
import { useIsPipeEmpty, usePipeActions } from '../store';
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
    <div className="border-primary rounded-sm">
      <div
        ref={contentRef}
        className="flex min-h-[11rem] flex-col overflow-hidden p-6 xs:min-h-[16rem]"
      >
        {isPipeEmpty ? (
          <div className="my-10 flex grow items-center justify-center">
            <EmptyPipe />
          </div>
        ) : (
          <Pipe />
        )}
      </div>
      <div className="flex justify-between p-4">
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
