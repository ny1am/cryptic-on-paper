import toast, { Toaster as RawToaster, ToastOptions } from 'react-hot-toast';

export const success = toast.success;

type UndoOptions = ToastOptions & { undoLabel?: string };

/**
 * Success toast carrying an undo affordance, for actions that
 * destroy something the user would not want to rebuild by hand.
 */
export function successWithUndo(
  message: string,
  onUndo: VoidFunction,
  { undoLabel = 'Undo', duration = 8000, ...options }: UndoOptions = {}
) {
  return toast.success(
    (t) => (
      <span className="flex items-center gap-4">
        {message}
        <button
          type="button"
          className="shrink-0 font-medium text-indigo-300 underline underline-offset-2 hover:text-indigo-200"
          onClick={() => {
            onUndo();
            toast.dismiss(t.id);
          }}
        >
          {undoLabel}
        </button>
      </span>
    ),
    { duration, ...options }
  );
}

export const Toaster: typeof RawToaster = () => {
  return (
    <RawToaster
      position="bottom-right"
      toastOptions={{
        success: {
          style: {
            fontSize: '0.875rem',
            backgroundColor: '#0f172a',
            color: 'white',
          },
          iconTheme: {
            primary: '#a5b4fc',
            secondary: '#312e81',
          },
        },
      }}
    />
  );
};
