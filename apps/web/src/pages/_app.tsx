import '@/components/RangeInput/range.scss';
import '@/index.css';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';

import type { AppProps } from 'next/app';

import { Layout } from '@/components/Layout';
import { Toaster } from '@/components/Toast';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />;
      </Layout>
      <Toaster />
    </>
  );
}
