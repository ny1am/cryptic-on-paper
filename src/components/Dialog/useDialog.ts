import { useCallback, useState } from 'react';

export function useDialog(): [boolean, VoidFunction, VoidFunction] {
  const [dialog, setDialog] = useState<boolean>(false);
  const handleDialogClose = useCallback(() => void setDialog(false), []);
  const handleDialogOpen = useCallback(() => void setDialog(true), []);

  return [dialog, handleDialogOpen, handleDialogClose];
}
