import react, { useState } from 'react';
import Router from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '~/components/Logo';
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
    } catch (error) {
      setError('Something went wrong, please try again');
      setLoading(false);
      return;
    }
    Router.push(request.uri);
  };

  return (
    <Layout>
      <header>
        <Logo />
      </header>

      <p className="valueprop">
        Share the link and get your photos and videos.
      </p>

      <button
        className="button"
        onClick={createAndGoToAlbum}
        disabled={loading || !isOnline}
      >
        {loading ? 'Loading' : 'Create album'}
      </button>
      {!isOnline ? (
        <div className="offline">
          You're offline, try again when you're connected
        </div>
      ) : null}

      {error ? <p className="error">{error}</p> : null}

      <style jsx>{`
        header {
          margin: 20px 0;
        }

        .valueprop {
          margin: 0 0 50px 0;
        }

        .error {
          margin: 15px 0;
        }

        .offline {
          margin: 10px 0 0 0;
          font-size: 12px;
        }
      `}</style>
    </Layout>
  );
}

Home.getInitialProps = async ({ req }) => {
  return {
    host: hostFromReq(req),
  };
};

export default Home;
