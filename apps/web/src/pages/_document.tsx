import { Head, Html, Main, NextScript } from 'next/document';

import { ssoConfig } from '@/consts/ssoConfig';

export default function Document() {
  return (
    <Html lang="en" className="h-full overflow-y-scroll">
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="title" content={ssoConfig.title} />
        <meta name="description" content={ssoConfig.description} />

        <meta property="og:url" content={ssoConfig.url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={ssoConfig.title} />
        <meta property="og:description" content={ssoConfig.description} />
        <meta property="og:image" content="/placeholder-social.jpg" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="cryptic-on-paper.netlify.app" />
        <meta property="twitter:url" content={ssoConfig.url} />
        <meta name="twitter:title" content={ssoConfig.title} />
        <meta name="twitter:description" content={ssoConfig.description} />
        <meta name="twitter:image" content="/placeholder-social.jpg" />
      </Head>
      <body className="h-full min-w-[20rem] bg-slate-900 font-sans text-slate-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
