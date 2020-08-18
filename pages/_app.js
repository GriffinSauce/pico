import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import * as Sentry from '@sentry/node';
import GlobalStyles from '~/components/GlobalStyles';

Sentry.init({
  dsn: 'https://225c0c41e53e4852a221b260bd070b27@sentry.io/1760702',
});

class PicoApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    // Workaround for https://github.com/zeit/next.js/issues/8592
    const { err } = this.props;
    const modifiedPageProps = { ...pageProps, err };

    return (
      <>
        <Head>
          <title>pico.link - the easiest way to share pictures</title>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/icon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/icon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/icon/favicon-16x16.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <link
            rel="mask-icon"
            href="/icon/safari-pinned-tab.svg"
            color="#5bbad5"
          />
          <link rel="shortcut icon" href="/icon/favicon.ico" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="msapplication-TileColor" content="#2d89ef" />
          <meta name="msapplication-config" content="/icon/browserconfig.xml" />
          <meta name="theme-color" content="#020021" />
        </Head>

        <GlobalStyles />

        <Component {...modifiedPageProps} />
      </>
    );
  }
}

export default PicoApp;
