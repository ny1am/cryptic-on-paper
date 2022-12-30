import { DocumentMagnifyingGlassIcon } from '@heroicons/react/24/outline';

import { Dialog, useDialog } from '@/components/Dialog';
import { IconButton } from '@/components/IconButton';

import { ExplainView } from './ExplainView';

export function ExplainButton() {
  const [dialog, openDialog, closeDialog] = useDialog();

  return (
    <>
      <IconButton
        title="View logs"
        icon={<DocumentMagnifyingGlassIcon className="h-5" />}
        onClick={openDialog}
      />

      <Dialog onClose={closeDialog} isOpen={dialog} ariaLabel="Logs">
        <ExplainView onDispose={closeDialog} />
      </Dialog>
    </>
  );
}
