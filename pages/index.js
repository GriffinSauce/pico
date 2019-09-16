import react, { useState } from 'react';
import { createRequest } from '~/lib/api';

const baseUrl =
  process.env === 'production'
    ? 'https://photo-request.netlify.com/'
    : 'http://localhost:3000';

function Home() {
  const [link, setLink] = useState();

  const onGetLink = async () => {
    const request = await createRequest();
    const { slug } = request;
    setLink(`${baseUrl}/${slug}/upload`);
  };

  return (
    <div>
      <h1>Get photos</h1>

      <p>{link}</p>

      <button onClick={onGetLink}>Get link</button>
    </div>
  );
}

export default Home;
