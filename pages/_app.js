import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: 'https://225c0c41e53e4852a221b260bd070b27@sentry.io/1760702',
});

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    // Workaround for https://github.com/zeit/next.js/issues/8592
    const { err } = this.props;
    const modifiedPageProps = { ...pageProps, err };

    return (
      <>
        <Component {...modifiedPageProps} />

        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Lato|Oswald&display=swap"
            rel="stylesheet"
          />
        </Head>

        <style jsx global>{`
          body {
            box-sizing: border-box;
            font-family: 'Lato', sans-serif;
            text-align: center;
            margin: 0;
            padding: 0;
          }
          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            font-family: 'Oswald', sans-serif;
          }
          label {
            display: block;
            text-align: left;
            font-size: 12px;
          }
          input {
            display: block;
            width: 100%;
            padding: 4px 0 8px 0;
            font-size: 24px;
            border: none;
            border-bottom: 1px solid #d900fc;
          }
          button {
            display: inline-block;
            width: 50%;
            padding: 12px;
            font-size: 22px;
            color: #fff;
            background-color: #d900fc;
            border: none;
            border-radius: 100px;
            cursor: pointer;
          }
          button:hover {
            background-color: #c900ea;
          }

          .uploadcare--widget {
            width: 100%;
          }
          .uploadcare--widget__button,
          .uploadcare--widget__button:hover {
            display: inline-block;
            width: 50%;
            padding: 12px;
            font-size: 22px;
            color: #fff;
            background-color: #d900fc;
            border: none;
            border-radius: 100px;
            cursor: pointer;
          }
          .uploadcare--widget__button:hover {
            background-color: #c900ea;
          }
        `}</style>
      </>
    );
  }
}

export default MyApp;
