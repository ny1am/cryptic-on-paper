/* eslint-disable @next/next/no-title-in-document-head */
import { Head, Html, Main, NextScript } from 'next/document';

const data = {
  url: 'https://cryptic-on-paper.netlify.app',
  title: 'Cryptic on paper',
  description:
    'Encrypt messages with simple ciphers that you could replicate on a piece of paper',
};

export default function Document() {
  return (
    <Html lang="en" className="h-full overflow-y-scroll">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <title>{data.title}</title>
        <meta name="title" content={data.title} />
        <meta name="description" content={data.description} />

        <meta property="og:url" content={data.url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={data.title} />
        <meta property="og:description" content={data.description} />
        <meta property="og:image" content="/placeholder-social.jpg" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="cryptic-on-paper.netlify.app" />
        <meta property="twitter:url" content={data.url} />
        <meta name="twitter:title" content={data.title} />
        <meta name="twitter:description" content={data.description} />
        <meta name="twitter:image" content="/placeholder-social.jpg" />
      </Head>
      <body className="h-full min-w-[20rem] bg-slate-900 font-poppins text-slate-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
