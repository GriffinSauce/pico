import react, { useState } from 'react';
import copy from 'copy-to-clipboard';
import * as api from '~/lib/api';

function Home({ url }) {
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
    const link = `${url}/${request.id}/upload`;
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
  const host = req ? req.headers.host : window.location.hostname;
  const protocol = host.indexOf('localhost') ? 'http:' : 'https:';
  const url = `${protocol}//${host}`;
  return {
    url,
  };
};

export default Home;
