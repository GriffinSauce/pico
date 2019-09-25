import react, { useState } from 'react';
import copy from 'copy-to-clipboard';
import createApi from '~/lib/createApi';
import hostFromReq from '~/lib/hostFromReq';

function Home({ api, host }) {
  const [name, setName] = useState('Peter');
  const [description, setDescription] = useState('Boattrip');
  const [copied, setCopied] = useState(false);

  const onCopyLink = async () => {
    const request = await api.createRequest({
      requester: {
        name,
      },
      description,
    });
    const link = `${host}/${request.id}/upload`;
    copy(link);
    setCopied(true);
  };

  return (
    <>
      <h1>Get photos</h1>

      <p>
        <label htmlFor="name">Name</label>
        <input id="name" value={name} onChange={e => setName(e.target.value)} />
      </p>

      <p>
        <label htmlFor="description">Description</label>
        <input
          id="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </p>

      {copied ? (
        <p>Copied to clipboard!</p>
      ) : (
        <button onClick={onCopyLink}>Get link</button>
      )}
    </>
  );
}

Home.getInitialProps = async ({ req }) => {
  return {
    api: createApi({ req }),
    host: hostFromReq(req),
  };
};

export default Home;
