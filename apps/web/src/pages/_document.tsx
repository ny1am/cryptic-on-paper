import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" className="h-full overflow-y-scroll">
      <Head />
      <body className="h-full min-w-[20rem] bg-slate-900 font-poppins text-slate-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
