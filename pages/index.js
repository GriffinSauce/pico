import react, { useState } from 'react';
import Uploader from '../components/Uploader';

function Home() {
  const [link, setLink] = useState();

  const onGetLink = () => {};

  return (
    <div>
      <h1>Get photos</h1>

      <p>{link}</p>

      <button onClick={onGetLink}>Get link</button>
    </div>
  );
}
// "E_gxfcJsRV6*apYBFUrP"
export default Home;
