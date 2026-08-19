import { useCallback } from 'react';

import { usePlaintext } from '@/features/encryptForm/store';
import { usePipeActions, usePipeCiphers } from '@/features/pipe';

/**
 * Wipes the message and the ciphers pipe.
 * Returns a callback that puts both back, to be offered as an undo.
 */
export function useSessionWipe() {
  const [plaintext, setPlaintext] = usePlaintext();
  const ciphers = usePipeCiphers();
  const { deleteAll, restore } = usePipeActions();

  return useCallback((): VoidFunction => {
    setPlaintext('');
    deleteAll();

    return () => {
      setPlaintext(plaintext);
      restore(ciphers);
    };
  }, [plaintext, setPlaintext, ciphers, deleteAll, restore]);
}
