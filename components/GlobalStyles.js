import Head from 'next/head';

import '~/styles/global.css'; // This only needs to be imported once in your app
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app

const GlobalStyles = () => {
  return (
    <Head>
      <link
        href="https://fonts.googleapis.com/css?family=Lato|Oswald&display=swap"
        rel="stylesheet"
      />
    </Head>
  );
};

export default GlobalStyles;
