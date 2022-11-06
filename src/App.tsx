import './index.css';

import { Toaster } from 'react-hot-toast';

import { EncryptPage } from './pages/encrypt';

function App() {
  return (
    <>
      <EncryptPage />
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'text-sm',
          success: {
            iconTheme: {
              primary: 'rgb(79, 70, 229)',
              secondary: 'white',
            },
          },
        }}
      />
    </>
  );
}

export default App;
