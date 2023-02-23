import { PlusIcon } from '@heroicons/react/20/solid';
import { forwardRef } from 'react';

import { Button } from '@/components/Button';
import { Dialog, useDialog } from '@/components/Dialog';

import { AddCipherForm } from './AddCipherForm';

interface AddButtonProps {
  className?: string;
}

export const AddButton = forwardRef<HTMLButtonElement, AddButtonProps>(
  function AddButtonInner({ className }, ref) {
    const [dialog, openDialog, closeDialog] = useDialog();

    return (
      <>
        <Button
          ref={ref}
          className={className}
          intent="primary"
          onClick={openDialog}
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
