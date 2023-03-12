import '@/components/RangeInput/range.scss';
import '@/index.css';

import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { Poppins } from 'next/font/google';

import { Layout } from '@/components/Layout';
import { DialogPortalRoot } from '@/lib/headlessui';

const Toaster = dynamic(() => import('@/components/Toast').then((m) => m.Toaster), {
  ssr: false,
});

const poppins = Poppins({
  weight: ['300', '400'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${poppins.variable} flex grow flex-col font-sans`}>
      <Layout>
        <Component {...pageProps} />;
      </Layout>
      <Toaster />
      <DialogPortalRoot />
    </div>
  );
}
