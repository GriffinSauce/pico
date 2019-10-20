import { useState } from 'react';
import Router from 'next/router';
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
      <header>
        <Logo />
      </header>

      <h1 className="h2 valueprop">
        The easiest way to share photos
        <br />
        of your cat!
      </h1>

      <Button onClick={createAndGoToAlbum} disabled={loading || !isOnline}>
        {loading ? (
          'Loading'
        ) : (
          <span className="btn-create">
            <img alt="" src="/icon-plus.svg" />
            <span>Create album</span>
          </span>
        )}
      </Button>
      {!isOnline ? (
        <div className="offline">
          You&apos;re offline, try again when you&apos;re connected
        </div>
      ) : null}

      {error ? <p className="error">{error}</p> : null}

      <style jsx>{`
        header {
          margin: 50px 0;
        }

        .valueprop {
          margin: 0 0 50px 0;
        }

        .btn-create * {
          vertical-align: middle;
        }

        .btn-create img {
          margin: 0 10px 0 -8px;
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
