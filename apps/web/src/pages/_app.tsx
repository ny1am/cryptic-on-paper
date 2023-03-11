import '@/components/RangeInput/range.scss';
import '@/index.css';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';

import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';

import { Layout } from '@/components/Layout';

const Toaster = dynamic(() => import('@/components/Toast').then((m) => m.Toaster), {
  ssr: false,
});

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
