import react, { useState } from 'react';
import Lightbox from 'react-image-lightbox';

import createApi from '~/lib/createApi';
import hostFromReq from '~/lib/hostFromReq';
import Uploader from '~/components/Uploader';

const baseFunctionsUrl = `${process.env.URL}/.netlify/functions`;

function UploadPage({ host, request }) {
  if (!request) return null;

  const api = createApi({ host });

  const [name, setName] = useState('Steve');
  const [media, setMedia] = useState(request.media || []);

  const [viewMediaIndex, setViewMediaIndex] = useState(null);
  const isLightboxOpen = viewMediaIndex !== null;

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
        {media.map((item, index) => (
          <figure
            className="media-item"
            key={item.url}
            onClick={() => {
              setViewMediaIndex(index);
            }}
          >
            <img src={`${item.url}-/scale_crop/230x230/center/`} />
          </figure>
        ))}
      </div>

      {isLightboxOpen && (
        <Lightbox
          mainSrc={media[viewMediaIndex].url}
          nextSrc={media[(viewMediaIndex + 1) % media.length].url}
          prevSrc={
            media[(viewMediaIndex + media.length - 1) % media.length].url
          }
          animationDuration={100}
          onCloseRequest={() => setViewMediaIndex(null)}
          onMovePrevRequest={() =>
            setViewMediaIndex(
              (viewMediaIndex + media.length - 1) % media.length,
            )
          }
          onMoveNextRequest={() =>
            setViewMediaIndex((viewMediaIndex + 1) % media.length)
          }
          toolbarButtons={[
            <a
              className="lightbox-download"
              href={`${media[viewMediaIndex].url}-/inline/no/`}
            >
              download
            </a>,
          ]}
        />
      )}

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

        .media-item img {
          width: 100%;
        }

        .lightbox-download {
          margin: 0 10px 0 0;
          padding: 6px 12px 7px 12px;
          color: #ddd;
          font-size: 12px;
          text-decoration: none;
          border: 1px solid #ddd;
          border-radius: 4px;
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
