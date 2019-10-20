import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import * as Sentry from '@sentry/node';
import ThemeContext from '~/contexts/ThemeContext';
import theme from '~/lib/theme';
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
        <ThemeContext.Provider
          value={{
            theme,
          }}
        >
          <Component {...modifiedPageProps} />

          <Head>
            <title>pico.link - the easiest way to share pictures</title>
            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/static/icon/apple-touch-icon.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="/static/icon/favicon-32x32.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="/static/icon/favicon-16x16.png"
            />
            <link rel="manifest" href="/static/manifest.json" />
            <link
              rel="mask-icon"
              href="/static/icon/safari-pinned-tab.svg"
              color="#5bbad5"
            />
            <link rel="shortcut icon" href="/static/icon/favicon.ico" />
            <meta name="msapplication-TileColor" content="#2d89ef" />
            <meta
              name="msapplication-config"
              content="/static/icon/browserconfig.xml"
            />
            <meta name="theme-color" content="#ffffff" />
          </Head>

          <GlobalStyles />
        </ThemeContext.Provider>
      </>
    );
  }
}

export default PicoApp;
