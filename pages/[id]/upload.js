import react, { useState } from 'react';
import createApi from '~/lib/createApi';
import hostFromReq from '~/lib/hostFromReq';
import Uploader from '~/components/Uploader';

const baseFunctionsUrl = `${process.env.URL}/.netlify/functions`;

function UploadPage({ api, request }) {
  if (!request) return null;

  const [name, setName] = useState('Steve');
  const [media, setMedia] = useState(request.media || []);

  const addMedia = async media => {
    // setMedia([...media, ...newMedia]); // Maybe be optimistic?

    const updatedMedia = await api.addMedia({
      id: request.id,
      media,
    });
    setMedia(updatedMedia);
  };

  return (
    <>
      <h1>{request.description}</h1>

      <p>Requested by {request.requester.name}</p>

      <p>
        <label htmlFor="name">Name</label>
        <input id="name" value={name} onChange={e => setName(e.target.value)} />
      </p>

      <Uploader requestId={request.slug} onChange={addMedia} />

      <div>
        {media.map(item => (
          <img src={item.url} />
        ))}
      </div>

      <style jsx>{`
        img {
          width: 33%;
        }
      `}</style>
    </>
  );
}

UploadPage.getInitialProps = async ({ req, query: { id } }) => {
  if (!id) return {};

  const api = createApi({ req })

  let request;
  try {
    request = await api.getRequest({ id });
  } catch (error) {
    throw error;
  }
  return { api, request };
};

export default UploadPage;
