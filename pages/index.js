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

      <section>
        <h2 className="h1">How it works</h2>
        <h3 className="h2">1. Copy your link</h3>
        <img
          alt=""
          src="hiw-link.png"
          srcSet="hiw-link.png, hiw-link@2x.png 2x, hiw-link@3x.png 3x"
        />
        <h3 className="h2">2. Send it to your friends</h3>
        <img alt="" src="hiw-msg.svg" />
        <h3 className="h2">3. Recieve photos and videos</h3>
        <img
          alt=""
          src="hiw-photos.png"
          srcSet="hiw-photos.png, hiw-photos@2x.png 2x, hiw-photos@3x.png 3x"
        />
      </section>

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

        section {
          margin-top: 150px;
        }
        h3 {
          margin-top: 30px;
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
