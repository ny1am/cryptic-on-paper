import './index.css';
import 'animate.css';

import { Toaster } from 'react-hot-toast';

import { Tooltip } from './components/Tooltip';
import { GitHubIcon } from './icons/GitHubIcon';
import { EncryptPage } from './pages/encrypt';

function App() {
  return (
    <>
      <div className="grow">
        <EncryptPage />
      </div>
      <footer className="shrink-0 mx-auto w-full max-w-7xl px-4 py-4 flex justify-end lg:px-6">
        <Tooltip label="GitHub source code">
          <a
            href="https://github.com/ny1am/cryptic-on-paper"
            target="_blank"
            className="h-8 w-8 inline-flex rounded-sm justify-center items-center opacity-50 hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus-ring"
            rel="noreferrer"
          >
            <span className="sr-only">GitHub source code</span>
            <GitHubIcon className="h-5" aria-hidden={true} />
          </a>
        </Tooltip>
      </footer>
      <Toaster
        position="bottom-right"
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
