import '@/components/RangeInput/range.scss';
import '@/index.css';

import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';

import { Layout } from '@/components/Layout';
import { poppins } from '@/fonts';

const Toaster = dynamic(() => import('@/components/Toast').then((m) => m.Toaster), {
  ssr: false,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${poppins.variable} flex grow flex-col font-sans`}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Toaster />
    </div>
  );
}
