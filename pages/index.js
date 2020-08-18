import { useState } from 'react';
import Router from 'next/router';
import { GoPlus } from 'react-icons/go';
import Logo from '~/components/Logo';
import Button from '~/components/Button';
import Layout from '~/components/Layout';

import createApi from '~/lib/createApi';
import hostFromReq from '~/lib/hostFromReq';
import useInternetStatus from '~/lib/useInternetStatus';

function Home({ host }) {
  const api = createApi({ host });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const { isOnline } = useInternetStatus();

  const createAndGoToAlbum = async () => {
    setLoading(true);
    let request;
    try {
      request = await api.createRequest();
    } catch (err) {
      setError('Something went wrong, please try again');
      setLoading(false);
      return;
    }
    Router.push(request.uri);
  };

  return (
    <Layout>
      <header className="flex justify-center py-12">
        <Logo />
      </header>
      <h1 className="pb-16 text-3xl leading-normal">
        The easiest way to share photos
        <br />
        of your cat!
      </h1>
      <Button onClick={createAndGoToAlbum} disabled={loading || !isOnline}>
        {loading ? (
          'Loading'
        ) : (
          <span className="flex items-center justify-center space-x-3">
            <GoPlus className="-ml-1" />
            <span>Create album</span>
          </span>
        )}
      </Button>
      {!isOnline ? (
        <div className="mt-3 text-sm text-gray-100">
          You&apos;re offline, try again when you&apos;re connected
        </div>
      ) : null}
      {error ? <p className="my-3">{error}</p> : null}

      <section className="mt-48">
        <h2 className="mb-12 h1">How it works</h2>
        <div className="grid content-center gap-6">
          <h3 className="h2">1. Copy your link</h3>
          <div className="text-center">
            <img
              className="inline"
              alt=""
              src="hiw-link.png"
              srcSet="hiw-link.png, hiw-link@2x.png 2x, hiw-link@3x.png 3x"
            />
          </div>
          <h3 className="h2">2. Send it to your friends</h3>
          <div className="text-center">
            <img className="inline" alt="" src="hiw-msg.svg" />
          </div>
          <h3 className="h2">3. Recieve photos and videos</h3>
          <div className="text-center">
            <img
              className="inline"
              alt=""
              src="hiw-photos.png"
              srcSet="hiw-photos.png, hiw-photos@2x.png 2x, hiw-photos@3x.png 3x"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}

Home.getInitialProps = async ({ req }) => {
  return {
    host: hostFromReq(req),
  };
};

export default Home;
