import toast, { Toaster as RawToaster } from 'react-hot-toast';

export const success = toast.success;

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
