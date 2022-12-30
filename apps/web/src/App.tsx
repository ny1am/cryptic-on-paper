import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import './index.css';

import { Layout } from './components/Layout';
import { ThemeLoader } from './components/Theme';
import { Toaster } from './components/Toast';
import { EncryptPage } from './pages/encrypt';

function App() {
  return (
    <>
      <ThemeLoader />
      <Layout>
        <EncryptPage />
      </Layout>
      <Toaster />
    </>
  );
}

export default App;
