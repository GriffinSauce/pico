import react, { useState } from 'react';
import createApi from '~/lib/createApi';
import hostFromReq from '~/lib/hostFromReq';
import Uploader from '~/components/Uploader';

const baseFunctionsUrl = `${process.env.URL}/.netlify/functions`;

function UploadPage({ host, request }) {
  if (!request) return null;

  const api = createApi({ host });

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

      <section>
        {process.browser ? (
          <Uploader requestId={request.slug} onChange={addMedia} />
        ) : null}
      </section>

      <div className="media">
        {media.map(item => (
          <div className="media-item">
            <figure
              key={item.url}
              style={{ backgroundImage: `url("${item.url}")` }}
            ></figure>
          </div>
        ))}
      </div>

      <style jsx>{`
        section {
          margin: 100px 0;
        }

        .media {
          display: flex;
          flex-wrap: wrap;
        }

        .media-item {
          position: relative;
          flex-basis: calc(33.333% - 10px);
          margin: 5px;
          background-color: #f0f0f0;
          border-radius: 6px;
          overflow: hidden;
          box-sizing: border-box;
        }

        .media-item::before {
          content: '';
          display: block;
          padding-top: 100%;
        }

        .media-item figure {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          margin: 0;
          padding: 0;
          background-position: center;
          background-size: cover;
        }
      `}</style>
    </>
  );
}

UploadPage.getInitialProps = async ({ req, query: { id } }) => {
  if (!id) return {};

  const host = hostFromReq(req);
  const api = createApi({ host });

  let request;
  try {
    request = await api.getRequest({ id });
  } catch (error) {
    throw error;
  }
  return { host, request };
};

export default UploadPage;
