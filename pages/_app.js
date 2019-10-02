import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import * as Sentry from '@sentry/node';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app

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
          <link rel="manifest" href="/static/icon/site.webmanifest" />
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

          .button {
            display: inline-block;
            padding: 12px 20px;
            font-size: 22px;
            color: #fff;
            background-color: #d900fc;
            border: none;
            border-radius: 100px;
            cursor: pointer;
          }
          .button:hover {
            background-color: #c900ea;
          }
          .button[disabled] {
            border: 1px solid #ddd;
            color: #ddd;
          }

          .uploadcare--widget {
            width: 100%;
          }
          .uploadcare--widget__button_type_open,
          .uploadcare--widget__button_type_open:hover {
            padding: 12px 20px;
            font-size: 22px;
            color: #fff;
            background-color: #d900fc;
            border: none;
            border-radius: 100px;
            cursor: pointer;
          }
          .uploadcare--widget__button_type_open:hover {
            background-color: #c900ea;
          }
        `}</style>
      </>
    );
  }
}

export default MyApp;
