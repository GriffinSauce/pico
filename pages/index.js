import react, { useState } from 'react';
import copy from 'copy-to-clipboard';
import api from '~/lib/api';

function Home({ host, session }) {
  const [name, setName] = useState('Peter');
  const [description, setDescription] = useState('Boattrip');
  const [copied, setCopied] = useState(false);

  const onCopyLink = async () => {
    const request = await api({ host, session }).createRequest({
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
  const hostname = req ? req.headers.host : window.location.hostname;
  const protocol = hostname.indexOf('localhost') ? 'http:' : 'https:';
  const host = `${protocol}//${hostname}`;
  const session = req && req.session ? req.session : null;
  return {
    host,
    session,
  };
};

export default Home;
