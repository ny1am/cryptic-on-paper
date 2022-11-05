import { PlusIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';

import { Button } from '@/components/Button';
import { Dialog } from '@/components/Dialog';

import { AddCipherForm } from './AddCipherForm';

export function AddButton() {
  const [dialog, setDialog] = useState<boolean>(false);
  const handleDialogClose = () => setDialog(false);

  return (
    <>
      <Button type="button" primary onClick={() => setDialog(true)}>
        <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        Add Cipher
      </Button>

      {dialog && (
        <Dialog onClose={handleDialogClose}>
          <AddCipherForm onDispose={handleDialogClose} />
        </Dialog>
      )}
    </>
  );
}
