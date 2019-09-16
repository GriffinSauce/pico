import react, { useState } from 'react';
import axios from 'axios';

const baseUrl =
  process.env === 'production'
    ? 'https://photo-request.netlify.com/'
    : 'http://localhost:3000';

const baseFunctionsUrl =
  process.env === 'production'
    ? 'https://photo-request.netlify.com/.netlify/functions'
    : 'http://localhost:9000';

function Home() {
  const [link, setLink] = useState();

  const onGetLink = async () => {
    const response = await axios.get(`${baseFunctionsUrl}/request`);
    const { slug } = response.data;
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
