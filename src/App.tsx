import 'animate.css';
import './index.css';

import { Layout } from './components/Layout';
import { ThemeLoader } from './components/Theme';
import { Toaster } from './components/Toast';
import { EncryptPage } from './pages/encrypt';

function App() {
  return (
    <>
      <Layout>
        <EncryptPage />
      </Layout>
      <Toaster />
      <ThemeLoader />
    </>
  );
}

export default App;
