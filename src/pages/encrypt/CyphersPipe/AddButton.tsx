import { PlusIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';

import { Dialog } from '@/components/Dialog';

import { AddCypherForm } from './AddCypherForm';

export function AddButton() {
  const [dialog, setDialog] = useState<boolean>(false);
  const handleDialogClose = () => setDialog(false);

  return (
    <>
      <button
        type="button"
        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={() => setDialog(true)}
      >
        <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        Add Cypher
      </button>

      {dialog && (
        <Dialog onClose={handleDialogClose}>
          <AddCypherForm onDispose={handleDialogClose} />
        </Dialog>
      )}
    </>
  );
}
