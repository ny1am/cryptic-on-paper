import '@/components/RangeInput/range.scss';
import '@/index.css';

import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';

import { Layout } from '@/components/Layout';
import { ssoConfig } from '@/consts/ssoConfig';
import { poppins } from '@/fonts';

const Toaster = dynamic(() => import('@/components/Toast').then((m) => m.Toaster), {
  ssr: false,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{ssoConfig.title}</title>
      </Head>
      <div className={`${poppins.variable} flex grow flex-col font-sans`}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Toaster />
      </div>
    </>
  );
}
