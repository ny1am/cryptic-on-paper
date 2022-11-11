import { PlusIcon } from '@heroicons/react/20/solid';
import { forwardRef, useCallback, useState } from 'react';

import { Button } from '@/components/Button';
import { Dialog } from '@/components/Dialog';

import { AddCipherForm } from './AddCipherForm';

interface AddButtonProps {
  className?: string;
}

export const AddButton = forwardRef<HTMLButtonElement, AddButtonProps>(
  function AddButtonNoRef({ className }, ref) {
    const [dialog, setDialog] = useState<boolean>(false);
    const handleDialogClose = useCallback(() => setDialog(false), []);

    return (
      <>
        <Button
          type="button"
          ref={ref}
          className={className}
          primary
          onClick={() => void setDialog(true)}
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Add cipher
        </Button>

        <Dialog onClose={handleDialogClose} isOpen={dialog}>
          <AddCipherForm onDispose={handleDialogClose} />
        </Dialog>
      </>
    );
  }
);
