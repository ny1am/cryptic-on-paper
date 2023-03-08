import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';

import { Layout } from '@/components/Layout';
import { ThemeLoader } from '@/components/Theme';
import { Toaster } from '@/components/Toast';

import { LegacyEncryptPage } from './LegacyEncryptPage';

export function LegacyAppComponent() {
  return (
    <>
      <ThemeLoader />
      <Layout>
        <LegacyEncryptPage />
      </Layout>
      <Toaster />
    </>
  );
}
