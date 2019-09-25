import react, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import copy from 'copy-to-clipboard';
import createApi from '~/lib/createApi';
import hostFromReq from '~/lib/hostFromReq';

function Home({ host }) {
  const [copied, setCopied] = useState(false);
  const [link, setLink] = useState();

  const api = createApi({ host });

  const createAndCopy = async () => {
    const request = await api.createRequest({});
    // TODO: handle error
    const link = `${host}/${request.id}/upload`;
    copy(link);
    setLink(link);
    setCopied(true);
  };

  const copyLink = () => {
    copy(link);
  };

  return (
    <>
      <h1>Get photos</h1>

      <p>Share the link and get your pics and vids!</p>

      <section>
        {copied ? (
          <button onClick={copyLink}>Copy link again</button>
        ) : (
          <button onClick={createAndCopy}>Get your link</button>
        )}

        <AnimatePresence>
          {copied && (
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
            >
              <p>Copied to clipboard!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <style jsx>{`
        section {
          margin: 100px 0;
        }
      `}</style>
    </>
  );
}

Home.getInitialProps = async ({ req }) => {
  return {
    host: hostFromReq(req),
  };
};

export default Home;
