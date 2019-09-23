import react, { useState } from 'react';
import copy from 'copy-to-clipboard';
import * as api from '~/lib/api';

const baseUrl = process.env.URL;
  

function Home() {
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
    const link = `${baseUrl}/${request.id}/upload`;
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

export default Home;
