import type { AppProps } from 'next/app';
import Head from 'next/head';

// notion style
import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'rc-dropdown/assets/index.css';
import 'katex/dist/katex.min.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>모여</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
