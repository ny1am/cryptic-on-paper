import toast, { Toaster as RawToaster } from 'react-hot-toast';

import { useTheme } from '@/components/Theme';

export const success = toast.success;

export const Toaster: typeof RawToaster = () => {
  const [isDarkMode] = useTheme();

  return (
    <RawToaster
      position="bottom-right"
      toastOptions={{
        success: {
          style: {
            fontSize: '0.875rem',
            backgroundColor: isDarkMode ? '#0f172a' : 'white',
            color: isDarkMode ? 'white' : '#111827',
          },
          iconTheme: {
            primary: isDarkMode ? '#a5b4fc' : '#4F46E5',
            secondary: isDarkMode ? '#312e81' : 'white',
          },
        },
      }}
    />
  );
};
