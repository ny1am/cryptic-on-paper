import { PlusIcon } from '@heroicons/react/20/solid';
import dynamic from 'next/dynamic';
import { forwardRef, useCallback } from 'react';

import { Button } from '@/components/Button';
import { Dialog, useDialog } from '@/components/Dialog';

const AddCipherForm = dynamic(() =>
  import('./AddCipherForm').then((m) => m.AddCipherForm)
);

interface AddButtonProps {
  className?: string;
}

export const AddButton = forwardRef<HTMLButtonElement, AddButtonProps>(
  function AddButtonInner({ className }, ref) {
    const [dialog, openDialog, closeDialog] = useDialog();

    const handleOpenDialog = useCallback(async () => {
      await import('./AddCipherForm');
      return openDialog();
    }, [openDialog]);

    return (
      <>
        <Button
          ref={ref}
          className={className}
          intent="primary"
          onClick={handleOpenDialog}
          data-test="btn-show-ciphers"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Add cipher
        </Button>

        <Dialog onClose={closeDialog} isOpen={dialog} ariaLabel="Select a cipher">
          <AddCipherForm onDispose={closeDialog} />
        </Dialog>
      </>
    );
  }
);
